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
        url: '#',
        category: 'Excel Upload',
        date: 'March 2026',
        description: 'Designing a scalable bulk upload solution with validation, error handling, and reprocessing capability using Job Queue.',
        tags: ['Excel', 'Validation', 'Job Queue']
    },
    {
        title: 'API Integration Patterns in Business Central',
        url: '#',
        category: 'API',
        date: 'March 2026',
        description: 'Best practices for integrating external systems using APIs, including authentication, data mapping, and error handling strategies.',
        tags: ['API', 'REST', 'AL Code']
    },
    {
        title: 'Performance Optimization Techniques in Business Central',
        url: '#',
        category: 'Performance',
        date: 'March 2026',
        description: 'Practical techniques to improve query performance, use efficient data handling patterns, and leverage background processing.',
        tags: ['Performance', 'SQL', 'AL Code']
    },
    {
        title: 'Automating Document Processing with Business Central',
        url: '#',
        category: 'Automation',
        date: 'March 2026',
        description: 'Automate document workflows using integration tools and reduce manual intervention across business processes.',
        tags: ['Automation', 'Workflow']
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
