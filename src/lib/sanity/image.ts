import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from './client'
import { SanityImageAsset } from './queries'

const builder = createImageUrlBuilder(client)

/**
 * Returns a Sanity image URL builder instance for a given image reference.
 * Chain methods like .width(800).format('webp').url() to get the final URL.
 *
 * @example
 * urlFor(project.thumbnailImage).width(800).format('webp').url()
 */
export function urlFor(source: SanityImageAsset | undefined | null) {
  if (!source?.asset) return null
  return builder.image(source)
}

/**
 * Convenience helper that returns a plain string URL for an image.
 * Falls back to the provided fallback string (e.g. a local /public path).
 *
 * @param source   - Sanity image reference object
 * @param fallback - Local path or placeholder URL if source is absent
 * @param width    - Target width in pixels (default: 1200)
 */
export function urlForString(
  source: SanityImageAsset | undefined | null,
  fallback: string = '',
  width: number = 1200
): string {
  if (!source?.asset) return fallback
  return builder.image(source).width(width).auto('format').url()
}
