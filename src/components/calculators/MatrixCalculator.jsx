import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { matrixOperations, createEmptyMatrix } from '../../utils/matrixOperations';
import { useEventSystem, EVENT_TYPES } from '../../context/EventSystemContext';
import CalcButton from './CalcButton';

const MatrixInput = ({ label, rows, cols, values, onChange, onResize }) => {
    return (
        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-gold font-serif font-bold">{label}</h3>
                <div className="flex gap-2 text-xs">
                    <div className="flex items-center gap-1">
                        <span className="text-gray-400">R:</span>
                        <select
                            value={rows}
                            onChange={(e) => onResize(Number(e.target.value), cols)}
                            className="bg-black/40 border border-white/20 rounded px-1 text-white focus:outline-none focus:border-gold"
                        >
                            {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-gray-400">C:</span>
                        <select
                            value={cols}
                            onChange={(e) => onResize(rows, Number(e.target.value))}
                            className="bg-black/40 border border-white/20 rounded px-1 text-white focus:outline-none focus:border-gold"
                        >
                            {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {/* Scrollable matrix grid for large matrices */}
            <div className="overflow-auto custom-scrollbar max-h-48">
                <div
                    className="grid gap-2"
                    style={{ gridTemplateColumns: `repeat(${cols}, minmax(56px, 1fr))` }}
                >
                    {values.map((row, r) =>
                        row.map((val, c) => (
                            <input
                                key={`${r}-${c}`}
                                type="number"
                                value={val}
                                onChange={(e) => onChange(r, c, e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded p-2 text-center text-white focus:border-gold focus:outline-none focus:bg-white/10 transition-colors min-w-[56px]"
                                placeholder="0"
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

const MatrixResult = ({ result, label }) => {
    if (!result) return null;

    if (typeof result === 'number') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-wood-dark border-2 border-wood rounded-xl p-4 mt-4 text-center"
            >
                <h4 className="text-gray-400 text-sm mb-1">{label} Result</h4>
                <div className="text-3xl text-gold font-bold text-glow font-mono">{result}</div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-wood-dark border-2 border-wood rounded-xl p-6 mt-4 relative overflow-hidden"
        >
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")' }} />
            <h4 className="text-gray-400 text-sm mb-4 text-center">{label} Result</h4>
            {/* Scrollable result grid */}
            <div className="overflow-auto custom-scrollbar max-h-48">
                <div
                    className="grid gap-2 mx-auto w-fit"
                    style={{ gridTemplateColumns: `repeat(${result[0].length}, minmax(56px, 1fr))` }}
                >
                    {result.map((row, r) =>
                        row.map((val, c) => (
                            <div key={`${r}-${c}`} className="p-3 bg-black/30 rounded text-center text-gold font-medium border border-gold/10 min-w-[56px] font-mono text-sm">
                                {typeof val === 'number' ? val.toFixed(3).replace(/\.?0+$/, '') : val}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const MatrixCalculator = () => {
    const [dimA, setDimA] = useState({ r: 3, c: 3 });
    const [dimB, setDimB] = useState({ r: 3, c: 3 });
    const [matA, setMatA] = useState(createEmptyMatrix(3, 3));
    const [matB, setMatB] = useState(createEmptyMatrix(3, 3));
    const [result, setResult] = useState(null);
    const [resultLabel, setResultLabel] = useState('');
    const [error, setError] = useState('');
    const { triggerEvent } = useEventSystem();

    const handleResize = (matrix, r, c) => {
        const newMat = createEmptyMatrix(r, c);
        const source = matrix === 'A' ? matA : matB;
        for (let i = 0; i < Math.min(r, source.length); i++) {
            for (let j = 0; j < Math.min(c, source[0].length); j++) {
                newMat[i][j] = source[i][j];
            }
        }
        if (matrix === 'A') { setDimA({ r, c }); setMatA(newMat); }
        else { setDimB({ r, c }); setMatB(newMat); }
    };

    const handleChange = (matrix, r, c, val) => {
        const setMat = matrix === 'A' ? setMatA : setMatB;
        setMat(prev => {
            const copy = prev.map(row => [...row]);
            copy[r][c] = val;
            return copy;
        });
    };

    const executeOp = (op) => {
        setError('');
        setResult(null);
        try {
            const a = matA.map(row => row.map(v => Number(v) || 0));
            const b = matB.map(row => row.map(v => Number(v) || 0));
            let res;
            switch (op) {
                case 'ADD': res = matrixOperations.add(a, b); setResultLabel('A + B'); break;
                case 'SUB': res = matrixOperations.subtract(a, b); setResultLabel('A - B'); break;
                case 'MUL': res = matrixOperations.multiply(a, b); setResultLabel('A × B'); break;
                case 'DET_A': res = matrixOperations.determinant(a); setResultLabel('det(A)'); break;
                case 'DET_B': res = matrixOperations.determinant(b); setResultLabel('det(B)'); break;
                case 'INV_A': res = matrixOperations.inverse(a); setResultLabel('inv(A)'); break;
                case 'TRANS_A': res = matrixOperations.transpose(a); setResultLabel('Aᵀ'); break;
                default: return;
            }
            setResult(res);
            triggerEvent(EVENT_TYPES.MATRIX_OPERATION);
        } catch (err) {
            setError(err.message);
            triggerEvent(EVENT_TYPES.ERROR);
        }
    };

    return (
        <div className="h-full flex flex-col gap-4">
            {/* Matrix inputs — scrollable */}
            <div className="flex-1 grid md:grid-cols-2 gap-6 overflow-y-auto custom-scrollbar pr-1 max-h-[50vh]">
                <MatrixInput
                    label="Matrix A" rows={dimA.r} cols={dimA.c} values={matA}
                    onChange={(r, c, v) => handleChange('A', r, c, v)}
                    onResize={(r, c) => handleResize('A', r, c)}
                />
                <MatrixInput
                    label="Matrix B" rows={dimB.r} cols={dimB.c} values={matB}
                    onChange={(r, c, v) => handleChange('B', r, c, v)}
                    onResize={(r, c) => handleResize('B', r, c)}
                />
            </div>

            {/* Operations Toolbar */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 bg-black/20 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                <CalcButton label="A + B" onClick={() => executeOp('ADD')} variant="action" className="text-sm font-bold" />
                <CalcButton label="A - B" onClick={() => executeOp('SUB')} variant="action" className="text-sm font-bold" />
                <CalcButton label="A × B" onClick={() => executeOp('MUL')} variant="action" className="text-sm font-bold" />
                <div className="border-l border-white/10 mx-2 hidden lg:block" />
                <CalcButton label="det(A)" onClick={() => executeOp('DET_A')} className="text-sm bg-white/5" />
                <CalcButton label="inv(A)" onClick={() => executeOp('INV_A')} className="text-sm bg-white/5" />
                <CalcButton label="Trans(A)" onClick={() => executeOp('TRANS_A')} className="text-sm bg-white/5" />
                <CalcButton label="det(B)" onClick={() => executeOp('DET_B')} className="text-sm bg-white/5" />
            </div>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg text-center"
                    >
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>

            <MatrixResult result={result} label={resultLabel} />
        </div>
    );
};

export default MatrixCalculator;
