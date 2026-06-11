import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const apiVersion = '2024-01-01'

/**
 * Whether the Sanity client is configured.
 * When env vars are absent (local dev without .env.local) the gallery
 * will fall back to static mock data instead of crashing.
 */
export const isSanityConfigured = Boolean(projectId)

/**
 * Public read client — used in React Server Components and the migration script.
 * useCdn: true means responses are served from Sanity's edge CDN (fast, globally cached).
 *
 * Guard: returns null-ish when projectId is missing so the build doesn't crash.
 * All callers check `isSanityConfigured` before using this client.
 */
export const client = createClient({
  projectId: projectId ?? 'placeholder-unconfigured',
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
})

/**
 * Write / authenticated client — used by the webhook revalidation endpoint and migration script.
 * Never expose SANITY_API_TOKEN to the browser.
 */
export const writeClient = createClient({
  projectId: projectId ?? 'placeholder-unconfigured',
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})
