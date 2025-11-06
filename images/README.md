# Images Directory

This directory contains all custom images for the blog.

## Structure

- `articles/` - Images for blog articles
- `case-studies/` - Images for case studies

## Usage

Images in the `public` folder are served from the root of your site.

### In Articles (MDX files)

```markdown
![Alt text](/images/articles/your-image.jpg)
```

### In Case Studies

```markdown
![Alt text](/images/case-studies/your-image.jpg)
```

### In Frontmatter

```yaml
---
thumbnail: "/images/articles/thumbnail.jpg"
---
```

## Tips

- Use descriptive filenames (e.g., `ux-research-process.jpg`)
- Optimize images before uploading (compress for web)
- Recommended formats: JPG for photos, PNG for graphics with transparency, WebP for modern browsers
- Keep images under 1MB when possible
