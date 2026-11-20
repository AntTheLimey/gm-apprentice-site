---
title: Works with
description: Other tools that read or write a GM-Apprentice campaign folder - D&D Beyond, GM-Scriptorium and mobRPG - what each one does and how to start.
checkedAgainst: "1.12.110"
---

Your campaign lives in ordinary Markdown files in a folder you own, so
other tools can work with the same notes. These three do today.

## D&D Beyond

**Built in. Keeps D&D characters in step with their D&D Beyond pages.**

If your players keep their D&D 5e characters on
[D&D Beyond](https://www.dndbeyond.com), they don't have to keep two
copies. Make the character's page public on D&D Beyond and paste its link
into the character's note, in the `dndbeyond` field (or ask the
apprentice to). From then on the note is brought up to date from D&D
Beyond: level, ability scores, features, spells, gear and more. Anything
you've marked as your own, with a reason in brackets, is never
overwritten.

Nothing to install: it comes with GM-Apprentice. How it works, and what
it leaves alone: [Character sheets](/tutorials/character-sheets/#characters-kept-on-dd-beyond).

## GM-Scriptorium

**A separate program. Turns the same campaign folder into a player-safe
website.**

[GM-Scriptorium](https://github.com/DrNoisys-Softworks/gm-scriptorium) is
free and open source. It builds a campaign website from your notes, like
[Publish your site](/tutorials/publish-your-site/) does, and puts leak
checks at the centre. Before it publishes anything it checks your notes
for GM material and for names you have withheld, then scans the site it
built for those names again. A leak it finds stops the build. It runs on
its own, without an AI agent, with a settings page in your browser.

It's a single download for Windows or Linux, with no Node or npm needed.
Releases are early previews and not signed yet, so Windows will probably
warn you the first time you run one.

- [Download](https://github.com/DrNoisys-Softworks/gm-scriptorium/releases)
- [See a sample campaign built with it](https://drnoisys-softworks.github.io/gm-scriptorium/)

## mobRPG

**A world-building website. Syncs your world with your campaign folder.**

[mobRPG](https://www.mobrpg.com) is a management tool "for developing RPG
realms and the relations between people, places, and things", shared
with the people you invite to a world. If you keep a world there, the
`mobrpg` command-line tool moves content both ways:

- **Into your notes:** import a world, one note for each person, place
  and thing, with its pictures and relationships.
- **Back to mobRPG:** your changes go up as suggestions, and the world's
  owner accepts or dismisses each one. Nothing on mobRPG is overwritten
  without that yes.
- **Your GM Notes stay in your folder.** They are never sent to mobRPG.

It needs a mobRPG account, which you can sign up for on
[mobrpg.com](https://www.mobrpg.com), and Python 3.10 or newer, and installs from a
copy of the GM-Apprentice repository. Setup, sign-in and every command:
[the mobrpg README](https://github.com/AntTheLimey/gm-apprentice/tree/main/tools/mobrpg#readme).
