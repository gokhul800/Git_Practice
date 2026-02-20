import React from 'react';
import { motion } from 'framer-motion';
import { useSettings } from '../../context/SettingsContext';

const OceanBackground = () => {
    const { settings } = useSettings();

    if (!settings.oceanBgEnabled) {
        // Static dark gradient when animation is disabled
        return (
            <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-ocean-dark via-ocean-medium to-ocean-dark" />
        );
    }

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-gradient-to-b from-ocean-dark via-ocean-medium to-ocean-dark">
            {/* Deep Ocean Gradient Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-40 mix-blend-overlay" />

            {/* Floating Particles (Bubbles) */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={`bubble-${i}`}
                    className="absolute rounded-full bg-white/10 backdrop-blur-sm"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: window.innerHeight + 100,
                        scale: Math.random() * 0.5 + 0.5,
                        opacity: 0,
                    }}
                    animate={{
                        y: -100,
                        opacity: [0, 0.4, 0],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 15,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: Math.random() * 20,
                    }}
                    style={{
                        width: Math.random() * 10 + 4 + 'px',
                        height: Math.random() * 10 + 4 + 'px',
                    }}
                />
            ))}

            {/* Subtle Water Ripples (SVG) */}
            <div className="absolute bottom-0 left-0 w-full h-[30%] opacity-20 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <motion.path
                        fill="#005580"
                        fillOpacity="1"
                        d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,202.7C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        animate={{
                            d: [
                                "M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,202.7C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                                "M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,170.7C960,160,1056,192,1152,213.3C1248,235,1344,245,1392,250.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                                "M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,202.7C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                            ],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </svg>
            </div>

            {/* Slow Clouds / Fog */}
            <motion.div
                className="absolute top-0 left-0 w-[200%] h-full opacity-10 pointer-events-none bg-gradient-to-r from-transparent via-white to-transparent"
                animate={{ x: ['-50%', '0%'] }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                style={{ mixBlendMode: 'overlay' }}
            />

            {/* Ambient Glow */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        </div>
    );
};

export default OceanBackground;
