import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, Phone, MessageCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface VoiceDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoiceDemo: React.FC<VoiceDemoProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const retellClientRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen && !retellClientRef.current) {
      initializeRetell();
    }

    return () => {
      // Cleanup on unmount
      if (retellClientRef.current) {
        retellClientRef.current.stopCall();
        retellClientRef.current = null;
      }
    };
  }, [isOpen]);

  const initializeRetell = async () => {
    try {
      setIsLoading(true);

      // Dynamic import to avoid SSR issues
      const { RetellWebClient } = await import('retell-client-js-sdk');

      // Initialize Retell Web Client
      retellClientRef.current = new RetellWebClient();

      // Configure event listeners
      retellClientRef.current.on('call_started', () => {
        setIsConnected(true);
        toast.success('Voice demo started!');
      });

      retellClientRef.current.on('call_ended', () => {
        setIsConnected(false);
        toast.success('Voice demo completed!');
      });

      retellClientRef.current.on('error', (error: any) => {
        console.error('Retell error:', error);
        toast.error('Voice demo encountered an error');
        setIsConnected(false);
      });

      setIsLoading(false);

    } catch (error) {
      console.error('Failed to initialize Retell:', error);
      toast.error('Failed to load voice demo');
      setIsLoading(false);
    }
  };

  const startVoiceDemo = async () => {
    if (!retellClientRef.current) {
      toast.error('Voice demo not ready yet');
      return;
    }

    try {
      const agentId = import.meta.env.VITE_RETELL_DEMO_AGENT_ID;

      if (!agentId) {
        toast.error('Demo agent not configured');
        return;
      }

      await retellClientRef.current.startCall({
        agentId: agentId,
        // Optional: Add metadata
        metadata: {
          source: 'frontend_demo',
          timestamp: new Date().toISOString()
        }
      });

    } catch (error) {
      console.error('Failed to start voice demo:', error);
      toast.error('Failed to start voice demo');
    }
  };

  const stopVoiceDemo = async () => {
    if (retellClientRef.current) {
      try {
        await retellClientRef.current.stopCall();
        setIsConnected(false);
        toast.success('Voice demo stopped');
      } catch (error) {
        console.error('Failed to stop voice demo:', error);
      }
    }
  };

  return (
    <>
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

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4"
            >
              <div className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden pointer-events-auto relative">

                {/* Header */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-display font-bold text-white mb-2">
                        Voice AI Demo
                      </h2>
                      <p className="text-sm text-knowva-muted">
                        Experience our AI voice agent in action. Click start to begin a live conversation.
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-white/5 rounded-full transition-colors text-knowva-muted hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Status Indicator */}
                  <div className="mt-4 flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      isConnected ? 'bg-green-500 animate-pulse' :
                      isLoading ? 'bg-yellow-500 animate-pulse' :
                      'bg-gray-500'
                    }`} />
                    <span className="text-sm font-mono text-knowva-muted">
                      {isConnected ? 'CONNECTED' : isLoading ? 'INITIALIZING...' : 'READY'}
                    </span>
                  </div>
                </div>

                {/* Voice Interface Area */}
                <div className="p-8">
                  <div className="text-center space-y-6">

                    {/* Voice Visualization */}
                    <div className="relative w-32 h-32 mx-auto">
                      <div className={`absolute inset-0 rounded-full border-2 transition-all duration-300 ${
                        isConnected ? 'border-knowva-accent shadow-[0_0_30px_rgba(168,85,247,0.3)]' :
                        'border-white/20'
                      }`} />

                      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-knowva-accent/20 to-transparent flex items-center justify-center">
                        {isConnected ? (
                          <div className="flex space-x-1">
                            <div className="w-1 h-8 bg-knowva-accent animate-pulse" style={{animationDelay: '0ms'}} />
                            <div className="w-1 h-12 bg-knowva-accent animate-pulse" style={{animationDelay: '150ms'}} />
                            <div className="w-1 h-6 bg-knowva-accent animate-pulse" style={{animationDelay: '300ms'}} />
                            <div className="w-1 h-10 bg-knowva-accent animate-pulse" style={{animationDelay: '450ms'}} />
                          </div>
                        ) : (
                          <Mic className={`w-8 h-8 transition-colors ${
                            isLoading ? 'text-yellow-500' : 'text-knowva-muted'
                          }`} />
                        )}
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white">
                        {isConnected ? 'Listening...' : 'Ready to Talk'}
                      </h3>
                      <p className="text-sm text-knowva-muted max-w-md mx-auto">
                        {isConnected
                          ? 'Speak naturally with our AI agent. It can understand your questions about voice AI and sales automation.'
                          : 'Click "Start Voice Demo" to begin an interactive conversation with our AI voice agent.'
                        }
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-center">
                      {!isConnected ? (
                        <button
                          onClick={startVoiceDemo}
                          disabled={isLoading}
                          className="px-8 py-4 bg-knowva-accent hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-lg hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.6)] transition-all duration-300 flex items-center gap-3"
                        >
                          <Phone className="w-5 h-5" />
                          {isLoading ? 'Loading...' : 'Start Voice Demo'}
                        </button>
                      ) : (
                        <button
                          onClick={stopVoiceDemo}
                          className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300 flex items-center gap-3"
                        >
                          <X className="w-5 h-5" />
                          End Demo
                        </button>
                      )}

                      <button
                        onClick={onClose}
                        className="px-6 py-4 bg-transparent border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 transition-colors"
                      >
                        Maybe Later
                      </button>
                    </div>

                    {/* Features List */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                      <div className="text-center">
                        <MessageCircle className="w-6 h-6 text-knowva-accent mx-auto mb-2" />
                        <div className="text-xs text-knowva-muted font-mono">NATURAL CONVERSATION</div>
                      </div>
                      <div className="text-center">
                        <Mic className="w-6 h-6 text-knowva-accent mx-auto mb-2" />
                        <div className="text-xs text-knowva-muted font-mono">VOICE RECOGNITION</div>
                      </div>
                      <div className="text-center">
                        <Phone className="w-6 h-6 text-knowva-accent mx-auto mb-2" />
                        <div className="text-xs text-knowva-muted font-mono">REAL-TIME RESPONSES</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default VoiceDemo;