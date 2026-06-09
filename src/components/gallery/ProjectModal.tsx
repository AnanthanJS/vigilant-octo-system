'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryProject } from '@/lib/gallery-data';
import { X, Info } from 'lucide-react';

interface ProjectModalProps {
  project: GalleryProject | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {

  // Reset tab when project changes
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-7xl h-[90vh] bg-space-void border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-white/10 bg-space-black shrink-0">
            <div>
              <h3 className="text-2xl font-serif text-white">{project.title}</h3>
              <p className="font-mono text-xs text-soft-amber mt-2 uppercase tracking-widest">{project.category} // {project.client}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Content Container */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            
            {/* Interactive Area */}
            <div className="flex-1 bg-black/50 p-4 md:p-8 flex items-center justify-center relative overflow-y-auto lg:overflow-hidden">
              <div className="w-full h-full flex flex-col items-center justify-center max-h-full">
                {((project.videoUrl || project.thumbnailUrl) || '').endsWith('.mp4') ? (
                  <video 
                    src={project.videoUrl || project.thumbnailUrl} 
                    autoPlay 
                    controls
                    loop 
                    playsInline
                    className="w-full max-h-[70vh] lg:h-full object-contain rounded-lg"
                  />
                ) : (
                  <img 
                    src={project.finalImageUrl || project.thumbnailUrl}
                    alt={project.title}
                    className="w-full max-h-[70vh] lg:h-full object-contain rounded-lg"
                  />
                )}
              </div>
            </div>

            {/* Sidebar Controls */}
            <div className="w-full lg:w-96 bg-space-black p-6 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col gap-8 overflow-y-auto shrink-0">
              
              <div>
                <h4 className="flex items-center gap-2 font-mono text-xs text-soft-amber uppercase mb-4 tracking-widest"><Info className="w-4 h-4" /> Project Info</h4>
                <p className="text-sm text-white/70 leading-relaxed font-sans">
                  {project.description}
                </p>
              </div>

              {project.technicalStats && (
                <div className="mt-auto">
                   <h4 className="flex items-center gap-2 font-mono text-xs text-soft-amber uppercase mb-4 tracking-widest">Tech Specs</h4>
                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <span className="block text-[10px] text-white/50 font-mono uppercase">Render Time</span>
                       <span className="text-sm text-white">{project.technicalStats.renderTime}</span>
                     </div>
                     <div>
                       <span className="block text-[10px] text-white/50 font-mono uppercase">Resolution</span>
                       <span className="text-sm text-white">{project.technicalStats.resolution}</span>
                     </div>
                   </div>
                </div>
              )}

            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
