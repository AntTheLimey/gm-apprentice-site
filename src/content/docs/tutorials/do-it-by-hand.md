---
title: Do it by hand
description: Make a vault, check it, search it and build your players' website with GM-Apprentice's own commands, and no agent at all.
checkedAgainst: "1.12.140"
head:
  - tag: title
    content: "Run GM-Apprentice without an AI agent"
---

<!-- video -->

Under the apprentice is a folder of notes and a set of ordinary
programs: [Where the AI stops](/where-the-ai-stops/) says which. This
page uses those programs directly, with no agent anywhere. It goes from
an empty folder to a campaign website with a secret kept off it, and a
GM copy with the secret showing.

## What you need

- **Python 3.10 or newer** and **Node 22.21 or newer**. The
  [setup page](/start/setup/#install-python) says how to get them.
- **A terminal.** Every step is a command you type.
- **GM-Apprentice itself.** Download the zip of the latest release from
  [its releases page](https://github.com/AntTheLimey/gm-apprentice/releases/latest)
  and unzip it. Nothing to install: it runs from the folder.

## From a real run

On GM-Apprentice 1.12.140 on a Mac, starting from nothing. We made a
folder called `games`, unzipped GM-Apprentice into it and renamed the
new `gm-apprentice-1.12.140` folder to `gm-apprentice`. Every command
below is typed in `games` unless we say otherwise, and the output is the
program's own, trimmed (`[...]`) but not reworded.

Everything goes through one script, `gma`. Its full name is long, so on
a Mac or Linux give it a short one first, in `games`:

```bash
alias gma="python3 '$PWD/gm-apprentice/skills/shared/scripts/gma.py'"
```

That lasts until you close the terminal window; put the same line in
your shell's start-up file to keep it. On Windows, type the full
`python3` line, with the path to your `gm-apprentice` folder, wherever
we write `gma`.

Check the computer is ready:

```bash
gma doctor
```

```text
ok  Python 3.14.4
ok  gm-apprentice 1.12.140, a plugin
ok  Node 25.5.0
ok  the publish tool 1.70.58, at [...]/games/gm-apprentice/tools/publish/bin/gm-publish.js
Ready.
```

## Make a vault

A vault is the campaign's folder of notes. One command makes it, with
the folders, a template for each kind of note and a character sheet for
your system. Without `--write` it only shows what it would make:

```bash
gma vault-scaffold Lantern --system dnd-5e-2024 --name "The Lantern Road"
gma vault-scaffold Lantern --system dnd-5e-2024 --name "The Lantern Road" --write
```

```text
CREATED	_meta/
CREATED	_Campaign/
CREATED	_Templates/
[...]
CREATED	_Templates/_Template_NPC.md
CREATED	_Templates/_Template_Location.md
[...]
CREATED	_Templates/pc-dnd-5e-2024.md
[...]
# create: 58
```

The other systems are `coc-7e`, `coc-7e-regency`, `gurps-4e`, `pf2e` and
`fitd`, or `--no-system` for plain templates. It never overwrites a file
that's already there.

## Write some notes

Copy a template from `_Templates` into the right folder and fill it in,
in any text editor. [Obsidian](https://obsidian.md) is a good one, and
the vault opens in it as it is. Each template explains its own parts in
`{braces}`; delete the ones you don't fill in, and the example
relationship if you don't need it.

We copied the NPC template to `Characters/NPCs/Odile Marsh.md`. The top
of a note is its details, between `---` lines. Ours, trimmed:

```yaml
name: "Odile Marsh"
type: npc
canon_status: CANON
# [...]
aliases: ["the lamp-wright"]
# [...]
occupation: "Lamp-wright"
age: 58
status: alive
location: "[[The Last Lamp]]"
relationships:
  - target: "[[The Last Lamp]]"
    type: located_at
    tone: friendly
    strength: 7
    bidirectional: false
    description: "keeps the lamps lit"
```

Under it goes what the players know. What they don't goes inside the
`gm-only` fence the template already has:

> [!vault]
>
> ## Overview
>
> Odile trims and fills the lanterns along the road out of Fenwick. She
> met the party at the inn and sold them oil at twice the going rate.
>
> ## Appearance & Manner
>
> Soot on her knuckles that never washes off. Counts coins twice.
>
> [...]
>
> `<!-- gm-only -->`
>
> ## GM Notes
>
> ### Secrets
>
> She lets one lamp on the road go dark each new moon, and she is paid
> to.
>
> `<!-- /gm-only -->`

A link is a name in double brackets, like `[[The Last Lamp]]`. We
wrote a note for that inn too, in `Locations`, and in it linked a friar,
`[[Brother Calloway]]`, who didn't have a note yet.

## Check it

Two commands find most mistakes. `links` lists the links that go
nowhere, and `vault-check` runs every content check:

```bash
gma links Lantern
gma vault-check Lantern all
```

Ours found four things wrong:

```text
# broken: 1 name in 1 note; not checked: _QA, _archive (0 names)
UNWRITTEN	Brother Calloway	1 note: Locations/The Last Lamp.md
```

```text
## frontmatter
# count: 2
ERROR	Characters/NPCs/Odile Marsh.md	canon_status: 'CANON' must be one of: AUTHORITATIVE, DRAFT, STUB, SUPERSEDED
ERROR	Locations/The Last Lamp.md	canon_status: 'CANON' must be one of: AUTHORITATIVE, DRAFT, STUB, SUPERSEDED
[...]
## index
# count: 2
WARNING	Characters/NPCs/Odile Marsh.md	not referenced from _meta/index.md
WARNING	Locations/The Last Lamp.md	not referenced from _meta/index.md
[...]
## relationships
# count: 1
WARNING	Locations/The Last Lamp.md:18	'knows' is two-way: set bidirectional: true
[...]
```

All four were ours, and that's what the checks are for:

- **The friar had no note.** We copied the NPC template to
  `Characters/NPCs/Brother Calloway.md`, set its status to `STUB` (a
  note still to be written up), gave it a `located_at` tie to the inn,
  and cut the body to one line. Left in, the template's example tie and
  its `{Name}` links get flagged too.
- **`CANON` isn't a status.** We'd guessed. The error lists the four
  that are; settled notes are `AUTHORITATIVE`.
- **The index** is a list of every note, in `_meta/index.md`. It builds
  itself: `gma index-build Lantern` shows the change, and `--write`
  makes it.
- **The inn's tie to Odile** was a `knows`, which goes both ways. Her
  note already says where she works, so we took the inn's tie out.

Run both again and there are no errors or warnings left. `gma
graph-check Lantern orphans` finds notes nothing links to (on a new
vault it lists a few of the scaffold's own files, which is fine).
`gma llms` lists every command, the checks on D&D and GURPS sheet
numbers among them.

## Search, and look up a rule

`vault-search` searches your own notes, best match first:

```bash
gma vault-search Lantern lamp --context
```

```text
# matched: 4
4.449	Characters/NPCs/Odile Marsh.md
    aliases: ["the lamp-wright"]
4.318	Locations/The Last Lamp.md
    name: "The Last Lamp"
[...]
```

`rules-lookup` searches the open rules that come with it. For D&D
that's the free rules, SRD 5.2:

```bash
gma rules-lookup dnd-5e-2024 Grappled
gma rules-lookup dnd-5e-2024 Goblin --limit 3
```

```text
# match: exact (2)
Grappled	dnd-5e-2024	condition	dnd-5e-2024/conditions-rules.md:14	Effects=Speed becomes 0. Ends if grappler is Incapacitated or target is forced out of grappler's reach. Escape: Athletics or Acrobatics vs grappler's Athletics.
[...]
```

A monster comes back with its stat block. For rulebooks you own, see
[Your own rulebooks](/tutorials/your-own-books/).

## Build the website

The site gets its own folder beside the vault. `gma publish` runs the
publish tool that came in the download, and `init` makes the folder and
turns the site on in the vault's settings:

```bash
gma publish init lantern-site --vault Lantern --title "The Lantern Road"
cd lantern-site
npm install
npm run build
```

```text
  created package.json
  created vault.config.json
[...]
  wrote player_site.publish, player_site.folder, player_site.title, [...] to _meta/vault-config.yaml in [...]/Lantern
```

```text
[...]
  wrote characters/npcs/odile-marsh.html
[...]
  wrote index.html
  wrote NOTICE.txt
Done!
```

`npm install` links the site to the tool in your download, and needs
nothing from the internet. The site is now in `lantern-site/docs`. To
look at it, still in `lantern-site`:

```bash
gma publish serve --site player
```

It prints an address to open, and runs until you press Ctrl+C. Here is
Odile on the players' site. Her secret isn't there:

![Odile Marsh's page on the players' site: her name, role, status and age, then Overview, Appearance & Manner and Related, with no GM Notes](/img/tutorials/by-hand-player.jpg)

## Check what the players get

Two commands answer "is that on the site?" `explain` says, for one note,
whether it publishes and what's cut from it:

```bash
gma publish explain "Characters/NPCs/Odile Marsh.md"
```

```text
[...]
  VERDICT: publishes at docs/characters/npcs/odile-marsh.html

  sections stripped on publish: GM Notes
  gm-only blocks: 1
```

`leaks check` reads the finished site for any hidden text that got
through:

```bash
gma publish leaks check
```

```text
No hidden text, secret name or never-show word on the player site (23 files read).
```

Worth knowing by hand: **every note with a `type:`, in a folder the
site maps, publishes** unless something keeps it off. GM Notes
sections, `gm-only` fences, fields like `secrets`, and folders like
`_meta` and `_Templates` stay off, and so does a note that says
`publish: false`. A note still marked `DRAFT` goes on, with a Draft
badge. The apprentice keeps a publish list for you, and you can keep
one too (`gma publish manifest --help`); once there is one, a note
publishes only if it's on it.

## The GM copy

The GM site is the same build with everything showing, for your screen
or a tablet at the table. Turn it on once, then each build makes both:

```bash
gma publish settings set gm_site.publish=on
npm run build
gma publish serve --port 4411
```

```text
Wrote gm_site.publish.
Made the GM site's folder: [...]/lantern-site-gm (gm_site.folder).
```

```text
Serving the GM site from [...]/lantern-site-gm
http://[...]:4411/
http://localhost:4411/
Anyone on this network can open these addresses, players included: serve it only where you trust the network.
Press Ctrl+C to stop.
```

Without `--port` it uses 4321. The same page, GM copy:

![Odile Marsh's page on the GM site: a "GM copy: not for players" band across the top, and a GM Notes block with her secret about the lamp on the road](/img/tutorials/by-hand-gm.jpg)

[The GM site](/tutorials/gm-site/) has more on it. The publish tool
refuses to upload it.

## Put it online

`deploy`, from the site folder, builds the players' site, runs the leak
check, stops if it finds anything, and uploads:

```bash
gma publish deploy --verify
```

The first time needs a little setting up on your host:

- **Cloudflare Pages** (the default): save a Cloudflare API token with
  `gma publish doctor --set-cloudflare-creds`, and create the Pages
  project once with Cloudflare's `wrangler`. The plugin's
  [Cloudflare steps](https://github.com/AntTheLimey/gm-apprentice/blob/main/skills/publish-site/references/cloudflare-pages.md)
  give the commands. A Cloudflare site can also have
  [live sheets and the request box](/tutorials/players-at-the-table/).
- **GitHub Pages**: set `player_site.host=github-pages` and
  `player_site.url` with `gma publish settings set`, make the site folder
  a GitHub repository with an `origin`, and turn on Pages from its
  `docs` folder in the repository's settings. The plugin's
  [GitHub steps](https://github.com/AntTheLimey/gm-apprentice/blob/main/skills/publish-site/references/github-pages.md)
  go through it. After that, `deploy` commits `docs/` and pushes it.

`deploy --dry-run` shows what it would do and runs the leak check
without uploading anything.

## After each session

Write up what happened and update the notes it touched. Then, from
`games`:

```bash
gma index-build Lantern --write
gma links Lantern
gma vault-check Lantern all
```

and from `lantern-site`, `npm run build` and `gma publish deploy`.

When a new GM-Apprentice comes out, delete the old `gm-apprentice`
folder, unzip the new one and rename it the same way, then run
`gma update Lantern`. It brings the vault and the site up to the new
version and takes a backup of your notes first. Anything that would
remove what you wrote, it lists and leaves alone: answer each with
`gma update Lantern --answer <id>=<choice>`, as it shows.

## The settings behind it

The site's settings live in the vault, in `_meta/vault-config.yaml`.
`init` wrote most of ours; trimmed, it reads:

```yaml
version: 1
vault:
  campaign: The Lantern Road
  system: dnd-5e-2024
  attachments: _attachments
player_site:
  publish: true
  folder: [...]/lantern-site
  title: The Lantern Road
  # [...]
  hide:
    folders:
      - _meta
      - _Templates
    sections:
      - GM Notes
      - DM Notes
      # [...]
    fields:
      - secrets
      # [...]
      - gm_notes
      # [...]
    callouts: true
gm_site:
  publish: true
  folder: [...]/lantern-site-gm
```

Change them with `gma publish settings set`, or in any text editor.
`gma publish settings list` names every one, and
`gma publish settings describe <name>` says what one does.

## Next

- Every command, with when to use it and an example: `gma llms`, or
  [the same pages on GitHub](https://github.com/AntTheLimey/gm-apprentice/blob/main/skills/shared/gma/llms.md).
- [The publish tool's README](https://github.com/AntTheLimey/gm-apprentice/blob/main/tools/publish/README.md)
  and [every site setting](https://github.com/AntTheLimey/gm-apprentice/blob/main/docs/site-settings.md).
- [Change the look](/tutorials/change-the-look/) and
  [Handouts](/tutorials/handouts/) are written for the apprentice, and
  the settings they end with work the same by hand.
- [GM-Scriptorium](/works-with/#gm-scriptorium) builds a site from the
  same folder, with buttons instead of commands.
- [Where the AI stops](/where-the-ai-stops/) says what the apprentice
  adds, if you want some of it later.
