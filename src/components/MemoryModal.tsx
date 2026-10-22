/**
 * Accessible Memory Lightbox Viewer Modal
 * Supports full resolution inspection of real photos from /assets/pictures/
 * alongside fallback procedural canvas graphics and full narrative captions.
 */

import React, { useEffect, useState } from 'react';
import { MemoryItem } from '../data/memories';
import { X, Calendar, Sparkles } from 'lucide-react';

interface MemoryModalProps {
  memory: MemoryItem | null;
  onClose: () => void;
}

export const MemoryModal: React.FC<MemoryModalProps> = ({ memory, onClose }) => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [memory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (memory) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [memory, onClose]);

  if (!memory) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="memory-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xl transition-all animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-slate-900/90 border border-violet-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-slate-100 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Close button */}
        <button
          onClick={onClose}
          aria-label="Close memory viewer"
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Date badge */}
        {memory.date && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs tracking-wider w-fit">
            <Calendar className="w-3.5 h-3.5" />
            <span>{memory.date}</span>
          </div>
        )}

        {/* Media Box */}
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950/80 border border-white/10 flex items-center justify-center">
          {!imgError ? (
            <img
              src={memory.imagePath}
              alt={memory.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-indigo-950/60 to-purple-950/60">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-3 shadow-lg"
                style={{ backgroundColor: memory.themeColor + '33', border: `1px solid ${memory.accentColor}` }}
              >
                <Sparkles className="w-8 h-8" style={{ color: memory.accentColor }} />
              </div>
              <h4 className="font-serif text-lg text-white font-medium mb-1">
                {memory.title}
              </h4>
              <p className="text-xs text-slate-400 max-w-xs">
                Cosmic memory preserved in our constellation.
              </p>
            </div>
          )}
        </div>

        {/* Caption Info */}
        <div className="space-y-2">
          <h3 id="memory-title" className="font-serif text-2xl font-light text-white">
            {memory.title}
          </h3>
          <p className="font-sans text-sm sm:text-base text-slate-300/90 font-light leading-relaxed">
            {memory.caption}
          </p>
        </div>
      </div>
    </div>
  );
};
