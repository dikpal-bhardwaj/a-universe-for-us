/**
 * Ambient Cosmic Audio Engine
 * Combines zero-dependency Web Audio API procedural atmospheric pads
 * with optional local MP3 playback support.
 */

class CosmicAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private isMuted = false;
  private masterGain: GainNode | null = null;
  private oscillatorInterval: number | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private audioMode: 'custom-file' | 'procedural' = 'procedural';

  public init(localAudioPath?: string) {
    if (localAudioPath) {
      const audio = new Audio(localAudioPath);
      audio.loop = true;
      audio.volume = 0.5;

      audio.addEventListener('canplaythrough', () => {
        this.audioElement = audio;
        this.audioMode = 'custom-file';
      });

      audio.addEventListener('error', () => {
        // Fallback to procedural Web Audio
        this.audioElement = null;
        this.audioMode = 'procedural';
      });
    }
  }

  private initWebAudio() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    this.ctx = new AudioContextClass();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  public async togglePlay(): Promise<boolean> {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      await this.play();
      return true;
    }
  }

  public async play(): Promise<void> {
    if (this.audioMode === 'custom-file' && this.audioElement) {
      try {
        await this.audioElement.play();
        this.isPlaying = true;
        return;
      } catch {
        // Fallback to procedural
        this.audioMode = 'procedural';
      }
    }

    this.initWebAudio();
    if (!this.ctx || !this.masterGain) return;

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    this.isPlaying = true;
    this.startProceduralAmbient();
  }

  public pause(): void {
    if (this.audioElement) {
      this.audioElement.pause();
    }
    if (this.oscillatorInterval) {
      window.clearInterval(this.oscillatorInterval);
      this.oscillatorInterval = null;
    }
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.5);
    }
    this.isPlaying = false;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.audioElement) {
      this.audioElement.muted = this.isMuted;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.4, this.ctx.currentTime, 0.1);
    }
    return this.isMuted;
  }

  public getPlaying(): boolean {
    return this.isPlaying;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Generates a warm, dreamy ambient celestial drone with slow shimmering harmonics
   * based on chords in Fmaj9 / Dmin9.
   */
  private startProceduralAmbient() {
    if (!this.ctx || !this.masterGain) return;
    this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

    // Filtered pad frequencies (Hz) - F Lydian / D minor celestial tones
    const chords = [
      [174.61, 220.00, 261.63, 329.63, 523.25], // F3, A3, C4, E4, C5
      [146.83, 220.00, 293.66, 349.23, 440.00], // D3, A3, D4, F4, A4
      [196.00, 246.94, 293.66, 392.00, 493.88], // G3, B3, D4, G4, B4
      [130.81, 196.00, 261.63, 329.63, 392.00], // C3, G3, C4, E4, G4
    ];

    let chordIndex = 0;

    const playChordVoice = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;

      const chord = chords[chordIndex % chords.length];
      chordIndex++;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(480, this.ctx.currentTime);
      filter.Q.setValueAtTime(2.5, this.ctx.currentTime);

      const chordGain = this.ctx.createGain();
      chordGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      chordGain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 3.0);
      chordGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 9.5);

      filter.connect(chordGain);
      chordGain.connect(this.masterGain);

      chord.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 1.5, this.ctx.currentTime);

        const subGain = this.ctx.createGain();
        subGain.gain.setValueAtTime(0.2 / chord.length, this.ctx.currentTime);

        osc.connect(subGain);
        subGain.connect(filter);

        osc.start();
        osc.stop(this.ctx.currentTime + 10.0);
      });
    };

    // First voice immediately
    playChordVoice();

    // Loop soft overlapping voices every 7 seconds
    this.oscillatorInterval = window.setInterval(() => {
      playChordVoice();
    }, 7000);
  }
}

export const cosmicAudio = new CosmicAudioEngine();
