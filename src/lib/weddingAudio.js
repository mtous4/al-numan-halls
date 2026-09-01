'use client';

// Web Audio API Context Singleton
let audioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// 1. Chime / Sparkle Sound Effect on opening invitation
export function playEnvelopeOpenSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Pleasant magical chime chord frequencies (Pentatonic sparkle: C5, E5, G5, B5, D6, G6)
    const freqs = [523.25, 659.25, 783.99, 987.77, 1174.66, 1567.98];

    freqs.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + index * 0.05);

      gain.gain.setValueAtTime(0, now + index * 0.05);
      gain.gain.linearRampToValueAtTime(0.12, now + index * 0.05 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.05 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + index * 0.05);
      osc.stop(now + index * 0.05 + 1.3);
    });
  } catch (e) {
    console.log('Sound effect play error:', e);
  }
}

// 2. Romantic Wedding Music Synthesizer Loop (Canon in D / Romantic Piano & Strings Harmonies)
class RomanticWeddingSynthesizer {
  constructor() {
    this.isPlaying = false;
    this.timer = null;
    this.activeNodes = [];
    this.chordIndex = 0;
  }

  start() {
    if (this.isPlaying) return;
    this.isPlaying = true;

    const ctx = getAudioContext();
    if (!ctx) return;

    // Romantic Canon chord progression: D - A - Bm - F#m - G - D - G - A
    const chords = [
      // D Major (D4, F#4, A4, D5)
      [293.66, 369.99, 440.00, 587.33],
      // A Major (C#4, E4, A4, E5)
      [277.18, 329.63, 440.00, 659.25],
      // B Minor (B3, D4, F#4, B4)
      [246.94, 293.66, 369.99, 493.88],
      // F# Minor (A3, C#4, F#4, A4)
      [220.00, 277.18, 369.99, 440.00],
      // G Major (G3, B3, D4, G4)
      [196.00, 246.94, 293.66, 392.00],
      // D Major (D4, F#4, A4, D5)
      [293.66, 369.99, 440.00, 587.33],
      // G Major (G3, B3, D4, G4)
      [196.00, 246.94, 293.66, 392.00],
      // A Major (A3, C#4, E4, A4)
      [220.00, 277.18, 329.63, 440.00],
    ];

    const playNextChord = () => {
      if (!this.isPlaying) return;
      const currentChord = chords[this.chordIndex % chords.length];
      this.chordIndex++;

      const now = ctx.currentTime;
      const duration = 3.2; // Smooth 3.2s per harmonic bar

      currentChord.forEach((freq, noteIdx) => {
        // Main soft romantic sine wave
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = noteIdx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now + noteIdx * 0.12);

        // Lowpass filter for warm intimate acoustic timbre
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(900, now);

        // Soft envelope: slow gentle attack, long sustain, warm decay
        const baseVolume = noteIdx === 0 ? 0.06 : 0.035;
        gain.gain.setValueAtTime(0.0001, now + noteIdx * 0.12);
        gain.gain.linearRampToValueAtTime(baseVolume, now + noteIdx * 0.12 + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.5);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + noteIdx * 0.12);
        osc.stop(now + duration + 0.6);

        this.activeNodes.push(osc);
      });

      this.timer = setTimeout(playNextChord, 2800);
    };

    playNextChord();
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.activeNodes.forEach(osc => {
      try { osc.stop(); } catch (e) {}
    });
    this.activeNodes = [];
  }
}

export const weddingSynth = new RomanticWeddingSynthesizer();
