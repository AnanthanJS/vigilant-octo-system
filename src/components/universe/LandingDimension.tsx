'use client';

import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

const Background = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Creates an Interstellar-inspired grid that moves slightly based on scroll
  const scroll = useScroll();

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Subtle rotation for atmospheric depth
      groupRef.current.rotation.y += delta * 0.05;
      // Scroll-based parallax
      groupRef.current.position.z = scroll.offset * 20;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Deep perspective grid lines */}
      <gridHelper args={[50, 50, '#3d2050', '#1a1025']} position={[0, -2, 0]} />
      <gridHelper args={[50, 50, '#3d2050', '#1a1025']} position={[0, 5, 0]} rotation={[Math.PI, 0, 0]} />
    </group>
  );
};

const Content = ({ onEnterMind }: { onEnterMind: () => void }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-8 flex flex-col justify-center h-full relative pointer-events-none">
      
      <div className="absolute top-12 left-8">
        <h1 className="text-xl font-mono tracking-[0.5em] text-soft-amber opacity-80 uppercase">
          Visakh P S
        </h1>
      </div>

      <div className="z-10 mt-16 max-w-4xl pointer-events-auto">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-pure-white leading-tight drop-shadow-2xl">
          Transforming Ideas Into Visual Experiences
        </h2>
        
        {/* Layered Titles */}
        <div className="mt-12 flex flex-col gap-4 font-mono text-sm md:text-lg tracking-widest text-pure-white/70">
          <div className="transform translate-x-0 opacity-100 transition-all duration-1000">
            [ GRAPHIC DESIGNER ]
          </div>
          <div className="transform translate-x-8 opacity-80 transition-all duration-1000 delay-100">
            [ VISUAL STORYTELLER ]
          </div>
          <div className="transform translate-x-16 opacity-60 transition-all duration-1000 delay-200">
            [ VFX ENTHUSIAST ]
          </div>
        </div>

        <div className="mt-20">
          <button 
            onClick={onEnterMind}
            className="group relative inline-flex items-center gap-4 px-8 py-4 border border-cosmic-violet hover:border-soft-amber bg-space-black/50 backdrop-blur-md transition-colors overflow-hidden"
          >
            <div className="absolute inset-0 bg-cosmic-violet/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            <span className="relative z-10 font-mono text-xs tracking-[0.2em] uppercase text-soft-amber">Enter The Creative Mind</span>
            <span className="relative z-10 text-cosmic-violet group-hover:text-soft-amber transition-colors">→</span>
          </button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 opacity-50 animate-pulse">
        <span className="font-mono text-[10px] tracking-widest uppercase">Descend</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-soft-amber to-transparent" />
      </div>

    </div>
  );
};

const LandingDimension = { Background, Content };
export default LandingDimension;
