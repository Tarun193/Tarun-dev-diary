/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        "Roboto-Mono": ["Roboto Mono", "monospace"],
        "IBM-Mono": ["IBM Plex Mono", "monospace"],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "--tw-prose-headings": "var(--md-text-color)",
            "max-width": "100%",
            color: "var(--md-text-color)",
            backgroundColor: "none",
            // ul: {
            //   display: "flex",
            //   "flex-flow": "column wrap",
            //   height: "250px",
            // },
            li: {
              color: "var(--md-li-text-color)",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
