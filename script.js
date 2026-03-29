const blogData = [
    {
        title: 'SharePoint Integration with Business Central',
        url: 'sharepoint-bc-integration.html',
        category: 'Integration',
        date: 'March 2026',
        description: 'Full architecture walkthrough, AL code, OAuth token handling, retry queues, and security patterns for document management.',
        tags: ['AL Code', 'OAuth', 'SharePoint']
    },
    {
        title: 'Excel Upload for Sales Invoices in Business Central',
        url: 'excel-upload-sales-invoices.html',
        category: 'Excel Upload',
        date: 'March 2026',
        description: 'Designing a scalable bulk upload pipeline with staging tables, row-level validation, error reports, and background posting via Job Queue.',
        tags: ['Excel', 'Validation', 'Job Queue']
    },
    {
        title: 'API Integration Patterns in Business Central',
        url: 'api-integration-patterns.html',
        category: 'API',
        date: 'March 2026',
        description: 'Best practices for integrating external systems — custom API pages, OAuth 2.0, webhooks, idempotency, and production readiness.',
        tags: ['API', 'REST', 'Webhooks']
    },
    {
        title: 'Performance Optimization Techniques in Business Central',
        url: 'performance-optimization.html',
        category: 'Performance',
        date: 'March 2026',
        description: 'Key design, SetLoadFields, partial records, loop patterns, background processing, and AL Profiler — a complete performance toolkit.',
        tags: ['Performance', 'AL Profiler', 'SetLoadFields']
    },
    {
        title: 'Automating Document Processing with Business Central',
        url: 'automating-document-processing.html',
        category: 'Automation',
        date: 'March 2026',
        description: 'Event subscribers, auto-posting via Job Queue, approval workflows, email notifications, and Power Automate triggers end to end.',
        tags: ['Automation', 'Power Automate', 'Approvals']
    }
];

function renderAvailableBlogs() {
    const list = document.getElementById('available-blogs');
    if (!list) return;

    blogData.forEach(blog => {
        const tagHtml = blog.tags.map(t => `<span class="tag">${t}</span>`).join('');
        const isLive = blog.url !== '#';
        const item = document.createElement('li');
        item.className = 'blog-item';
        item.innerHTML = `
            <div class="blog-meta">${blog.date} · ${blog.category}</div>
            <h4>
                <a href="${blog.url}" ${!isLive ? 'aria-disabled="true" style="color:var(--ink-muted);pointer-events:none;"' : ''}>
                    ${blog.title}
                </a>
                ${!isLive ? '<span style="font-size:11px;font-family:var(--font-mono);color:var(--ink-muted);margin-left:8px;font-weight:400;">Coming soon</span>' : ''}
            </h4>
            <p>${blog.description}</p>
            <div class="tags">${tagHtml}</div>
        `;
        list.appendChild(item);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderAvailableBlogs();
});
