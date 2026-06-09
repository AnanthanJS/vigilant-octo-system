'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Environment, Html, Sparkles, Line } from '@react-three/drei';
import { useRef, useState, useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { GalleryProject, ProjectCategory } from '@/lib/gallery-data';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

interface TesseractViewProps {
  projects: GalleryProject[];
  onProjectClick: (project: GalleryProject) => void;
  activeCategory: ProjectCategory | 'All';
  isModalOpen?: boolean;
}

import { Image as DreiImage } from '@react-three/drei';

const ProjectBook = ({ position, rotation, project, onHover, onHoverEnd, onClick, isModalOpen }: any) => {
  const [open, setOpen] = useState(false);
  
  const imgSource = (project.thumbnailUrl || '').endsWith('.mp4') ? (project.finalImageUrl || '/memories/product cover.jpeg') : project.thumbnailUrl;
  
  return (
    <group 
      position={position} 
      rotation={rotation}
      onPointerEnter={(e) => { 
        e.stopPropagation(); 
        setOpen(true); 
        onHover(project);
        document.body.style.cursor = 'pointer'; 
      }}
      onPointerLeave={(e) => { 
        e.stopPropagation(); 
        setOpen(false); 
        onHoverEnd();
        document.body.style.cursor = 'auto'; 
      }}
      onPointerDown={(e) => {
        // Use pointerDown instead of click to bypass OrbitControls interference sometimes
        e.stopPropagation();
        onClick(project);
      }}
    >
      <DreiImage 
        url={imgSource} 
        scale={open ? [0.8, 0.45] : [0.6, 0.33]} 
        transparent
        opacity={open ? 1 : 0.7}
      />
      
      {/* Floating title beneath the image when hovered */}
      {open && (
        <Text
          position={[0, -0.35, 0.1]}
          fontSize={0.06}
          color="#00d4ff"
          anchorX="center"
          anchorY="middle"
        >
          {project.title}
        </Text>
      )}
    </group>
  );
};

const Bookshelf = ({ position, rotation, category, projects, onHover, onClick, isModalOpen }: any) => {
  const shelfRef = useRef<THREE.Group>(null);
  
  return (
    <group ref={shelfRef} position={position} rotation={rotation}>
      {/* Wooden shelf frame */}
      <mesh position={[0, -0.35, 0]}>
        <boxGeometry args={[3.2, 0.05, 0.8]} />
        <meshStandardMaterial color="#2d1b2e" metalness={0.2} roughness={0.8} />
      </mesh>
      
      {/* Shelf backing */}
      <mesh position={[0, 0, -0.35]}>
        <boxGeometry args={[3.2, 0.7, 0.05]} />
        <meshStandardMaterial color="#1a0a1f" emissive="#0a0510" />
      </mesh>
      
      {/* Books */}
      {projects.map((proj: any, index: number) => {
        // Distribute our few projects randomly across the shelf, or loop them
        const actualProj = projects[index % projects.length];
        return (
          <ProjectBook
            key={`${actualProj.id}-${index}`}
            position={[-1.2 + (index * 0.48), 0, 0]}
            rotation={[0, (index * 0.1) - 0.25, 0]}
            project={actualProj}
            onHover={onHover}
            onHoverEnd={() => onHover(null)}
            onClick={onClick}
            isModalOpen={isModalOpen}
          />
        );
      })}
      
    </group>
  );
};

export const TesseractLibrary3D = ({ projects, onHover, onClick, activeCategory, isModalOpen }: any) => {
  const tesseractRef = useRef<THREE.Group>(null);
  
  const cells = useMemo(() => {
    // 8 points of a hypercube projection (compacted to reduce empty space)
    const positions = [
      [-2, -2, -2], [ 2, -2, -2], [ 2, -2,  2], [-2, -2,  2], // bottom outer
      [-2,  2, -2], [ 2,  2, -2], [ 2,  2,  2], [-2,  2,  2], // top outer
    ];
    
    // Inner cube projection
    const innerPositions = positions.map(p => p.map(v => v * 0.35));
    const allPositions = [...positions, ...innerPositions];
    
    const cellsArr = allPositions.map((pos, idx) => ({
      position: pos as [number, number, number],
      category: '',
      projects: [] as GalleryProject[],
      scale: idx < 8 ? 1 : 0.5
    }));

    // Distribute actual projects exactly once across the 16 cells
    projects.forEach((proj: GalleryProject, i: number) => {
      const cellIndex = i % 16;
      cellsArr[cellIndex].category = proj.category;
      cellsArr[cellIndex].projects.push(proj);
    });

    // Assign fallback categories for empty cells (for aesthetic purposes)
    const fallbackCats = ['Archive', 'System Core', 'Memory Bank', 'Unallocated Data'];
    cellsArr.forEach((cell, i) => {
      if (!cell.category) cell.category = fallbackCats[i % fallbackCats.length];
    });
    
    return cellsArr;
  }, [projects]);
  
  useFrame(({ clock }) => {
    if (tesseractRef.current) {
      if (activeCategory === 'All') {
        tesseractRef.current.rotation.y = clock.getElapsedTime() * 0.03;
        tesseractRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.02) * 0.05;
      } else {
        // Stop rotating or slow down significantly when filtering
        tesseractRef.current.rotation.y += 0.0005;
      }
    }
  });
  
  return (
    <group ref={tesseractRef}>
      <fog attach="fog" args={['#030305', 3, 25]} />
      
      {/* Connecting lines of the Tesseract */}
      {cells.map((cell, idx) => (
        <React.Fragment key={idx}>
          {cells.map((otherCell, otherIdx) => {
            if (idx >= otherIdx) return null;
            const distance = Math.hypot(
              cell.position[0] - otherCell.position[0],
              cell.position[1] - otherCell.position[1],
              cell.position[2] - otherCell.position[2]
            );
            if (distance < 5 && distance > 0.1) {
              const linePoints = [cell.position, otherCell.position] as [number, number, number][];
              return (
                <Line 
                  key={`line-${idx}-${otherIdx}`} 
                  points={linePoints}
                  color="#9d4edd" 
                  opacity={0.15} 
                  transparent 
                  lineWidth={1}
                />
              );
            }
            return null;
          })}
        </React.Fragment>
      ))}
      
      {/* 16 Cells containing exactly one shelf to prevent media duplication */}
      {cells.map((cell, idx) => {
        // Only render if active Category
        if (activeCategory !== 'All' && cell.category !== activeCategory) return null;

        return (
          <group key={idx} position={cell.position} scale={[cell.scale, cell.scale, cell.scale]}>
            {/* Draw a single center shelf for the projects to sit on */}
            <Bookshelf
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              category={cell.category}
              projects={cell.projects}
              onHover={onHover}
              onClick={onClick}
              isModalOpen={isModalOpen}
            />
          </group>
        );
      })}
      
      {/* The "Bulk" - central ethereal light source */}
      <pointLight position={[0, 0, 0]} intensity={3} color="#9d4edd" distance={30} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#d4a373" distance={20} />
    </group>
  );
};

export default function TesseractView({ projects, onProjectClick, activeCategory, isModalOpen }: TesseractViewProps) {
  const [hoveredProject, setHoveredProject] = useState<GalleryProject | null>(null);
  
  return (
    <div className="relative w-full h-[75vh] min-h-[600px] bg-space-black rounded-xl overflow-hidden border border-white/5">
      <Canvas
        camera={{ position: [0, 1, 7], fov: 55 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#030305']} />
        
        <ambientLight intensity={0.2} />
        
        <Sparkles count={1500} scale={30} size={0.1} color="#ffffff" opacity={0.3} speed={0.2} />
        
        <Suspense fallback={null}>
          <TesseractLibrary3D 
            projects={projects}
            onHover={setHoveredProject}
            onClick={onProjectClick}
            activeCategory={activeCategory}
            isModalOpen={isModalOpen}
          />
        </Suspense>
        
        <Environment preset="night" />
        
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          autoRotate={false}
          minDistance={2}
          maxDistance={15}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>

      {/* Target Acquired HUD */}
      {hoveredProject && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute bottom-8 right-8 z-30 bg-black/80 backdrop-blur-md px-6 py-4 rounded-xl border border-cosmic-violet pointer-events-none shadow-[0_0_30px_rgba(157,78,221,0.3)]"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-soft-amber animate-pulse" />
            <p className="text-cosmic-violet text-[10px] uppercase font-mono tracking-widest">Target Acquired</p>
          </div>
          <p className="text-white text-lg font-serif">{hoveredProject.title}</p>
          <p className="text-white/50 text-xs font-mono uppercase tracking-widest mt-1">{hoveredProject.category}</p>
        </motion.div>
      )}

      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-center bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10">
        <p className="text-soft-amber text-[10px] font-mono tracking-[0.2em] uppercase">
          Drag to Explore • Scroll to Dive Deeper • Click Book to Open
        </p>
      </div>
    </div>
  );
}
