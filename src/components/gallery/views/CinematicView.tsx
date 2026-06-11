'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import { GalleryProject } from '@/lib/gallery-data';
import { Play } from 'lucide-react';

interface CinematicViewProps {
  projects: GalleryProject[];
  onProjectClick: (project: GalleryProject) => void;
}

export default function CinematicView({ projects, onProjectClick }: CinematicViewProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [projects]);

  return (
    <div className="relative w-full h-[70vh] min-h-[600px] flex flex-col">

      {/* Film Strip Carousel */}
      <motion.div ref={carouselRef} className="flex-1 overflow-hidden cursor-grab active:cursor-grabbing pb-8">
        <motion.div 
          drag="x" 
          dragConstraints={{ right: 0, left: -width }} 
          className="flex gap-8 h-full items-center px-8"
        >
          {projects.map((project) => (
            <motion.div 
              key={project.id}
              className="min-w-[400px] h-[500px] md:min-w-[600px] md:h-[80%] relative group rounded-xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/5 shrink-0"
              onClick={() => onProjectClick(project)}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
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
              <div className="absolute inset-0 bg-gradient-to-t from-space-black via-space-black/40 to-transparent opacity-80" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <p className="font-mono text-xs text-soft-amber mb-3 tracking-[0.2em] uppercase">
                  {project.subCategory || project.category}
                </p>
                <h3 className="text-3xl font-serif text-white mb-4 drop-shadow-md">
                  {project.title}
                </h3>
                
                <div className="flex gap-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <span className="inline-flex items-center gap-2 text-xs font-mono bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-white border border-white/20">
                    <Play className="w-3 h-3" /> Explore Project
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator for desktop */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-4 text-white/30 font-mono text-xs uppercase tracking-widest pointer-events-none pb-4">
        <span>← Drag to explore →</span>
      </div>
    </div>
  );
}
