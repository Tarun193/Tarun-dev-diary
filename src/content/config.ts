import { array } from 'astro/zod';
import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        tags: z.array(z.string()),
        image: z.string().optional(),
        author: z.enum(["Tarun Chawla"]),
        publishDate: z.date(),
    })
});

// Export a single collection object
// The key should match the collection directory in content folder;
export const collection = {
    "blog": blogCollection,
}