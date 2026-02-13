# UK Calculator Hub — Umbrella Site

A static site hosting multiple UK-focused calculator tools. Designed for SEO, monetisation, and rapid tool addition.

## Site Structure

```
site/
├── index.html                  # Homepage — tool directory & email capture
├── robots.txt                  # Search engine crawl rules
├── sitemap.xml                 # Search engine sitemap
├── assets/
│   ├── css/
│   │   └── core.css            # Shared design system (nav, footer, forms, results)
│   ├── js/
│   │   └── core.js             # Shared JS (nav toggle, tool registry, utilities)
│   └── img/                    # Shared images (favicons, OG images)
├── tools/
│   └── true-cost-employee.html # First tool — True Cost of Employee Calculator
└── blog/
    └── index.html              # Blog listing page
```

## Quick Start — Deploy to Netlify (Free)

1. **Push to GitHub:**
   ```bash
   cd site
   git init
   git add .
   git commit -m "Initial site"
   git remote add origin git@github.com:YOUR_USERNAME/uk-calculator-hub.git
   git push -u origin main
   ```

2. **Deploy on Netlify:**
   - Go to [netlify.com](https://app.netlify.com) and sign in with GitHub
   - Click "Add new site" → "Import an existing project"
   - Select your repo
   - Build settings: leave blank (it's a static site, no build needed)
   - Click "Deploy site"
   - Your site is live at a random `.netlify.app` URL

3. **Add custom domain:**
   - Buy a domain (Namecheap, Cloudflare, etc.)
     Suggested: `ukcalculatorhub.co.uk`, `employercalculator.co.uk`, etc.
   - In Netlify: Site settings → Domain management → Add custom domain
   - Update DNS records as instructed (usually a CNAME or A record)
   - Netlify auto-provisions SSL

4. **Replace `yourdomain.co.uk`:**
   - Find & replace `yourdomain.co.uk` across all HTML files with your actual domain
   - Update `sitemap.xml` and `robots.txt` with the real domain


## How to Add a New Tool

### Step 1: Register in core.js

Open `assets/js/core.js` and add an entry to the `TOOLS` array:

```javascript
{
    id: 'vat-calculator',
    title: 'VAT Calculator UK',
    shortTitle: 'VAT Calculator',
    description: 'Add or remove VAT instantly. Supports standard 20%, reduced 5%, and custom rates.',
    category: 'Tax',            // Must match a CATEGORIES entry
    tags: ['VAT', 'tax'],
    url: '/tools/vat-calculator.html',
    icon: '🧾',
    color: '#2d8f5e',
    isNew: true,
    updated: '2026-02'
},
```

This auto-adds it to the homepage grid and category filters.

### Step 2: Create the tool HTML

Copy `tools/true-cost-employee.html` as a template. The structure is:

1. `<head>` — Update title, meta description, canonical URL, schema.org
2. `<nav>` — Add a nav link for the new tool (and update other pages' navs)
3. `<header>` — Tool-specific header with breadcrumb, badge, title, subtitle
4. `<main>` — Calculator inputs, button, results section
5. SEO content — Explanatory text + FAQ section
6. `<footer>` — Add link to the new tool
7. `<script>` — Tool-specific calculation logic

### Step 3: Update sitemap.xml

Add a `<url>` entry for the new tool.

### Step 4: Update navigation

Add the tool to the nav links in:
- `index.html`
- `blog/index.html`
- All existing tool pages
- Footer links across all pages

### Step 5: Deploy

Commit and push. Netlify auto-deploys.


## Monetisation Setup

### Google AdSense
1. Sign up at [adsense.google.com](https://adsense.google.com)
2. Add the AdSense script tag to `<head>` of all pages
3. Place ad units in natural positions:
   - Between results sections
   - After the calculator, before SEO content
   - In the sidebar (if you add one for wider layouts)

### Ezoic (better RPMs once you hit 10,000+ monthly visits)
1. Sign up at [ezoic.com](https://www.ezoic.com)
2. They handle ad placement optimization automatically
3. Finance/business traffic typically earns £8-25 RPM

### Affiliate Links
Natural placements within tools:
- Employee cost calculator → link to accounting software (Xero, QuickBooks affiliates)
- Contractor comparison → link to contractor insurance or IR35 assessment tools
- Stamp duty calculator → link to mortgage brokers or conveyancing services

### Email List
The homepage has an email capture form. Connect it to:
- Mailchimp, ConvertKit, or Buttondown (all have free tiers)
- Send a brief email when new tools launch
- Build towards a newsletter on UK business/tax changes


## SEO Strategy

### Blog Content Plan (write 2-3 posts per tool)
Each tool should have supporting blog content targeting long-tail keywords:

**For the Employee Cost Calculator:**
1. "How Much Does It Cost to Employ Someone in the UK in 2025/26?"
2. "Employer NI Increase April 2025: What It Means for Small Businesses"
3. "Employee vs Contractor: The True Cost Comparison for UK Employers"

**General strategy:**
- Each blog post links back to the relevant calculator
- Target question-based keywords ("how much does...", "what is the cost of...")
- Include the tool as an embedded callout within blog posts
- Internal link between related tools and posts

### Technical SEO
- ✅ Schema.org structured data on all pages
- ✅ Canonical URLs
- ✅ Meta descriptions
- ✅ Sitemap
- ✅ robots.txt
- ☐ Add favicons (16x16, 32x32, apple-touch-icon)
- ☐ Add Open Graph images (1200x630px) for social sharing
- ☐ Submit sitemap to Google Search Console
- ☐ Submit sitemap to Bing Webmaster Tools


## Tool Ideas Pipeline

Priority order based on search volume, competition, and ad value:

| Tool | Category | Priority |
|------|----------|----------|
| Contractor vs Employee Cost | Employment | High |
| VAT Calculator | Tax | High |
| Salary Sacrifice Calculator | Employment | High |
| Dividend Tax Calculator | Tax | Medium |
| IR35 Take-Home Pay | Employment | Medium |
| Stamp Duty Calculator | Property | Medium |
| Business Rates Estimator | Business | Medium |
| Pension Contribution Calculator | Retirement | Medium |
| Freelancer Day Rate Calculator | Business | Medium |
| Invoice Generator | Business | Low |

## Tech Notes

- Pure static HTML/CSS/JS — no build step, no framework, no dependencies
- All calculations run client-side (no server needed)
- Google Fonts loaded via preconnect for performance
- Shared design system in `core.css` means consistent branding across all tools
- Tool registry in `core.js` means homepage auto-updates when you add tools
- Mobile-responsive out of the box
- Hosting cost: £0 (Netlify/Vercel/Cloudflare Pages free tier)
- Domain cost: ~£8-12/year for a .co.uk
