import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const CalcButton = ({ label, onClick, variant = 'default', className, span = 1 }) => {
    const variants = {
        default: "bg-white/5 text-gray-200 hover:bg-white/10 active:bg-white/20",
        primary: "bg-gold/20 text-gold border-gold/30 hover:bg-gold/30",
        action: "bg-blue-600/30 text-blue-100 hover:bg-blue-600/50",
        danger: "bg-red-500/20 text-red-200 hover:bg-red-500/30",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={cn(
                "rounded-xl p-4 text-lg font-medium transition-all duration-200 border border-white/5 shadow-lg backdrop-blur-sm",
                "flex items-center justify-center select-none",
                variants[variant],
                span > 1 && `col-span-${span}`,
                className
            )}
            style={{ gridColumn: span > 1 ? `span ${span} / span ${span}` : undefined }}
        >
            {label}
        </motion.button>
    );
};

export default CalcButton;
