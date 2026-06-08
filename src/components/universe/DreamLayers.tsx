'use client';

import { useState } from 'react';

// Inspired by Inception - peeling back layers of thought
export default function DreamLayers() {
  const [activeLayer, setActiveLayer] = useState(0);
  
  const layers = [
    { id: 1, name: "Poster", desc: "The final visual artifact presented to the audience.", depth: "Layer 1" },
    { id: 2, name: "Execution", desc: "The technical rendering, color grading, and composition.", depth: "Layer 2" },
    { id: 3, name: "Concept", desc: "The initial sketches and wireframing of ideas.", depth: "Layer 3" },
    { id: 4, name: "Research", desc: "Understanding the competitor landscape and market gaps.", depth: "Layer 4" },
    { id: 5, name: "Psychology", desc: "The core human trigger driving the design's intent.", depth: "The Limbo" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-8 relative pointer-events-auto h-full flex flex-col justify-center">
      <div className="mb-16">
        <h2 className="text-sm font-mono tracking-[0.5em] text-cosmic-violet uppercase mb-4">Dream Architecture</h2>
        <h3 className="text-4xl md:text-5xl font-serif text-pure-white">Unfolding The Process</h3>
        <p className="text-pure-white/50 text-sm mt-4 font-mono">Most portfolios show the surface. We go deeper.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-12 items-center">
        {/* Layer Controls */}
        <div className="w-full md:w-1/3 space-y-4">
          {layers.map((layer, index) => (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(index)}
              className={`w-full text-left p-4 border transition-all duration-500 flex justify-between items-center ${
                activeLayer === index 
                  ? 'border-soft-amber bg-soft-amber/10 text-pure-white' 
                  : 'border-deep-indigo text-pure-white/40 hover:border-cosmic-violet/50'
              }`}
            >
              <span className="font-serif text-xl">{layer.name}</span>
              <span className="font-mono text-[10px] tracking-widest uppercase text-soft-amber">{layer.depth}</span>
            </button>
          ))}
        </div>

        {/* The Visual Representation */}
        <div className="w-full md:w-2/3 h-96 relative perspective-1000">
          <div className="absolute inset-0 flex items-center justify-center transform-style-3d">
            {layers.map((layer, index) => {
              // Calculate 3D offset based on active layer
              const offset = index - activeLayer;
              const zIndex = 50 - Math.abs(offset);
              const opacity = offset > 0 ? 0 : 1 - Math.abs(offset) * 0.2;
              const scale = 1 - Math.abs(offset) * 0.1;
              const translateY = offset * 20;
              const translateZ = offset * -100;
              
              if (opacity <= 0) return null;

              return (
                <div 
                  key={layer.id}
                  className="absolute w-full max-w-md aspect-video border border-cosmic-violet bg-space-black/90 backdrop-blur-md p-8 flex flex-col justify-center items-center text-center transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-2xl"
                  style={{
                    zIndex,
                    opacity,
                    transform: `translate3d(0, ${translateY}px, ${translateZ}px) scale(${scale})`
                  }}
                >
                  <div className="text-soft-amber font-mono text-xs tracking-[0.3em] uppercase mb-4">{layer.depth}</div>
                  <h4 className="text-3xl font-serif text-pure-white mb-4">{layer.name}</h4>
                  <p className="text-pure-white/70 text-sm leading-relaxed">{layer.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
