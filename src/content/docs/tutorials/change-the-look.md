---
title: Change the look
description: Ready-made looks, your own colours and lettering, character sheet skins and portrait frames, and your own stylesheet.
checkedAgainst: "1.12.98"
---

<!-- video -->

Your campaign site's look is a handful of settings in one file in your
vault, `_meta/vault-config.yaml`. You rarely need to open it: say what you
want in your own words and the apprentice changes the setting and rebuilds
the site.

## From a real run

On GM-Apprentice 1.12.98, using the [Snowbound sample vault](https://github.com/AntTheLimey/gm-apprentice-snowbound/tree/sample-v2)
(tag `sample-v2`) after [publishing it](/tutorials/publish-your-site/).
We typed the GM's side; the replies are the agent's own, trimmed (`[...]`)
but not reworded.

Before: the sample's own colours and lettering, chosen when its site was
first set up.

![Snowbound's home page in its own slate and amber colours, the party's portraits in cards](/img/tutorials/look-before.jpg)

> Give the campaign site the fantasy look, then rebuild it so I can see it.

> The Snowbound site now uses the fantasy look and has been rebuilt on your
> machine. [...]
>
> - I set the site's genre to **fantasy**.
> - I removed your own colour scheme (slate blue, amber and pale grey) and
>   your heading and body fonts (Literata, Source Sans 3). Any colour or font
>   you set yourself replaces the fantasy one, so the new look wouldn't have
>   shown while they were there. [...]

![The same home page in the fantasy look: navy, gold and parchment, with the monastery picture](/img/tutorials/look-fantasy.jpg)

Then the character sheets:

> Nice. Now give the character sheets the parchment look with a gilt frame
> round the portraits, and rebuild.

> The character sheets now use the parchment look with a gilt frame round
> the portraits, and the site has been rebuilt. [...]
>
> - **One character only:** If you ever want one PC to look different, that
>   can be set in their own note.

![Brannoc Hale's character sheet on parchment, his portrait in an ornate frame, hit points, AC and abilities below](/img/tutorials/look-parchment.jpg)

## What you can change

**A ready-made look.** Five genres, each with its colours, lettering, a
light and dark pair, and its own names for the lists of places, factions
and creatures: `fantasy`, `horror`, `noir`, `military` and `scifi`. The
[theme showcase](https://antthelimey.github.io/gm-apprentice/) has one
campaign in all five.

**Your own colours.** Main colour, accent, background and text. Set all
four together. The trade: your own colours replace the genre's, and the
light/dark button goes, because only the ready-made looks come in pairs.
Ask for "my own colours: deep red accent, cream background..." and the
apprentice fills in all four.

**Lettering.** A heading face, a body face and one for labels. By
default the site downloads the typefaces once and serves them itself, so
your players' browsers never contact Google. You can also use your own
font files.

**Character sheets.** Five skins (`plain`, `parchment`, `case-file`,
`console`, `ledger`) and nine portrait frames (`none`, `ring`, `laurel`,
`thorns`, `gilt`, `steel`, `corners`, `hex`, `cracked`). One character
can have their own, set in their note.

**Pictures and words.** A large picture at the top of the home page, a
banner on every page, a one-line tagline, light or dark to start, your
own headings for the lists of places, factions and items, and the
message players see if they follow a link to a GM-only page.

**Your own stylesheet.** For the deep end: list `.css` files in the
settings and they load after the site's own. The site's
[class names](https://github.com/AntTheLimey/gm-apprentice/blob/main/docs/theme-hooks.md)
and [colour and size tokens](https://github.com/AntTheLimey/gm-apprentice/blob/main/docs/theme-tokens.md)
are documented and stay put between releases.

## The settings behind it

Every setting, its values and its default:
[site settings in the plugin docs](https://github.com/AntTheLimey/gm-apprentice/blob/main/docs/site-settings.md).
A sample:

```yaml
player_site:
  theme:
    genre: fantasy
    tagline: A D&D escort job up a mountain pass, to a monastery that is very glad to see you.
  sheets:
    skin: parchment
    frame: gilt
```
