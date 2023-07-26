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
            "code::before": {
              content: '""', // This overrides the default content, which is the backtick.
            },
            "code::after": {
              content: '""', // This overrides the default content, which is the backtick.
            },
            code: {
              color: "var(--md-inline-code-color)",
              fontSize: "1em",
            },
            "font-size": "1.15rem",
            "--tw-prose-headings": "var(--md-text-color)",
            "max-width": "100%",
            color: "var(--md-text-color)",
            backgroundColor: "none",
            "--tw-prose-bold": "var(--md-text-color)",
            "--tw-prose-code": "var(--md-text-color)",
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
