import GallerySection from '@/components/gallery/GallerySection';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { client, isSanityConfigured } from '@/lib/sanity/client';
import { getAllProjectsQuery } from '@/lib/sanity/queries';
import { galleryData, toGalleryProject, GalleryProject } from '@/lib/gallery-data';

// Re-render at most once per minute; Sanity webhook will trigger
// on-demand revalidation for instant updates on publish.
export const revalidate = 60;

export default async function GalleryPage() {
  let projects: GalleryProject[] = galleryData; // fallback to mock data

  if (isSanityConfigured) {
    try {
      const sanityProjects = await client.fetch(
        getAllProjectsQuery,
        {},
        { next: { revalidate: 60, tags: ['project'] } }
      );
      if (sanityProjects && sanityProjects.length > 0) {
        projects = sanityProjects.map(toGalleryProject);
      }
    } catch (err) {
      // Sanity fetch failed — fall back to static mock data silently
      console.warn('[Gallery] Sanity fetch failed, using mock data:', err);
    }
  }

  return (
    <main className="min-h-screen bg-space-black selection:bg-cosmic-violet/50 selection:text-soft-amber relative">
      <div className="absolute top-8 left-8 z-50">
        <Link 
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full font-mono text-xs uppercase text-white/70 hover:text-white transition-colors border border-white/10 backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Universe
        </Link>
      </div>
      <GallerySection projects={projects} />
    </main>
  );
}
