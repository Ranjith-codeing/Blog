/* =============================================
   RANJITH · BC Blog — site-wide interactivity
   Loaded on every page. All features no-op
   gracefully when their markup is absent.
   ============================================= */
(function () {
  'use strict';

  /* ---- Theme toggle (initial theme set inline in <head>) ---- */
  function initTheme() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var root = document.documentElement;
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      btn.setAttribute('aria-label', next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    });
  }

  /* ---- Reading progress bar ---- */
  function initProgress() {
    var bar = document.querySelector('.progress-bar');
    if (!bar) return;
    function update() {
      var h = document.documentElement;
      var scrollable = h.scrollHeight - h.clientHeight;
      var pct = scrollable > 0 ? (h.scrollTop / scrollable) * 100 : 0;
      bar.style.width = pct + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ---- Back to top ---- */
  function initToTop() {
    var btn = document.querySelector('.to-top');
    if (!btn) return;
    function toggle() { btn.classList.toggle('show', window.scrollY > 600); }
    window.addEventListener('scroll', toggle, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    toggle();
  }

  /* ---- Scroll reveal ---- */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---- Scroll-spy for sidebar mini-TOC ---- */
  function initScrollSpy() {
    var links = document.querySelectorAll('.toc-mini a[href^="#"]');
    if (!links.length || !('IntersectionObserver' in window)) return;
    var map = {};
    var targets = [];
    links.forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      var sec = document.getElementById(id);
      if (sec) { map[id] = a; targets.push(sec); }
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (l) { l.classList.remove('active'); });
          var active = map[en.target.id];
          if (active) active.classList.add('active');
        }
      });
    }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* ---- Code blocks: toolbar, copy button, light highlight ---- */
  var KEYWORDS = {
    al: ['codeunit','table','tableextension','page','pageextension','report','enum','interface','query',
         'procedure','local','trigger','begin','end','var','if','then','else','case','of','repeat','until',
         'while','do','for','to','downto','exit','foreach','in','with','record','temporary','return',
         'true','false','and','or','not','div','mod','xor'],
    json: ['true','false','null'],
    javascript: ['const','let','var','function','return','if','else','for','while','await','async','new',
                 'document','window','true','false','null','undefined','this','class','import','export','=>'],
    bash: ['curl','az','export','echo','sudo','GET','POST','PUT','PATCH','DELETE']
  };

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function detectLang(pre, code) {
    if (pre.dataset.lang) return pre.dataset.lang;
    var t = code.textContent;
    if (/\b(codeunit|pageextension|tableextension|procedure|trigger|begin\b)/.test(t)) return 'AL';
    if (/^\s*[{[]/.test(t) && /"\s*:/.test(t)) return 'JSON';
    if (/\b(function|const|let|=>|document\.|window\.)/.test(t)) return 'JavaScript';
    if (/^\s*(curl|az |GET |POST |#!|sudo )/.test(t)) return 'Bash';
    return 'Code';
  }

  function highlight(src, langLabel) {
    var lang = (langLabel || '').toLowerCase();
    var kw = KEYWORDS[lang] || KEYWORDS.al;
    var kwRe = new RegExp('\\b(' + kw.filter(function (k) { return /^\w+$/.test(k); }).join('|') + ')\\b', 'g');
    // tokenizer: comments | strings | numbers ; keywords applied to plain gaps
    var RE = /(\/\/[^\n]*|\(\*[\s\S]*?\*\)|\/\*[\s\S]*?\*\/)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)|(\b\d[\d_.]*\b)/g;
    var out = '';
    var last = 0;
    var m;
    while ((m = RE.exec(src)) !== null) {
      var plain = src.slice(last, m.index);
      out += escapeHtml(plain).replace(kwRe, '<span class="tok-keyword">$1</span>');
      if (m[1]) out += '<span class="tok-comment">' + escapeHtml(m[1]) + '</span>';
      else if (m[2]) out += '<span class="tok-string">' + escapeHtml(m[2]) + '</span>';
      else if (m[3]) out += '<span class="tok-number">' + escapeHtml(m[3]) + '</span>';
      last = RE.lastIndex;
    }
    out += escapeHtml(src.slice(last)).replace(kwRe, '<span class="tok-keyword">$1</span>');
    return out;
  }

  function initCode() {
    var blocks = document.querySelectorAll('pre.code-block');
    blocks.forEach(function (pre) {
      if (pre.closest('.code-wrap')) return;
      var code = pre.querySelector('code') || pre;
      var raw = code.textContent;
      var lang = detectLang(pre, code);

      // highlight (safe: rebuilds from textContent, copy still uses textContent)
      try { code.innerHTML = highlight(raw, lang); } catch (e) {}

      var wrap = document.createElement('div');
      wrap.className = 'code-wrap';
      var bar = document.createElement('div');
      bar.className = 'code-toolbar';
      bar.innerHTML =
        '<span class="code-dots"><span class="d1"></span><span class="d2"></span><span class="d3"></span></span>' +
        '<span class="code-lang">' + lang + '</span>' +
        '<button class="copy-btn" type="button" aria-label="Copy code">Copy</button>';

      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(bar);
      wrap.appendChild(pre);

      var btn = bar.querySelector('.copy-btn');
      btn.addEventListener('click', function () {
        var done = function () {
          btn.textContent = 'Copied';
          btn.classList.add('copied');
          setTimeout(function () { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(raw).then(done).catch(fallback);
        } else { fallback(); }
        function fallback() {
          var ta = document.createElement('textarea');
          ta.value = raw; ta.style.position = 'fixed'; ta.style.opacity = '0';
          document.body.appendChild(ta); ta.select();
          try { document.execCommand('copy'); done(); } catch (e) {}
          document.body.removeChild(ta);
        }
      });
    });
  }

  /* ---- Year stamp ---- */
  function initYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  function init() {
    initTheme();
    initProgress();
    initToTop();
    initReveal();
    initScrollSpy();
    initCode();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
