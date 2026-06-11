import type { Metadata, Viewport } from 'next'
import { metadata as studioMetadata, viewport as studioViewport } from 'next-sanity/studio'

// Let Sanity Studio control its own metadata and viewport
export const metadata: Metadata = studioMetadata
export const viewport: Viewport = studioViewport as Viewport

// Do NOT wrap with <html> or <body> — the root layout already provides those.
// Returning children directly lets NextStudio take full control of the page.
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
