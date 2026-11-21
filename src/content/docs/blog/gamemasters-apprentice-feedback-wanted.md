---
title: "A GameMasters Apprentice Claude Skill: Feedback Wanted"
description: "Why a GM who once ran D&D Beyond built GM-Apprentice, an open-source AI plugin for rules lookups, prep and campaign continuity, and asked for feedback."
date: 2026-04-15
authors: ant
linkedin: https://www.linkedin.com/pulse/gamemasters-apprentice-claude-skill-feedback-wanted-antony-pegg-qzyfc/
excerpt: "As most of you know, I'm a technical Product Person who runs a lot of tabletop RPGs."
cover:
  image: ../../../assets/blog/gamemasters-apprentice-feedback-wanted/cover.jpg
  alt: "A game master asleep over an open book while a small robot reads beside him, his dreams of soldiers, monsters and starships swirling overhead"
---
As most of you know, I'm a technical Product Person who runs a lot of tabletop RPGs. A few years back those two things overlapped when I was in charge of D&D Beyond, which was great for my career and less great for the hobby. Thankfully RPGs are back to being just a hobby for me, and I no longer have to pretend I think D&D is a good system.

Anyway ...

For about a year I've been using Claude as a GM apprentice, handling the unglamorous stuff that eats a GM's prep time: rules lookups mid-combat, campaign vault organisation between sessions, continuity audits after the table disperses, etc.

The workflow got organised enough that I packaged it into an open-source plugin and shipped it.

Repo: [https://github.com/AntTheLimey/gm-apprentice](https://github.com/AntTheLimey/gm-apprentice)

It's called gm-apprentice, and it's four composable skills that cover Call of Cthulhu 7e, GURPS 4e, Blades in the Dark, and D&D 5e (2024 revision). It works best paired with an Obsidian vault but runs fine on plain filesystem folders if you don't use Obsidian.

## What a "skill" actually is

Quick demystifier: a "skill" isn't really software. It's just markdown documents. Structured prompts that tell Claude how to think about a specific job, what files to read, what questions to ask, and what output to produce. The engineering is in the design, not the code, which makes it very much a PM kind of thing to build.

## The four skills

**ttrpg-expert** handles rules lookups, NPC and location generation, session prep, encounter design, and scenario writing. Rules coverage is deep for the four systems above, but the skill runs for any system because it also carries popular game-running techniques that transcend any particular ruleset: clock structures, scene framing, improvisation scaffolds, and the like. Example: my GURPS fighter did an All-Out Attack (Double) last turn and wants to Rapid Strike this turn, and I genuinely don't remember whether that interaction is legal. I ask, and get a straight answer with Basic Set p. 365 and Martial Arts p. 99 called out, without the lecture I'd get wading through a rulebook mid-combat. If you're running a Cthulhu campaign, it will even validate against the 3-clue rule for you

**campaign-organizer** turns loose notes into a structured, interlinked vault with YAML frontmatter, wiki-links, and a navigable graph, and it ships with entity templates for NPCs, locations, clues, items, artifacts and uhhh ... other templates too. It also builds and maintains a timeline of events and a current PC roster that updates as the campaign moves forward. Example: feed it a chapter outline and you get back linked NPC, location, and scene files ready to open in Obsidian, with relationships already wired up between them.

**campaign-qa** runs canon audits, timeline checks, name-similarity detection, clue redundancy against the Three Clue Rule, and graph health. Example: my Canticle vault had sixteen duplicate entity files after a year of ad-hoc notes, the same NPCs drifting under slightly different names with stat blocks and dialogue scattered across multiple files. I asked for a dedup pass and got back one canonical entity file per NPC, with typed-relationship frontmatter at the top, wiki-links woven through the body, and the old indices archived with SUPERSEDED metadata. That was a weekend of copy-paste I didn't have to do.

**session-lifecycle** is the between-sessions workhorse: scrawled play notes become recaps, planned-versus-actual reconciles, entity files update based on what actually happened, and the next session takes shape. My actual workflow: I start with my session-prep notes, use GMAssistant to transcribe the session and export to markdown, then drop that into Claude Desktop and let session-lifecycle update the whole vault. New NPCs get created, existing ones get updated with new details and relationships, the timeline gets new entries, and I get a draft plan for next session.

## Inside the skills

Under the hood, each skill routes into a set of specialised modules. The most load-bearing of these is the Continuity Engine, a plot-hole detection and canon-grounding layer that runs across eleven error categories: timeline contradictions, knowledge violations (an NPC reacting to a secret they shouldn't know), orphaned threads, dead-end clues, player agency violations, canon fabrication, and more. Every proposed detail the skill generates has to trace back to established source material or get flagged as unsourced for GM confirmation. This is the anti-hallucination layer, and it's the piece that moved the whole thing from "useful but risky" to "I trust it with my campaign canon."

The Session Planner module carries a Five-Stage Arc Model (Establishment, Testing, Crisis, Transformation, New Equilibrium) that tracks where every PC sits in their personal storyline, alongside a spotlight-time floor of 15% that flags when any PC has been under-served for too long. World Evolution is a post-session procedure that advances faction plans and consequences whether the PCs act or not, because the world doesn't wait for them. NPC generation splits between a 3-Line NPC for improvised table-side characters (appearance, portrayal, hook) and an AIMS profile (Agenda, Instinct, Motivation, Skills) for recurring antagonists and quest-givers. None of these are novel GM concepts. They're well-documented techniques from the TTRPG community that I've distilled into something Claude can actually execute at the table.

## Who this is for

Most of my network is some mix of developers, product people, and TTRPG players, and this project sits squarely in the middle of all three.

**For the devs,** maybe the repo is worth a browse as a case study in what Claude plugins can do when you stop trying to build a chatbot and start building a specialist colleague: skills composition, MCP integration for Obsidian, and the structure of a plugin that handles four related-but-distinct workflows. It runs in Claude Code, Claude Desktop, or anywhere else that supports skills. Any feedback on how to improve the skills is very welcome.

**For the GMs especially,** I'd love any feedback on whether this is actually useful to you. It's been built purely around my own style and what I needed at my table, so I genuinely don't know how well it generalises beyond me. It won't replace your prep, but it should replace the bits of your prep that feel like admin.

**For the PMs,** this is something close to the new "hello world." If you can write a PRD, you can write a skill, and the barrier to building useful AI tooling is a lot lower than most of us realise. Worth an afternoon of tinkering even if you don't run games.

## Asks

It's free, it's open source, and I built it because I wanted it and figured others might too. If you try it and it helps, a star on the repo means a lot. If something breaks or a skill gives you weird output, please open an issue on GitHub with the transcript and I'll dig in. If your table plays a system I don't yet support, tell me, and I'll add it to my ever-growing to-do list.

Feedback welcome in whichever hat you're wearing.

Repo: [https://github.com/AntTheLimey/gm-apprentice](https://github.com/AntTheLimey/gm-apprentice)

Cheers,

Ant
