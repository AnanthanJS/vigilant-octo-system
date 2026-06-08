'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';

// Interstellar-style Star Map for Skills
const Galaxy = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Generate a galaxy spiral of particles
  const particlesCount = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const radius = Math.random() * 15;
      const angle = radius * 0.5 + Math.random() * Math.PI * 2;
      
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2; // slight vertical spread
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group position={[position[0], position[1] - 1.5, position[2]]} rotation={[0.2, 0, 0]}>
      <group ref={groupRef}>
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          </bufferGeometry>
          <pointsMaterial size={0.05} color="#d4a373" transparent opacity={0.4} sizeAttenuation />
        </points>

        {/* Primary Skill Nodes in the Galaxy */}
        <SkillNode position={[3, 0.5, 2]} name="Photoshop" color="#00d4ff" />
        <SkillNode position={[-2, -0.5, 4]} name="Illustrator" color="#ff6b35" />
        <SkillNode position={[-4, 1, -2]} name="Premiere Pro" color="#9b59b6" />
        <SkillNode position={[5, -1, -3]} name="Canva" color="#00e5c3" />
        <SkillNode position={[0, 2, 0]} name="Branding" color="#d4a373" />
        <SkillNode position={[2, -2, -1]} name="Marketing" color="#ffffff" />
        
        {/* Connecting Constellation Lines */}
        <line>
          <bufferGeometry attach="geometry" />
          <lineBasicMaterial attach="material" color="#d4a373" opacity={0.2} transparent />
        </line>
      </group>
    </group>
  );
};

const SkillNode = ({ position, name, color }: any) => {
  return (
    <group position={position}>
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        <mesh>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color={color} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.2} />
        </mesh>
        <Text position={[0, -0.5, 0]} fontSize={0.4} color="white" anchorX="center" anchorY="middle">
          {name}
        </Text>
      </Billboard>
    </group>
  );
}

const Content = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-8 relative pointer-events-none min-h-[90vh] md:min-h-[80vh] flex flex-col justify-between pt-12 md:pt-0 pb-24">
      <div>
        <h2 className="text-sm font-mono tracking-[0.5em] text-cosmic-violet uppercase mb-4">Constellation Mapping</h2>
        <h3 className="text-4xl md:text-5xl font-serif text-pure-white">Skills Matrix</h3>
      </div>
      
      <div className="self-end text-right">
        <p className="font-mono text-xs tracking-widest text-pure-white/50">
          [ INTERACTIVE 3D GALAXY ]<br/>
          DRAG TO ROTATE
        </p>
      </div>
    </div>
  );
};

const SkillConstellation = { Galaxy, Content };
export default SkillConstellation;
