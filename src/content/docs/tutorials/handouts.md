---
title: Handouts
description: Letters, clippings, printouts and orders in the voice of whoever sent them, laid out to print and posted to the players' site the moment they find one.
checkedAgainst: "1.12.112"
head:
  - tag: title
    content: "Printable player handouts for your campaign | GM-Apprentice"
---

A handout is the thing the players hold: the letter in the dead man's
coat, the notice nailed to the gate, the message on the datapad. Ask the
apprentice for one and it writes the words in the voice of whoever sent
it. It files the handout in your vault and builds it a page on the
campaign site, laid out to print. The page stays hidden until the
players actually find it.

The apprentice calls them **props**, and so does the site.

## From real campaigns

This is Sophia's note from *Canticle of the End*, a Regency Call of
Cthulhu campaign in the [gallery](/gallery/). It reached the
investigators inside a lady's glove, and its page says how to
make the real thing for the table.

![A torn slip of paper headed Government House, 11th Oct, in a quick hand: First light. The rings. I ride alone on Wednesdays. You asked my husband a question in the churchyard. I have the answer. Burn this. Under it, in italics: cut along the torn edges, fold in three, and push it into the wrist of a lady's left glove](/img/tutorials/handouts-glove.jpg)

That one is a page laid out by hand for this campaign. You don't have to lay
anything out yourself: a handout can take one of nine ready-made looks
instead, built from its words alone.

![Nine handouts, one in each look. Letter: Hesta's letter to Tam in copperplate. Hand: a folded note in a quick pen. Terminal: Six's report to P.E.T.A. in green capitals on a datapad. Form: a corporate notice of unrecovered property with a filing bar. Clipping: a torn newspaper column, The Harrowford Crier. Decree: a bordered proclamation in black letter with a red wax seal. Scroll: parchment on wooden rods. Ticket: a carter's ticket with a perforated stub. Passport: an open data page with a photo box](/img/tutorials/handouts-styles.jpg)

The letter is from *Snowbound*, our sample campaign. The hand, terminal
and form are from *Dead End*, a GURPS space game in the gallery. We
wrote the other five as examples for this page, on a copy of Snowbound
that was never published.

## Asking for one

Say what it is, who wrote it and what it has to tell the players:

> [!you]
>
> Write a handout: the letter Hesta gave Tam before he went up the pass.
> She's telling him not to pay the brothers' price for the cure.

The apprentice ([ttrpg-expert](/tutorials/rules-npcs-and-ideas/)) writes it
in that person's voice: a soldier writes clipped and factual, an
aristocrat never comes to the point, and someone desperate writes in
fragments. It keeps each
handout to a page or two, and puts at least one thing in it the players
can act on, a name, a date or a contradiction, so they learn handouts
are worth reading. It writes the handout's GM notes too: what it gives
away to a careful reader, and how it reaches the players. Then it asks
before it files anything.

Underneath, a handout is an ordinary note in its chapter's `Props`
folder. This is Hesta's letter in the
[Snowbound sample vault](https://github.com/AntTheLimey/gm-apprentice-snowbound/tree/sample-v2).
A few lines at the top say which look it takes and the session the
players found it in:

```yaml
name: "Hesta's Letter"
type: prop
prop_style: "letter"
revealed_in: "[[Session 04 - Long Night Early]]"
```

Then the note itself, trimmed:

> [!vault]
>
> ## Description
>
> A single sheet of cheap valley paper, folded small and soft from a
> pocket. Written in pencil, in a careful hand that presses too hard.
>
> ## The Text
>
> > Tam.
> >
> > If the brothers want paying, don't pay it. I'd sooner have you home
> > than have the cure.
> >
> > Home by spring, either way.
> >
> > Your Hesta
>
> [...]
>
> ## GM Notes
>
> ### What It Reveals
>
> Hesta knew the house might ask a price, and told Tam not to pay it.
> [...]

What's under **The Text** is what goes on the page. The **GM Notes**
never reach the site.

## The nine looks

Each look takes a few details of its own, which the apprentice fills in
from what the handout is:

- **letter**: a period letter in ink, one sheet to a page.
- **hand**: a handwritten scrap, folded, printed to cut out.
- **terminal**: a green screen, with a button that shows it as a
  printout (it uses less ink). It can come with its envelope.
- **form**: official hardcopy with a filing bar and a rubber stamp.
- **clipping**: a newspaper column with its masthead and date.
- **decree**: a bordered proclamation with a wax seal, and the words
  you want pressed into the seal.
- **scroll**: parchment on rods, in an old hand.
- **ticket**: a card ticket with a serial number and a stub to tear off.
- **passport**: an open data page, with the holder's name as its title.

**One hand per writer.** Everyone who writes by hand gets their own
handwriting, and keeps it. Two notes in the same hand tell a careful
player the same person wrote both.

**Your own page.** For anything the looks don't cover, such as a map, a
menu card or a page laid out by hand like Sophia's note, attach your
own file to the note: an HTML page, a PDF or a picture. Canticle's
handouts are all done this way. A vault can also carry looks of its
own beside the nine, and Canticle has one.

**Printing.** Every handout page has a bar at the top that tells you
how to print it. Tick *Background graphics*, set the margins to *None*,
and each sheet prints on its own page.

## Hidden until they find it

A new handout stays off the site. When you
[wrap up the session](/tutorials/wrap-up-a-session/) where the players
got it, the apprentice lists what came out in play, handouts included,
and you pick what to show. The handout gets its page, the recap links to
it, and its note records the session (`revealed_in`). You never edit a
list by hand to show one, and nothing shows early.

## The props page

The site lists every handout the players have on one page, linked from
the menu under **Reference**. Each one has a line saying how it reached
them. Handouts can sit under headings of your choosing, or under the
chapter they came from.

![Dead End's props page, Handout Props, in green terminal lettering: a heading per character's background, each handout with one line on what it is, such as Kumari's note, a scrap of paper folded small enough to hide in a glove](/img/tutorials/handouts-props-page.jpg)

You can name the page (*Dead End* calls it **Handout Props**, and
*Canticle* calls it **The Calcutta Gazetteer**). You can also give it an
intro and a picture at the top, and add a box of the newest handouts to
the site's front page. Say which you want:

> [!you]
>
> Call the props page "The Evidence Locker" and show the three newest
> handouts on the front page.

A handout can also hold others: a bookshelf, a strongbox, a dead man's
pockets. Its page lists what's inside as the players find it, and can
show the titles of what they haven't found yet.


## An older site's handouts

If your site had handouts before props existed, the apprentice can move
them into the vault as prop notes. It checks every live page first, and
puts the vault back as it was if a page would go missing, lose words or
links, or show something that should stay hidden. Ask:

> [!you]
>
> Move my site's old handouts into the vault.

## The settings behind it

Every setting for the props page, its values and its default:
[site settings in the plugin docs](https://github.com/AntTheLimey/gm-apprentice/blob/main/docs/site-settings.md#props).
A sample:

```yaml
player_site:
  props:
    title: The Evidence Locker
    intro: Everything the investigators have picked up so far.
  landing:
    latest_props: 3
```
