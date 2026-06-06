---
name: spec-writer
description: Turns a rough problem statement into a structured PRD — context, success metrics, edge cases, and the open questions worth arguing about before anyone writes code.
category: Work
tags: [product, writing, planning]
---

## What it does

`spec-writer` takes a rough problem description — a Slack message, a bullet list, a voice memo transcript — and returns a structured product requirements document you can actually use.

It doesn't just reformat what you gave it. It asks the questions a good PM would ask before the kickoff meeting: who is the user, what does success look like in 90 days, what are the edge cases we'll regret ignoring, and what decisions are genuinely open that the team should weigh in on.

## Why I built it

I got tired of spending the first hour of every spec review explaining context that should have been in the document. Most PRD templates encourage completeness over thinking — you fill in the boxes, call it done, and the real decisions happen in a design review three weeks later.

This skill forces the important questions to the surface early, when changing direction is cheap.

## How to use it

```bash
claude spec-writer "We want to let users export their data"
```

Or pipe in a longer brief:

```bash
cat brief.md | claude spec-writer
```

The skill outputs a Markdown document with these sections:

- **Problem** — what's broken and for whom
- **Success metrics** — measurable outcomes, not features
- **Proposed solution** — the minimum footprint that moves the metric
- **Edge cases** — the three scenarios that will break the naive implementation
- **Open questions** — decisions that need a human, flagged with context

## What good output looks like

A spec from this skill should be readable in under five minutes and contain enough context that an engineer who wasn't in the room can understand the tradeoffs. If it's longer than two pages, something went wrong.

## Configuration

Set `SPEC_WRITER_AUDIENCE` in your environment to tune the output voice:

| Value | Description |
|---|---|
| `engineer` | Heavier on constraints and edge cases |
| `exec` | Heavier on outcomes and tradeoffs |
| `design` | Heavier on user flows and open questions |

Default is `engineer`.
