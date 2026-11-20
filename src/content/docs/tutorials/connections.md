---
title: Connections
description: Every page on the campaign site ends with who and what its subject is tied to, drawn as a tree, a web or cards. How it works for the players, and the vocabulary of ties underneath it for the GM.
checkedAgainst: "1.12.111"
---

Every note in your vault can say who and what it's tied to: who serves
whom, who is hunting whom, where someone lives, what they own. The
apprentice writes these ties as it files your notes, and the campaign
site draws them. Every page whose subject has ties ends with a
**Connections** section, so a player who reads about one NPC can see the
whole web around them.

## From a real campaign

These pictures are all the same page: Albin Herzfeld, the villain of
*Canticle of the End* (a Regency Call of Cthulhu campaign in the
[gallery](/gallery/)). We built the site from a copy of its vault three
times, once for each way of drawing Connections. Nothing else changed.

### Tree

The default. A branching list with the subject on the left, grouped by
kind of tie, that still reads well on a phone.

![Albin Herzfeld's Connections as a tree: tabs for People 18, Places 3, Organisations, Things, Events, Papers, Creatures and Mentions 37; his ties branch out by kind (Allied with, Conspires against, Employs, Enemy of, Financed by, Knows, Trusts, Sought by, Served by) to each person, marked warm, hostile or neutral, with how many sessions they share](/img/tutorials/connections-tree.jpg)

### Web

The subject in the middle and everyone tied to them around it, grouped by
kind of tie. Best on a wide screen.

![The same Connections as a web: Albin Herzfeld in a gold circle in the middle, his ties radiating out, the nine people who serve him fanned along one arc, hostile ties drawn as red dashed lines](/img/tutorials/connections-web.jpg)

### Cards

A card for each tie, with the other side's portrait, the GM's line about
the tie, and the sessions where both of them turned up.

![The same Connections as cards, the Served by group: nine cards in three columns, each with a portrait, a warm, hostile or neutral mark, one line about the tie and the sessions the two share](/img/tutorials/connections-cards.jpg)

## What the players see

- **Tabs by kind:** People, Places, Organisations, Things, Events,
  Papers, Creatures, with a count on each. The last tab, **Mentions**,
  lists pages that only mention the subject without a tie.
- **Both directions.** A tie is written once, on one note, and shows on
  both pages. Wilhelm Brenner's note says he *serves* Herzfeld, so
  Herzfeld's page lists Brenner under **Served by**.
- **Warm, hostile or neutral**, never your exact word for it. You might
  write that Brenner is *fearful* of Herzfeld; the players see a red
  hostile mark.
- **How long they've known each other:** the number of sessions where
  both turned up.
- **Events count.** The people in an event and the place it happened are
  tied to it, so a character's page lists what they lived through and
  where they've been.
- **Only what's published.** A tie to a page the players can't see yet
  doesn't show, and neither does a tie you've marked GM-only.

## Pick a style

Say which one you want and the apprentice changes the setting and
rebuilds the site:

> [!you]
>
> Show the Connections on my campaign site as a web.

The setting is `player_site.features.connections` in
`_meta/vault-config.yaml`: `tree` (the default), `web`, `cards`, or `off`
to leave the section out. It applies to the whole site.

## For the GM: what a tie holds

Underneath the drawing, each tie is a few lines at the top of a note.
This is Brenner's tie to Herzfeld, from the Canticle vault:

```yaml
relationships:
  - target: "[[Albin_Herzfeld]]"
    type: serves
    tone: fearful
    strength: 8
    bidirectional: false
    description: "Former cult member; broke with Herzfeld over moral horror"
```

- **`type`**: the kind of tie, from a fixed list of 78 in 17 groups:
  family, social, power, places, possessions, knowledge, conflict,
  membership, the supernatural, cause and witness, money, deeds,
  horror, romance, history, science fiction and superheroes. Using the same words across
  the whole campaign is what lets the site group the ties and the checks
  find gaps. A tie is stored in one direction only: `serves` on
  Brenner's note is all it takes for Herzfeld's page to say **Served
  by**. Some kinds go both ways by nature (`knows`, `enemy_of`,
  `allied_with`) and are stored once.
- **`tone`**: how one side feels about the other, one of 27 words:
  ten positive (warm, loyal, protective...), ten negative (hostile,
  fearful, resentful...) and seven neutral (cautious, formal,
  transactional...). The site shows only which of the three groups the
  word is in. The detail goes in the description.
- **`strength`**: how much the tie matters, from 1 (weak) to 10
  (defining).
- **`description`**: your one line about the tie. It's the line on the
  cards.
- **`gm_only: true`**: for a tie whose very existence is the secret.
  It's left off the players' site at both ends, and listed on the
  [GM site](/tutorials/gm-site/) under **Hidden from players**.

Notes the apprentice writes also list their ties in plain words under
**Related** (or under **Hidden Ties** in the GM Notes, for GM-only
ones), so you can read them without looking at the frontmatter. It keeps
the two in step.

You rarely write any of this by hand. Tell the apprentice what's true
("Brenner is terrified of Herzfeld since he walked out on the cult") and
it picks the type and the tone, writes the tie on the right note and
adds the line under Related. The full list of types lives in your vault, in
`_meta/relationship-types.md`.

## Keeping the web healthy

[Check your vault](/tutorials/check-your-vault/) looks after the ties
along with everything else: notes nothing links to, links that lead
nowhere, ties written the wrong way round or twice, and tone words that
aren't on the list. Things to ask:

- "Which NPCs have no relationships?"
- "Tidy the tones in my campaign."
- "Who is tied to Herzfeld, and how?"
