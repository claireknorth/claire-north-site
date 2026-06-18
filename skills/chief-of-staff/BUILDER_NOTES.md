# Builder notes — chief-of-staff

*Draft. Edit freely — these become grounding for the "ask about this skill" chat on clairenorth.dev.*

## Why this exists

I was losing commitments. Slack threads, meeting asides, "I'll send that over by EOD" emails — each one fine in isolation, but at the end of a busy day I'd forget which ones I owed back. Reviewing my own day manually worked until it didn't. This skill is the automation of what I would have done by hand if I had the time every evening.

## How it works (high level)

Two modes, same skill:

- **Evening wrap** — runs end-of-day. Pulls today's calendar, Slack (mine + at-me), email, meeting notes, and vendor channels in parallel. Reconciles those against my `Doing now.md` task file: marks things done if there's evidence, captures new commitments in my exact task format, promotes stale items to OVERDUE. Then writes a wrap file and DMs me a short recap.
- **Morning reminder** — runs at start-of-day. Surfaces anything captured yesterday I haven't acknowledged, plus what's due today.

There's also a **memory capture** path for when I say "remember that…" mid-conversation about a goal change or a ticket to file.

## What it touches

- **Slack** — read sent + received messages, DM me the recap. (No posting in shared channels — that goes out in my voice with my sign-off.)
- **Gmail** — read today's sent/received for asks I haven't answered.
- **Google Calendar** — today's events for context; tomorrow's calendar to know whether captured commitments have a plausible focus block.
- **Notes app** — meeting notes for the day's decisions and action items.
- **Filesystem** — reads/writes `Doing now.md` (my task file), writes `daily/YYYY-MM-DD-wrap.md`, appends to `memory/chief-of-staff.md`. Treats canonical goals files as read-only.
- **Other skills it calls** — `email-triage` and `customer-scan` for those passes; I keep them as separate skills because they're useful on their own.

## Design choices worth knowing about

- **Respects my existing system, doesn't impose a new one.** The task entry format (urgency emoji · bold title · committed-where · scheduling clause · due · source link) is exactly what I was already using. The skill matches it; it doesn't redesign it.
- **Evidence over inference for "done."** Marks something done only when there's a concrete signal (message sent, doc shared, meeting happened). Otherwise leaves it open and flags it in the recap as "looks done — confirm?". I'd rather see a task twice than mark it done when it isn't.
- **The DM is one fact per line, max ~12 words, ~18 lines total.** I skim, I don't read. Detail goes in the wrap file; the DM is for deciding.
- **Knows which products I actually own.** Companies have multiple offerings with overlapping language — the skill only surfaces customer signals about things I own. Other things are FYI at most.
- **The skill itself stays bounded.** Pre-approved to edit `Doing now.md`, write daily files, and write its own memory file. Anything else (other memory files, sending messages to people other than me) requires asking first.

## Things I tried that didn't work

*(fill in)*

## What I'd change

*(fill in)*
