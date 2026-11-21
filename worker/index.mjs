// Host redirects and the analytics relay in front of the static site. Everything else
// is a plain asset.
// www.gmapprentice.com/x  -> gmapprentice.com/x
// blog.gmapprentice.com/x -> gmapprentice.com/blog/x
// gm-apprentice.antthelimey.workers.dev/x -> gmapprentice.com/x (the old address;
// branch previews live on <branch>-gm-apprentice... and are served, not redirected)
const APEX = 'gmapprentice.com';
const OLD_HOST = 'gm-apprentice.antthelimey.workers.dev';

export function redirectFor(url) {
  const { hostname, pathname, search } = new URL(url);
  if (hostname === `www.${APEX}` || hostname === OLD_HOST) return `https://${APEX}${pathname}${search}`;
  if (hostname === `blog.${APEX}`) {
    const path = pathname === '/blog' || pathname.startsWith('/blog/') ? pathname : `/blog${pathname}`;
    return `https://${APEX}${path}${search}`;
  }
  return null;
}

// /ingest/* -> PostHog (US cloud). Page analytics go through the site's own address so
// ad-blockers that block PostHog's hosts don't drop them (src/components/posthog.astro).
const POSTHOG_API = 'us.i.posthog.com';
const POSTHOG_ASSETS = 'us-assets.i.posthog.com';

export function ingestTarget(url) {
  const { pathname, search } = new URL(url);
  if (!pathname.startsWith('/ingest/')) return null;
  const rest = pathname.slice('/ingest'.length);
  const host = rest.startsWith('/static/') ? POSTHOG_ASSETS : POSTHOG_API;
  return `https://${host}${rest}${search}`;
}

function relay(request, target) {
  const headers = new Headers(request.headers);
  headers.delete('cookie');
  // PostHog's cookieless visitor count and location need the reader's address, not ours.
  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) headers.set('X-Forwarded-For', ip);
  return fetch(target, { method: request.method, headers, body: request.body, redirect: 'manual' });
}

export default {
  async fetch(request, env) {
    const to = redirectFor(request.url);
    if (to) return Response.redirect(to, 301);
    const target = ingestTarget(request.url);
    return target ? relay(request, target) : env.ASSETS.fetch(request);
  },
};
