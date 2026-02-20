import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX, Sparkles, Waves, Zap, Trash2 } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const Toggle = ({ label, value, onChange, icon: Icon }) => (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
        <div className="flex items-center gap-3">
            {Icon && <Icon size={16} className="text-gold/70" />}
            <span className="text-sm text-gray-200">{label}</span>
        </div>
        <button
            onClick={() => onChange(!value)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${value ? 'bg-gold' : 'bg-white/10'
                }`}
        >
            <motion.div
                className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
                animate={{ left: value ? '1.5rem' : '0.25rem' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
        </button>
    </div>
);

const IntensitySelector = ({ value, onChange }) => (
    <div className="flex items-center justify-between py-3 border-b border-white/5">
        <div className="flex items-center gap-3">
            <Zap size={16} className="text-gold/70" />
            <span className="text-sm text-gray-200">Animation Intensity</span>
        </div>
        <div className="flex gap-1 bg-white/5 rounded-lg p-1">
            {['low', 'high'].map(opt => (
                <button
                    key={opt}
                    onClick={() => onChange(opt)}
                    className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-all ${value === opt
                            ? 'bg-gold text-ocean-dark shadow-sm'
                            : 'text-gray-400 hover:text-white'
                        }`}
                >
                    {opt}
                </button>
            ))}
        </div>
    </div>
);

const SettingsModal = ({ isOpen, onClose }) => {
    const { settings, updateSetting, clearAllHistory } = useSettings();
    const overlayRef = useRef(null);

    // Close on ESC
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        if (isOpen) window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        ref={overlayRef}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="fixed z-[101] bottom-0 left-0 right-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:w-[420px] bg-ocean-dark border border-white/10 rounded-t-3xl md:rounded-2xl shadow-2xl overflow-hidden"
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '100%', opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
                            <h2 className="text-lg font-serif font-bold text-gold flex items-center gap-2">
                                ⚙️ Navigator Settings
                            </h2>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Settings list */}
                        <div className="px-6 py-2">
                            <Toggle
                                label="Character Animations"
                                value={settings.animationsEnabled}
                                onChange={(v) => updateSetting('animationsEnabled', v)}
                                icon={Sparkles}
                            />
                            <Toggle
                                label="Sound Effects"
                                value={settings.soundEnabled}
                                onChange={(v) => updateSetting('soundEnabled', v)}
                                icon={settings.soundEnabled ? Volume2 : VolumeX}
                            />
                            <IntensitySelector
                                value={settings.animationIntensity}
                                onChange={(v) => updateSetting('animationIntensity', v)}
                            />
                            <Toggle
                                label="Ocean Background Animation"
                                value={settings.oceanBgEnabled}
                                onChange={(v) => updateSetting('oceanBgEnabled', v)}
                                icon={Waves}
                            />
                        </div>

                        {/* Danger zone */}
                        <div className="px-6 pb-6 pt-2">
                            <div className="mt-2 p-3 rounded-xl bg-red-950/30 border border-red-500/20">
                                <p className="text-xs text-gray-400 mb-3">Danger Zone</p>
                                <button
                                    onClick={() => { clearAllHistory(); onClose(); }}
                                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 hover:text-red-200 text-sm font-medium transition-all"
                                >
                                    <Trash2 size={14} />
                                    Clear All History
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SettingsModal;
