---
title: Add pictures
description: Use your own portraits, maps and handouts, or have the apprentice draw what's missing, and what that costs.
checkedAgainst: "1.12.98"
---

<!-- video -->

Portraits, places, maps, handouts and scene pictures make a campaign site.
There are two ways to get them into your vault: **bring your own**, or
**have the apprentice draw them**. Either way the picture is filed in the
vault's `_attachments/` folder and the note points at it, so it shows in
Obsidian and on the site.

## What it costs

Bringing your own costs nothing. For drawing, you choose what draws, and
the apprentice never picks for you:

| Choice | What draws | Money |
|---|---|---|
| Codex | An installed Codex, signed in with your ChatGPT plan | Nothing beyond the plan you already pay for |
| The agent's own tool | The agent's own image tool, when it has one (Codex running the skills, for example) | Nothing beyond the plan |
| A paid service | Google's Gemini (or another service) on **your own API key** | Paid per picture, inside spending limits you set in the vault |

Until you choose, it asks. With a paid service it counts what each
picture costs and stays inside the limits you set.

## From a real run

On GM-Apprentice 1.12.98, using the [Snowbound sample vault](https://github.com/AntTheLimey/gm-apprentice-snowbound/tree/sample-v2)
(tag `sample-v2`), which is set to draw with Codex. We typed the GM's side;
the replies are the agent's own, trimmed (`[...]`) but not reworded.

### Your own picture

> I've got a picture for Pip Callow at ../pip.png. Use it as his portrait.

> Pip Callow now has your picture as his portrait. I copied `../pip.png`
> into the vault as `_attachments/characters/pip-callow.png` and set
> `portrait:` in `Characters/NPCs/Pip Callow.md` to point at it, the same
> way the other characters' portraits are set up. The picture fits his
> description: a freckled teenage boy in a grey monk's habit.

It looks at the picture before filing it. Hand it a folder of pictures
and it matches each one to the right note.

### Drawing what's missing

> Thanks. Now fill in the missing pictures.

> There are 6 notes with no picture (player characters not included): [...]
>
> The vault is set to draw with Codex on your ChatGPT plan, so this costs
> no money. It should take about 6–10 minutes, roughly a minute or two per
> picture. I'll follow the campaign's Image Guidance note, keep each picture
> to what the players have seen or been told, and look at every one before
> filing it.
>
> Shall I go ahead?

> Just Brother Matthias for now, please.

Then it stopped, because Brother Matthias is a secret:

> I need a decision from you before I draw Brother Matthias. A normal
> head-and-shoulders portrait would be a mistake here.
>
> According to his note, there is no Brother Matthias: the abbot made him up
> to cover what Teodor carried down the stair. The players have only heard
> his name. The pictures go on the players' site, so if I give him a face,
> the site shows a man who never existed as if someone had seen him. [...]
>
> The only thing the players actually saw is his office: the shroud on its
> trestle in the chapel full of small lamps, with the brothers singing
> softly. I'd use that as his picture instead [...]

> Good catch. Yes, draw the shroud.

![A candlelit monastery chapel: an old abbot rests his hand on a white shroud on a trestle while monks sing; snowy peaks in the window](/img/tutorials/matthias-shroud.jpg)

> Brother Matthias now has the shroud picture, and I looked at it before
> filing it. [...] The shroud is a soft mound of linen with no head or feet
> showing, so the picture doesn't say whether anyone is inside. [...]
>
> - **Cost:** none. Codex drew it on your ChatGPT plan.

## Good to know

- **Pictures keep your secrets.** It draws only what the players have seen
  or been told, as above.
- **One look for the whole campaign.** An Image Guidance note in the vault
  sets the style, so every picture belongs to the same world.
- **Drawing without being asked.** Turn on automatic drawing and it adds
  pictures after a wrap-up (scenes for the session's big moments, placed in
  the recap) and after new notes are made. It tells you how many, what
  draws them and any cost, and "not now" puts the job off.
- **Scene pictures in recaps.** Ask for "a picture of the moment the dragon
  woke" and it goes under the right paragraph of the session's recap.

## The settings behind it

`vault.images.source` (what draws), `vault.images.auto` (drawing without
being asked) and the spending limits for a paid service. Every setting is in
[Drawing pictures](https://github.com/AntTheLimey/gm-apprentice/blob/main/docs/images.md)
and the "Drawing pictures" part of
[site settings](https://github.com/AntTheLimey/gm-apprentice/blob/main/docs/site-settings.md),
in the plugin docs.
