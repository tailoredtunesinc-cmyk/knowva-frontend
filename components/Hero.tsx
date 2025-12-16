import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Mic } from 'lucide-react';
import AiConsole from './AiConsole';
import LeadForm, { LeadData } from './LeadForm';
import VoiceDemo from './VoiceDemo';
import { apiService } from '../services/apiService';
import toast, { Toaster } from 'react-hot-toast';

const Hero: React.FC = () => {
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const [isVoiceDemoOpen, setIsVoiceDemoOpen] = React.useState(false);
    const [leadData, setLeadData] = React.useState<LeadData | null>(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleLeadSubmit = async (data: LeadData) => {
        setIsSubmitting(true);

        try {
            const result = await apiService.submitLead(data);

            if (result.success) {
                setLeadData(data);
                toast.success('Lead submitted successfully! Our AI is analyzing your website now.');
                // Close form and show success
                setTimeout(() => {
                    setIsFormOpen(false);
                    setIsSubmitting(false);
                }, 2000);
            } else {
                toast.error(`Failed to submit lead: ${result.error}`);
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error('Lead submission error:', error);
            toast.error('Failed to submit lead. Please try again.');
            setIsSubmitting(false);
        }
    };
    return (
        <section className="min-h-screen w-full bg-knowva-bg text-white flex flex-col lg:flex-row overflow-hidden relative">

            {/* Background Ambience */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" style={{ backgroundSize: '40px 40px' }} />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-knowva-accent/5 rounded-full blur-[120px] pointer-events-none" />

            {/* LEFT PANEL: Value Proposition */}
            <div className="w-full lg:w-7/12 xl:w-2/3 flex flex-col justify-center px-8 py-24 lg:p-20 relative z-10">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8"
                    >
                        <span className="w-2 h-2 rounded-full bg-knowva-accent animate-pulse" />
                        <span className="text-xs font-mono tracking-widest uppercase text-knowva-muted">
                            System Operational // v3.0
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="font-display text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
                    >
                        Voice AI Agents That <span className="text-knowva-accent">Close.</span> <br />
                        <span className="text-white/30">Not Just Chat.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-knowva-muted font-light leading-relaxed max-w-2xl mb-10"
                    >
                        We deploy hyper-intelligent voice infrastructure that qualifies leads, handles objections, and books high-ticket meetings with the precision of a top-tier consultant.
                    </motion.p>

                    <motion.div
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.8, delay: 0.3 }}
                         className="flex flex-col sm:flex-row gap-4"
                     >
                         <button
                             onClick={() => setIsFormOpen(true)}
                             disabled={isSubmitting}
                             className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-knowva-accent text-white font-bold rounded-lg shadow-lg hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.6)] hover:-translate-y-1 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                         >
                             <span className="tracking-wide">
                                 {isSubmitting ? 'SUBMITTING...' : 'START INSTANT AI DEMO'}
                             </span>
                             <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                         </button>

                         <button
                             onClick={() => setIsVoiceDemoOpen(true)}
                             className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-lg shadow-lg hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.6)] hover:-translate-y-1 transition-all duration-300 group"
                         >
                             <Mic className="w-5 h-5 group-hover:scale-110 transition-transform" />
                             <span className="tracking-wide">TRY VOICE AI NOW</span>
                         </button>

                         <button className="px-8 py-4 bg-transparent border border-white/10 text-white font-medium rounded-lg hover:bg-white/5 transition-colors">
                             VIEW ARCHITECTURE
                         </button>
                     </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-12 flex gap-6 text-sm font-mono text-knowva-muted"
                    >
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-knowva-accent" />
                            <span>SOC2 Ready</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-knowva-accent" />
                            <span>&lt;100ms Latency</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* RIGHT PANEL: Simulated Console / Data Stream */}
            <div className="w-full lg:w-5/12 xl:w-1/3 bg-[#111] border-l border-white/10 p-8 flex items-center justify-center relative z-20 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-knowva-accent/5 to-transparent pointer-events-none" />

                <div className="w-full max-w-md transform transition-all duration-500 hover:scale-[1.01]">
                    <AiConsole autoStartData={leadData ? leadData.url : null} />
                </div>
            </div>

            <LeadForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={handleLeadSubmit}
            />

            <VoiceDemo
                isOpen={isVoiceDemoOpen}
                onClose={() => setIsVoiceDemoOpen(false)}
            />

            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: '#1f2937',
                        color: '#fff',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }
                }}
            />

        </section >
    );
};

export default Hero;