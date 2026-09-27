// ===== Эффект дождя =====
const canvas = document.getElementById('rain');
const ctx = canvas.getContext('2d');
let w, h, drops;

function initRain() {
  canvas.width = w = window.innerWidth;
  canvas.height = h = window.innerHeight;
  drops = [];
  const count = Math.floor(w / 12);
  for (let i = 0; i < count; i++) {
    drops.push({
      x: Math.random() * w,
      y: Math.random() * h,
      len: Math.random() * 20 + 10,
      speed: Math.random() * 4 + 4,
      color: Math.random() > 0.5 ? '255,46,136' : '0,229,255',
      opacity: Math.random() * 0.5 + 0.2
    });
  }
}

function drawRain() {
  ctx.clearRect(0, 0, w, h);
  drops.forEach(d => {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${d.color},${d.opacity})`;
    ctx.lineWidth = 1.2;
    ctx.moveTo(d.x, d.y);
    ctx.lineTo(d.x, d.y + d.len);
    ctx.stroke();

    d.y += d.speed;
    if (d.y > h) {
      d.y = -d.len;
      d.x = Math.random() * w;
    }
  });
  requestAnimationFrame(drawRain);
}

window.addEventListener('resize', initRain);
initRain();
drawRain();

// ===== Плавная прокрутка для ссылок =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== Параллакс на свечения =====
window.addEventListener('mousemove', e => {
  const px = (e.clientX / window.innerWidth - 0.5) * 30;
  const py = (e.clientY / window.innerHeight - 0.5) * 30;
  document.querySelector('.glow-pink').style.transform = `translate(${px}px,${py}px)`;
  document.querySelector('.glow-cyan').style.transform = `translate(${-px}px,${-py}px)`;
});

// ===== Анимация появления секций =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('section').forEach(sec => {
  sec.style.opacity = '0';
  sec.style.transform = 'translateY(40px)';
  sec.style.transition = 'all .8s ease';
  observer.observe(sec);
});
