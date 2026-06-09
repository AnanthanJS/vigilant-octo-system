'use client';

import { GalleryProject } from '@/lib/gallery-data';
import Image from 'next/image';
import { Play } from 'lucide-react';

interface GridViewProps {
  projects: GalleryProject[];
  onProjectClick: (project: GalleryProject) => void;
}

export default function GridView({ projects, onProjectClick }: GridViewProps) {

  return (
    <div className="w-full px-4 md:px-8 max-w-7xl mx-auto pb-24">
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="break-inside-avoid relative group rounded-xl overflow-hidden bg-space-void border border-white/5 cursor-pointer transform transition-transform duration-300 hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(212,163,115,0.15)]"
            onClick={() => onProjectClick(project)}
          >
            {/* Thumbnail */}
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: Math.random() > 0.5 ? '4/5' : '16/9' }}>
              {project.thumbnailUrl.endsWith('.mp4') ? (
                <video
                  src={project.thumbnailUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <Image 
                  src={project.thumbnailUrl} 
                  alt={project.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-space-black via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div>
                  <h4 className="font-serif text-lg text-white mb-1">{project.title}</h4>
                  <p className="font-mono text-[10px] text-soft-amber uppercase tracking-widest">{project.category}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
