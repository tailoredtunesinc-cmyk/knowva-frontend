import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';

const App: React.FC = () => {
  return (
    <div className="bg-knowva-bg text-knowva-text min-h-screen selection:bg-knowva-accent selection:text-white">
      <Header />
      <main>
        <Hero />
        {/* Infrastructure Section */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Hybrid AI Architecture</h2>
            <p className="text-knowva-muted max-w-2xl mx-auto">
              Powered by Gemini 2.5 Flash for interactive demos and GPT-4 for enterprise-grade sales automation. Retell AI delivers sub-second voice responses with natural conversation flow.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="p-6 bg-knowva-panel/50 border border-white/10 rounded-lg">
                <div className="w-12 h-12 bg-knowva-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-semibold text-white mb-2">Interactive Demos</h3>
                <p className="text-sm text-knowva-muted">Gemini-powered console for real-time business intelligence analysis</p>
              </div>
              <div className="p-6 bg-knowva-panel/50 border border-white/10 rounded-lg">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎤</span>
                </div>
                <h3 className="font-semibold text-white mb-2">Voice AI Widget</h3>
                <p className="text-sm text-knowva-muted">Retell-powered interactive voice demonstrations</p>
              </div>
              <div className="p-6 bg-knowva-panel/50 border border-white/10 rounded-lg">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤖</span>
                </div>
                <h3 className="font-semibold text-white mb-2">Sales Automation</h3>
                <p className="text-sm text-knowva-muted">GPT-4 powered outbound calling and objection handling</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t border-white/5 py-10 bg-knowva-panel">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm text-knowva-muted font-mono">
                © 2024 KNOWVA SYSTEMS. ALL RIGHTS RESERVED.
            </div>
            <div className="flex gap-6">
                <a href="#" className="text-xs text-knowva-muted hover:text-white transition-colors">PRIVACY_PROTOCOL</a>
                <a href="#" className="text-xs text-knowva-muted hover:text-white transition-colors">TERMS_OF_ENGAGEMENT</a>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;