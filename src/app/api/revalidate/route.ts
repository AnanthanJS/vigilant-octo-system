import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/revalidate
 *
 * Called by Sanity webhooks when a project document is published or unpublished.
 * Sanity Studio webhook setup:
 *   URL: https://your-domain.com/api/revalidate
 *   HTTP Method: POST
 *   Trigger on: Create, Update, Delete  →  filter: _type == "project"
 *   Headers: { "x-sanity-webhook-secret": "<SANITY_WEBHOOK_SECRET>" }
 *   Projection: { "type": _type, "slug": slug.current }
 *
 * Expected body: { "type": "project", "slug": "captain-a" }
 */
export async function POST(req: NextRequest) {
  // ── 1. Authenticate ──────────────────────────────────────────────────────────
  const secret = process.env.SANITY_WEBHOOK_SECRET
  if (secret) {
    const incomingSecret = req.headers.get('x-sanity-webhook-secret')
    if (incomingSecret !== secret) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }
  }

  // ── 2. Parse body ────────────────────────────────────────────────────────────
  let body: { type?: string; slug?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 })
  }

  const { type, slug } = body

  if (!type) {
    return NextResponse.json(
      { message: 'Missing "type" field in body' },
      { status: 400 }
    )
  }

  // ── 3. Revalidate ────────────────────────────────────────────────────────────
  try {
    if (type === 'project') {
      // Revalidate the gallery index (shows all projects)
      revalidatePath('/gallery', 'page')

      // Revalidate the cache tag used in client.fetch() calls
      revalidateTag('project', 'default')

      // If a specific slug is provided, revalidate its detail path too
      if (slug) {
        revalidatePath(`/gallery/${slug}`, 'page')
      }

      console.log(`[Revalidate] Triggered for type="${type}" slug="${slug ?? 'N/A'}"`)

      return NextResponse.json({
        revalidated: true,
        type,
        slug: slug ?? null,
        timestamp: new Date().toISOString(),
      })
    }

    // Unknown document type — still return 200 to prevent Sanity retry loops
    return NextResponse.json({
      revalidated: false,
      message: `No revalidation handler for type "${type}"`,
    })
  } catch (err) {
    console.error('[Revalidate] Error:', err)
    return NextResponse.json(
      { message: 'Revalidation failed', error: String(err) },
      { status: 500 }
    )
  }
}

// Health check — GET returns 200 so you can test the endpoint is alive
export async function GET() {
  return NextResponse.json({
    ok: true,
    message: 'Revalidation endpoint is live. Use POST to trigger revalidation.',
  })
}
