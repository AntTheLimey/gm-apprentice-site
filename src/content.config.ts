import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { blogSchema } from 'starlight-blog/schema';

export const collections = {
  // Post dates are calendar days: format them in UTC so the build machine's time zone
  // can't shift a 19 November post to 18 November.
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
