/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { CosmicCanvas } from './scenes/CosmicCanvas';
import { StoryOverlays } from './components/StoryOverlays';
import { NavigationDock } from './components/NavigationDock';
import { MemoryModal } from './components/MemoryModal';
import { MemoryItem } from './data/memories';
import { cosmicAudio } from './utils/audio';
import { ANNIVERSARY_DATA } from './data/anniversary';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [currentChapter, setCurrentChapter] = useState<number>(1);
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isMutedAudio, setIsMutedAudio] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Initialize audio and check system preferences
  useEffect(() => {
    cosmicAudio.init(ANNIVERSARY_DATA.audio.localAudioPath);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // Compute scroll progress & chapter boundaries
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = window.scrollY;
          const progress = maxScroll > 0 ? Math.min(1.0, Math.max(0.0, currentScroll / maxScroll)) : 0;
          setScrollProgress(progress);

          // Calculate active chapter based on narrative ranges
          if (progress < 0.12) {
            setCurrentChapter(1);
          } else if (progress < 0.25) {
            setCurrentChapter(2);
          } else if (progress < 0.38) {
            setCurrentChapter(3);
          } else if (progress < 0.52) {
            setCurrentChapter(4);
          } else if (progress < 0.65) {
            setCurrentChapter(5);
          } else if (progress < 0.76) {
            setCurrentChapter(6);
          } else if (progress < 0.86) {
            setCurrentChapter(7);
          } else if (progress < 0.94) {
            setCurrentChapter(8);
          } else {
            setCurrentChapter(9);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Jump to Chapter smooth scroll
  const handleJumpToChapter = useCallback((chapterNum: number) => {
    const el = document.getElementById(`chapter-${chapterNum}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Replay from beginning
  const handleReplay = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Audio actions
  const handleToggleAudioPlay = async () => {
    const playing = await cosmicAudio.togglePlay();
    setIsPlayingAudio(playing);
  };

  const handleToggleAudioMute = () => {
    const muted = cosmicAudio.toggleMute();
    setIsMutedAudio(muted);
  };

  return (
    <div className="relative min-h-screen bg-[#070a1a] text-slate-100 selection:bg-purple-600 selection:text-white">
      {/* 1. Full-Bleed Pinned 3D WebGL Canvas */}
      <CosmicCanvas
        scrollProgress={scrollProgress}
        onSelectMemory={setSelectedMemory}
        reducedMotion={reducedMotion}
      />

      {/* 2. Semantic Scroll Chapters (1 through 9) */}
      <StoryOverlays
        currentChapter={currentChapter}
        onReplay={handleReplay}
        onOpenLetter={() => handleJumpToChapter(9)}
      />

      {/* 3. Consolidated Bottom Floating Control Dock */}
      <NavigationDock
        currentChapter={currentChapter}
        onJumpToChapter={handleJumpToChapter}
        isPlayingAudio={isPlayingAudio}
        isMutedAudio={isMutedAudio}
        onToggleAudioPlay={handleToggleAudioPlay}
        onToggleAudioMute={handleToggleAudioMute}
        onSelectMemory={setSelectedMemory}
      />

      {/* 4. Lightbox Memory Viewer Modal */}
      <MemoryModal
        memory={selectedMemory}
        onClose={() => setSelectedMemory(null)}
      />
    </div>
  );
}
