/* ═══════════════════════════════════════════
   UK Calculator Hub — Core JavaScript
   ═══════════════════════════════════════════ */

// ── Base Path (auto-detect for GitHub Pages) ──
const BASE_PATH = (function() {
    const depth = window.location.pathname.replace(/\/[^\/]*$/, '').split('/').filter(Boolean).length;
    const repoSegments = window.location.pathname.match(/^\/uk-devtools/) ? 1 : 0;
    const levelsUp = depth - repoSegments;
    return levelsUp > 0 ? '../'.repeat(levelsUp) : './';
})();

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
    {
        id: 'contractor-vs-employee',
        title: 'Contractor vs Employee Cost Comparison',
        shortTitle: 'Contractor vs Employee',
        description: 'Compare the true cost of hiring a contractor at a day rate versus employing someone permanently — including employer NI, pension, holiday pay, and IR35.',
        category: 'Employment',
        tags: ['contractor', 'employee', 'hiring', 'day rate', 'IR35', 'cost comparison'],
        url: '/tools/contractor-vs-employee.html',
        icon: '⚖️',
        color: '#7c3aed',
        isNew: true,
        updated: '2026-02'
    },
    {
        id: 'vat-calculator',
        title: 'VAT Calculator — Add or Remove VAT',
        shortTitle: 'VAT Calculator',
        description: 'Add or remove VAT at 20%, 5% or 0% instantly. See net, VAT and gross amounts for UK VAT rates 2025/26.',
        category: 'Tax',
        tags: ['VAT', 'value added tax', 'add VAT', 'remove VAT', 'reverse VAT', '20%'],
        url: '/tools/vat-calculator.html',
        icon: '🧾',
        color: '#0891b2',
        isNew: true,
        updated: '2026-02'
    },
    {
        id: 'salary-sacrifice',
        title: 'Salary Sacrifice Calculator',
        shortTitle: 'Salary Sacrifice',
        description: 'See how much you save with salary sacrifice for pension, cycle to work, or EV schemes. Compare take-home pay before and after.',
        category: 'Employment',
        tags: ['salary sacrifice', 'pension', 'cycle to work', 'EV', 'tax saving', 'NI saving'],
        url: '/tools/salary-sacrifice.html',
        icon: '🔄',
        color: '#059669',
        isNew: true,
        updated: '2026-02'
    },
    {
        id: 'dividend-tax-calculator',
        title: 'Dividend Tax Calculator',
        shortTitle: 'Dividend Tax',
        description: 'Calculate tax on dividends for 2025/26. See your bill at basic, higher and additional rates with the £500 dividend allowance.',
        category: 'Tax',
        tags: ['dividend tax', 'dividend allowance', 'company director', 'limited company', 'tax on dividends'],
        url: '/tools/dividend-tax-calculator.html',
        icon: '💷',
        color: '#dc2626',
        isNew: true,
        updated: '2026-02'
    },
    {
        id: 'ir35-calculator',
        title: 'IR35 Take-Home Pay Calculator',
        shortTitle: 'IR35 Calculator',
        description: 'Compare your take-home pay inside vs outside IR35. See the real difference through limited company vs umbrella/PAYE.',
        category: 'Employment',
        tags: ['IR35', 'inside IR35', 'outside IR35', 'contractor', 'limited company', 'umbrella'],
        url: '/tools/ir35-calculator.html',
        icon: '📋',
        color: '#ea580c',
        isNew: true,
        updated: '2026-02'
    },
    {
        id: 'stamp-duty-calculator',
        title: 'Stamp Duty Calculator (SDLT)',
        shortTitle: 'Stamp Duty',
        description: 'Calculate Stamp Duty on UK property purchases. Covers first-time buyers, additional properties, and non-UK resident surcharges.',
        category: 'Property',
        tags: ['stamp duty', 'SDLT', 'property tax', 'first time buyer', 'second home', 'house purchase'],
        url: '/tools/stamp-duty-calculator.html',
        icon: '🏠',
        color: '#b45309',
        isNew: true,
        updated: '2026-02'
    },
    {
        id: 'business-rates-estimator',
        title: 'Business Rates Estimator',
        shortTitle: 'Business Rates',
        description: 'Estimate your business rates bill from your rateable value. Check if you qualify for Small Business Rate Relief.',
        category: 'Business',
        tags: ['business rates', 'rateable value', 'small business rate relief', 'SBRR', 'commercial property'],
        url: '/tools/business-rates-estimator.html',
        icon: '🏢',
        color: '#4f46e5',
        isNew: true,
        updated: '2026-02'
    },
    {
        id: 'pension-calculator',
        title: 'Pension Contribution Calculator',
        shortTitle: 'Pension Calculator',
        description: 'Calculate workplace pension contributions, tax relief, and projected pot growth over time. Covers auto-enrolment minimums.',
        category: 'Personal Finance',
        tags: ['pension', 'auto enrolment', 'pension contributions', 'tax relief', 'retirement', 'pension pot'],
        url: '/tools/pension-calculator.html',
        icon: '🏦',
        color: '#0d9488',
        isNew: true,
        updated: '2026-02'
    },
    {
        id: 'day-rate-calculator',
        title: 'Freelancer Day Rate Calculator',
        shortTitle: 'Day Rate Calculator',
        description: 'Work out what day rate to charge as a freelancer — factoring in tax, holidays, sick days, business costs, and non-billable time.',
        category: 'Business',
        tags: ['freelancer', 'day rate', 'contractor rate', 'freelance calculator', 'hourly rate'],
        url: '/tools/day-rate-calculator.html',
        icon: '📐',
        color: '#2563eb',
        isNew: true,
        updated: '2026-02'
    },
    {
        id: 'invoice-generator',
        title: 'Free Invoice Generator',
        shortTitle: 'Invoice Generator',
        description: 'Create professional UK invoices with VAT, bank details and payment terms. Preview and download as PDF — no sign-up needed.',
        category: 'Business',
        tags: ['invoice', 'invoice generator', 'PDF invoice', 'VAT invoice', 'freelancer invoice', 'billing'],
        url: '/tools/invoice-generator.html',
        icon: '🧾',
        color: '#9333ea',
        isNew: true,
        updated: '2026-02'
    },
    {
        id: 'position-size-calculator',
        title: 'Position Size Calculator',
        shortTitle: 'Position Size',
        description: 'Calculate the correct lot size for any trade based on your account balance, risk percentage and stop loss distance.',
        category: 'Trading',
        tags: ['position size', 'lot size', 'forex calculator', 'risk management', 'trading'],
        url: '/tools/position-size-calculator.html',
        icon: '📊',
        color: '#059669',
        isNew: true,
        updated: '2026-02'
    },
    {
        id: 'risk-reward-calculator',
        title: 'Risk/Reward Calculator',
        shortTitle: 'Risk/Reward',
        description: 'Calculate your R:R ratio and breakeven win rate. See if your trade setup is worth taking before you enter.',
        category: 'Trading',
        tags: ['risk reward', 'R:R ratio', 'breakeven win rate', 'trading calculator'],
        url: '/tools/risk-reward-calculator.html',
        icon: '🎯',
        color: '#059669',
        isNew: true,
        updated: '2026-02'
    },
    {
        id: 'pip-value-calculator',
        title: 'Pip Value Calculator',
        shortTitle: 'Pip Value',
        description: 'Find the monetary value of one pip for any forex pair and lot size in GBP, USD or EUR.',
        category: 'Trading',
        tags: ['pip value', 'forex pip', 'pip calculator', 'currency pair'],
        url: '/tools/pip-value-calculator.html',
        icon: '💱',
        color: '#059669',
        isNew: true,
        updated: '2026-02'
    },
    {
        id: 'profit-loss-calculator',
        title: 'Profit/Loss Calculator',
        shortTitle: 'Profit/Loss',
        description: 'Calculate profit or loss on any trade. Enter entry, exit and lot size to see P&L in pips and your account currency.',
        category: 'Trading',
        tags: ['profit loss', 'P&L calculator', 'trade calculator', 'forex profit'],
        url: '/tools/profit-loss-calculator.html',
        icon: '💰',
        color: '#059669',
        isNew: true,
        updated: '2026-02'
    },
    {
        id: 'compound-growth-calculator',
        title: 'Compound Growth Calculator',
        shortTitle: 'Compound Growth',
        description: 'Project your trading account growth with compound returns. See an interactive equity curve chart with milestones.',
        category: 'Trading',
        tags: ['compound growth', 'equity curve', 'trading growth', 'compound interest', 'account growth'],
        url: '/tools/compound-growth-calculator.html',
        icon: '📈',
        color: '#059669',
        isNew: true,
        updated: '2026-02'
    },
    {
        id: 'margin-calculator',
        title: 'Margin Calculator',
        shortTitle: 'Margin',
        description: 'Calculate required margin for any forex or CFD trade. See margin level, free margin and leverage comparison.',
        category: 'Trading',
        tags: ['margin calculator', 'forex margin', 'leverage', 'required margin', 'margin level'],
        url: '/tools/margin-calculator.html',
        icon: '🏦',
        color: '#059669',
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
    if (!links) return;

    // Build tools dropdown grouped by category
    const cats = {};
    TOOLS.forEach(t => {
        if (!cats[t.category]) cats[t.category] = [];
        cats[t.category].push(t);
    });
    let dropdownHTML = '';
    Object.keys(cats).forEach(cat => {
        dropdownHTML += `<div class="nav-dropdown-cat">${cat}</div>`;
        cats[cat].forEach(t => {
            dropdownHTML += `<a href="${BASE_PATH}${t.url.replace(/^\//, '')}">${t.icon} ${t.shortTitle}</a>`;
        });
    });

    // Replace nav content
    links.innerHTML = `
        <li><a href="${BASE_PATH}">Home</a></li>
        <li class="nav-dropdown">
            <a href="#">Tools</a>
            <div class="nav-dropdown-menu">${dropdownHTML}</div>
        </li>
        <li><a href="${BASE_PATH}blog/">Blog</a></li>
    `;

    // Hamburger toggle
    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            links.classList.toggle('open');
        });
    }

    // Mobile dropdown toggle
    const dropdown = links.querySelector('.nav-dropdown > a');
    if (dropdown) {
        dropdown.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropdown.parentElement.classList.toggle('open');
        });
    }

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.site-nav')) {
            links.classList.remove('open');
            const dd = links.querySelector('.nav-dropdown');
            if (dd) dd.classList.remove('open');
        }
    });
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
        const href = tool.isComingSoon ? '' : ` href="${BASE_PATH}${tool.url.replace(/^\//, '')}"`;
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
// Cookie consent handled by cookie-consent.js (shared across all sites)
document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initCategoryFilter();
    renderToolGrid('toolGrid');
});
