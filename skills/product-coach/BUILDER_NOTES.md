# Builder notes — product-coach

*Draft. Edit freely — these become grounding for the "ask about this skill" chat on clairenorth.dev.*

## Why this exists

Most coaching conversations I've had with LLMs end up in one of two failure modes: pure validation ("that's a tough spot, here are some thoughts to consider…") or a generic framework dump ("have you tried RICE?"). Neither one actually pushes me. I wanted a coach that would identify where I'm weak, name it, and work the actual situation in front of me — grounded in the PM frameworks I already respect rather than generic productivity advice.

## How it works

Two paths:

- **Coaching session** — I say something like "coach me" or "assess my PM skills" and it works through a structured self-assessment against SVPG and industry-standard frameworks, identifies the weakest areas, and proposes specific things to work on.
- **Situational coaching** — I drop a real tough situation (stakeholder conflict, prioritization dilemma, discovery question, "I feel like I'm struggling with X") and it coaches me through that specific thing rather than generic advice.

The triggers are intentionally low-bar — anything that sounds like PM struggle should fire this, even if I don't ask for "coaching" explicitly.

## What it references

- **SVPG (Silicon Valley Product Group) materials.** Inspired discovery, product trios, the empowered-vs-feature-team distinction, opportunity solution trees.
- **Industry PM competency frameworks.** Includes a reference doc at `references/pm-competency-framework.md` that the skill loads on demand for assessment work.

## Design choices worth knowing about

- **Coach, not therapist.** It pushes. It will name a weakness directly rather than soften.
- **Specifics over frameworks.** Frameworks come in *after* understanding the specific situation — not as a list dumped up front.
- **Trigger liberally.** Set to fire on lots of variations because the failure mode was "I'm struggling with X" not getting routed here and getting a generic answer instead.

## What I'd change

*(fill in)*
