const hdr = document.getElementById('hdr');
window.addEventListener('scroll', () => hdr.classList.toggle('up', scrollY > 20), {passive:true});

document.getElementById('ham').onclick = () => document.getElementById('mob').classList.add('show');
document.getElementById('mob-x').onclick = closeMob;
function closeMob() { document.getElementById('mob').classList.remove('show'); }

const words = ['Handcrafted','Warm Light','Kayu Solid','LED 2700K','Touch Control','Eco-Friendly','Made with Love','Garansi 1 Tahun'];
const t = document.getElementById('mtrack');
const all = [...words,...words,...words,...words];
t.innerHTML = all.map(w => `<span class="mitem"><span class="mdot"></span>${w}</span>`).join('');

function swap(btn, src) {
  const img = document.getElementById('main-img');
  img.classList.add('fade-swap');
  setTimeout(() => { img.src = src; img.classList.remove('fade-swap'); }, 280);
  document.querySelectorAll('.thumbs button').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
}


const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.fade').forEach(el => io.observe(el));

// AI Assistant
const aiPanel = document.getElementById('aiPanel');
const aiOverlay = document.getElementById('aiOverlay');
const aiBody = document.getElementById('aiBody');
const aiInput = document.getElementById('aiInput');
const aiTyping = document.getElementById('aiTyping');

function toggleAI() {
  const show = aiPanel.classList.toggle('show');
  aiOverlay.classList.toggle('show', show);
  if (show) aiInput.focus();
}

function closeAI() {
  aiPanel.classList.remove('show');
  aiOverlay.classList.remove('show');
}

aiInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') sendAI();
});

async function sendAI() {
  const msg = aiInput.value.trim();
  if (!msg) return;

  aiInput.value = '';
  addMessage(msg, 'user');
  aiTyping.style.display = 'flex';
  scrollAI();

  try {
    const res = await fetch('https://sof-glow.vercel.app/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: msg }),
    });

    if (!res.ok) throw new Error('Gagal terhubung ke server');

    const data = await res.json();
    aiTyping.style.display = 'none';
    addMessage(data.reply, 'bot');
    scrollAI();
  } catch {
    aiTyping.style.display = 'none';
    addMessage('Maaf, sedang ada gangguan. Silakan coba lagi.', 'bot');
    scrollAI();
  }
}

function addMessage(text, sender) {
  const div = document.createElement('div');
  div.className = `ai-msg ai-${sender}`;
  div.innerHTML = `<div class="ai-msg-content">${text}</div>`;
  aiBody.insertBefore(div, aiTyping);
}

function scrollAI() {
  aiBody.scrollTop = aiBody.scrollHeight;
}
