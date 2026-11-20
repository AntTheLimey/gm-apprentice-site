---
title: The GM site
description: A private copy of your campaign site with every secret showing, for your tablet at the table. It never goes online.
checkedAgainst: "1.12.98"
---

<!-- video -->

Your players' site hides the traitor, the stat blocks and the things in
the cellar. The GM site is a second copy of it with all of that showing,
each hidden part marked with why players don't see it. It's built on
your computer and read on your own screen, or on a tablet or phone on
your home network. It is never put online: the publish tool refuses to
upload it.

## From a real run

On GM-Apprentice 1.12.98, using the [Snowbound sample vault](https://github.com/AntTheLimey/gm-apprentice-snowbound/tree/sample-v2)
(tag `sample-v2`). We typed the GM's side; the replies are the agent's
own, trimmed (`[...]`) but not reworded.

> [!you]
>
> I'd like my own GM copy of the campaign site, with everything in it,
> that I can look at on my tablet during the game. My players mustn't be
> able to see it.

> [!apprentice]
>
> Your GM copy of the Snowbound site is built and running. To see it on
> your tablet, connect to the same Wi-Fi as this computer and open:
>
> **http://[...]:4321/**
>
> I checked that the home page and the adventure brief both load.
>
> **What's in it:** every note in the vault, including GM Notes, secrets,
> spoilers and hidden sections. Each hidden part is marked with why
> players wouldn't normally see it. That's 118 pages, plus the Snowbound
> adventure brief, which the default set-up left out. I added the brief
> to the GM copy only, so it won't appear on any player site. [...]
>
> **Who can see it:**
> - **It never goes online.** The publish tool refuses to upload this
>   folder anywhere.
> - **Anyone on your Wi-Fi can open that address.** If your players are
>   at your table on the same network, someone who knew or guessed the
>   address could see everything. If that's a worry, have them use a
>   guest network or mobile data, or stop the server between sessions.

(The gap is our computer's address on our home network. Yours will be
your own.)

Here's Snowbound's abbot on the GM site, at tablet size. The band across
the top says it's the GM copy, and the box under it lists his ties the
players haven't found yet:

![The GM copy of Abbot Severin's page: a "GM copy: not for players" band, then a "Hidden from players" box listing two GM-only relationships, then his portrait and overview](/img/tutorials/gm-site-top.jpg)

Further down, his GM Notes, which the player site leaves out entirely:
the whole stat block for the fight, ready to run from.

![The abbot's GM Notes block on the GM site: armour class, hit points, ability scores, traits and actions](/img/tutorials/gm-site-notes.jpg)

## Using it at the table

- **Start it before the game.** Ask the apprentice to "serve the GM
  site", or run the command it gives you in a terminal of your own. A
  terminal of your own is steadier for a whole evening; Ctrl+C stops it.
- **After you change your notes**, ask for a rebuild and reload the page
  on your tablet.
- **Mind the Wi-Fi.** Anyone on the same network who has the address can
  open it. Put players on a guest network, or stop the server between
  sessions.

## What it shows

Everything the player site hides, each with a mark saying why: notes the
player site leaves out (prep, drafts), hidden sections such as GM Notes,
GM-only relationships, GM-only and spoiler blocks, and the real names
behind anyone the player site calls "someone". Comments you leave
yourself in notes stay out unless you switch them on. One thing to
know: a hidden word that lands in a page's title or description, or a
picture's description, shows there without a mark.

The live party board and the players' request box stay on the players'
site.

## The settings behind it

```yaml
gm_site:
  publish: true
  show:
    comments: false
```

Every switch is in the
[plugin's site settings](https://github.com/AntTheLimey/gm-apprentice/blob/main/docs/site-settings.md#the-gm-site).
