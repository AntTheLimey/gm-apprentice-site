---
title: Get set up
description: Pick an AI agent, install Python, and install GM-Apprentice in Cowork, Claude Code or Codex.
checkedAgainst: "1.12.98"
---

GM-Apprentice is a set of skills: instructions and small scripts that an AI
agent follows when you ask it for help with your game. The skills are free
and open source. The agent that runs them is not: you need a paid plan with
one of the companies below. This page gets you from nothing to an installed
plugin. If you already have it installed, skip to
[Start a new game](/start/new-game/) or [Start from your notes](/start/from-notes/).

## Pick an agent

| If you... | Use | You need |
|---|---|---|
| want the least typing in a terminal | **Cowork**, in the Claude desktop app (Mac or Windows) | A paid Claude plan that includes Cowork ([Claude pricing](https://claude.com/pricing)) |
| are at home at a command prompt | **Claude Code**, Anthropic's agent for the terminal | A paid Claude plan, Pro or above ([Claude pricing](https://claude.com/pricing)) |
| already pay for ChatGPT | **Codex**, OpenAI's agent for the terminal | A ChatGPT plan that includes Codex, Plus or above ([ChatGPT pricing](https://chatgpt.com/pricing)) |

All three run the same skills on the same campaign folder, so you can
switch later without losing anything. Your campaign lives in ordinary
Markdown files on your own computer, which [Obsidian](https://obsidian.md)
(free) shows as a linked wiki. Obsidian is optional but recommended.

## Install Python

The skills' scripts need **Python 3.10 or newer**.

- **Mac:** open Terminal and type `python3 --version`. If it says 3.10 or
  higher, you're done. If not, install the latest from
  [python.org](https://www.python.org/downloads/), or with Homebrew:
  `brew install python`.
- **Windows:** install the latest from
  [python.org](https://www.python.org/downloads/). On the installer's first
  screen, tick **Add python.exe to PATH**. Then in a new terminal,
  `python --version` should print 3.10 or higher.

Cowork, Claude Code and Codex need nothing else. The "any other agent"
route below installs with `npx`, which comes with
[Node](https://nodejs.org) (22.21 or newer). Node is also what builds a
campaign website, if you want one later
([publishing in the plugin docs](https://github.com/AntTheLimey/gm-apprentice/blob/main/docs/publish-tool.md)).

## Install the plugin

### Cowork (Claude desktop app)

1. Open the Claude desktop app and switch to the **Cowork** tab.
2. Click **Customize**.
3. Under **Personal plugins**, click **+** (Add plugin).
4. Choose **Create plugin**, then **Add marketplace**.
5. Enter `https://github.com/AntTheLimey/gm-apprentice`.
6. Once it has synced, click **Install** on the gm-apprentice plugin.

### Claude Code

Start Claude Code in a terminal (`claude`), then type these three lines at
its prompt, one at a time:

```text
/plugin marketplace add AntTheLimey/gm-apprentice
/plugin install gm-apprentice
/reload-plugins
```

Using Claude Code inside VS Code, Cursor or a JetBrains IDE? The
[README](https://github.com/AntTheLimey/gm-apprentice#vs-code--cursor) has
the steps for each.

### Codex

In a terminal:

```sh
codex plugin marketplace add AntTheLimey/gm-apprentice
codex plugin add gm-apprentice@gm-apprentice
```

To update later: `codex plugin marketplace upgrade gm-apprentice`, then the
`codex plugin add` line again.

### Any other agent

Cursor's own agent, Gemini CLI, OpenCode and others install the skills with
one line:

```sh
npx skills add AntTheLimey/gm-apprentice --all -g
```

Keep the `--all`: it brings the shared scripts the other skills use. These
agents haven't all been tested; the
[README](https://github.com/AntTheLimey/gm-apprentice#other-agents-npx-skills)
says which have.

## Check it worked

Make an empty folder for your campaign, open your agent in it, and ask:

> What GM-Apprentice skills do you have?

It should list the Midwife, session prep, wrap-up and the rest. You don't
need to remember their names: from here on you just say what you want, and
the agent picks the skill.

## Now pick a path

- **[Start a new game](/start/new-game/)** if all you have is an idea, or
  not even that.
- **[Start from your notes](/start/from-notes/)** if you have a campaign
  already, in notebooks, documents or scattered files.
