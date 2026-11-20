---
title: Your own rulebooks
description: Let the apprentice use books you own, kept on your computer and never shared, and the two rough edges to know about today.
checkedAgainst: "1.12.98"
---

<!-- video -->

GM-Apprentice comes with the free rules for each game it knows (the SRD
and ORC texts). Those cover the rules, not the setting: no named
factions, no adventure NPCs, no monsters from the book you bought. If you
own the book, you can turn the parts you need into your own reference
files. They stay on your computer, are never published, and the
apprentice reads them at the table.

**Only for books you own**, or things you wrote yourself. These files
are for your own copy, the way you'd flip through the book at the table.
Don't share them, commit them anywhere public or put them on your
campaign site.

## From a real run

On GM-Apprentice 1.12.98, using the [Snowbound sample vault](https://github.com/AntTheLimey/gm-apprentice-snowbound/tree/sample-v2)
(tag `sample-v2`). We typed the GM's side; the replies are the agent's
own, trimmed (`[...]`) but not reworded. For the test we used a
four-section adventure we wrote ourselves, *The Drowned Mill*, so no
publisher's text was copied anywhere.

> I own the PDF of a D&D adventure book and I'd like you to be able to
> use its monsters and NPCs when I'm running it. How do I do that?

> gm-apprentice handles this with **personal reference files**. You turn
> the parts of the book you need into markdown notes, and Claude checks
> them whenever the built-in rules don't cover something. [...]
>
> If you give me the PDF's path, I can do the conversion and draft the
> monster and NPC files for you to check against the book.

So we did:

> Let's try it on a short one first: ../drowned-mill.pdf is a four-page
> adventure I wrote myself. Set it up for me.

It drafted an overview, the NPCs and the monsters, then asked about two
things our adventure had left loose, rather than making numbers up:

> 1. **Mill Rats are missing their ability scores**, and so Initiative.
>    I've marked them "—" rather than make numbers up. [...]
> 2. **Is Pull Under a trait or an action?** It's in italics after
>    Grasp, which reads like a trait that happens automatically, but it
>    sits under Actions. [...]

We answered, and it saved the files. Then, in a fresh conversation on
game night:

> It's not in the vault, it's in my own reference files for D&D. Check
> there.

> Found it in your D&D 5e personal files (`drowned-mill/`).
>
> **Old Wat** is the eel-catcher. He watches the river and trades what
> he sees for drink. On the night of the flood he saw **a pale shape
> riding the wheel**. [...]
>
> **Wheel Drowner**: Undead, Medium, CR 3 (700 XP), Neutral Evil
> - **AC** 12 | **HP** 45 (7d8+14) | **Init** +1 | **Speed** 20 ft.,
>   swim 40 ft. [...]

## Two rough edges, today

We'd rather you heard these from us than found them on game night.

**Say where to look.** On game night we first asked "what does Old Wat
know?" without mentioning the files, and the apprentice searched the
campaign, found nothing and said so. It didn't make anything up, but it
didn't check your own files either. Until that's fixed
([issue #807](https://github.com/AntTheLimey/gm-apprentice/issues/807)),
say "check my own reference files" when you ask about something from a
book.

**Keep a copy somewhere else.** Your files live inside the plugin's own
folder, in a `personal` folder for your game system. Two things follow
([issue #806](https://github.com/AntTheLimey/gm-apprentice/issues/806)):

- The apprentice may not be allowed to save there. In our run it saved
  a copy next to the PDF and gave us one command to copy the files
  across.
- When the plugin updates, it gets a new folder and your files stay
  behind in the old one. Keep your master copy outside the plugin, and
  copy it back after an update.

## What to put in them

What you'd reach for at the table that the free rules don't have:

- the adventure's or setting's NPCs: who they are, what they want, what
  they know
- its new monsters, one stat block each
- named places, factions and their leaders
- the book's random tables
- extra rules from supplements

Put descriptions in your own words and note page numbers, so you can
find the full text in the book. Skip anything already in the free
rules; the apprentice has those.

The folder for each game is in the
[plugin's guide](https://github.com/AntTheLimey/gm-apprentice/blob/main/docs/personal-reference-files.md).
