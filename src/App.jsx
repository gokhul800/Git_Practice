import React, { useState, useCallback } from 'react';
import OceanBackground from './components/layout/OceanBackground';
import Sidebar from './components/layout/Sidebar';
import SettingsModal from './components/layout/SettingsModal';
import ScientificCalculator from './components/calculators/ScientificCalculator';
import MatrixCalculator from './components/calculators/MatrixCalculator';
import FinanceCalculator from './components/calculators/FinanceCalculator';
import FormulaEngine from './components/calculators/FormulaEngine';
import CharacterEventSystem from './components/animations/CharacterEventSystem';
import { EventProvider } from './context/EventSystemContext';
import { SettingsProvider } from './context/SettingsContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

// Animation variants for forward and back navigation
const forwardVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

const backVariants = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 },
};

function AppShell() {
  const [activeModule, setActiveModule] = useState('scientific');
  const [moduleHistory, setModuleHistory] = useState(['scientific']);
  const [navDirection, setNavDirection] = useState('forward'); // 'forward' | 'back'
  const [settingsOpen, setSettingsOpen] = useState(false);

  const navigateTo = useCallback((moduleId) => {
    if (moduleId === activeModule) return;
    setNavDirection('forward');
    setActiveModule(moduleId);
    setModuleHistory(prev => [...prev, moduleId]);
  }, [activeModule]);

  const goBack = useCallback(() => {
    if (moduleHistory.length <= 1) return;
    const newHistory = moduleHistory.slice(0, -1);
    const prevModule = newHistory[newHistory.length - 1];
    setNavDirection('back');
    setActiveModule(prevModule);
    setModuleHistory(newHistory);
  }, [moduleHistory]);

  const canGoBack = moduleHistory.length > 1;
  const variants = navDirection === 'back' ? backVariants : forwardVariants;

  return (
    <div className="relative min-h-screen flex bg-ocean-dark text-white overflow-hidden font-sans selection:bg-gold selection:text-ocean-dark">
      <OceanBackground />

      <Sidebar
        activeModule={activeModule}
        setActiveModule={navigateTo}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      <main className="flex-1 relative z-10 p-4 lg:p-8 overflow-y-auto">
        <header className="mb-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Back Button */}
            <AnimatePresence>
              {canGoBack && (
                <motion.button
                  key="back-btn"
                  initial={{ opacity: 0, x: -12, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -12, scale: 0.8 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  onClick={goBack}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium group"
                  title="Go back"
                >
                  <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                  Back
                </motion.button>
              )}
            </AnimatePresence>

            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold drop-shadow-sm">
              Navigator's Calculator
            </h1>
          </div>
          <div className="text-sm font-mono text-blue-200/60">v2.0.0</div>
        </header>

        <div className="max-w-6xl mx-auto backdrop-blur-sm bg-black/20 rounded-3xl border border-white/10 p-6 lg:p-10 min-h-[600px] shadow-2xl relative overflow-hidden">
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gold/30 rounded-tl-3xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gold/30 rounded-tr-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-gold/30 rounded-bl-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gold/30 rounded-br-3xl pointer-events-none" />

          <AnimatePresence mode="wait" custom={navDirection}>
            <motion.div
              key={activeModule}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="w-full h-full"
            >
              {activeModule === 'scientific' && <ScientificCalculator />}
              {activeModule === 'matrix' && <MatrixCalculator />}
              {activeModule === 'finance' && <FinanceCalculator />}
              {activeModule === 'formula' && <FormulaEngine />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Global Event Animation Overlay */}
      <CharacterEventSystem />

      {/* Settings Modal */}
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <SettingsProvider>
      <EventProvider>
        <AppShell />
      </EventProvider>
    </SettingsProvider>
  );
}

export default App;
