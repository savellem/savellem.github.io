# UX/UI Design Blog

A modern blog built with Astro and Tailwind CSS, featuring two types of content:
- **Case Studies**: Portfolio pieces showcasing UX projects with client information, objectives, and results
- **Blog Posts**: Articles about UX practices, opinions, and industry insights

## Features

- 🎨 Modern, clean design with Tailwind CSS
- 📱 Fully responsive and mobile-first
- ⚡ Lightning-fast performance with Astro
- 📝 Two content types using Astro Content Collections
- 🏷️ Tag-based filtering for both blog types
- 🔍 SEO-optimized with meta tags
- ♿ Accessibility-focused design

## Pages

- **Home**: Hero section with featured work and latest posts
- **About**: Personal information and experience
- **Work**: Case studies portfolio with filtering
- **Blog**: Blog posts listing with filtering
- **Contact**: Contact form and information
- **Dynamic routes**: Individual pages for each case study and blog post

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   ├── content/        # Content collections
│   │   ├── blog/       # Blog posts (MDX)
│   │   └── case-studies/ # Case studies (MDX)
│   ├── layouts/        # Page layouts
│   ├── pages/          # Route pages
│   ├── styles/         # Global styles
│   └── utils/          # Utility functions
└── package.json
```

## Adding Content

### Case Study

Create a new `.mdx` file in `src/content/case-studies/`:

```mdx
---
title: "Project Title"
client: "Client Name"
project: "Project Name"
year: 2024
objectives: "Your objectives..."
description: "Short description..."
result: "The results..."
thumbnail: "https://example.com/image.jpg"
featured: true
tags: ["Tag1", "Tag2"]
publishDate: 2024-01-01
---

Your detailed case study content here...
```

### Blog Post

Create a new `.mdx` file in `src/content/blog/`:

```mdx
---
title: "Article Title"
description: "Short description..."
publishDate: 2024-01-01
author: "Your Name"
thumbnail: "https://example.com/image.jpg"
featured: true
tags: ["Tag1", "Tag2"]
draft: false
---

Your article content here...
```

## Customization

- **Colors**: Edit `tailwind.config.mjs` to customize the color scheme
- **Fonts**: Update the Google Fonts import in `src/layouts/BaseLayout.astro`
- **Content**: Replace placeholder content with your own information
- **Images**: Replace placeholder images with your own

## Tech Stack

- [Astro](https://astro.build) - Web framework
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [MDX](https://mdxjs.com) - Content format
- TypeScript - Type safety

## License

MIT
