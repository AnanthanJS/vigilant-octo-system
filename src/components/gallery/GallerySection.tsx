'use client';

import { useState, useMemo, useEffect } from 'react';
import { galleryData, ProjectCategory } from '@/lib/gallery-data';
import GalleryHeader from './GalleryHeader';
import CinematicView from './views/CinematicView';
import TechnicalView from './views/TechnicalView';
import GridView from './views/GridView';
import ProjectModal from './ProjectModal';
import { GalleryProject } from '@/lib/gallery-data';

export default function GallerySection() {
  const [activeMode, setActiveMode] = useState<'cinematic' | 'technical' | 'grid'>('cinematic');
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'All'>('All');
  const [activeProject, setActiveProject] = useState<GalleryProject | null>(null);

  // Force grid view on mobile initially
  // useEffect(() => {
  //   if (window.innerWidth < 768) {
  //     setActiveMode('grid');
  //   }
  // }, []);

  const categories: (ProjectCategory | 'All')[] = ['All', 'VFX', 'Video Editing', '2D Design', '3D Design', 'Branding'];

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return galleryData;
    return galleryData.filter(project => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="min-h-screen bg-space-black relative overflow-hidden flex flex-col">
      {/* Background ambient light */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-cosmic-violet/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-soft-amber/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 w-full pt-20">
        <div className="text-center mb-8 px-4">
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-6 drop-shadow-lg">Featured Works</h2>
          <p className="font-mono text-sm text-soft-amber tracking-[0.3em] uppercase">Cinematic // Visual // Design</p>
        </div>

        <GalleryHeader 
          activeMode={activeMode}
          setActiveMode={setActiveMode}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={categories}
        />
        
        <div className="w-full flex-1 mt-8 transition-opacity duration-500">
          {activeMode === 'cinematic' && <CinematicView projects={filteredProjects} onProjectClick={setActiveProject} />}
          {activeMode === 'technical' && <TechnicalView projects={filteredProjects} onProjectClick={setActiveProject} />}
          {/* {activeMode === 'grid' && <GridView projects={filteredProjects} onProjectClick={setActiveProject} />} */}
        </div>
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
