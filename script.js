/* =============================================
   RANJITH · BC Blog — index page
   Article data + card rendering + search/filter
   ============================================= */

const blogData = [
  {
    title: 'WhatsApp Notifications from Business Central',
    url: 'whatsapp-integration.html',
    category: 'Integration',
    date: 'May 2026',
    iso: '2026-05-18',
    readTime: '13 min read',
    description: 'Send invoice alerts and notifications over the WhatsApp Business Cloud API straight from AL — setup table, message and template codeunits, and an auto-send subscriber on posting.',
    tags: ['WhatsApp', 'Graph API', 'AL Code']
  },
  {
    title: 'HMRC CIS Subcontractor Verification in Business Central',
    url: 'hmrc-vendor-verification.html',
    category: 'Compliance',
    date: 'May 2026',
    iso: '2026-05-06',
    readTime: '14 min read',
    description: 'Verifying construction subcontractors against HMRC — OAuth 2.0, the mandatory fraud-prevention headers, deduction-rate handling (0/20/30%), sandbox testing, and storing the verification result.',
    tags: ['HMRC', 'CIS', 'OAuth', 'UK']
  },
  {
    title: 'Business Central Telemetry with Application Insights',
    url: 'application-insights-telemetry.html',
    category: 'Monitoring',
    date: 'April 2026',
    iso: '2026-04-22',
    readTime: '12 min read',
    description: 'Wire your extension to Application Insights, emit custom signals with Session.LogMessage, and turn raw traces into actionable KQL dashboards and alerts.',
    tags: ['Telemetry', 'KQL', 'Azure']
  },
  {
    title: 'SharePoint Integration with Business Central',
    url: 'sharepoint-bc-integration.html',
    category: 'Integration',
    date: 'March 2026',
    iso: '2026-03-29',
    readTime: '12 min read',
    description: 'Full architecture walkthrough, AL code, OAuth token handling, retry queues, and security patterns for document management.',
    tags: ['SharePoint', 'OAuth', 'Job Queue']
  },
  {
    title: 'Excel Upload for Sales Invoices in Business Central',
    url: 'excel-upload-sales-invoices.html',
    category: 'Excel Upload',
    date: 'March 2026',
    iso: '2026-03-26',
    readTime: '14 min read',
    description: 'Designing a scalable bulk upload pipeline with staging tables, row-level validation, error reports, and background posting via Job Queue.',
    tags: ['Excel', 'Validation', 'Job Queue']
  },
  {
    title: 'API Integration Patterns in Business Central',
    url: 'api-integration-patterns.html',
    category: 'API',
    date: 'March 2026',
    iso: '2026-03-22',
    readTime: '13 min read',
    description: 'Best practices for integrating external systems — custom API pages, OAuth 2.0, webhooks, idempotency, and production readiness.',
    tags: ['API', 'REST', 'Webhooks']
  },
  {
    title: 'Performance Optimization Techniques in Business Central',
    url: 'performance-optimization.html',
    category: 'Performance',
    date: 'March 2026',
    iso: '2026-03-18',
    readTime: '15 min read',
    description: 'Key design, SetLoadFields, partial records, loop patterns, background processing, and AL Profiler — a complete performance toolkit.',
    tags: ['Performance', 'AL Profiler', 'SetLoadFields']
  },
  {
    title: 'Automating Document Processing with Business Central',
    url: 'automating-document-processing.html',
    category: 'Automation',
    date: 'March 2026',
    iso: '2026-03-15',
    readTime: '13 min read',
    description: 'Event subscribers, auto-posting via Job Queue, approval workflows, email notifications, and Power Automate triggers end to end.',
    tags: ['Automation', 'Power Automate', 'Approvals']
  }
];

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

const state = { query: '', category: 'All' };

function cardHtml(blog) {
  const tagHtml = blog.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');
  return `
    <article class="card"
             data-category="${escapeHtml(blog.category)}"
             data-search="${escapeHtml((blog.title + ' ' + blog.description + ' ' + blog.tags.join(' ') + ' ' + blog.category).toLowerCase())}">
      <div class="card-top">
        <span class="card-cat">${escapeHtml(blog.category)}</span>
        <span class="card-dot"></span>
        <span>${escapeHtml(blog.date)}</span>
        <span class="card-dot"></span>
        <span class="read-time">${escapeHtml(blog.readTime)}</span>
      </div>
      <h3><a href="${escapeHtml(blog.url)}">${escapeHtml(blog.title)}</a></h3>
      <p>${escapeHtml(blog.description)}</p>
      <div class="card-tags">${tagHtml}</div>
    </article>`;
}

function renderBlogs() {
  const grid = document.getElementById('available-blogs');
  if (!grid) return;
  const sorted = blogData.slice().sort((a, b) => (a.iso < b.iso ? 1 : -1));
  grid.innerHTML = sorted.map(cardHtml).join('');
  applyFilters();
}

function renderChips() {
  const host = document.getElementById('filter-chips');
  if (!host) return;
  const cats = ['All'].concat(
    blogData.map(b => b.category).filter((c, i, arr) => arr.indexOf(c) === i).sort()
  );
  host.innerHTML = cats.map(c =>
    `<button class="chip${c === 'All' ? ' active' : ''}" data-cat="${escapeHtml(c)}" type="button">${escapeHtml(c)}</button>`
  ).join('');
  host.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      host.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.category = chip.dataset.cat;
      applyFilters();
    });
  });
}

function applyFilters() {
  const grid = document.getElementById('available-blogs');
  if (!grid) return;
  const cards = grid.querySelectorAll('.card');
  let visible = 0;
  cards.forEach(card => {
    const matchCat = state.category === 'All' || card.dataset.category === state.category;
    const matchQuery = !state.query || card.dataset.search.indexOf(state.query) !== -1;
    const show = matchCat && matchQuery;
    card.classList.toggle('is-hidden', !show);
    if (show) visible++;
  });
  const empty = document.getElementById('empty-state');
  if (empty) empty.classList.toggle('show', visible === 0);
  const count = document.getElementById('article-count');
  if (count) count.textContent = visible + (visible === 1 ? ' article' : ' articles');
}

function initSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;
  input.addEventListener('input', () => {
    state.query = input.value.trim().toLowerCase();
    applyFilters();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderChips();
  renderBlogs();
  initSearch();
});
