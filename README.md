# clairenorth.dev

Personal portfolio site. Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## Adding a new skill

1. Create a folder: `skills/<slug>/`
2. Add `skills/<slug>/SKILL.md` with this frontmatter:

```markdown
---
name: skill-name
description: One-line description shown on the homepage.
category: Work
tags: [optional, list]
---

Your skill content in Markdown...
```

`category` must be either `Work` or `Life`.

3. Commit and push. That's it — no code changes required. The skill appears on the homepage grid and gets a detail page at `/skills/<slug>` automatically on the next build.

## Adding a project

Edit `content/projects.json` — add an object to the array:

```json
{
  "title": "Project Name",
  "oneLineOutcome": "One sentence on what it does and why it matters.",
  "url": "https://link-to-demo-or-repo",
  "stack": ["Claude", "TypeScript", "Postgres"]
}
```

## Adding a writing entry

Edit `content/writing.json` — add an object to the array:

```json
{
  "title": "Post title",
  "url": "https://link-to-post",
  "description": "One-line summary shown below the title.",
  "meta": "Essay · 2026"
}
```

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

The fastest path:

```
https://vercel.com/new/clone?repository-url=https://github.com/claireknorth/claire-north-site
```

Or from the Vercel dashboard: **Add New Project → Import Git Repository → select `claire-north-site`**.

Zero configuration needed — Next.js is detected automatically.

## Tech stack

- **Framework**: Next.js 14 (App Router, static generation)
- **Language**: TypeScript
- **Styles**: Tailwind CSS + CSS custom properties
- **Fonts**: Newsreader (serif), Inter (sans), JetBrains Mono (mono) via `next/font`
- **Markdown**: gray-matter (frontmatter) + remark + remark-html (body rendering)
- **Content**: File-based (`/skills/`) and JSON (`/content/`)
