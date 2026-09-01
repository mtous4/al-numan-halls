'use client';

// Web Audio API Context for envelope opening sound effect
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

// 1. Crystal Chime Sparkle Sound Effect on opening invitation
export function playEnvelopeOpenSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Harmonious crystal pentatonic chime frequencies
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

// 2. Romantic Wedding Music Player (Plays the downloaded 1-minute YouTube wedding melody in a seamless loop)
class WeddingAudioPlayer {
  constructor() {
    this.audio = null;
    this.isPlaying = false;
  }

  init() {
    if (typeof window === 'undefined') return;
    if (!this.audio) {
      this.audio = new Audio('/audio/wedding-melody.mp3');
      this.audio.loop = true;
      this.audio.volume = 0.7;
      this.audio.preload = 'auto';
    }
  }

  start() {
    if (typeof window === 'undefined') return;
    this.init();
    if (this.audio) {
      this.isPlaying = true;
      this.audio.currentTime = 0;
      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.log('Audio autoplay prevented or error:', err);
        });
      }
    }
  }

  resume() {
    if (typeof window === 'undefined') return;
    this.init();
    if (this.audio) {
      this.isPlaying = true;
      this.audio.play().catch(e => console.log(e));
    }
  }

  stop() {
    if (this.audio) {
      this.isPlaying = false;
      this.audio.pause();
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.resume();
      return true;
    }
  }
}

export const weddingSynth = new WeddingAudioPlayer();
