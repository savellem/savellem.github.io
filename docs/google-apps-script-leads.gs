/**
 * Savellem.com — Lead capture → Google Sheet
 *
 * Handles BOTH lead sources in one sheet, with a "Type" column to tell them apart:
 *   - Contact form  → name, project type, budget, message
 *   - UX Health Check → score + per-dimension breakdown
 * Emails a notification per lead.
 *
 * SETUP (one time):
 *   1. Create a Google Sheet (e.g. "Savellem Leads").
 *   2. Extensions → Apps Script. Delete the placeholder, paste this file, Save.
 *   2b. (Recommended — least privilege) Project Settings ⚙️ → enable "Show
 *       appsscript.json manifest file", then add to it:
 *         "oauthScopes": [
 *           "https://www.googleapis.com/auth/spreadsheets.currentonly",
 *           "https://www.googleapis.com/auth/script.send_mail"
 *         ]
 *   3. Deploy → New deployment → gear icon → "Web app".
 *        - Execute as: Me
 *        - Who has access: Anyone
 *      → Deploy → authorize.
 *   4. Copy the Web app URL (ends in /exec) → it goes in FORM_ENDPOINT on the site.
 *
 *   After editing this script later, you MUST redeploy a new version for the /exec
 *   URL to serve it: Deploy → Manage deployments → ✏️ edit → Version: New version →
 *   Deploy. The URL stays the same.
 */

// Where new-lead notifications are emailed. The +weblead tag lets Gmail filter
// these into their own label automatically (delivers to savellem@gmail.com).
const NOTIFY_EMAIL = 'savellem+weblead@gmail.com';

const HEADERS = [
  'Timestamp', 'Type', 'Name', 'Email', 'Project Type', 'Budget', 'Message',
  'Score', 'Details', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content',
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    }

    const isHealthCheck = data.form_type === 'health-check';
    const type = isHealthCheck ? 'UX Health Check' : 'Contact Form';
    const source = [data.utm_source, data.utm_medium, data.utm_campaign].filter(String).join(' / ');

    sheet.appendRow([
      new Date(),
      type,
      data.name || '',
      data.email || '',
      data.project_type || '',
      data.budget || '',
      data.message || '',
      (data.score === 0 || data.score) ? data.score : '',
      data.details || '',
      data.utm_source || '',
      data.utm_medium || '',
      data.utm_campaign || '',
      data.utm_content || '',
    ]);

    if (NOTIFY_EMAIL) {
      const subject = isHealthCheck
        ? 'New UX Health Check lead — ' + (data.email || 'Unknown') + ' (score ' + (data.score != null ? data.score : '?') + ')'
        : 'New project inquiry — ' + (data.name || 'Unknown');
      const body = isHealthCheck
        ? 'UX Health Check completed.\n\n' +
          'Email: ' + (data.email || '') + '\n' +
          'Score: ' + (data.score != null ? data.score : '') + '/100\n' +
          'Breakdown: ' + (data.details || '') + '\n\n' +
          'Source: ' + source
        : 'Name: ' + (data.name || '') + '\n' +
          'Email: ' + (data.email || '') + '\n' +
          'Need: ' + (data.project_type || '') + '\n' +
          'Budget: ' + (data.budget || '') + '\n\n' +
          (data.message || '') + '\n\n' +
          'Source: ' + source;
      MailApp.sendEmail({ to: NOTIFY_EMAIL, replyTo: data.email || NOTIFY_EMAIL, subject: subject, body: body });
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Lets you confirm the deployment is live by visiting the URL in a browser.
function doGet() {
  return ContentService.createTextOutput('Savellem lead endpoint is live.');
}
