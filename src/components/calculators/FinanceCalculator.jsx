import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CalcButton from './CalcButton';
import { useEventSystem, EVENT_TYPES } from '../../context/EventSystemContext';
import { DollarSign, TrendingUp, Percent, Home } from 'lucide-react';

const InputField = ({ label, value, onChange, icon: Icon }) => (
    <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col gap-1">
        <label className="text-gray-400 text-xs uppercase tracking-wider flex items-center gap-2">
            {Icon && <Icon size={12} />} {label}
        </label>
        <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-transparent text-xl text-white outline-none placeholder-gray-600 font-mono w-full"
            placeholder="0"
        />
    </div>
);

const ResultCard = ({ label, value, subtext }) => (
    <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-green-900/40 to-ocean-dark border border-green-500/30 rounded-xl p-4 relative overflow-hidden"
    >
        <div className="text-green-300 text-sm mb-1">{label}</div>
        <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
        {subtext && <div className="text-gray-400 text-xs mt-1">{subtext}</div>}
    </motion.div>
);

const FinanceCalculator = () => {
    const [mode, setMode] = useState('SI'); // SI, CI, EMI
    const [principal, setPrincipal] = useState('');
    const [rate, setRate] = useState('');
    const [time, setTime] = useState('');
    const [result, setResult] = useState(null);
    const { triggerEvent } = useEventSystem();

    const calculate = () => {
        const P = parseFloat(principal);
        const R = parseFloat(rate);
        const T = parseFloat(time);

        if (isNaN(P) || isNaN(R) || isNaN(T)) {
            triggerEvent(EVENT_TYPES.ERROR);
            return;
        }

        let res = {};

        try {
            if (mode === 'SI') {
                const si = (P * R * T) / 100;
                res = {
                    totalInterest: si.toFixed(2),
                    totalAmount: (P + si).toFixed(2),
                    monthly: null
                };
            } else if (mode === 'CI') {
                const amount = P * Math.pow((1 + R / 100), T);
                const ci = amount - P;
                res = {
                    totalInterest: ci.toFixed(2),
                    totalAmount: amount.toFixed(2),
                    monthly: null
                };
            } else if (mode === 'EMI') {
                // EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
                // R is monthly, T is months
                const r = R / 12 / 100;
                const n = T * 12; // Assuming Input is years

                const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
                const totalPayment = emi * n;

                res = {
                    totalInterest: (totalPayment - P).toFixed(2),
                    totalAmount: totalPayment.toFixed(2),
                    monthly: emi.toFixed(2)
                };
            }

            setResult(res);
            triggerEvent(EVENT_TYPES.FINANCE_OPERATION);
        } catch (e) {
            triggerEvent(EVENT_TYPES.ERROR);
        }
    };

    return (
        <div className="h-full flex flex-col gap-8">
            {/* Mode Selector */}
            <div className="flex gap-2 bg-black/20 p-1 rounded-xl w-fit mx-auto">
                {['SI', 'CI', 'EMI'].map((m) => (
                    <button
                        key={m}
                        onClick={() => { setMode(m); setResult(null); }}
                        className={`px-6 py-2 rounded-lg font-medium transition-all ${mode === m ? 'bg-gold text-ocean-dark shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        {m === 'SI' ? 'Simple Interest' : m === 'CI' ? 'Compound Interest' : 'EMI Loan'}
                    </button>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="flex flex-col gap-4">
                    <InputField label="Principal Amount" value={principal} onChange={setPrincipal} icon={DollarSign} />
                    <InputField label="Interest Rate (%)" value={rate} onChange={setRate} icon={Percent} />
                    <InputField label={`Time Period (${mode === 'EMI' ? 'Years' : 'Years'})`} value={time} onChange={setTime} icon={TrendingUp} />

                    <CalcButton label="Calculate" onClick={calculate} variant="primary" className="mt-4" />
                </div>

                {/* Results */}
                <div className="flex flex-col justify-center">
                    <AnimatePresence mode='wait'>
                        {result ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <ResultCard
                                    label={mode === 'EMI' ? 'Monthly EMI' : 'Total Interest'}
                                    value={`$ ${mode === 'EMI' ? result.monthly : result.totalInterest}`}
                                    subtext={mode === 'EMI' ? 'Per Month' : 'Profit gained'}
                                />
                                <ResultCard
                                    label="Total Payable Amount"
                                    value={`$ ${result.totalAmount}`}
                                />
                            </motion.div>
                        ) : (
                            <div className="text-center text-gray-500 italic flex flex-col items-center">
                                <DollarSign size={48} className="mb-2 opacity-20" />
                                Enter details to calculate finance metrics.
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default FinanceCalculator;
