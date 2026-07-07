import React from 'react';
import { Info, MapPin } from 'lucide-react';

interface StreamlitSectionProps {
  neighborhood: string;
  setNeighborhood: (value: string) => void;
  simulatedIrtCount: number;
  setSimulatedIrtCount: (value: number) => void;
  simulatedTargetLiter: number;
  setSimulatedTargetLiter: (value: number) => void;
  mapHoveredHub: string | null;
  setMapHoveredHub: (value: string | null) => void;
  showToast: (msg: string) => void;
}

export default function StreamlitSection({
  neighborhood,
  setNeighborhood,
  simulatedIrtCount,
  setSimulatedIrtCount,
  simulatedTargetLiter,
  setSimulatedTargetLiter,
  mapHoveredHub,
  setMapHoveredHub,
  showToast
}: StreamlitSectionProps) {
  return (
    <div className="bg-white rounded-xl border border-[#FF4B4B]/30 overflow-hidden shadow-xs">
      
      {/* Mock Streamlit style header */}
      <div className="bg-[#F0F2F6] px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#FF4B4B] text-white flex items-center justify-center font-bold text-xs">
            S
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold">Streamlit Dashboard Simulator</span>
            <span className="text-sm font-bold text-slate-800 font-mono">central_hub_monitoring.py</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-[#FF4B4B]/10 text-[#FF4B4B] font-mono text-[9px] font-bold px-2 py-0.5 rounded border border-[#FF4B4B]/20">
            PORT: 8501
          </span>
          <span className="bg-emerald-100 text-emerald-800 font-mono text-[9px] font-bold px-2 py-0.5 rounded">
            UPTIME: 100%
          </span>
        </div>
      </div>

      {/* Streamlit Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Streamlit Sidebar Settings panel */}
        <div className="lg:col-span-4 p-6 bg-[#F8FAFC] border-r border-slate-200 flex flex-col gap-6">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">Sidebar Configuration</h4>
            <p className="text-[11px] text-slate-500">Sesuaikan simulasi data untuk melihat reaksi Streamlit Dashboard secara dinamis.</p>
          </div>

          {/* Streamlit selectbox */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 font-mono">Select Community Region:</label>
            <select 
              id="streamlit-select-neighborhood"
              value={neighborhood} 
              onChange={(e) => {
                setNeighborhood(e.target.value);
                showToast(`Region diubah ke: ${e.target.value}`);
              }}
              className="bg-white border border-slate-300 rounded px-3 py-1.5 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <option value="Kecamatan Kebayoran Baru">Kecamatan Kebayoran Baru (Jaksel)</option>
              <option value="Kecamatan Kebayoran Lama">Kecamatan Kebayoran Lama (Jaksel)</option>
              <option value="Kecamatan Setiabudi">Kecamatan Setiabudi (Jaksel)</option>
              <option value="Kecamatan Cilandak">Kecamatan Cilandak (Jaksel)</option>
            </select>
          </div>

          {/* Streamlit Slider 1: Simulated IRT count */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-700 font-mono">Active IRT Depositors:</label>
              <span className="text-xs font-mono font-bold text-[#FF4B4B]">{simulatedIrtCount} IRT</span>
            </div>
            <input 
              id="streamlit-slider-irt"
              type="range" 
              min="10" 
              max="500" 
              value={simulatedIrtCount}
              onChange={(e) => setSimulatedIrtCount(parseInt(e.target.value))}
              className="w-full accent-[#FF4B4B]" 
            />
            <span className="text-[10px] text-slate-400">Total ibu rumah tangga terdaftar aktif menyetor.</span>
          </div>

          {/* Streamlit Slider 2: Target collect per week */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-700 font-mono">Target Collection (Liters):</label>
              <span className="text-xs font-mono font-bold text-[#FF4B4B]">{simulatedTargetLiter} L</span>
            </div>
            <input 
              id="streamlit-slider-target"
              type="range" 
              min="100" 
              max="1000" 
              value={simulatedTargetLiter}
              onChange={(e) => setSimulatedTargetLiter(parseInt(e.target.value))}
              className="w-full accent-[#FF4B4B]" 
            />
            <span className="text-[10px] text-slate-400">Target liter minyak terkumpul per minggu di kecamatan ini.</span>
          </div>

          <div className="p-4 bg-red-50 text-red-900 border border-red-100 rounded text-[11px] leading-relaxed">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Info className="w-3.5 h-3.5 text-[#FF4B4B] shrink-0" />
              <span className="font-bold font-mono">Streamlit-to-IoT Pipeline</span>
            </div>
            Data logistik ini didorong dari timbangan pintar bluetooth (<strong className="text-red-950">KR-02</strong>) yang tersinkron otomatis saat kurir melakukan transaksi di lapangan.
          </div>
        </div>

        {/* Streamlit Main Dashboard Dashboard content */}
        <div className="lg:col-span-8 p-6 flex flex-col gap-6 bg-white">
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-mono">{neighborhood} Analysis</h3>
            <p className="text-xs text-slate-500">Pemantauan visualisasi rute, rasio grade minyak, dan target karbon di lapangan.</p>
          </div>

          {/* Real-time calculated Streamlit metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="p-4 rounded border border-slate-200 bg-[#F8FAFC]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">Minyak Terkumpul</span>
              <span className="text-2xl font-black text-slate-800 font-mono">
                {(simulatedIrtCount * 1.6).toFixed(1)} L
              </span>
              <span className="block text-[10px] text-emerald-600 mt-1 font-semibold">
                {(simulatedIrtCount * 1.6 > simulatedTargetLiter) ? '🏆 Melampaui Target' : `📉 ${(simulatedTargetLiter - (simulatedIrtCount * 1.6)).toFixed(1)}L menuju target`}
              </span>
            </div>

            <div className="p-4 rounded border border-slate-200 bg-[#F8FAFC]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">Total Poin Distribusi</span>
              <span className="text-2xl font-black text-slate-800 font-mono">
                {Math.round(simulatedIrtCount * 1.6 * 850).toLocaleString('id-ID')} Pts
              </span>
              <span className="block text-[10px] text-slate-500 mt-1">
                Setara Rp {Math.round(simulatedIrtCount * 1.6 * 850 * 10).toLocaleString('id-ID')}
              </span>
            </div>

            <div className="p-4 rounded border border-slate-200 bg-[#F8FAFC]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">Emisi Karbon Terpangkas</span>
              <span className="text-2xl font-black text-emerald-600 font-mono">
                {(simulatedIrtCount * 1.6 * 2.1).toFixed(1)} Kg
              </span>
              <span className="block text-[10px] text-slate-500 mt-1">
                Dampak positif logistik sirkular
              </span>
            </div>

          </div>

          {/* Simulated interactive courier map */}
          <div className="border border-slate-200 rounded p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 font-mono flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                Visualisasi AI Smart Route Solver (KR-01)
              </span>
              <span className="text-[10px] font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-100 uppercase font-semibold">
                Vehicle Routing Problem Active
              </span>
            </div>

            <div className="relative h-60 bg-slate-100 rounded overflow-hidden border border-slate-200 flex items-center justify-center">
              
              {/* Simulated Map Background Dots */}
              <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 p-4 gap-4 opacity-10">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-slate-900"></div>
                ))}
              </div>

              {/* Central Depo Hub pin */}
              <div 
                id="map-pin-depot"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 cursor-pointer"
                onMouseEnter={() => setMapHoveredHub('depot')}
                onMouseLeave={() => setMapHoveredHub(null)}
              >
                <div className="w-8 h-8 rounded-full bg-indigo-600 border-2 border-white flex items-center justify-center text-white shadow-md">
                  🏢
                </div>
                <span className="text-[9px] font-mono font-bold bg-slate-900 text-white px-1 py-0.5 rounded mt-1">
                  Depo Hub Kebayoran
                </span>
              </div>

              {/* Field pickup points (simulated routes) */}
              <div 
                id="map-pin-cluster1"
                className="absolute top-1/4 left-1/4 flex flex-col items-center cursor-pointer"
                onMouseEnter={() => setMapHoveredHub('cluster1')}
                onMouseLeave={() => setMapHoveredHub(null)}
              >
                <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[8px] font-bold shadow animate-bounce">
                  1
                </div>
                <span className="text-[8px] font-mono bg-white border border-slate-300 text-slate-600 px-1 rounded mt-0.5">
                  Cluster RT 02
                </span>
              </div>

              <div 
                id="map-pin-cluster2"
                className="absolute bottom-1/4 right-1/3 flex flex-col items-center cursor-pointer"
                onMouseEnter={() => setMapHoveredHub('cluster2')}
                onMouseLeave={() => setMapHoveredHub(null)}
              >
                <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[8px] font-bold shadow animate-bounce" style={{ animationDelay: '0.2s' }}>
                  2
                </div>
                <span className="text-[8px] font-mono bg-white border border-slate-300 text-slate-600 px-1 rounded mt-0.5">
                  Cluster RT 09
                </span>
              </div>

              <div 
                id="map-pin-cluster3"
                className="absolute top-1/3 right-1/4 flex flex-col items-center cursor-pointer"
                onMouseEnter={() => setMapHoveredHub('cluster3')}
                onMouseLeave={() => setMapHoveredHub(null)}
              >
                <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[8px] font-bold shadow animate-bounce" style={{ animationDelay: '0.4s' }}>
                  3
                </div>
                <span className="text-[8px] font-mono bg-white border border-slate-300 text-slate-600 px-1 rounded mt-0.5">
                  Cluster RW 05
                </span>
              </div>

              {/* Connecting routing lines (pure CSS lines connecting coordinates) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Lines connecting cluster points to Depot at center (50%, 50%) */}
                <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_10s_linear_infinite]" />
                <line x1="50%" y1="50%" x2="66%" y2="75%" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_10s_linear_infinite]" />
                <line x1="50%" y1="50%" x2="75%" y2="33%" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_10s_linear_infinite]" />
              </svg>

              {/* Dynamic Tooltip on the map */}
              {mapHoveredHub && (
                <div className="absolute bottom-3 left-3 bg-slate-950 text-white p-2 rounded text-[10px] font-mono max-w-xs border border-slate-800 z-20">
                  {mapHoveredHub === 'depot' && (
                    <p>
                      <strong>🏢 DEPO UTAMA KEBAYORAN:</strong><br />
                      Mesin sentrifugal aktif.<br />
                      Kapasitas Tangki Induk: 5.000 L.<br />
                      Tingkat kelembapan: 0.12% (Lolos B2B)
                    </p>
                  )}
                  {mapHoveredHub === 'cluster1' && (
                    <p>
                      <strong>📦 CLUSTER RT 02:</strong><br />
                      Rute Optimal ke-1.<br />
                      Minyak Siap Jemput: 42.5 Liter.<br />
                      Estimasi penjemputan: 14 menit.
                    </p>
                  )}
                  {mapHoveredHub === 'cluster2' && (
                    <p>
                      <strong>📦 CLUSTER RT 09:</strong><br />
                      Rute Optimal ke-2.<br />
                      Minyak Siap Jemput: 28 Liter.<br />
                      Estimasi penjemputan: 28 menit.
                    </p>
                  )}
                  {mapHoveredHub === 'cluster3' && (
                    <p>
                      <strong>📦 CLUSTER RW 05:</strong><br />
                      Rute Optimal ke-3.<br />
                      Minyak Siap Jemput: 54 Liter.<br />
                      Estimasi penjemputan: 42 menit.
                    </p>
                  )}
                </div>
              )}

              <div className="absolute bottom-2 right-2 text-[8px] font-mono text-slate-400 bg-white/80 px-2 py-0.5 rounded">
                *Arahkan kursor ke marker untuk detail
              </div>
            </div>

            {/* Leaderboard RT/RW */}
            <div className="mt-4">
              <span className="text-xs font-bold text-slate-700 font-mono block mb-2 uppercase">Neighborhood Leaderboard (Tantangan Komunitas)</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="border border-slate-100 rounded p-3">
                  <div className="flex justify-between items-center text-xs text-slate-500 mb-1 font-mono">
                    <span>1. RT 04 / RW 01</span>
                    <span className="font-bold text-slate-800">182 Liter</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>

                <div className="border border-slate-100 rounded p-3">
                  <div className="flex justify-between items-center text-xs text-slate-500 mb-1 font-mono">
                    <span>2. RT 08 / RW 05</span>
                    <span className="font-bold text-slate-800">140 Liter</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
