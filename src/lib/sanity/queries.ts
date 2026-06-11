import { groq } from 'next-sanity'
import { PortableTextBlock } from '@portabletext/types'

// ─── Raw Sanity image shape ───────────────────────────────────────────────────

export interface SanityImageAsset {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: { x: number; y: number; width: number; height: number }
  alt?: string
}

// ─── Raw Sanity query return types ───────────────────────────────────────────

export interface SanityVideoFile {
  _type: 'file'
  asset: {
    _ref: string
    _type: 'reference'
    url?: string
  }
}

export interface SanityTechnicalStats {
  renderTime?: string
  software?: string[]
  polyCount?: string
  resolution?: string
  nodes?: number
}

export interface SanityLayer {
  name: string
  image?: SanityImageAsset
}

export interface SanityBeforeAfter {
  rawImage?: SanityImageAsset
  finalImage?: SanityImageAsset
}

export interface SanityProject {
  _id: string
  _type: 'project'
  title?: string
  slug?: { current: string }
  client?: string
  category?: string
  subCategory?: string
  description?: PortableTextBlock[]
  thumbnailImage?: SanityImageAsset
  videoUrl?: string
  videoFile?: SanityVideoFile
  duration?: string
  beforeAfter?: SanityBeforeAfter
  layers?: SanityLayer[]
  technicalStats?: SanityTechnicalStats
  tools?: string[]
  shelfPosition?: number
  isFeatured?: boolean
  publishedAt?: string
}

// ─── GROQ Queries ─────────────────────────────────────────────────────────────

/**
 * Shared projection — all fields needed to render a project card
 * or the full modal. Reused across queries.
 */
const projectProjection = groq`{
  _id,
  title,
  "slug": slug.current,
  client,
  category,
  subCategory,
  description,
  thumbnailImage { ..., asset->{ _id, url, metadata { dimensions, lqip } } },
  videoUrl,
  videoFile { asset->{ _id, url } },
  duration,
  beforeAfter {
    rawImage { ..., asset->{ _id, url } },
    finalImage { ..., asset->{ _id, url } },
  },
  layers[] {
    name,
    image { ..., asset->{ _id, url } }
  },
  technicalStats,
  tools,
  shelfPosition,
  isFeatured,
  publishedAt
}`

/**
 * Fetch all published projects, newest first.
 * Used by the gallery page (RSC) with ISR revalidation.
 */
export const getAllProjectsQuery = groq`
  *[_type == "project"] | order(isFeatured desc, publishedAt desc)
  ${projectProjection}
`

/**
 * Fetch a single project by slug.
 * Used for per-project detail pages or modal prefetch.
 */
export const getProjectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]
  ${projectProjection}
`

/**
 * Fetch projects filtered by category.
 * Used when a filter tab is active.
 */
export const getProjectsByCategoryQuery = groq`
  *[_type == "project" && category == $category] | order(isFeatured desc, publishedAt desc)
  ${projectProjection}
`

/**
 * Fetch only slugs — used for generateStaticParams in dynamic routes.
 */
export const getAllProjectSlugsQuery = groq`
  *[_type == "project"]{ "slug": slug.current }
`
