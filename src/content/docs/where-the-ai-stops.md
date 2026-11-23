---
title: Where the AI stops
description: GM-Apprentice is an AI tool, built to assist a GM and not to write the story. What you do, what works without any AI, and what the AI adds on top.
---

Yes, GM-Apprentice is an AI tool, and I'm glad of the help. I made it to
**assist** with the bookkeeping that piles up around a campaign, so I could
spend more of my time on the game. It can do the same for you. The story is
still yours and your players' to make.

Underneath the AI is a folder of notes and a program that turns them into
a website. You can make, run and publish all of that by hand and never
start an agent. The AI sits on top, and you decide how much of it you want.

## What you do

You invent the world, or pick the one you're running. You decide what's
true in it, play everyone the party meets, make the rulings, and work out
with your players what happens next. Your players own their characters.
All of that stays yours whether you use the AI or not.

## What works without AI

The core is ordinary files and ordinary programs. There's no AI inside it,
and it runs the same whether you type the commands or the apprentice does.

- **Your campaign folder.** One command makes it, with a template for each
  kind of note: characters, places, factions, items, clues, sessions, and a
  character sheet for your system. The notes are plain Markdown. Write them
  in anything. [Obsidian](https://obsidian.md) is a good home for them, and
  you don't need it.
- **The checks.** Programs find broken links, notes nothing links to,
  missing fields and names too alike to tell apart at the table. Others
  check the numbers on D&D and GURPS sheets, or bring a D&D character up to
  date from [D&D Beyond](/works-with/#dd-beyond).
- **Search.** Look through your own notes, or look up a rule in the open
  rules that come with it.
- **Your players' website.** [The site](/tutorials/publish-your-site/) is
  built straight from your notes: the story so far, people, places,
  [connections](/tutorials/connections/), [handouts](/tutorials/handouts/)
  and character sheets, in [the look you choose](/tutorials/change-the-look/).
  It goes online free, on Cloudflare or GitHub.
- **Your secrets.** You mark what's for the GM and the build leaves it out.
  The upload command reads the finished site for hidden text first, and
  stops if it finds any. A [GM copy](/tutorials/gm-site/) with
  everything showing stays at home.
- **Live sheets.** On a Cloudflare site, players mark their own hit points
  [on their phones during play](/tutorials/players-at-the-table/#live-sheets).
- **Your own pictures.** Put them in the folder and they go on the site.

By hand means downloading GM-Apprentice from GitHub, then a terminal, a
settings file, Python and Node. The
[vault commands](https://github.com/AntTheLimey/gm-apprentice/blob/main/skills/shared/gma/llms.md),
the [site builder](https://github.com/AntTheLimey/gm-apprentice/blob/main/tools/publish/README.md)
and the [settings](https://github.com/AntTheLimey/gm-apprentice/blob/main/docs/site-settings.md)
are written up there. If you'd sooner click than type,
[GM-Scriptorium](/works-with/#gm-scriptorium), a separate program by
another GM, builds a site from the same folder with no agent either.

## What the AI adds

It's an apprentice for the bookkeeping. It runs the same folder, checks
and website for you when you ask in plain words, and it can read your notes
and write in them, which programs can't do. Take one row, or all of them.

| | By hand | Ask the apprentice |
|---|---|---|
| **Notes** | Fill in the templates and type the links. | It files your rough notes, links them and keeps both ends in step. |
| **Checking** | Run the checks and read the list. | It reads for meaning too: contradictions, a dead NPC who turns up again, a clue with no backup. You decide on each one. |
| **Website** | Edit the settings, build, upload. | "Publish it" or "give the sheets the parchment look", and it does the rest. |
| **Prep** | Reread your notes. | It lays out what happened, what got skipped and who's due a moment, with scenes to choose from. |
| **At the table** | Search. | It finds the name, the rule or what that NPC said last time. It invents a shopkeeper if you want one. |
| **Wrap-up** | Write the recap and update each note. | It drafts the recap from your notes of what happened, and updates what the session touched. |
| **Player requests** | Read them out at the table. | It makes the simple sheet changes and holds the rest for you. |
| **Pictures** | Bring your own. | It draws what you ask for. Drawing without being asked is off until you switch it on. |
| **New ideas** | Yours. | It asks questions and offers options, when you want someone to bounce them off. New material is a draft until you accept it. |

## What it doesn't do

- **It doesn't run your game.** It isn't an AI game master, and it doesn't
  talk to your players for you, unless you switch on the request box and
  let it answer them there.
- **It doesn't own your notes.** Stop using it tomorrow and you still have a
  folder of Markdown, and a site you can still build.
- **It doesn't replace your books.** It carries open rules and short notes.
  For anything else, [you bring the books you own](/tutorials/your-own-books/).
- **It isn't for making things to sell.** Several publishers and stores don't
  take AI-made work. It's meant for your own table.

## Fair questions

- **Are the pictures on this site AI-drawn?** The painted ones are. The
  screenshots are real pages.
- **Are the stories on your campaign sites AI-written?** The table made
  them. The apprentice drafts the write-up from what happened, and the GM
  decides what stays.
- **Did AI build this?** Much of it, yes. I direct it, and I test it on
  my own games. The blog tells that story, mistakes included:
  [start here](/blog/stop-asking-the-model-to-be-the-machine/).
- **Where do my notes go?** They stay in your folder. The parts an agent
  reads go to whoever runs that agent, under your plan with them. A model on
  your own computer keeps them there. With no agent, nothing leaves your
  computer until you publish.
- **Can it be wrong?** Yes. It can invent a detail or misread a rule. Check
  what matters, and keep the final say.
