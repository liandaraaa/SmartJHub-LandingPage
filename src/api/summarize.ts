import { Router } from "express";
import { ai, Type } from "./aiClient";

const router = Router();

router.post("/summarize", async (req, res) => {
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

    let response;
    try {
      response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
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
    } catch (err1: any) {
      console.warn("gemini-2.5-flash failed in /api/summarize, trying gemini-1.5-flash...", err1?.message);
      try {
        response = await ai.models.generateContent({
          model: "gemini-1.5-flash",
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
      } catch (err2: any) {
        console.warn("gemini-1.5-flash also failed in /api/summarize. Using fallback response.", err2?.message);
        return res.json({
          hook: `Selamatkan Lingkungan, Raih Cuan Maksimal dengan Smart Jelantah Hub! (AI Fallback)`,
          highlights: [
            `Gunakan wadah Smart J-Pot berperekat skala transparan dengan penyaring mikro ganda terintegrasi untuk menyaring sisa kotoran dapur.`,
            `Dapatkan poin kompetitif hingga Rp 10.000 per liter untuk Grade A yang langsung cair ke e-wallet atau donasi sosial.`,
            `Akses resep saponifikasi otomatis instan untuk mendaur ulang minyak jelantah menjadi sabun dan lilin ramah lingkungan di rumah.`
          ],
          callToAction: `Mulai setor minyak jelantah Anda hari ini dan jadilah bagian dari gerakan hijau berkelanjutan!`
        });
      }
    }

    const resultText = response.text ? response.text.trim() : "{}";
    const resultJson = JSON.parse(resultText);
    res.json(resultJson);
  } catch (error: any) {
    console.error("Error summarizing features:", error);
    res.status(500).json({ error: error.message || "Gagal menghasilkan ringkasan fitur otomatis." });
  }
});

export default router;
