'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Image, useVideoTexture } from '@react-three/drei';
import { useRef, useMemo, useState } from 'react';
import * as THREE from 'three';

const mediaFiles = [
  { url: '/memories/Business-Card-Mockup-1.jpg', type: 'image' },
  { url: '/memories/Captain A mockup.png', type: 'image' },
  { url: '/memories/Logo mockup2.jpeg', type: 'image' },
  { url: '/memories/Magzine cover mockup.jpeg', type: 'image' },
  { url: '/memories/flyer.jpeg', type: 'image' },
  { url: '/memories/product cover.jpeg', type: 'image' },
  { url: '/memories/Sequence 06_1.mp4', type: 'video' },
];

const VideoMemory = ({ url, scale }: { url: string, scale: [number, number] }) => {
  const texture = useVideoTexture(url, { start: true, loop: true, muted: true });
  return (
    <mesh>
      <planeGeometry args={scale} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} transparent opacity={0.8} toneMapped={false} />
    </mesh>
  );
};

const MemoryCloud = ({ onSelect }: { onSelect: (media: any) => void }) => {
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
        color: i % 2 === 0 ? '#d4a373' : '#3d2050', // Alternate colors for variety
        url: mediaFiles[i % mediaFiles.length].url,
        type: mediaFiles[i % mediaFiles.length].type
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
        <group 
          key={i} 
          position={mem.position} 
          rotation={mem.rotation}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(mem);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'auto';
          }}
        >
          {mem.type === 'video' ? (
            <VideoMemory url={mem.url} scale={[1.6 * mem.scale, 0.9 * mem.scale]} />
          ) : (
            <Image 
              url={mem.url} 
              scale={[1.6 * mem.scale, 0.9 * mem.scale]} 
              transparent 
              opacity={0.8} 
              side={THREE.DoubleSide} 
            />
          )}
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
  const [selectedMedia, setSelectedMedia] = useState<{url: string, type: string} | null>(null);

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
        
        <MemoryCloud onSelect={setSelectedMedia} />
        
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
      
      {/* Lightbox / Selected Media Overlay */}
      {selectedMedia && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-12 cursor-pointer"
          onClick={() => setSelectedMedia(null)}
        >
          <div className="relative max-w-7xl max-h-full w-full h-full flex flex-col items-center justify-center">
            <button 
              className="absolute top-4 right-4 z-[110] text-pure-white font-mono text-sm tracking-widest border border-white/20 px-4 py-2 hover:text-soft-amber hover:border-soft-amber transition-colors bg-space-black/50"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedMedia(null);
              }}
            >
              [ CLOSE ]
            </button>
            
            {selectedMedia.type === 'video' ? (
              <video 
                src={selectedMedia.url} 
                controls 
                autoPlay 
                className="max-w-full max-h-[85vh] object-contain shadow-2xl border border-white/10"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <img 
                src={selectedMedia.url} 
                alt="Memory" 
                className="max-w-full max-h-[85vh] object-contain shadow-2xl border border-white/10"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
