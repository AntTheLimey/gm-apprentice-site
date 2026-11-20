---
title: Organize your notes
description: Hand the apprentice a scrawl of new NPCs and places, and it files each one as a linked note, checking it against what your vault already says.
checkedAgainst: "1.12.98"
---

<!-- video -->

The skill behind this is **campaign-organizer**, the campaign's librarian.
You write notes the way you always have. It turns them into one note per
person, place, faction or item, each linked to the others and to the rest
of your vault.

## When to reach for it

- You've jotted down a few new NPCs or places between sessions.
- A big worldbuilding document needs breaking into separate notes.
- Your notes mention people and places that have no note of their own yet.
- Notes have piled up with no structure, or no links between them.

Starting phrases that work:

- "File these notes into the vault."
- "Here's my worldbuilding doc. Break it into notes."
- "Create notes for anyone in my session notes who doesn't have one yet."
- "Go through my NPCs and add any missing links."

For a whole pile of old campaign material (sheets, transcripts, maps),
start with [Bring in an existing campaign](/tutorials/bring-in-a-campaign/)
instead. It interviews you about what happened, then hands over to this
skill.

## From a real run

On GM-Apprentice 1.12.98, using the [Snowbound sample vault](https://github.com/AntTheLimey/gm-apprentice-snowbound/tree/sample-v2)
(clone or download tag `sample-v2` to follow along). We typed the GM's
side; the replies are the agent's own, trimmed (`[...]`) but not reworded.

The adventure is over. For whatever comes next, the GM drops a scrawl into
the vault as `harrowford notes.md`:

```text
new npc: Edda Marsh, the reeve. keeps the valley tally of who owes what. 50s, ink on her fingers, never sits down.
- wants to know who's owed Tam's share of the dragon coin. thinks Hesta should get all of it, not "a share"
- doesn't trust the monastery. her brother went up the pass 20 yrs ago and didn't come back. (one of the tags on the wall of the dead??)
- owes Orrin Gilt money, hates that

the mule-yard: run by Edda's cousin Bram. he's the one who sold Tam the mule. mule came back alone in the autumn.

the Stag & Lantern - the inn. warm beds. the party's tab from before the pass is still open lol
```

> [!you]
>
> I've put my notes for next session in harrowford notes.md. File them into
> the vault.

> [!apprentice]
>
> Your Harrowford notes are filed as four new notes, all marked DRAFT. I
> copied your wording into them as written:
>
> - **Edda Marsh** (`Characters/NPCs/Edda Marsh.md`): the reeve. Her look
>   goes where players can see it. Her wants, her distrust of the monastery
>   and her missing brother go in your GM-only notes. She's linked to
>   Harrowford and to Hesta (over Tam's share of the coin).
> - **Bram** (`Characters/NPCs/Bram.md`): Edda's cousin, who runs the
>   mule-yard and sold Tam the mule. Linked to Edda, Tam and the yard.
> - **The Stag & Lantern** (`Locations/The Stag & Lantern.md`): the inn,
>   inside Harrowford. The party's open tab is in your GM notes.
> - **The Mule-Yard** (`Locations/The Mule-Yard.md`): inside Harrowford,
>   run by Bram. It holds the line about the mule coming back alone.
>
> [...]
>
> **Two things need your decision.** [...]
>
> 1. **Edda owes Orrin Gilt money.** In your vault, Gilt doesn't really
>    exist: he's Lucan using the Hat of Disguise, and Lucan has stayed at the
>    monastery since Session 4. For the debt to stand, "Gilt" needs a life in
>    the valley from before the climb. Edda may not know who he really is,
>    and that could be fun at the table. Or the debt could belong to someone
>    else. Until you decide, I've hidden that link from players.
> 2. **Edda's brother on the wall of the dead (your "??").** It fits the
>    vault as it stands. He went up twenty years ago, the same year Lucan ran
>    away. The dead in the walls go back forty winters, and every one has the
>    lamp tag. I've left it as an open question, not settled.

The GM had forgotten that "Orrin Gilt" is a disguise. The apprentice
hadn't. One line settles it:

> [!you]
>
> Keep the debt. Lucan has used the Gilt name in the valley for years, and
> Edda has no idea who he really is. Leave the brother open for now. And
> yes, delete my notes file.

> [!apprentice]
>
> The debt is now canon, your brother question is still open, and your
> notes file is gone.
>
> - **The debt:** your ruling is written into Edda's GM notes, and her
>   "Canon Conflicts" entry is crossed out as resolved. I also added it to
>   the GM-only secrets in Master Orrin Gilt's note. [...]
>
> Your vault turns on drawing automatically, so I had Codex draw pictures
> for the four new notes. [...] I looked at each one before using it and
> kept all four: portraits of Edda (with the ink-stained fingers) and Bram,
> and scenes of the Stag & Lantern and the mule-yard.

![Edda Marsh, the reeve: a grey-haired woman in a grey shawl, holding a tally stick in ink-stained fingers](/img/tutorials/edda-marsh.jpg)

The GM-only end of Edda's note now reads:

> [!vault]
>
> ### Secrets
>
> - owes [[Master Orrin Gilt|Orrin Gilt]] money, hates that
> - She has no idea who he really is: Lucan has used the Gilt name in the
>   valley for years. (GM ruling, 2026-11-20)
>
> ### Canon Conflicts
>
> - ~~**Who does she owe?** The notes say she owes Orrin Gilt money, but
>   Gilt is Lucan's disguise.~~ — resolved 2026-11-20: the debt stands.
>   Lucan has used the Gilt name in the valley for years, and Edda has no
>   idea who he really is.

## What it does with your notes

- **Your words stay yours.** It files what you wrote. It doesn't rewrite
  it into prose or fill gaps with invention.
- **Players' side and GM side.** What anyone could see (her look, her
  job) goes above the line. Wants, secrets and suspicions go under
  **GM Notes**, which never reach the players' site.
- **Links both ways.** Each new note links to the people and places it
  touches, with the relationship written in the note's details, so the
  graph and the site's hover cards both know about it.
- **New notes start as DRAFT.** They become canon when you say so, or
  when they turn up in play and session wrap-up confirms them.
- **Clashes with canon come back to you.** It checks new notes against
  the vault and asks rather than guesses. It records the clash under
  Canon Conflicts in the note, which stays a DRAFT until you rule.

## Other things to ask it

- "Organize Chapter 3 into scenes based on my session notes."
- "Show me which NPCs have no location."
- "I've added a bunch of notes without structure. Clean up the vault."
- "I need a new kind of note for ships. Add it."

## What comes next

Notes filed, you're ready to [prep a session](/tutorials/prep-a-session/)
around them. After a big import, [check your vault](/tutorials/check-your-vault/)
catches anything that doesn't add up.
