# clairenorth.dev

Personal portfolio site. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Stack

- **Framework**: Next.js 14 (App Router, static generation)
- **Language**: TypeScript
- **Styles**: Tailwind CSS
- **Fonts**: Newsreader, Inter, JetBrains Mono
- **Markdown**: gray-matter + remark

## Skill Chat LLM

The skill chat API uses OpenRouter's OpenAI-compatible chat completions endpoint.

Create `.env.local` from `.env.example`, then set:

- `OPENROUTER_API_KEY`: your OpenRouter API key
- `OPENROUTER_MODEL`: model slug to use; defaults to OpenRouter's `openrouter/auto` router
- `OPENROUTER_SITE_URL`: optional site URL sent to OpenRouter for rankings/analytics
- `OPENROUTER_APP_NAME`: optional app name sent to OpenRouter
