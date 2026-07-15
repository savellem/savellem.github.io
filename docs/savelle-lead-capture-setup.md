# Lead Capture Setup — savellem.com

**For: Savelle · Time: ~10 minutes · No coding needed (just copy & paste)**

## What this does

When someone fills out the **contact form** — or completes the free **UX Health
Check** — on **savellem.com**, the submission will:

1. Drop into a **Google Sheet that you own**, one row per submission, with a
   **Type** column showing which form it came from, and
2. **Email you instantly** so you never miss a lead.

This guide sets it up in **your** Google account so you own all the lead data.

---

## Before you start

- Sign in to the Google account that should own the leads (**savellem@gmail.com**).
- Keep this page open — you'll copy the script from the bottom in Step 2.

---

## Step 1 — Create the Google Sheet

1. Go to **[sheets.new](https://sheets.new)** (or Google Drive → **New → Google Sheets**).
2. Name it **Savellem Leads** (click "Untitled spreadsheet" top-left to rename).

## Step 2 — Add the script

1. In the sheet, click **Extensions → Apps Script**. A code editor opens in a new tab.
2. You'll see a few placeholder lines (`function myFunction() { }`). Select **all** of it (Ctrl/Cmd + A) and delete it.
3. **Copy the entire script** from the **"The Script"** section at the bottom of this page and paste it in.
4. Click the **Save** icon (💾).

## Step 2b — Limit permissions to just this sheet (recommended)

By default Google asks the script for access to *all* your spreadsheets. We only
need access to **this one** sheet. This optional step narrows that down:

1. In the left sidebar, click **Project Settings** (the ⚙️ gear icon).
2. Check the box **"Show 'appsscript.json' manifest file in the editor."**
3. Go back to the **Editor** (the `< >` icon) and open the **`appsscript.json`** file that now appears.
4. Replace its entire contents with this, then **Save**:

   ```json
   {
     "timeZone": "America/Phoenix",
     "runtimeVersion": "V8",
     "exceptionLogging": "STACKDRIVER",
     "oauthScopes": [
       "https://www.googleapis.com/auth/spreadsheets.currentonly",
       "https://www.googleapis.com/auth/script.send_mail"
     ]
   }
   ```

Now, when you authorize in the next step, Google will ask only for **"the current
spreadsheet"** (not all of them), plus permission to send the notification email.

> Don't want the script to send email at all? Delete the `".../script.send_mail"`
> line above **and** the `if (NOTIFY_EMAIL) { … }` block in the script. Leads will
> still save to the sheet; you just won't get the email notification.

## Step 3 — Deploy it as a web app

1. Top-right: **Deploy → New deployment**.
2. Click the **gear icon ⚙️** next to "Select type" → choose **Web app**.
3. Fill in the three fields:
    - **Description:** `Savellem leads` (anything — just a label)
    - **Execute as:** **Me** (your email)
    - **Who has access:** **Anyone** ← important. *Not* "Anyone with Google account." The form submits without anyone logging in, so it must be fully public.
4. Click **Deploy**.
5. **Authorize it:** click **Authorize access** → choose your account. You'll see a **"Google hasn't verified this app"** warning — this is **normal** for your own script. Click **Advanced → Go to Savellem Leads (unsafe) → Allow**.
6. Copy the **Web app URL** — it's long and ends in **`/exec`**.

## Step 4 — Send the URL to Brian

Paste that `/exec` URL to **Brian**. He plugs it into the website, and both forms
start saving straight to your sheet. (It's safe to share — it only *accepts* form
submissions; it can't expose your sheet.)

## Step 5 — Test it

Once Brian confirms it's connected, go to **savellem.com/contact** and submit a
test inquiry. Within a few seconds you should see a **new row** in your sheet and
an **email** notification. (Submitting the UX Health Check does the same, tagged
Type = "UX Health Check".)

If both happen, you're live. 🎉

---

## Where your leads live & how to maintain it

- **Every submission = one row.** Columns: Timestamp · Type · Name · Email ·
  Project Type · Budget · Message · Score · Details · utm_source · utm_medium ·
  utm_campaign · utm_content. Contact inquiries fill the name/project/budget/message
  fields; **UX Health Check** leads fill **Score** and **Details** (the per-area breakdown).
- **You get an email per lead** — just hit reply to respond to the customer
  directly (their email is set as the reply-to).
- **To change anything (e.g. the notification email):** Extensions → Apps Script,
  edit, **Save**, then **Deploy → Manage deployments → ✏️ (edit) → Version: New
  version → Deploy**. The URL stays the same, so nothing on the website needs to change.
- The script and sheet live in **your** Google Drive — you own 100% of the data.

> **Tip:** the script emails `savellem+weblead@gmail.com`. That still lands in your
> normal inbox, but the `+weblead` tag lets you auto-filter web leads into their
> own Gmail label.

> **If Brian set this up first to launch quickly:** redoing it in your account is
> just Steps 1–4 above. Send Brian the new `/exec` URL, he swaps it once, and
> you're the owner. Your old data can be copied over from his sheet if needed.

---

## The Script

Copy everything in this box into the Apps Script editor (Step 2):

```javascript
/**
 * Savellem.com — Lead capture → Google Sheet
 * Handles BOTH the contact form and the UX Health Check, writing to one sheet
 * with a "Type" column to tell them apart. Emails a notification per lead.
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
```
