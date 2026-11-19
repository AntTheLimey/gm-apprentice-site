import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { blogSchema } from 'starlight-blog/schema';

export const collections = {
  // Translation overrides. src/content/i18n/en.json formats post dates in UTC: they are
  // calendar days, and the build machine's time zone must not shift 19 November to 18.
  i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: (context) =>
        blogSchema(context).extend({
          // Where the post was first published, for republished LinkedIn articles.
          linkedin: z.string().url().optional(),
        }),
    }),
  }),
};
