/* ─────────────────────────────────────────
   Faizan Tariq Portfolio — script.js
   ───────────────────────────────────────── */

/* ── SCROLL PROGRESS + NAV ── */
const spb = document.getElementById('spb');
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const pct   = total > 0 ? (window.scrollY / total) * 100 : 0;
  spb.style.width = pct + '%';
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });


/* ── HAMBURGER MENU ── */
(function () {
  const hamburger = document.getElementById('hamburger');
  const overlay   = document.getElementById('mob-overlay');
  const mobLinks  = document.querySelectorAll('.mob-link');

  if (!hamburger || !overlay) return;

  function openMenu() {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    if (overlay.classList.contains('open')) closeMenu();
    else openMenu();
  });

  mobLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();


/* ── HERO STARFIELD CANVAS ── */
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;
  const COUNT = 140;
  let pts = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function makeParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      z: Math.random() * 1000,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      vz: Math.random() * 0.9 + 0.25,
      hue: Math.random() < 0.55 ? 158 : (Math.random() < 0.5 ? 174 : 142),
    };
  }

  resize();
  pts = Array.from({ length: COUNT }, makeParticle);
  window.addEventListener('resize', resize);

  const fov = 500;

  function draw() {
    ctx.clearRect(0, 0, W, H);
    pts.sort((a, b) => b.z - a.z);

    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      p.z -= p.vz; p.x += p.vx; p.y += p.vy;
      if (p.z <= 0) { Object.assign(p, makeParticle()); p.z = 1000; }
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

      const sc = fov / (fov + p.z);
      const sx = (p.x - W / 2) * sc + W / 2;
      const sy = (p.y - H / 2) * sc + H / 2;
      const al = (1 - p.z / 1000) * 0.8;

      for (let j = i + 1; j < Math.min(i + 5, pts.length); j++) {
        const q  = pts[j];
        const qs = fov / (fov + q.z);
        const qx = (q.x - W / 2) * qs + W / 2;
        const qy = (q.y - H / 2) * qs + H / 2;
        const dist = Math.hypot(sx - qx, sy - qy);
        if (dist < 100) {
          ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(qx, qy);
          ctx.strokeStyle = `hsla(${p.hue},80%,60%,${(1 - dist / 100) * al * 0.2})`;
          ctx.lineWidth = 0.5; ctx.stroke();
        }
      }

      const r = Math.max(0.4, sc * 2.2);
      ctx.beginPath(); ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue},90%,72%,${al})`; ctx.fill();
      if (r > 1.1) {
        ctx.beginPath(); ctx.arc(sx, sy, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},90%,72%,${al * 0.1})`; ctx.fill();
      }
    }
    requestAnimationFrame(draw);
  }

  draw();
})();


/* ── TYPEWRITER ── */
(function () {
  const el = document.getElementById('typed-word');
  if (!el) return;
  const roles = ['Python Developer', 'Android Developer', 'React Developer', 'Full Stack Builder', 'Software Engineer'];
  let ti = 0, ci = 0, del = false;

  function tick() {
    const cur = roles[ti];
    if (!del) {
      el.textContent = cur.slice(0, ci + 1); ci++;
      if (ci === cur.length) { del = true; setTimeout(tick, 2200); return; }
    } else {
      el.textContent = cur.slice(0, ci - 1); ci--;
      if (ci === 0) { del = false; ti = (ti + 1) % roles.length; }
    }
    setTimeout(tick, del ? 26 : 75);
  }
  tick();
})();


/* ── MARQUEE BUILD ── */
(function () {
  const words = ['Python','React','Firebase','Supabase','SQL','Kotlin','Android','Full Stack','JavaScript','Self-Taught','ILS Srinagar','Software Engineer'];
  const track = document.getElementById('marq-track');
  if (!track) return;
  const repeated = [...words, ...words, ...words, ...words];
  track.innerHTML = repeated.map(w =>
    `<span class="marq-item">${w}<span class="marq-sep"> ✦ </span></span>`
  ).join('');
})();


/* ── EDUCATION ELAPSED TIMER ── */
(function () {
  const el = document.getElementById('edu-elapsed');
  if (!el) return;
  const start = new Date('2024-09-01');

  function calc() {
    const now = new Date();
    const diff = now - start;
    const totalDays = Math.floor(diff / 86400000);
    const months = Math.floor(totalDays / 30);
    const days = totalDays % 30;
    const yrs = Math.floor(months / 12);
    const mos = months % 12;
    const parts = [];
    if (yrs > 0) parts.push(`${yrs}y`);
    if (mos > 0) parts.push(`${mos}mo`);
    if (days > 0) parts.push(`${days}d`);
    el.textContent = parts.join(' ') || 'Just started';
  }
  calc();
  setInterval(calc, 60000);
})();


/* ── SCROLL REVEAL ── */
(function () {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('on');
    });
  }, { threshold: 0.06 });

  document.querySelectorAll('.rv, .rvl, .rvr').forEach(el => obs.observe(el));
})();


/* ── SKILL BARS ── */
(function () {
  let triggered = false;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !triggered) {
        triggered = true;
        document.querySelectorAll('.sk-fl').forEach(bar => {
          const level = bar.dataset.level;
          bar.style.width = level + '%';
        });
      }
    });
  }, { threshold: 0.1 });

  const grid = document.querySelector('.sk-grid');
  if (grid) obs.observe(grid);
})();


/* ── COUNT-UP STATS ── */
(function () {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      let cur = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const t = setInterval(() => {
        cur += step;
        if (cur >= target) { cur = target; clearInterval(t); }
        el.textContent = cur + suffix;
      }, 16);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-n[data-target]').forEach(el => obs.observe(el));
})();


/* ── CONTACT FORM ── */
(function () {
  const wrap    = document.getElementById('contact-form-wrap');
  const nameEl  = document.getElementById('f-name');
  const emailEl = document.getElementById('f-email');
  const subjEl  = document.getElementById('f-subject');
  const msgEl   = document.getElementById('f-message');
  const errEl   = document.getElementById('f-err');
  const btn     = document.getElementById('f-submit');

  if (!btn) return;

  btn.addEventListener('click', async () => {
    const name    = nameEl.value.trim();
    const email   = emailEl.value.trim();
    const subject = subjEl.value.trim();
    const message = msgEl.value.trim();

    errEl.style.display = 'none';

    if (!name || !email || !message) {
      errEl.textContent = 'Please fill in name, email and message.';
      errEl.style.display = 'block';
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Sending...';

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '387c4aa3-dbdb-4fd5-b73f-a0b75f9c9f92',
          name, email,
          subject: subject || 'New message from Portfolio',
          message,
          from_name: 'Faizan Portfolio'
        })
      });
      const data = await res.json();
      if (data.success) {
        wrap.innerHTML = `
          <div class="fok">
            <div class="fok-ico">✦</div>
            <div class="fok-h">Message Received!</div>
            <div class="fok-s">I'll get back to you soon. — Faizan</div>
          </div>`;
      } else {
        throw new Error('API error');
      }
    } catch {
      errEl.textContent = 'Something went wrong. Please try again.';
      errEl.style.display = 'block';
      btn.disabled = false;
      btn.textContent = 'Send Message →';
    }
  });
})();