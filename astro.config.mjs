// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Production site URL — used for canonical tags, sitemap, robots, and OG tags.
const SITE = "https://cozelosdata.com";

// https://astro.build/config
export default defineConfig({
  site: SITE,
  // Static output — fastest possible delivery, ideal for Lighthouse 95+.
  output: "static",
  integrations: [
    sitemap({
      // Friendly, predictable change cadence for a marketing site.
      changefreq: "weekly",
      priority: 0.8,
      lastmod: new Date(),
    }),
  ],
  // Route prefetching: links are prefetched on hover/viewport for instant navigation.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  vite: {
    // Cast avoids a benign type mismatch between Astro's bundled Vite types
    // and the Tailwind plugin's Vite types; runtime behavior is unaffected.
    plugins: [/** @type {any} */ (tailwindcss())],
  },
  build: {
    // Inline tiny stylesheets to cut render-blocking requests.
    inlineStylesheets: "auto",
  },
  image: {
    // Allow Astro's built-in image optimization service.
    responsiveStyles: true,
  },
});
