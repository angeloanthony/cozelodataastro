/**
 * Central image registry.
 *
 * We eagerly glob every image under `src/assets` so that:
 *   1. Astro can optimize each one (responsive WebP/AVIF, hashing, sizing).
 *   2. A *missing* file simply doesn't appear in the map — there is no broken
 *      static import, so the build never fails over an absent asset. Components
 *      then fall back to their CSS gradient mockup.
 *
 * Usage:
 *   import { getImage } from "../lib/images";
 *   const img = getImage("hero/digital-ecosystem.webp"); // ImageMetadata | undefined
 */
import type { ImageMetadata } from "astro";

// Vite resolves this at build time. `eager` gives us the metadata objects
// directly (not async importers), which is what <Image src> expects.
const modules = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/**/*.{webp,png,jpg,jpeg,avif,svg}",
  { eager: true }
);

// Normalize keys to paths relative to `src/assets/`, e.g. "hero/foo.webp".
const registry: Record<string, ImageMetadata> = {};
for (const [path, mod] of Object.entries(modules)) {
  const key = path.replace(/^.*\/assets\//, "");
  registry[key] = mod.default;
}

/**
 * Look up an optimized image by its path relative to `src/assets/`.
 * Returns `undefined` when the file is not present, signalling the caller
 * to render its fallback.
 */
export function getImage(relativePath: string): ImageMetadata | undefined {
  return registry[relativePath];
}

/** True when the given asset exists in the bundle. */
export function hasImage(relativePath: string): boolean {
  return relativePath in registry;
}
