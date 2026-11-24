// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightBlog from 'starlight-blog';
import starlightLinksValidator from 'starlight-links-validator';
import starlightLlmsTxt from 'starlight-llms-txt';
import { unified } from '@astrojs/markdown-remark';
import rehypeExchanges from './src/plugins/rehype-exchanges.mjs';
import rehypeTaskLabels from './src/plugins/rehype-task-labels.mjs';

// The public address comes from SITE_URL so a custom domain is a one-value change.
const site = process.env.SITE_URL ?? 'https://gmapprentice.com';
// Branch previews (scripts/preview.sh) set PREVIEW=1 and stay out of search engines.
const preview = process.env.PREVIEW === '1';

export default defineConfig({
  site,
  // Republished posts keep the author's own characters: no automatic curly quotes,
  // dashes or ellipses.
  // Tutorial conversations: [!you] / [!apprentice] / [!vault] blockquotes (see the plugin);
  // checklist boxes named for screen readers.
  markdown: { processor: unified({ smartypants: false, rehypePlugins: [rehypeExchanges, rehypeTaskLabels] }) },
  integrations: [
    starlight({
      title: 'GM-Apprentice',
      // The raven logo (brand pack, 2026-11-20): brass on green in dark mode, green in light.
      logo: {
        dark: './src/assets/logo-horizontal-dark.svg',
        light: './src/assets/logo-horizontal-light.svg',
        replacesTitle: true,
      },
      favicon: '/favicon.svg',
      customCss: ['./src/styles/theme.css'],
      // Blog index descriptions and per-post share pictures (see the file).
      routeMiddleware: './src/routeData.ts',
      // Wraps starlight-blog's own override (see the component).
      components: {
        Head: './src/components/overrides/Head.astro',
        MarkdownContent: './src/components/overrides/MarkdownContent.astro',
      },
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
            // The same groups, in the same order, as the tutorials index page.
            // Folded: only the group holding the page being read opens.
            { label: 'All tutorials', link: '/tutorials/' },
            {
              label: 'Organize',
              collapsed: true,
              items: [
                { label: 'Grow a campaign from an idea', link: '/tutorials/grow-a-campaign/' },
                { label: 'Bring in an existing campaign', link: '/tutorials/bring-in-a-campaign/' },
                { label: 'Organize your notes', link: '/tutorials/organize-your-notes/' },
                { label: 'House rules', link: '/tutorials/house-rules/' },
                { label: 'Check your vault', link: '/tutorials/check-your-vault/' },
              ],
            },
            {
              label: 'Prep',
              collapsed: true,
              items: [
                { label: 'Prep a session', link: '/tutorials/prep-a-session/' },
                { label: 'Rules, NPCs and ideas', link: '/tutorials/rules-npcs-and-ideas/' },
                { label: 'Your own rulebooks', link: '/tutorials/your-own-books/' },
              ],
            },
            {
              label: 'Run',
              collapsed: true,
              items: [
                { label: 'At the table', link: '/tutorials/at-the-table/' },
                { label: 'Players at the table', link: '/tutorials/players-at-the-table/' },
              ],
            },
            {
              label: 'Publish',
              collapsed: true,
              items: [
                { label: 'Wrap up a session', link: '/tutorials/wrap-up-a-session/' },
                { label: 'Publish your site', link: '/tutorials/publish-your-site/' },
                { label: 'The GM site', link: '/tutorials/gm-site/' },
              ],
            },
            {
              label: 'Customizing',
              collapsed: true,
              items: [
                { label: 'Connections', link: '/tutorials/connections/' },
                { label: 'Handouts', link: '/tutorials/handouts/' },
                { label: 'Character sheets', link: '/tutorials/character-sheets/' },
                { label: 'Add pictures', link: '/tutorials/add-pictures/' },
                { label: 'Change the look', link: '/tutorials/change-the-look/' },
              ],
            },
            {
              label: 'Without an agent',
              collapsed: true,
              items: [{ label: 'Do it by hand', link: '/tutorials/do-it-by-hand/' }],
            },
          ],
        },
        { label: 'Everything it does', link: '/features/' },
        { label: 'Works with', link: '/works-with/' },
        { label: 'Where the AI stops', link: '/where-the-ai-stops/' },
        { label: 'Gallery', link: '/gallery/' },
        { label: 'Support', link: '/support/' },
        { label: 'Privacy', link: '/privacy/' },
      ],
      head: [
        { tag: 'link', attrs: { rel: 'icon', href: '/favicon.ico', sizes: 'any' } },
        { tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' } },
        { tag: 'link', attrs: { rel: 'manifest', href: '/site.webmanifest' } },
        { tag: 'meta', attrs: { property: 'og:image', content: new URL('/social-card.png', site).href } },
        { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
        { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
        ...(preview ? [{ tag: 'meta', attrs: { name: 'robots', content: 'noindex' } }] : []),
      ],
      plugins: [
        starlightBlog({
          title: 'Blog',
          authors: {
            ant: { name: 'Antony Pegg', url: 'https://github.com/AntTheLimey' },
          },
        }),
        starlightLinksValidator(),
        // /llms.txt, /llms-full.txt and /llms-small.txt for AI assistants (llmstxt.org).
        starlightLlmsTxt({
          projectName: 'GM-Apprentice',
          description:
            'Free, open-source AI skills for tabletop game masters. They organize campaign notes into a linked vault, prep sessions, help at the table, wrap up after play and publish a campaign website for the players. They run inside an AI agent such as Claude Code or Codex, or any agent that takes skills.',
          promote: ['start/**', 'tutorials/**'],
          demote: ['blog/**'],
        }),
      ],
    }),
  ],
});
