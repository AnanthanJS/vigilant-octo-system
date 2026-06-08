'use client';

import { useState, useCallback } from 'react';

export const useCinematicAudio = () => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [volume, setVolume] = useState(0.5);

  // Stub functions for future audio integration
  const playHoverSound = useCallback(() => {
    if (!isAudioEnabled) return;
    // console.log('Playing low rumbling bass hover sound...');
  }, [isAudioEnabled]);

  const playTransitionSound = useCallback(() => {
    if (!isAudioEnabled) return;
    // console.log('Playing dimension transition whoosh sound...');
  }, [isAudioEnabled]);

  const playBlipSound = useCallback(() => {
    if (!isAudioEnabled) return;
    // console.log('Playing UI blip sound...');
  }, [isAudioEnabled]);

  const toggleAudio = useCallback(() => {
    setIsAudioEnabled(prev => !prev);
  }, []);

  return {
    isAudioEnabled,
    volume,
    setVolume,
    toggleAudio,
    playHoverSound,
    playTransitionSound,
    playBlipSound
  };
};
