---
title: Bring in an existing campaign
description: "How vault-ingest turns old TTRPG notes, character sheets, transcripts and maps into a linked campaign vault, and what its interview is for."
checkedAgainst: "1.12.98"
head:
  - tag: title
    content: "Import an existing campaign into a vault | GM-Apprentice"
---

<!-- video -->

The skill behind this is **vault-ingest**, with campaign-organizer (which
builds the vault) and session-wrapup (which writes each session up)
working behind it. You don't call them separately: one conversation does
the lot.

The quick version, on a made-up pile you can download, is
[Start from your notes](/start/from-notes/). This page covers what it
reads, how the interview works, and the other jobs it does.

## When to reach for it

- You ran sessions before you had a vault, and want to catch up.
- You're picking up a campaign that stalled, and the notes are all you have.
- Mid-campaign, something turns up: an old character sheet, a player's
  backstory, handouts that never got filed, a session transcript.
- Your notes live in another tool: Google Docs, Notion, Discord, a VTT's
  chat log.

Starting phrases that work:

- "Here's a folder of everything from our old campaign. Process it all."
- "We played twelve sessions before I set this up. Here are my notes."
- "I found the character sheets from the first arc. Add them to the vault."
- "Here's a transcript of session 8. Turn it into a proper wrap-up."

## What it reads

Markdown, plain text, Word documents, PDFs, images, spreadsheets, and chat
or VTT exports. Point it at a folder anywhere, drop files into the vault's
`_inbox/` folder, or paste text into the conversation.

Your originals are never changed or deleted. Files from `_inbox/` move to
`_inbox/_processed/` with a date stamp; files elsewhere are only read.

## How it goes

1. **Sort.** It reads everything and shows you a table: what each file is
   (notes from play, an NPC list, a sheet, brainstorming), which session it
   belongs to, and what it covers. Ideas that never happened at the table
   are kept apart from what did.
2. **Ask the basics.** Where the vault goes, which rules, what year, what
   to call it. If there's no vault yet, it shows you one before making it.
3. **The interview.** One question at a time, about each player character
   and each gap in the notes. It reminds you of the scene before asking, so
   you're remembering, not guessing.
4. **Write it up.** A page and a wrap-up for every session, with a recap
   for players and GM-only notes; a note for every person, place, item and
   creature; the timeline; the threads still open.
5. **Review.** It lists the small calls left for you, then marks what you
   approve as canon.

It never invents facts. If neither the notes nor you can settle something,
it's marked undecided. Sessions rebuilt from notes carry a reconstruction
note, so you always know what was written after the fact.

## The interview, from the real run

From GM-Apprentice 1.12.98, on the [downloadable pile](/downloads/notes-pile.zip).
We typed the GM's side; the replies are the agent's own, trimmed (`[...]`)
but not reworded.

> [!apprentice]
>
> **Pell (Dev's halfling rogue):** In session 1 he picked the reeve's pocket
> and came away with 4gp and the letter to "R." In session 2 he got the
> trapdoor open, after a nat 1 on his first try. His sheet ends with "wants
> to know who R. is." Across the two sessions, what drove Pell? Was it
> curiosity, greed, wanting to get something on Corwin, or something else?
> And did the reveal that Corwin's family name is Rendal change how he
> treated the letter?

You can answer more than one question at once, and it keeps up:

> [!you]
>
> Pell is pure curiosity, he collects secrets. After the Rendal reveal he
> kept the letter and didn't tell Corwin, he wants leverage. To save time,
> the others: Oswin is a cleric of the dawn, he sided with Brother Eamon
> about sealing the chamber. Bryony is a druid, she got close to Maude and
> to Tobin, she has his whistle. Hale only made session 2, a fighter, quiet,
> he took most of the Bell Man's hits.

> [!apprentice]
>
> I've recorded all four arcs as confirmed play: [...]
>
> **The Bell Man:** In the chamber, Hale tanked it and Oswin cast Cure
> Wounds twice. It said "Rendal" before it "went down." Was it destroyed
> for good, or did it just fall back into the water, so it could still be
> down there?

And "I don't know" is an answer:

> [!you]
>
> Haven't decided. Leave it open.

> [!apprentice]
>
> Got it. The thing in the water stays undecided, and I'll keep it as an
> open thread in the GM-only notes.

At the end:

> [!apprentice]
>
> **Where to start when you pick it back up:** open the Session 2 wrap-up.
> Its GM-only "Handoff" section says where things stand [...]
>
> **Still for you to decide** (on the Session 2 wrap-up's checklist):
> - Is the Bell Man Aldric?
> - Who is "R."?
> - What was in the cellar water? [...]

## Tips

- **Feed it everything.** Mixed formats and half-finished notes are what
  it's for.
- **Go in order.** For a long campaign, bring sessions in chronologically;
  earlier ones help it place later material.
- **Pictures too.** Portraits, maps and handouts mixed in with the notes
  get matched to the right people and places.
- **Check it afterwards.** After a big import, ask "anything broken in the
  vault?" for a health check.

## Next

- Prep the next session in the same folder
  (see [Prep a session](/tutorials/prep-a-session/)).
- Every option vault-ingest has: [its page in the plugin docs](https://github.com/AntTheLimey/gm-apprentice/blob/main/docs/vault-ingest.md).
