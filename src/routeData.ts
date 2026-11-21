// Search and link-preview fixes Starlight can't make from frontmatter alone.
// - Blog pages starlight-blog builds (the index, its later pages, the author page)
//   get a description.
// - A post with a cover (or a `share` picture) shares with it, not the site card.
import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

type HeadEntry = { tag: string; attrs?: Record<string, string | boolean | undefined>; content?: string };

const BLOG_DESCRIPTION =
  'Posts by Antony Pegg on building GM-Apprentice, AI skills for tabletop game masters, and what building them taught him.';

/** Replace the <meta> whose name or property is `key`, or add one. */
function setMeta(head: HeadEntry[], key: string, content: string) {
  const attr = key.startsWith('og:') ? 'property' : 'name';
  const entry = head.find((e) => e.tag === 'meta' && e.attrs?.[attr] === key);
  if (entry) entry.attrs = { ...entry.attrs, content };
  else head.push({ tag: 'meta', attrs: { [attr]: key, content } });
}

export const onRequest = defineRouteMiddleware((context) => {
  const route = context.locals.starlightRoute;
  const head = route.head as HeadEntry[];
  const id = route.id.replace(/\/$/, '');

  if (!route.entry.data.description && (id === 'blog' || /^blog\/(\d+|authors\/.+)$/.test(id))) {
    const page = id.match(/^blog\/(\d+)$/)?.[1];
    const author = id.startsWith('blog/authors/');
    const description = author
      ? 'Every post Antony Pegg has written on the GM-Apprentice blog.'
      : page ? `${BLOG_DESCRIPTION} Page ${page}.` : BLOG_DESCRIPTION;
    setMeta(head, 'description', description);
    setMeta(head, 'og:description', description);
    // Later index pages would otherwise share page 1's title.
    const title = head.find((e) => e.tag === 'title');
    if (page && title?.content) title.content = title.content.replace(/^Blog\b/, `Blog, page ${page}`);
  }

  type Picture = { image?: { src: string; width: number; height: number }; alt?: string };
  const data = route.entry.data as { cover?: Picture; share?: Picture };
  // A cover is also the share picture; `share` gives one to a post without a cover.
  const cover = data.cover ?? data.share;
  if (cover?.image && context.site) {
    setMeta(head, 'og:image', new URL(cover.image.src, context.site).href);
    setMeta(head, 'og:image:width', String(cover.image.width));
    setMeta(head, 'og:image:height', String(cover.image.height));
    if (cover.alt) setMeta(head, 'og:image:alt', cover.alt);
  }
});
