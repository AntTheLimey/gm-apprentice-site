// Every crawler is welcome, search and AI alike: the site exists to be found.
// Branch previews and the old workers.dev address send X-Robots-Tag: noindex (public/_headers).
// Built from the site address, so a domain move is still one SITE_URL change.
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', site).href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
