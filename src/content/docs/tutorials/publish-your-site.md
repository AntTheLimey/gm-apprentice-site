---
title: Publish your site
description: Turn your vault into a campaign website for your players, on Cloudflare Pages or GitHub Pages, with your secrets left out.
checkedAgainst: "1.12.98"
head:
  - tag: title
    content: "Publish a campaign website for your players | GM-Apprentice"
---

<!-- video -->

The skill behind this is **publish-site**. It turns your vault into a
website for your players: session recaps, character sheets, people,
places, maps and a timeline, all linked. Anything you've marked as
GM-only stays out. Every site in the [gallery](/gallery/) was made this
way.

## What you need

- **Node 22.21 or newer** ([nodejs.org](https://nodejs.org)). It builds the
  site.
- **A free account with a host.** Cloudflare Pages is the suggested one, and
  the one that supports the live features (hit points that update during
  play, players' sheet change requests). GitHub Pages works too.
  For Cloudflare, [Set up Cloudflare](/tutorials/set-up-cloudflare/) walks
  through the account and its token.

Both hosts are free for a campaign site.

## From a real run

On GM-Apprentice 1.12.98, using the [Snowbound sample vault](https://github.com/AntTheLimey/gm-apprentice-snowbound/tree/sample-v2)
(clone or download tag `sample-v2` to follow along). We typed the GM's
side; the replies are the agent's own, trimmed (`[...]`) but not reworded.

> [!you]
>
> Put this campaign online for my players.

It checks your computer first, then asks for the few things it can't
decide for you, each with a suggestion:

> [!apprentice]
>
> The vault is ready and your computer passed the Cloudflare check: Node,
> git and a logged-in Cloudflare account are all in place. [...]
>
> 1. **Project name.** Your site's web address will be
>    `https://<name>.pages.dev`. [...]
> 2. **Site folder.** This is where the site's files are kept on your
>    computer, in a new folder separate from the vault. [...]
> 3. **Homepage image.** This picture goes on the homepage and the 404 page.
>    [...]

> [!you]
>
> Call the project tutorial-scratch-campaign, put the site folder at
> ../snowbound-site next to the vault, and use the Saint Aubren's Rest
> picture.

Then it builds the site and goes through what your players will see before
anything is uploaded:

> [!apprentice]
>
> - **Which pages players see:** the vault already had a list of which pages
>   go on the site. It puts 74 pages online: the four sessions with their
>   wrap-ups, the NPCs and player characters, locations, items, creatures,
>   events, the four player maps, Hesta's Letter and the world notes. It
>   keeps prep, planning, play notes, the GM maps and the `_midwife` folder
>   off the site. [...]
> - **Spoilers:** the list puts the Dragon Under the Glacier, the Dragon's
>   Cavern, the Ice Crypt and the unmasking of Lucan online. Your players
>   reached the dragon's hoard in session 4, so that's probably intended,
>   but check before anything goes up.
> - **Licence:** the D&D rules text in the vault is short, paraphrased SRD
>   5.2 material. The site carries the SRD credit page (CC BY 4.0)
>   automatically.

The last step creates the project on your host and uploads the site. Your
agent asks before running it; say yes. (For this page we stopped there, so
there's no tutorial-scratch-campaign site. The real one is
[snowbound-dnd.pages.dev](https://snowbound-dnd.pages.dev).)

## What stays secret

You decide, and the apprentice checks with you:

- **Whole notes** go on the site only if they're on the publish list. New
  notes wait for your decision; until then they don't publish.
- **Sections** headed GM Notes (and the like) are cut from published pages.
- **Fields** such as `secrets` and `gm_notes` never publish.
- **Folders** for prep, planning and the Midwife's workspace stay off.
- **Anything else you mark GM-only** stays off. The site check is
  thorough, but read its summary: in the run above it also pointed out
  page titles that might spoil something.

## After each session

Ask "update the site" after a wrap-up. It adds the new session, its recap
and anything new, asks about notes it hasn't seen before, and uploads.

## Next

- [Change the look](/tutorials/change-the-look/): ready-made looks, your
  own colours, character sheet skins.
- [Add pictures](/tutorials/add-pictures/): portraits, maps and scene
  pictures.
- [House rules](/tutorials/house-rules/) get their own page on the site.
- Everything the publish tool does:
  [its page in the plugin docs](https://github.com/AntTheLimey/gm-apprentice/blob/main/docs/publish-tool.md).
