import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8 px-6 lg:px-12 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm text-slate-900">Smart Jelantah Hub</span>
            <span className="text-[10px] font-mono text-slate-500">Sistem Pengelolaan Minyak Jelantah Berbasis AI &amp; Saponifikasi</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 text-xs text-slate-500 font-mono">
          <span>© 2026 Smart Jelantah Indonesia</span>
          <span className="hidden md:inline text-slate-300">|</span>
          <span className="font-semibold text-slate-700">Author: Lianda Ramadhana</span>
          <span className="hidden md:inline text-slate-300">|</span>
          <span className="bg-orange-50 text-orange-700 font-bold px-2.5 py-1 rounded-md border border-orange-200">
            Kompetisi Perempuan Inovasi
          </span>
          <span className="flex items-center gap-1 text-emerald-600 font-bold ml-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Gemini AI Connected</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
