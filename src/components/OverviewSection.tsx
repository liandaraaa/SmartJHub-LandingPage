import React from 'react';
import { Smartphone, Terminal, Coins, Award } from 'lucide-react';

export default function OverviewSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* Left side: Interactive physical product specs */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-800 text-base uppercase">Smart J-Pot (WP)</h3>
            </div>
            <span className="bg-indigo-100 text-indigo-700 font-mono text-[10px] font-bold px-2 py-0.5 rounded">Wadah Fisik</span>
          </div>

          <p className="text-slate-500 text-xs mb-6">
            Wadah fisik inovatif ukuran 1.2 Liter yang dibagikan ke Ibu Rumah Tangga (IRT) sebagai unit penampungan utama dengan sistem sirkulasi tukar-pakai.
          </p>

          {/* Simulated 3D Blueprint representation of the Smart J-Pot */}
          <div className="relative h-64 bg-slate-950 rounded-lg p-4 border border-slate-800 overflow-hidden flex items-center justify-center">
            <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2 py-1 rounded text-[9px] font-mono text-indigo-400">
              <Terminal className="w-3 h-3 animate-pulse" />
              <span>3D_BLUEPRINT_DRAFT.XLO</span>
            </div>

            {/* Wireframe drawing of J-Pot */}
            <div className="w-32 h-48 border-2 border-dashed border-indigo-500/50 rounded-xl relative flex flex-col justify-between p-2">
              
              {/* WP-01 Lid stainless mesh */}
              <div className="h-6 w-full bg-indigo-900/40 border border-indigo-400 rounded-lg flex items-center justify-center text-[8px] font-mono text-indigo-200 text-center uppercase">
                WP-01 FILTER
              </div>

              {/* Scale indication WP-02 */}
              <div className="absolute right-1 top-1/4 bottom-1/4 w-4 border-l border-indigo-400/70 flex flex-col justify-between text-[7px] font-mono text-indigo-300 pl-1">
                <span>1.2L</span>
                <span>0.8L</span>
                <span>0.4L</span>
              </div>

              {/* QR Identifier WP-03 */}
              <div className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/10 border border-indigo-400/80 rounded flex items-center justify-center text-[6px] font-mono text-indigo-300">
                [QR-ID]
              </div>

              {/* Oil volume simulator inside wireframe */}
              <div className="w-full bg-amber-500/20 h-20 absolute bottom-6 left-0 right-0 border-t border-amber-500/60 rounded-b-lg flex items-center justify-center">
                <span className="text-[9px] font-mono text-amber-300 tracking-wider">EST. 1.2 LITER</span>
              </div>

              {/* WP-04 Bottom Valve */}
              <div className="h-4 w-6 mx-auto bg-red-900/40 border border-red-500/80 rounded flex items-center justify-center text-[7px] font-mono text-red-200">
                WP-04
              </div>
            </div>

            <div className="absolute bottom-2 right-2 text-[8px] font-mono text-slate-500 text-right">
              <span>CAPACITY: 1200 ML<br />SYS: CIRCULAR REUSE</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <div className="p-3 bg-slate-50 rounded border border-slate-100 flex items-start gap-3">
              <span className="bg-indigo-600 text-white font-mono text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0">1</span>
              <div>
                <h5 className="font-bold text-slate-800 text-xs uppercase">WP-01 Saringan Mikro Ganda</h5>
                <p className="text-[11px] text-slate-500">Stainless steel mesh mikro terintegrasi menyaring sisa remah makanan kotor saat dituang.</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-100 flex items-start gap-3">
              <span className="bg-indigo-600 text-white font-mono text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0">2</span>
              <div>
                <h5 className="font-bold text-slate-800 text-xs uppercase">WP-02 Dinding Skala Transparan</h5>
                <p className="text-[11px] text-slate-500">Gradasi mililiter yang kontras untuk memudahkan modul kamera mendeteksi batas volume cairan.</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-100 flex items-start gap-3">
              <span className="bg-indigo-600 text-white font-mono text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0">3</span>
              <div>
                <h5 className="font-bold text-slate-800 text-xs uppercase">WP-03 QR/NFC Digital Identity</h5>
                <p className="text-[11px] text-slate-500">Stiker unik tahan air/minyak untuk pencocokan instan data akun IRT dengan botol penampung.</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-100 flex items-start gap-3">
              <span className="bg-indigo-600 text-white font-mono text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0">4</span>
              <div>
                <h5 className="font-bold text-slate-800 text-xs uppercase">WP-04 Katup Keran Pembuang Dasar</h5>
                <p className="text-[11px] text-slate-500">Komponen khusus memisahkan air/gliserol hasil sampingan pembuatan sabun mandiri.</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Right side: Detailed Feature List categorized by User type */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div className="pb-4 border-b border-slate-100 mb-6">
            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-1 border border-emerald-100 rounded uppercase tracking-wider mb-2 inline-block">Fitur Aplikasi Mobile</span>
            <h3 className="font-black text-slate-800 text-xl tracking-tight">Sisi Ibu Rumah Tangga (IRT) & Kurir Lapangan</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* APP-01 */}
            <div className="p-5 rounded-lg border border-slate-200 bg-slate-50 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="bg-indigo-600 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded">APP-01</span>
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-tight">AI Scan & Quality Check</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Modul kamera berbasis <strong className="text-slate-700">Computer Vision</strong> untuk mendeteksi QR wadah, mengestimasi volume, dan mengevaluasi gradasi kejernihan minyak guna menentukan grade kualitas (A/B/C) secara instan.
              </p>
            </div>

            {/* APP-02 */}
            <div className="p-5 rounded-lg border border-slate-200 bg-slate-50 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="bg-indigo-600 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded">APP-02</span>
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-tight">AI Chatbot Formula Tutor</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Asisten percakapan cerdas yang interaktif menghitung rasio saponifikasi aman untuk pembuatan sabun batangan cuci piring atau lilin aromaterapi berdasarkan sisa volume minyak di dalam J-Pot.
              </p>
            </div>

            {/* APP-03 */}
            <div className="p-5 rounded-lg border border-slate-200 bg-slate-50 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="bg-indigo-600 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded">APP-03</span>
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-tight">Dompet & Penukaran Poin</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Fasilitas pencairan saldo poin menjadi saldo e-wallet komersial (GoPay, OVO), token pulsa, tagihan listrik, atau disalurkan langsung sebagai donasi sosial kemasyarakatan.
              </p>
            </div>

            {/* KR-01 */}
            <div className="p-5 rounded-lg border border-slate-200 bg-slate-50 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-600 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded">KR-01</span>
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-tight">AI Smart Route Solver</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Algoritma optimasi rute (<strong className="text-slate-700">Vehicle Routing Problem</strong>) yang mengelompokkan tugas penjemputan minyak berdasarkan jarak terdekat dan efisiensi bahan bakar kurir per jendela waktu 3 jam.
              </p>
            </div>

            {/* KR-02 */}
            <div className="p-5 rounded-lg border border-slate-200 bg-slate-50 flex flex-col gap-3 md:col-span-2">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-600 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded">KR-02</span>
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-tight">Bluetooth Scale Sync</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Konektivitas nirkabel langsung dari aplikasi kurir ke timbangan gantung digital portable di lapangan untuk memverifikasi berat riil minyak tanpa harus memasukkan angka secara manual.
              </p>
            </div>

          </div>
        </div>

        {/* Points System & Gamification */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div className="pb-4 border-b border-slate-100 mb-6">
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-amber-500" />
              <h3 className="font-black text-slate-800 text-base uppercase">Skema Ekonomi Poin & Gamifikasi</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-lg border border-slate-100 bg-amber-50/50 text-center">
              <span className="text-xs text-amber-800 font-extrabold uppercase">Grade A</span>
              <span className="block font-black text-slate-900 text-xl mt-1">1.000 Poin</span>
              <span className="text-[10px] text-slate-500">Minyak Kuning Jernih</span>
            </div>
            <div className="p-4 rounded-lg border border-slate-100 bg-slate-50 text-center">
              <span className="text-xs text-slate-600 font-extrabold uppercase">Grade B</span>
              <span className="block font-black text-slate-900 text-xl mt-1">750 Poin</span>
              <span className="text-[10px] text-slate-500">Minyak Cokelat Transparan</span>
            </div>
            <div className="p-4 rounded-lg border border-slate-100 bg-red-50/50 text-center">
              <span className="text-xs text-red-800 font-extrabold uppercase">Grade C</span>
              <span className="block font-black text-slate-900 text-xl mt-1">500 Poin</span>
              <span className="text-[10px] text-slate-500">Minyak Hitam Pekat</span>
            </div>
          </div>

          {/* Gamification tiers */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 text-xs">
              <span className="font-bold text-slate-700">Tier 1: Newbie Cook (0 - 5L)</span>
              <span className="font-mono text-slate-500">Multiplier 1.0x</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border border-emerald-200 bg-emerald-50/30 text-xs">
              <span className="font-bold text-emerald-800">Tier 2: Green Mom (6 - 20L)</span>
              <span className="font-mono text-emerald-600 font-bold">Multiplier 1.05x (+5% Bonus)</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border border-indigo-200 bg-indigo-50/30 text-xs">
              <span className="font-bold text-indigo-800">Tier 3: Jelantah Master (&gt;20L)</span>
              <span className="font-mono text-indigo-600 font-bold">Multiplier 1.1x (+10% Bonus) + Prioritas Kurir</span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 text-blue-800 text-xs rounded border border-blue-100 flex gap-2">
            <Award className="w-4 h-4 shrink-0 mt-0.5" />
            <p>
              <strong>Konsistensi Streak Counter:</strong> Menyetor rutin minimal 1 kali per bulan selama 3 bulan berturut-turut memberikan hadiah tambahan berupa <strong className="text-blue-900">Voucher Sembako Elektronik</strong> belanja harian!
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
