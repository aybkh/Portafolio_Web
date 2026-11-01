/* Ayoub Jerari — lógica del portafolio (vanilla JS, sin dependencias) */
(function () {
  'use strict';

  var SPRITE = '';
  var STORE = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function icon(id) { return '<svg class="i" aria-hidden="true"><use href="' + SPRITE + '#i-' + id + '"/></svg>'; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function get(obj, path) { return path.split('.').reduce(function (o, k) { return o && o[k]; }, obj); }
  function logo(id) {
    var f = LOGOS[id];
    return f ? '<img class="lg" src="assets/logos/' + f + '" alt="" width="32" height="32" loading="lazy" decoding="async">' : icon(id);
  }
  function lgbox(id) { return '<span class="lgbox">' + logo(id) + '</span>'; }

  /* ---------- Idioma ---------- */
  var codes = LANGS.map(function (l) { return l.code; });
  var lang = (function () {
    var q = new URLSearchParams(location.search).get('lang');
    if (q && codes.indexOf(q) > -1) return q;
    var s = STORE.get('lang');
    if (s && codes.indexOf(s) > -1) return s;
    var n = (navigator.language || 'es').slice(0, 2).toLowerCase();
    return codes.indexOf(n) > -1 ? n : 'es';
  })();
  function T(key) { var v = get(UI[lang], key); return v == null ? get(UI.es, key) : v; }
  function B(key) { var v = get(I18N_BASE[lang], key); return v == null ? get(I18N_BASE.es, key) : v; }

  function text(p) {
    var s = (SHORT[p.key] && (SHORT[p.key][lang] || SHORT[p.key].es)) || ['', ''];
    var out = { name: p.title || 'QuiCondueix', sub: s[0], short: s[1], long: [], features: [] };
    if (p.key === 'qc') {
      var q = QC[lang] || QC.es;
      out.long = [q.long];
      out.features = q.features;
    } else {
      var d = B('proj.' + p.key + '_details') || {};
      if (d.description) out.long.push(d.description);
      var desc = B('proj.' + p.key + '_desc');
      if (desc && desc !== d.description) out.long.unshift(desc);
      out.features = d.features || [];
    }
    return out;
  }
  function featureHTML(f) {
    var i = f.indexOf(':');
    return i > 0 && i < 45 ? '<b>' + esc(f.slice(0, i)) + ':</b>' + esc(f.slice(i + 1)) : esc(f);
  }
  function techs(list) {
    return '<ul class="techs">' + list.map(function (n) { return '<li class="tech">' + lgbox(TECH[n] || 'code') + esc(n) + '</li>'; }).join('') + '</ul>';
  }

  /* ---------- Dispositivos ---------- */
  var SCENES = {
    web: [{ t: 'mac', x: 20, y: 70, s: 1.15 }, { t: 'iphone', x: 770, y: 180, s: .5, cls: 'dv--side' }],
    tpv: [{ t: 'mac', x: 390, y: 40, s: .8 }, { t: 'pos', x: 10, y: 96, s: .94, cls: 'dv--left' }, { t: 'iphone', x: 820, y: 262, s: .42, cls: 'dv--side' }],
    laptop: [{ t: 'mac', x: 20, y: 50, s: 1.3 }]
  };
  function shot(src, alt, w, h) {
    return '<img src="' + src + '" alt="' + esc(alt) + '" width="' + w + '" height="' + h + '" loading="lazy" decoding="async">';
  }
  function device(d, p, name) {
    var inner;
    if (d.t === 'mac') {
      inner = '<div class="frame"><span class="notch"></span><div class="screen">' +
        '<img src="assets/screens/' + p.id + '-desk-640.webp" srcset="assets/screens/' + p.id + '-desk-640.webp 640w, assets/screens/' + p.id + '-desk-1200.webp 1200w" sizes="(min-width: 960px) 600px, 92vw" alt="' + esc(name) + '" width="1200" height="750" loading="lazy" decoding="async">' +
        '</div></div><div class="base"></div>';
    } else if (d.t === 'iphone') {
      inner = '<div class="frame"><span class="island"></span><span class="btns"></span><span class="power"></span><div class="screen">' + shot('assets/screens/' + p.id + '-mob.webp', name, 480, 1021) + '</div></div>';
    } else {
      inner = '<div class="frame"><div class="screen">' + shot('assets/screens/' + p.id + '-pos.webp', name + ' · TPV', 1200, 750) + '</div></div><div class="neck"></div><div class="foot"></div>';
    }
    return '<div class="dv ' + (d.cls || '') + '" style="--x:' + d.x + 'px;--y:' + d.y + 'px"><div class="dv__in ' + d.t + '" style="--s:' + d.s + '">' + inner + '</div></div>';
  }
  function scene(p, name) {
    return '<div class="scene" aria-hidden="true"><div class="stage">' + SCENES[p.scene].map(function (d) { return device(d, p, name); }).join('') + '</div></div>';
  }
  var ro = 'ResizeObserver' in window ? new ResizeObserver(function (entries) {
    entries.forEach(function (en) { en.target.firstChild.style.setProperty('--k', en.contentRect.width / 1000); });
  }) : null;
  function fitScenes(root) {
    $$('.scene', root).forEach(function (s) {
      if (ro) ro.observe(s); else s.firstChild.style.setProperty('--k', s.clientWidth / 1000);
    });
  }

  /* ---------- Render ---------- */
  function renderStatic() {
    document.documentElement.lang = lang;
    $$('[data-t]').forEach(function (el) { var v = T(el.getAttribute('data-t')); if (v) el.textContent = v; });
    $$('[data-t-aria]').forEach(function (el) { el.setAttribute('aria-label', T(el.getAttribute('data-t-aria'))); });
    $('#themeBtn').setAttribute('aria-label', T('theme'));
    $('#menuBtn').setAttribute('aria-label', T('menu'));
    $('#langBtn').setAttribute('aria-label', T('lang'));
    $('#langCode').textContent = lang.toUpperCase();
    $('#langMenu').innerHTML = LANGS.map(function (l) {
      return '<li><button role="option" data-lang="' + l.code + '" aria-selected="' + (l.code === lang) + '">' + l.label + '<small>' + l.short + '</small></button></li>';
    }).join('');
    $('#flags').innerHTML = SPOKEN.map(function (l) {
      return '<li class="' + (l[2] === 'native' ? 'n' : '') + '" title="' + esc(l[1] + ' · ' + T('lv.' + l[2])) + '">' + l[0].toUpperCase() + '</li>';
    }).join('');
    $('#stackTile').innerHTML = STACK_TILE.map(function (id) { return '<li>' + logo(id) + '</li>'; }).join('');
  }

  function renderShowcase() {
    $('#showcase').innerHTML = PROJECTS.map(function (p, i) {
      var t = text(p);
      var primary = p.url
        ? '<a class="btn btn--primary" href="' + p.url + '" target="_blank" rel="noopener">' + esc(T('visit')) + icon('arrowUpRight') + '</a>'
        : '<a class="btn btn--primary" href="' + p.repo + '" target="_blank" rel="noopener">' + logo('github') + esc(T('code')) + '</a>';
      var title = p.key === 'qc' ? 'Qui<span style="color:var(--c)">Condueix</span>?' : esc(t.name);
      return '<article class="proj" id="p-' + p.id + '" style="--c:' + p.color + '">' +
        '<div class="proj__scene">' + scene(p, t.name) + '</div>' +
        '<div class="proj__body">' +
          '<div class="proj__top"><span class="proj__n">' + String(i + 1).padStart(2, '0') + '</span>' +
            (p.isNew ? '<span class="tag tag--new">' + esc(T('new')) + '</span>' : '') +
            (p.edu ? '<span class="tag tag--edu">' + esc(T('academic')) + '</span>' : '') + '</div>' +
          '<h3>' + title + '</h3>' +
          '<p class="proj__sub">' + esc(t.sub) + '</p>' +
          '<p class="proj__desc">' + esc(t.short) + '</p>' +
          techs(p.stack) +
          '<div class="proj__actions">' + primary + '<button class="btn" data-open="' + p.id + '">' + esc(T('details')) + '</button></div>' +
        '</div></article>';
    }).join('');
    fitScenes($('#showcase'));
  }

  /* ---------- Modal ---------- */
  var modal = $('#modal'), lastFocus = null;
  function openProject(id) {
    var p = PROJECTS.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    var t = text(p);
    var actions = '';
    if (p.url) actions += '<a class="btn btn--primary" href="' + p.url + '" target="_blank" rel="noopener">' + esc(T('visit')) + icon('arrowUpRight') + '</a>';
    if (p.repo) actions += '<a class="btn' + (p.url ? '' : ' btn--primary') + '" href="' + p.repo + '" target="_blank" rel="noopener">' + logo('github') + esc(T('code')) + '</a>';
    var shots = p.scene === 'laptop'
      ? '<div class="shots shots--solo">' + shot('assets/screens/' + p.id + '-desk-1200.webp', t.name, 1200, 750) + '</div>'
      : '<div class="shots">' + shot('assets/screens/' + p.id + (p.scene === 'tpv' ? '-pos' : '-desk-1200') + '.webp', t.name, 1200, 750) +
        '<img class="shot-m" src="assets/screens/' + p.id + '-mob.webp" alt="' + esc(t.name) + '" width="480" height="1021" loading="lazy"></div>';
    $('#modalBody').innerHTML =
      '<button class="pill pill--icon modal__close" data-close aria-label="' + esc(T('close')) + '">' + icon('x') + '</button>' +
      '<div class="proj__scene modal__scene" style="--c:' + p.color + '">' + scene(p, t.name) + '</div>' +
      '<div class="modal__body">' +
        '<div><h3 id="modalTitle">' + esc(t.name) + '</h3><p class="proj__sub" style="--c:' + p.color + ';margin-top:8px">' + esc(t.sub) + '</p></div>' +
        '<div class="modal__desc"><p>' + esc(t.short) + '</p>' + t.long.map(function (l) { return '<p>' + esc(l) + '</p>'; }).join('') +
          (p.edu ? '<p>' + esc(T('made_in')) + '</p>' : '') + '</div>' +
        (t.features.length ? '<h4>' + esc(T('features')) + '</h4><ul class="modal__list">' + t.features.map(function (f) { return '<li>' + icon('check') + '<span>' + featureHTML(f) + '</span></li>'; }).join('') + '</ul>' : '') +
        '<h4>' + esc(T('stack_t')) + '</h4>' + techs(p.stack) +
        '<h4>' + esc(T('screens')) + '</h4>' + shots +
        '<div class="modal__actions">' + actions + '</div>' +
      '</div>';
    lastFocus = document.activeElement;
    if (typeof modal.showModal === 'function') modal.showModal(); else modal.setAttribute('open', '');
    document.documentElement.style.overflow = 'hidden';
    $('#modalBody').scrollTop = 0;
    fitScenes($('#modalBody'));
  }
  modal.addEventListener('close', function () {
    document.documentElement.style.overflow = '';
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  });
  modal.addEventListener('click', function (e) {
    if (e.target === modal || e.target.closest('[data-close]')) modal.close();
  });

  /* ---------- Experiencia ---------- */
  function renderTimeline() {
    var groups = [];
    EXPERIENCE.forEach(function (e) {
      var g = groups[groups.length - 1];
      if (g && g.company === e.company) g.roles.push(e);
      else groups.push({ e: e, company: e.company, roles: [e] });
    });
    $('#timeline').innerHTML = groups.map(function (g) {
      var e = g.e;
      var name = e.url ? '<a href="' + e.url + '" target="_blank" rel="noopener">' + esc(e.company) + '</a>' : esc(e.company);
      var lg = e.logo
        ? '<span class="job__logo' + (e.wide ? ' job__logo--wide' : '') + '"><img src="assets/logos/' + LOGOS[e.logo] + '" alt="' + esc(e.company) + '"></span>'
        : '<span class="job__logo">' + icon('mapPin') + '</span>';
      return '<li class="job rv' + (g.roles.length > 1 ? ' job--multi' : '') + '">' +
        '<div class="job__head">' + lg + '<div><h3 class="job__company">' + name + '</h3><p class="job__place">' + icon('mapPin') + esc(e.place) + '</p></div></div>' +
        g.roles.map(function (r) {
          var tasks = [];
          for (var i = 1; i <= r.tasks; i++) tasks.push(B('exp.' + r.n + '_t' + i));
          var lim = g.roles.length > 1 ? 2 : 99;
          return '<div class="role' + (r.current ? ' is-current' : '') + '">' +
            '<p class="role__title">' + esc(B('exp.' + r.n + '_role')) + '</p>' +
            '<p class="role__date">' + esc(B('exp.' + r.n + '_place')) + (r.current ? '<span class="role__now">● ' + esc(T('current')) + '</span>' : '') + '</p>' +
            '<ul class="tasks">' + tasks.map(function (t, i) { return '<li' + (i >= lim ? ' class="hidden"' : '') + '>' + featureHTML(t || '') + '</li>'; }).join('') + '</ul>' +
            (tasks.length > lim ? '<button class="more" aria-expanded="false" data-more><span>' + esc(T('more')) + '</span>' + icon('chevronDown') + '</button>' : '') +
            '<div class="tags">' + r.tags.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>' +
          '</div>';
        }).join('') + '</li>';
    }).join('');
  }

  /* ---------- Habilidades ---------- */
  var skillCat = 'net';
  var CAT_ICON = { net: 'wireshark', sys: 'linux', cloud: 'azure', dev: 'react', db: 'postgresql', hw: 'zebra', ia: 'claude', prod: 'm365' };
  function renderSkillTabs() {
    $('#skillTabs').innerHTML = Object.keys(SKILLS).map(function (c) {
      return '<button class="tab" role="tab" data-skill="' + c + '" aria-selected="' + (c === skillCat) + '">' + lgbox(CAT_ICON[c]) + esc(B('cat.' + c)) + '</button>';
    }).join('');
  }
  function renderSkills() {
    $('#skillDesc').textContent = B('catdesc.' + skillCat) || '';
    $('#skillGrid').innerHTML = SKILLS[skillCat].map(function (s, i) {
      return '<li class="skill" style="animation-delay:' + (i * 30) + 'ms">' + lgbox(s[1]) + esc(s[0]) + '</li>';
    }).join('');
  }

  function renderAll() {
    renderStatic();
    renderShowcase();
    renderTimeline();
    renderSkillTabs();
    renderSkills();
    observe();
  }


  /* ---------- Foto dibujada en código ----------
     La foto se pinta solo con caracteres de código (coloreados con los píxeles reales),
     fila a fila como si se escribiera. Después queda fija y una línea de análisis
     la recorre de arriba abajo cada 2 s (CSS). La foto real no se muestra. */
  function drawPhoto() {
    var fig = $('#photo'); if (!fig) return;
    var img = $('img', fig), cv = $('.photo__code', fig), btn = $('.photo__replay', fig);
    // rampa de 70 caracteres, de menos a más «tinta»
    var CH = " .'`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
    var running = false;
    function run(instant) {
      if (running) return; running = true;
      fig.classList.remove('drawn');
      var dpr = Math.min(window.devicePixelRatio || 1, 3);
      var W = fig.clientWidth, H = fig.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      var ctx = cv.getContext('2d'); ctx.scale(dpr, dpr);
      var cell = W < 220 ? 1.9 : 2.1, lh = cell * 1.6, cols = Math.ceil(W / cell), rows = Math.ceil(H / lh);
      var ch = H / rows;
      // muestreo con el mismo encuadre que object-fit: cover; object-position: 50% 20%
      var s = document.createElement('canvas'); s.width = cols; s.height = rows;
      var sx = s.getContext('2d', { willReadFrequently: true });
      var ir = img.naturalWidth / img.naturalHeight, br = W / H, cw, chh, ox, oy;
      if (ir > br) { chh = img.naturalHeight; cw = chh * br; ox = (img.naturalWidth - cw) * .5; oy = 0; }
      else { cw = img.naturalWidth; chh = cw / br; ox = 0; oy = (img.naturalHeight - chh) * .2; }
      sx.drawImage(img, ox, oy, cw, chh, 0, 0, cols, rows);
      var px = sx.getImageData(0, 0, cols, rows).data;
      ctx.fillStyle = '#0a0e17'; ctx.fillRect(0, 0, W, H);
      ctx.font = '700 ' + (lh * 1.02) + 'px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
      // estirar el contraste (percentiles 2 % y 98 %) para que la cara se lea mejor
      var lums = new Float32Array(cols * rows);
      for (var q = 0; q < cols * rows; q++) lums[q] = (0.299 * px[q * 4] + 0.587 * px[q * 4 + 1] + 0.114 * px[q * 4 + 2]) / 255;
      var sorted = Array.prototype.slice.call(lums).sort(function (m, n) { return m - n; });
      var lo = sorted[Math.floor(sorted.length * .02)], hi = sorted[Math.floor(sorted.length * .98)], span = Math.max(.05, hi - lo);
      ctx.textBaseline = 'top';
      var row = 0, t0 = performance.now(), DUR = instant ? 1 : 2200;
      function step(now) {
        var target = Math.min(rows, Math.ceil(rows * ((now || performance.now()) - t0) / DUR));
        for (; row < target; row++) {
          ctx.fillStyle = '#0a0e17'; ctx.fillRect(0, row * ch, W, ch + 1);
          for (var x = 0; x < cols; x++) {
            var i = (row * cols + x) * 4, r = px[i], g = px[i + 1], b = px[i + 2];
            var l = Math.pow(Math.min(1, Math.max(0, (lums[row * cols + x] - lo) / span)), .85);
            var c = CH[Math.min(CH.length - 1, Math.floor((.18 + .82 * l) * CH.length))];
            // fondo de la celda con el color real (tenue) + carácter en el mismo color, más brillante
            ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',.42)';
            ctx.fillRect(x * cell, row * ch, cell + .5, ch + .5);
            if (c === ' ') continue;
            ctx.fillStyle = 'rgb(' + Math.min(255, r * 1.3 + 22 | 0) + ',' + Math.min(255, g * 1.3 + 22 | 0) + ',' + Math.min(255, b * 1.3 + 30 | 0) + ')';
            ctx.fillText(c, x * cell, row * ch);
          }
        }
        // cursor de escaneo
        if (row < rows) {
          ctx.fillStyle = 'rgba(126,166,255,.9)'; ctx.fillRect(0, row * ch, W, 2);
          requestAnimationFrame(step);
        } else {
          fig.classList.add('drawn'); running = false;
        }
      }
      requestAnimationFrame(step);
    }
    function fail() { running = false; fig.classList.add('drawn', 'fallback'); }
    function safe(instant) { try { run(instant); } catch (e) { fail(); } }
    var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    function start() {
      if (!cv.getContext) { fail(); return; }
      if (img.complete && img.naturalWidth) safe(reduced); else img.addEventListener('load', function () { safe(reduced); }, { once: true });
    }
    btn.addEventListener('click', function () { safe(false); });
    // redibujar (sin animación) si cambia el tamaño de la tarjeta
    var lastW = 0, rt;
    if ('ResizeObserver' in window) new ResizeObserver(function () {
      if (!fig.classList.contains('drawn') || fig.classList.contains('fallback') || Math.abs(fig.clientWidth - lastW) < 2) return;
      lastW = fig.clientWidth; clearTimeout(rt); rt = setTimeout(function () { safe(true); }, 150);
    }).observe(fig);
    if ('IntersectionObserver' in window) {
      var o = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { o.disconnect(); lastW = fig.clientWidth; setTimeout(start, 250); } }, { threshold: .4 });
      o.observe(fig);
    } else start();
  }

  /* ---------- Eventos ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target;
    var o = t.closest('[data-open]');
    if (o) { openProject(o.getAttribute('data-open')); return; }
    var s = t.closest('[data-skill]');
    if (s) {
      skillCat = s.getAttribute('data-skill');
      $$('[data-skill]').forEach(function (b) { b.setAttribute('aria-selected', b === s); });
      renderSkills();
      return;
    }
    var m = t.closest('[data-more]');
    if (m) {
      var open = m.getAttribute('aria-expanded') !== 'true';
      m.setAttribute('aria-expanded', open);
      m.firstChild.textContent = T(open ? 'less' : 'more');
      $$('.tasks li', m.parentNode).forEach(function (li, i) { if (i >= 2) li.classList.toggle('hidden', !open); });
      return;
    }
    var l = t.closest('[data-lang]');
    if (l) { lang = l.getAttribute('data-lang'); STORE.set('lang', lang); toggleLang(false); renderAll(); return; }
    if (!t.closest('.lang')) toggleLang(false);
    if (t.closest('.sheet a')) toggleSheet(false);
  });

  function toggleLang(force) {
    var menu = $('#langMenu');
    var show = typeof force === 'boolean' ? force : menu.hidden;
    menu.hidden = !show;
    $('#langBtn').setAttribute('aria-expanded', show);
  }
  $('#langBtn').addEventListener('click', function (e) { e.stopPropagation(); toggleLang(); });

  function toggleSheet(force) {
    var sheet = $('#sheet'), btn = $('#menuBtn');
    var show = typeof force === 'boolean' ? force : sheet.hidden;
    sheet.hidden = !show;
    btn.setAttribute('aria-expanded', show);
    btn.innerHTML = icon(show ? 'x' : 'menu');
    document.documentElement.style.overflow = show ? 'hidden' : '';
  }
  $('#menuBtn').addEventListener('click', function () { toggleSheet(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { toggleLang(false); if (!$('#sheet').hidden) toggleSheet(false); }
  });
  window.matchMedia('(min-width: 960px)').addEventListener('change', function (q) { if (q.matches && !$('#sheet').hidden) toggleSheet(false); });

  $('#themeBtn').addEventListener('click', function () {
    var root = document.documentElement;
    var cur = root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    root.dataset.theme = cur === 'dark' ? 'light' : 'dark';
    STORE.set('theme', root.dataset.theme);
  });

  var toastTimer;
  function toast(msg) {
    var el = $('#toast');
    el.textContent = msg; el.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { el.classList.remove('show'); }, 1800);
  }
  $('#copyMail').addEventListener('click', function () {
    var done = function () { toast(T('copied')); };
    if (navigator.clipboard) navigator.clipboard.writeText(CONTACT.email).then(done, done); else done();
  });

  /* Brillo que sigue al cursor en las tarjetas del bento */
  if (matchMedia('(hover: hover)').matches) {
    $$('.tile').forEach(function (tile) {
      tile.addEventListener('pointermove', function (e) {
        var r = tile.getBoundingClientRect();
        tile.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        tile.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* Scroll: barra de progreso, cabecera y enlace activo */
  var topbar = $('.topbar'), bar = $('#progress'), ticking = false;
  function onScroll() {
    var h = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = 'scaleX(' + (h > 0 ? scrollY / h : 0) + ')';
    topbar.classList.toggle('scrolled', scrollY > 8);
    ticking = false;
  }
  addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  if ('IntersectionObserver' in window) {
    var navObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) $$('.nav a').forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach(function (s) { navObs.observe(s); });
  }

  /* Aparición al hacer scroll */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      io.unobserve(en.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: .05 }) : null;
  function observe() {
    $$('.rv:not(.in), .proj:not(.in)').forEach(function (el) { if (io) io.observe(el); else el.classList.add('in'); });
  }

  renderAll();
  onScroll();
  drawPhoto();
})();
