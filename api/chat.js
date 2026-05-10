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

  const systemPrompt = `Kamu adalah asisten dari GlowHolder, produk lampu LED kayu handcrafted Indonesia.
Jawab pertanyaan seputar produk, cara order via WhatsApp, bahan kayu mahoni solid,
garansi 1 tahun, pengiriman JNE/J&T/SiCepat, custom laser engraving, dan info lainnya
dengan hangat dan ramah. Gunakan bahasa Indonesia. Maksimal 3-4 kalimat.`;

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
