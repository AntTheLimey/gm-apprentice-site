---
title: Get set up
description: Paste one line into your coding agent and it installs GM-Apprentice for you; or pick an agent, install Python and install it by hand.
checkedAgainst: "1.12.105"
---

GM-Apprentice is a set of skills: instructions and small scripts that an AI
agent follows when you ask it for help with your game. The skills are free
and open source. The agent that runs them is not: you need a paid plan with
one of the companies below. This page gets you from nothing to an installed
plugin. If you already have it installed, skip to
[Start a new game](/start/new-game/) or [Start from your notes](/start/from-notes/).

## Install in one line

Have **Claude Code, Codex, Cursor or another coding agent** already? Open
it in any folder and paste this line:

```text wrap
Fetch https://raw.githubusercontent.com/AntTheLimey/gm-apprentice/main/INSTALL.md with curl and follow it.
```

The agent:

1. checks Python, and Node if you want a campaign website,
2. installs GM-Apprentice the way your agent takes plugins or skills,
3. runs a health check,
4. tells you what to say next.

The steps it follows are in
[INSTALL.md](https://github.com/AntTheLimey/gm-apprentice/blob/main/INSTALL.md):
read them first if you like to know what will run. Keep the words "with
curl": some agents' own page readers summarise a page, and a summary can
garble the commands.

Here is the end of a real run in Claude Code, on a Mac that had an older
version installed:

> [!apprentice]
>
> gm-apprentice is installed and the health check passed with no problems.
>
> **Health check results:**
>
> ```
> ok  Python 3.14.4
> ok  gm-apprentice 1.12.105, the Claude Code plugin
> ok  Node 25.5.0
> ok  the publish tool 1.70.42
> Ready.
> ```
>
> [...]
>
> **Next steps:**
>
> 1. Start a new Claude Code session, or type `/reload-plugins` in this
>    one, so the new version loads.
> 2. Then say: **"help me start a new campaign"**.

If the check prints a line marked `fail`, the agent tells you what it
says and stops; fix that and paste the line again.

Then skip to [Now pick a path](#now-pick-a-path). New to all this, or using
Cowork? Read on.

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

The skills' scripts need **Python 3.10 or newer**. If you let your agent
do the install (above), it checks this first and tells you if it's
missing or too old.

- **Mac:** the `python3` a Mac comes with is 3.9, which is too old.
  Install the latest from [python.org](https://www.python.org/downloads/),
  or with Homebrew: `brew install python`. Then, in a new Terminal
  window, `python3 --version` should print 3.10 or higher.
- **Windows:** install the latest Python from the **Microsoft Store**.
  Its `python3` is the one the skills call; the python.org installer
  gives you only `python` and `py`.
- **Linux:** from your package manager or
  [python.org](https://www.python.org/downloads/).

You'll also want [Node](https://nodejs.org) (22.21 or newer) if you plan a
campaign website, or if your agent installs with `npx` (the "any other
agent" route). Cowork, Claude Code and Codex need nothing else.

## Install the plugin

If you have a coding agent now, the [one line](#install-in-one-line) above
does it all. Otherwise:

### Cowork (Claude desktop app)

Cowork installs plugins from its own screens:

1. Open the Claude desktop app and switch to the **Cowork** tab.
2. Click **Customize**.
3. Under **Personal plugins**, click **+** (Add plugin).
4. Choose **Create plugin**, then **Add marketplace**.
5. Enter `https://github.com/AntTheLimey/gm-apprentice`.
6. Once it has synced, click **Install** on the gm-apprentice plugin.

### By hand

**Claude Code.** Start Claude Code in a terminal (`claude`), then type
these three lines at its prompt, one at a time:

```text
/plugin marketplace add AntTheLimey/gm-apprentice
/plugin install gm-apprentice
/reload-plugins
```

Using Claude Code inside VS Code, Cursor or a JetBrains IDE? The
[README](https://github.com/AntTheLimey/gm-apprentice#vs-code--cursor) has
the steps for each.

**Codex.** In a terminal:

```sh
codex plugin marketplace add AntTheLimey/gm-apprentice
codex plugin add gm-apprentice@gm-apprentice
```

**Any other agent.** Cursor's own agent, Gemini CLI, OpenCode and others
install the skills with one line:

```sh
npx skills add AntTheLimey/gm-apprentice --all -g
```

Keep the `--all`: it brings the shared scripts the other skills use. These
agents haven't all been tested; the
[README](https://github.com/AntTheLimey/gm-apprentice#other-agents-npx-skills)
says which have.

### Updating

New releases come often. To move to the latest, in a terminal:

- **Claude Code:** `claude plugin marketplace update gm-apprentice`, then
  `claude plugin update gm-apprentice@gm-apprentice`, then start a new
  session.
- **Codex:** `codex plugin marketplace upgrade gm-apprentice`, then the
  `codex plugin add` line above again.
- **Any other agent:** `npx skills update -g`.

Your campaign folders need no separate step: when newer skills open an
older vault, they ask to update it, and do it for you.

## Check it worked

If your agent did the install, it ran the health check for you: "Ready."
means you're set. After an install by hand, make an empty folder for your
campaign, open your agent in it, and ask:

> [!you]
>
> What GM-Apprentice skills do you have?

It should list the Midwife, session prep, wrap-up and the rest. You don't
need to remember their names: from here on you just say what you want, and
the agent picks the skill.

## Now pick a path

- **[Start a new game](/start/new-game/)** if all you have is an idea, or
  not even that.
- **[Start from your notes](/start/from-notes/)** if you have a campaign
  already, in notebooks, documents or scattered files.
