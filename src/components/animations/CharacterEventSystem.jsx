import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useEventSystem, EVENT_TYPES } from '../../context/EventSystemContext';
import { useSettings } from '../../context/SettingsContext';
import { playSound } from '../../utils/soundManager';
import {
    ZoroEffect,
    LuffyEffect,
    NamiEffect,
    ChopperEffect,
    RobinEffect,
    FrankyEffect,
    BrookEffect,
    JinbeEffect,
    UsoppEffect,
    SanjiEffect,
} from './MotionEffects';

// Map each event to its character key for sound
const EVENT_SOUND_MAP = {
    [EVENT_TYPES.CALC_SUCCESS]: 'zoro',
    [EVENT_TYPES.LARGE_RESULT]: 'luffy',
    [EVENT_TYPES.FINANCE_OPERATION]: 'nami',
    [EVENT_TYPES.HEALTH_OPERATION]: 'chopper',
    [EVENT_TYPES.FORMULA_SOLVED]: 'robin',
    [EVENT_TYPES.MATRIX_OPERATION]: 'franky',
    [EVENT_TYPES.ERROR]: 'brook',
    [EVENT_TYPES.PHYSICS_OPERATION]: 'jinbe',
    [EVENT_TYPES.USOPP_SHOT]: 'usopp',
    [EVENT_TYPES.SANJI_KICK]: 'sanji',
};

const CharacterEventSystem = () => {
    const { activeEvent } = useEventSystem();
    const { settings } = useSettings();

    // Play sound when event fires
    useEffect(() => {
        if (!activeEvent) return;
        if (settings.soundEnabled) {
            const key = EVENT_SOUND_MAP[activeEvent];
            if (key) playSound(key);
        }
    }, [activeEvent, settings.soundEnabled]);

    // Skip rendering animations if disabled
    if (!settings.animationsEnabled) return null;

    return (
        <AnimatePresence mode="wait">
            {activeEvent === EVENT_TYPES.CALC_SUCCESS && <ZoroEffect key="zoro" />}
            {activeEvent === EVENT_TYPES.LARGE_RESULT && <LuffyEffect key="luffy" />}
            {activeEvent === EVENT_TYPES.FINANCE_OPERATION && <NamiEffect key="nami" />}
            {activeEvent === EVENT_TYPES.HEALTH_OPERATION && <ChopperEffect key="chopper" />}
            {activeEvent === EVENT_TYPES.FORMULA_SOLVED && <RobinEffect key="robin" />}
            {activeEvent === EVENT_TYPES.MATRIX_OPERATION && <FrankyEffect key="franky" />}
            {activeEvent === EVENT_TYPES.ERROR && <BrookEffect key="brook" />}
            {activeEvent === EVENT_TYPES.PHYSICS_OPERATION && <JinbeEffect key="jinbe" />}
            {activeEvent === EVENT_TYPES.USOPP_SHOT && <UsoppEffect key="usopp" />}
            {activeEvent === EVENT_TYPES.SANJI_KICK && <SanjiEffect key="sanji" />}
        </AnimatePresence>
    );
};

export default CharacterEventSystem;
