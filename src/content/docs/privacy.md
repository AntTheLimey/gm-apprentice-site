---
title: Privacy
description: What this website records about visitors, and which outside services the GM-Apprentice plugin contacts, when, and what it sends them.
---

GM-Apprentice is two things: this website, and a plugin that runs on your
own computer inside your AI agent. Neither one sells anything, shows ads or
builds a profile of you. This page says exactly what each one records or
sends, and where.

If anything here is unclear or looks wrong, write to
**support@gmapprentice.com**.

## This website

The site counts visits so I can see which pages help people. It uses
[PostHog](https://posthog.com/privacy) in its cookieless mode:

- **No cookies,** so there is no consent banner to click.
- **What a visit records:** the page, the page you came from, your browser,
  screen size and time zone, your country, which links and buttons you click,
  how fast the page loaded, and any errors on the page.
- **Your IP address** passes through to PostHog so it can count unique
  visitors with a code that changes every day. PostHog doesn't keep the
  address. Your country comes from Cloudflare, which hosts the site, as a
  two-letter code.
- **No session recordings,** and nothing ties a visit to your name or email.
- **Your browser keeps one thing:** your light or dark choice for the site.

Cloudflare serves the pages and keeps its own logs, under
[Cloudflare's privacy policy](https://www.cloudflare.com/privacypolicy/).

## The GM-Apprentice plugin

The plugin collects nothing and sends nothing to me. Your notes stay on your
computer. It reaches outside services only when you use a feature that needs
them, and then only the service that feature names.

### Your AI agent

You run GM-Apprentice inside an agent such as Claude, Codex or Cursor. Your
agent reads the notes you work on together and sends them to its AI
provider, under that provider's own policy, for example
[Anthropic's](https://www.anthropic.com/legal/privacy) or
[OpenAI's](https://openai.com/policies/privacy-policy/). That is the agent's
doing, not the plugin's. Check your provider's settings for how long it
keeps conversations.

### Outside services, and when the plugin contacts them

| Service | When | What it sends |
|---|---|---|
| [GitHub](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement) | Checking whether a known problem is fixed, or when a release came out | The issue or release number it asks about |
| GitHub | Fetching the site-building tool for an install that doesn't include it, or an older release that updating a very old vault needs | A download request |
| GitHub | Filing a problem report, only after you say yes to the draft | The report, under your own GitHub account |
| GitHub Pages | Publishing your campaign site there, when you choose that host | Your player site, to your own repository |
| [Cloudflare](https://www.cloudflare.com/privacypolicy/) | Publishing your campaign site there, when you choose that host | Your player site, to your own account |
| Cloudflare | Players asking for sheet changes or asking questions at the table, if you switch that on | Their requests, stored in your own Cloudflare account |
| [Google Fonts](https://policies.google.com/privacy) | Building a site that uses a named font | A download of that font, once |
| [Google Gemini](https://ai.google.dev/gemini-api/terms) | Drawing a picture, if you set it up with your own key | The picture's description, and any pictures it works from, such as a portrait to keep a likeness |
| [OpenAI](https://openai.com/policies/privacy-policy/), through Codex | Drawing a picture, if you use Codex for pictures | The picture's description, and any pictures it works from |
| [D&D Beyond](https://company.wizards.com/en/legal/wizards-coasts-privacy-policy) | Updating a character note linked to a public D&D Beyond character | The character's number |
| [mobRPG](https://www.mobrpg.com/privacy) | Only if you install the separate mobRPG tool and sync with your account | Descriptions from your notes, to and from your own mobRPG account |
| [skills.sh](https://vercel.com/legal/privacy-policy) | Installing or updating with `npx skills` | An anonymous install count |

### Your players

Your campaign site belongs to you, on your own host, so its visitors are
yours to look after. The site has no analytics and no cookies. Its fonts
come from the site itself, so players' browsers don't contact Google. It
remembers a few things in each reader's own browser, such as light or dark
mode and a player's open change request.

Change requests and questions that players send are stored in your own
Cloudflare account, and expire there on their own.

## Questions

Write to **support@gmapprentice.com**. The [Support](/support/) page lists
the other ways to reach me.

_Last updated 24 November 2026._
