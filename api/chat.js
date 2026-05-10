export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  if (!message || !message.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const systemPrompt = `Kamu adalah asisten virtual dari GlowHolder — produk lampu LED multifungsi buatan Indonesia.

TENTANG PRODUK:
- Nama: GlowHolder Wooden LED Lamp
- Brand: SOFGLOW | GlowHolder
- Fungsi: Organizer + night lamp dalam satu desain minimalis
- Rangka: PVC pipa dan wood sheet, difinishing natural
- Cahaya: LED warm white 2700K, nyaman di mata
- Daya: Baterai (tanpa kabel), tombol on/off
- Garansi: 3 bulan
- Konsep: "Hold your things. Glow your space."
- Cocok untuk: meja kerja, sudut baca, momen santai
- Material: ramah lingkungan, cat water-based
- Tersedia custom laser engraving (nama/text)

CARA ORDER:
- Via WhatsApp: +62 812-4892-4820
- Klik tombol Order WA di website, chat otomatis terisi
- Pembayaran transfer, pengiriman JNE/J&T/SiCepat
- Jawa 1-2 hari, luar Jawa 3-5 hari kerja

SOSIAL MEDIA:
- Instagram: @sofglow.id

INFORMASI TAMBAHAN:
- Harga: tanyakan via WhatsApp
- GlowHolder adalah proyek mahasiswa — dibuat dengan cinta
- Handcrafted in Indonesia

Jawab pertanyaan dengan hangat dan ramah. Gunakan bahasa Indonesia. Maksimal 3-4 kalimat. Jika ditanya di luar konteks GlowHolder, arahkan kembali ke produk.`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(500).json({ error: `Groq API error: ${err}` });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'Maaf, saya tidak bisa menjawab saat ini.';

    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
