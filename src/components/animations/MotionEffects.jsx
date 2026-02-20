import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, DollarSign, Activity, Skull, Waves } from 'lucide-react';

// --- ZORO: Green Sword Slice ---
export const ZoroEffect = () => (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
        >
            <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
                <motion.path
                    d="M-10,110 L110,-10"
                    stroke="#39ff14"
                    strokeWidth="2.5"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 1 }}
                    animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                    transition={{ duration: 0.5, times: [0, 0.7, 1] }}
                />
                <motion.path
                    d="M-10,80 L110,-40"
                    stroke="#20c20e"
                    strokeWidth="1.2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1, opacity: [1, 0] }}
                    transition={{ duration: 0.55, delay: 0.05, times: [0, 1] }}
                />
                <motion.path
                    d="M-10,140 L110,20"
                    stroke="#20c20e"
                    strokeWidth="1.2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1, opacity: [1, 0] }}
                    transition={{ duration: 0.55, delay: 0.08, times: [0, 1] }}
                />
                {/* Slash glow */}
                <motion.path
                    d="M-10,110 L110,-10"
                    stroke="#39ff14"
                    strokeWidth="8"
                    fill="none"
                    strokeOpacity="0.15"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1, opacity: [0.3, 0] }}
                    transition={{ duration: 0.5, times: [0, 1] }}
                />
            </svg>
        </motion.div>
        <motion.div
            className="absolute inset-0 bg-green-900/10 mix-blend-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.6, times: [0, 0.3, 1] }}
        />
    </div>
);

// --- LUFFY: Lightning & Energy Crackle ---
export const LuffyEffect = () => (
    <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
        <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: [0, 1.5, 1], rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="absolute"
        >
            <Zap size={100} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" fill="white" />
            <motion.div
                className="absolute inset-0 bg-white/50 blur-xl rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: 3, duration: 0.15 }}
            />
        </motion.div>
        {[...Array(6)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-1 bg-gradient-to-t from-yellow-300 to-white rounded-full"
                style={{
                    height: 80 + Math.random() * 40,
                    rotate: i * 60,
                    transformOrigin: 'bottom center',
                    top: '50%',
                    left: '50%',
                    marginLeft: -2,
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 0.7, delay: i * 0.04, times: [0, 0.4, 1] }}
            />
        ))}
        <motion.div
            className="absolute inset-0 bg-white/5"
            animate={{ opacity: [0, 0.3, 0, 0.2, 0] }}
            transition={{ duration: 0.6, times: [0, 0.1, 0.3, 0.5, 1] }}
        />
    </div>
);

// --- NAMI: Gold Coin Sparkles ---
export const NamiEffect = () => (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
        {[...Array(14)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute text-yellow-400 drop-shadow-md"
                initial={{
                    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800),
                    y: -50,
                    rotate: 0,
                    scale: 0,
                    opacity: 1,
                }}
                animate={{
                    y: (typeof window !== 'undefined' ? window.innerHeight : 600) + 50,
                    rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
                    scale: Math.random() * 0.6 + 0.4,
                    opacity: [1, 1, 0],
                }}
                transition={{
                    duration: 0.9 + Math.random() * 0.4,
                    ease: 'easeIn',
                    times: [0, 0.7, 1],
                }}
            >
                <DollarSign size={22} strokeWidth={3} />
            </motion.div>
        ))}
        <motion.div
            className="absolute inset-0 bg-yellow-500/10 mix-blend-color-dodge"
            initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, times: [0, 0.3, 1] }}
        />
    </div>
);

// --- USOPP: Projectile Streak + Comic Impact ---
export const UsoppEffect = () => (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
        {/* Projectile streak */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <motion.line
                x1="0" y1="50" x2="100" y2="50"
                stroke="#a3e635"
                strokeWidth="1.5"
                strokeDasharray="4 2"
                initial={{ pathLength: 0, opacity: 1 }}
                animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                transition={{ duration: 0.35, times: [0, 0.7, 1] }}
            />
            {/* Motion trail lines */}
            {[48, 46, 52, 54].map((y, i) => (
                <motion.line
                    key={i}
                    x1="0" y1={y} x2="80" y2={y}
                    stroke="#84cc16"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0, opacity: 0.6 }}
                    animate={{ pathLength: 1, opacity: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.02 }}
                />
            ))}
        </svg>

        {/* Comic impact bubble at right */}
        <motion.div
            className="absolute right-[15%] top-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.8, delay: 0.3, times: [0, 0.4, 0.6, 1] }}
        >
            <svg viewBox="0 0 80 80" width="100" height="100">
                {/* Starburst */}
                {[...Array(8)].map((_, i) => {
                    const angle = (i * 45 * Math.PI) / 180;
                    const x1 = 40 + 20 * Math.cos(angle);
                    const y1 = 40 + 20 * Math.sin(angle);
                    const x2 = 40 + 38 * Math.cos(angle);
                    const y2 = 40 + 38 * Math.sin(angle);
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#facc15" strokeWidth="3" />;
                })}
                <circle cx="40" cy="40" r="22" fill="#fef08a" stroke="#eab308" strokeWidth="2" />
                <text x="40" y="45" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#713f12" fontFamily="serif">POW!</text>
            </svg>
        </motion.div>
    </div>
);

// --- SANJI: Diagonal Fiery Kick Streak ---
export const SanjiEffect = () => (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            {/* Main kick streak */}
            <motion.path
                d="M10,90 Q50,50 90,10"
                stroke="url(#fireGrad)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 1 }}
                animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                transition={{ duration: 0.45, times: [0, 0.75, 1] }}
            />
            {/* Flame trail */}
            <motion.path
                d="M15,88 Q52,52 88,15"
                stroke="#f97316"
                strokeWidth="6"
                fill="none"
                strokeOpacity="0.3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, opacity: [0.4, 0] }}
                transition={{ duration: 0.5, times: [0, 1] }}
            />
            <motion.path
                d="M5,92 Q48,55 92,8"
                stroke="#ef4444"
                strokeWidth="1.5"
                fill="none"
                strokeOpacity="0.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, opacity: [0.6, 0] }}
                transition={{ duration: 0.5, delay: 0.05, times: [0, 1] }}
            />
            <defs>
                <linearGradient id="fireGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="50%" stopColor="#facc15" />
                    <stop offset="100%" stopColor="#fef9c3" />
                </linearGradient>
            </defs>
        </svg>

        {/* Spark particles */}
        {[...Array(8)].map((_, i) => {
            const angle = 45 + (Math.random() - 0.5) * 60;
            const dist = 30 + Math.random() * 40;
            return (
                <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-orange-400"
                    style={{ left: '50%', top: '50%' }}
                    initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                    animate={{
                        x: Math.cos((angle * Math.PI) / 180) * dist,
                        y: -Math.sin((angle * Math.PI) / 180) * dist,
                        scale: 0,
                        opacity: 0,
                    }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.03, ease: 'easeOut' }}
                />
            );
        })}

        <motion.div
            className="absolute inset-0 bg-orange-900/15 mix-blend-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.7, times: [0, 0.3, 1] }}
        />
    </div>
);

// --- CHOPPER: Medical Pulse ---
export const ChopperEffect = () => (
    <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
        {[0, 1, 2].map((i) => (
            <motion.div
                key={i}
                className="absolute border-2 border-pink-400 rounded-full"
                initial={{ width: 0, height: 0, opacity: 0.8 }}
                animate={{ width: '120vh', height: '120vh', opacity: 0 }}
                transition={{ duration: 1.0, delay: i * 0.22, ease: 'easeOut' }}
            />
        ))}
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.1, 1], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.0, times: [0, 0.3, 0.7, 1] }}
            className="text-pink-300 drop-shadow-[0_0_10px_rgba(255,105,180,0.8)]"
        >
            <Activity size={110} strokeWidth={1.5} />
        </motion.div>
    </div>
);

// --- ROBIN: Purple Ripple + Floating Formula Glyphs ---
export const RobinEffect = () => {
    const glyphs = ['∫', '∑', 'π', 'Δ', '∞', '√'];
    return (
        <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
            {/* Ripple rings */}
            {[0, 1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    className="absolute border border-purple-400/60 rounded-full"
                    initial={{ width: 0, height: 0, opacity: 1 }}
                    animate={{ width: '140vh', height: '140vh', opacity: 0 }}
                    transition={{ duration: 1.1, delay: i * 0.18, ease: 'easeOut' }}
                />
            ))}
            {/* Floating formula glyphs */}
            {glyphs.map((glyph, i) => {
                const angle = (i / glyphs.length) * 2 * Math.PI;
                const radius = 80 + Math.random() * 40;
                return (
                    <motion.div
                        key={glyph}
                        className="absolute text-purple-300 font-serif text-2xl font-bold"
                        style={{
                            left: '50%',
                            top: '50%',
                        }}
                        initial={{
                            x: Math.cos(angle) * 20 - 12,
                            y: Math.sin(angle) * 20 - 12,
                            opacity: 0,
                            scale: 0.5,
                        }}
                        animate={{
                            x: Math.cos(angle) * radius - 12,
                            y: Math.sin(angle) * radius - 12,
                            opacity: [0, 1, 1, 0],
                            scale: [0.5, 1.2, 1, 0.8],
                        }}
                        transition={{
                            duration: 1.1,
                            delay: i * 0.08,
                            times: [0, 0.3, 0.7, 1],
                            ease: 'easeOut',
                        }}
                    >
                        {glyph}
                    </motion.div>
                );
            })}
            <motion.div
                className="absolute inset-0 bg-purple-900/10 mix-blend-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.1, times: [0, 0.4, 1] }}
            />
        </div>
    );
};

// --- FRANKY: Mechanical Grid Burst ---
export const FrankyEffect = () => {
    const streakAngles = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
    return (
        <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
            {/* Grid burst SVG */}
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
                {streakAngles.map((angle, i) => {
                    const rad = (angle * Math.PI) / 180;
                    const x2 = 100 + 120 * Math.cos(rad);
                    const y2 = 100 + 120 * Math.sin(rad);
                    return (
                        <motion.line
                            key={i}
                            x1="100" y1="100"
                            x2={x2} y2={y2}
                            stroke={i % 3 === 0 ? '#22d3ee' : i % 3 === 1 ? '#0ea5e9' : '#38bdf8'}
                            strokeWidth={i % 2 === 0 ? '2' : '1'}
                            initial={{ pathLength: 0, opacity: 1 }}
                            animate={{ pathLength: [0, 1, 1], opacity: [1, 1, 0] }}
                            transition={{ duration: 0.6, delay: i * 0.02, times: [0, 0.5, 1] }}
                        />
                    );
                })}
                {/* Concentric rings */}
                {[20, 40, 60].map((r, i) => (
                    <motion.circle
                        key={i}
                        cx="100" cy="100" r={r}
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="1"
                        strokeOpacity="0.6"
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: [0, 1.5], opacity: [1, 0] }}
                        style={{ transformOrigin: '100px 100px' }}
                        transition={{ duration: 0.7, delay: i * 0.1 }}
                    />
                ))}
            </svg>

            {/* Blue energy flash */}
            <motion.div
                className="absolute inset-0 bg-cyan-400/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.6, 0] }}
                transition={{ duration: 0.3, times: [0, 0.2, 1] }}
            />

            {/* SUPER! text with metallic vibration */}
            <motion.div
                initial={{ y: 60, opacity: 0, scale: 0.5 }}
                animate={{
                    y: [60, -5, 0],
                    opacity: [0, 1, 1, 0],
                    scale: [0.5, 1.15, 1, 1],
                    x: [0, -3, 3, -2, 2, 0],
                }}
                transition={{
                    duration: 1.0,
                    times: [0, 0.3, 0.6, 1],
                    x: { duration: 0.3, delay: 0.35, repeat: 1, repeatType: 'mirror' },
                }}
                className="relative z-10 text-cyan-300 font-black text-7xl tracking-tighter"
                style={{
                    textShadow: '0 0 20px #22d3ee, 0 0 40px #0ea5e9, 2px 2px 0 #0c4a6e',
                    fontFamily: 'serif',
                }}
            >
                SUPER!
            </motion.div>
        </div>
    );
};

// --- BROOK: Ghost Error ---
export const BrookEffect = () => (
    <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
        <motion.div
            initial={{ y: 50, opacity: 0, rotate: -10 }}
            animate={{ y: 0, opacity: 1, rotate: [0, -5, 5, -3, 0] }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 1.0 }}
            className="text-purple-300 flex flex-col items-center"
        >
            <Skull size={80} className="mb-4 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
            <motion.span
                className="font-serif italic text-2xl text-purple-200"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 0.4, repeat: 2 }}
            >
                Yohohoho... Error!
            </motion.span>
        </motion.div>
    </div>
);

// --- JINBE: Water Splash ---
export const JinbeEffect = () => (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
        <motion.div
            initial={{ x: '-110%' }}
            animate={{ x: '110%' }}
            transition={{ duration: 1.0, ease: 'easeInOut' }}
            className="absolute top-0 bottom-0 w-40 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent skew-x-12 blur-lg"
        />
        <motion.div
            initial={{ x: '110%' }}
            animate={{ x: '-110%' }}
            transition={{ duration: 1.0, ease: 'easeInOut', delay: 0.15 }}
            className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-blue-300/25 to-transparent skew-x-12 blur-xl"
        />
        {/* Water droplets */}
        {[...Array(6)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-2 h-3 rounded-full bg-blue-300/70"
                style={{ left: `${20 + i * 12}%`, top: '40%' }}
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: -60 - Math.random() * 40, x: (Math.random() - 0.5) * 30, opacity: 0 }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.05 }}
            />
        ))}
        <div className="absolute inset-0 flex items-center justify-center opacity-15">
            <Waves size={200} className="text-blue-400" />
        </div>
    </div>
);
