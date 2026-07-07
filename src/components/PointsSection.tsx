import React from 'react';
import { Coins, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface PointsSectionProps {
  setActiveSection: (sec: string) => void;
}

export default function PointsSection({ setActiveSection }: PointsSectionProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-12 animate-fade-in">
      
      <div className="text-center max-w-3xl mx-auto flex flex-col gap-3">
        <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-fit mx-auto">
          Ekonomi Sirkular &amp; Reward
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Skema Grading Mutu &amp; Penukaran Poin</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          Setiap tetes minyak jelantah memiliki nilai ekonomis. Kami mengklasifikasikan minyak ke dalam 3 tingkatan mutu transparan untuk memastikan nilai tukar yang adil bagi Mitra.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Grade A */}
        <div className="bg-white rounded-3xl p-8 border-2 border-amber-400 shadow-lg flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-amber-500 text-white font-mono text-[10px] font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
            Mutu Terbaik
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-xs font-mono text-amber-600 font-bold uppercase tracking-wider">Grade A</span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">Kuning Jernih</h3>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <span className="text-[10px] font-mono text-amber-800 font-bold uppercase tracking-wider block">Nilai Tukar</span>
              <span className="text-3xl font-black text-amber-900 font-mono">Rp 10.000</span>
              <span className="text-xs text-amber-700 font-semibold block mt-0.5">per Liter (1000 Pts)</span>
            </div>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Penggunaan 1-2 kali penggorengan</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Minim remah sisa makanan (tersaring)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Ideal untuk biodiesel &amp; kosmetik</span>
              </li>
            </ul>
          </div>
          <button
            onClick={() => setActiveSection('simulator')}
            className="mt-8 w-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Uji Sampel Grade A</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grade B */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-xs font-mono text-amber-800 font-bold uppercase tracking-wider">Grade B</span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">Cokelat Sisa</h3>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider block">Nilai Tukar</span>
              <span className="text-3xl font-black text-slate-900 font-mono">Rp 7.500</span>
              <span className="text-xs text-slate-600 font-semibold block mt-0.5">per Liter (750 Pts)</span>
            </div>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-500 shrink-0" />
                <span>Penggunaan 3-5 kali penggorengan</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-500 shrink-0" />
                <span>Warna kecokelatan transparan</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-500 shrink-0" />
                <span>Sangat bagus untuk sabun cuci</span>
              </li>
            </ul>
          </div>
          <button
            onClick={() => setActiveSection('simulator')}
            className="mt-8 w-full bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Uji Sampel Grade B</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grade C */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-xs font-mono text-slate-500 font-bold uppercase tracking-wider">Grade C</span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">Hitam Pekat</h3>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider block">Nilai Tukar</span>
              <span className="text-3xl font-black text-slate-900 font-mono">Rp 5.000</span>
              <span className="text-xs text-slate-600 font-semibold block mt-0.5">per Liter (500 Pts)</span>
            </div>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Penggunaan berulang kali (goreng ikan/sambal)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Warna gelap pekat, berbau tajam</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Diproses khusus untuk industri oleokimia</span>
              </li>
            </ul>
          </div>
          <button
            onClick={() => setActiveSection('simulator')}
            className="mt-8 w-full bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Uji Sampel Grade C</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
