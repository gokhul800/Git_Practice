/**
 * soundManager.js
 * Synthesizes character sound effects using the Web Audio API.
 * No external audio files required.
 */

let audioCtx = null;
let currentSource = null;

function getCtx() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    // Resume if suspended (browser autoplay policy)
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

function stopCurrent() {
    if (currentSource) {
        try { currentSource.stop(); } catch { /* already stopped */ }
        currentSource = null;
    }
}

function makeGain(ctx, volume = 0.15) {
    const g = ctx.createGain();
    g.gain.setValueAtTime(volume, ctx.currentTime);
    g.connect(ctx.destination);
    return g;
}

// --- Individual sound synthesizers ---

function playZoro() {
    // Sword slash: quick descending noise burst
    const ctx = getCtx();
    stopCurrent();
    const bufferSize = ctx.sampleRate * 0.25;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3000, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.25);
    filter.Q.value = 0.5;
    const gain = makeGain(ctx, 0.18);
    source.connect(filter);
    filter.connect(gain);
    source.start();
    currentSource = source;
}

function playLuffy() {
    // Lightning crackle: rapid high-freq oscillation burst
    const ctx = getCtx();
    stopCurrent();
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.5);
    const gain = makeGain(ctx, 0.12);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.connect(gain);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
    currentSource = osc;
}

function playNami() {
    // Coin sparkle: bright high-pitched ping
    const ctx = getCtx();
    stopCurrent();
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.4);
    const gain = makeGain(ctx, 0.15);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.connect(gain);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
    currentSource = osc;
}

function playUsopp() {
    // Slingshot snap: quick percussive pop
    const ctx = getCtx();
    stopCurrent();
    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.15);
    const gain = makeGain(ctx, 0.2);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.connect(gain);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
    currentSource = osc;
}

function playSanji() {
    // Fire kick swoosh: whoosh + crackle
    const ctx = getCtx();
    stopCurrent();
    const bufferSize = ctx.sampleRate * 0.35;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.2);
    const gain = makeGain(ctx, 0.2);
    source.connect(filter);
    filter.connect(gain);
    source.start();
    currentSource = source;
}

function playChopper() {
    // Medical beep: clean sine tone
    const ctx = getCtx();
    stopCurrent();
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    const gain = makeGain(ctx, 0.12);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.setValueAtTime(0.12, ctx.currentTime + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    osc.connect(gain);
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
    currentSource = osc;
}

function playRobin() {
    // Magical whisper: soft chord with reverb-like decay
    const ctx = getCtx();
    stopCurrent();
    const freqs = [440, 554, 659];
    const gainNode = makeGain(ctx, 0.08);
    const oscs = freqs.map(f => {
        const o = ctx.createOscillator();
        o.type = 'sine';
        o.frequency.setValueAtTime(f, ctx.currentTime);
        o.connect(gainNode);
        o.start();
        o.stop(ctx.currentTime + 0.8);
        return o;
    });
    gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    currentSource = oscs[0];
}

function playFranky() {
    // Mechanical impact: low thud + metallic ring
    const ctx = getCtx();
    stopCurrent();
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.3);
    const gain = makeGain(ctx, 0.25);
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.connect(gain);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
    currentSource = osc;
}

function playBrook() {
    // Bone rattle / ghost echo: eerie tremolo
    const ctx = getCtx();
    stopCurrent();
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 8;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 30;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    const gain = makeGain(ctx, 0.1);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);
    osc.connect(gain);
    osc.start();
    lfo.start();
    osc.stop(ctx.currentTime + 0.9);
    lfo.stop(ctx.currentTime + 0.9);
    currentSource = osc;
}

function playJinbe() {
    // Water splash: filtered noise burst
    const ctx = getCtx();
    stopCurrent();
    const bufferSize = ctx.sampleRate * 0.5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 800;
    filter.Q.value = 0.3;
    const gain = makeGain(ctx, 0.18);
    source.connect(filter);
    filter.connect(gain);
    source.start();
    currentSource = source;
}

// --- Public API ---

const SOUND_MAP = {
    zoro: playZoro,
    luffy: playLuffy,
    nami: playNami,
    usopp: playUsopp,
    sanji: playSanji,
    chopper: playChopper,
    robin: playRobin,
    franky: playFranky,
    brook: playBrook,
    jinbe: playJinbe,
};

export function playSound(characterKey) {
    const fn = SOUND_MAP[characterKey];
    if (fn) {
        try { fn(); } catch (e) { console.warn('Sound error:', e); }
    }
}

export function stopAllSounds() {
    stopCurrent();
}
