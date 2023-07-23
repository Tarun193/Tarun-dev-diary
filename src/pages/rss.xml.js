import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import createSlug from "../lib/createSlug";

export async function get(context) {
  const blog = await getCollection("blog");
  return rss({
    title: "Tarun's Dev Diaries",
    description:
      "A place where people can learn about new technologies and enchance their skills",
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      author: post.data.author,
      tags: post.data.tags,
      // Compute RSS link from post `slug`
      // This example assumes all posts are rendered as `/blog/[slug]` routes
      link: `/posts/${createSlug(post.data.title)}/`,
    })),
  });
}
