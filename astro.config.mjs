// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightBlog from 'starlight-blog';
import starlightLinksValidator from 'starlight-links-validator';
import { unified } from '@astrojs/markdown-remark';

// The public address comes from SITE_URL so a custom domain is a one-value change.
const site = process.env.SITE_URL ?? 'https://gmapprentice.com';
// Branch previews (scripts/preview.sh) set PREVIEW=1 and stay out of search engines.
const preview = process.env.PREVIEW === '1';

export default defineConfig({
  site,
  // Republished posts keep the author's own characters: no automatic curly quotes,
  // dashes or ellipses.
  markdown: { processor: unified({ smartypants: false }) },
  integrations: [
    starlight({
      title: 'GM-Apprentice',
      customCss: ['./src/styles/theme.css'],
      // Wraps starlight-blog's own override (see the component).
      components: { MarkdownContent: './src/components/overrides/MarkdownContent.astro' },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/AntTheLimey/gm-apprentice' },
      ],
      sidebar: [
        {
          label: 'Start here',
          items: [
            { label: 'Get set up', link: '/start/setup/' },
            { label: 'Start a new game', link: '/start/new-game/' },
            { label: 'Start from your notes', link: '/start/from-notes/' },
          ],
        },
        {
          label: 'Tutorials',
          items: [
            { label: 'Grow a campaign from an idea', link: '/tutorials/grow-a-campaign/' },
            { label: 'Bring in an existing campaign', link: '/tutorials/bring-in-a-campaign/' },
            { label: 'House rules', link: '/tutorials/house-rules/' },
            { label: 'Publish your site', link: '/tutorials/publish-your-site/' },
            { label: 'Change the look', link: '/tutorials/change-the-look/' },
            { label: 'Add pictures', link: '/tutorials/add-pictures/' },
            { label: 'Character sheets', link: '/tutorials/character-sheets/' },
            { label: 'Players at the table', link: '/tutorials/players-at-the-table/' },
            { label: 'The GM site', link: '/tutorials/gm-site/' },
            { label: 'Your own rulebooks', link: '/tutorials/your-own-books/' },
          ],
        },
        { label: 'Everything it does', link: '/features/' },
        { label: 'Gallery', link: '/gallery/' },
      ],
      head: preview ? [{ tag: 'meta', attrs: { name: 'robots', content: 'noindex' } }] : [],
      plugins: [
        starlightBlog({
          title: 'Blog',
          authors: {
            ant: { name: 'Antony Pegg', url: 'https://github.com/AntTheLimey' },
          },
        }),
        starlightLinksValidator(),
      ],
    }),
  ],
});
