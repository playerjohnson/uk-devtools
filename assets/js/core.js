/* ═══════════════════════════════════════════
   UK Calculator Hub — Core JavaScript
   ═══════════════════════════════════════════ */

// ── Tool Registry ──
// Add new tools here and they auto-populate the homepage and nav
const TOOLS = [
    {
        id: 'true-cost-employee',
        title: 'True Cost of an Employee',
        shortTitle: 'Employee Cost',
        description: 'See what an employee really costs — salary, employer NI at 15%, pension, recruitment, and more. Compare 2024/25 vs 2025/26.',
        category: 'Employment',
        tags: ['employer NI', 'national insurance', 'hiring', 'pension', 'payroll'],
        url: '/tools/true-cost-employee.html',
        icon: '👤',
        color: '#c45d3e',
        isNew: true,
        updated: '2026-02'
    },
    {
        id: 'salary-reality-check',
        title: 'Salary Reality Check — Can You Afford Your City?',
        shortTitle: 'Salary Reality Check',
        description: 'Enter your salary and pick your UK city. See your real take-home pay vs actual living costs and find out what\'s left each month.',
        category: 'Personal Finance',
        tags: ['salary', 'cost of living', 'take home pay', 'budget', 'rent', 'London', 'Manchester'],
        url: '/tools/salary-reality-check.html',
        icon: '🏙️',
        color: '#3b6b9a',
        isNew: true,
        updated: '2026-02'
    },
    // ── ADD NEW TOOLS HERE ──
];

// ── Tool Categories ──
const CATEGORIES = [
    { id: 'all', label: 'All Tools' },
    { id: 'Employment', label: 'Employment' },
    { id: 'Personal Finance', label: 'Personal Finance' },
    { id: 'Tax', label: 'Tax' },
    { id: 'Property', label: 'Property' },
    { id: 'Business', label: 'Business' },
    { id: 'Trading', label: 'Trading' },
];

// ── Navigation ──
function initNav() {
    const hamburger = document.querySelector('.nav-hamburger');
    const links = document.querySelector('.nav-links');
    if (hamburger && links) {
        hamburger.addEventListener('click', () => {
            links.classList.toggle('open');
        });
        // Close on click outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.site-nav')) {
                links.classList.remove('open');
            }
        });
    }
}

// ── Tool Grid Renderer (for homepage) ──
function renderToolGrid(containerId, filter = 'all') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const filtered = filter === 'all' ? TOOLS : TOOLS.filter(t => t.category === filter);

    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 48px 24px; color: var(--ink-muted);">
                <p style="font-size: 1.1rem;">More tools coming soon in this category.</p>
                <p style="font-size: 0.85rem; margin-top: 8px;">We're adding new UK calculators every week.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(tool => {
        const tag = tool.isComingSoon ? 'div' : 'a';
        const href = tool.isComingSoon ? '' : ` href="${tool.url}"`;
        const comingSoonClass = tool.isComingSoon ? ' tool-card--soon' : '';
        const badge = tool.isComingSoon
            ? '<span class="tool-badge-soon">Coming Soon</span>'
            : (tool.isNew ? '<span class="tool-badge-new">New</span>' : '');

        return `
        <${tag}${href} class="tool-card${comingSoonClass}" style="--tool-color: ${tool.color}">
            <div class="tool-card-icon">${tool.icon}</div>
            <div class="tool-card-body">
                <div class="tool-card-header">
                    <h3>${tool.title}</h3>
                    ${badge}
                </div>
                <p>${tool.description}</p>
                <div class="tool-card-meta">
                    <span class="tool-category">${tool.category}</span>
                    ${tool.isComingSoon ? '' : '<span class="tool-arrow">→</span>'}
                </div>
            </div>
        </${tag}>
    `}).join('');
}

// ── Category Filter (for homepage) ──
function initCategoryFilter() {
    const filterContainer = document.getElementById('categoryFilters');
    if (!filterContainer) return;

    filterContainer.innerHTML = CATEGORIES.map(cat => `
        <button class="filter-btn ${cat.id === 'all' ? 'active' : ''}" data-category="${cat.id}">
            ${cat.label}
        </button>
    `).join('');

    filterContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderToolGrid('toolGrid', btn.dataset.category);
    });
}

// ── FAQ Toggle ──
function toggleFaq(el) {
    el.parentElement.classList.toggle('open');
}

// ── Currency Format ──
function formatCurrency(amount) {
    if (amount >= 1000) {
        return '£' + amount.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }
    return '£' + amount.toFixed(2);
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initCategoryFilter();
    renderToolGrid('toolGrid');
});
