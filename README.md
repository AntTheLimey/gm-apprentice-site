# GM-Apprentice site

The website for [GM-Apprentice](https://github.com/AntTheLimey/gm-apprentice),
a free, open-source set of skills for tabletop Game Masters: what it does,
how to start, and the blog.

Built with [Astro Starlight](https://starlight.astro.build/) and the
[starlight-blog](https://github.com/HiDeoo/starlight-blog) plugin, served as
static files by a Cloudflare Worker.

## Run it locally

Needs Node 22.23.4 or later.

```sh
npm ci
npm run dev      # local server with live reload
npm run build    # static site in dist/
npm test         # script tests
```

## Checks

- `npm test` runs the tests for the scripts in `scripts/`.
- `npm run check:posts` checks every republished post word for word, date and
  pictures against the original it came from.
- `scripts/check-host.sh` fails if the site's own address is hard-coded
  anywhere. The address comes from `SITE_URL`.
- The build fails on any broken internal link in a Starlight page, and
  `npm run check:links` checks every internal link and picture in the built
  site, front page included.
- `npm run check:seo` fails if a page in the built site has no title or
  description, shares either with another page, has a description outside 50-160
  characters, or lacks a canonical link, exactly one share picture or valid
  structured data. Give every new page a `description`.

## Adding a blog post

1. Make a worktree for the post: `git worktree add .worktrees/post-<slug> -b post/<slug>`.
2. Write `src/content/docs/blog/<slug>.md` with `title`, `description`, `date`, `authors: ant` and an
   `excerpt`, plus a `cover` if it has one. Pictures go in `src/assets/blog/<slug>/`, each
   with alt text.
3. A post republished from LinkedIn also gets `linkedin: <url>`. That shows the
   "First published on LinkedIn" line, and `npm run check:posts` then holds the
   post to the text in `sources/linkedin/<slug>.txt` and the picture list in
   `sources/linkedin/<slug>.images.json`.
4. Run `scripts/preview.sh` and read the post on the preview link.
5. Open a PR. After it merges, deploy (below).

## Adding a tutorial page

1. Make a worktree: `git worktree add .worktrees/tutorial-<slug> -b tutorial/<slug>`.
   Name the page after the job, not the skill (`prep-a-session`, not `session-prep`).
2. Run the example for real on the
   [Snowbound sample vault](https://github.com/AntTheLimey/gm-apprentice-snowbound)
   at its sample tag, with a pinned plugin release, and keep the run's transcript.
   Quotes on the page come from that transcript, trimmed with `[...]` but never
   reworded.
3. Write `src/content/docs/tutorials/<slug>.md` with `title`, `description` and
   `checkedAgainst: "<plugin version>"` (the release the example ran on;
   `npm run check:drift` warns when it falls a minor release behind), then a
   `<!-- video -->` line under the front matter, where a video goes later. Mark each
   quote as in "Conversations in tutorials" below. Pictures go in
   `public/img/tutorials/`, each with alt text.
4. Add the page to the Tutorials sidebar in `astro.config.mjs` and to
   `src/content/docs/tutorials/index.md`, both in campaign order (Organize, Prep,
   Run, Publish), and, if it's a new feature, a line on `src/content/docs/features.md`.
5. Run the checks, then `scripts/preview.sh`, and read the page on the preview link.
6. Open a PR. After it merges, deploy (below).

## Conversations in tutorials

Tutorial and start-here pages quote real runs. Mark each quote with what it is,
on its own line, then a blank quote line:

```md
> [!you]
>
> Put this campaign online for my players.
```

`[!you]` is what the GM typed, `[!apprentice]` is the reply, and `[!vault]` is an
excerpt of a file the apprentice wrote. The build gives each its own look and label
(`src/plugins/rehype-exchanges.mjs`, styles in `src/styles/theme.css`); an unknown
marker fails the build.

## Publishing

- **A branch preview:** `scripts/preview.sh` builds the branch and uploads it
  as a preview version of the Worker. It prints the preview address. Previews
  are marked `noindex`.
- **The live site:** after a merge to `main`, `npm run deploy` (it always builds
  first, so a preview build can never go live).
