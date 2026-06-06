---
name: inbox-triage
description: Sorts the morning inbox, drafts replies in my voice, and surfaces the three threads that actually need me. Everything else is handled or filed.
category: Life
tags: [email, productivity, automation]
---

## What it does

`inbox-triage` runs every morning and turns an overwhelming inbox into a short action list.

It reads new emails, classifies them by urgency and type, drafts replies for anything that's a clear ask, and surfaces only the threads that genuinely require my judgment. Everything else — newsletters, receipts, FYIs, automated notifications — gets labeled and archived without touching my attention.

## The problem it solves

Email is designed to look urgent. Most of it isn't. The skill separates the signal from the noise by actually reading the thread context, not just subject-line keywords.

## How it works

1. Connects to Gmail via OAuth
2. Reads all unread emails from the last 24 hours
3. For each thread, classifies: action required / FYI / automated / social
4. For "action required" threads, drafts a reply in my voice using prior email history as style context
5. Produces a morning brief: three priority threads with draft replies staged, everything else already filed

The draft replies land in Gmail Drafts — I review, edit if needed, and send. The skill never sends autonomously.

## Setup

```bash
# One-time auth
claude inbox-triage --setup

# Run (add to cron for 7am daily)
claude inbox-triage --brief
```

## What I've learned

The hardest part wasn't the classification — it was the voice matching. Early versions wrote replies that were technically correct but clearly not me. The fix was building a style profile from 90 days of sent mail and refreshing it monthly.

The skill now gets flagged by recipients about once a month as "unusually clear." I take that as success.
