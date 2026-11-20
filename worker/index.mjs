// Host redirects in front of the static site. Everything else is a plain asset.
// www.gmapprentice.com/x  -> gmapprentice.com/x
// blog.gmapprentice.com/x -> gmapprentice.com/blog/x
const APEX = 'gmapprentice.com';

export function redirectFor(url) {
  const { hostname, pathname, search } = new URL(url);
  if (hostname === `www.${APEX}`) return `https://${APEX}${pathname}${search}`;
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
