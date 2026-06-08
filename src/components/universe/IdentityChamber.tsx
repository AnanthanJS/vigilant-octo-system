'use client';

import { useState } from 'react';

// Inspired by Arrival - Circular Non-linear Exploration
export default function IdentityChamber() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const nodes = [
    { id: 'designer', title: 'Designer', text: 'Crafting premium aesthetics with Photoshop & Illustrator.' },
    { id: 'marketer', title: 'Marketer', text: 'Understanding customer psychology and revenue drivers.' },
    { id: 'storyteller', title: 'Storyteller', text: 'Creating narratives through motion and Premiere Pro.' },
    { id: 'learner', title: 'Learner', text: 'Continuously expanding into VFX and 3D dimensions.' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-8 relative pointer-events-auto h-full flex flex-col items-center justify-center">
      
      <div className="text-center mb-16">
        <h2 className="text-sm font-mono tracking-[0.5em] text-cosmic-violet uppercase mb-4">Identity Chamber</h2>
        <h3 className="text-4xl md:text-5xl font-serif text-pure-white">Multi-Dimensional Creator</h3>
      </div>

      <div className="relative w-full max-w-2xl aspect-square flex items-center justify-center transform scale-75 sm:scale-100">
        {/* Arrival-inspired circular UI */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-spin-slow opacity-20">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#3d2050" strokeWidth="0.5" strokeDasharray="4 2" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="#d4a373" strokeWidth="0.2" />
          <circle cx="50" cy="50" r="25" fill="none" stroke="#1a1025" strokeWidth="2" />
        </svg>

        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {nodes.map((node, i) => {
            const angle = (i * Math.PI * 2) / nodes.length - Math.PI / 2;
            const x = Math.cos(angle) * 150;
            const y = Math.sin(angle) * 150;
            
            return (
              <div 
                key={node.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${activeNode === node.id ? 'z-30' : 'z-20'}`}
                style={{ 
                  left: `calc(50% + ${x}px)`, 
                  top: `calc(50% + ${y}px)` 
                }}
              >
                <button
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                  className={`w-24 h-24 rounded-full border flex items-center justify-center font-mono text-xs tracking-widest transition-all duration-300 backdrop-blur-sm ${
                    activeNode === node.id 
                      ? 'border-soft-amber bg-soft-amber/10 text-soft-amber scale-110 shadow-[0_0_30px_rgba(212,163,115,0.3)]' 
                      : 'border-cosmic-violet/50 bg-space-black/80 text-pure-white/70 hover:border-cosmic-violet'
                  }`}
                >
                  {node.title}
                </button>
              </div>
            );
          })}

          {/* Central display area */}
          <div className="absolute z-10 w-64 h-64 rounded-full flex items-center justify-center text-center p-8 border border-deep-indigo bg-space-black/90 shadow-2xl backdrop-blur-xl transition-all duration-500">
            {activeNode ? (
              <p className="font-serif text-lg text-pure-white leading-relaxed animate-fade-in">
                {nodes.find(n => n.id === activeNode)?.text}
              </p>
            ) : (
              <p className="font-mono text-xs tracking-widest text-cosmic-violet opacity-50 uppercase">
                Hover to explore<br/>the identity
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
