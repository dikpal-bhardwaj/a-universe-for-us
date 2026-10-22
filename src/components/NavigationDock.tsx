/**
 * Bottom Floating Navigation Dock
 * Built according to Three.js Ergonomic UI Directives:
 * Pinned to bottom center, zero side-panel occlusion, collapsible cinema mode,
 * and clean static status indicators.
 */

import React, { useState } from 'react';
import { Volume2, VolumeX, Play, Pause, ChevronUp, ChevronDown, Compass, Images, Download } from 'lucide-react';
import { MemoryItem, MEMORIES } from '../data/memories';

interface NavigationDockProps {
  currentChapter: number;
  onJumpToChapter: (chapterIndex: number) => void;
  isPlayingAudio: boolean;
  isMutedAudio: boolean;
  onToggleAudioPlay: () => void;
  onToggleAudioMute: () => void;
  onSelectMemory: (memory: MemoryItem) => void;
}

export const NavigationDock: React.FC<NavigationDockProps> = ({
  currentChapter,
  onJumpToChapter,
  isPlayingAudio,
  isMutedAudio,
  onToggleAudioPlay,
  onToggleAudioMute,
  onSelectMemory,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  const chapters = [
    { num: 1, label: 'Origin' },
    { num: 2, label: 'Connection' },
    { num: 3, label: '1:00 AM' },
    { num: 4, label: 'Memories' },
    { num: 5, label: 'Gratitude' },
    { num: 6, label: 'Reasons' },
    { num: 7, label: 'Horizon' },
    { num: 8, label: 'Reveal' },
    { num: 9, label: 'Letter' },
  ];

  return (
    <div
      className="fixed bottom-4 left-1/2 z-40 flex flex-col items-center pointer-events-auto transition-transform duration-300 w-[94vw] max-w-4xl"
      style={{
        transform: `translateX(-50%) translateY(${isCollapsed ? 'calc(100% - 26px)' : '0px'})`,
      }}
    >
      {/* Collapse / Cinema Mode Toggle Tab */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? 'Show navigation dock' : 'Hide navigation dock'}
        className="px-4 py-1 rounded-t-xl bg-slate-950/95 border-t border-x border-violet-500/40 text-violet-300 hover:text-white text-[11px] tracking-wider uppercase font-medium flex items-center gap-1.5 cursor-pointer shadow-xl mb-[-1px] z-10"
      >
        {isCollapsed ? (
          <>
            <ChevronUp className="w-3.5 h-3.5" />
            <span>Show Dock</span>
          </>
        ) : (
          <>
            <ChevronDown className="w-3.5 h-3.5" />
            <span>Zen View</span>
          </>
        )}
      </button>

      {/* Main Dock Container */}
      <div className="w-full bg-slate-950/95 border border-violet-500/40 rounded-2xl p-2 sm:p-2.5 shadow-2xl backdrop-blur-xl flex flex-wrap items-center justify-between gap-2 text-slate-200">
        {/* Left: Audio Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleAudioPlay}
            aria-label={isPlayingAudio ? 'Pause ambient music' : 'Play ambient music'}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-violet-900/50 text-violet-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-medium border border-violet-500/20"
          >
            {isPlayingAudio ? <Pause className="w-3.5 h-3.5 text-pink-300" /> : <Play className="w-3.5 h-3.5 text-pink-300" />}
            <span className="hidden sm:inline">{isPlayingAudio ? 'Music' : 'Music'}</span>
          </button>

          {isPlayingAudio && (
            <button
              onClick={onToggleAudioMute}
              aria-label={isMutedAudio ? 'Unmute music' : 'Mute music'}
              className="p-1.5 rounded-xl bg-slate-900/90 hover:bg-violet-900/50 text-slate-400 hover:text-white transition-all cursor-pointer border border-violet-500/20"
            >
              {isMutedAudio ? <VolumeX className="w-3.5 h-3.5 text-amber-400" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          )}

          {/* Quick Memories Drawer Toggle */}
          <button
            onClick={() => setShowGallery(!showGallery)}
            aria-label="Toggle Memory Gallery"
            className="px-2.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-violet-900/50 text-violet-300 hover:text-white transition-all cursor-pointer flex items-center gap-1 text-xs border border-violet-500/20"
          >
            <Images className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Photos</span>
          </button>

          {/* Download Project ZIP */}
          <a
            href="/universe-anniversary.zip"
            download="universe-anniversary.zip"
            aria-label="Download Project ZIP"
            className="px-2.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-violet-900/50 text-sky-300 hover:text-white transition-all cursor-pointer flex items-center gap-1 text-xs border border-sky-500/20"
            title="Download complete project ZIP file"
          >
            <Download className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden md:inline">ZIP</span>
          </a>
        </div>

        {/* Center: Chapter Journey Indicators */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-full py-1">
          {chapters.map((ch) => {
            const isActive = currentChapter === ch.num;
            return (
              <button
                key={ch.num}
                onClick={() => onJumpToChapter(ch.num)}
                aria-label={`Jump to Chapter ${ch.num}: ${ch.label}`}
                className={`px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-md shadow-violet-500/30'
                    : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {ch.num}. {ch.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Expandable Memory Tray */}
      {showGallery && (
        <div className="w-full mt-2 p-3 bg-slate-950/95 border border-violet-500/30 rounded-2xl shadow-2xl backdrop-blur-2xl flex items-center gap-3 overflow-x-auto">
          {MEMORIES.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                onSelectMemory(m);
                setShowGallery(false);
              }}
              className="flex-shrink-0 w-24 p-2 rounded-xl bg-slate-900/80 hover:bg-violet-900/40 border border-white/10 text-left transition-all hover:scale-105 cursor-pointer"
            >
              <div
                className="w-full h-12 rounded-lg mb-1 flex items-center justify-center text-xs"
                style={{ backgroundColor: m.themeColor + '44' }}
              >
                <Compass className="w-4 h-4" style={{ color: m.accentColor }} />
              </div>
              <p className="text-[10px] text-white truncate font-medium">{m.title}</p>
              <p className="text-[9px] text-slate-400 truncate">{m.date || 'Memory'}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
