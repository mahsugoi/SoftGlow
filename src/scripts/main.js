const hdr = document.getElementById('hdr');
window.addEventListener('scroll', () => hdr.classList.toggle('up', scrollY > 20), {passive:true});

document.getElementById('ham').onclick = () => document.getElementById('mob').classList.add('show');
document.getElementById('mob-x').onclick = closeMob;
function closeMob() { document.getElementById('mob').classList.remove('show'); }
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMob(); });

const words = ['Handcrafted','Warm Light','PVC & Wood Sheet','LED 2700K','Baterai','Natural Look','Eco-Friendly','Garansi 3 Bulan'];
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

