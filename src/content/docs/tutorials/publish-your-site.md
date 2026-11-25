---
title: Publish your site
description: Turn your vault into a campaign website for your players, on Cloudflare Pages or GitHub Pages, with your secrets left out.
checkedAgainst: "1.12.146"
---

<!-- video -->

You can turn your vault into a website that your players read between
sessions: recaps, character sheets, people, places, maps and a timeline,
all linked, with your secrets left out. Both hosts are free for a
campaign site. The steps use four terms:

- The **player site** is the campaign website. It is public: anyone with
  the address can read it.
- The **publish list** says which notes become pages. Any other note
  never reaches the site.
- **Hidden parts** are the sections, fields and marked blocks
  that players never see, even when the note itself is published.
- The **leak check** reads the finished site before every upload, and
  stops the upload if hidden text shows up on it.

## Before You Start

You need the following before the first publish:

- Node 22.21 or newer on your computer. If it is missing, your apprentice
  sends you to [nodejs.org](https://nodejs.org) for the LTS release.
- For Cloudflare Pages, a Cloudflare account and API token.
  [Set up Cloudflare](/tutorials/set-up-cloudflare/) walks through both.
- For GitHub Pages, a GitHub account. On the free plan, the site's
  repository must be public.

The site is public. Keep licensed rules text out of published notes:
your apprentice flags rules text copied word for word, so that you can
paraphrase it.

## Setting Up the Site

Your apprentice saves each answer as you give it, so you can stop part-way
and pick up later. To set up the site:

1.  Tell your apprentice `publish my campaign`.

    It checks that Node is installed first.

2.  Choose a host.

    Cloudflare Pages is the default, and the only host for the live
    features at the table. The site looks the same on either host. Your
    apprentice then checks the tools for that host, and gives you the fix
    for anything missing.

3.  Answer the questions about the site.

    Your apprentice asks for a title, a one-sentence tagline, the site's
    name, a folder for the site's files, a picture, a message for broken
    links and a theme. On GitHub, it also asks for your user name and a
    repository name. It suggests answers where it can, and you can skip
    the picture and theme.

    It also asks whether your vault has headings or fields of its own that
    are for your eyes only, and hides them.

4.  Look at the first build.

    Your apprentice builds the site on your computer, and tells you how to
    open it in your browser.

5.  Go through the publish list with your apprentice.

    It counts the notes it will publish and leave out, then asks about
    each note it cannot place.

6.  Let your apprentice put the site online.

    On GitHub, it asks before it creates the repository. The leak check
    runs before every upload. On success, the last line reads `live at`
    followed by the site's address.

In the example below, the GM publishes the
[Snowbound sample vault](https://github.com/AntTheLimey/gm-apprentice-snowbound/tree/sample-v2)
on GM-Apprentice 1.12.146, after the session in
[Wrap up a session](/tutorials/wrap-up-a-session/). The GM's lines were
typed for this page. The replies are the apprentice's own, trimmed
(`[...]`) but not reworded.

> [!you]
>
> Put this campaign online for my players.

The vault already held the title, tagline, theme and host, so only three
questions were left:

> [!apprentice]
>
> - **Tools:** Node is installed, and Cloudflare is logged in and ready to deploy.
> - **Already set:** the title "Snowbound", the tagline, the 404 message "This page has been lost to the snow.", the cold blue and amber colours with Literata and Source Sans 3 fonts, and Cloudflare Pages as the host. You won't need to answer any of those again.
>
> I need three answers before I build anything:
>
> 1. **Cloudflare project name.** This sets the web address. I suggest `snowbound`, which gives you `https://snowbound.pages.dev`.
>
> [...]

> [!you]
>
> Call the project tutorial-scratch-campaign, put the site folder at ../snowbound-site next to the vault, and use the Saint Aubren's Rest picture.

After a first build, the apprentice goes through the notes that are new
to the publish list, and asks about the one that could give something
away:

> [!apprentice]
>
> Eleven files are new since that list was made, so you need to decide on them before anything goes live.
>
> [...]
>
> 1. **Wat Marsh.** The text players would see only says his name is on Ilyra's list with a lamp beside it. However, his page records him as **dead**, and that status could show on the page. Do the players know he's dead? If not, I can publish the page with the status hidden, or keep the whole page off the site.

> [!you]
>
> Publish the five, keep those four off. They know Wat is dead, the lamp means that, so publish him. Use your Chapter 2 sentence. Rebuild, then run the leak check and show me what it finds, but don't upload yet.

> [!apprentice]
>
> The leak check found nothing. It read all 114 files in the rebuilt site and none of them shows anything the vault keeps from players. Nothing has been uploaded.

The run stopped there, so no site exists at that address. The real
Snowbound site is [snowbound-dnd.pages.dev](https://snowbound-dnd.pages.dev).

Share that address with your players. On Cloudflare it looks like
`https://<project-name>.pages.dev`. On GitHub it looks like
`https://<user-name>.github.io/<repository-name>/`. A first Cloudflare site
can take a few minutes before every page answers.

## Keeping Secrets Off the Site

Some things never reach the player site, on any page:

- prep: session plans, scenes, and notes about sessions not yet played
- sections headed `GM Notes`, `DM Notes` or `Player Notes`, and a few
  other GM headings
- fields such as `secrets`, `gm_notes` and `voice`
- text between `<!-- gm-only -->` and `<!-- /gm-only -->`
- text between `<!-- spoiler -->` and `<!-- /spoiler -->`, until a
  wrap-up releases it
- callouts, on a site set up with this version
- comments, and the plugin's own working folders

New notes from a wrap-up start as drafts, and publish with a Draft badge.
Ask your apprentice to hide drafts if you want them kept back.

A secret in a field, such as an NPC's real `occupation`, is not covered
by a `gm-only` block. Ask your apprentice to hide that field on that note.
The same goes for a relationship that gives a twist away. You can also
give your apprentice names and phrases that must never reach the site.

When the leak check finds something, the upload stops. The message's
first line ends `Nothing was uploaded.`, and a line for each finding
follows. Your apprentice shows each finding, with the
page, the note and the rule that hides the text. For each one, choose one
of these:

- Fix the note, then publish again.
- Accept it, because you meant players to see it.
- Report a bug, when the note hides the text correctly and the site
  shows it anyway. Your apprentice drafts the report and files it only
  on your yes.

The leak check finds text the vault marks as hidden. A secret written
into an ordinary section is not marked, so nothing can catch it.

## Updating After Each Session

To update the site, tell your apprentice `update my site`. It lists any
notes that are new or gone since the last publish, and puts them on the
publish list when you confirm. Then it builds and publishes again.

A played session publishes with its Wrap-Up after you review it. If
a played session cannot publish yet, your apprentice asks you once, with
the reason for each session.

## Troubleshooting

These are the problems a publish runs into most often.

### The Upload Stopped With Nothing Uploaded

The message names hidden text, a secret name or a never-show word on the
site. Go through the findings with your apprentice, as in
[Keeping Secrets Off the Site](#keeping-secrets-off-the-site).

### The Site Says It Is Still Propagating

The upload worked, and the host is still putting the new pages in place.
Wait a minute, then ask your apprentice to check the site again.

### Cloudflare Deployed a Preview

The message reads `deployed as a preview, not to the site's address`. In
the Cloudflare dashboard, open **Workers & Pages**, then the project's
**Settings**. Set the production branch to `main`, then publish again.

### GitHub Says Pages Is Not Available

The message reads `Pages is not available for private repositories`. On
the free plan, make the repository public in its settings, then publish
again.

## Next Steps

Your players can now read the campaign:

- [The GM site](/tutorials/gm-site/) builds a private copy with every
  secret showing, for your tablet.
- [Players at the table](/tutorials/players-at-the-table/) adds live hit
  points and sheet requests on Cloudflare.
- [Wrap up a session](/tutorials/wrap-up-a-session/) decides what the
  players learned, before the next update.
- [Change the look](/tutorials/change-the-look/) and
  [Add pictures](/tutorials/add-pictures/) dress the site.
