import {z, defineCollection} from "astro:content";


const blogCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        tags: z.array(z.string()),
        image: z.string().optional(),
        author: z.enum(["Tarun Chawla"]),
        publishDate: z.string().transform((str) => new Date(str).toString().split(" ").slice(0,4).join(" ")),
        description: z.string(),
        draft: z.boolean().default(false)
    })
});

export const collections = {
    blog: blogCollection,
}