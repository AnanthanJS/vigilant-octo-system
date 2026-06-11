'use client';

import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Environment, Stars } from '@react-three/drei';

// Import our dimensions
import LandingDimension from './LandingDimension';
import IdentityChamber from './IdentityChamber';
import CreativeTimeline from './CreativeTimeline';
import DreamLayers from './DreamLayers';
import DesignLab from './DesignLab';
import StoryEngine from './StoryEngine';
import SkillConstellation from './SkillConstellation';
import FutureDimension from './FutureDimension';
import ContactPortal from './ContactPortal';

// The memory archive modal feature removed in favor of /gallery page

// Helper to align 3D elements with HTML sections
import { useThree } from '@react-three/fiber';

const Universe3D = () => {
  const { viewport } = useThree();
  // We have 120vh per section (100vh + 20vh gap)
  // Section 1 (Hero) is at 0
  // Section 4 (Skills) is index 3. 3 * 1.2 = 3.6
  return (
    <Scroll>
      <LandingDimension.Background position={[0, 0, 0]} />
      <SkillConstellation.Galaxy position={[0, -viewport.height * 3.6, 0]} />
    </Scroll>
  );
};

export default function CreativeUniverse() {
  return (
    <div className="w-full h-dvh bg-space-black overflow-hidden relative">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 2]}>
        <color attach="background" args={['#030305']} />
        <fog attach="fog" args={['#030305', 10, 30]} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} color="#d4a373" />
        <directionalLight position={[-10, 5, -5]} intensity={0.5} color="#3d2050" />
        
        {/* Deep space background */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0.5} fade speed={1} />
        
        <Suspense fallback={null}>
          <ScrollControls pages={12} damping={0.2}>
            
            {/* --- 3D WebGL LAYER (Moves in 3D space as you scroll) --- */}
            <Universe3D />

            {/* --- HTML OVERLAY LAYER (Tied to scroll progress) --- */}
            <Scroll html style={{ width: '100%' }}>
              <div className="flex flex-col gap-[20dvh] pb-[20dvh] w-full text-pure-white">
                
                {/* 1. Landing Dimension (Hero) */}
                <section className="min-h-dvh w-full flex items-center justify-center relative">
                  <LandingDimension.Content />
                </section>

                {/* 2. Identity Chamber (Arrival) */}
                <section className="min-h-dvh w-full flex items-center justify-center">
                  <IdentityChamber />
                </section>

                {/* 3. Creative Timeline (Interstellar) */}
                <section className="min-h-dvh w-full flex items-center justify-center">
                  <CreativeTimeline />
                </section>

                {/* 4. Skill Constellation */}
                <section className="min-h-dvh w-full flex items-center justify-center">
                  <SkillConstellation.Content />
                </section>

                {/* 5. Dream Layers (Inception) */}
                <section className="min-h-dvh w-full flex items-center justify-center">
                  <DreamLayers />
                </section>

                {/* 6. The Design Lab (Doctor Strange) */}
                <section className="min-h-dvh w-full flex items-center justify-center">
                  <DesignLab />
                </section>

                {/* 7. The Story Engine */}
                <section className="min-h-dvh w-full flex items-center justify-center">
                  <StoryEngine />
                </section>

                {/* 8. Future Dimension (2001) */}
                <section className="h-dvh w-full flex items-center justify-center">
                  <FutureDimension />
                </section>

                {/* 9. Contact Portal */}
                <section className="min-h-dvh w-full flex items-center justify-center">
                  <ContactPortal />
                </section>

              </div>
            </Scroll>

          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
