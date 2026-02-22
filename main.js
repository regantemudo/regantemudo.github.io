// ── Typing effect ───────────────────────────────────────────────
const typedEl = document.getElementById('typed-text');
const fullText = 'system@society:~$';
let i = 0;
function typeChar() {
  if (i < fullText.length) {
    typedEl.textContent += fullText[i++];
    setTimeout(typeChar, 60 + Math.random() * 60);
  }
}
setTimeout(typeChar, 300);

// ── Live clock ──────────────────────────────────────────────────
const clockEl = document.getElementById('clock');
function updateClock() {
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  clockEl.textContent =
    `[${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ` +
    `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}]`;
}
updateClock();
setInterval(updateClock, 1000);

// ── Matrix rain ─────────────────────────────────────────────────
(function () {
  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d');
  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ01アイウ01ABCDEF'.split('');
  let cols, drops;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / 18);
    drops = Array(cols).fill(1);
  }

  window.addEventListener('resize', resize);
  resize();

  setInterval(() => {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00cc44';
    ctx.font = '14px monospace';
    drops.forEach((y, i) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * 18, y * 18);
      if (y * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }, 50);
})();

// ── WinBox helpers ───────────────────────────────────────────────
function openBox(id, title, offsetTop, offsetLeft) {
  const content = document.querySelector(id);
  new WinBox({
    title,
    width: '420px',
    height: '380px',
    top: offsetTop,
    left: offsetLeft,
    right: 50,
    bottom: 50,
    mount: content,
    class: ['no-full'],
    onfocus: function () { this.setBackground('#00cc44'); },
    onblur:  function () { this.setBackground('#555'); },
  });
}

document.getElementById('about').addEventListener('click', () =>
  openBox('#about-content', '/about', 80, 80));

document.getElementById('projects').addEventListener('click', () =>
  openBox('#projects-content', '/projects', 120, 140));

document.getElementById('contact').addEventListener('click', () =>
  openBox('#contact-content', '/contact', 160, 200));
