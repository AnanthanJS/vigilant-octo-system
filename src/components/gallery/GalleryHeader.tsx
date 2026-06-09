'use client';

import { ProjectCategory } from '@/lib/gallery-data';
import { LayoutGrid, Film, Settings2 } from 'lucide-react';

interface GalleryHeaderProps {
  activeMode: 'cinematic' | 'technical' | 'grid';
  setActiveMode: (mode: 'cinematic' | 'technical' | 'grid') => void;
  activeCategory: ProjectCategory | 'All';
  setActiveCategory: (category: ProjectCategory | 'All') => void;
  categories: (ProjectCategory | 'All')[];
}

export default function GalleryHeader({
  activeMode,
  setActiveMode,
  activeCategory,
  setActiveCategory,
  categories
}: GalleryHeaderProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6 z-10 relative">
      
      {/* Category Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full font-mono text-xs tracking-widest uppercase transition-all duration-300 ${
              activeCategory === category 
                ? 'bg-soft-amber text-space-black font-bold shadow-[0_0_15px_rgba(212,163,115,0.5)]' 
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* View Mode Toggles (Hidden on very small screens, falls back to Grid) */}
      <div className="hidden sm:flex items-center bg-white/5 rounded-full p-1 border border-white/10 backdrop-blur-sm">
        <button
          onClick={() => setActiveMode('cinematic')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${
            activeMode === 'cinematic' ? 'bg-space-black text-soft-amber shadow-sm' : 'text-white/50 hover:text-white'
          }`}
        >
          <Film className="w-4 h-4" /> <span className="hidden md:inline">Cinematic</span>
        </button>
        <button
          onClick={() => setActiveMode('technical')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${
            activeMode === 'technical' ? 'bg-space-black text-soft-amber shadow-sm' : 'text-white/50 hover:text-white'
          }`}
        >
          <Settings2 className="w-4 h-4" /> <span className="hidden md:inline">Technical</span>
        </button>
        <button
          onClick={() => setActiveMode('grid')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${
            activeMode === 'grid' ? 'bg-space-black text-soft-amber shadow-sm' : 'text-white/50 hover:text-white'
          }`}
        >
          <LayoutGrid className="w-4 h-4" /> <span className="hidden md:inline">Grid</span>
        </button>
      </div>
      
    </div>
  );
}
