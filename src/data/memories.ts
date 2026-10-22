/**
 * Strongly typed memory manifests for Dikpal & Jili
 * Designed to gracefully support real photos in /assets/pictures/
 * while automatically falling back to procedural celestial memory canvases
 * so missing photos never crash or break the experience.
 */

export interface MemoryItem {
  id: string;
  imagePath: string;
  title: string;
  caption: string;
  date?: string;
  chapter: number;
  featured: boolean;
  aspectRatio: number; // width / height, e.g. 1.0 or 0.8
  themeColor: string;
  accentColor: string;
  motif: 'starlight' | 'nebula' | 'constellation' | 'celestial_ring' | 'midnight_spark' | 'golden_hour';
}

export const MEMORIES: MemoryItem[] = [
  {
    id: 'memory-1',
    imagePath: '/assets/pictures/1.jpg',
    title: 'Where Conversations Turned Into Starlight',
    caption: 'Those first late-night messages where minutes turned into hours, and strangers turned into each other’s favorite notification.',
    date: 'College Days',
    chapter: 4,
    featured: true,
    aspectRatio: 0.85,
    themeColor: '#7C4DFF',
    accentColor: '#FFD700',
    motif: 'nebula',
  },
  {
    id: 'memory-2',
    imagePath: '/assets/pictures/2.jpg',
    title: 'The Smile That Grounded Me',
    caption: 'That unforgettable smile that always cuts straight through my worries and brings calm to my loudest thoughts.',
    date: 'A Golden Afternoon',
    chapter: 4,
    featured: true,
    aspectRatio: 1.0,
    themeColor: '#E040FB',
    accentColor: '#FFE082',
    motif: 'golden_hour',
  },
  {
    id: 'memory-3',
    imagePath: '/assets/pictures/3.jpg',
    title: 'Walking Together in Our Own World',
    caption: 'Side by side, walking without rushing anywhere, feeling like the rest of the crowded world faded away.',
    date: 'Two Years of Memories',
    chapter: 4,
    featured: true,
    aspectRatio: 0.8,
    themeColor: '#00E5FF',
    accentColor: '#B388FF',
    motif: 'celestial_ring',
  },
  {
    id: 'memory-4',
    imagePath: '/assets/pictures/4.jpg',
    title: 'Unfiltered Laughter',
    caption: 'The silly jokes, goofy faces, and deep belly laughs that only the two of us truly understand.',
    date: 'Pure Joy',
    chapter: 4,
    featured: true,
    aspectRatio: 1.15,
    themeColor: '#FF4081',
    accentColor: '#FFD54F',
    motif: 'starlight',
  },
  {
    id: 'memory-5',
    imagePath: '/assets/pictures/5.jpg',
    title: 'Your Quiet Grace',
    caption: 'The gentle patience you give me every day. Even when I falter, your love holds our world together.',
    date: 'Gratitude',
    chapter: 5,
    featured: true,
    aspectRatio: 0.9,
    themeColor: '#FFAB40',
    accentColor: '#80D8FF',
    motif: 'midnight_spark',
  },
  {
    id: 'memory-6',
    imagePath: '/assets/pictures/6.jpg',
    title: 'Under the Same Sky',
    caption: 'No matter the distance or time, looking up and knowing we share the exact same universe.',
    date: 'Always Together',
    chapter: 6,
    featured: true,
    aspectRatio: 1.0,
    themeColor: '#651FFF',
    accentColor: '#69F0AE',
    motif: 'constellation',
  },
  {
    id: 'memory-7',
    imagePath: '/assets/pictures/7.jpg',
    title: 'The Best Decision of My Life',
    caption: 'November 4, 2024 at 1:00 AM — when you said yes, and forever became the easiest word in the world.',
    date: 'November 4, 2024',
    chapter: 8,
    featured: true,
    aspectRatio: 0.85,
    themeColor: '#FF6D00',
    accentColor: '#FF80AB',
    motif: 'golden_hour',
  },
  {
    id: 'memory-8',
    imagePath: '/assets/pictures/8.jpg',
    title: 'Our Journey Continuing',
    caption: 'Two whole years behind us, and an entire endless sky of tomorrow waiting for us.',
    date: 'November 4, 2026',
    chapter: 8,
    featured: true,
    aspectRatio: 1.0,
    themeColor: '#7C4DFF',
    accentColor: '#FFF59D',
    motif: 'starlight',
  },
];
