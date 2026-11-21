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

// /raven/* -> PostHog (US cloud), as PostHog's own Cloudflare Worker guide does it. Page
// analytics go through the site's own address, on a path no blocklist knows, so
// ad-blockers that block PostHog's hosts don't drop them (src/components/posthog.astro).
// Not exported: a Worker's named exports must be handlers (a constant stops it starting).
const RELAY = '/raven';
const POSTHOG_API = 'us.i.posthog.com';
const POSTHOG_ASSETS = 'us-assets.i.posthog.com';

export function relayTarget(url) {
  const { pathname, search } = new URL(url);
  if (!pathname.startsWith(`${RELAY}/`)) return null;
  const rest = pathname.slice(RELAY.length);
  // Scripts (/static/) and remote config (/array/) come from the assets host.
  const host = /^\/(static|array)\//.test(rest) ? POSTHOG_ASSETS : POSTHOG_API;
  return `https://${host}${rest}${search}`;
}

async function relay(request, target) {
  const headers = new Headers(request.headers);
  headers.delete('cookie');
  headers.delete('host');
  // PostHog keys travel as "Bearer phc_..."; drop any other credential.
  if (!/^Bearer ph[csx]_/.test(headers.get('authorization') ?? '')) headers.delete('authorization');
  // PostHog's cookieless visitor count and location need the reader's address, not ours.
  // Only when Cloudflare gives one: an empty value blanks the location (seen in wrangler dev).
  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) headers.set('X-Forwarded-For', ip);
  const body = request.method === 'GET' || request.method === 'HEAD' ? null : await request.arrayBuffer();
  return fetch(target, { method: request.method, headers, body, redirect: 'manual' });
}

export default {
  async fetch(request, env) {
    const to = redirectFor(request.url);
    if (to) return Response.redirect(to, 301);
    const target = relayTarget(request.url);
    return target ? relay(request, target) : env.ASSETS.fetch(request);
  },
};
