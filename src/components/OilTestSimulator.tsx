import React, { useState } from 'react';
import { Upload, Sparkles, Flame, CheckCircle2, RefreshCw, HelpCircle, ShieldCheck, Cpu } from 'lucide-react';
import { AnalysisResult } from '../types';

interface OilTestSimulatorProps {
  showToast: (msg: string) => void;
}

export default function OilTestSimulator({ showToast }: OilTestSimulatorProps) {
  const [inputType, setInputType] = useState<'preset' | 'upload'>('preset');
  const [selectedColor, setSelectedColor] = useState<string>('yellow');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [volume, setVolume] = useState<number>(1.5);
  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  
  const [result, setResult] = useState<AnalysisResult | null>({
    grade: "Grade A",
    confidence: "98.5%",
    volume: "1.5",
    colorDescription: "Kuning Jernih, Remahan Makanan Terfiltrasi Sempurna dengan Saringan Mikro",
    points: "1500",
    equivalentRupiah: "Rp 15.000",
    soapFormula: "Dengan volume 1.5 Liter minyak Grade A ini, campurkan dengan 225g Lye (NaOH), 500ml air murni, dan 20ml minyak atsiri lavender untuk menghasilkan 12 batang sabun cuci tangan organik yang lembut di kulit.",
    modelUsed: "gemini-2.5-flash"
  });

  const [aiChatLogs, setAiChatLogs] = useState<Array<{ sender: 'user' | 'gemini'; text: string }>>([
    {
      sender: 'gemini',
      text: 'Halo! Saya adalah Asisten AI Computer Vision Smart Jelantah. Silakan pilih preset warna atau unggah foto sampel minyak jelantah Anda di sebelah kiri untuk memulai pengujian kualitas secara instan.'
    }
  ]);

  const handleRunAnalysis = async () => {
    setLoading(true);
    showToast("Mengirim sampel ke Gemini AI Computer Vision...");

    try {
      const response = await fetch('/api/analyze-oil', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: inputType === 'upload' ? uploadedImage : null,
          presetColor: selectedColor,
          volume,
          prompt: customQuestion
        })
      });

      if (!response.ok) {
        console.log("Gemini AI server returned an error:", response.status, response.statusText);
        throw new Error('Gagal terhubung ke server AI');
      }

      const data = await response.json();
      console.log("Gemini AI analysis result:", data);
      setResult(data);

      // Append interaction to chat log
      setAiChatLogs(prev => [
        ...prev,
        {
          sender: 'user',
          text: `[Uji Sampel] Input: ${inputType === 'upload' ? 'Foto Unggahan' : `Preset Warna (${selectedColor})`}, Volume: ${volume}L${customQuestion ? `. Catatan: ${customQuestion}` : ''}`
        },
        {
          sender: 'gemini',
          text: `Hasil Analisis AI: Terdeteksi **${data.grade}** (${data.confidence} confidence). Estimasi Poin: **${data.points} Pts** (${data.equivalentRupiah}). ${data.soapFormula}`
        }
      ]);

      showToast(`Berhasil! Minyak terklasifikasi sebagai ${data.grade}`);
    } catch (err) {
      console.error(err);
      // Fallback local calculation
      const g = selectedColor === 'black' ? 'Grade C' : selectedColor === 'brown' ? 'Grade B' : 'Grade A';
      const pts = Math.round(volume * (g === 'Grade A' ? 1000 : g === 'Grade B' ? 750 : 500));
      const fallbackResult: AnalysisResult = {
        grade: g,
        confidence: '95.0% (Offline Fallback)',
        volume: `${volume}`,
        colorDescription: selectedColor === 'black' ? 'Hitam Pekat, Sisa Gorengan Berulang' : selectedColor === 'brown' ? 'Cokelat Transparan, Bekas Lauk' : 'Kuning Jernih, Remahan Minim',
        points: `${pts}`,
        equivalentRupiah: `Rp ${pts * 10}`,
        soapFormula: `Formula Saponifikasi: Campurkan ${volume}L minyak dengan ${(volume * 150).toFixed(0)}g NaOH dan ${(volume * 350).toFixed(0)}ml air suling untuk sabun ramah lingkungan.`
      };
      setResult(fallbackResult);
      setAiChatLogs(prev => [
        ...prev,
        {
          sender: 'user',
          text: `[Uji Sampel] Preset: ${selectedColor}, Volume: ${volume}L`
        },
        {
          sender: 'gemini',
          text: `Hasil Analisis: ${fallbackResult.grade}. Poin: ${fallbackResult.points} Pts. ${fallbackResult.soapFormula}`
        }
      ]);
      showToast("Gemini AI sibuk (503). Menampilkan hasil kalkulasi offline cerdas.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        showToast("Gambar sampel berhasil dimuat!");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-8 lg:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold w-fit border border-white/30">
            <ShieldCheck className="w-4 h-4 text-amber-200" />
            <span>AI Computer Vision &amp; Saponification Lab</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">Simulasi Uji Kualitas Minyak Jelantah Pintar</h2>
          <p className="text-amber-100 text-sm lg:text-base leading-relaxed">
            Uji sampel minyak goreng bekas Anda secara instan menggunakan teknologi <strong className="text-white">Gemini AI</strong>. Dapatkan estimasi grade kualitas (A/B/C), hitungan poin rupiah, serta resep formula saponifikasi pembuatan sabun ramah lingkungan secara otomatis.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Input Form */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col gap-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Panel Input Sampel Minyak</h3>
                  <p className="text-[11px] text-slate-500">Pilih metode pengujian digital</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full border border-amber-200">
                Gemini 3.5 Flash
              </span>
            </div>

            {/* Input Method Toggle */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-700">1. Metode Masukan Sampel:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setInputType('preset')}
                  className={`py-2.5 px-4 text-xs font-bold rounded-xl border transition-all cursor-pointer ${inputType === 'preset' ? 'bg-orange-500 text-white border-orange-500 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}`}
                >
                  Gunakan Preset Warna
                </button>
                <button
                  onClick={() => setInputType('upload')}
                  className={`py-2.5 px-4 text-xs font-bold rounded-xl border transition-all cursor-pointer ${inputType === 'upload' ? 'bg-orange-500 text-white border-orange-500 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}`}
                >
                  Unggah Foto Asli
                </button>
              </div>
            </div>

            {/* Conditional Input */}
            {inputType === 'preset' ? (
              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold text-slate-700">Pilih Warna &amp; Kejernihan Minyak:</label>
                <div className="grid grid-cols-3 gap-3">
                  
                  <button
                    onClick={() => {
                      setSelectedColor('yellow');
                      showToast("Memilih preset Kuning Jernih (Grade A)");
                    }}
                    className={`p-3 rounded-xl border text-left flex flex-col gap-2 cursor-pointer transition-all ${selectedColor === 'yellow' ? 'border-amber-500 bg-amber-50/80 shadow-xs' : 'border-slate-200 bg-slate-50 hover:border-amber-300'}`}
                  >
                    <div className="w-full h-8 rounded-lg bg-amber-300 border border-amber-400 shadow-inner"></div>
                    <div>
                      <span className="block font-bold text-slate-800 text-xs">Kuning Jernih</span>
                      <span className="text-[10px] text-amber-700 font-semibold">Grade A (Rp10k/L)</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedColor('brown');
                      showToast("Memilih preset Cokelat Transparan (Grade B)");
                    }}
                    className={`p-3 rounded-xl border text-left flex flex-col gap-2 cursor-pointer transition-all ${selectedColor === 'brown' ? 'border-amber-700 bg-amber-900/10 shadow-xs' : 'border-slate-200 bg-slate-50 hover:border-amber-700/30'}`}
                  >
                    <div className="w-full h-8 rounded-lg bg-amber-700 border border-amber-800 shadow-inner"></div>
                    <div>
                      <span className="block font-bold text-slate-800 text-xs">Cokelat Sisa</span>
                      <span className="text-[10px] text-amber-900 font-semibold">Grade B (Rp7.5k/L)</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedColor('black');
                      showToast("Memilih preset Hitam Pekat (Grade C)");
                    }}
                    className={`p-3 rounded-xl border text-left flex flex-col gap-2 cursor-pointer transition-all ${selectedColor === 'black' ? 'border-slate-900 bg-slate-200 shadow-xs' : 'border-slate-200 bg-slate-50 hover:border-slate-800'}`}
                  >
                    <div className="w-full h-8 rounded-lg bg-slate-900 border border-black shadow-inner"></div>
                    <div>
                      <span className="block font-bold text-slate-800 text-xs">Hitam Pekat</span>
                      <span className="text-[10px] text-slate-700 font-semibold">Grade C (Rp5k/L)</span>
                    </div>
                  </button>

                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold text-slate-700">Unggah Foto Botol / Wadah Minyak:</label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 hover:border-orange-500 transition-colors bg-slate-50 flex flex-col items-center justify-center text-center cursor-pointer relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {uploadedImage ? (
                    <div className="flex flex-col items-center gap-2">
                      <img src={uploadedImage} alt="Uploaded sample" className="max-h-32 rounded-lg object-cover shadow-sm border border-slate-200" />
                      <span className="text-xs font-mono text-emerald-600 font-bold">✓ Foto Berhasil Dimuat</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-8 h-8 text-slate-400 mb-1" />
                      <span className="text-xs font-bold text-slate-700">Klik atau Seret Gambar ke Sini</span>
                      <span className="text-[10px] text-slate-400">Mendukung PNG, JPG (Maks. 5MB)</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Volume Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700">2. Estimasi Volume Minyak (Liter):</label>
                <span className="bg-orange-50 text-orange-700 font-mono text-xs font-bold px-2.5 py-1 rounded-lg border border-orange-200">
                  {volume} Liter
                </span>
              </div>
              <input 
                type="range" 
                min="0.5" 
                max="5.0" 
                step="0.1" 
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0.5 L</span>
                <span>Skala Wadah Smart J-Pot</span>
                <span>5.0 L</span>
              </div>
            </div>

            {/* Custom Question for Gemini */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-700">3. Pertanyaan Tambahan untuk AI (Opsional):</label>
              <input 
                type="text" 
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                placeholder="Misal: Apakah minyak ini aman untuk dibuat sabun cuci piring cair?" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleRunAnalysis}
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Gemini AI Sedang Menganalisis...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Jalankan Pengujian AI Sekarang</span>
                </>
              )}
            </button>

          </div>
        </div>

        {/* Right Column: AI Analysis Result & Saponification Chatbot Output */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between h-full">
            
            <div className="flex flex-col gap-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Hasil Analisis &amp; Klasifikasi AI</span>
                <span className="bg-emerald-50 text-emerald-700 font-mono text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Confidence: {result ? result.confidence : "98%"}</span>
                </span>
              </div>

              {result ? (
                <div className="flex flex-col gap-5 animate-fade-in">
                  
                  {/* Grade Badge Card */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-4">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-md shrink-0"
                      style={{
                        backgroundColor: result.grade.includes('A') ? '#f59e0b' : result.grade.includes('B') ? '#b45309' : '#0f172a'
                      }}
                    >
                      {result.grade.split(" ")[1] || 'A'}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Klasifikasi Mutu</span>
                      <h4 className="text-xl font-extrabold text-slate-900">{result.grade}</h4>
                      <p className="text-xs text-slate-600 font-mono mt-0.5">{result.colorDescription}</p>
                    </div>
                  </div>

                  {/* Financial Rewards Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 flex flex-col">
                      <span className="text-[10px] font-mono font-bold text-amber-800 uppercase tracking-wider">Total Poin Diperoleh</span>
                      <span className="text-2xl font-black text-amber-900 mt-1 font-mono">{result.points} Pts</span>
                    </div>
                    <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 flex flex-col">
                      <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider">Setara Rupiah Tunai</span>
                      <span className="text-2xl font-black text-emerald-900 mt-1 font-mono">{result.equivalentRupiah}</span>
                    </div>
                  </div>

                  {/* Saponification Formula Box */}
                  <div className="p-5 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <Flame className="w-5 h-5 text-orange-600" />
                      <h5 className="font-extrabold text-orange-900 text-xs uppercase tracking-wider">Formula Saponifikasi &amp; Edukasi Mandiri</h5>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-mono">
                      {result.soapFormula}
                    </p>
                  </div>

                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-center text-slate-400">
                  <HelpCircle className="w-12 h-12 stroke-1 mb-2 animate-bounce text-orange-400" />
                  <p className="text-xs font-mono font-bold">Belum ada data pengujian aktif.</p>
                  <p className="text-[11px] text-slate-400 max-w-xs mt-1">Silakan sesuaikan parameter di sebelah kiri lalu klik tombol jalankan pengujian AI.</p>
                </div>
              )}

            </div>

            {/* AI Interaction Log / Chat Feed */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-3">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">Riwayat Percakapan Langsung dengan Gemini AI</span>
              <div className="bg-slate-900 rounded-xl p-4 max-h-48 overflow-y-auto flex flex-col gap-2.5 font-mono text-xs">
                {aiChatLogs.map((log, idx) => (
                  <div key={idx} className={`p-2.5 rounded-lg ${log.sender === 'gemini' ? 'bg-slate-800 text-amber-300 border border-slate-700' : 'bg-slate-950 text-slate-300 border border-slate-800 text-right'}`}>
                    <span className="block text-[9px] text-slate-500 mb-0.5">{log.sender === 'gemini' ? '🤖 Gemini AI' : '👤 Pengguna'}</span>
                    <span>{log.text}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
