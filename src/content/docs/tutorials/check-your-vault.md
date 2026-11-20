---
title: Check your vault
description: Ask if anything's broken and get an audit of your campaign notes, from contradictions and stale facts to broken links and look-alike names, with a proposed fix for each.
checkedAgainst: "1.12.98"
---

<!-- video -->

The skill behind this is **campaign-qa**. A campaign's notes drift: a
fact changes in play and three other notes still say the old thing, a
name gets reused, a link points nowhere. It reads the vault, finds those
problems, shows you the evidence for each, and proposes a fix. Apart
from a couple of mechanical clean-ups it reports afterwards, nothing
changes until you say so.

## When to reach for it

- After a big session or a big import.
- At the end of a chapter.
- Before you publish the campaign site, or when the site build warns
  about something.
- When you have a nagging feeling that two notes disagree.

Starting phrases that work:

- "Anything broken in the vault?"
- "Check for contradictions in Chapter 2."
- "Are any of my NPC names too close together?"
- "Am I following the Three Clue Rule?"
- "Check my notes for anything that shows wrong on the site."

## From a real run

On GM-Apprentice 1.12.98, using the [Snowbound sample vault](https://github.com/AntTheLimey/gm-apprentice-snowbound/tree/sample-v2)
(clone or download tag `sample-v2` to follow along), after the session in
[Wrap up a session](/tutorials/wrap-up-a-session/). We typed the GM's
side; the replies are the agent's own, trimmed (`[...]`) but not reworded.

> [!you]
>
> Anything broken in the vault?

> [!apprentice]
>
> The vault's version is current (1.12.98, matching the plugin), so I can
> run an audit. Which scope do you want?
>
> 1. **Full vault:** every check, from canon and timeline through graph
>    health, site faults, settings, world consistency and open spoilers,
>    in one report grouped by severity.
> 2. **Current chapter:** the same checks, limited to the chapter you're
>    playing now.
> 3. **Specific files or one check:** for example, only timeline
>    validation, only the site faults, or a few NPC notes.
>
> [...]

> [!you]
>
> Full vault.

> [!apprentice]
>
> I've run every check for the full audit. Nothing is critical, and the
> Session 5 canon holds together: the timeline, deaths, cure and early
> descent all match. The problems are notes that weren't updated after the
> move to Chapter 2, plus some housekeeping.
>
> ## Warnings
>
> **W1. Kael still "knows" Tam is in the ice cave.** In [[Kael
> Stonehand]], under Current Status → Knows (exclusive), it says *"Tam lies
> dead in the ice cave at the foot of the crypt chute, in his shirt."* Tam
> was carried up in Session 4 and buried in his coat in Session 5 ([[The
> Burying of Tam Rowe]]).
> **Fix:** change it to: "Tam is buried on the slope behind the
> Mule-Yard, in his coat."
>
> **W2. The Campaign Overview is still at the end of Chapter 1.** In
> [[Campaign Overview]], Current Arc says the dragon "has woken and named
> its price", but it's dead. Key Factions says the order is "led by
> [[Abbot Severin]]", who is dead; the order chose [[Sister Wren]].
> **Fix:** rewrite Current Arc for Harrowford in spring and Edda's
> request, and make Wren the order's leader.
>
> [...]
>
> **W7. Seven items have a holder, but the holder's note doesn't list the
> item.** [...]
>
> - [[The Ice Shards]] → Grenna. The shards were used up curing Hesta, so
>   this holder is probably out of date.
>
> [...]
>
> ## Info
>
> [...]
>
> - **I4.** The name Mattias Pell is close to [[Brother Matthias]]. You
>   already chose to keep it at wrap-up. **Fix:** add a QA-DISMISSED
>   marker so it isn't flagged again.
>
> [...]
>
> **Everything else passed:** timeline order, links, tones, tables,
> settings, D&D sheets (all six), wrap-up structure, NPC/PC pairs, open
> spoilers and world consistency. [...]
>
> How do you want to handle these? You can approve all the proposed fixes,
> go through them in batches (W1–W3, W4–W7, then the Info items), or decide
> each one yourself with fix, skip or dismiss. Nothing has been changed
> yet. [...]

> [!you]
>
> Approve all the proposed fixes. The lamp is located_at, and promote the
> three planning drafts.

> [!apprentice]
>
> I've made all the fixes. Afterwards the index, relationship and
> NPC-stats checks came back clean and there are no broken links.
>
> **Fixed:**
>
> - **Kael's note:** his knowledge now says Tam is buried behind the
>   Mule-Yard in his coat, not lying in the ice cave.
> - **Campaign Overview:** Current Arc now covers Harrowford in spring and
>   Edda's request. The order is now led by Sister Wren instead of the dead
>   abbot.
> - **Chapter 2 note:** the template placeholders are replaced with a
>   summary, a player Teaser and GM Notes. I wrote these from the Session 5
>   Wrap-Up, so read the Teaser before you publish, since players will see
>   it.
>
> [...]
>
> The report is in `_QA/QA_full_audit_2026-11-20.md` (15 findings: 7
> warnings, 8 info; 10 fixed, 2 dismissed). [...]

## What it checks

- **Canon:** notes that contradict each other, or still say something
  that play has since changed.
- **Timeline:** events in an impossible order, the dead turning up
  alive.
- **Names:** NPCs or places close enough to confuse your players.
- **Clues:** whether each conclusion the players must reach has at least
  three ways in (the Three Clue Rule), and clues that lead nowhere.
- **Graph health:** broken links, orphaned notes, stubs left unfilled,
  relationships written in the wrong shape or stored twice.
- **Site faults**, for a campaign with a site: names players can see
  that have no page, and hidden text at risk of showing.
- **Tones:** relationship tones tidied to the standard words the site
  understands.

## How it works with you

- **It asks how far to look first.** The whole vault, the current
  chapter, or a few files.
- **Evidence, then a fix.** Each finding names the note and the line,
  says why it matters, and proposes the change.
- **You decide each one:** fix, skip or dismiss. Approve them all at
  once if you like.
- **Dismissing is remembered.** It marks the note, and doesn't raise the
  same thing again unless something has changed since.
- **A report** is saved to `_QA/` in your vault.
- **Drafts get some slack.** It knows a DRAFT note is expected to have
  gaps.

## Other things to ask it

- "Check my timeline for impossible sequences."
- "Which NPCs have no relationships?"
- "Tidy the tones in my campaign."
- "Players can see Baron Vesper's name but he has no page."

## What comes next

With the vault clean, [prep the next session](/tutorials/prep-a-session/),
or [publish your site](/tutorials/publish-your-site/) with the problems
it found fixed.
