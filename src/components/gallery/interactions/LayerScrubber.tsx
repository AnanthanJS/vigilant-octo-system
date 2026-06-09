'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Layer {
  name: string;
  imageUrl: string;
}

interface LayerScrubberProps {
  layers: Layer[];
}

export default function LayerScrubber({ layers }: LayerScrubberProps) {
  const [activeLayerIndex, setActiveLayerIndex] = useState(layers.length - 1);

  if (!layers || layers.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="relative w-full h-[300px] md:h-[500px] rounded-xl overflow-hidden border border-white/10 bg-space-void">
        {layers.map((layer, index) => (
          <div
            key={layer.name}
            className={`absolute inset-0 transition-opacity duration-300 ${
              index === activeLayerIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* For demonstration, we use CSS filters to visually distinguish "passes" since the user's images might be the same mockup */}
            <Image 
              src={layer.imageUrl} 
              alt={layer.name} 
              fill 
              className={`object-cover ${index === 0 ? 'saturate-0 brightness-150' : index === 1 ? 'saturate-200 contrast-150' : index === 2 ? 'grayscale contrast-200' : ''}`}
              unoptimized
            />
            <div className="absolute top-4 left-4 bg-space-black/80 px-4 py-2 rounded-lg border border-cosmic-violet/50 backdrop-blur-md">
              <span className="font-mono text-sm text-soft-amber uppercase tracking-widest">{layer.name}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full bg-space-black/50 p-4 rounded-xl border border-white/5 backdrop-blur-sm flex flex-col gap-2">
        <div className="flex justify-between font-mono text-[10px] uppercase text-white/50 tracking-widest">
          <span>Raw</span>
          <span>Final Comp</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max={layers.length - 1} 
          step="1"
          value={activeLayerIndex}
          onChange={(e) => setActiveLayerIndex(parseInt(e.target.value))}
          className="w-full h-2 bg-space-void rounded-lg appearance-none cursor-pointer accent-soft-amber border border-white/10"
        />
        <div className="flex justify-between mt-2">
          {layers.map((layer, index) => (
            <button
              key={layer.name}
              onClick={() => setActiveLayerIndex(index)}
              className={`text-xs font-mono tracking-wider transition-colors px-2 py-1 rounded ${
                index === activeLayerIndex 
                  ? 'text-soft-amber bg-soft-amber/10' 
                  : 'text-white/40 hover:text-white/80'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
