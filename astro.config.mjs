import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    sitemap({
      customPages: ["https://tarun-chawla.tech"],
    }),
  ],
  site: "https://www.blog.tarun-chawla.tech",
});
