import React from 'react';
import { Upload, Sparkles, Flame, HelpCircle } from 'lucide-react';
import { AnalysisResult } from '../types';

interface GradioSectionProps {
  gradioInputType: 'preset' | 'upload';
  setGradioInputType: (type: 'preset' | 'upload') => void;
  selectedPresetColor: string;
  setSelectedPresetColor: (color: string) => void;
  uploadedImage: string | null;
  customVolume: number;
  setCustomVolume: (vol: number) => void;
  analysisLoading: boolean;
  analysisResult: AnalysisResult | null;
  handleAnalyzeOil: () => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showToast: (msg: string) => void;
}

export default function GradioSection({
  gradioInputType,
  setGradioInputType,
  selectedPresetColor,
  setSelectedPresetColor,
  uploadedImage,
  customVolume,
  setCustomVolume,
  analysisLoading,
  analysisResult,
  handleAnalyzeOil,
  handleImageChange,
  showToast
}: GradioSectionProps) {
  return (
    <div className="bg-white rounded-xl border border-orange-500/30 overflow-hidden shadow-xs">
      
      {/* Mock Gradio style header */}
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-xs">
            G
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold">Gradio Machine Learning Interface</span>
            <span className="text-sm font-bold text-slate-800 font-mono">oil_scan_classifier.py</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-orange-100 text-orange-800 font-mono text-[9px] font-bold px-2 py-0.5 rounded border border-orange-200">
            PORT: 7860
          </span>
          <span className="bg-blue-100 text-blue-800 font-mono text-[9px] font-bold px-2 py-0.5 rounded border border-blue-200">
            Model: Computer Vision & Color Analysis
          </span>
        </div>
      </div>

      {/* Gradio Content Block */}
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-900 font-mono">AI Scan & Quality Check Playground (APP-01)</h3>
          <p className="text-xs text-slate-500">Gunakan sandbox Gradio ini untuk mengunggah sampel minyak jelantah Anda, mendeteksi grade kualitas secara instan, dan menghitung poin serta rumus saponifikasinya secara akurat.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Gradio Left Side: Inputs */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            
            {/* Gradio Input Box 1 */}
            <div className="border border-slate-200 rounded p-4 bg-slate-50 flex flex-col gap-4">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">Step 1: Pilih / Unggah Sampel Minyak</span>
              
              <div className="flex gap-2">
                <button 
                  id="gradio-btn-preset"
                  onClick={() => setGradioInputType('preset')}
                  className={`flex-1 py-2 text-xs font-bold font-mono uppercase rounded cursor-pointer transition-colors ${gradioInputType === 'preset' ? 'bg-orange-500 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
                >
                  Gunakan Color Preset
                </button>
                <button 
                  id="gradio-btn-upload"
                  onClick={() => setGradioInputType('upload')}
                  className={`flex-1 py-2 text-xs font-bold font-mono uppercase rounded cursor-pointer transition-colors ${gradioInputType === 'upload' ? 'bg-orange-500 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
                >
                  Unggah Foto Minyak
                </button>
              </div>

              {gradioInputType === 'preset' ? (
                <div className="flex flex-col gap-3">
                  <label className="text-xs text-slate-600 font-medium">Pilih warna simulasi jelantah Anda:</label>
                  <div className="grid grid-cols-3 gap-3">
                    
                    <button 
                      id="gradio-preset-yellow"
                      onClick={() => {
                        setSelectedPresetColor('yellow');
                        showToast("Memilih preset minyak Grade A (Kuning Jernih)");
                      }}
                      className={`p-3 rounded border text-left flex flex-col gap-2 cursor-pointer transition-all ${selectedPresetColor === 'yellow' ? 'border-amber-500 bg-amber-50' : 'border-slate-200 bg-white hover:border-amber-200'}`}
                    >
                      <div className="w-full h-8 rounded bg-amber-300 border border-amber-400"></div>
                      <div>
                        <span className="block font-bold text-slate-800 text-xs">Kuning Jernih</span>
                        <span className="text-[9px] text-slate-500">Estimasi: Grade A</span>
                      </div>
                    </button>

                    <button 
                      id="gradio-preset-brown"
                      onClick={() => {
                        setSelectedPresetColor('brown');
                        showToast("Memilih preset minyak Grade B (Cokelat Sisa Gorengan)");
                      }}
                      className={`p-3 rounded border text-left flex flex-col gap-2 cursor-pointer transition-all ${selectedPresetColor === 'brown' ? 'border-amber-700 bg-amber-50/50' : 'border-slate-200 bg-white hover:border-amber-700/20'}`}
                    >
                      <div className="w-full h-8 rounded bg-amber-700 border border-amber-800"></div>
                      <div>
                        <span className="block font-bold text-slate-800 text-xs">Cokelat Transparan</span>
                        <span className="text-[9px] text-slate-500">Estimasi: Grade B</span>
                      </div>
                    </button>

                    <button 
                      id="gradio-preset-black"
                      onClick={() => {
                        setSelectedPresetColor('black');
                        showToast("Memilih preset minyak Grade C (Hitam Pekat)");
                      }}
                      className={`p-3 rounded border text-left flex flex-col gap-2 cursor-pointer transition-all ${selectedPresetColor === 'black' ? 'border-slate-900 bg-slate-100' : 'border-slate-200 bg-white hover:border-slate-900/30'}`}
                    >
                      <div className="w-full h-8 rounded bg-slate-900 border border-black"></div>
                      <div>
                        <span className="block font-bold text-slate-800 text-xs">Hitam Pekat</span>
                        <span className="text-[9px] text-slate-500">Estimasi: Grade C</span>
                      </div>
                    </button>

                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <label className="text-xs text-slate-600 font-medium">Unggah atau seret gambar botol minyak jelantah Anda:</label>
                  
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 hover:border-orange-400 transition-colors bg-white flex flex-col items-center justify-center text-center cursor-pointer relative">
                    <input 
                      id="gradio-file-input"
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {uploadedImage ? (
                      <div className="flex flex-col items-center gap-2">
                        <img src={uploadedImage} alt="Sampel Minyak Jelantah" className="max-h-28 rounded object-cover border border-slate-200 shadow-sm" />
                        <span className="text-xs font-mono text-emerald-600 font-semibold">✓ Gambar Siap Dipindai</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="w-8 h-8 text-slate-400" />
                        <span className="text-xs text-slate-600 font-bold">Pilih Gambar atau Tarik ke Sini</span>
                        <span className="text-[10px] text-slate-400">Mendukung JPEG, PNG hingga 5MB</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Gradio Input Box 2 */}
            <div className="border border-slate-200 rounded p-4 bg-slate-50 flex flex-col gap-4">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">Step 2: Masukkan Estimasi Volume</span>
              
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs text-slate-600 font-mono">Volume Cairan (Liter):</label>
                  <span className="text-xs font-mono font-bold text-orange-600 bg-white border border-slate-200 px-2 py-0.5 rounded">{customVolume} Liter</span>
                </div>
                <input 
                  id="gradio-slider-volume"
                  type="range" 
                  min="0.5" 
                  max="5.0" 
                  step="0.1"
                  value={customVolume}
                  onChange={(e) => setCustomVolume(parseFloat(e.target.value))}
                  className="w-full accent-orange-500" 
                />
                <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                  <span>Min: 0.5L</span>
                  <span>Skala Kontras WP-02</span>
                  <span>Max: 5.0L</span>
                </div>
              </div>
            </div>

            {/* Submit button */}
            <button 
              id="gradio-submit-btn"
              onClick={handleAnalyzeOil}
              disabled={analysisLoading}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold font-mono uppercase tracking-wider hover:bg-orange-600 cursor-pointer transition-colors flex items-center justify-center gap-2 shadow-sm disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              {analysisLoading ? (
                <>
                  <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                  <span>Menganalisis Kualitas Minyak via AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Kirim & Scan Menggunakan Computer Vision AI</span>
                </>
              )}
            </button>

          </div>

          {/* Gradio Right Side: Output Results from Gemini API / custom logic */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            
            <div className="border border-slate-200 rounded-lg p-5 bg-white h-full flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">Hasil Pemindaian AI (Output)</span>
                  <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold font-mono px-2 py-0.5 rounded border border-emerald-200">
                    Confidence: {analysisResult ? analysisResult.confidence : "0%"}
                  </span>
                </div>

                {analysisResult ? (
                  <div className="flex flex-col gap-4">
                    
                    {/* Main Grade display block */}
                    <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center font-black text-2xl text-white shrink-0"
                        style={{ 
                          backgroundColor: analysisResult.grade === 'Grade A' ? '#f59e0b' : analysisResult.grade === 'Grade B' ? '#b45309' : '#0f172a' 
                        }}
                      >
                        {analysisResult.grade.split(" ")[1]}
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 font-mono block">Detected Quality</span>
                        <h4 className="text-lg font-extrabold text-slate-800 uppercase">{analysisResult.grade}</h4>
                        <p className="text-[11px] text-slate-500 font-mono">{analysisResult.colorDescription}</p>
                      </div>
                    </div>

                    {/* Calculated Economics values */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded border border-slate-100 bg-slate-50">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-0.5">Total Reward Poin</span>
                        <span className="text-xl font-bold text-slate-800 font-mono">{analysisResult.points} Pts</span>
                      </div>
                      <div className="p-3 rounded border border-slate-100 bg-slate-50">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-0.5">Setara Rupiah</span>
                        <span className="text-xl font-bold text-emerald-600 font-mono">{analysisResult.equivalentRupiah}</span>
                      </div>
                    </div>

                    {/* AI Generated Saponification creative formula */}
                    <div className="p-4 rounded border border-orange-100 bg-orange-50/20">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Flame className="w-4 h-4 text-orange-500" />
                        <span className="text-xs font-bold text-orange-800 font-mono uppercase tracking-tight">AI Chatbot Saponifikasi &amp; Edukasi (APP-02)</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-mono">
                        {analysisResult.soapFormula}
                      </p>
                    </div>

                  </div>
                ) : (
                  <div className="h-64 flex flex-col items-center justify-center text-center text-slate-400">
                    <HelpCircle className="w-12 h-12 stroke-1 mb-2 animate-bounce" />
                    <p className="text-xs font-mono">Belum ada data pemindaian minyak.</p>
                    <p className="text-[10px] text-slate-400 max-w-xs mt-1">Gunakan panel input di sebelah kiri lalu klik &ldquo;Kirim &amp; Scan&rdquo; untuk memicu Gemini Computer Vision.</p>
                  </div>
                )}
              </div>

              <div className="text-[10px] text-slate-400 border-t border-slate-100 pt-4 mt-4 font-mono">
                *Batas toleransi kesalahan estimasi volume kamera adalah &plusmn; 100 ml. Data dikunci untuk transaksi fisik kurir lapangan.
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
