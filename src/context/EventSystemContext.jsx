import React, { createContext, useContext, useState, useCallback } from 'react';

const EventContext = createContext(null);

export const EVENT_TYPES = {
    CALC_SUCCESS: 'CALC_SUCCESS',
    ERROR: 'ERROR',
    LARGE_RESULT: 'LARGE_RESULT',
    MATRIX_OPERATION: 'MATRIX_OPERATION',
    PHYSICS_OPERATION: 'PHYSICS_OPERATION',
    FINANCE_OPERATION: 'FINANCE_OPERATION',
    HEALTH_OPERATION: 'HEALTH_OPERATION',
    FORMULA_SOLVED: 'FORMULA_SOLVED',
    USOPP_SHOT: 'USOPP_SHOT',
    SANJI_KICK: 'SANJI_KICK',
};

export const EventProvider = ({ children }) => {
    const [activeEvent, setActiveEvent] = useState(null);

    const triggerEvent = useCallback((type) => {
        if (activeEvent) return;
        setActiveEvent(type);
        setTimeout(() => {
            setActiveEvent(null);
        }, 1500);
    }, [activeEvent]);

    return (
        <EventContext.Provider value={{ activeEvent, triggerEvent }}>
            {children}
        </EventContext.Provider>
    );
};

export const useEventSystem = () => {
    const context = useContext(EventContext);
    if (!context) throw new Error('useEventSystem must be used within an EventProvider');
    return context;
};
