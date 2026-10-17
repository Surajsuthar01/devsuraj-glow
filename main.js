(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  const animate = hasGsap && !reduced;
  const EMAIL = 'surajsuthar0654@gmail.com';
  const RESUME = 'Suraj_Resume.pdf';
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  root.classList.add(animate ? 'anim' : 'no-anim');
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);
  const refresh = () => hasGsap && ScrollTrigger.refresh();
  const escH = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------------- Real access log of this visit (tile 07) ---------------- */
  const visitor = { ip: null, ip4: null, ip6: null, city: null, region: null, country: null, cc: null, isp: null };
  const accessEl = $('#accessLog');
  const accessLog = (method, path, status = 200, note = '') => {
    if (!accessEl) return;
    const cls = status >= 500 ? 'r' : status >= 400 ? 'y' : 'g';
    const ip = visitor.ip4 || (visitor.ip6 ? visitor.ip6.split(':').slice(0, 2).join(':') + '…' : '');
    const li = document.createElement('li');
    li.innerHTML = `<span class="ts">${new Date().toTimeString().slice(0, 8)}</span>${ip ? `<span class="p">${escH(ip)}</span> ` : ''}<span class="o">${method}</span> <span class="c">${escH(path)}</span> <span class="${cls}">${status}</span>${note ? ` <span class="m">${escH(note)}</span>` : ''}`;
    accessEl.appendChild(li);
    while (accessEl.children.length > 11) accessEl.firstChild.remove();
  };

  /* ---------------- Toast & email ---------------- */
  const toast = $('#toast');
  let toastT;
  const showToast = (m) => {
    toast.textContent = m;
    toast.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(() => toast.classList.remove('show'), 2000);
  };
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(EMAIL); showToast('Email copied to clipboard ✓'); accessLog('POST', '/api/contact/copy-email', 201); } catch (e) {}
  };
  $('#mailLink').addEventListener('click', copyEmail);

  /* ---------------- Smooth scroll (Lenis) ---------------- */
  let lenis = null;
  if (animate && typeof window.Lenis !== 'undefined') {
    lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const scrollToTarget = (target) => {
    if (lenis) return lenis.scrollTo(target, { duration: 1.4 });
    if (typeof target === 'number') scrollTo({ top: target, behavior: reduced ? 'auto' : 'smooth' });
    else target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };
  $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    const el = id === '#top' ? 0 : $(id);
    if (el === null) return;
    e.preventDefault();
    closeMenu();
    scrollToTarget(el);
  }));

  /* ---------------- Theme ---------------- */
  const toggleTheme = () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
    $('meta[name="theme-color"]').setAttribute('content', next === 'dark' ? '#09090b' : '#f7f6f3');
    window.dispatchEvent(new Event('themechange'));
    accessLog('PUT', '/api/theme', 204, '→ ' + next);
    return next;
  };
  $('#themeBtn').addEventListener('click', toggleTheme);

  /* ---------------- Menu ---------------- */
  const menuBtn = $('#menuBtn');
  function closeMenu() {
    document.body.classList.remove('menu-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    $('#menu').setAttribute('aria-hidden', 'true');
    lenis && lenis.start();
  }
  menuBtn.addEventListener('click', () => {
    if (document.body.classList.contains('menu-open')) return closeMenu();
    document.body.classList.add('menu-open');
    menuBtn.setAttribute('aria-expanded', 'true');
    $('#menu').setAttribute('aria-hidden', 'false');
    lenis && lenis.stop();
  });

  /* ---------------- Nav state + progress bar ---------------- */
  const nav = $('#nav');
  const bar = $('#progress');
  let lastY = 0;
  const onScroll = () => {
    const y = scrollY;
    nav.classList.toggle('solid', y > 40);
    nav.classList.toggle('hidden', y > 300 && y > lastY && !document.body.classList.contains('menu-open'));
    lastY = y;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  };
  addEventListener('scroll', onScroll, { passive: true });

  const links = $$('.nav-links a');
  const secObs = new IntersectionObserver((ents) => ents.forEach((e) => {
    if (e.isIntersecting) links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  ['about', 'experience', 'work', 'journey', 'contact'].forEach((id) => $('#' + id) && secObs.observe($('#' + id)));

  const secNames = { manifesto: 'Intro', about: 'About', experience: 'Experience', do: 'What I do', pipeline: 'How I ship', work: 'Projects', journey: 'Journey', stack: 'Toolkit', certs: 'Credentials', dsa: 'LeetCode', contact: 'Contact' };
  let lastSec = '';
  const viewObs = new IntersectionObserver((ents) => ents.forEach((e) => {
    if (!e.isIntersecting || e.target.id === lastSec) return;
    lastSec = e.target.id;
    accessLog('GET', '/#' + e.target.id, 200, `viewed “${secNames[e.target.id]}”`);
  }), { rootMargin: '-45% 0px -50% 0px' });
  Object.keys(secNames).forEach((id) => $('#' + id) && viewObs.observe($('#' + id)));

  /* ---------------- Clock (IST) ---------------- */
  const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' });
  const tickClock = () => { const t = fmt.format(new Date()); $('#clock').textContent = t; $('#clock2').textContent = t + ' IST'; };
  tickClock(); setInterval(tickClock, 1000);

  /* ---------------- Typing role line ---------------- */
  const roleEl = $('#roleType');
  const ROLES = ['DevOps Engineer', 'Cloud Engineer', 'Linux Admin (RHCSA)', 'Full-stack Developer'];
  if (roleEl && !reduced) (async () => {
    await wait(4200); // let the intro finish first
    for (let i = 1; ; i++) {
      await wait(2400);
      const cur = roleEl.textContent;
      for (let k = cur.length - 1; k >= 0; k--) { roleEl.textContent = cur.slice(0, k) || '​'; await wait(26); }
      await wait(220);
      const next = ROLES[i % ROLES.length];
      for (let k = 1; k <= next.length; k++) { roleEl.textContent = next.slice(0, k); await wait(70); }
    }
  })();

  /* ---------------- Cursor + background spotlight ---------------- */
  const cursor = $('#cursor');
  const cLabel = $('#cursorLabel');
  const bgGrid = $('.bg-grid');
  if (fine && !reduced) {
    document.body.classList.add('has-cursor');
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
    addEventListener('pointermove', (e) => {
      x = e.clientX; y = e.clientY;
      cursor.classList.add('on');
      bgGrid.style.setProperty('--cx', x + 'px');
      bgGrid.style.setProperty('--cy', y + 'px');
    });
    document.addEventListener('pointerleave', () => cursor.classList.remove('on'));
    const loop = () => {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      cursor.style.transform = `translate(${cx}px, ${cy}px)`;
      requestAnimationFrame(loop);
    };
    loop();
    document.addEventListener('pointerover', (e) => {
      const t = e.target.closest('[data-cursor], a, button, input, .polaroid');
      if (!t) { cursor.classList.remove('big', 'hide'); return; }
      if (t.matches('input')) { cursor.classList.add('hide'); return; }
      cursor.classList.remove('hide');
      const label = t.matches('.polaroid') ? 'Drag' : (t.dataset.cursor || '');
      cLabel.textContent = label;
      cursor.classList.toggle('big', !!label);
    });
  }

  /* ---------------- Magnetic buttons ---------------- */
  if (fine && !reduced) {
    $$('[data-magnetic]').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px, ${(e.clientY - r.top - r.height / 2) * 0.4}px)`;
      });
      el.addEventListener('pointerleave', () => {
        el.style.transition = 'transform .6s cubic-bezier(.16,1,.3,1)';
        el.style.transform = '';
        setTimeout(() => (el.style.transition = ''), 600);
      });
    });
  }

  /* ---------------- 3D tilt + spotlight on tiles, spotlight on projects ---------------- */
  if (fine && !reduced) {
    $$('.tile').forEach((t) => {
      const inner = $('.tile-in', t);
      t.addEventListener('pointermove', (e) => {
        const r = t.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        inner.style.transform = `rotateX(${(0.5 - py) * 6}deg) rotateY(${(px - 0.5) * 8}deg)`;
        inner.style.setProperty('--mx', px * 100 + '%');
        inner.style.setProperty('--my', py * 100 + '%');
      });
      t.addEventListener('pointerleave', () => (inner.style.transform = ''));
    });
    $$('.proj').forEach((p) => p.addEventListener('pointermove', (e) => {
      const r = p.getBoundingClientRect();
      p.style.setProperty('--mx', e.clientX - r.left + 'px');
      p.style.setProperty('--my', e.clientY - r.top + 'px');
    }));
  }

  /* ---------------- Text scramble for section labels ---------------- */
  const GLYPHS = '!<>-_\\/[]{}=+*^?#0123456789ABCDEFXYZ';
  const scramble = (el, duration = 900) => {
    const final = el.dataset.final || el.textContent;
    el.dataset.final = final;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const shown = Math.floor(p * final.length);
      let s = '';
      for (let i = 0; i < final.length; i++) {
        const ch = final[i];
        s += i < shown || ch === ' ' ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = s;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (!reduced) {
    const scrObs = new IntersectionObserver((ents) => ents.forEach((e) => {
      if (e.isIntersecting) { scramble(e.target); scrObs.unobserve(e.target); }
    }), { threshold: 0.8 });
    $$('.scramble').forEach((el) => scrObs.observe(el));
    $$('.tile-k').forEach((el) => el.closest('.tile').addEventListener('pointerenter', () => scramble(el, 500)));
  }

  /* ---------------- Split hero name / manifesto ---------------- */
  $$('.split').forEach((el) => {
    el.innerHTML = [...el.textContent].map((c) => `<span class="ch">${c}</span>`).join('');
  });
  const man = $('#manifestoText');
  man.innerHTML = man.textContent.trim().split(/\s+/).map((w) => `<span class="w">${w}</span>`).join(' ');

  /* ---------------- About: Engineer ⇄ Plain English ---------------- */
  const about = $('#about');
  const modeBtns = $$('.mode button');
  modeBtns.forEach((b) => b.addEventListener('click', () => {
    const mode = b.dataset.mode;
    if (about.dataset.mode === mode) return;
    about.dataset.mode = mode;
    modeBtns.forEach((x) => x.setAttribute('aria-selected', String(x === b)));
    accessLog('GET', '/about?view=' + mode, 200, mode === 'plain' ? 'plain English' : 'engineer view');
    const show = $(`.mode-panel[data-panel="${mode}"]`);
    const hide = $(`.mode-panel:not([data-panel="${mode}"])`);
    if (!animate) { hide.hidden = true; show.hidden = false; return; }
    gsap.to(hide, {
      opacity: 0, y: -10, filter: 'blur(6px)', duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        hide.hidden = true;
        gsap.set(hide, { clearProps: 'opacity,transform,filter' });
        show.hidden = false;
        gsap.fromTo(show.children, { opacity: 0, y: 18, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, stagger: 0.07, ease: 'expo.out' });
        refresh();
      },
    });
  }));

  /* ---------------- Polaroid photos (only shown if extra photos exist) ---------------- */
  const pol = $('#polaroids');
  const extras = $$('.polaroid[data-extra]', pol);
  let loaded = 0, settled = 0;
  const settle = () => {
    if (++settled < extras.length) return;
    if (loaded) { pol.classList.add('has-photos'); refresh(); }
  };
  extras.forEach((f) => {
    const img = $('img', f);
    const ok = () => { loaded++; settle(); };
    const bad = () => { f.remove(); settle(); };
    if (img.complete) (img.naturalWidth ? ok() : bad());
    else { img.addEventListener('load', ok, { once: true }); img.addEventListener('error', bad, { once: true }); }
  });
  let zTop = 10;
  pol.addEventListener('pointerdown', (e) => {
    const f = e.target.closest('.polaroid');
    if (!f) return;
    e.preventDefault();
    f.setPointerCapture(e.pointerId);
    f.style.zIndex = ++zTop;
    f.classList.add('dragging');
    const sx = e.clientX, sy = e.clientY;
    const bx = parseFloat(f.style.getPropertyValue('--dx')) || 0;
    const by = parseFloat(f.style.getPropertyValue('--dy')) || 0;
    const move = (ev) => {
      f.style.setProperty('--dx', bx + ev.clientX - sx + 'px');
      f.style.setProperty('--dy', by + ev.clientY - sy + 'px');
    };
    const up = () => {
      f.classList.remove('dragging');
      f.removeEventListener('pointermove', move);
      f.removeEventListener('pointerup', up);
      f.removeEventListener('pointercancel', up);
    };
    f.addEventListener('pointermove', move);
    f.addEventListener('pointerup', up);
    f.addEventListener('pointercancel', up);
  });

  /* ======================================================
     HERO CANVAS — live server logs + a small infrastructure map
     ====================================================== */
  const initCluster = () => {
    const cv = $('#cluster');
    if (!cv) return;
    const ctx = cv.getContext('2d');
    const LINK = 165, MR = 190;
    const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
    const HEX = (n) => Array.from({ length: n }, () => '0123456789abcdef'[R(0, 15)]).join('');
    const ID = () => Math.random().toString(36).slice(2, 7);
    const pad = (n, l = 2) => String(n).padStart(l, '0');
    const stamp = (t = Date.now()) => {
      const d = new Date(t);
      return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${pad(d.getMilliseconds(), 3)}`;
    };
    const IP = () => `10.0.${R(0, 9)}.${R(2, 254)}`;
    const PATHS = ['/', '/api/orders', '/api/users/me', '/healthz', '/metrics', '/api/login', '/static/app.js', '/api/search?q=jaipur', '/api/cart'];
    // [level, source, message]
    const TEMPLATES = [
      ['INFO', 'nginx', () => `${IP()} "GET ${PATHS[R(0, PATHS.length - 1)]} HTTP/2" 200 ${R(1, 48)}ms`],
      ['INFO', 'nginx', () => `${IP()} "POST /api/orders HTTP/2" 201 ${R(12, 90)}ms`],
      ['INFO', 'api', () => `request completed status=200 dur=${R(2, 95)}ms trace=${ID()}`],
      ['DEBUG', 'kubelet', () => `Started container api in pod api-7f9c4-${ID()}`],
      ['INFO', 'prometheus', () => `scrape ok target=node-exporter:9100 dur=${R(4, 30)}ms`],
      ['WARN', 'postgres', () => `connection pool at ${R(78, 92)}% (max 200)`],
      ['INFO', 'jenkins', () => `build #${R(120, 190)} SUCCESS in ${R(1, 4)}m${R(10, 59)}s`],
      ['INFO', 'terraform', () => `aws_instance.web: Creation complete after ${R(20, 70)}s`],
      ['ERROR', 'worker', () => `job ${ID()} failed: timeout after 30s (retry 1/3)`],
      ['INFO', 'systemd', () => `Started backup.service — snapshot ${R(10, 14)}.${R(0, 9)}GB`],
      ['INFO', 'docker', () => `pulled registry.local/api:${HEX(7)} (${R(80, 210)}MB)`],
      ['INFO', 'ansible', () => `ok=${R(9, 14)} changed=${R(1, 5)} failed=0 host=prod-0${R(1, 6)}`],
      ['INFO', 'grafana', () => 'alert "HighLatency" state=resolved'],
      ['INFO', 'k8s-hpa', () => `scaled deploy/api ${R(2, 4)} → ${R(5, 7)} (cpu ${R(78, 90)}%)`],
      ['INFO', 'cron', () => '(root) CMD (/opt/scripts/rotate-logs.sh)'],
      ['INFO', 'redis', () => `keyspace hits=${R(92, 99)}.${R(0, 9)}% evicted=0`],
      ['WARN', 'node-3', () => `disk /var at ${R(80, 88)}% — cleanup scheduled`],
      ['INFO', 'certbot', () => `certificate valid for ${R(40, 85)} more days`],
      ['DEBUG', 'envoy', () => `upstream api:8080 healthy (${R(3, 6)}/${R(6, 6)} hosts)`],
      ['ERROR', 'api', () => `upstream timeout on /api/search — returned 504, retrying`],
    ];
    const HUBS = ['lb-01', 'api-1', 'db-primary', 'redis', 'api-2', 'k8s-node-3', 'grafana', 'ci-runner'];

    let W = 0, H = 0, nodes = [], packets = [], streams = [], col = {}, visible = true, frame = 0, fs = 11, lh = 18, cw = 6.6;
    const mouse = { x: -1e4, y: -1e4 };

    const readCol = () => {
      const cs = getComputedStyle(root);
      const dark = root.dataset.theme === 'dark';
      const v = (k) => cs.getPropertyValue(k).trim();
      col = { ink: v('--ink'), acc: v('--accent'), ok: v('--ok'), bg: v('--bg'), warn: dark ? '#fbbf24' : '#d97706', err: dark ? '#f87171' : '#dc2626', dark };
    };
    const mkLine = (at) => {
      let t;
      do { t = TEMPLATES[R(0, TEMPLATES.length - 1)]; }
      while ((t[0] === 'ERROR' && Math.random() < 0.75) || (t[0] === 'WARN' && Math.random() < 0.45));
      return { ts: stamp(at), lvl: t[0], src: t[1], msg: t[2](), born: frame };
    };

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = cv.clientWidth; H = cv.clientHeight;
      if (!W || !H) return;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fs = W < 640 ? 10 : 11;
      lh = Math.round(fs * 1.75);
      ctx.font = `${fs}px "Geist Mono", ui-monospace, monospace`;
      cw = ctx.measureText('0').width;
      // log streams — like several `tail -f` windows side by side
      const n = Math.max(1, Math.min(4, Math.floor(W / 430)));
      const colW = W / n;
      const rows = Math.ceil((H * 0.8) / lh) + 2;
      streams = Array.from({ length: n }, (_, i) => ({
        x: i * colW + 22, w: colW - 44, off: 0, next: R(5, 60),
        lines: (() => { // back-fill with older timestamps, newest last
          let t = Date.now();
          const out = [];
          for (let k = 0; k < rows; k++) { t -= R(90, 1400); out.unshift(Object.assign(mkLine(t), { born: -999 })); }
          return out;
        })(),
      }));
      // servers (labelled) + smaller network nodes
      const hubs = W < 640 ? 4 : W < 1000 ? 6 : 8;
      const hubCols = Math.ceil(hubs / 2);
      const count = Math.max(16, Math.min(44, Math.floor((W * H) / 26000)));
      nodes = Array.from({ length: count }, (_, i) => {
        const hub = i < hubs;
        const x = hub ? ((i % hubCols) + 0.5) / hubCols * W + (Math.random() - 0.5) * 120 : 30 + Math.random() * (W - 60);
        const y = hub ? (i < hubCols ? 0.3 : 0.7) * H + (Math.random() - 0.5) * 90 : 50 + Math.random() * (H - 100);
        const sp = hub ? 0.14 : 0.3;
        return { x, y, vx: (Math.random() - 0.5) * sp, vy: (Math.random() - 0.5) * sp, r: Math.random() * 1.4 + 0.8, hub: hub ? HUBS[i] : null, flash: 0, phase: Math.random() * 100 };
      });
      packets = [];
    };

    const rr = (x, y, w, h, r) => { ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x, y, w, h, r) : ctx.rect(x, y, w, h); };
    const dot = (x, y, r) => { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); };

    const drawLogs = () => {
      ctx.font = `${fs}px "Geist Mono", ui-monospace, monospace`;
      ctx.textBaseline = 'alphabetic';
      const base = col.dark ? 0.065 : 0.075;
      for (const s of streams) {
        s.off *= 0.8;
        if (frame >= s.next) {
          s.lines.push(mkLine());
          s.lines.shift();
          s.off = lh;
          s.next = frame + R(14, 80);
        }
        const maxCh = Math.floor(s.w / cw);
        const L = s.lines.length;
        const inCol = mouse.x > s.x - 40 && mouse.x < s.x + s.w + 40;
        for (let i = 0; i < L; i++) {
          const ln = s.lines[i];
          const y = Math.round(H * 0.8) - (L - 1 - i) * lh + s.off;
          if (y < -lh || y > H + lh) continue;
          const age = frame - ln.born;
          const fresh = age < 100 ? 1 - age / 100 : 0;
          const lamp = inCol ? Math.max(0, 1 - Math.abs(mouse.y - y) / 120) : 0; // mouse = flashlight
          const a = base + fresh * 0.22 + lamp * 0.3;
          if (fresh > 0) { // highlight bar on the newest line, like a live tail
            ctx.globalAlpha = fresh * 0.07; ctx.fillStyle = col.acc;
            ctx.fillRect(s.x - 8, y - fs - 1, s.w + 16, lh - 2);
          }
          let x = s.x;
          ctx.globalAlpha = a * 0.7; ctx.fillStyle = col.ink;
          ctx.fillText(ln.ts, x, y); x += (ln.ts.length + 1) * cw;
          const loud = ln.lvl === 'WARN' || ln.lvl === 'ERROR';
          ctx.globalAlpha = loud ? Math.min(1, a * 3) : a * (ln.lvl === 'DEBUG' ? 0.7 : 1.15);
          ctx.fillStyle = ln.lvl === 'WARN' ? col.warn : ln.lvl === 'ERROR' ? col.err : col.ink;
          ctx.fillText(ln.lvl.padEnd(5), x, y); x += 6 * cw;
          ctx.globalAlpha = Math.min(1, a * 1.5); ctx.fillStyle = col.acc;
          ctx.fillText(ln.src.padEnd(10), x, y); x += 11 * cw;
          const room = maxCh - (ln.ts.length + 1 + 6 + 11);
          if (room > 4) {
            ctx.globalAlpha = loud ? Math.min(1, a * 1.6) : a; ctx.fillStyle = col.ink;
            ctx.fillText(ln.msg.length > room ? ln.msg.slice(0, room - 1) + '…' : ln.msg, x, y);
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const spawn = (a, list) => {
      const c = nodes.filter((b) => b !== a && (a.x - b.x) ** 2 + (a.y - b.y) ** 2 < LINK * LINK);
      if (c.length) list.push({ a, b: c[R(0, c.length - 1)], t: 0, s: 0.014 + Math.random() * 0.018, c: Math.random() < 0.3 ? col.ok : col.acc, hops: R(0, 2) });
    };

    const drawServer = (n) => {
      const near = Math.hypot(mouse.x - n.x, mouse.y - n.y) < MR;
      const w = 32, h = 21, x = n.x - w / 2, y = n.y - h / 2;
      ctx.globalAlpha = 1; ctx.fillStyle = col.bg; rr(x, y, w, h, 4); ctx.fill();
      ctx.globalAlpha = near ? 0.9 : 0.42; ctx.strokeStyle = near ? col.acc : col.ink; ctx.lineWidth = 1.2; ctx.stroke();
      ctx.globalAlpha = near ? 0.55 : 0.25; ctx.fillStyle = col.ink;
      ctx.fillRect(x + 5, y + 6, 14, 1.6); ctx.fillRect(x + 5, y + 10, 14, 1.6); ctx.fillRect(x + 5, y + 14, 10, 1.6);
      const on = Math.sin((frame + n.phase) * 0.07) > -0.7;
      ctx.globalAlpha = on ? 1 : 0.3; ctx.fillStyle = col.ok;
      if (on) { ctx.shadowColor = col.ok; ctx.shadowBlur = 6; }
      dot(x + w - 6.5, y + 7, 1.9);
      ctx.shadowBlur = 0;
      const busy = n.flash > 0;
      ctx.globalAlpha = busy ? 1 : 0.22; ctx.fillStyle = busy ? col.warn : col.ink;
      if (busy) { ctx.shadowColor = col.warn; ctx.shadowBlur = 8; }
      dot(x + w - 6.5, y + 14, 1.9);
      ctx.shadowBlur = 0;
      if (busy) n.flash--;
      ctx.font = `500 ${fs}px "Geist Mono", ui-monospace, monospace`;
      ctx.textAlign = 'center';
      ctx.globalAlpha = near ? 0.95 : 0.5; ctx.fillStyle = near ? col.acc : col.ink;
      ctx.fillText(n.hub, n.x, y + h + 14);
      ctx.textAlign = 'left';
    };

    const drawNet = () => {
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 20 || n.x > W - 20) n.vx *= -1;
        if (n.y < 40 || n.y > H - 30) n.vy *= -1;
        const dx = mouse.x - n.x, dy = mouse.y - n.y;
        if (dx * dx + dy * dy < MR * MR) { const k = n.hub ? 0.0015 : 0.004; n.x += dx * k; n.y += dy * k; }
      }
      ctx.lineWidth = 1; ctx.strokeStyle = col.ink;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d2 = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
          if (d2 < LINK * LINK) {
            ctx.globalAlpha = (1 - Math.sqrt(d2) / LINK) * (a.hub && b.hub ? 0.34 : 0.15);
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      ctx.strokeStyle = col.acc;
      for (const n of nodes) {
        const d = Math.hypot(mouse.x - n.x, mouse.y - n.y);
        if (d < MR) {
          ctx.globalAlpha = (1 - d / MR) * 0.5;
          ctx.beginPath(); ctx.moveTo(mouse.x, mouse.y); ctx.lineTo(n.x, n.y); ctx.stroke();
        }
      }
      // requests hopping between servers
      if (frame % 9 === 0 && packets.length < 24) {
        const hubs = nodes.filter((n) => n.hub);
        spawn(Math.random() < 0.7 && hubs.length ? hubs[R(0, hubs.length - 1)] : nodes[R(0, nodes.length - 1)], packets);
      }
      const next = [];
      for (const p of packets) {
        p.t += p.s;
        if (p.t >= 1) {
          if (p.b.hub) p.b.flash = 26;
          if (p.hops > 0) { const before = next.length; spawn(p.b, next); if (next.length > before) { next[next.length - 1].hops = p.hops - 1; next[next.length - 1].c = p.c; } }
          continue;
        }
        ctx.globalAlpha = Math.sin(p.t * Math.PI) * 0.95;
        ctx.fillStyle = p.c; ctx.shadowColor = p.c; ctx.shadowBlur = 10;
        dot(p.a.x + (p.b.x - p.a.x) * p.t, p.a.y + (p.b.y - p.a.y) * p.t, 2.3);
        next.push(p);
      }
      packets = next;
      ctx.shadowBlur = 0;
      for (const n of nodes) {
        if (n.hub) { drawServer(n); continue; }
        const near = Math.hypot(mouse.x - n.x, mouse.y - n.y) < MR;
        ctx.globalAlpha = near ? 0.95 : 0.38;
        ctx.fillStyle = near ? col.acc : col.ink;
        dot(n.x, n.y, near ? n.r + 1 : n.r);
      }
      ctx.globalAlpha = 1;
    };

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, W, H);
      drawLogs();
      drawNet();
    };

    readCol(); resize();
    addEventListener('themechange', () => { readCol(); if (reduced) draw(); });
    let rT;
    addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(() => { resize(); if (reduced) draw(); }, 200); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { resize(); if (reduced) draw(); });
    if (reduced) { draw(); return; }
    addEventListener('pointermove', (e) => {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    document.addEventListener('pointerleave', () => { mouse.x = mouse.y = -1e4; });
    new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(cv);
    const loop = () => { if (visible) draw(); requestAnimationFrame(loop); };
    loop();
  };
  initCluster();

  /* ======================================================
     BENTO — live simulations of day-to-day DevOps work
     ====================================================== */
  let bentoOn = false;
  new IntersectionObserver(([e]) => (bentoOn = e.isIntersecting), { rootMargin: '150px' }).observe($('#do'));
  const whenOn = async () => { while (!bentoOn) await wait(400); };
  const now = () => new Date().toTimeString().slice(0, 8);
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const hex = (n) => Array.from({ length: n }, () => '0123456789abcdef'[rnd(0, 15)]).join('');
  const pushLine = (ol, html, max) => {
    const li = document.createElement('li');
    li.innerHTML = html;
    ol.appendChild(li);
    while (ol.children.length > max) ol.firstChild.remove();
    return li;
  };

  // 01 — CI/CD pipeline (graph + real-looking step output)
  (async () => {
    const steps = $$('#ciSteps li');
    const log = $('#ciLog');
    const prog = $('#ciProg');
    const dur = (li, t) => ($('small', li).textContent = t);
    const msgs = ['feat: add /healthz endpoint', 'fix: retry on db timeout', 'chore: bump node to 22', 'perf: cache docker layers', 'feat: grafana alert for disk usage', 'ci: run tests in parallel', 'fix: graceful shutdown on SIGTERM'];
    const stepLog = (h) => [
      ['$ git clone --depth 1 github.com/surajsuthar01/api', `HEAD is now at <span class="o">${h}</span>`],
      ['$ npm ci', `<span class="g">added ${rnd(380, 460)} packages</span> <span class="m">in ${rnd(6, 11)}.${rnd(0, 9)}s</span>`],
      ['$ npm test -- --ci', `<span class="g">Tests: ${rnd(120, 140)} passed</span><span class="m">, 0 failed · ${rnd(7, 12)}.${rnd(0, 9)}s</span>`],
      [`$ docker build -t api:${h} .`, `<span class="m">#12 exporting layers</span> <span class="g">done</span> <span class="m">· ${rnd(160, 210)} MB</span>`],
      [`$ docker push registry.local/api:${h}`, `<span class="m">digest: sha256:${hex(12)}… size: ${rnd(1900, 2400)}</span>`],
      ['$ kubectl rollout status deploy/api -n prod', '<span class="g">deployment "api" successfully rolled out ✓</span>'],
    ];
    if (reduced) {
      steps.forEach((s) => { s.className = 'ok'; dur(s, rnd(2, 14) + '.' + rnd(0, 9) + 's'); });
      prog.style.width = '100%';
      stepLog('3adb824').slice(-3).forEach(([c, o]) => { pushLine(log, `<span class="c">${c}</span>`, 5); pushLine(log, o, 5); });
      return;
    }
    for (let m = 0, build = 128; ; m++, build++) {
      await whenOn();
      const h = hex(7);
      $('#ciHash').textContent = h;
      $('#ciMsg').textContent = msgs[m % msgs.length];
      $('#ciBuild').textContent = '#' + build;
      steps.forEach((s) => { s.className = ''; dur(s, 'queued'); });
      prog.style.width = '0%';
      pushLine(log, `<span class="ts">${now()}</span><span class="p">▶ Started by push to main</span> <span class="m">(${h})</span>`, 5);
      const t0 = performance.now();
      const timer = setInterval(() => ($('#ciTime').textContent = ((performance.now() - t0) / 1000).toFixed(1) + 's'), 100);
      const logs = stepLog(h);
      for (let i = 0; i < steps.length; i++) {
        const t1 = performance.now();
        steps[i].classList.add('run');
        dur(steps[i], 'running…');
        prog.style.width = (i / (steps.length - 1)) * 100 + '%';
        pushLine(log, `<span class="ts">${now()}</span><span class="c">${logs[i][0]}</span>`, 5);
        await wait(700 + Math.random() * 800);
        pushLine(log, `<span class="ts">${now()}</span>${logs[i][1]}`, 5);
        steps[i].classList.replace('run', 'ok');
        dur(steps[i], (((performance.now() - t1) / 1000) * 7).toFixed(1) + 's');
      }
      prog.style.width = '100%';
      clearInterval(timer);
      pushLine(log, `<span class="ts">${now()}</span><span class="g">✓ Finished: SUCCESS</span> <span class="m">· build #${build} live in prod</span>`, 5);
      await wait(3000);
    }
  })();

  // 02 — Kubernetes autoscaling (kubectl get pods -w)
  (async () => {
    const list = $('#podList');
    const MAX = 6, TARGET = 0.65;
    const chars = 'abcdefghjkmnpqrstuvwxyz23456789';
    const pods = [];
    let traffic = 1.1;
    const podName = () => 'api-7f9c4-' + Array.from({ length: 5 }, () => chars[rnd(0, chars.length - 1)]).join('');
    const setState = (p, st) => {
      p.state = st;
      p.li.dataset.state = st === 'Running' ? 'running' : st === 'Creating' ? 'creating' : 'terminating';
      $('em', p.li).textContent = st;
    };
    const cpuTick = () => {
      const run = pods.filter((p) => p.state === 'Running');
      let sum = 0;
      run.forEach((p) => {
        const v = Math.max(4, Math.min(99, Math.round((traffic / run.length) * 100 + rnd(-6, 6))));
        sum += v;
        $('.pbar i', p.li).style.width = v + '%';
        $('b', p.li).textContent = v + '%';
        p.li.classList.toggle('hot', v > 80);
      });
      pods.filter((p) => p.state !== 'Running').forEach((p) => { $('.pbar i', p.li).style.width = '0%'; $('b', p.li).textContent = '—'; p.li.classList.remove('hot'); });
      const avg = run.length ? Math.round(sum / run.length) : 0;
      const cpu = $('#podCpu');
      cpu.textContent = avg + '%';
      cpu.classList.toggle('hot', avg > 80);
      $('#podN').textContent = run.length;
      $('#podT').textContent = traffic < 1.6 ? 'low' : traffic < 2.8 ? 'rising' : 'peak';
    };
    const add = () => {
      const li = document.createElement('li');
      li.innerHTML = '<span class="pn"></span><span class="ps"><i></i><em></em></span><span class="pc"><span class="pbar"><i></i></span><b>—</b></span>';
      const p = { name: podName(), li };
      $('.pn', li).textContent = p.name;
      setState(p, 'Creating');
      list.appendChild(li);
      pods.push(p);
      setTimeout(() => { if (p.state === 'Creating') { setState(p, 'Running'); cpuTick(); } }, 900 + rnd(0, 600));
      return p;
    };
    const remove = (p) => {
      setState(p, 'Terminating');
      cpuTick();
      setTimeout(() => { p.li.remove(); pods.splice(pods.indexOf(p), 1); }, 1000);
    };
    const ev = (html) => ($('#podEv').innerHTML = `<span class="m">${now()}</span>${html}`);
    add(); add();
    pods.forEach((p) => setState(p, 'Running'));
    cpuTick();
    if (reduced) return;
    setInterval(() => bentoOn && cpuTick(), 1100);
    const wave = [1.1, 1.6, 2.4, 3.2, 3.6, 3.2, 2.2, 1.4];
    for (let i = 1; ; i++) {
      await whenOn(); await wait(2600);
      traffic = wave[i % wave.length] + (Math.random() - 0.5) * 0.3;
      const alive = pods.filter((p) => p.state !== 'Terminating');
      const want = Math.max(2, Math.min(MAX, Math.ceil(traffic / TARGET)));
      if (want > alive.length) {
        for (let k = alive.length; k < want; k++) add();
        ev(`<b>ScalingReplicaSet</b> scaled up api-7f9c4 to ${want}`);
      } else if (want < alive.length) {
        alive.slice(want).forEach(remove);
        ev(`<b>ScalingReplicaSet</b> scaled down api-7f9c4 to ${want}`);
      } else ev(`<b>HPA</b> steady at ${want} replicas · cpu target 65%`);
      cpuTick();
    }
  })();

  // 03 — Monitoring chart (threshold = 250 ms)
  (async () => {
    const N = 44;
    const toLat = (v) => Math.round(100 + v * 2);
    let pts = Array.from({ length: N }, (_, i) => 45 + Math.sin(i / 4) * 10 + Math.random() * 8);
    const render = () => {
      const stepX = 300 / (N - 1);
      const d = pts.map((v, i) => `${i ? 'L' : 'M'}${(i * stepX).toFixed(1)} ${(90 - (v / 100) * 90).toFixed(1)}`).join(' ');
      $('#monLine').setAttribute('d', d);
      $('#monArea').setAttribute('d', `${d} L300 90 L0 90 Z`);
      const last = pts[N - 1];
      const lat = toLat(last);
      $('#monLat').textContent = lat;
      $('#monLatBox').classList.toggle('hot', lat > 250);
      $('#monRps').textContent = (0.9 + last / 90).toFixed(1) + 'k';
      $('#monErr').textContent = Math.max(0.01, (last - 50) / 700).toFixed(2);
    };
    render();
    if (reduced) return;
    while (true) {
      await whenOn(); await wait(650);
      let v = pts[N - 1] + (Math.random() - 0.5) * 12;
      if (Math.random() < 0.07) v += 30;
      v = Math.max(12, Math.min(95, v * 0.9 + 45 * 0.1));
      pts = pts.slice(1).concat(v);
      render();
    }
  })();

  // 04 — Incident → runbook → resolved
  (async () => {
    const box = $('#alertBox'), txt = $('#alertText'), log = $('#alertLog'), count = $('#alertCount');
    const L = (html) => pushLine(log, `<span class="ts">${now()}</span>${html}`, 5);
    const incidents = [
      ['HighMemoryUsage', 'node-3 · 93% used', 'kubectl rollout restart deploy/worker', 41],
      ['DiskAlmostFull', '/var/log · 91% used', 'logrotate -f /etc/logrotate.d/app', 27],
      ['SlowQueries', 'p95 820ms on orders db', 'CREATE INDEX idx_orders_user_id …', 63],
      ['CrashLoopBackOff', 'pod api-7f9c-x2k', 'kubectl rollout undo deploy/api', 35],
      ['CertExpiringSoon', 'api.example.com · 6 days', 'certbot renew --nginx', 19],
    ];
    L('<span class="g">✓ 0 alerts firing</span> <span class="m">· 14 rules loaded</span>');
    if (reduced) return;
    for (let k = 0; ; k++) {
      await whenOn(); await wait(3000);
      const [name, detail, fix, secs] = incidents[k % incidents.length];
      box.dataset.state = 'firing'; txt.textContent = `${name} — ${detail}`; count.textContent = '1 firing';
      L(`<span class="y">[FIRING:1]</span> <span class="c">${name}</span> <span class="m">${detail}</span>`);
      await wait(1500);
      box.dataset.state = 'fixing'; txt.textContent = 'Running runbook…';
      L(`<span class="b">runbook ›</span> <span class="c">${fix}</span>`);
      await wait(1700);
      box.dataset.state = 'ok'; txt.textContent = 'All systems operational'; count.textContent = '0 firing';
      L(`<span class="g">[RESOLVED]</span> <span class="c">${name}</span> <span class="m">in ${secs}s · MTTR ok</span>`);
    }
  })();

  // 05 — Terraform plan/apply
  (async () => {
    const ol = $('#iac');
    const cmd = (t) => `<span class="o">$</span> <span class="c">${t}</span>`;
    const script = () => [
      ['cmd', 'terraform plan -out=prod.tfplan'],
      ['out', `<span class="m">aws_vpc.main: Refreshing state... [id=vpc-0${hex(7)}]</span>`],
      ['out', '<span class="g">+</span> aws_security_group.api'],
      ['out', '<span class="g">+</span> aws_subnet.private["ap-south-1a"]'],
      ['out', '<span class="g">+</span> aws_eks_node_group.workers'],
      ['out', '<span class="c">Plan:</span> <span class="g">3 to add</span><span class="m">, 0 to change, 0 to destroy.</span>'],
      ['cmd', 'terraform apply prod.tfplan'],
      ['out', `<span class="m">aws_security_group.api: Creation complete after ${rnd(2, 4)}s [id=sg-0${hex(6)}]</span>`],
      ['out', `<span class="m">aws_subnet.private: Creation complete after ${rnd(1, 3)}s [id=subnet-0${hex(6)}]</span>`],
      ['out', `<span class="y">aws_eks_node_group.workers: Still creating... [1m${rnd(10, 40)}s elapsed]</span>`],
      ['out', `<span class="m">aws_eks_node_group.workers: Creation complete after 2m${rnd(1, 30)}s</span>`],
      ['out', '<span class="g">Apply complete! Resources: 3 added, 0 changed, 0 destroyed.</span>'],
    ];
    const MAX = 7;
    if (reduced) { script().slice(-MAX).forEach(([k, t]) => pushLine(ol, k === 'cmd' ? cmd(t) : t, MAX)); return; }
    const cur = '<span class="t-cursor"></span>';
    while (true) {
      await whenOn();
      for (const [k, t] of script()) {
        if (k === 'cmd') {
          const li = pushLine(ol, cmd('') + cur, MAX);
          for (let i = 1; i <= t.length; i++) { li.innerHTML = cmd(t.slice(0, i)) + cur; await wait(32); }
          li.innerHTML = cmd(t);
          await wait(450);
        } else {
          pushLine(ol, t, MAX);
          await wait(420);
        }
      }
      await wait(3200);
    }
  })();

  // 06 — Automation (journalctl-style)
  (async () => {
    const ol = $('#autoLog');
    const jobs = () => [
      ['backup.sh', `snapshot verified · ${rnd(10, 14)}.${rnd(0, 9)} GB <span class="g">✓</span>`],
      ['disk_cleanup.py', `freed ${rnd(2, 6)}.${rnd(0, 9)} GB on /var <span class="g">✓</span>`],
      ['ansible-playbook', `patch.yml · ok=${rnd(10, 14)} changed=${rnd(2, 6)} failed=0`],
      ['logrotate', 'rotated 18 logs, gzip -9 <span class="g">✓</span>'],
      ['report.py', 'daily infra report → slack #ops <span class="g">✓</span>'],
      ['certcheck.sh', `TLS certs OK · next expiry in ${rnd(40, 80)} days`],
      ['docker', `image prune · reclaimed ${rnd(300, 900)} MB <span class="g">✓</span>`],
      ['access_audit.py', `${rnd(20, 40)} users checked · 0 stale keys <span class="g">✓</span>`],
      ['healthcheck', `12/12 endpoints 200 OK · ${rnd(40, 90)}ms avg`],
    ];
    const MAX = 7;
    const add = (i) => {
      const [unit, msg] = jobs()[i % 9];
      pushLine(ol, `<span class="ts">${now()}</span><span class="m">prod-01</span> <span class="o">${unit}[${rnd(1200, 9800)}]:</span> <span class="c">${msg}</span>`, MAX);
    };
    let i = 0;
    for (; i < 5; i++) add(i);
    if (reduced) return;
    while (true) { await whenOn(); await wait(1400); add(i++); }
  })();

  /* ======================================================
     07 — THE VISITOR: real data, only in their browser
     ====================================================== */
  (() => {
    const ua = navigator.userAgent;
    const browser = (() => {
      let m;
      if ((m = ua.match(/Edg\/(\d+)/))) return 'Edge ' + m[1];
      if ((m = ua.match(/OPR\/(\d+)/))) return 'Opera ' + m[1];
      if ((m = ua.match(/Firefox\/(\d+)/))) return 'Firefox ' + m[1];
      if ((m = ua.match(/Chrome\/(\d+)/))) return 'Chrome ' + m[1];
      if ((m = ua.match(/Version\/(\d+).*Safari/))) return 'Safari ' + m[1];
      return 'Unknown';
    })();
    const os = (() => {
      let m;
      if (/Windows NT 10/.test(ua)) return 'Windows 10/11';
      if (/Windows/.test(ua)) return 'Windows';
      if ((m = ua.match(/Android (\d+)/))) return 'Android ' + m[1];
      if ((m = ua.match(/iPhone OS (\d+)/))) return 'iOS ' + m[1];
      if (/iPad/.test(ua)) return 'iPadOS';
      if (/Mac OS X/.test(ua)) return 'macOS';
      if (/CrOS/.test(ua)) return 'ChromeOS';
      if (/Linux/.test(ua)) return 'Linux';
      return 'Unknown';
    })();
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '—';
    const conn = navigator.connection && navigator.connection.effectiveType ? navigator.connection.effectiveType : '—';
    let ref = 'direct';
    try { if (document.referrer) ref = new URL(document.referrer).host || 'direct'; } catch (e) {}
    const facts = {
      Browser: browser,
      OS: os,
      Screen: `${screen.width}×${screen.height} @${Math.round((devicePixelRatio || 1) * 100) / 100}x`,
      Viewport: `${innerWidth}×${innerHeight}`,
      Language: navigator.language || '—',
      Timezone: tz,
      'Your time': now(),
      Network: conn,
      'Came from': ref,
      'Page load': '…',
      ISP: '…',
    };
    const dl = $('#youFacts');
    const renderFacts = () => {
      dl.innerHTML = Object.entries(facts).filter(([, v]) => v && v !== '—').map(([k, v]) => `<div><dt>${k}</dt><dd title="${escH(v)}">${escH(v)}</dd></div>`).join('');
    };
    renderFacts();
    const t0 = Date.now();
    setInterval(() => {
      facts['Your time'] = now();
      facts.Viewport = `${innerWidth}×${innerHeight}`;
      renderFacts();
      const s = Math.floor((Date.now() - t0) / 1000);
      $('#youUp').textContent = `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')} on site`;
    }, 1000);

    // initial "server" log: the real page + assets this browser just downloaded
    const kb = (b) => (b ? (b / 1024).toFixed(1) + ' kB' : 'cache');
    const logLoad = () => {
      const nav = performance.getEntriesByType('navigation')[0];
      const ms = nav ? Math.round(nav.loadEventEnd || nav.domContentLoadedEventEnd || nav.duration) : 0;
      facts['Page load'] = ms ? ms + ' ms' : '—';
      accessLog('GET', '/', (nav && nav.responseStatus) || 200, `${kb(nav && nav.transferSize)} · ${ms} ms`);
      const want = /styles\.css|main\.js|gsap|ScrollTrigger|lenis|fonts\.googleapis|suraj-profile/;
      performance.getEntriesByType('resource').filter((r) => want.test(r.name) && (r.responseStatus || 200) < 400).slice(0, 6).forEach((r) => {
        const u = new URL(r.name);
        const last = u.pathname.split('/').pop() || u.host;
        const name = u.host === location.host ? u.pathname : (u.host === 'fonts.googleapis.com' ? 'fonts.googleapis.com/css2' : last);
        accessLog('GET', decodeURIComponent(name), r.responseStatus || 200, `${kb(r.transferSize)} · ${Math.round(r.duration)} ms`);
      });
    };
    if (document.readyState === 'complete') setTimeout(logLoad, 300);
    else addEventListener('load', () => setTimeout(logLoad, 300), { once: true });

    // Public IPv4 + IPv6 + rough location — looked up by the visitor's own browser; nothing is stored.
    // (Works the same on Vercel: the request comes from the visitor, not from the server.)
    const getJSON = async (url) => {
      const c = new AbortController();
      const t = setTimeout(() => c.abort(), 5000);
      try {
        const r = await fetch(url, { signal: c.signal, cache: 'no-store' });
        if (!r.ok) throw new Error(r.status);
        return await r.json();
      } finally { clearTimeout(t); }
    };
    const geo = async () => {
      try {
        const d = await getJSON('https://ipapi.co/json/');
        if (d && d.ip && !d.error) return { ip: d.ip, city: d.city, region: d.region, country: d.country_name, cc: d.country_code, isp: d.org };
      } catch (e) {}
      try {
        const d = await getJSON('https://ipwho.is/');
        if (d && d.success) return { ip: d.ip, city: d.city, region: d.region, country: d.country, cc: d.country_code, isp: d.connection && (d.connection.isp || d.connection.org) };
      } catch (e) {}
      return null;
    };
    const showIp = (id, label, val) => {
      const row = $('#' + id + 'Row'), el = $('#' + id);
      el.dataset.final = val;
      row.hidden = false;
      reduced ? (el.textContent = val) : scramble(el, 1000);
      row.addEventListener('click', async () => {
        try { await navigator.clipboard.writeText(val); showToast(`${label} copied ✓`); } catch (e) {}
      });
    };
    Promise.allSettled([
      getJSON('https://api4.ipify.org?format=json'),
      getJSON('https://api6.ipify.org?format=json'),
      geo(),
    ]).then(([a, b, g]) => {
      const val = (r) => (r.status === 'fulfilled' && r.value ? r.value : null);
      const G = val(g);
      let ip4 = val(a) && /^\d{1,3}(\.\d{1,3}){3}$/.test(val(a).ip) ? val(a).ip : null;
      let ip6 = val(b) && String(val(b).ip).includes(':') ? val(b).ip : null;
      if (G && G.ip) {
        if (!ip4 && G.ip.includes('.')) ip4 = G.ip;
        if (!ip6 && G.ip.includes(':')) ip6 = G.ip;
      }
      $('#youResolving').remove();
      Object.assign(visitor, { ip4, ip6, ip: ip4 || ip6 });
      if (ip4) { showIp('youIp4', 'IPv4', ip4); accessLog('GET', 'api4.ipify.org', 200, '→ ' + ip4); }
      if (ip6) { showIp('youIp6', 'IPv6', ip6); accessLog('GET', 'api6.ipify.org', 200, '→ ' + ip6); }
      if (!ip4 && !ip6) $('#youIps').hidden = true; // nothing found → show nothing
      const place = G ? [G.city, G.region, G.country].filter(Boolean).join(', ') : '';
      if (place) {
        Object.assign(visitor, { city: G.city, region: G.region, country: G.country, cc: G.cc });
        const locEl = $('#youLoc');
        locEl.innerHTML = `📍 ${escH(place)}${G.cc ? ` <span class="cc">${escH(G.cc)}</span>` : ''}`;
        locEl.hidden = false;
      }
      if (G && G.isp) facts.ISP = G.isp; else delete facts.ISP;
      renderFacts();
    });
  })();

  /* ======================================================
     SURAJLOGISTIC — full-card fleet map (canvas)
     ====================================================== */
  (() => {
    const wrap = $('#fleet');
    if (!wrap) return;
    const card = wrap.closest('.proj');
    const cv = $('#fleetCanvas');
    const ctx = cv.getContext('2d');
    const feedEl = $('#fleetFeed');
    const CITY = ['Jaipur HQ', 'Delhi', 'Mumbai', 'Bengaluru', 'Ahmedabad', 'Hyderabad', 'Kolkata', 'Lucknow', 'Chennai', 'Indore', 'Chandigarh', 'Surat'];
    let W = 0, H = 0, visH = 0, nodes = [], edges = [], adj = [], blocks = [], cities = [], trucks = [], orders = [], fx = [];
    let col = {}, visible = false, delivered = 0, orderNo = 4820, frame = 0, hoverT = null;
    const mouse = { x: -1e4, y: -1e4 };

    const mkRng = (seed) => () => {
      seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
    const readCol = () => {
      const cs = getComputedStyle(root);
      const g = (v) => cs.getPropertyValue(v).trim();
      col = { bg: g('--map-bg'), block: g('--map-block'), park: g('--map-park'), road: g('--map-road'), line: g('--map-line'), label: g('--map-label'), ink: g('--map-ink'), cab: g('--map-cab'), acc: g('--accent'), ok: g('--ok') };
    };

    const connected = (E) => {
      const a = nodes.map(() => []);
      E.forEach(([x, y]) => { a[x].push(y); a[y].push(x); });
      const seen = new Set([0]), q = [0];
      while (q.length) for (const v of a[q.pop()]) if (!seen.has(v)) { seen.add(v); q.push(v); }
      return seen.size === nodes.length;
    };

    const build = () => {
      const r = mkRng(2026);
      const cols = W > 820 ? 10 : W > 640 ? 8 : W > 420 ? 6 : 5;
      const rows = H > 600 ? 7 : 6;
      const padX = 34, padY = 30;
      const gx = (W - padX * 2) / (cols - 1), gy = (H - padY * 2) / (rows - 1);
      nodes = [];
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
        nodes.push({ x: padX + i * gx + (r() - 0.5) * gx * 0.5, y: padY + j * gy + (r() - 0.5) * gy * 0.45 });
      }
      const id = (i, j) => j * cols + i;
      let E = [];
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
        if (i < cols - 1) E.push([id(i, j), id(i + 1, j)]);
        if (j < rows - 1) E.push([id(i, j), id(i, j + 1)]);
        if (i < cols - 1 && j < rows - 1 && r() < 0.22) E.push(r() < 0.5 ? [id(i, j), id(i + 1, j + 1)] : [id(i + 1, j), id(i, j + 1)]);
      }
      edges = E.slice();
      for (const e of E) if (r() < 0.3) { const t = edges.filter((x) => x !== e); if (connected(t)) edges = t; }
      adj = nodes.map(() => []);
      edges.forEach(([a, b]) => { const d = dist(nodes[a], nodes[b]); adj[a].push([b, d]); adj[b].push([a, d]); });
      // city blocks (and a few parks) between the roads
      blocks = [];
      for (let j = 0; j < rows - 1; j++) for (let i = 0; i < cols - 1; i++) {
        const q = [nodes[id(i, j)], nodes[id(i + 1, j)], nodes[id(i + 1, j + 1)], nodes[id(i, j + 1)]];
        const cx = q.reduce((s, p) => s + p.x, 0) / 4, cy = q.reduce((s, p) => s + p.y, 0) / 4;
        blocks.push({ pts: q.map((p) => ({ x: cx + (p.x - cx) * 0.7, y: cy + (p.y - cy) * 0.7 })), park: r() < 0.16 });
      }
      // cities: spread out over the visible (non-glass) part of the map
      const cand = nodes.map((n, i) => i).filter((i) => nodes[i].y > 104 && nodes[i].y < visH - 24 && nodes[i].x > 60 && nodes[i].x < W - 60);
      cities = [];
      if (cand.length) {
        let first = cand.reduce((b, i) => (Math.abs(nodes[i].x - W * 0.42) + Math.abs(nodes[i].y - visH * 0.55) < Math.abs(nodes[b].x - W * 0.42) + Math.abs(nodes[b].y - visH * 0.55) ? i : b), cand[0]);
        cities.push(first);
        const want = Math.min(W > 820 ? 10 : W > 640 ? 8 : 6, cand.length);
        while (cities.length < want) {
          let best = -1, bd = -1;
          for (const i of cand) {
            if (cities.includes(i)) continue;
            const d = Math.min(...cities.map((c) => dist(nodes[i], nodes[c])));
            if (d > bd) { bd = d; best = i; }
          }
          cities.push(best);
        }
      }
      cities = cities.map((i, k) => ({ i, name: CITY[k] }));
      // fleet
      const n = W > 820 ? 9 : W > 640 ? 7 : 5;
      trucks = Array.from({ length: n }, (_, k) => ({
        id: 'TRK-' + String(k + 1).padStart(2, '0'), node: cities[k % cities.length].i, path: [], seg: 0, d: 0,
        speed: 0.85 + r() * 0.55, job: null, wait: k * 25, ra: 0,
      }));
      orders = []; fx = [];
      $('#fleetTrucks').textContent = n;
    };

    const shortest = (s, g) => {
      const n = nodes.length, D = Array(n).fill(Infinity), P = Array(n).fill(-1), done = Array(n).fill(false);
      D[s] = 0;
      for (;;) {
        let u = -1, best = Infinity;
        for (let i = 0; i < n; i++) if (!done[i] && D[i] < best) { best = D[i]; u = i; }
        if (u < 0 || u === g) break;
        done[u] = true;
        for (const [v, w] of adj[u]) if (D[u] + w < D[v]) { D[v] = D[u] + w; P[v] = u; }
      }
      const p = [];
      for (let v = g; v !== -1; v = P[v]) p.unshift(v);
      return p[0] === s ? p : [s];
    };
    const nearestCity = (ni) => cities.reduce((b, c) => (dist(nodes[c.i], nodes[ni]) < dist(nodes[b.i], nodes[ni]) ? c : b), cities[0]);
    const pathLen = (t) => {
      let L = 0;
      for (let k = t.seg; k < t.path.length - 1; k++) L += dist(nodes[t.path[k]], nodes[t.path[k + 1]]);
      return Math.max(0, L - t.d);
    };
    const etaText = (t) => { const s = Math.round(pathLen(t) / t.speed / 60 * 4); return `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, '0')}s`; };

    const feed = (html) => {
      const li = document.createElement('li');
      li.innerHTML = html;
      feedEl.prepend(li);
      while (feedEl.children.length > 3) feedEl.lastChild.remove();
    };
    const hud = () => {
      $('#fleetDone').textContent = delivered;
      $('#fleetOrders').textContent = orders.filter((o) => !o.truck).length;
    };
    const ripple = (x, y, c) => fx.push({ x, y, c, t: 0 });

    const assign = (t) => {
      const open = orders.filter((o) => !o.truck);
      let target;
      if (open.length) {
        const o = open.reduce((b, x) => (dist(nodes[x.node], nodes[t.node]) < dist(nodes[b.node], nodes[t.node]) ? x : b));
        o.truck = t; t.job = { type: 'order', order: o }; target = o.node;
        feed(`<b>${t.id}</b> picked up <b>#${o.no}</b> <span class="o">→ ${nearestCity(o.node).name}</span>`);
      } else {
        const opts = cities.filter((c) => c.i !== t.node);
        const c = opts[(Math.random() * opts.length) | 0];
        t.job = { type: 'route', city: c }; target = c.i;
        if (Math.random() < 0.5) feed(`<b>${t.id}</b> dispatched <span class="m">${nearestCity(t.node).name}</span> → <b>${c.name}</b>`);
      }
      t.path = shortest(t.node, target); t.seg = 0; t.d = 0;
      if (t.path.length < 2) { t.job = null; t.wait = 30; }
      hud();
    };
    const reroute = (t, target) => {
      if (t.seg < t.path.length - 1) {
        const from = t.path[t.seg], nxt = t.path[t.seg + 1];
        t.path = [from, ...shortest(nxt, target)]; t.seg = 0;
      } else { t.path = shortest(t.node, target); t.seg = 0; t.d = 0; }
    };
    const arrive = (t) => {
      const n = nodes[t.node];
      if (t.job.type === 'order') {
        orders = orders.filter((o) => o !== t.job.order);
        feed(`<b>${t.id}</b> delivered <b>#${t.job.order.no}</b> <span class="ok">✓</span> <span class="m">${t.job.order.mine ? '(your order!)' : ''}</span>`);
        ripple(n.x, n.y, col.ok);
      } else {
        feed(`<b>${t.id}</b> reached <b>${t.job.city.name}</b> <span class="ok">✓</span>`);
        ripple(n.x, n.y, col.acc);
      }
      delivered++;
      t.job = null; t.wait = 45 + ((Math.random() * 60) | 0);
      hud();
    };
    const placeOrder = (ni, mine) => {
      const o = { node: ni, no: ++orderNo, truck: null, mine, born: frame };
      orders.push(o);
      const city = nearestCity(ni).name;
      if (mine) {
        feed(`<b>You</b> placed order <b>#${o.no}</b> <span class="o">near ${city}</span>`);
        accessLog('POST', '/api/orders', 201, `#${o.no} → ${city}`);
        // nearest truck that isn't already on an order drops what it's doing
        const free = trucks.filter((t) => !t.job || t.job.type !== 'order');
        if (free.length) {
          const t = free.reduce((b, x) => (dist(posOf(x), nodes[ni]) < dist(posOf(b), nodes[ni]) ? x : b));
          o.truck = t; t.job = { type: 'order', order: o }; t.wait = 0;
          reroute(t, ni);
          feed(`<b>${t.id}</b> rerouted to your order <span class="o">ETA ${etaText(t)}</span>`);
        }
      } else feed(`<span class="y">New order</span> <b>#${o.no}</b> <span class="m">· ${city}</span>`);
      ripple(nodes[ni].x, nodes[ni].y, '#fbbf24');
      hud();
    };

    const posOf = (t) => {
      if (t.seg >= t.path.length - 1 || t.path.length < 2) { const n = nodes[t.node]; return { x: n.x, y: n.y, a: t.ra }; }
      const a = nodes[t.path[t.seg]], b = nodes[t.path[t.seg + 1]];
      const len = dist(a, b), k = Math.min(t.d / len, 1), ang = Math.atan2(b.y - a.y, b.x - a.x);
      const off = 5; // drive on the left, like in India
      return { x: a.x + (b.x - a.x) * k + Math.sin(ang) * off, y: a.y + (b.y - a.y) * k - Math.cos(ang) * off, a: ang };
    };
    const step = (t) => {
      if (t.wait > 0) { t.wait--; return; }
      if (!t.job) { assign(t); return; }
      if (t.seg >= t.path.length - 1) { arrive(t); return; }
      const a = nodes[t.path[t.seg]], b = nodes[t.path[t.seg + 1]];
      // slow down near corners, speed up on long straights
      const len = dist(a, b), edge = Math.min(t.d, len - t.d);
      t.d += t.speed * (edge < 14 ? 0.6 : 1);
      if (t.d >= len) { t.d -= len; t.seg++; t.node = t.path[t.seg]; }
    };

    const roundRect = (x, y, w, h, r) => { ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x, y, w, h, r) : ctx.rect(x, y, w, h); };
    const drawTruck = (t, p, hot) => {
      let diff = p.a - t.ra;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      t.ra += diff * 0.18;
      const onOrder = t.job && t.job.type === 'order';
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(t.ra);
      ctx.scale(1.15, 1.15);
      // headlight beams at night
      if (root.dataset.theme === 'dark') {
        const g = ctx.createLinearGradient(17, 0, 46, 0);
        g.addColorStop(0, 'rgba(255,226,150,.42)'); g.addColorStop(1, 'rgba(255,226,150,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.moveTo(17, -5); ctx.lineTo(46, -14); ctx.lineTo(46, 14); ctx.lineTo(17, 5); ctx.closePath(); ctx.fill();
      }
      // soft shadow
      ctx.fillStyle = 'rgba(0,0,0,.28)';
      roundRect(-16, -5.5, 34, 14, 4); ctx.fill();
      // wheels
      ctx.fillStyle = '#111113';
      for (const x of [-12, -6.5, 11]) {
        roundRect(x - 2.6, -8.3, 5.2, 2.8, 1.2); ctx.fill();
        roundRect(x - 2.6, 5.5, 5.2, 2.8, 1.2); ctx.fill();
      }
      // trailer
      const tg = ctx.createLinearGradient(0, -6.5, 0, 6.5);
      tg.addColorStop(0, onOrder ? '#fde68a' : '#ffa07a');
      tg.addColorStop(1, onOrder ? '#f59e0b' : col.acc);
      ctx.fillStyle = tg;
      roundRect(-17, -6.5, 23, 13, 2.5); ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,.16)'; ctx.lineWidth = 0.8;
      ctx.beginPath();
      for (const x of [-12, -7, -2, 3]) { ctx.moveTo(x, -5.6); ctx.lineTo(x, 5.6); }
      ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,.9)';
      ctx.fillRect(-15, -0.9, 19, 1.8);
      // hitch + cab
      ctx.fillStyle = '#27272a'; ctx.fillRect(6, -1.6, 2.5, 3.2);
      ctx.fillStyle = col.cab;
      roundRect(8, -6, 10, 12, 3); ctx.fill();
      ctx.fillStyle = 'rgba(125,190,255,.95)';
      roundRect(14.4, -4.6, 2.6, 9.2, 1.2); ctx.fill();
      // head + tail lights
      ctx.fillStyle = '#fff6c8';
      ctx.beginPath(); ctx.arc(18, -4.3, 0.95, 0, Math.PI * 2); ctx.arc(18, 4.3, 0.95, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(-17.6, -5.6, 1.3, 2.6); ctx.fillRect(-17.6, 3, 1.3, 2.6);
      if (hot) { ctx.strokeStyle = col.ink; ctx.lineWidth = 1.4; roundRect(-21, -11, 43, 22, 7); ctx.stroke(); }
      ctx.restore();
    };

    const draw = () => {
      frame++;
      ctx.fillStyle = col.bg; ctx.fillRect(0, 0, W, H);
      for (const b of blocks) {
        ctx.fillStyle = b.park ? col.park : col.block;
        ctx.beginPath(); b.pts.forEach((p, k) => (k ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y))); ctx.closePath(); ctx.fill();
      }
      ctx.lineCap = 'round';
      ctx.strokeStyle = col.road; ctx.lineWidth = 14;
      ctx.beginPath(); edges.forEach(([a, b]) => { ctx.moveTo(nodes[a].x, nodes[a].y); ctx.lineTo(nodes[b].x, nodes[b].y); }); ctx.stroke();
      ctx.strokeStyle = col.line; ctx.lineWidth = 1; ctx.setLineDash([5, 7]);
      ctx.beginPath(); edges.forEach(([a, b]) => { ctx.moveTo(nodes[a].x, nodes[a].y); ctx.lineTo(nodes[b].x, nodes[b].y); }); ctx.stroke();
      ctx.setLineDash([]);

      // planned routes
      const positions = trucks.map((t) => posOf(t));
      trucks.forEach((t, k) => {
        if (!t.job || t.path.length < 2) return;
        const p = positions[k];
        const focus = t === hoverT || (t.job.type === 'order' && t.job.order.mine);
        ctx.strokeStyle = t.job.type === 'order' ? '#fbbf24' : col.acc;
        ctx.globalAlpha = focus ? 0.95 : 0.35; ctx.lineWidth = focus ? 2.5 : 1.5;
        ctx.setLineDash([6, 6]); ctx.lineDashOffset = -frame * 0.6;
        ctx.beginPath(); ctx.moveTo(p.x, p.y);
        for (let s = t.seg + 1; s < t.path.length; s++) ctx.lineTo(nodes[t.path[s]].x, nodes[t.path[s]].y);
        ctx.stroke();
        ctx.setLineDash([]); ctx.globalAlpha = 1;
      });

      // cities
      ctx.textBaseline = 'middle';
      cities.forEach((c, k) => {
        const n = nodes[c.i], hq = k === 0;
        if (hq) {
          const pulse = (Math.sin(frame * 0.05) + 1) / 2;
          ctx.globalAlpha = 0.25 * (1 - pulse); ctx.fillStyle = col.acc;
          ctx.beginPath(); ctx.arc(n.x, n.y, 12 + pulse * 10, 0, Math.PI * 2); ctx.fill();
          ctx.globalAlpha = 1;
        }
        ctx.fillStyle = hq ? col.acc : col.bg; ctx.strokeStyle = hq ? col.acc : col.ink; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.arc(n.x, n.y, hq ? 9 : 7, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        if (!hq) { ctx.fillStyle = col.ink; ctx.beginPath(); ctx.arc(n.x, n.y, 2.4, 0, Math.PI * 2); ctx.fill(); }
        ctx.font = `${hq ? 700 : 600} ${hq ? 13 : 12}px "Geist", sans-serif`;
        const w = ctx.measureText(c.name).width + 16;
        const lx = Math.min(Math.max(n.x - w / 2, 4), W - w - 4), ly = n.y - 25;
        ctx.globalAlpha = 0.92; ctx.fillStyle = hq ? col.acc : col.bg; roundRect(lx, ly - 10, w, 20, 10); ctx.fill();
        ctx.globalAlpha = 1;
        if (!hq) { ctx.strokeStyle = col.road; ctx.lineWidth = 1; ctx.stroke(); }
        ctx.fillStyle = hq ? '#0a0a0a' : col.ink; ctx.fillText(c.name, lx + 8, ly + 0.5);
      });

      // orders (parcels)
      orders.forEach((o) => {
        const n = nodes[o.node], pulse = (Math.sin((frame - o.born) * 0.12) + 1) / 2;
        ctx.strokeStyle = '#fbbf24'; ctx.globalAlpha = 0.55 * (1 - pulse); ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(n.x, n.y, 11 + pulse * 12, 0, Math.PI * 2); ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'rgba(0,0,0,.3)'; roundRect(n.x - 8, n.y - 6, 17, 16, 3); ctx.fill();
        ctx.fillStyle = '#d97706'; roundRect(n.x - 9, n.y - 8, 18, 16, 3); ctx.fill();
        ctx.fillStyle = '#fbbf24'; roundRect(n.x - 9, n.y - 8, 18, 6, 3); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.fillRect(n.x - 1.5, n.y - 8, 3, 16);
      });

      // trucks
      hoverT = null;
      let hd = 30;
      trucks.forEach((t, k) => { const d = dist(positions[k], mouse); if (d < hd) { hd = d; hoverT = t; } });
      trucks.forEach((t, k) => drawTruck(t, positions[k], t === hoverT));

      // ripples
      fx = fx.filter((f) => {
        f.t += 0.02;
        if (f.t >= 1) return false;
        ctx.strokeStyle = f.c; ctx.globalAlpha = 1 - f.t; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(f.x, f.y, 6 + f.t * 34, 0, Math.PI * 2); ctx.stroke();
        return true;
      });
      ctx.globalAlpha = 1;

      // tooltip for hovered truck
      if (hoverT && hoverT.job) {
        const p = positions[trucks.indexOf(hoverT)];
        const dest = hoverT.job.type === 'order' ? `#${hoverT.job.order.no}` : hoverT.job.city.name;
        const text = `${hoverT.id} → ${dest} · ETA ${etaText(hoverT)}`;
        ctx.font = '600 12px "Geist Mono", monospace';
        const w = ctx.measureText(text).width + 18;
        const x = Math.min(Math.max(p.x - w / 2, 6), W - w - 6), y = p.y - 36;
        ctx.fillStyle = col.ink; roundRect(x, y - 12, w, 24, 12); ctx.fill();
        ctx.fillStyle = col.bg; ctx.fillText(text, x + 9, y);
      }
    };

    const tick = () => {
      if (visible && cities.length) {
        trucks.forEach(step);
        if (frame % 260 === 130 && orders.filter((o) => !o.truck).length < 2) {
          const cand = nodes.map((n, i) => i).filter((i) => nodes[i].y < visH - 24 && nodes[i].y > 104 && nodes[i].x > 40 && nodes[i].x < W - 40);
          placeOrder(cand[(Math.random() * cand.length) | 0], false);
        }
        draw();
      }
      requestAnimationFrame(tick);
    };

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = wrap.clientWidth; H = wrap.clientHeight;
      if (!W || !H) return;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const info = $('.proj-info', card);
      visH = H - (info ? info.offsetHeight : 0);
      build();
      draw();
    };

    readCol();
    resize();
    new ResizeObserver(() => resize()).observe(wrap);
    addEventListener('themechange', () => { readCol(); draw(); });
    if (reduced) return;
    new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(wrap);
    wrap.addEventListener('pointermove', (e) => {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    wrap.addEventListener('pointerleave', () => { mouse.x = mouse.y = -1e4; });
    wrap.addEventListener('click', (e) => {
      if (!cities.length) return;
      const r = cv.getBoundingClientRect();
      const p = { x: e.clientX - r.left, y: e.clientY - r.top };
      let best = 0, bd = Infinity;
      nodes.forEach((n, i) => { const d = dist(n, p); if (d < bd) { bd = d; best = i; } });
      placeOrder(best, true);
    });
    requestAnimationFrame(tick);
  })();

  /* ======================================================
     TERMINAL — interactive
     ====================================================== */
  const out = $('#termOut');
  const input = $('#termInput');
  const body = $('#termBody');
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const print = (html) => { out.insertAdjacentHTML('beforeend', html + '\n'); body.scrollTop = body.scrollHeight; };
  const promptHtml = (cmd) => `<span class="t-p">➜</span> <span class="t-dir">~</span> <span class="t-c">${esc(cmd)}</span>`;
  const link = (href, text) => `<a class="t-l" href="${href}" target="_blank" rel="noopener">${text}</a>`;

  const commands = {
    help: () => [
      '<span class="t-b">Available commands</span>',
      '  <span class="t-a">about</span>       who I am',
      '  <span class="t-a">explain</span>     what I do, in plain English',
      '  <span class="t-a">experience</span>  what I\'m doing now',
      '  <span class="t-a">skills</span>      my toolkit',
      '  <span class="t-a">projects</span>    things I\'ve built',
      '  <span class="t-a">certs</span>       certifications',
      '  <span class="t-a">education</span>   academic background',
      '  <span class="t-a">leetcode</span>    problem-solving stats',
      '  <span class="t-a">contact</span>     how to reach me',
      '  <span class="t-a">ip</span>          your public IP (only you see it)',
      '  <span class="t-a">resume</span>      open my résumé',
      '  <span class="t-a">theme</span>       toggle light / dark',
      '  <span class="t-a">clear</span>       clear the screen',
      '<span class="t-o">psst… a few hidden ones too. try</span> <span class="t-a">neofetch</span> <span class="t-o">or</span> <span class="t-a">sudo hire-suraj</span>',
    ].join('\n'),
    about: () => [
      '<span class="t-b">Suraj Suthar</span> — DevOps Engineer · Jaipur, India',
      '<span class="t-o">CS graduate (2026, CGPA 8.8). RHCSA-certified Linux admin.</span>',
      '<span class="t-o">I automate how software is built, shipped and monitored:</span>',
      '<span class="t-o">Docker → Jenkins → Kubernetes on AWS → Prometheus &amp; Grafana.</span>',
    ].join('\n'),
    explain: () => [
      '<span class="t-b">In plain English:</span>',
      '<span class="t-o">I make sure apps and websites reach people safely,</span>',
      '<span class="t-o">and stay fast and online after they do. If something</span>',
      '<span class="t-o">breaks, my dashboards and alerts catch it first.</span>',
    ].join('\n'),
    whoami: () => 'suraj — DevOps engineer. keeps software running.',
    whereami: () => 'Jaipur, Rajasthan, India 🇮🇳',
    ip: () => {
      if (!visitor.ip4 && !visitor.ip6) return '<span class="t-o">still resolving… or kept private by your browser</span>';
      const out = [];
      if (visitor.ip4) out.push(`<span class="t-a">ipv4</span>  <span class="t-b">${escH(visitor.ip4)}</span>`);
      if (visitor.ip6) out.push(`<span class="t-a">ipv6</span>  <span class="t-b">${escH(visitor.ip6)}</span>`);
      if (visitor.city) out.push(`<span class="t-a">loc </span>  ${escH([visitor.city, visitor.country].filter(Boolean).join(', '))}`);
      out.push('<span class="t-o">(only you can see this — nothing is stored)</span>');
      return out.join('\n');
    },
    myip: () => commands.ip(),
    'curl ifconfig.me': () => commands.ip(),
    skills: () => [
      '<span class="t-a">devops  </span> docker  kubernetes  jenkins  ansible  terraform',
      '<span class="t-a">cloud   </span> aws  linux (rhcsa)  bash',
      '<span class="t-a">observe </span> prometheus  grafana  clickhouse',
      '<span class="t-a">backend </span> node.js  express  mongodb  mysql  postgresql',
      '<span class="t-a">frontend</span> react  typescript  next.js  tailwind',
      '<span class="t-a">lang    </span> c++  python  javascript  sql',
    ].join('\n'),
    projects: () => [
      'NAME                READY   STATUS',
      `<span class="t-ok">mern-notes-app      1/1     Running</span>   ${link('https://github.com/Surajsuthar01/mern-notes-app', 'repo')}`,
      `<span class="t-ok">surajlogistic       1/1     Running</span>   ${link('https://github.com/Surajsuthar01/surajlogistic', 'repo')}`,
      `<span class="t-ok">bash-scripting      1/1     Running</span>   ${link('https://github.com/Surajsuthar01/bash_scripting', 'repo')}`,
      `<span class="t-o">+ 20 more on</span> ${link('https://github.com/Surajsuthar01/', 'github.com/Surajsuthar01')}`,
    ].join('\n'),
    experience: () => [
      '<span class="t-b">DevOps Engineer</span> <span class="t-ok">● present</span>  <span class="t-o">(company kept private)</span>',
      '<span class="t-o">• monitor production infrastructure &amp; production support</span>',
      '<span class="t-o">• Grafana dashboards on ClickHouse data</span>',
      '<span class="t-o">• Python &amp; Bash automation of operational workflows</span>',
      '<span class="t-o">• system performance analysis</span>',
      '<span class="t-b">Cyber Security Intern</span> <span class="t-o">— TechForce Academy, 2025</span>',
      '<span class="t-w">learning:</span> AWS Solutions Architect · GitOps with ArgoCD',
    ].join('\n'),
    certs: () => [
      '<span class="t-ok">✓</span> RHCSA — Red Hat <span class="t-o">(2024–2027)</span>',
      '<span class="t-ok">✓</span> OS Fundamentals, Elite — NPTEL IIT Kharagpur',
      '<span class="t-ok">✓</span> Oracle Cloud Foundations Associate',
      '<span class="t-ok">✓</span> Docker for Absolute Beginners — KodeKloud',
      '<span class="t-ok">✓</span> Advanced Cyber Security + Internship — TechForce',
      '<span class="t-ok">✓</span> SQL (Basic) — HackerRank',
      '<span class="t-ok">✓</span> AI Finishing School — Infosys Foundation',
      `<span class="t-ok">✓</span> AWS Educate × 6 — ${link('https://www.credly.com/users/suraj-suthar.34931b98/badges', 'credly')}`,
    ].join('\n'),
    education: () => [
      '<span class="t-a">2022–26</span> B.Tech CSE · Arya College, Jaipur · <span class="t-ok">CGPA 8.8</span>',
      '<span class="t-a">2022   </span> Senior Secondary (PCM+CS) · Karju · 80.8%',
      '<span class="t-a">2020   </span> Secondary · Bambori, Pratapgarh · 81%',
    ].join('\n'),
    leetcode: () => [
      '<span class="t-b">300+</span> problems solved in C++',
      '<span class="t-ok">✓</span> Top Interview 150   <span class="t-ok">✓</span> Top SQL 50   <span class="t-ok">✓</span> 50 Days 2025',
      link('https://leetcode.com/u/surajsuthar01/', 'leetcode.com/u/surajsuthar01'),
    ].join('\n'),
    contact: () => [
      `<span class="t-a">email   </span> ${link('mailto:' + EMAIL, EMAIL)}`,
      `<span class="t-a">linkedin</span> ${link('https://www.linkedin.com/in/suraj-suthar-7a088a28b/', 'in/suraj-suthar')}`,
      `<span class="t-a">github  </span> ${link('https://github.com/Surajsuthar01/', '@Surajsuthar01')}`,
      `<span class="t-a">whatsapp</span> ${link('https://wa.me/6350692701', '+91 63506 92701')}`,
    ].join('\n'),
    social: () => commands.contact(),
    resume: () => { window.open(RESUME, '_blank', 'noopener'); return '<span class="t-ok">opening résumé…</span>'; },
    theme: () => `<span class="t-ok">theme set to ${toggleTheme()}</span>`,
    ls: () => '<span class="t-dir">projects/</span>  <span class="t-dir">certs/</span>  about.md  resume.pdf  <span class="t-ok">hire-me.sh*</span>',
    pwd: () => '/home/suraj/portfolio',
    date: () => new Date().toString(),
    uptime: () => 'up since 2022 — learning, building, shipping. load average: ☕ ☕ ☕',
    'cat about.md': () => commands.about(),
    './hire-me.sh': () => commands['sudo hire-suraj'](),
    'kubectl get pods': () => commands.projects(),
    'kubectl get pods -n portfolio': () => commands.projects(),
    'sudo hire-suraj': () => {
      setTimeout(() => { location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent("Let's work together"); }, 1400);
      return '[sudo] password for recruiter: ********\n<span class="t-ok">✓ access granted.</span> great choice. opening your mail client…';
    },
    sudo: () => '<span class="t-w">usage:</span> sudo hire-suraj',
    exit: () => '<span class="t-o">nice try. there is no exit from a good portfolio :)</span>',
    neofetch: () => [
      '<span class="t-a">   ____  </span>  <span class="t-b">suraj</span>@<span class="t-b">devsuraj</span>',
      '<span class="t-a">  / ___| </span>  ----------------',
      '<span class="t-a">  \\___ \\ </span>  <span class="t-a">role</span>      DevOps Engineer',
      '<span class="t-a">   ___) |</span>  <span class="t-a">location</span>  Jaipur, Rajasthan',
      '<span class="t-a">  |____/ </span>  <span class="t-a">os</span>        RHEL (RHCSA certified)',
      '            <span class="t-a">shell</span>     bash · python · c++',
      '            <span class="t-a">status</span>    <span class="t-ok">open to opportunities</span>',
    ].join('\n'),
  };
  const names = Object.keys(commands).filter((k) => !k.includes(' ') && !k.startsWith('.'));

  const history = [];
  let hIdx = 0;
  const run = (raw, auto = false) => {
    const cmd = raw.trim();
    print(promptHtml(cmd));
    if (!cmd) return;
    history.push(cmd); hIdx = history.length;
    const key = cmd.toLowerCase().replace(/\s+/g, ' ');
    const known = Object.prototype.hasOwnProperty.call(commands, key) || key === 'clear' || key === 'cls' || key.startsWith('echo ');
    if (!auto) accessLog('POST', '/api/terminal', known ? 200 : 404, `"${cmd}"`);
    if (key === 'clear' || key === 'cls') { out.innerHTML = ''; return; }
    if (key.startsWith('echo ')) return print(esc(cmd.slice(5)));
    const fn = Object.prototype.hasOwnProperty.call(commands, key) ? commands[key] : null;
    print(fn ? fn() : `<span class="t-w">command not found:</span> ${esc(cmd)} — type <span class="t-a">help</span>`);
  };

  let autoplaying = false, skipAuto = false;
  $('#termForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (autoplaying) skipAuto = true;
    run(input.value);
    input.value = '';
  });
  input.addEventListener('keydown', (e) => {
    if (autoplaying && e.key.length === 1) skipAuto = true;
    if (e.key === 'ArrowUp') { if (hIdx > 0) input.value = history[--hIdx]; e.preventDefault(); }
    else if (e.key === 'ArrowDown') { hIdx = Math.min(hIdx + 1, history.length); input.value = history[hIdx] || ''; e.preventDefault(); }
    else if (e.key === 'Tab') {
      e.preventDefault();
      const m = names.filter((n) => n.startsWith(input.value.toLowerCase()));
      if (m.length === 1) input.value = m[0];
      else if (m.length > 1) { print(promptHtml(input.value)); print('<span class="t-o">' + m.join('  ') + '</span>'); }
    } else if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); out.innerHTML = ''; }
  });
  $('#terminal').addEventListener('click', (e) => {
    if (e.target.closest('a') || getSelection().toString()) return;
    input.focus({ preventScroll: true });
  });

  const autoplay = async () => {
    autoplaying = true;
    for (const cmd of ['whoami', 'kubectl get pods -n portfolio']) {
      if (skipAuto) break;
      for (let i = 1; i <= cmd.length && !skipAuto; i++) {
        input.value = cmd.slice(0, i);
        await wait(reduced ? 0 : 45 + Math.random() * 45);
      }
      if (skipAuto) break;
      await wait(250);
      run(cmd, true); input.value = '';
      await wait(500);
    }
    if (!skipAuto) input.value = '';
    autoplaying = false;
    print('<span class="t-o">──────────────────────────────────────</span>');
    print('<span class="t-w">↳</span> it\'s a real shell — type <span class="t-a">help</span> and press enter');
  };

  /* ======================================================
     PRELOADER → INTRO
     ====================================================== */
  const loader = $('#loader');
  const intro = () => {
    autoplay();
    if (!animate) return;
    gsap.timeline({ defaults: { ease: 'expo.out' } })
      .from('#cluster', { opacity: 0, duration: 2.4, ease: 'power1.out' }, 0)
      .from('.hero-name .ch', { yPercent: 115, rotate: 8, duration: 1.4, stagger: 0.045 }, 0)
      .from('.hero-star', { scale: 0, rotate: -180, duration: 1.2 }, 0.3)
      .from('.hero-meta > *', { y: 20, opacity: 0, duration: 1, stagger: 0.06 }, 0.2)
      .from('.hero-intro > *', { y: 40, opacity: 0, duration: 1.2, stagger: 0.08 }, 0.4)
      .from('.arch', { clipPath: 'inset(100% 0 0 0)', duration: 1.6, ease: 'expo.inOut' }, 0.2)
      .from('.arch img', { scale: 1.4, duration: 2 }, 0.2)
      .from('.badge, .badge-core', { scale: 0, rotate: -180, duration: 1.2, ease: 'back.out(1.7)' }, 1)
      .from('.terminal', { y: 80, opacity: 0, rotate: 3, duration: 1.4 }, 0.5);
  };

  const runLoader = () => {
    if (!animate) { loader.classList.add('done'); intro(); return; }
    lenis && lenis.stop();
    const log = $('#loaderLog');
    const lines = [
      '<b>[ ok ]</b> mounting /home/suraj',
      '<b>[ ok ]</b> starting docker.service',
      '<b>[ ok ]</b> kubectl rollout status deploy/portfolio',
      '<b>[ ok ]</b> grafana: all panels green',
      '<b>[ ok ]</b> ready.',
    ];
    const num = $('#loaderNum');
    const state = { v: 0 };
    gsap.to(state, {
      v: 100, duration: 1.9, ease: 'power2.inOut',
      onUpdate: () => {
        num.textContent = String(Math.round(state.v)).padStart(2, '0');
        const n = Math.min(lines.length, Math.floor(state.v / 20) + 1);
        if (log.childElementCount < n) log.insertAdjacentHTML('beforeend', `<div>${lines[log.childElementCount]}</div>`);
      },
      onComplete: () => {
        gsap.timeline()
          .to('.loader > *', { y: -40, opacity: 0, duration: 0.5, stagger: 0.05, ease: 'power2.in' })
          .to(loader, { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'expo.inOut' }, '-=.15')
          .add(() => { loader.classList.add('done'); lenis && lenis.start(); }, '-=.1')
          .add(intro, '-=.75');
      },
    });
  };

  /* ======================================================
     SCROLL ANIMATIONS
     ====================================================== */
  $$('[data-count]').forEach((el) => {
    const end = parseFloat(el.dataset.count);
    const dec = +(el.dataset.dec || 0);
    if (!animate) { el.textContent = end.toFixed(dec); return; }
    const s = { v: 0 };
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => gsap.to(s, { v: end, duration: 2, ease: 'power3.out', onUpdate: () => (el.textContent = s.v.toFixed(dec)) }),
    });
  });

  if (animate) {
    ScrollTrigger.batch('.reveal', {
      start: 'top 88%',
      onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', stagger: 0.08, overwrite: true }),
    });

    $$('.sec-title').forEach((t) => {
      gsap.fromTo(t, { clipPath: 'inset(0 0 100% 0)', y: 60 }, {
        clipPath: 'inset(0 0 -20% 0)', y: 0, duration: 1.4, ease: 'expo.out',
        scrollTrigger: { trigger: t, start: 'top 88%' },
      });
    });

    gsap.to('#manifestoText .w', {
      opacity: 1, stagger: 0.1, ease: 'none',
      scrollTrigger: { trigger: '#manifestoText', start: 'top 80%', end: 'bottom 45%', scrub: true },
    });

    gsap.to('.hero-name', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.arch img', { yPercent: -12, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

    const skewTo = gsap.quickTo('.marquee-in', 'skewX', { duration: 0.5, ease: 'power3' });
    ScrollTrigger.create({ onUpdate: (self) => skewTo(gsap.utils.clamp(-12, 12, self.getVelocity() / -250)) });

    gsap.to('#tlFill', { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.tl', start: 'top 60%', end: 'bottom 60%', scrub: true } });

    // experience: list items slide in one by one
    gsap.from('.exp-list li', { x: 40, opacity: 0, duration: 1, stagger: 0.12, ease: 'expo.out', scrollTrigger: { trigger: '.exp-list', start: 'top 85%' } });

    const mm = gsap.matchMedia();
    mm.add('(min-width: 901px)', () => {
      const track = $('#workTrack');
      const cards = $$('.proj', track);
      const dist = () => track.scrollWidth - innerWidth;
      const tween = gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: {
          trigger: '.work-pin', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1,
          invalidateOnRefresh: true, anticipatePin: 1,
          onUpdate: (self) => {
            const i = Math.min(cards.length, Math.round(self.progress * (cards.length - 1)) + 1);
            $('#workIdx').textContent = String(i).padStart(2, '0');
          },
        },
      });
      cards.forEach((c) => gsap.from(c, {
        rotate: 4, y: 60, opacity: 0.3, ease: 'power2.out',
        scrollTrigger: { trigger: c, containerAnimation: tween, start: 'left 95%', end: 'left 55%', scrub: true },
      }));
    });
    mm.add('(max-width: 900px)', () => {
      $$('.proj').forEach((c) => gsap.from(c, { y: 80, rotate: 2, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: c, start: 'top 90%' } }));
    });

    gsap.from('.dsa-num', { scale: 0.7, opacity: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: '.dsa-num', start: 'top 85%' } });
    gsap.from('.contact', { borderRadius: '80px 80px 0 0', y: 60, ease: 'none', scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'top 50%', scrub: true } });

    addEventListener('load', refresh);
  }

  runLoader();
})();
