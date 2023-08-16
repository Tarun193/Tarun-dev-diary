import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    sitemap({
      customPages: ["https://tarun-chawla.tech"],
    }),
    react(),
  ],
  experimental: {
    viewTransitions: true,
  },
  site: "https://www.blog.tarun-chawla.tech",
});
