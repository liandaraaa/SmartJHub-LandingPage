import React from 'react';
import { Sparkles, Layout, Cpu, FileText, Code } from 'lucide-react';
import { SummaryResult } from '../types';

interface VscodeSectionProps {
  selectedPersona: string;
  setSelectedPersona: (persona: string) => void;
  summaryLoading: boolean;
  summaryResult: SummaryResult | null;
  vscodeActiveFile: string;
  setVscodeActiveFile: (file: string) => void;
  handleGenerateSummary: () => void;
}

export default function VscodeSection({
  selectedPersona,
  setSelectedPersona,
  summaryLoading,
  summaryResult,
  vscodeActiveFile,
  setVscodeActiveFile,
  handleGenerateSummary
}: VscodeSectionProps) {
  return (
    <div className="bg-slate-900 rounded-xl border border-blue-500/30 overflow-hidden shadow-2xl flex flex-col">
      
      {/* VS Code Window Header */}
      <div className="bg-[#1E1E1E] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          </div>
          <div className="h-4 w-px bg-slate-800 mx-1"></div>
          <span className="text-xs font-mono text-slate-400 tracking-wider">VS Code + Live Server Extension</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-blue-900/40 text-blue-400 font-mono text-[9px] font-bold px-2 py-0.5 rounded border border-blue-800">
            DEVELOPMENT MODE
          </span>
          <span className="text-[10px] font-mono text-slate-400">Port 3000 (Proxy Reverse Nginx)</span>
        </div>
      </div>

      {/* Editor Workspace Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        
        {/* Left Sidebar: File Tree */}
        <div className="lg:col-span-3 bg-[#252526] text-slate-400 p-4 font-mono text-xs border-r border-slate-800 flex flex-col gap-6">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-3 font-sans">Explorer (Smart Jelantah)</span>
            <ul className="space-y-2">
              
              <li 
                id="vscode-file-gemini"
                onClick={() => setVscodeActiveFile('gemini_agent.py')}
                className={`flex items-center gap-2 p-1.5 rounded cursor-pointer transition-colors ${vscodeActiveFile === 'gemini_agent.py' ? 'bg-slate-800 text-white font-semibold' : 'hover:bg-slate-800/50'}`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>gemini_agent.py</span>
              </li>

              <li 
                id="vscode-file-streamlit"
                onClick={() => setVscodeActiveFile('streamlit_app.py')}
                className={`flex items-center gap-2 p-1.5 rounded cursor-pointer transition-colors ${vscodeActiveFile === 'streamlit_app.py' ? 'bg-slate-800 text-white font-semibold' : 'hover:bg-slate-800/50'}`}
              >
                <Layout className="w-3.5 h-3.5 text-red-400" />
                <span>streamlit_app.py</span>
              </li>

              <li 
                id="vscode-file-gradio"
                onClick={() => setVscodeActiveFile('gradio_app.py')}
                className={`flex items-center gap-2 p-1.5 rounded cursor-pointer transition-colors ${vscodeActiveFile === 'gradio_app.py' ? 'bg-slate-800 text-white font-semibold' : 'hover:bg-slate-800/50'}`}
              >
                <Cpu className="w-3.5 h-3.5 text-orange-400" />
                <span>gradio_app.py</span>
              </li>

              <li 
                id="vscode-file-firebase"
                onClick={() => setVscodeActiveFile('firebase_rules.json')}
                className={`flex items-center gap-2 p-1.5 rounded cursor-pointer transition-colors ${vscodeActiveFile === 'firebase_rules.json' ? 'bg-slate-800 text-white font-semibold' : 'hover:bg-slate-800/50'}`}
              >
                <FileText className="w-3.5 h-3.5 text-yellow-500" />
                <span>firebase_rules.json</span>
              </li>

            </ul>
          </div>

          <div className="border-t border-slate-800 pt-4 flex flex-col gap-3">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block font-sans">Live Server Status</span>
            <div className="p-3 rounded bg-[#1e1e1e] border border-slate-800">
              <span className="block text-[11px] text-slate-300">✓ Hot Reload Ready</span>
              <span className="block text-[9px] text-slate-500 mt-1 font-mono">Mengawasi file berekstensi .py, .tsx, .json untuk diunggah langsung ke Cloud Run.</span>
            </div>
          </div>
        </div>

        {/* Center Area: Python/TypeScript Code Editor Simulator */}
        <div className="lg:col-span-9 bg-[#1E1E1E] flex flex-col justify-between">
          
          {/* Active File Tab Header */}
          <div className="bg-[#2D2D2D] border-b border-slate-800 flex items-center px-4 py-2 text-xs font-mono text-slate-400">
            <div className="bg-[#1E1E1E] text-white px-3 py-1.5 border-t-2 border-blue-500 flex items-center gap-2 animate-fade-in">
              <Code className="w-3 h-3 text-blue-400" />
              <span>{vscodeActiveFile}</span>
            </div>
          </div>

          {/* Simulated Code Body based on active tab */}
          <div className="p-6 font-mono text-xs text-slate-300 flex-1 overflow-x-auto min-h-[250px] leading-relaxed">
            
            {vscodeActiveFile === 'gemini_agent.py' && (
              <pre className="text-emerald-400">
{`# integration_gemini.py
from google import genai
from google.genai import types

# Menginisialisasi Gemini SDK dengan API Key aman
client = genai.Client(api_key=process.env.GEMINI_API_KEY)

def generate_customer_summary(persona_type):
    """
    Menghasilkan ringkasan fitur otomatis yang dikustomisasi secara real-time
    berdasarkan target persona penerima (Ibu Rumah Tangga, Kurir, Investor).
    """
    prompt = f"Buat ringkasan fitur Smart Jelantah Hub untuk persona: {persona_type}"
    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json"
        )
    )
    return response.text`}
              </pre>
            )}

            {vscodeActiveFile === 'streamlit_app.py' && (
              <pre className="text-red-400">
{`# streamlit_app.py
import streamlit as st
import pandas as pd

st.set_page_config(page_title="Smart Jelantah Hub Central Dashboard")
st.title("Sistem Ekosistem Pengelolaan Minyak Jelantah Pintar")

# IoT Bluetooth scale sync logging (KR-02)
st.sidebar.header("Konfigurasi Hub")
region = st.sidebar.selectbox("Pilih Kecamatan", ["Kebayoran Baru", "Setiabudi"])

st.metric("Total Minyak Terkumpul (Liter)", "1,420 L")
st.metric("Emisi Karbon Berhasil Dikurangi", "2,982 Kg")`}
              </pre>
            )}

            {vscodeActiveFile === 'gradio_app.py' && (
              <pre className="text-orange-400">
{`# gradio_app.py
import gradio as gr
import tensorflow as tf

def predict_oil_grade(image_input, volume):
    # Memproses Computer Vision & Color Analysis (APP-01)
    grade = check_clarity_grade(image_input)
    points = calculate_points(grade, volume)
    return {
        "grade": grade,
        "points_earned": points,
        "formula": get_ai_soap_recipe(grade, volume)
    }

demo = gr.Interface(
    fn=predict_oil_grade,
    inputs=[gr.Image(), gr.Slider(0.5, 5.0)],
    outputs="json"
)
demo.launch(server_name="0.0.0.0", server_port=7860)`}
              </pre>
            )}

            {vscodeActiveFile === 'firebase_rules.json' && (
              <pre className="text-yellow-400">
{`{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null && auth.uid == $uid",
        ".write": "auth != null && auth.uid == $uid"
      }
    },
    "courier_routes": {
      ".read": "auth != null && auth.token.is_courier == true",
      ".write": "auth != null && auth.token.is_courier == true"
    }
  }
}`}
              </pre>
            )}

          </div>

          {/* Interactive Console Footer: Run Gemini API for dynamic summaries */}
          <div className="bg-[#1E1E1E] p-4 border-t border-slate-800 flex flex-col gap-4">
            
            {/* Action row with select dropdown */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-[#252526] p-3 rounded border border-slate-800">
              
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <span className="text-emerald-500">&gt;_</span>
                <span className="font-bold">Uji API Key: Pilih Persona Calon Pelanggan:</span>
                <select 
                  id="vscode-select-persona"
                  value={selectedPersona} 
                  onChange={(e) => setSelectedPersona(e.target.value)}
                  className="bg-slate-900 text-white border border-slate-700 rounded px-2.5 py-1 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="irt">Ibu Rumah Tangga (IRT)</option>
                  <option value="kurir">Kurir Lapangan</option>
                  <option value="gudang">Pengelola Gudang (Hub Pusat)</option>
                  <option value="investor">Mitra Bisnis / Calon Investor</option>
                </select>
              </div>

              <button 
                id="vscode-run-summary-btn"
                onClick={handleGenerateSummary}
                disabled={summaryLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold font-mono uppercase px-4 py-2 rounded cursor-pointer transition-colors disabled:bg-slate-700 disabled:cursor-not-allowed flex items-center gap-1.5 shrink-0"
              >
                {summaryLoading ? (
                  <>
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                    <span>Memanggil Gemini AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Hubungkan &amp; Ringkas Fitur</span>
                  </>
                )}
              </button>

            </div>

            {/* API response output console */}
            <div className="bg-slate-950 p-4 rounded border border-slate-800 font-mono text-[11px] text-slate-300">
              <div className="flex items-center justify-between text-[10px] text-slate-500 mb-3 pb-2 border-b border-slate-900">
                <span>CONSOLE OUTPUT</span>
                <span>RESPONSE: OK 200</span>
              </div>

              {summaryResult ? (
                <div className="space-y-3 animate-fade-in">
                  <p><strong className="text-blue-400">HOOK PROMOSI:</strong> <span className="text-white font-sans">{summaryResult.hook}</span></p>
                  
                  <div>
                    <strong className="text-blue-400 block mb-1">FITUR UNGGULAN OTOMATIS:</strong>
                    <ul className="list-disc pl-5 space-y-1 text-slate-300 font-sans">
                      {summaryResult.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  </div>

                  <p><strong className="text-blue-400">CALL TO ACTION:</strong> <span className="text-white font-sans font-medium">{summaryResult.callToAction}</span></p>
                </div>
              ) : (
                <p className="text-slate-500">Klik tombol di atas untuk melihat ringkasan pemasaran instan yang dipersonalisasi oleh Gemini AI.</p>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
