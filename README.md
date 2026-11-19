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

## Adding a blog post

1. Make a worktree for the post: `git worktree add .worktrees/post-<slug> -b post/<slug>`.
2. Write `src/content/docs/blog/<slug>.md` with `title`, `date`, `authors: ant` and an
   `excerpt`, plus a `cover` if it has one. Pictures go in `src/assets/blog/<slug>/`, each
   with alt text.
3. A post republished from LinkedIn also gets `linkedin: <url>`. That shows the
   "First published on LinkedIn" line, and `npm run check:posts` then holds the
   post to the text in `sources/linkedin/<slug>.txt` and the picture list in
   `sources/linkedin/<slug>.images.json`.
4. Run `scripts/preview.sh` and read the post on the preview link.
5. Open a PR. After it merges, deploy (below).

## Publishing

- **A branch preview:** `scripts/preview.sh` builds the branch and uploads it
  as a preview version of the Worker. It prints the preview address. Previews
  are marked `noindex`.
- **The live site:** after a merge to `main`, `npm run deploy` (it always builds
  first, so a preview build can never go live).
