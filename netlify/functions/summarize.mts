import type { Config } from '@netlify/functions'
import { GoogleGenAI, Type } from '@google/genai'

const ai = new GoogleGenAI({})

const PRD_CONTEXT = `
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
`

function personaPromptFor(persona: string) {
  switch (persona) {
    case 'irt':
      return 'Ibu Rumah Tangga (IRT) yang ingin mengolah limbah dapur menjadi pundi-pundi rupiah atau membuat sabun/lilin sendiri.'
    case 'kurir':
      return 'Kurir Lapangan yang ingin rute penjemputan yang optimal dan proses timbang yang serba otomatis tanpa catat manual.'
    case 'gudang':
      return 'Pengelola Gudang / Hub Pusat yang mementingkan kelancaran proses konsolidasi minyak massal, sterilisasi wadah, dan pengolahan biodiesel.'
    case 'investor':
      return 'Calon Investor atau Mitra Bisnis sirkular yang tertarik pada dampak sosial, efisiensi rantai pasok (supply chain) berkelanjutan, dan potensi pertumbuhan bisnis.'
    default:
      return 'Calon pelanggan umum atau masyarakat luas yang peduli lingkungan.'
  }
}

function fallbackResponse() {
  return {
    hook: 'Selamatkan Lingkungan, Raih Cuan dengan Smart Jelantah Hub!',
    highlights: [
      'Mulai mengumpulkan minyak jelantah dengan wadah pintar 1.2 Liter "Smart J-Pot" gratis yang dilengkapi penyaring mikro ganda.',
      'Dapatkan poin bernilai tinggi hingga Rp 10.000 per liter untuk Grade A yang bisa dicairkan langsung ke e-wallet favorit Anda.',
      'Manfaatkan AI Chatbot untuk belajar membuat sabun cuci piring atau lilin aromaterapi dari minyak jelantah di rumah secara aman.',
    ],
    callToAction: 'Gunakan Gemini API Key Anda untuk mendapatkan ringkasan yang dipersonalisasi khusus secara real-time!',
  }
}

export default async (req: Request) => {
  try {
    const { persona } = await req.json()

    const prompt = `
Kamu adalah seorang Spesialis Pemasaran dan Edukasi untuk Smart Jelantah Hub.
Berdasarkan dokumen spesifikasi produk di atas, buatlah ringkasan fitur otomatis dan penawaran nilai (value proposition) yang sangat menarik, disesuaikan untuk persona berikut: "${personaPromptFor(persona)}".

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
`

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ text: PRD_CONTEXT }, { text: prompt }],
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hook: { type: Type.STRING },
            highlights: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            callToAction: { type: Type.STRING },
          },
          required: ['hook', 'highlights', 'callToAction'],
        },
      },
    })

    const resultText = response.text ? response.text.trim() : '{}'
    return Response.json(JSON.parse(resultText))
  } catch (error) {
    console.error('Error summarizing features:', error)
    return Response.json(fallbackResponse())
  }
}

export const config: Config = {
  path: '/api/summarize',
  method: 'POST',
}
