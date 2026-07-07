import React from 'react';
import { ShieldCheck, CheckCircle2, Droplet, ArrowRight, Sparkles, MapPin, Cpu, Flame, Users, Coins } from 'lucide-react';

interface ProductOverviewProps {
  setActiveSection: (sec: string) => void;
}

export default function ProductOverview({ setActiveSection }: ProductOverviewProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-16 animate-fade-in">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto flex flex-col gap-3">
        <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full border border-orange-200 w-fit mx-auto">
          Spesifikasi &amp; Arsitektur Sistem
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Detail Produk &amp; Ekosistem Smart Jelantah Hub</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          Solusi terintegrasi dari hulu ke hilir untuk mengelola limbah minyak goreng rumah tangga secara higienis, transparan, dan bernilai ekonomis tinggi.
        </p>
      </div>

      {/* Grid of Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card 1 */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg">
              01
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">Wadah Smart J-Pot (1.2L)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Wadah penampung khusus berkapasitas 1,2 liter berbahan stainless steel food-grade anti-karat. Dilengkapi <strong className="text-slate-800">saringan mikro ganda pasif</strong> yang langsung menyaring remah sisa penggorengan dan menjaga minyak tetap jernih tanpa tengik.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-orange-600">
            <CheckCircle2 className="w-4 h-4" />
            <span>Higienis &amp; Tahan Panas</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg">
              02
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">Gemini AI Computer Vision</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Algoritma AI menganalisis foto sampel minyak atau pilihan preset warna untuk menentukan <strong className="text-slate-800">Grade Mutu (A/B/C)</strong> secara instan dengan tingkat akurasi &gt;98%, menghitung poin, dan valuasi rupiah.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-amber-700">
            <Sparkles className="w-4 h-4" />
            <span>Deteksi Kejernihan Otomatis</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
              03
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">Saponifikasi &amp; AI Chatbot</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Selain ditukar dengan uang tunai atau e-wallet, Ibu Rumah Tangga dapat berkonsultasi dengan AI Chatbot untuk mendapatkan resep takaran Lye (NaOH) pembuatan sabun cuci rumah tangga organik.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-700">
            <ShieldCheck className="w-4 h-4" />
            <span>Edukasi Zero Waste Mandiri</span>
          </div>
        </div>

      </div>

      {/* Additional Detailed Breakdown Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 lg:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-6">
          <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-wider bg-orange-50 px-3 py-1 rounded-full border border-orange-200 w-fit">
            Alur Pengumpulan RT / RW
          </span>
          <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Terintegrasi dengan Bank Sampah &amp; Kurir Lokal</h3>
          <p className="text-xs lg:text-sm text-slate-600 leading-relaxed">
            Minyak yang terkumpul dalam Smart J-Pot 1.2L dapat disetorkan langsung ke Posko RT/RW terdekat atau dipickup oleh kurir bank sampah mitra. Setiap penimbangan tercatat secara digital di dashboard transparan.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 font-bold text-xs">
                ✓
              </div>
              <div>
                <h5 className="font-bold text-xs text-slate-900">Penimbangan Real-Time</h5>
                <p className="text-[11px] text-slate-500">Poin otomatis masuk akun</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 font-bold text-xs">
                ✓
              </div>
              <div>
                <h5 className="font-bold text-xs text-slate-900">Reward Transparan</h5>
                <p className="text-[11px] text-slate-500">Tukar saldo e-wallet atau sedekah</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 text-white font-mono text-xs flex flex-col gap-4 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-orange-400 font-bold uppercase tracking-wider">Log Sistem Smart Jelantah AI</span>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-slate-300">
            <p className="text-emerald-400">[OK] Gemini 3.5 Vision Model Loaded.</p>
            <p>[INFO] Smart J-Pot 1.2L sensor calibrated.</p>
            <p>[INFO] Grade A oil valuation set at Rp 10.000/L.</p>
            <p className="text-amber-300">[READY] Silakan uji sampel minyak di menu Simulator AI.</p>
          </div>
          <button
            onClick={() => setActiveSection('simulator')}
            className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer font-sans text-xs uppercase tracking-wider"
          >
            <Sparkles className="w-4 h-4" />
            <span>Mulai Simulasi Test Kualitas Sekarang</span>
          </button>
        </div>
      </div>

      {/* Call to simulation banner */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-3xl p-8 lg:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-100">Coba Langsung Fitur Unggulan</span>
          <h3 className="text-2xl font-black">Ingin Tahu Kualitas Minyak Jelantah Dapur Anda?</h3>
          <p className="text-xs lg:text-sm text-orange-100 max-w-xl">
            Gunakan simulasi interaktif kami untuk menguji sampel minyak dan mendapatkan estimasi poin serta resep sabun instan.
          </p>
        </div>
        <button
          onClick={() => setActiveSection('simulator')}
          className="bg-white text-orange-600 hover:bg-orange-50 font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-xl shadow-md transition-all shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Buka Simulator AI Sekarang</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}

