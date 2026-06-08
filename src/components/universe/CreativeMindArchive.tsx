'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Image } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

const MemoryCloud = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Generate placeholders for memories
  const memoriesCount = 40;
  const memories = useMemo(() => {
    return Array.from({ length: memoriesCount }).map((_, i) => {
      const radius = 5 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      return {
        position: [x, y, z] as [number, number, number],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
        scale: 0.5 + Math.random() * 1.5,
        color: i % 2 === 0 ? '#d4a373' : '#3d2050' // Alternate colors for variety
      };
    });
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {memories.map((mem, i) => (
        <group key={i} position={mem.position} rotation={mem.rotation}>
          <mesh>
            <planeGeometry args={[1.6 * mem.scale, 0.9 * mem.scale]} />
            <meshBasicMaterial color={mem.color} side={THREE.DoubleSide} transparent opacity={0.6} />
          </mesh>
          {/* A glowing border */}
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[1.65 * mem.scale, 0.95 * mem.scale]} />
            <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.2} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export default function CreativeMindArchive({ onClose }: { onClose: () => void }) {
  return (
    <div className="w-full h-full relative">
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 z-50 text-pure-white font-mono text-xs tracking-widest hover:text-soft-amber transition-colors border border-white/20 px-4 py-2 bg-space-black/50 backdrop-blur-md"
      >
        [ EXIT ARCHIVE ]
      </button>

      <div className="absolute top-8 left-8 z-10 pointer-events-none">
        <h2 className="text-2xl font-serif text-pure-white mb-2">Memory Archive</h2>
        <p className="font-mono text-[10px] tracking-widest text-cosmic-violet uppercase">
          Drag to orbit • Scroll to zoom
        </p>
      </div>

      <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
        <color attach="background" args={['#030305']} />
        <fog attach="fog" args={['#030305', 5, 25]} />
        
        <MemoryCloud />
        
        {/* The user starts zoomed close (z=2) and orbits or zooms out to see the cloud */}
        <OrbitControls 
          autoRotate 
          autoRotateSpeed={0.5} 
          enableDamping 
          dampingFactor={0.05} 
          minDistance={1} 
          maxDistance={30}
        />
      </Canvas>
      
      {/* Cinematic overlay vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#030305_100%)] opacity-80" />
    </div>
  );
}
