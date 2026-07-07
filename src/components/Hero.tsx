import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Droplet, Coins, Flame } from 'lucide-react';

interface HeroProps {
  setActiveSection: (sec: string) => void;
}

export default function Hero({ setActiveSection }: HeroProps) {
  return (
    <section className="bg-white border-b border-slate-200 py-12 lg:py-20 px-6 lg:px-12 relative overflow-hidden">
      <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-96 h-96 rounded-full bg-orange-100/50 blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-800 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold w-fit border border-orange-200">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>Ekosistem Sirkular Minyak Jelantah Berbasis AI</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Ubah Limbah Minyak Dapur Jadi <span className="text-orange-600">Pundi-Pundi Poin Rupiah</span>
          </h1>

          <p className="text-slate-600 text-sm lg:text-base leading-relaxed max-w-2xl font-sans">
            Smart Jelantah Hub menghubungkan Ibu Rumah Tangga dan UMKM kuliner dengan wadah pintar <strong className="text-slate-800">Smart J-Pot (1.2L)</strong> bersaringan mikro, dilengkapi pemindaian kualitas minyak instan berbasis <strong className="text-slate-800">Gemini AI Computer Vision</strong> dan panduan resep saponifikasi sabun otomatis.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => setActiveSection('simulator')}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Coba Simulasi Test Kualitas Minyak</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
            <button
              onClick={() => setActiveSection('overview')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all border border-slate-200 cursor-pointer"
            >
              Pelajari Detail Produk
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-100 max-w-lg">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-slate-900 font-mono">1.2L</span>
              <span className="text-[11px] text-slate-500 font-medium">Kapasitas Smart J-Pot</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-orange-600 font-mono">Rp 10rb</span>
              <span className="text-[11px] text-slate-500 font-medium">Maksimal Nilai / Liter</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-emerald-600 font-mono">100%</span>
              <span className="text-[11px] text-slate-500 font-medium">Terfilter &amp; Daur Ulang</span>
            </div>
          </div>
        </div>

        {/* Hero Card Visual Preview */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl text-white shadow-2xl border border-slate-700 flex flex-col gap-6 relative">
          <div className="flex items-center justify-between pb-4 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            </div>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded border border-slate-700">
              Smart J-Pot v1.2
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                <Droplet className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Saringan Mikro Ganda</h4>
                <p className="text-[11px] text-slate-400">Menyaring sisa remah makanan &amp; residu gosong secara pasif.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Reward Poin Instan</h4>
                <p className="text-[11px] text-slate-400">Tukar minyak kotor dengan poin e-wallet atau sedekah sampah.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">AI Saponifikasi Sabun</h4>
                <p className="text-[11px] text-slate-400">Dapatkan resep takaran Lye &amp; air dari Gemini AI untuk membuat sabun.</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveSection('simulator')}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Buka Simulasi Cek Kualitas Minyak</span>
          </button>
        </div>

      </div>
    </section>
  );
}
