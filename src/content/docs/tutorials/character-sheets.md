---
title: Character sheets
description: Build a new player's character to the rules, see the full sheet on the campaign site, and how the party page keeps up.
checkedAgainst: "1.12.98"
---

<!-- video -->

Each player character is one note in your vault. The apprentice builds it
to the rules, checking every number, and the campaign site turns it into
a full character sheet for Call of Cthulhu, GURPS, D&D or Pathfinder.
Forged in the Dark characters get a simpler page for now. The note also
records who plays the character and how they're doing, so the site's
party page is built from the same notes.

## From a real run

On GM-Apprentice 1.12.98, using the [Snowbound sample vault](https://github.com/AntTheLimey/gm-apprentice-snowbound/tree/sample-v2)
(tag `sample-v2`), a D&D campaign with six characters at 5th level. We
typed the GM's side; the replies are the agent's own, trimmed (`[...]`)
but not reworded.

> A new player, Jo, is joining next session with a level 3 wood elf
> ranger called Tamsin Reedwater. Can you make her character? She rolled
> 15, 14, 13, 12, 10 and 8.

It didn't start building. It checked the campaign first and came back
with three things that didn't fit:

> 1. **The vault already has a player called Jo.** [...]
> 2. **The party is level 5 and Tamsin would be level 3.** All six PCs
>    are level 5. A level 3 character works, but she'd have about 10
>    fewer hit points, no Extra Attack and no 2nd-level spell slots. Do
>    you want her at 3 on purpose, or should she match the party at 5?
> 3. **Which game is "next session" for?** Snowbound looks finished.
>    [...]

Fair on all three; the name was our mistake.

> Sorry, my mistake: the new player is Priya, not Jo. Make Tamsin level 5
> to match the party. Snowbound carries on into the spring, so she joins
> this campaign. Priya says Outlander background and Gloom Stalker; pick
> sensible spells and mark them so she can change them.

> Tamsin Reedwater is built as a level 5 wood elf ranger (Gloom Stalker)
> at `Characters/PCs/Tamsin Reedwater.md`. Her player is Priya. The sheet
> passes the vault's rules check with nothing wrong or flagged. [...]
>
> **Things you should know**
> - **Priya already plays Kael Stonehand.** [...]
> - **Outlander doesn't exist in the 2024 rules.** I used Guide, the 2024
>   background that replaced it: Stealth, Survival, cartographer's tools
>   and the Magic Initiate (Druid) feat. If Priya wants the old 2014
>   Outlander, that's a house-rule call for you. [...]
>
> All of this is also in the note's GM Notes, which players can't see.

(Our sample's players are made up, and we picked a name that was taken
twice. A real table would have spotted that sooner.)

Then we asked to see it, without publishing:

> Commit it. Then build the site on this computer so I can look at her
> sheet before Priya sees it. Don't publish anything yet.

> Tamsin's note is committed, and the site is built and running on this
> computer only. Nothing has been deployed or uploaded. [...]
>
> **The build:** 69 pages, including Tamsin's. The page shows her as a
> level 5 wood elf ranger (Gloom Stalker), and the "Suggested" tags show
> beside the spells Priya can swap. Her GM Notes (the Outlander swap,
> Kael overlap and gear notes) are not on the page.

![Tamsin Reedwater's character sheet: hit points 39 of 39, AC 16, initiative +7, speed 35 ft, then her six abilities with saving throws, and her skills with Stealth at +10](/img/tutorials/sheet-tamsin.jpg)

She has no portrait yet, so the sheet shows her initials; [Add
pictures](/tutorials/add-pictures/) covers drawing one. To dress the
sheets up with a parchment skin or a gilt frame, see [Change the
look](/tutorials/change-the-look/).

## The party page

The site's player characters page opens with a party board built from
the same notes: armour class, hit points, passive Perception, spell save
DC and how each character is doing. Tamsin joined it the moment her note
existed. Under it, each character's open threads.

![The Player Characters page: a Party Status table of seven characters with their AC, hit points, passive Perception, spell DC and status, then Tamsin's one open thread](/img/tutorials/party.jpg)

There's no separate party list to keep up to date. Each character's note
says who plays them and whether they're still in the game, and the board
follows.

## Characters kept on D&D Beyond

If your players keep their D&D characters on D&D Beyond, they don't have
to keep two copies. Make the character's page public on D&D Beyond, and
paste its link into the character's note in the `dndbeyond` field (or
ask the apprentice to). From then on the note is brought up to date from
D&D Beyond: level, ability scores, proficiencies, features, feats,
spells and slots, gear, magic items, coins and attacks. Armour class,
hit points and attack bonuses are worked out from the same data. If the
note has no portrait, it takes the D&D Beyond one.

Your own changes are safe:

- **Write a reason in brackets** and the number is yours: `15 (homebrew
  plate)` or `40 ft (boots of striding)` is never overwritten.
- **Backstory, appearance and personality** you've edited stay yours. If
  the player later changes theirs on D&D Beyond, you're told, not
  overruled.
- **Where it's unsure**, it writes nothing and tells you what to check.

It runs when you ask ("bring Tamsin up to date from D&D Beyond"), or
before every site update if you'd rather (`vault.dndbeyond_sync: build`).
It only ever talks to D&D Beyond, and only reads public characters.
D&D 5e (2024 rules) only.

## Players changing their own sheets

During play, players can mark their own hit points and conditions on
their sheets, and send you requests like "can I swap a spell?". That's
[Players at the table](/tutorials/players-at-the-table/).

## Building for other games

The same request works for every game it knows: "build me a 150-point
GURPS character", "make me a Call of Cthulhu investigator, a 1920s journalist". It checks
point budgets and choices as it goes, and anything that comes from a
book it doesn't have is named so you can check it in yours.
