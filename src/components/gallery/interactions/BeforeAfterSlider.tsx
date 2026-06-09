'use client';

import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react';
import Image from 'next/image';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

export default function BeforeAfterSlider({ beforeImage, afterImage }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', () => setIsDragging(false));
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', () => setIsDragging(false));
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', () => setIsDragging(false));
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', () => setIsDragging(false));
    };
  }, [isDragging]);

  return (
    <div 
      className="relative w-full h-[400px] md:h-[600px] rounded-xl overflow-hidden cursor-ew-resize select-none"
      ref={containerRef}
      onMouseDown={(e: ReactMouseEvent) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e: ReactTouchEvent) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        <Image 
          src={afterImage} 
          alt="Final Render" 
          fill 
          className="object-cover" 
          unoptimized
        />
        <div className="absolute bottom-4 right-4 bg-space-black/70 px-3 py-1 rounded-md text-xs font-mono text-soft-amber border border-cosmic-violet/50 backdrop-blur-md z-10">
          FINAL
        </div>
      </div>

      {/* Before Image (Foreground, Clipped) */}
      <div 
        className="absolute inset-0 z-10"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        {/* We use a CSS filter on the same image for demonstration purposes if they are the same, or real before image */}
        <Image 
          src={beforeImage} 
          alt="Raw Render" 
          fill 
          className="object-cover grayscale brightness-75" 
          unoptimized
        />
        <div className="absolute bottom-4 left-4 bg-space-black/70 px-3 py-1 rounded-md text-xs font-mono text-pure-white/70 border border-pure-white/20 backdrop-blur-md z-10">
          RAW
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 z-20 w-1 bg-soft-amber cursor-ew-resize"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-space-black border-2 border-soft-amber rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(212,163,115,0.5)]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-soft-amber">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-soft-amber -ml-2 rotate-180">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
}
