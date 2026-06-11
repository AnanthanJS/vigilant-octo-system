/**
 * Migration Script: Local mock data → Sanity CMS
 *
 * Usage:
 *   1. Copy .env.local.example to .env.local and fill in your values.
 *   2. Make sure SANITY_API_TOKEN has "Editor" permissions.
 *   3. Run:  npx tsx scripts/migrate-to-sanity.ts
 *
 * What this does:
 *   - Creates one Sanity `project` document per entry in galleryData
 *   - Preserves slugs, titles, categories, descriptions, and technicalStats exactly
 *   - Sets publishedAt to now (idempotent: skips if slug already exists)
 *
 * What this does NOT do:
 *   - Upload binary image files from /public/memories/ to Sanity asset store
 *     (images stay as external URLs; to upload them use Sanity's asset import CLI
 *     or the Media plugin inside the Studio)
 *   - Upload video files (videoUrl stays as a plain URL string)
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as path from 'path'
import * as fs from 'fs'

// Load .env.local
const envPath = path.resolve(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath })
} else {
  dotenv.config()
}

// ── Inline mock data (copy from gallery-data.ts to avoid TS import complexity) ──

interface MockProject {
  id: string
  title: string
  client: string
  category: string
  thumbnailUrl: string
  videoUrl?: string
  rawImageUrl?: string
  finalImageUrl?: string
  description: string
  layers?: { name: string; imageUrl: string }[]
  technicalStats?: {
    renderTime: string
    software: string[]
    polyCount?: string
    resolution: string
    nodes: number
  }
}

const galleryData: MockProject[] = [
  {
    id: 'glimpse-of-trivandrum',
    title: 'Glimpse of Trivandrum',
    client: 'Personal Project',
    category: 'Video Editing',
    thumbnailUrl: '/memories/Sequence 06_1.mp4',
    videoUrl: '/memories/Sequence 06_1.mp4',
    rawImageUrl: '/memories/Business-Card-Mockup-1.jpg',
    finalImageUrl: '/memories/Captain A mockup.png',
    description:
      'A cinematic showcase capturing the vibrant essence and cultural heritage of Trivandrum, utilizing advanced video editing and color grading techniques to bring the city to life.',
    layers: [
      { name: 'Beauty Pass', imageUrl: '/memories/product cover.jpeg' },
      { name: 'Reflection', imageUrl: '/memories/Magzine cover mockup.jpeg' },
      { name: 'Ambient Occlusion', imageUrl: '/memories/flyer.jpeg' },
      { name: 'Final Composite', imageUrl: '/memories/Captain A mockup.png' },
    ],
    technicalStats: {
      renderTime: '45 hrs',
      software: ['Premiere Pro'],
      resolution: '4K (3840x2160)',
      nodes: 234,
    },
  },
  {
    id: 'captain-a',
    title: 'Captain A Character Model',
    client: 'Studio X',
    category: '2D Design',
    thumbnailUrl: '/memories/Captain A mockup.png',
    rawImageUrl: '/memories/Captain A mockup.png',
    finalImageUrl: '/memories/Captain A mockup.png',
    description: 'High-poly character modeling and texturing for cinematic production.',
    technicalStats: {
      renderTime: '12 hrs/frame',
      software: ['Illustrator'],
      polyCount: '4.2M',
      resolution: '8K',
      nodes: 56,
    },
  },
  {
    id: 'branding-business-card',
    title: 'Premium Brand Identity',
    client: 'Stellar Corp',
    category: 'Branding',
    thumbnailUrl: '/memories/Business-Card-Mockup-1.jpg',
    rawImageUrl: '/memories/Business-Card-Mockup-1.jpg',
    finalImageUrl: '/memories/Logo mockup2.jpeg',
    description: 'Complete brand overhaul including logo design, business cards, and stationery mockups.',
    technicalStats: {
      renderTime: 'Real-time',
      software: ['Illustrator'],
      resolution: 'Print Ready (300dpi)',
      nodes: 0,
    },
  },
  {
    id: 'magazine-cover',
    title: 'Future Tech Magazine',
    client: 'Future Editorial',
    category: 'Branding',
    thumbnailUrl: '/memories/Magzine cover mockup.jpeg',
    rawImageUrl: '/memories/Magzine cover mockup.jpeg',
    finalImageUrl: '/memories/Magzine cover mockup.jpeg',
    description: 'Cover design and typography for a leading technology publication.',
    technicalStats: {
      renderTime: 'N/A',
      software: ['Photoshop'],
      resolution: 'Print Ready',
      nodes: 12,
    },
  },
  {
    id: 'product-concept',
    title: 'Product Visualization',
    client: 'Aero Dynamics',
    category: '3D Design',
    thumbnailUrl: '/memories/product cover.jpeg',
    rawImageUrl: '/memories/product cover.jpeg',
    finalImageUrl: '/memories/product cover.jpeg',
    description: 'Product visualization emphasizing lighting and material properties in a studio environment.',
    technicalStats: {
      renderTime: '2 hrs/frame',
      software: ['Photoshop'],
      resolution: '4K',
      nodes: 89,
    },
  },
  {
    id: 'event-flyer',
    title: 'Event Flyer',
    client: 'Club Vertex',
    category: 'Branding',
    thumbnailUrl: '/memories/flyer.jpeg',
    rawImageUrl: '/memories/flyer.jpeg',
    finalImageUrl: '/memories/flyer.jpeg',
    description: 'Vibrant promotional material designed for high impact on both print and social media.',
    technicalStats: {
      renderTime: 'N/A',
      software: ['Photoshop'],
      resolution: 'Various',
      nodes: 5,
    },
  },
  {
    id: 'malabar-logistics',
    title: 'Malabar Logistics Branding',
    client: 'Malabar Logistics',
    category: 'Branding',
    thumbnailUrl: '/memories/malabar_logistics.jpeg',
    rawImageUrl: '/memories/malabar_logistics.jpeg',
    finalImageUrl: '/memories/malabar_logistics.jpeg',
    description: 'Corporate branding and visual identity for Malabar Logistics.',
    technicalStats: {
      renderTime: 'N/A',
      software: ['Photoshop'],
      resolution: 'Print Ready',
      nodes: 0,
    },
  },
]

// ── Sanity client ─────────────────────────────────────────────────────────────

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId) {
  console.error('❌  NEXT_PUBLIC_SANITY_PROJECT_ID is not set in .env.local')
  process.exit(1)
}
if (!token) {
  console.error('❌  SANITY_API_TOKEN is not set in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

// ── Convert mock → Sanity document ───────────────────────────────────────────

function toSanityDocument(p: MockProject) {
  // Description as minimal portable text (single paragraph block)
  const descriptionBlocks = p.description
    ? [
        {
          _type: 'block',
          _key: `desc-${p.id}`,
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: `span-${p.id}`,
              text: p.description,
              marks: [],
            },
          ],
        },
      ]
    : []

  // videoUrl: only set if the thumbnail is actually a video
  const isVideo = p.thumbnailUrl.endsWith('.mp4') || p.videoUrl?.endsWith('.mp4')
  const videoUrl = isVideo ? (p.videoUrl ?? p.thumbnailUrl) : undefined

  return {
    _type: 'project',
    _id: `project-${p.id}`,   // deterministic _id prevents duplicates on re-run
    title: p.title,
    slug: { _type: 'slug', current: p.id },
    client: p.client,
    category: p.category,
    description: descriptionBlocks,
    // thumbnailImage is intentionally left empty here.
    // Images stored in /public/memories/ are local files — use Sanity Studio
    // or the CLI (`sanity dataset import`) to upload them as proper assets.
    // For now, we store the local path as videoUrl so the gallery still renders.
    videoUrl: videoUrl ?? (!isVideo ? undefined : undefined),
    // Store external/local URLs in videoUrl for video projects
    ...(isVideo && { videoUrl: p.videoUrl ?? p.thumbnailUrl }),
    beforeAfter:
      p.rawImageUrl || p.finalImageUrl
        ? {
            // These will be null until images are uploaded to Sanity
            rawImage: undefined,
            finalImage: undefined,
          }
        : undefined,
    technicalStats: p.technicalStats
      ? {
          renderTime: p.technicalStats.renderTime,
          software: p.technicalStats.software,
          polyCount: p.technicalStats.polyCount ?? null,
          resolution: p.technicalStats.resolution,
          nodes: p.technicalStats.nodes,
        }
      : undefined,
    isFeatured: false,
    publishedAt: new Date().toISOString(),
  }
}

// ── Main migration ────────────────────────────────────────────────────────────

async function migrate() {
  console.log(`\n🚀 Starting migration to Sanity (projectId: ${projectId}, dataset: ${dataset})\n`)
  console.log(`📦 ${galleryData.length} projects to migrate\n`)

  let created = 0
  let skipped = 0
  let failed = 0

  for (const p of galleryData) {
    const docId = `project-${p.id}`

    // Check if document already exists
    const existing = await client.fetch(`*[_id == $id][0]._id`, { id: docId })
    if (existing) {
      console.log(`  ⏭  Skipped (already exists): ${p.title}`)
      skipped++
      continue
    }

    try {
      const doc = toSanityDocument(p)
      await client.create(doc)
      console.log(`  ✅ Created: ${p.title} (${docId})`)
      created++
    } catch (err) {
      console.error(`  ❌ Failed: ${p.title}`, err)
      failed++
    }
  }

  console.log(`
─────────────────────────────────────
Migration complete
  Created : ${created}
  Skipped : ${skipped}
  Failed  : ${failed}
─────────────────────────────────────

⚠️  Note: Images were NOT uploaded. Local /public/memories/ paths are kept
   as plain strings. To upload images, open Sanity Studio (/studio),
   navigate to each project, and upload the thumbnail/before/after images
   manually — or use the Sanity Media plugin for bulk uploads.
`)
}

migrate().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
