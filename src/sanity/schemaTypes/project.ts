import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'media', title: 'Media' },
    { name: 'technical', title: 'Technical Stats' },
    { name: 'meta', title: 'Publishing & Meta' },
  ],
  fields: [
    // ─── Core identity ───────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().min(2).max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'meta',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: 'VFX', value: 'VFX' },
          { title: 'Motion Graphics', value: 'Motion Graphics' },
          { title: 'Video Editing', value: 'Video Editing' },
          { title: '2D Design', value: '2D Design' },
          { title: '3D Design', value: '3D Design' },
          { title: 'Branding', value: 'Branding' },
          { title: 'Illustration', value: 'Illustration' },
          { title: 'Canva', value: 'Canva' },
          { title: 'Course', value: 'Course' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      group: 'content',
      of: [{ type: 'block' }],
      description: 'Rich text description of the project.',
    }),

    // ─── Media ───────────────────────────────────────────────────────
    defineField({
      name: 'thumbnailImage',
      title: 'Thumbnail Image',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required().warning('Alt text is required for accessibility.'),
        }),
      ],
      description: 'Used as the book cover in the Tesseract view. Use a still image even for video projects.',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL (External)',
      type: 'url',
      group: 'media',
      description: 'YouTube, Vimeo, or any direct .mp4 link hosted elsewhere. Use this OR Video File below — not both.',
      validation: (Rule) =>
        Rule.uri({ allowRelative: false, scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File (Upload)',
      type: 'file',
      group: 'media',
      options: {
        accept: 'video/mp4,video/webm,video/quicktime,video/x-msvideo,video/*',
      },
      description: 'Upload an MP4, WebM, or MOV directly to Sanity. Max recommended size: 200MB. Use this OR Video URL above — not both.',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      group: 'media',
      description: 'e.g. "45s", "2:30". Displayed on video cards.',
    }),

    // ─── Before / After ──────────────────────────────────────────────
    defineField({
      name: 'beforeAfter',
      title: 'Before / After',
      type: 'object',
      group: 'media',
      description: 'Used in the Before/After slider interaction.',
      fields: [
        defineField({
          name: 'rawImage',
          title: 'Before (Raw) Image',
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
          ],
        }),
        defineField({
          name: 'finalImage',
          title: 'After (Final) Image',
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
          ],
        }),
      ],
    }),

    // ─── Layer scrubber ──────────────────────────────────────────────
    defineField({
      name: 'layers',
      title: 'Layer Scrubber Images',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Layer Name', type: 'string' }),
            defineField({
              name: 'image',
              title: 'Layer Image',
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
              ],
            }),
          ],
          preview: {
            select: { title: 'name', media: 'image' },
          },
        },
      ],
    }),

    // ─── Technical Stats ─────────────────────────────────────────────
    defineField({
      name: 'technicalStats',
      title: 'Technical Stats',
      type: 'object',
      group: 'technical',
      fields: [
        defineField({
          name: 'renderTime',
          title: 'Render Time',
          type: 'string',
          description: 'e.g. "45 hrs", "12 hrs/frame", "Real-time"',
        }),
        defineField({
          name: 'software',
          title: 'Software Used',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: [
              'After Effects', 'Premiere Pro', 'Photoshop', 'Illustrator',
              'Blender', 'Cinema 4D', 'DaVinci Resolve', 'Final Cut Pro',
              'Figma', 'Canva', 'Nuke', 'Houdini',
            ],
            layout: 'tags',
          },
        }),
        defineField({
          name: 'polyCount',
          title: 'Poly Count',
          type: 'string',
          description: 'e.g. "4.2M". Only relevant for 3D projects.',
        }),
        defineField({
          name: 'resolution',
          title: 'Resolution',
          type: 'string',
          description: 'e.g. "4K (3840x2160)", "Print Ready (300dpi)"',
        }),
        defineField({
          name: 'nodes',
          title: 'Node Count',
          type: 'number',
          description: 'Number of compositing/render nodes used.',
        }),
      ],
    }),

    defineField({
      name: 'tools',
      title: 'Tools (Free-form)',
      type: 'array',
      group: 'technical',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Additional free-form tool tags beyond the software list.',
    }),

    // ─── Tesseract positioning ────────────────────────────────────────
    defineField({
      name: 'shelfPosition',
      title: 'Shelf Position',
      type: 'number',
      group: 'meta',
      description: 'Optional: which cell/shelf index this project occupies in the Tesseract (0–15). Leave empty for automatic ordering.',
    }),

    // ─── Publishing meta ──────────────────────────────────────────────
    defineField({
      name: 'isFeatured',
      title: 'Featured',
      type: 'boolean',
      group: 'meta',
      initialValue: false,
      description: 'Featured projects appear on the first shelf of each Tesseract cell.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'meta',
      options: { dateFormat: 'YYYY-MM-DD', timeFormat: 'HH:mm' },
      initialValue: () => new Date().toISOString(),
    }),
  ],

  // Preview in Studio
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'thumbnailImage',
      client: 'client',
    },
    prepare({ title, subtitle, media, client }) {
      return {
        title: title ?? 'Untitled Project',
        subtitle: [subtitle, client].filter(Boolean).join(' — '),
        media,
      }
    },
  },

  // Validation: at least thumbnail or video must be present
  // (done at field level above; cross-field validation would require a custom rule)
  orderings: [
    {
      title: 'Published (newest first)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Featured first',
      name: 'featuredFirst',
      by: [
        { field: 'isFeatured', direction: 'desc' },
        { field: 'publishedAt', direction: 'desc' },
      ],
    },
  ],
})
