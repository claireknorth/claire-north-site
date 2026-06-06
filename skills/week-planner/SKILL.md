---
name: week-planner
description: Builds my weekly plan from calendar, goals, and last week's carryover — and is honest about what to drop.
category: Life
tags: [planning, productivity, calendar]
---

## What it does

`week-planner` runs every Sunday evening and builds my plan for the week ahead.

It reads my calendar (meetings already booked), my current goals (a short markdown file I maintain), and last week's carryover tasks (the ones I didn't finish). It then produces a week plan that fits reality — accounting for actual available focus time, not the optimistic version.

The most important feature: it tells me what to drop. Not "here are 40 tasks ranked by priority." It says "you have 14 hours of focus time this week and your highest-leverage three things are X, Y, Z — the rest should wait or be delegated."

## Why this matters

Most planning systems let you add without forcing you to subtract. A week plan that doesn't account for capacity isn't a plan — it's a wish list.

## How it works

```bash
claude week-planner
```

Outputs a Markdown file with:

- **This week's focus** — three things that move my most important current goal
- **Calendar load** — hours committed vs. hours available
- **Carryover** — what didn't finish last week and whether it still matters
- **Drop list** — tasks explicitly deprioritized, with a one-line reason
- **Daily scaffolding** — Monday through Friday with rough time blocks

## The carryover logic

Carryover tasks get a freshness score based on how many times they've rolled over. After three weeks, the skill flags them for explicit decision: ship it this week, delegate it, or kill it. Tasks that survive on the list without progress are usually tasks that shouldn't exist.

## Integration

The week plan writes to `~/notes/week-YYYY-WW.md` and optionally posts a summary to a private Slack channel I share with myself.
