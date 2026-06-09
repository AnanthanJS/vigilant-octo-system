import GallerySection from '@/components/gallery/GallerySection';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function GalleryPage() {
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
      <GallerySection />
    </main>
  );
}
