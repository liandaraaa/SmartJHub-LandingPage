import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Initialize Gemini API
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use JSON parsing with larger size limit for base64 images
  app.use(express.json({ limit: '10mb' }));

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // End point: Summarize features automatically for persona
  app.post("/api/summarize", async (req, res) => {
    try {
      const { persona } = req.body;
      
      const prdContext = `
PRODUCT REQUIREMENT DOCUMENT (PRD) - Smart Jelantah Hub
Sistem Ekosistem Pengelolaan Minyak Jelantah Pintar Berbasis Komunitas

Target Pengguna: Ibu Rumah Tangga (IRT), Kurir Lapangan, & Pengelola Gudang (Hub Pusat)

Wadah Fisik (Smart J-Pot):
- WP-01 (Saringan Mikro Ganda Pasif): Lapisan saringan stainless steel mesh mikro terintegrasi untuk menyaring kotoran kasar.
- WP-02 (Dinding Skala Transparan): Material transparan kokoh berperekat indikator skala mililiter/liter bergradasi kontras agar terbaca optimal oleh kamera ponsel.
- WP-03 (Identitas Digital QR/NFC): Stiker pelat kode QR unik yang tahan minyak dan air untuk pencocokan data akun dengan nomor seri aset wadah.
- WP-04 (Katup Keran Pembuang Dasar): Komponen keran kecil di bagian alas tabung bawah untuk membuang lapisan air/gliserol hasil sampingan pembuatan sabun mandiri.

Fitur Utama Aplikasi & Integrasi AI:
- APP-01 (AI Scan & Quality Check): Modul kamera berbasis Computer Vision yang otomatis membaca kode QR wadah, memindai garis batas ketinggian minyak untuk menghitung estimasi volume cairan, serta menilai gradasi kejernihan minyak guna menentukan grade kualitas (A/B/C) secara instan.
- APP-02 (AI Chatbot Formula Tutor): Asisten percakapan pintar untuk membantu menghitung rasio saponifikasi aman pembuatan sabun atau pelelehan lilin aromaterapi di rumah secara interaktif berdasarkan sisa volume minyak di dalam wadah.
- APP-03 (Dompet & Penukaran Poin): Fasilitasi pencairan saldo poin menjadi nilai e-wallet komersial, token pulsa, tagihan listrik, atau disalurkan sebagai donasi sosial.
- KR-01 (AI Smart Route Solver): Algoritma optimasi rute (Vehicle Routing Problem) untuk penjemputan minyak berdasarkan jarak terdekat dan efisiensi bahan bakar kurir per jendela waktu 3 jam.
- KR-02 (Bluetooth Scale Sync): Konektivitas nirkabel dari aplikasi kurir ke timbangan gantung digital portable di lapangan untuk memverifikasi berat riil minyak tanpa entri manual.

Konversi Nilai Ekonomi:
- Grade A (Kuning Jernih, Remahan Minim): 1.000 Poin / Liter (Setara Rp10.000,-).
- Grade B (Cokelat Transparan, Bekas Lauk Rumah Tangga): 750 Poin / Liter.
- Grade C (Hitam Pekat, Bekas Penggunaan Berulang): 500 Poin / Liter.

Gamifikasi & Loyalty:
- Sistem Tingkatan Akun (User Tiering):
  - Tier 1 - Newbie Cook (0-5 Liter): Multiplier 1x.
  - Tier 2 - Green Mom (6-20 Liter): Bonus tambahan +5% poin akselerasi.
  - Tier 3 - Jelantah Master (>20 Liter): Bonus tambahan +10% poin akselerasi + akses prioritas penjemputan cepat.
- Tantangan Komunitas (Neighborhood Leaderboard): Menampilkan grafik kontribusi volume minyak antar kelompok area (RT/RW) secara berkala.
- Streak Counter: Voucher Sembako Elektronik jika menyetor rutin minimal 1 kali per bulan selama 3 bulan berturut-turut.
      `;

      let personaPrompt = "";
      if (persona === "irt") {
        personaPrompt = "Ibu Rumah Tangga (IRT) yang ingin mengolah limbah dapur menjadi pundi-pundi rupiah atau membuat sabun/lilin sendiri.";
      } else if (persona === "kurir") {
        personaPrompt = "Kurir Lapangan yang ingin rute penjemputan yang optimal dan proses timbang yang serba otomatis tanpa catat manual.";
      } else if (persona === "gudang") {
        personaPrompt = "Pengelola Gudang / Hub Pusat yang mementingkan kelancaran proses konsolidasi minyak massal, sterilisasi wadah, dan pengolahan biodiesel.";
      } else if (persona === "investor") {
        personaPrompt = "Calon Investor atau Mitra Bisnis sirkular yang tertarik pada dampak sosial, efisiensi rantai pasok (supply chain) berkelanjutan, dan potensi pertumbuhan bisnis.";
      } else {
        personaPrompt = "Calon pelanggan umum atau masyarakat luas yang peduli lingkungan.";
      }

      const prompt = `
Kamu adalah seorang Spesialis Pemasaran dan Edukasi untuk Smart Jelantah Hub.
Berdasarkan dokumen spesifikasi produk di atas, buatlah ringkasan fitur otomatis dan penawaran nilai (value proposition) yang sangat menarik, disesuaikan untuk persona berikut: "${personaPrompt}".

Format output harus berupa JSON dengan struktur sebagai berikut:
{
  "hook": "Judul kalimat pembuka atau jargon yang sangat menarik perhatian persona ini",
  "highlights": [
    "Poin kunci 1 yang paling relevan (misal wadah Smart J-Pot atau sistem poin/rute)",
    "Poin kunci 2 yang paling relevan",
    "Poin kunci 3 yang paling relevan"
  ],
  "callToAction": "Kalimat penutup yang memotivasi persona ini untuk segera bergabung atau menggunakan Smart Jelantah Hub"
}

Pastikan bahasa yang digunakan adalah Bahasa Indonesia yang ramah, profesional, dan persuasif. Jangan gunakan markdown di luar JSON.
      `;

      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY") {
        // Fallback mock response if API Key is not set or placeholder
        return res.json({
          hook: `Selamatkan Lingkungan, Raih Cuan dengan Smart Jelantah Hub! [Demo Mode]`,
          highlights: [
            `Mulai mengumpulkan minyak jelantah dengan wadah pintar 1.2 Liter "Smart J-Pot" gratis yang dilengkapi penyaring mikro ganda.`,
            `Dapatkan poin bernilai tinggi hingga Rp 10.000 per liter untuk Grade A yang bisa dicairkan langsung ke e-wallet favorit Anda.`,
            `Manfaatkan AI Chatbot untuk belajar membuat sabun cuci piring atau lilin aromaterapi dari minyak jelantah di rumah secara aman.`
          ],
          callToAction: `Gunakan Gemini API Key Anda untuk mendapatkan ringkasan yang dipersonalisasi khusus secara real-time!`
        });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
          { text: prdContext },
          { text: prompt }
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              hook: { type: Type.STRING },
              highlights: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              callToAction: { type: Type.STRING }
            },
            required: ["hook", "highlights", "callToAction"]
          }
        }
      });

      const resultText = response.text ? response.text.trim() : "{}";
      const resultJson = JSON.parse(resultText);
      res.json(resultJson);
    } catch (error: any) {
      console.error("Error summarizing features:", error);
      res.status(500).json({ error: error.message || "Gagal menghasilkan ringkasan fitur otomatis." });
    }
  });

  // End point: Analyze cooking oil using image or preset simulation
  app.post("/api/analyze-oil", async (req, res) => {
    try {
      const { image, presetColor, prompt } = req.body;

      let imagePart: any = null;
      let promptText = "";

      if (image) {
        // Real image was uploaded
        const base64Data = image.split(",")[1] || image;
        imagePart = {
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Data
          }
        };

        promptText = `
Anda adalah modul AI Scan & Quality Check (Computer Vision) untuk Smart Jelantah Hub.
Tugas Anda adalah memindai foto minyak jelantah dalam wadah ini untuk menentukan:
1. Volume minyak dalam liter (estimasi antara 0.5 hingga 5.0 liter).
2. Tingkat kecerahan/warna minyak untuk menentukan grade kualitas:
   - Grade A: Kuning Jernih, Remahan Minim.
   - Grade B: Cokelat Transparan, Bekas Lauk Rumah Tangga.
   - Grade C: Hitam Pekat, Bekas Penggunaan Berulang.
3. Berikan resep formulasi saponifikasi kreatif untuk membuat sabun atau lilin aromaterapi dari minyak ini (sesuai volume yang terdeteksi).

Format output harus JSON:
{
  "grade": "Grade A" atau "Grade B" atau "Grade C",
  "confidence": "Angka persentase keyakinan (misal 95%)",
  "volume": "Volume dalam Liter (misal 1.2)",
  "colorDescription": "Deskripsi warna minyak yang teramati",
  "points": "Jumlah poin yang didapatkan (Grade A: 1000/L, Grade B: 750/L, Grade C: 500/L) kali volume, bulatkan ke angka terdekat",
  "equivalentRupiah": "Poin dikonversi ke Rupiah (1 poin = Rp10)",
  "soapFormula": "Instruksi singkat pembuatan sabun/lilin di rumah berdasarkan volume minyak yang terdeteksi"
}
        `;
      } else {
        // Preset simulation or text fallback
        promptText = `
Kamera mensimulasikan pemindaian minyak dengan warna utama: "${presetColor || 'kuning'}".
Tentukan spesifikasi kualitas minyak tersebut untuk Smart Jelantah Hub.

Format output harus JSON:
{
  "grade": "Grade A" atau "Grade B" atau "Grade C" (sesuai preset warna: kuning -> Grade A, cokelat -> Grade B, hitam/gelap -> Grade C),
  "confidence": "98%",
  "volume": "1.2",
  "colorDescription": "Deskripsi warna minyak yang disimulasikan sesuai preset",
  "points": "Jumlah poin sesuai hitungan volume x tarif per Grade (Grade A = 1000/L, Grade B = 750/L, Grade C = 500/L)",
  "equivalentRupiah": "Nilai rupiah yang setara",
  "soapFormula": "Rekomendasi singkat formula saponifikasi untuk membuat sabun cuci piring ramah lingkungan dari minyak ini"
}
        `;
      }

      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY") {
        // Fallback mock response for analysis if Gemini API key not present
        const g = presetColor === "black" ? "Grade C" : presetColor === "brown" ? "Grade B" : "Grade A";
        const rate = g === "Grade A" ? 1000 : g === "Grade B" ? 750 : 500;
        const vol = 1.2;
        const pts = Math.round(vol * rate);
        return res.json({
          grade: g,
          confidence: "95% (Demo Mode)",
          volume: `${vol}`,
          colorDescription: g === "Grade A" ? "Kuning Jernih, Remahan Minim (Demo)" : g === "Grade B" ? "Cokelat Transparan, Sisa Gorengan (Demo)" : "Hitam Pekat, Bekas Penggunaan Berulang (Demo)",
          points: `${pts}`,
          equivalentRupiah: `Rp ${(pts * 10).toLocaleString('id-ID')}`,
          soapFormula: `[AI Saponifikasi Formula - Demo]: Campurkan ${vol} Liter minyak jelantah saringan ganda Anda dengan 180g NaOH (Lye) dan 450ml air suling. Tambahkan minyak atsiri jeruk nipis untuk aroma segar.`
        });
      }

      const contents: any[] = [];
      if (imagePart) {
        contents.push(imagePart);
      }
      contents.push({ text: promptText });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              grade: { type: Type.STRING },
              confidence: { type: Type.STRING },
              volume: { type: Type.STRING },
              colorDescription: { type: Type.STRING },
              points: { type: Type.STRING },
              equivalentRupiah: { type: Type.STRING },
              soapFormula: { type: Type.STRING }
            },
            required: ["grade", "confidence", "volume", "colorDescription", "points", "equivalentRupiah", "soapFormula"]
          }
        }
      });

      const resultText = response.text ? response.text.trim() : "{}";
      const resultJson = JSON.parse(resultText);
      res.json(resultJson);
    } catch (error: any) {
      console.error("Error analyzing cooking oil:", error);
      res.status(500).json({ error: error.message || "Gagal menganalisis minyak jelantah." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
