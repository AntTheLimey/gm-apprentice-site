// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightBlog from 'starlight-blog';
import starlightLinksValidator from 'starlight-links-validator';

// The public address comes from SITE_URL so a custom domain is a one-value change.
const site = process.env.SITE_URL ?? 'https://gm-apprentice.antthelimey.workers.dev';
// Branch previews (scripts/preview.sh) set PREVIEW=1 and stay out of search engines.
const preview = process.env.PREVIEW === '1';

export default defineConfig({
  site,
  integrations: [
    starlight({
      title: 'GM-Apprentice',
      customCss: ['./src/styles/theme.css'],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/AntTheLimey/gm-apprentice' },
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
