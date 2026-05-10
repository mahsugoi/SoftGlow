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

function faq(btn) {
  const item = btn.closest('.faq-item');
  const open = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!open) item.classList.add('open');
}

const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.fade').forEach(el => io.observe(el));
