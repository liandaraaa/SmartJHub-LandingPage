import React, { useState } from 'react';
import { X, Play, Code, Check, Sparkles, Copy, Laptop, Smartphone, Cpu } from 'lucide-react';

interface SimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalType: 'streamlit' | 'gradio' | 'vscode' | null;
  showToast: (msg: string) => void;
}

export default function SimulationModal({ isOpen, onClose, modalType, showToast }: SimulationModalProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'html' | 'css' | 'js'>('preview');
  const [simState, setSimState] = useState({
    volume: 1.5,
    grade: 'Grade A (Kuning Jernih)',
    points: 1500,
    status: 'idle'
  });

  if (!isOpen || !modalType) return null;

  const getModalConfig = () => {
    switch (modalType) {
      case 'streamlit':
        return {
          title: 'Simulasi Dashboard Streamlit (Logistik & RT/RW)',
          icon: <Laptop className="w-5 h-5 text-red-500" />,
          badgeColor: 'bg-red-50 text-red-600 border-red-200',
          desc: 'Pantau volume pengumpulan minyak jelantah secara real-time dan optimasi rute kurir.'
        };
      case 'gradio':
        return {
          title: 'Simulasi Gradio ML Scan (Computer Vision)',
          icon: <Cpu className="w-5 h-5 text-orange-500" />,
          badgeColor: 'bg-orange-50 text-orange-600 border-orange-200',
          desc: 'Uji kualitas minyak goreng bekas dengan pemindaian warna instan dan kalkulator poin.'
        };
      case 'vscode':
        return {
          title: 'Live Server VS Code (Asisten AI & Ekspor Kode)',
          icon: <Code className="w-5 h-5 text-blue-500" />,
          badgeColor: 'bg-blue-50 text-blue-600 border-blue-200',
          desc: 'Pratinjau struktur kode HTML/CSS/JS yang bersih dan ramah pengguna untuk integrasi.'
        };
    }
  };

  const config = getModalConfig();

  const sampleHtmlCode = `<!-- Smart Jelantah Hub - Widget Simulasi -->
<div class="jelantah-card">
  <h3>Smart J-Pot 1.2L</h3>
  <p>Scan kualitas minyak & tukar jadi poin.</p>
  <button id="scanBtn">Mulai Scan AI</button>
  <div id="resultBox">Grade: A | 1000 Poin</div>
</div>`;

  const sampleCssCode = `/* Styling Sederhana & Ramah Pengguna */
.jelantah-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  font-family: 'Inter', sans-serif;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
}
.jelantah-card h3 { color: #0f172a; font-weight: 800; margin-bottom: 8px; }
button {
  background: #4f46e5; color: white; border: none;
  padding: 8px 16px; border-radius: 6px; cursor: pointer;
  font-weight: 600; margin-top: 12px;
}`;

  const sampleJsCode = `// Logika Interaktif Sederhana
document.getElementById('scanBtn').addEventListener('click', () => {
  const result = document.getElementById('resultBox');
  result.innerText = "Minyak Berhasil Diverifikasi! +1000 Poin";
  result.style.color = "#10b981";
  alert("Sampel minyak diterima! Poin ditambahkan ke Dompet IRT.");
});`;

  const handleCopyCode = () => {
    const codeToCopy = activeTab === 'html' ? sampleHtmlCode : activeTab === 'css' ? sampleCssCode : sampleJsCode;
    navigator.clipboard.writeText(codeToCopy);
    setCopied(true);
    showToast("Kode berhasil disalin ke clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl border ${config.badgeColor}`}>
              {config.icon}
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">{config.title}</h3>
              <p className="text-xs text-slate-500">{config.desc}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Tab Selector */}
        <div className="flex px-6 border-b border-slate-100 bg-slate-50/50 gap-2 pt-2">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors cursor-pointer flex items-center gap-1.5 ${activeTab === 'preview' ? 'bg-white text-indigo-600 border-t border-x border-slate-200 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pratinjau Interaktif</span>
          </button>
          <button
            onClick={() => setActiveTab('html')}
            className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors cursor-pointer flex items-center gap-1.5 ${activeTab === 'html' ? 'bg-white text-indigo-600 border-t border-x border-slate-200 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Kode HTML</span>
          </button>
          <button
            onClick={() => setActiveTab('css')}
            className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors cursor-pointer flex items-center gap-1.5 ${activeTab === 'css' ? 'bg-white text-indigo-600 border-t border-x border-slate-200 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>CSS Styling</span>
          </button>
          <button
            onClick={() => setActiveTab('js')}
            className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors cursor-pointer flex items-center gap-1.5 ${activeTab === 'js' ? 'bg-white text-indigo-600 border-t border-x border-slate-200 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>JavaScript</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50">
          
          {activeTab === 'preview' && (
            <div className="flex flex-col gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Simulasi Langsung Alat Smart J-Pot</span>
                  <span className="bg-emerald-50 text-emerald-700 font-bold text-[10px] px-2 py-0.5 rounded border border-emerald-100">Aktif & Siap Uji</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-slate-600">Volume Minyak (Liter):</label>
                    <input 
                      type="range" 
                      min="0.5" 
                      max="3.0" 
                      step="0.1" 
                      value={simState.volume}
                      onChange={(e) => {
                        const vol = parseFloat(e.target.value);
                        setSimState({
                          ...simState,
                          volume: vol,
                          points: Math.round(vol * 1000)
                        });
                      }}
                      className="accent-indigo-600"
                    />
                    <span className="text-xs font-mono text-indigo-600 font-bold">{simState.volume} Liter</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-slate-600">Pilih Kondisi Minyak:</label>
                    <select 
                      value={simState.grade}
                      onChange={(e) => setSimState({ ...simState, grade: e.target.value })}
                      className="bg-slate-50 border border-slate-200 rounded p-2 text-xs font-medium"
                    >
                      <option value="Grade A (Kuning Jernih)">Grade A (Kuning Jernih - Rp10k/L)</option>
                      <option value="Grade B (Cokelat Saringan)">Grade B (Cokelat Saringan - Rp7.5k/L)</option>
                      <option value="Grade C (Hitam Pekat)">Grade C (Hitam Pekat - Rp5k/L)</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 bg-indigo-50/50 rounded-lg border border-indigo-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider block">Estimasi Poin Diperoleh</span>
                    <span className="text-2xl font-black text-slate-900">{simState.points} Poin</span>
                    <span className="text-xs text-slate-500 block">Setara Rp {simState.points * 10},- tunai / e-wallet</span>
                  </div>
                  <button 
                    onClick={() => {
                      setSimState({ ...simState, status: 'success' });
                      showToast(`Berhasil menyetorkan ${simState.volume}L minyak! +${simState.points} poin ditambahkan.`);
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-3 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Kirim & Klaim Poin</span>
                  </button>
                </div>

                {simState.status === 'success' && (
                  <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded border border-emerald-200 animate-fade-in font-medium flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Transaksi simulasi berhasil! Kurir lapangan telah menerima notifikasi penjemputan ke alamat Anda.</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'html' && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">Struktur Sederhana HTML:</span>
                <button 
                  onClick={handleCopyCode}
                  className="bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin!' : 'Salin Kode'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-900 text-emerald-400 rounded-lg text-xs font-mono overflow-x-auto shadow-inner border border-slate-800">
                {sampleHtmlCode}
              </pre>
            </div>
          )}

          {activeTab === 'css' && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">Stylesheet CSS:</span>
                <button 
                  onClick={handleCopyCode}
                  className="bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin!' : 'Salin Kode'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-900 text-blue-400 rounded-lg text-xs font-mono overflow-x-auto shadow-inner border border-slate-800">
                {sampleCssCode}
              </pre>
            </div>
          )}

          {activeTab === 'js' && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">Interaksi JavaScript Sederhana:</span>
                <button 
                  onClick={handleCopyCode}
                  className="bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin!' : 'Salin Kode'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-900 text-amber-400 rounded-lg text-xs font-mono overflow-x-auto shadow-inner border border-slate-800">
                {sampleJsCode}
              </pre>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-white border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-medium">
            Simulasi interaktif dirancang ramah pengguna tanpa terminal rumit.
          </span>
          <button 
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            Tutup Simulasi
          </button>
        </div>

      </div>
    </div>
  );
}
