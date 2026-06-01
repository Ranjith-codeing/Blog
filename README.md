# Ranjith · Business Central Engineering Blog

A static blog of field-tested Microsoft Dynamics 365 Business Central engineering notes — AL patterns, integrations, performance, and compliance. No build step, no framework: just HTML, CSS, and a little vanilla JavaScript, deployable straight to GitHub Pages.

## Articles

| Article | Category |
| --- | --- |
| [WhatsApp Notifications from Business Central](whatsapp-integration.html) | Integration |
| [HMRC CIS Subcontractor Verification](hmrc-vendor-verification.html) | Compliance |
| [Business Central Telemetry with Application Insights](application-insights-telemetry.html) | Monitoring |
| [SharePoint Integration with Business Central](sharepoint-bc-integration.html) | Integration |
| [Excel Upload for Sales Invoices](excel-upload-sales-invoices.html) | Excel Upload |
| [API Integration Patterns](api-integration-patterns.html) | API |
| [Performance Optimization Techniques](performance-optimization.html) | Performance |
| [Automating Document Processing](automating-document-processing.html) | Automation |

## Project structure

```
index.html      Landing page — hero, featured post, searchable/filterable article grid
*.html          One file per article (shared template)
404.html        Custom not-found page
style.css       Design system — light + dark themes via CSS variables
app.js          Site-wide interactivity (loaded on every page)
script.js       Index-only: article data, card rendering, search + category filter
Images/         Article assets
```

## Features

- **Light / dark theme** with a toggle, system-preference default, and `localStorage` persistence (no flash on load).
- **Search & category filter** on the home page.
- **Reading-progress bar** and **scroll-spy table of contents** on article pages.
- **Code blocks** get a language label, copy-to-clipboard button, and lightweight syntax highlighting — all client-side.
- **Scroll-reveal** animations and a **back-to-top** button.
- Fully responsive; respects `prefers-reduced-motion`; print-friendly.

## Adding an article

1. Copy an existing article (e.g. `whatsapp-integration.html`) as your template.
2. Update the `<title>`, meta description, header, body, and sidebar.
3. Add an entry to the `blogData` array in [`script.js`](script.js) so it appears on the home page (and in search/filter).

## Local preview

Any static server works, for example:

```bash
npx serve .
# or
python -m http.server 8000
```

Then open `http://localhost:8000`.

## License

© Ranjith. Content and code samples are shared for educational use.
