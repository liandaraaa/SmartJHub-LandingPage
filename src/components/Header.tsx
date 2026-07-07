import React from 'react';
import { Sparkles, ShieldCheck, Flame, Cpu, BookOpen, Coins } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Header({ activeSection, setActiveSection }: HeaderProps) {
  return (
    <header id="app-header" className="sticky top-0 z-40 flex items-center justify-between px-6 lg:px-12 py-4 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center font-black shadow-md">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-base font-extrabold tracking-tight text-slate-900">
            Smart Jelantah<span className="text-orange-600"> Hub</span>
          </span>
          <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">
            Sistem Sirkular Minyak Dapur Pintar
          </span>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
        <button
          onClick={() => setActiveSection('overview')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${activeSection === 'overview' ? 'bg-white text-orange-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Overview Produk</span>
        </button>
        <button
          onClick={() => setActiveSection('simulator')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${activeSection === 'simulator' ? 'bg-orange-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Simulasi AI Test Kualitas</span>
        </button>
        <button
          onClick={() => setActiveSection('points')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${activeSection === 'points' ? 'bg-white text-orange-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
        >
          <Coins className="w-3.5 h-3.5" />
          <span>Skema Poin &amp; Reward</span>
        </button>
      </nav>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-mono font-semibold text-emerald-800">Gemini 3.5 AI Ready</span>
        </div>
      </div>
    </header>
  );
}
