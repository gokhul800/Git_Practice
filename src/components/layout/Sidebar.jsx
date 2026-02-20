import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, Grid3X3, DollarSign, FlaskConical, Settings } from 'lucide-react';
import { cn } from '../../utils/cn';

const NavItem = ({ icon: Icon, label, isActive, onClick }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={cn(
                "flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 w-full group",
                isActive
                    ? "bg-gold/10 border-2 border-gold text-gold shadow-[0_0_15px_rgba(255,215,0,0.3)]"
                    : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/30"
            )}
        >
            <Icon className={cn("w-6 h-6 mb-2", isActive && "animate-pulse")} />
            <span className="text-xs font-serif tracking-widest">{label}</span>
        </motion.button>
    );
};

const Sidebar = ({ activeModule, setActiveModule, onOpenSettings }) => {
    const modules = [
        { id: 'scientific', label: 'Scientific', icon: Calculator },
        { id: 'matrix', label: 'Matrix', icon: Grid3X3 },
        { id: 'finance', label: 'Finance', icon: DollarSign },
        { id: 'formula', label: 'Formulas', icon: FlaskConical },
    ];

    return (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-24 lg:w-32 flex flex-col items-center py-8 gap-4 bg-ocean-dark/80 backdrop-blur-md border-r border-white/10 z-10 h-screen"
        >
            <div className="mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-orange-500 flex items-center justify-center shadow-lg">
                    <span className="font-serif font-bold text-ocean-dark text-xl">☠️</span>
                </div>
            </div>

            <nav className="flex-1 w-full px-2 flex flex-col gap-4">
                {modules.map((mod) => (
                    <NavItem
                        key={mod.id}
                        {...mod}
                        isActive={activeModule === mod.id}
                        onClick={() => setActiveModule(mod.id)}
                    />
                ))}
            </nav>

            <div className="mt-auto px-2 w-full">
                <NavItem icon={Settings} label="Settings" onClick={onOpenSettings} isActive={false} />
            </div>
        </motion.div>
    );
};

export default Sidebar;
