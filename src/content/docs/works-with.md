---
title: Works with
description: Other tools that read or write a GM-Apprentice campaign folder - GM Assistant, D&D Beyond, GM-Scriptorium and mobRPG - what each one does and how to start.
checkedAgainst: "1.12.110"
head:
  - tag: title
    content: "Works with D&D Beyond, GM Assistant and mobRPG | GM-Apprentice"
---

Your campaign lives in ordinary Markdown files in a folder you own, so
other tools can work with the same notes. These four do today.

## GM Assistant

**Record the session, and wrap-up does the rest.**

[GM Assistant](https://gmassistant.app) takes notes so you don't have to.
Record your session at the table or online, upload the audio, and a few
minutes later you have a recap of the session, its memorable moments, a
scene-by-scene outline, and every NPC, place and item that came up. It
works for any game system. Your first session is free, and there's no
subscription.

Hand the export to the apprentice when you wrap up:

> [!you]
>
> Here's my GM Assistant export from tonight.

[Wrap-up](/tutorials/wrap-up-a-session/) knows the export when it sees
it, and takes it from there:

- **The recap stays yours.** GM Assistant's summary becomes the
  session's recap word for word, with links added to every person and
  place it names.
- **Names spelled your way.** A recording hears names, it doesn't spell
  them. Wrap-up checks every name in the export against your vault and
  puts your spelling in, after you confirm each one. Every correction is
  listed in the wrap-up. These are three from a session of *Canticle of
  the End*:

> [!vault]
>
> ### Name Conflicts (export vs. vault canon)
>
> | Export said | Vault canon | Applied |
> |-------------|-------------|---------|
> | Gosh | Ghosh ([[Acharya_Devendra_Ghosh]]) | recap and all entries |
> | Chattanagal | [[Chandernagore]] | recap and all entries |
> | Lord Pelham | Sir Roderick Pelham ([[Roderick_Pelham]]) | entries |
>
> [...]

- **Your vault, brought up to date.** The NPCs, places and items in the
  export update the notes you already have and become new notes where
  you don't. Where the export disagrees with something from an earlier
  session, it's flagged for you, not overwritten.
- **Memorable moments become cards** on the session's Story page, each
  tagged dramatic, intriguing, funny, epic or tragic. Your players get the
  table's best lines back.
- **The player characters stay the players'.** Nothing in an export
  changes a PC's details. A question about one goes on your checklist,
  to ask at the table.

![Memorable Moments on a Canticle of the End story page: seven from the session, as cards tagged dramatic, intriguing and tragic, among them Percy Cartwright's line "He shut his book and said he had a hunt to dress for."](/img/gma-moments.jpg)

Three of the campaigns in our [gallery](/gallery/), *Canticle of the
End* and *Dead End* among them, were wrapped up from GM Assistant
exports. Exports from before you started with GM-Apprentice come in
too: [bring in your old campaign](/tutorials/bring-in-a-campaign/) and
they're recognised as session records.

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
