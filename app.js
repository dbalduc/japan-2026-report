/* ============================================================================
   JAPAN 2026 — RENDERER
   You shouldn't need to edit this file. All content lives in data.js.
   ========================================================================== */
(function () {
  'use strict';

  var IMG_DIR = 'images/', AUD_DIR = 'audio/', VID_DIR = 'video/';
  var pool = [];           // lightbox pool, in document order
  var qs = location.search;

  /* ---------- text: [[slug|display]] → reference link ---------- */
  function md(s) {
    return String(s).replace(/\[\[([a-z0-9-]+)(?:\|([^\]]+))?\]\]/gi, function (_, key, disp) {
      var L = LINKS[key];
      if (!L) return disp || key;
      return '<a class="ref" href="' + L.url + '" target="_blank" rel="noopener"' +
             ' data-fact="' + esc(L.fact) + '">' + (disp || L.name) + '</a>';
    });
  }
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  }
  function clip(s, n) {
    s = String(s).trim();
    if (s.length <= n) return s;
    var cut = s.slice(0, n);
    var sp = cut.lastIndexOf(' ');
    return (sp > n * 0.6 ? cut.slice(0, sp) : cut).replace(/[.,;:—–-]+$/, '') + '…';
  }
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  /* ---------- photo slot: placeholder until the real file exists ---------- */
  function photo(o) {
    var fig = el('figure', o.wide ? 'fig--wide' : '');
    var box = el('div', 'shot ph');
    box.style.setProperty('--ar', o.ar || '3/2');
    var plainCap = String(o.cap || '').replace(/<[^>]+>/g, '').replace(/\[\[[a-z0-9-]+\|?([^\]]*)\]\]/gi, '$1');

    box.innerHTML =
      '<div class="ph__ico">▨</div>' +
      '<div class="ph__cap">' + esc(clip(plainCap, 120)) + '</div>' +
      '<div class="ph__file">' + IMG_DIR + o.src + '</div>';
    fig.appendChild(box);

    if (o.cap) fig.appendChild(el('figcaption', '', md(o.cap)));

    var entry = { src: IMG_DIR + o.src, cap: plainCap, ready: false };
    pool.push(entry);

    var probe = new Image();
    probe.onload = function () {
      box.className = 'shot';
      box.removeAttribute('style');
      box.innerHTML = '';
      var i = el('img');
      i.src = entry.src;
      i.alt = plainCap;
      i.loading = 'lazy';
      box.appendChild(i);
      entry.ready = true;
      if (o.egg) attachEgg(box);
      box.addEventListener('click', function (e) {
        if (e.target.closest('.egg-hint')) return;
        openLB(entry);
      });
    };
    probe.src = entry.src;

    return fig;
  }

  /* ---------- blocks ---------- */
  function block(b) {
    switch (b.t) {

      case 'lead':
      case 'text': {
        var p = el('p', b.t === 'lead' ? 'lead' : '', md(b.html));
        return p;
      }

      case 'photo':
        return photo(b);

      case 'gal': {
        var g = el('div', 'gal gal--' + (b.cols || 2));
        b.items.forEach(function (it) { g.appendChild(photo(it)); });
        return g;
      }

      case 'quote': {
        var q = el('blockquote', '', md(b.html) + (b.cite ? '<cite>' + esc(b.cite) + '</cite>' : ''));
        return q;
      }

      case 'divider':
        return el('div', 'divider', '❊ ❊ ❊');

      case 'floats': {
        var ul = el('ul', 'floats');
        b.items.forEach(function (t) { ul.appendChild(el('li', '', md(t))); });
        return ul;
      }

      case 'dive': {
        var d = el('div', 'dive');
        var head = '<div class="dive__hd"><span>' + DIVE.title + '</span><small>' + DIVE.sub + '</small></div>';
        var rows = DIVE.rows.map(function (r) {
          return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>';
        }).join('');
        d.innerHTML = head +
          '<table><thead><tr><th></th><th>Site</th><th>Time</th><th>Max</th><th>Viz</th><th>Highlights</th></tr></thead>' +
          '<tbody>' + rows + '</tbody></table>';
        return d;
      }

      case 'audio': {
        var a = el('div', 'aud');
        a.innerHTML =
          '<button class="aud__btn" disabled>▶</button>' +
          '<div class="aud__meta"><div class="aud__label">' + esc(b.label) + '</div>' +
          '<div class="aud__sub">' + (b.sub ? esc(b.sub) + ' · ' : '') +
          '<code>' + AUD_DIR + b.src + '</code></div></div>';
        var btn = a.querySelector('.aud__btn');
        var sub = a.querySelector('.aud__sub');
        var au = new Audio(AUD_DIR + b.src);
        au.preload = 'metadata';
        au.addEventListener('loadedmetadata', function () {
          btn.disabled = false;
          sub.innerHTML = b.sub ? esc(b.sub) : '';
          btn.onclick = function () {
            if (au.paused) { stopAll(); au.play(); btn.textContent = '❚❚'; }
            else { au.pause(); btn.textContent = '▶'; }
          };
          au.onended = function () { btn.textContent = '▶'; };
          players.push({ au: au, btn: btn });
        });
        au.addEventListener('error', function () {
          sub.innerHTML = 'Drop the clip at <code>' + AUD_DIR + b.src + '</code> to enable';
        });
        return a;
      }

      case 'video': {
        var v = el('div', 'vid');
        var ph = el('div', 'shot ph');
        ph.innerHTML =
          '<div class="ph__ico">▶</div>' +
          '<div class="ph__cap">' + esc(b.label) + (b.note ? '<br><span style="font-size:12.5px;opacity:.8">' + esc(b.note) + '</span>' : '') + '</div>' +
          '<div class="ph__file">' + VID_DIR + b.src + '</div>';
        v.appendChild(ph);
        // file:// can't do fetch HEAD, so just render the player and let the
        // browser decide. Over http(s) we probe first so a missing file shows
        // the labelled placeholder instead of a broken player.
        var probe = location.protocol === 'file:'
          ? Promise.resolve({ ok: true })
          : fetch(VID_DIR + b.src, { method: 'HEAD' });
        probe.then(function (r) {
          if (!r.ok) return;
          v.innerHTML = '';
          var vd = document.createElement('video');
          vd.src = VID_DIR + b.src;
          vd.controls = true; vd.playsInline = true; vd.preload = 'metadata';
          v.appendChild(vd);
          v.appendChild(el('figcaption', '', esc(b.label)));
        }).catch(function () {});
        return v;
      }
    }
    return el('div');
  }

  var players = [];
  function stopAll() {
    players.forEach(function (p) { p.au.pause(); p.btn.textContent = '▶'; });
  }

  /* ---------- render days ---------- */
  var host = document.getElementById('days');
  var nav = document.getElementById('nav');

  DAYS.forEach(function (d) {
    var sec = el('section', 'day');
    sec.id = 'day' + d.n;

    var head = el('div', 'day__head');
    head.innerHTML =
      '<div class="day__num"><b>Day ' + d.n + '</b><span>' + esc(d.date) + '</span></div>' +
      '<h2 class="day__title">' + esc(d.title) + '</h2>' +
      '<span class="day__route">' + esc(d.route) + '</span>';
    sec.appendChild(head);

    d.blocks.forEach(function (b) { sec.appendChild(block(b)); });
    host.appendChild(sec);

    var a = el('a', '', 'Day ' + d.n);
    a.href = '#day' + d.n;
    a.title = d.title;
    nav.appendChild(a);
  });
  var end = el('a', 'end', 'Creature Log');
  end.href = '#coda';
  nav.appendChild(end);

  /* ---------- creature log ---------- */
  var cw = document.getElementById('creatures');
  document.querySelector('.coda').id = 'coda';
  CREATURES.forEach(function (c) {
    var L = c.k && LINKS[c.k];
    var n = document.createElement(L ? 'a' : 'span');
    n.className = 'creature' + (c.star ? ' star' : '');
    if (L) { n.href = L.url; n.target = '_blank'; n.rel = 'noopener'; n.title = L.fact; }
    n.innerHTML = '<span>' + c.e + '</span><span>' + c.n + '</span>';
    cw.appendChild(n);
  });

  /* ---------- hero image fallback ---------- */
  var hi = document.getElementById('heroImg');
  hi.onerror = function () { hi.style.display = 'none'; };

  /* ---------- scroll spy ---------- */
  var links = [].slice.call(nav.querySelectorAll('a'));
  var secs = [].slice.call(document.querySelectorAll('.day')).concat([document.querySelector('.coda')]);
  var ticking = false;
  function spy() {
    var y = window.scrollY + 130, best = 0;
    secs.forEach(function (s, i) { if (s.offsetTop <= y) best = i; });
    links.forEach(function (l, i) { l.classList.toggle('on', i === best); });
    var on = links[best];
    if (on) {
      var r = on.getBoundingClientRect(), pr = nav.getBoundingClientRect();
      if (r.left < pr.left + 8 || r.right > pr.right - 8) {
        nav.scrollTo({ left: on.offsetLeft - pr.width / 2 + r.width / 2, behavior: 'smooth' });
      }
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(spy); }
  }, { passive: true });
  spy();

  /* ---------- lightbox ---------- */
  var lb = document.getElementById('lb'), lbImg = document.getElementById('lbImg'),
      lbCap = document.getElementById('lbCap'), lbCount = document.getElementById('lbCount');
  var idx = 0;
  function ready() { return pool.filter(function (p) { return p.ready; }); }
  function openLB(entry) {
    var r = ready(); idx = r.indexOf(entry); if (idx < 0) return;
    show(r); lb.classList.add('on'); document.body.style.overflow = 'hidden';
  }
  function show(r) {
    r = r || ready();
    var e = r[idx]; if (!e) return;
    lbImg.src = e.src; lbCap.textContent = e.cap;
    lbCount.textContent = (idx + 1) + ' / ' + r.length;
  }
  function step(d) { var r = ready(); idx = (idx + d + r.length) % r.length; show(r); }
  function closeLB() { lb.classList.remove('on'); document.body.style.overflow = ''; lbImg.src = ''; }
  document.getElementById('lbX').onclick = closeLB;
  document.getElementById('lbPrev').onclick = function (e) { e.stopPropagation(); step(-1); };
  document.getElementById('lbNext').onclick = function (e) { e.stopPropagation(); step(1); };
  lb.addEventListener('click', function (e) { if (e.target === lb || e.target === lbImg) closeLB(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('on')) return;
    if (e.key === 'Escape') closeLB();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
  // swipe
  var tx = 0;
  lb.addEventListener('touchstart', function (e) { tx = e.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 55) step(dx < 0 ? 1 : -1);
  }, { passive: true });

  /* ==========================================================================
     SHIBUYA EASTER EGG
     Fires on the Day 2 night-crossing photo. Only appears if BOTH the photo
     and audio/shibuya-meme.mp3 exist — otherwise the photo behaves normally
     and nobody knows the egg is there.
     Preview the visual without the audio file:  index.html?egg
     ========================================================================== */
  var eggAudio = document.getElementById('eggAudio');
  var eggEl = document.getElementById('egg');
  var eggOK = false;

  if (location.protocol === 'file:') {
    var a0 = new Audio('audio/shibuya-meme.mp3');
    a0.addEventListener('loadedmetadata', function () { eggOK = true; });
  } else {
    fetch('audio/shibuya-meme.mp3', { method: 'HEAD' })
      .then(function (r) { eggOK = r.ok; })
      .catch(function () { eggOK = false; });
  }

  function attachEgg(box) {
    var chip = el('div', 'egg-hint', '<span>🔊</span><span>Sound on</span>');
    chip.addEventListener('click', function (e) { e.stopPropagation(); fireEgg(); });
    setTimeout(function () { if (eggOK) box.appendChild(chip); }, 900);
  }

  function fireEgg(preview) {
    eggEl.classList.add('on');
    document.body.style.overflow = 'hidden';
    var w = document.getElementById('eggWarn');
    if (preview) {
      w.innerHTML = 'Preview mode. Drop your clip at <code>audio/shibuya-meme.mp3</code> and this plays with sound.';
    } else {
      w.textContent = '';
      stopAll();
      eggAudio.currentTime = 0;
      var p = eggAudio.play();
      if (p && p.catch) p.catch(function () {});
      eggEl.classList.add('shake');
      setTimeout(function () { eggEl.classList.remove('shake'); }, 500);
      eggAudio.onended = closeEgg;
    }
  }
  function closeEgg() {
    eggEl.classList.remove('on');
    document.body.style.overflow = '';
    eggAudio.pause();
  }
  document.getElementById('eggX').onclick = closeEgg;
  eggEl.addEventListener('click', function (e) { if (e.target === eggEl) closeEgg(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && eggEl.classList.contains('on')) closeEgg();
  });
  if (qs.indexOf('egg') > -1) setTimeout(function () { fireEgg(true); }, 400);

  /* ---------- missing-asset report for the maintainer:  index.html?todo ---------- */
  if (qs.indexOf('todo') > -1) {
    setTimeout(function () {
      var missing = pool.filter(function (p) { return !p.ready; }).map(function (p) { return p.src; });
      console.log('%cMissing images (' + missing.length + ' of ' + pool.length + '):', 'font-weight:bold');
      console.log(missing.join('\n'));
    }, 2500);
  }
})();
