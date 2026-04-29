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
    },
    {
        title: 'Business Central 2026 Wave 1: What Integrators Need to Know',
        url: 'bc-2026-wave1-integrators-guide.html',
        category: 'Release Wave',
        date: 'April 2026',
        description: 'A focused breakdown of release-wave priorities for integration teams, including testing and deployment planning.',
        tags: ['BC 2026', 'Integration', 'Planning']
    },
    {
        title: 'Shopify + Business Central 2026: New Connector Features and Setup Patterns',
        url: 'shopify-business-central-2026-connector.html',
        category: 'Commerce Integration',
        date: 'April 2026',
        description: 'Setup blueprint for catalog sync, order flow, fulfillment updates, and operational exception handling.',
        tags: ['Shopify', 'Connector', 'Ecommerce']
    },
    {
        title: 'Upgrading to Business Central v28 (2026 Wave 1): Risks, Checklist, Rollback Plan',
        url: 'upgrading-to-bc-v28-playbook.html',
        category: 'Upgrade',
        date: 'April 2026',
        description: 'A migration playbook covering baseline checks, regression testing, cutover controls, and rollback readiness.',
        tags: ['Upgrade', 'v28', 'Checklist']
    },
    {
        title: 'What Changed in BC 28.0 Preview: Dev + Admin Impact Breakdown',
        url: 'bc-28-preview-dev-admin-impact.html',
        category: 'Preview',
        date: 'April 2026',
        description: 'Role-based breakdown of changes that affect AL development, deployment pipelines, and administration.',
        tags: ['Preview', 'AL', 'Admin']
    },
    {
        title: 'Release Wave Strategy: How to Plan Business Central Changes Every 6 Months',
        url: 'bc-release-wave-planning-strategy.html',
        category: 'Strategy',
        date: 'April 2026',
        description: 'A governance model for recurring release planning, tenant testing, and controlled rollouts.',
        tags: ['Governance', 'Roadmap', 'Release Wave']
    },
    {
        title: 'Sustainability APIs in Business Central: Integration Patterns for Reporting',
        url: 'sustainability-apis-business-central.html',
        category: 'Sustainability',
        date: 'April 2026',
        description: 'Technical patterns for collecting, validating, and publishing sustainability metrics across systems.',
        tags: ['Sustainability', 'API', 'Reporting']
    },
    {
        title: 'AI in ERP Without the Hype: Where Agents Save Time in Finance Ops',
        url: 'ai-agents-erp-finance-ops.html',
        category: 'AI',
        date: 'April 2026',
        description: 'Practical use cases for AI agents in payables, approvals, anomaly handling, and period close support.',
        tags: ['AI', 'Agents', 'Finance Ops']
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
