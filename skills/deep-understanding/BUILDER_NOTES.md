# Builder notes — deep-understanding

*Draft. Edit freely — these become grounding for the "ask about this skill" chat on clairenorth.dev.*

## Why this exists

The default mode of an assistant is to *answer*. That's fine when I want an answer. But the most valuable thing an LLM can do for me isn't answer faster — it's *teach faster*. This skill flips the goal: comprehension is the deliverable, not the answer.

## How it works

When invoked, the model treats my understanding as a first-class output and:

1. Names what I should end up understanding (the problem, the solution, the broader context).
2. Explains incrementally — high level and concrete level, at natural milestones.
3. Asks me to restate. Identifies gaps. Re-explains at the depth I asked for: ELI5, ELI14, intern, expert.
4. Quizzes when useful. Open-ended by default, multiple choice when precision matters.
5. Continues only when I show understanding or ask to move on.

Trigger phrases are deliberately broad — anything like "teach me", "explain as we go", "help me understand", "I'm confused about", "quiz me", "make sure I really get this", or just "ELI5".

## Design choices worth knowing about

- **Loaded with low friction.** The description triggers on a wide set of phrases because the failure mode I cared about was the model just answering when I wanted to learn. Better to over-trigger than miss.
- **Mode is explicit.** I can ask for ELI5, intern, or expert — and switch mid-conversation. The model recalibrates depth, not just word count.
- **Restatement is non-optional.** The skill asks me to put it in my own words before moving on. That's where the comprehension actually happens — without it I'd just be skimming.
- **Examples, diagrams, and code on demand.** It'll spin up a spreadsheet or step through a debugger if that's what the concept needs.

## What it's not for

Quick lookups. If I just want an answer, this is overkill.

## What I'd change

*(fill in)*
