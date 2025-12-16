import React, { useState } from 'react';
import { Mic, Activity, Shield, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import VoiceVisualizer from './VoiceVisualizer';
import { analyzeInput } from '../services/geminiService';
import { AnalysisState, DemoResponse } from '../types';

const INITIAL_DATA = [
    { name: 'Sentiment', value: 0 },
    { name: 'Clarity', value: 0 },
    { name: 'Conversion', value: 0 },
];

interface AiConsoleProps {
    autoStartData?: string | null;
}

const AiConsole: React.FC<AiConsoleProps> = ({ autoStartData }) => {
    const [input, setInput] = useState('');
    const [state, setState] = useState<AnalysisState>(AnalysisState.IDLE);
    const [result, setResult] = useState<DemoResponse | null>(null);
    const [chartData, setChartData] = useState(INITIAL_DATA);

    React.useEffect(() => {
        if (autoStartData) {
            setInput(`Analyzing digital footprint for: ${autoStartData}...`);
            handleAnalyze();
        }
    }, [autoStartData]);

    const handleAnalyze = async () => {
        if (!input.trim() && state !== AnalysisState.RECORDING) return;

        setState(AnalysisState.PROCESSING);

        try {
            const response = await analyzeInput(input || "Simulated voice input about scheduling a high-ticket consultation.");
            setResult(response);
            setChartData([
                { name: 'Sentiment', value: response.metrics.sentimentScore },
                { name: 'Clarity', value: response.metrics.intentClarity },
                { name: 'Conversion', value: response.metrics.conversionProbability },
            ]);
            setState(AnalysisState.COMPLETE);
        } catch (e) {
            console.error(e);
            setState(AnalysisState.ERROR);
        }
    };

    const handleMicClick = () => {
        if (state === AnalysisState.RECORDING) {
            setState(AnalysisState.PROCESSING);
            setTimeout(() => {
                setInput("I need a solution that can handle 50,000 leads per month. What is your pricing structure?");
                handleAnalyze();
            }, 1500);
        } else {
            setState(AnalysisState.RECORDING);
            setInput('');
            setResult(null);
        }
    };

    return (
        <div className="w-full h-full min-h-[400px] p-6 grid grid-cols-1 gap-6 relative">

            {/* Input Section simulating code input */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono text-knowva-glow uppercase tracking-widest flex items-center gap-2">
                        <Activity className="w-3 h-3" />
                        Input_Vector
                    </h3>
                </div>

                <div className="relative group flex-1">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="// Waiting for voice stream or text input..."
                        className="w-full h-28 bg-knowva-bg/50 border border-white/10 rounded-sm p-4 text-sm font-mono text-knowva-text placeholder:text-knowva-muted/30 focus:outline-none focus:border-knowva-accent/50 transition-colors resize-none relative z-10"
                        disabled={state === AnalysisState.PROCESSING || state === AnalysisState.RECORDING}
                    />
                    {state === AnalysisState.RECORDING && (
                        <div className="absolute inset-0 bg-black/80 z-20 flex items-center justify-center backdrop-blur-sm rounded-sm border border-knowva-accent/30">
                            <div className="text-center">
                                <div className="animate-pulse text-red-500 font-mono text-xs mb-2">● REC</div>
                                <VoiceVisualizer isActive={true} />
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={handleMicClick}
                        className={`px-4 py-2 rounded-sm border font-mono text-xs flex items-center gap-2 transition-all ${state === AnalysisState.RECORDING
                            ? 'bg-red-500/10 border-red-500 text-red-500'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                            }`}
                    >
                        <Mic className="w-3 h-3" />
                        {state === AnalysisState.RECORDING ? 'STOP_STREAM' : 'VOICE_IN'}
                    </button>
                    <button
                        onClick={handleAnalyze}
                        disabled={state === AnalysisState.PROCESSING}
                        className="flex-1 py-2 bg-knowva-accent hover:bg-purple-500 text-white rounded-sm font-mono text-xs tracking-wide transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                    >
                        {state === AnalysisState.PROCESSING ? (
                            <span className="animate-pulse">PROCESSING...</span>
                        ) : (
                            <>
                                <Zap className="w-3 h-3" fill="currentColor" />
                                EXECUTE_ANALYSIS
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Output Section simulating data visualization */}
            <div className="border-t border-white/5 pt-6 flex flex-col">
                <h3 className="text-xs font-mono text-knowva-glow uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Shield className="w-3 h-3" />
                    Intelligence_Log
                </h3>

                {state === AnalysisState.COMPLETE && result ? (
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex-1 flex flex-col gap-4"
                        >
                            <div className="h-32 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData}>
                                        <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={['#A855F7', '#3B82F6', '#10B981'][index]} />
                                            ))}
                                        </Bar>
                                        <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 9, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="p-3 bg-white/5 border-l-2 border-knowva-accent rounded-sm">
                                <p className="text-[10px] text-knowva-glow font-mono mb-1">&gt; EXECUTIVE_SUMMARY</p>
                                <p className="text-xs text-gray-300 font-mono leading-relaxed">{result.analysis}</p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    <div className="flex-1 flex items-center justify-center flex-col gap-2 text-knowva-muted/30">
                        {state === AnalysisState.PROCESSING ? (
                            <div className="w-full text-center">
                                <div className="font-mono text-xs text-knowva-accent animate-pulse">
                                    [ DECODING SIGNAL ]
                                </div>
                                <div className="mt-2 h-1 w-full bg-white/5 overflow-hidden">
                                    <div className="h-full bg-knowva-accent animate-[shimmer_1s_infinite]" style={{ width: '30%' }}></div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <p className="font-mono text-[10px]">AWAITING DATA STREAM...</p>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AiConsole;