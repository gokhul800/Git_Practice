import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const SettingsContext = createContext(null);

const STORAGE_KEY = 'straw_hat_settings';

const defaultSettings = {
    soundEnabled: true,
    animationsEnabled: true,
    animationIntensity: 'high', // 'low' | 'high'
    oceanBgEnabled: true,
};

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
        } catch {
            return defaultSettings;
        }
    });

    // Listeners for "clear history" event
    const [clearHistoryToken, setClearHistoryToken] = useState(0);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        } catch { /* ignore */ }
    }, [settings]);

    const updateSetting = useCallback((key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    }, []);

    const clearAllHistory = useCallback(() => {
        setClearHistoryToken(t => t + 1);
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, updateSetting, clearAllHistory, clearHistoryToken }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const ctx = useContext(SettingsContext);
    if (!ctx) throw new Error('useSettings must be used within a SettingsProvider');
    return ctx;
};
