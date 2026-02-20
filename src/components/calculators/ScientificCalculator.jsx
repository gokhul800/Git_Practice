import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, RotateCcw, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import CalcButton from './CalcButton';
import { evaluateExpression } from '../../utils/mathEvaluator';
import { useEventSystem, EVENT_TYPES } from '../../context/EventSystemContext';
import { useSettings } from '../../context/SettingsContext';

const ScientificCalculator = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [history, setHistory] = useState([]);
    const [copied, setCopied] = useState(false);
    const [showFullExpr, setShowFullExpr] = useState(false);
    const { triggerEvent } = useEventSystem();
    const { clearHistoryToken } = useSettings();
    const resultRef = useRef(null);

    // Load history from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('calc_history');
        if (saved) setHistory(JSON.parse(saved));
    }, []);

    // Save history to localStorage
    useEffect(() => {
        localStorage.setItem('calc_history', JSON.stringify(history));
    }, [history]);

    // Listen for global clear history event
    useEffect(() => {
        if (clearHistoryToken > 0) setHistory([]);
    }, [clearHistoryToken]);

    const handleInput = (val) => setInput(prev => prev + val);
    const handleClear = () => { setInput(''); setResult(''); };
    const handleBackspace = () => setInput(prev => prev.slice(0, -1));

    const handleCalculate = () => {
        if (!input) return;
        try {
            const res = evaluateExpression(input);
            setResult(res);
            const newItem = { expression: input, result: res, timestamp: Date.now() };
            setHistory(prev => [newItem, ...prev].slice(0, 50));

            if (res === 'Error' || res === 'NaN') {
                triggerEvent(EVENT_TYPES.ERROR);
            } else if (parseFloat(res) > 1000000) {
                triggerEvent(EVENT_TYPES.LARGE_RESULT);
            } else {
                triggerEvent(EVENT_TYPES.CALC_SUCCESS);
            }
        } catch {
            setResult('Error');
            triggerEvent(EVENT_TYPES.ERROR);
        }
    };

    const handleCopy = useCallback(() => {
        if (!result) return;
        navigator.clipboard.writeText(result).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }, [result]);

    const isLongResult = result && result.toString().length > 15;
    const isLongExpr = input && input.length > 40;

    const buttons = [
        { label: 'C', onClick: handleClear, variant: 'danger' },
        { label: '(', onClick: () => handleInput('(') },
        { label: ')', onClick: () => handleInput(')') },
        { label: 'DEL', onClick: handleBackspace, variant: 'danger' },
        { label: 'sin', onClick: () => handleInput('sin(') },
        { label: 'cos', onClick: () => handleInput('cos(') },
        { label: 'tan', onClick: () => handleInput('tan(') },
        { label: '÷', onClick: () => handleInput('÷'), variant: 'action' },
        { label: '7', onClick: () => handleInput('7') },
        { label: '8', onClick: () => handleInput('8') },
        { label: '9', onClick: () => handleInput('9') },
        { label: '×', onClick: () => handleInput('×'), variant: 'action' },
        { label: '4', onClick: () => handleInput('4') },
        { label: '5', onClick: () => handleInput('5') },
        { label: '6', onClick: () => handleInput('6') },
        { label: '-', onClick: () => handleInput('-'), variant: 'action' },
        { label: '1', onClick: () => handleInput('1') },
        { label: '2', onClick: () => handleInput('2') },
        { label: '3', onClick: () => handleInput('3') },
        { label: '+', onClick: () => handleInput('+'), variant: 'action' },
        { label: '0', onClick: () => handleInput('0'), span: 2 },
        { label: '.', onClick: () => handleInput('.') },
        { label: '=', onClick: handleCalculate, variant: 'primary' },
    ];

    const sciButtons = [
        { label: 'ln', onClick: () => handleInput('log(') },
        { label: 'log', onClick: () => handleInput('log10(') },
        { label: 'x²', onClick: () => handleInput('^2') },
        { label: '√', onClick: () => handleInput('sqrt(') },
        { label: 'x^y', onClick: () => handleInput('^') },
        { label: 'π', onClick: () => handleInput('pi') },
        { label: 'e', onClick: () => handleInput('e') },
        { label: 'mod', onClick: () => handleInput(' mod ') },
        { label: '!', onClick: () => handleInput('!') },
        { label: 'abs', onClick: () => handleInput('abs(') },
    ];

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-full">
            <div className="flex-1 flex flex-col gap-4">
                {/* Result Display */}
                <div className="bg-wood-dark border-4 border-wood rounded-2xl p-4 shadow-inner relative overflow-hidden min-h-[120px] flex flex-col justify-end">
                    <div className="absolute inset-0 opacity-20 pointer-events-none"
                        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")' }} />

                    {/* Expression row */}
                    <div className="flex items-start gap-2 mb-1">
                        <div className={`text-gray-400 text-sm font-mono flex-1 text-right ${isLongExpr && !showFullExpr ? 'truncate' : 'break-all'}`}>
                            {input || '0'}
                        </div>
                        {isLongExpr && (
                            <button
                                onClick={() => setShowFullExpr(v => !v)}
                                className="text-gray-500 hover:text-gray-300 flex-shrink-0 mt-0.5"
                                title={showFullExpr ? 'Collapse' : 'View full expression'}
                            >
                                {showFullExpr ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>
                        )}
                    </div>

                    {/* Result row — horizontal scroll for long results */}
                    <div className="flex items-center gap-2">
                        <div
                            ref={resultRef}
                            className={`flex-1 text-right overflow-x-auto custom-scrollbar ${isLongResult ? 'pb-1' : ''}`}
                        >
                            <span className="text-4xl text-gold font-bold font-serif tracking-wider text-glow whitespace-nowrap font-mono">
                                {result || (input ? '...' : '0')}
                            </span>
                        </div>
                        {result && result !== 'Error' && (
                            <motion.button
                                onClick={handleCopy}
                                whileTap={{ scale: 0.9 }}
                                className="flex-shrink-0 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-gold transition-colors"
                                title="Copy result"
                            >
                                <AnimatePresence mode="wait">
                                    {copied
                                        ? <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }}><Check size={14} className="text-green-400" /></motion.div>
                                        : <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }}><Copy size={14} /></motion.div>
                                    }
                                </AnimatePresence>
                            </motion.button>
                        )}
                    </div>
                </div>

                {/* Keypad */}
                <div className="grid grid-cols-4 gap-3">
                    <div className="col-span-4 grid grid-cols-5 gap-2 mb-2">
                        {sciButtons.map((btn, i) => (
                            <CalcButton key={i} {...btn} variant="default" className="text-sm py-2 bg-white/5" />
                        ))}
                    </div>
                    {buttons.map((btn, i) => (
                        <CalcButton key={i + 100} {...btn} />
                    ))}
                </div>
            </div>

            {/* History Panel */}
            <div className="lg:w-80 bg-black/20 rounded-xl border border-white/5 flex flex-col overflow-hidden">
                {/* Sticky header */}
                <div className="sticky top-0 z-10 p-4 border-b border-white/10 flex justify-between items-center bg-black/40 backdrop-blur-sm">
                    <h3 className="flex items-center gap-2 text-gold font-serif">
                        <History size={18} /> Log
                    </h3>
                    <button
                        onClick={() => setHistory([])}
                        className="text-xs text-red-300 hover:text-red-200 flex items-center gap-1"
                    >
                        <RotateCcw size={12} /> Clear
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar max-h-[420px]">
                    <AnimatePresence>
                        {history.map((item) => (
                            <motion.div
                                key={item.timestamp}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors border border-transparent hover:border-white/10"
                                onClick={() => { setInput(item.expression); setResult(item.result); }}
                            >
                                <div className="text-xs text-gray-400 mb-1 font-mono truncate">{item.expression} =</div>
                                <div className="text-right text-gold font-medium font-mono truncate">{item.result}</div>
                            </motion.div>
                        ))}
                        {history.length === 0 && (
                            <div className="text-center text-gray-500 py-8 text-sm italic">No calculations yet.</div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default ScientificCalculator;
