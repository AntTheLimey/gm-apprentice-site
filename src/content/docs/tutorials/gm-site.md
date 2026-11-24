---
title: The GM site
description: A private copy of your campaign site with every secret showing, for your tablet at the table. It never goes online.
checkedAgainst: "1.12.146"
---

<!-- video -->

You can keep a private copy of your campaign site, with every secret
showing, and open it on a tablet at the table. The steps use three terms:

- The **player site** is the public campaign website.
- The **GM site** is your copy. It has every note, including the ones the
  player site leaves out.
- A **hidden part** is anything players do not see, such as a GM Notes
  section, a secret field or a spoiler.

## Before You Start

The GM site has no password. Anyone on the same network as your computer
can open it, players included. If your players join your own Wi-Fi at the
table, put them on a guest network or mobile data, or stop the GM site
between sessions. Never serve it on the shared Wi-Fi at a convention or
a game shop.

## Turning On the GM Site

The GM site is built on your computer, in a folder beside the player
site's, and served from there. To turn it on:

1.  Ask your apprentice for a GM copy of your campaign site.

    Your apprentice turns the GM site on and builds it. From now on, every
    build makes both sites.

2.  Ask your apprentice to serve the GM site.

    It prints one address for each network your computer is on, such as
    `http://192.168.1.20:4321/`, and one for the computer itself.

3.  On your tablet, open one of the printed addresses in the browser.

    The tablet must be on the same network as your computer.

The GM site runs inside your apprentice's session, and stops when that
session ends. For a whole evening, ask your apprentice for the command to
run in your own terminal instead. Press Ctrl+C there to stop it.

## Reading It at the Table

Each page looks like the player site, with your theme, and carries a band
at the top: `GM copy: not for players`. A page that players do not get at
all has a second band, `Players don't see this page`, with the reason.

Every hidden part sits where it is in the note, marked with why players
do not see it:

- A hidden block, such as a GM Notes section, sits in a tinted box with a
  label.
- A hidden name is underlined, with what players see in brackets after
  it.
- Hidden fields and relationships are listed in a **Hidden from players**
  box at the top of the page.

Here is an NPC's page on the GM site, at tablet size, with the band and
the **Hidden from players** box:

![The GM copy of Abbot Severin's page: a "GM copy: not for players" band, then a "Hidden from players" box listing two GM-only relationships, then his portrait and overview](/img/tutorials/gm-site-top.jpg)

Further down, the same page shows the GM Notes that the player site
leaves out, with the stat block ready to run from:

![The abbot's GM Notes block on the GM site: armour class, hit points, ability scores, traits and actions](/img/tutorials/gm-site-notes.jpg)

Search covers every word on the GM site, the hidden ones included. A
hidden word that lands in a page's title or description, or in a
picture's description, shows there without a mark.

## Seeing What It Shows

The GM site shows everything the player site hides:

- notes the player site leaves out, such as prep and drafts
- every session's Play Notes, Export and Table Log
- hidden sections, fields and relationships
- `gm-only` blocks and spoilers
- callouts the player site hides
- names the player site prints as "someone" or "somewhere"

Comments in your notes stay off by default, because most are notes to
yourself. Ask your apprentice to show them if you want them. Each of the
others can be turned off the same way.

The live features do not run on the GM site: it has no live hit points,
no request inbox and no party board.

## Refreshing the GM Site

Every build of the player site rebuilds the GM site too. After a build,
reload the page on your tablet to see the change. You can also ask your
apprentice to rebuild the GM site alone.

## Keeping It Offline

Publishing refuses the GM site's folder, so the GM site never goes online
with the player site. Its pages also tell search engines to stay away.

The folder is yours to keep private. If the folder is inside a Git
repository, the build warns you not to push it.

## Troubleshooting

These are the problems the GM site runs into most often.

### The Port Is Already in Use

The message reads `Port 4321 is already in use`. Another program, or an
earlier GM site, holds the port. Ask your apprentice to serve the GM site
on another port.

### There Is Nothing Built Yet

The message reads `There is nothing built in` and names the folder. Ask
your apprentice to build the GM site, then serve it again.

## Next Steps

You can now run the session with every secret to hand:

- [At the table](/tutorials/at-the-table/) covers the help your
  apprentice gives during play.
- [Publish your site](/tutorials/publish-your-site/) builds and publishes
  the player site that the GM site copies.
