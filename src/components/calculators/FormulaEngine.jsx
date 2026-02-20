import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FlaskConical, ArrowRight, Copy, Check } from 'lucide-react';
import { FORMULA_DB, CATEGORIES } from '../../utils/formulaDatabase';
import { evaluateExpression } from '../../utils/mathEvaluator';
import { useEventSystem, EVENT_TYPES } from '../../context/EventSystemContext';
import CalcButton from '../calculators/CalcButton';

const FormulaEngine = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedFormula, setSelectedFormula] = useState(null);
    const [inputs, setInputs] = useState({});
    const [result, setResult] = useState(null);
    const [copied, setCopied] = useState(false);
    const { triggerEvent } = useEventSystem();
    const searchRef = useRef(null);

    const filteredFormulas = useMemo(() => {
        return FORMULA_DB.filter(f => {
            const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || f.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory]);

    const handleSelectFormula = (formula) => {
        setSelectedFormula(formula);
        setResult(null);
        setInputs({});
    };

    const handleInputChange = (name, value) => {
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const solve = () => {
        if (!selectedFormula) return;
        try {
            let finalExpr = selectedFormula.formula;
            selectedFormula.inputs.forEach(input => {
                const val = inputs[input.name] || 0;
                const regex = new RegExp(`\\b${input.name}\\b`, 'g');
                finalExpr = finalExpr.replace(regex, `(${val})`);
            });
            const res = evaluateExpression(finalExpr);
            setResult(res);

            if (selectedFormula.category === 'Physics') triggerEvent(EVENT_TYPES.PHYSICS_OPERATION);
            else if (selectedFormula.category === 'Health') triggerEvent(EVENT_TYPES.HEALTH_OPERATION);
            else if (selectedFormula.category === 'Finance') triggerEvent(EVENT_TYPES.SANJI_KICK);
            else if (selectedFormula.category === 'Geometry') triggerEvent(EVENT_TYPES.USOPP_SHOT);
            else triggerEvent(EVENT_TYPES.FORMULA_SOLVED);
        } catch {
            setResult('Error');
            triggerEvent(EVENT_TYPES.ERROR);
        }
    };

    const handleCopy = () => {
        if (!result) return;
        navigator.clipboard.writeText(result).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="h-full flex flex-col gap-4">
            {!selectedFormula ? (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col gap-4 h-full"
                >
                    {/* Sticky search + categories */}
                    <div className="sticky top-0 z-10 bg-black/40 backdrop-blur-md rounded-2xl p-3 border border-white/5 flex flex-col gap-3">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                ref={searchRef}
                                type="text"
                                placeholder="Search formulas (e.g. 'Area', 'Force')..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:border-gold focus:outline-none"
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap border transition-all ${selectedCategory === cat
                                            ? 'bg-gold text-ocean-dark border-gold font-bold'
                                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Formula grid — scrollable */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
                            {filteredFormulas.map(formula => (
                                <motion.div
                                    key={formula.id}
                                    layoutId={formula.id}
                                    onClick={() => handleSelectFormula(formula)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="bg-white/5 border border-white/10 p-5 rounded-xl cursor-pointer hover:border-gold/50 group flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="bg-blue-500/20 text-blue-200 text-xs px-2 py-1 rounded">{formula.category}</div>
                                            <ArrowRight size={16} className="text-gray-500 group-hover:text-gold transition-colors -rotate-45 group-hover:rotate-0" />
                                        </div>
                                        <h3 className="font-serif font-bold text-lg text-gray-100 group-hover:text-gold transition-colors">{formula.name}</h3>
                                        <p className="text-sm text-gray-400 mt-1 line-clamp-2">{formula.description}</p>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-white/5">
                                        <code className="text-xs font-mono text-green-300 bg-black/20 px-2 py-1 rounded block w-fit">
                                            {formula.formula}
                                        </code>
                                    </div>
                                </motion.div>
                            ))}
                            {filteredFormulas.length === 0 && (
                                <div className="col-span-3 text-center text-gray-500 py-12 italic">
                                    No formulas found for "{searchTerm}"
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col h-full"
                >
                    <button
                        onClick={() => setSelectedFormula(null)}
                        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 w-fit"
                    >
                        <ArrowRight className="rotate-180" size={18} /> Back to Search
                    </button>

                    <div className="grid lg:grid-cols-2 gap-8 flex-1 overflow-y-auto custom-scrollbar">
                        <div className="flex flex-col gap-6">
                            <div>
                                <h2 className="text-3xl font-serif font-bold text-gold mb-2">{selectedFormula.name}</h2>
                                <p className="text-gray-300">{selectedFormula.description}</p>
                                <div className="mt-4 bg-black/30 p-4 rounded-xl border border-white/10 font-mono text-green-300 text-lg overflow-x-auto custom-scrollbar">
                                    {selectedFormula.formula}
                                </div>
                            </div>

                            <div className="space-y-4">
                                {selectedFormula.inputs.map(input => (
                                    <div key={input.name} className="flex flex-col gap-1">
                                        <label className="text-sm text-gray-400 font-mono flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">{input.name}</span>
                                            {input.label}
                                        </label>
                                        <input
                                            type="number"
                                            value={inputs[input.name] || ''}
                                            onChange={(e) => handleInputChange(input.name, e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold focus:outline-none"
                                            placeholder="Enter value..."
                                        />
                                    </div>
                                ))}
                            </div>

                            <CalcButton label="Solve Formula" onClick={solve} variant="primary" className="mt-auto" />
                        </div>

                        {/* Result panel */}
                        <div className="bg-black/20 rounded-2xl border border-white/10 p-8 flex flex-col items-center justify-center relative overflow-hidden">
                            {!result ? (
                                <div className="text-center opacity-30">
                                    <FlaskConical size={64} className="mx-auto mb-4" />
                                    <p>Fill in parameters to solve</p>
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-center relative z-10 w-full"
                                >
                                    <div className="text-gray-400 text-sm uppercase tracking-widest mb-2">Calculated Result</div>
                                    <div className="overflow-x-auto custom-scrollbar pb-1">
                                        <div className="text-5xl lg:text-6xl font-serif font-bold text-gold text-glow mb-2 font-mono whitespace-nowrap inline-block">
                                            {result}
                                        </div>
                                    </div>
                                    {selectedFormula.unit && (
                                        <div className="text-2xl text-blue-300 font-mono">{selectedFormula.unit}</div>
                                    )}
                                    {result !== 'Error' && (
                                        <button
                                            onClick={handleCopy}
                                            className="mt-4 flex items-center gap-2 mx-auto px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-gold text-sm transition-all"
                                        >
                                            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                                            {copied ? 'Copied!' : 'Copy Result'}
                                        </button>
                                    )}
                                </motion.div>
                            )}
                            <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full scale-150 animate-pulse pointer-events-none" />
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default FormulaEngine;
