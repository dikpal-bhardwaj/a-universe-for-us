/**
 * Semantic HTML Story Overlays for the 9 Chapters
 * Beautiful, editorial cosmic typography, glassmorphic cards,
 * and delicate starlight accents.
 */

import React, { useEffect, useRef } from 'react';
import { ANNIVERSARY_DATA } from '../data/anniversary';
import { Sparkles, Clock, Calendar, Heart, Compass, Star, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';

interface StoryOverlaysProps {
  currentChapter: number;
  onReplay: () => void;
  onOpenLetter: () => void;
}

export const StoryOverlays: React.FC<StoryOverlaysProps> = ({
  currentChapter,
  onReplay,
}) => {
  const { chapters } = ANNIVERSARY_DATA;
  const hasTriggeredConfetti = useRef(false);

  // Trigger delicate cosmic stardust confetti on Chapter 8 reveal
  useEffect(() => {
    if (currentChapter === 8 && !hasTriggeredConfetti.current) {
      hasTriggeredConfetti.current = true;
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f472b6', '#a78bfa', '#fde68a', '#38bdf8'],
      });
    } else if (currentChapter < 7) {
      hasTriggeredConfetti.current = false;
    }
  }, [currentChapter]);

  return (
    <div className="relative z-10 w-full pointer-events-none select-none text-slate-100">
      {/* Chapter 1: Before the universe had a name */}
      <section
        id="chapter-1"
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      >
        <div className="max-w-3xl mx-auto space-y-6 pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-950/40 text-violet-300 text-xs tracking-[0.2em] uppercase backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Prologue</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-violet-300 drop-shadow-sm leading-tight">
            {chapters.chapter1.title}
          </h1>

          <p className="font-sans text-base sm:text-xl text-slate-300/90 font-light max-w-xl mx-auto tracking-wide leading-relaxed">
            {chapters.chapter1.subtitle}
          </p>

          <div className="pt-12 flex flex-col items-center gap-2 opacity-75 animate-bounce">
            <span className="text-xs uppercase tracking-[0.25em] text-slate-400">
              {chapters.chapter1.hint}
            </span>
            <ChevronDown className="w-4 h-4 text-violet-300" />
          </div>
        </div>
      </section>

      {/* Chapter 2: A connection, unexpectedly */}
      <section
        id="chapter-2"
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      >
        <div className="max-w-2xl mx-auto space-y-6 pointer-events-auto bg-slate-950/50 p-8 sm:p-12 rounded-3xl border border-violet-500/20 backdrop-blur-lg shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-950/40 text-sky-300 text-xs tracking-[0.2em] uppercase">
            <Compass className="w-3.5 h-3.5 text-sky-400" />
            <span>Chapter II</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white leading-snug">
            {chapters.chapter2.heading}
          </h2>

          <p className="font-serif text-xl sm:text-2xl text-violet-200/90 font-light italic leading-relaxed">
            "{chapters.chapter2.body}"
          </p>

          <p className="font-sans text-sm sm:text-base text-slate-400 font-light leading-relaxed">
            {chapters.chapter2.contextNote}
          </p>
        </div>
      </section>

      {/* Chapter 3: When midnight changed everything */}
      <section
        id="chapter-3"
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      >
        <div className="max-w-2xl mx-auto space-y-6 pointer-events-auto bg-slate-950/60 p-8 sm:p-12 rounded-3xl border border-amber-400/30 backdrop-blur-lg shadow-2xl">
          <div className="flex items-center justify-center gap-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/40 text-amber-300 text-xs tracking-wider">
              <Clock className="w-3.5 h-3.5" />
              <span>{chapters.chapter3.timeBadge}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-400/40 text-pink-300 text-xs tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>{chapters.chapter3.dateBadge}</span>
            </div>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
            {chapters.chapter3.headline}
          </h2>

          <p className="font-sans text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            {chapters.chapter3.subline}
          </p>

          <div className="pt-4">
            <span className="font-serif text-2xl sm:text-3xl text-pink-300 font-normal italic tracking-wide">
              {chapters.chapter3.momentText}
            </span>
          </div>
        </div>
      </section>

      {/* Chapter 4: Two years of little universes */}
      <section
        id="chapter-4"
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      >
        <div className="max-w-2xl mx-auto space-y-4 pointer-events-auto bg-slate-950/50 p-6 sm:p-10 rounded-3xl border border-violet-500/20 backdrop-blur-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-400/30 bg-violet-950/40 text-violet-300 text-xs tracking-[0.2em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>Chapter IV • Memories</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white">
            {chapters.chapter4.heading}
          </h2>

          <p className="font-serif text-lg sm:text-xl text-slate-300 font-light italic">
            "{chapters.chapter4.subheading}"
          </p>

          <p className="text-xs uppercase tracking-[0.2em] text-violet-400 pt-2">
            {chapters.chapter4.instructions}
          </p>
        </div>
      </section>

      {/* Chapter 5: You stayed, even when I was imperfect */}
      <section
        id="chapter-5"
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      >
        <div className="max-w-2xl mx-auto space-y-6 pointer-events-auto bg-slate-950/65 p-8 sm:p-12 rounded-3xl border border-amber-300/25 backdrop-blur-xl shadow-2xl text-left">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-300/30 bg-amber-950/30 text-amber-300 text-xs tracking-[0.2em] uppercase">
              <Heart className="w-3.5 h-3.5 text-amber-400" />
              <span>Chapter V • Gratitude</span>
            </div>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-white text-center">
            {chapters.chapter5.heading}
          </h2>

          <div className="space-y-4 text-slate-300 font-sans text-sm sm:text-base leading-relaxed font-light">
            {chapters.chapter5.paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter 6: Every star is a reason */}
      <section
        id="chapter-6"
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      >
        <div className="max-w-3xl mx-auto space-y-6 pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-fuchsia-400/30 bg-fuchsia-950/40 text-fuchsia-300 text-xs tracking-[0.2em] uppercase">
            <Star className="w-3.5 h-3.5 text-fuchsia-300" />
            <span>Chapter VI • Constellation</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white">
            {chapters.chapter6.heading}
          </h2>

          <p className="font-sans text-sm sm:text-base text-slate-300 max-w-lg mx-auto font-light">
            {chapters.chapter6.subheading}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-4">
            {chapters.chapter6.reasons.map((reason, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-950/60 border border-fuchsia-400/20 backdrop-blur-md transition-all hover:border-fuchsia-400/40"
              >
                <h3 className="font-serif text-lg text-white font-medium mb-1">
                  {reason.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter 7: A universe still waiting for us */}
      <section
        id="chapter-7"
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      >
        <div className="max-w-2xl mx-auto space-y-6 pointer-events-auto bg-slate-950/55 p-8 sm:p-12 rounded-3xl border border-sky-400/25 backdrop-blur-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-400/30 bg-sky-950/40 text-sky-300 text-xs tracking-[0.2em] uppercase">
            <Compass className="w-3.5 h-3.5 text-sky-400" />
            <span>Chapter VII • Horizons</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white">
            {chapters.chapter7.heading}
          </h2>

          <div className="space-y-4 text-slate-300 font-sans text-sm sm:text-base leading-relaxed font-light">
            {chapters.chapter7.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter 8: The universe reveals who it belongs to */}
      <section
        id="chapter-8"
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      >
        <div className="max-w-2xl mx-auto space-y-6 pointer-events-auto bg-gradient-to-b from-slate-950/80 to-purple-950/50 p-8 sm:p-14 rounded-3xl border border-pink-400/40 backdrop-blur-xl shadow-2xl">
          <p className="font-serif text-lg sm:text-xl text-pink-200/80 italic">
            "{chapters.chapter8.prelude}"
          </p>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-white to-amber-200 leading-tight">
            {chapters.chapter8.revealTitle}
          </h2>

          <p className="font-serif text-2xl sm:text-3xl text-amber-300/90 font-light tracking-wide">
            {chapters.chapter8.revealSubtitle}
          </p>

          <div className="pt-4 text-xs uppercase tracking-[0.25em] text-slate-400 font-sans">
            {chapters.chapter8.signature}
          </div>
        </div>
      </section>

      {/* Chapter 9: A letter to my Munchkin */}
      <section
        id="chapter-9"
        className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center"
      >
        <div className="max-w-2xl mx-auto space-y-8 pointer-events-auto bg-slate-950/85 p-8 sm:p-14 rounded-3xl border border-amber-300/35 backdrop-blur-2xl shadow-2xl text-left">
          <div className="text-center space-y-2 border-b border-amber-400/20 pb-6">
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-amber-400/80">
              For My Person
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-medium">
              {chapters.chapter9.salutation}
            </h2>
            <p className="font-serif text-lg text-pink-300 italic">
              {chapters.chapter9.subtitle}
            </p>
          </div>

          <div className="space-y-4 font-serif text-base sm:text-lg text-slate-200/95 font-light leading-relaxed">
            {chapters.chapter9.paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="pt-6 border-t border-amber-400/20 text-right space-y-1">
            <p className="font-serif text-base text-slate-400 italic">
              {chapters.chapter9.closing}
            </p>
            <p className="font-serif text-2xl text-amber-300 font-medium">
              {chapters.chapter9.signoff}
            </p>
          </div>

          <div className="pt-6 flex justify-center">
            <button
              onClick={onReplay}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-pink-600 text-white font-sans text-xs sm:text-sm tracking-wider uppercase font-medium hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-violet-500/25 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>{chapters.chapter9.replayPrompt}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
