import React from 'react';
import { Terminal, Menu } from 'lucide-react';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'Intelligence', href: '#features' },
  { label: 'Architecture', href: '#specs' },
  { label: 'Enterprise', href: '#pricing' },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-knowva-bg/80 backdrop-blur-md border-white/10 py-4' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/5 rounded-lg border border-white/10">
            <Terminal className="w-5 h-5 text-knowva-accent" />
          </div>
          <span className="font-mono text-lg tracking-tight font-bold text-white">
            KNOW<span className="text-knowva-accent">VA</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              className="text-sm font-medium text-knowva-muted hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden md:block px-5 py-2 text-sm font-medium text-white border border-white/20 rounded-full hover:bg-white/5 transition-all">
            Client Login
          </button>
          <button className="px-5 py-2 text-sm font-bold text-black bg-white rounded-full hover:bg-knowva-accent hover:text-white transition-all neon-glow">
            Start Pilot
          </button>
          <button className="md:hidden text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;