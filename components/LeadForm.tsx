import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Globe, User, Mail, Phone } from 'lucide-react';

interface LeadFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LeadData) => void;
}

export interface LeadData {
  url: string;
  name: string;
  email: string;
  phone: string;
}

const LeadForm: React.FC<LeadFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<LeadData>({
    url: '',
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4"
          >
            <div className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden pointer-events-auto relative">
              
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-knowva-accent to-blue-500" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-knowva-accent/10 rounded-full blur-3xl pointer-events-none" />

              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-white mb-1">Initialize Analysis</h2>
                    <p className="text-sm text-knowva-muted">Enter your details to start the autonomous audit.</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="p-2 hover:bg-white/5 rounded-full transition-colors text-knowva-muted hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-knowva-muted uppercase tracking-wider ml-1">Target URL</label>
                    <div className="relative group">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-knowva-muted group-focus-within:text-knowva-accent transition-colors" />
                      <input
                        type="url"
                        name="url"
                        required
                        placeholder="https://example.com"
                        value={formData.url}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-knowva-accent/50 focus:bg-white/10 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-knowva-muted uppercase tracking-wider ml-1">Name</label>
                      <div className="relative group">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-knowva-muted group-focus-within:text-knowva-accent transition-colors" />
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-knowva-accent/50 focus:bg-white/10 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-knowva-muted uppercase tracking-wider ml-1">Phone</label>
                      <div className="relative group">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-knowva-muted group-focus-within:text-knowva-accent transition-colors" />
                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-knowva-accent/50 focus:bg-white/10 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-knowva-muted uppercase tracking-wider ml-1">Email</label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-knowva-muted group-focus-within:text-knowva-accent transition-colors" />
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-knowva-accent/50 focus:bg-white/10 transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-knowva-accent hover:bg-purple-500 text-white font-bold rounded-lg shadow-lg hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.6)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 mt-4"
                  >
                    <span>START SCAN</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LeadForm;
