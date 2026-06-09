'use client';

import { GalleryProject } from '@/lib/gallery-data';
import Image from 'next/image';
import { Download, Cpu, Monitor, FileCode2, Clock } from 'lucide-react';

interface TechnicalViewProps {
  projects: GalleryProject[];
  onProjectClick: (project: GalleryProject) => void;
}

export default function TechnicalView({ projects, onProjectClick }: TechnicalViewProps) {
  return (
    <div className="w-full flex flex-col gap-12 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
      {projects.map((project, index) => (
        <div key={project.id} className="group relative bg-space-void border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          
          {/* Image Section */}
          <div 
            className="w-full md:w-5/12 h-[300px] md:h-auto relative overflow-hidden cursor-pointer"
            onClick={() => onProjectClick(project)}
          >
            {((project.videoUrl || project.thumbnailUrl) || '').endsWith('.mp4') ? (
               <video
                  src={project.videoUrl || project.thumbnailUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
            ) : (
              <Image 
                src={project.thumbnailUrl} 
                alt={project.title} 
                fill 
                className="object-cover"
                unoptimized
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-space-black/80 to-transparent" />
            <div className="absolute top-6 left-6">
              <span className="font-mono text-xs text-soft-amber border border-soft-amber/50 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-widest">
                {project.category}
              </span>
            </div>
            
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-3xl font-serif text-white mb-2">{project.title}</h3>
              <p className="font-mono text-sm text-white/50">{project.client}</p>
            </div>
          </div>

          {/* Technical Data Section */}
          <div className="flex-1 p-8 md:p-12 bg-space-black flex flex-col justify-center">
            
            <div className="mb-8">
              <h4 className="font-mono text-xs text-cosmic-violet uppercase tracking-widest mb-4">Project Overview</h4>
              <p className="text-white/70 font-sans leading-relaxed text-sm md:text-base">
                {project.description}
              </p>
            </div>

            {project.technicalStats && (
              <>
                <h4 className="font-mono text-xs text-cosmic-violet uppercase tracking-widest mb-4">Technical Specifications</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col gap-2">
                    <Clock className="w-4 h-4 text-soft-amber" />
                    <span className="text-[10px] text-white/50 font-mono uppercase">Render Time</span>
                    <span className="text-sm font-sans text-white">{project.technicalStats.renderTime}</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col gap-2">
                    <Monitor className="w-4 h-4 text-soft-amber" />
                    <span className="text-[10px] text-white/50 font-mono uppercase">Resolution</span>
                    <span className="text-sm font-sans text-white">{project.technicalStats.resolution}</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col gap-2">
                    <Cpu className="w-4 h-4 text-soft-amber" />
                    <span className="text-[10px] text-white/50 font-mono uppercase">Node Count</span>
                    <span className="text-sm font-sans text-white">{project.technicalStats.nodes}</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col gap-2">
                    <FileCode2 className="w-4 h-4 text-soft-amber" />
                    <span className="text-[10px] text-white/50 font-mono uppercase">Software</span>
                    <div className="flex flex-wrap gap-1">
                      {project.technicalStats.software.slice(0, 2).map(sw => (
                        <span key={sw} className="text-xs font-sans text-white">{sw}</span>
                      ))}
                      {project.technicalStats.software.length > 2 && <span className="text-xs text-white/50">+{project.technicalStats.software.length - 2}</span>}
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="pt-6 border-t border-white/10 flex gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-cosmic-violet hover:bg-cosmic-violet/80 text-white font-mono text-xs uppercase tracking-widest rounded transition-colors">
                <Download className="w-4 h-4" /> Pipeline Notes (PDF)
              </button>
            </div>
            
          </div>
        </div>
      ))}
    </div>
  );
}
