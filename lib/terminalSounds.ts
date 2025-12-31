// Terminal sound effects for immersive experience
// Using Web Audio API for lightweight sound generation

export class TerminalSoundManager {
    private audioContext: AudioContext | null = null;
    private isEnabled: boolean = true;

    constructor() {
        if (typeof window !== 'undefined') {
            try {
                this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            } catch (e) {
                console.warn('Web Audio API not supported');
                this.isEnabled = false;
            }
        }
    }

    // Generate typing sound - fast oscillating mechanical keyboard click
    private playTypingSound() {
        if (!this.audioContext || !this.isEnabled) return;

        const now = this.audioContext.currentTime;
        const masterGain = this.audioContext.createGain();
        masterGain.connect(this.audioContext.destination);
        masterGain.gain.setValueAtTime(0.25, now);

        // Base frequency with oscillation
        const baseFreq = 800 + Math.random() * 600; // 800-1400 Hz range
        
        // Component 1: Fast oscillating click (rapid frequency modulation)
        const clickOsc = this.audioContext.createOscillator();
        const clickGain = this.audioContext.createGain();
        const lfo = this.audioContext.createOscillator(); // LFO for oscillation
        const lfoGain = this.audioContext.createGain();
        
        clickOsc.type = 'square';
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(50 + Math.random() * 30, now); // Fast oscillation 50-80 Hz
        lfoGain.gain.setValueAtTime(200, now); // Modulation depth
        
        lfo.connect(lfoGain);
        lfoGain.connect(clickOsc.frequency);
        clickOsc.frequency.setValueAtTime(baseFreq, now);
        
        clickGain.gain.setValueAtTime(0, now);
        clickGain.gain.linearRampToValueAtTime(0.4, now + 0.0003);
        clickGain.gain.exponentialRampToValueAtTime(0.01, now + 0.002);
        
        clickOsc.connect(clickGain);
        clickGain.connect(masterGain);
        
        lfo.start(now);
        lfo.stop(now + 0.002);
        clickOsc.start(now);
        clickOsc.stop(now + 0.002);

        // Component 2: Quick mid-frequency burst with oscillation
        const bodyOsc = this.audioContext.createOscillator();
        const bodyGain = this.audioContext.createGain();
        const bodyLfo = this.audioContext.createOscillator();
        const bodyLfoGain = this.audioContext.createGain();
        
        bodyOsc.type = 'sawtooth';
        bodyLfo.type = 'sine';
        bodyLfo.frequency.setValueAtTime(30 + Math.random() * 20, now);
        bodyLfoGain.gain.setValueAtTime(150, now);
        
        bodyLfo.connect(bodyLfoGain);
        bodyLfoGain.connect(bodyOsc.frequency);
        bodyOsc.frequency.setValueAtTime(400 + Math.random() * 200, now);
        
        bodyGain.gain.setValueAtTime(0, now);
        bodyGain.gain.linearRampToValueAtTime(0.3, now + 0.0005);
        bodyGain.gain.exponentialRampToValueAtTime(0.01, now + 0.004);
        
        bodyOsc.connect(bodyGain);
        bodyGain.connect(masterGain);
        
        bodyLfo.start(now);
        bodyLfo.stop(now + 0.004);
        bodyOsc.start(now);
        bodyOsc.stop(now + 0.004);
    }

    // Generate cyber/tech sound
    private playCyberSound() {
        if (!this.audioContext || !this.isEnabled) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.type = 'sawtooth';
        const freq = 200 + Math.random() * 300;
        oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(freq * 2, this.audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.08, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.15);
    }

    // Generate loading/processing sound
    private playLoadingSound() {
        if (!this.audioContext || !this.isEnabled) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
        oscillator.frequency.linearRampToValueAtTime(600, this.audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.06, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    // Generate beep/notification sound
    private playBeepSound() {
        if (!this.audioContext || !this.isEnabled) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(1000, this.audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.08);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.08);
    }

    // Play random sound effect (30% chance)
    public playRandomSound() {
        if (Math.random() > 0.3) return; // 30% chance to play a sound

        const sounds = [
            () => this.playTypingSound(),
            () => this.playCyberSound(),
            () => this.playLoadingSound(),
            () => this.playBeepSound(),
        ];

        const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
        randomSound();
    }

    // Play sound on specific events
    public playOnTyping() {
        // Higher chance for keyboard typing (70% chance)
        if (Math.random() > 0.3) {
            this.playTypingSound();
        }
    }

    public playOnSystemCheck() {
        if (Math.random() > 0.5) return; // 50% chance
        this.playBeepSound();
    }

    public playOnLoading() {
        if (Math.random() > 0.6) return; // 40% chance
        this.playLoadingSound();
    }

    public playOnGlitch() {
        if (Math.random() > 0.7) return; // 30% chance
        this.playCyberSound();
    }
}

// Singleton instance
let soundManagerInstance: TerminalSoundManager | null = null;

export const getTerminalSoundManager = (): TerminalSoundManager => {
    if (!soundManagerInstance) {
        soundManagerInstance = new TerminalSoundManager();
    }
    return soundManagerInstance;
};

