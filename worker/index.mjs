// Host redirects in front of the static site. Everything else is a plain asset.
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

export default {
  async fetch(request, env) {
    const to = redirectFor(request.url);
    return to ? Response.redirect(to, 301) : env.ASSETS.fetch(request);
  },
};
