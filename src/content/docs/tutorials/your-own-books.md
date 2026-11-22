---
title: Your own rulebooks
description: Let the apprentice use books you own. Your notes stay in a folder on your computer, survive updates and are checked by name at the table.
checkedAgainst: "1.12.119"
---

<!-- video -->

GM-Apprentice comes with open rules for each game it knows (built on the
SRD and ORC texts, and for GURPS the plugin's own summaries). Apart from
Lovecraft's own places and creatures for Call of Cthulhu, those cover the
rules, not a published setting: no named factions, no adventure NPCs, no
monsters from the book you bought. If you own the book, you can turn the
parts you need into your own reference files. The files stay on your
computer, outside the plugin and your campaign, and the apprentice reads
them when you prep, play and wrap up.

**Only for books you own**, or things you wrote yourself. These files
are for your own copy, the way you'd flip through the book at the table.
Don't share them, commit them anywhere public or put them on your
campaign site. If a book's NPC becomes a note in your campaign, keep the
book's own wording out of what players can see.

## From a real run

On GM-Apprentice 1.12.119, using the [Snowbound sample vault](https://github.com/AntTheLimey/gm-apprentice-snowbound/tree/sample-v2)
(tag `sample-v2`). We typed the GM's side; the replies are the agent's
own, trimmed (`[...]`) but not reworded. For the test we used a
short adventure we wrote ourselves, *The Drowned Mill* (one sheet, with
page numbers in its headings), so no publisher's text was copied
anywhere, and a stand-in home folder.

> [!you]
>
> I own the PDF of a D&D adventure book and I'd like you to be able to
> use its monsters and NPCs when I'm running it. How do I do that?

> [!apprentice]
>
> Give me the PDF's path and ask me to **keep its monsters and NPCs as
> personal reference files**. I'll read it and write short notes that I
> can look things up in at the table. [...]
>
> The notes keep the numbers exact, put the descriptions in my own words
> and cite page numbers. There's nothing to configure. [...]
>
> - **Check the stat blocks:** two-column pages and tables often extract
>   badly, so compare the numbers with your book before relying on them.
>   [...]

It had also spotted our PDF beside the vault, and asked whether that was
the book:

> [!you]
>
> Yes, do it. It's a short one I wrote myself, so keep the undercroft too.

It saved four files: the monsters, the people, the places and an index.
Then it listed what our adventure leaves open:

> [!apprentice]
>
> **The adventure leaves some things open.** I marked these as "not
> given" rather than inventing answers:
>
> - **Pull Under:** it doesn't say what kind of action this takes. It
>   also needs the target to be in water, but the race has been dry for
>   a week and the undercroft isn't described as flooded.
>
> [...]
>
> - **The miller:** it doesn't say who tied him to the axle, and your
>   players will probably ask.
>
> [...]

Fair questions, both. Then we moved the PDF away and started a fresh
conversation on game night, without mentioning the files:

> [!you]
>
> We're running the Drowned Mill tonight. The party just cornered Old
> Wat at the eel traps. What does he know, and what are the Wheel
> Drowner's stats if they go down to the wheel?

> [!apprentice]
>
> **Old Wat** (eel-catcher, no stats; p. 2): sees everything on the river
> and trades it for drink. He saw **a pale shape riding the wheel on the
> night of the flood**. [...]
>
> **Wheel Drowner** (p. 3): Medium Undead, NE, CR 3
>
> - **AC** 12 | **HP** 45 (7d8+14) | **Speed** 20 ft., swim 40 ft. |
>   darkvision 60 ft.
>
> [...]
>
> - **Lay it to rest:** untie the miller's body from the wheel's axle in
>   the undercroft (p. 4).
> - **Not given:** Grasp's reach, Pull Under's action type, immunities,
>   whether the undercroft holds water. The race has been dry a week, so
>   decide that before they go down: Pull Under needs water.
>
> [...]

Neither name is in the campaign, so it looked in our own files before
answering. (The part we cut off the end is it bringing the sample vault up
to date with the new version.)

## Where your files live

In a folder of their own in your home folder, with a folder inside it per
game, made when the apprentice first saves something for that game:

```text
~/gm-apprentice/personal/
  coc-7e/
  dnd-5e-2024/
  fitd/
  gurps-4e/
  pf2e/
```

On Windows, `~` is your user folder (`C:\Users\<you>`). The folder is
outside the plugin, so updating or reinstalling GM-Apprentice leaves your
files alone. You can open, edit or add to them yourself; they're plain
Markdown. If you make a game's folder by hand, use the name above.

**If you made files on an older version,** they were inside the plugin.
The apprentice copies any it finds into the new folder the first time it
updates your campaign or looks there, and says what it copied. It never
moves, deletes or overwrites a file.

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

The [plugin's guide](https://github.com/AntTheLimey/gm-apprentice/blob/main/docs/personal-reference-files.md)
has more on laying the files out.
