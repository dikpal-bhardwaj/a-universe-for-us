/**
 * Pure mathematical functions for chapter transitions,
 * celestial trajectories, and date calculations.
 */

export function calculateChapterFromProgress(progress: number): number {
  const p = Math.max(0, Math.min(1, progress));
  if (p < 0.12) return 1;
  if (p < 0.25) return 2;
  if (p < 0.38) return 3;
  if (p < 0.52) return 4;
  if (p < 0.65) return 5;
  if (p < 0.76) return 6;
  if (p < 0.86) return 7;
  if (p < 0.94) return 8;
  return 9;
}

export function calculateStarPairSeparation(progress: number): number {
  const orbitProgress = Math.min(1.0, progress / 0.32);
  return (1 - orbitProgress) * 16 + 0.3;
}

export function calculateConstellationOpacity(progress: number): number {
  if (progress < 0.58) return 0;
  return Math.min(0.9, (progress - 0.58) * 3.0);
}

export function calculateAnniversaryYears(startDateStr: string, endDateStr: string): number {
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  return end.getFullYear() - start.getFullYear();
}
