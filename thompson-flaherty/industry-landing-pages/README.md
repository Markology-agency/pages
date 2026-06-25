# Handoff: Thompson Flaherty — Industry Landing Pages + SBA Loan Support

## Overview

This package contains **8 high-fidelity HTML design references** for thompsonflaherty.com:

- 7 industry-specific landing pages (Medical/Dental, Construction, HVAC, Roofing, Real Estate, Trucking, Content Creators)
- 1 service page (SBA Loan Support)

All pages share the same design system, nav component, and template structure. The industry pages use a data-driven template (`industry-page.jsx`) — adding a new industry requires only a small data block, not a new template file.

---

## About These Files

These are **design references built in HTML/React (JSX + Babel)**. They are prototypes showing intended look, layout, copy, and behavior — **not production code to copy directly**. The task for Claude Code is to **recreate these designs in the thompsonflaherty.com Wordpress/Elementor environment** (or whatever the live stack is), using its existing patterns, component library, and page builder — matching the visual output as closely as possible.

Fidelity: **High-fidelity**. Colors, typography, spacing, copy, and interactions are final. Match pixel-for-pixel where the platform allows.

---

## Design Tokens (`shared.jsx`)

```
Colors:
  ink:       #0E1E34   (primary text)
  inkSoft:   #595656   (body / secondary text)
  inkMute:   #8A8585   (muted labels)
  paper:     #FFFFFF   (page background)
  surface:   #F6F6F6   (section alternating background)
  border:    #E8E2DC   (card/divider borders)
  accent:    #A42223   (buttons, highlights, CTA banner)

Typography:
  Display:  Geist, 400/500/600/700
  Body:     Red Hat Text, 300/400/500/600/700

Shadows:
  shadow:   0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)
  shadowLg: 0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)

Border radius:
  Cards:    16px
  Buttons:  999px (pill)
  Tiles:    16px
```

---

## Navigation (`tf-header.jsx`)

Exact replica of the live thompsonflaherty.com nav. Includes:
- Red top bar: phone (click-to-call `tel:+16186566010`), "We're now in Chicago!" notice
- White header: TF logo (links to `/`), mega-menu dropdowns (Tax, Accounting, Exit Planning, About, Locations), "Schedule Your Consultation" pill CTA button
- Responsive mobile hamburger menu
- Wave SVG divider below header

**Implementation note:** On the live site this nav already exists site-wide. These pages should slot in below the existing site header — do not duplicate the nav. The `<TFHeader />` component in the HTML files is there so the prototypes are self-contained for review only.

---

## Industry Landing Pages

### Template structure (`industry-page.jsx`)

Each industry page is a thin HTML wrapper that sets `window.INDUSTRY` then loads the shared template. The template renders:

| Section | Background | Notes |
|---|---|---|
| Hero | `#FFFFFF` | Headline, subhead, 4 trust bullets, CTA button + phone, hero photo with bottom/left fade |
| Services | `#F6F6F6` | 4 cards: Accounting, Bookkeeping, Tax, Managed Payroll. Each has icon, name, lead line, 3 bullet points, "Learn More" pill button |
| Pain points | `#FFFFFF` | Headline + 4-across tiles, numbered with accent badge |
| Process | `#F6F6F6` | 3-step horizontal cards |
| Compare | `#FFFFFF` | 2-col: red left column (TF), gray right column (others) |
| Team | `#F6F6F6` | 4 photo cards + "Meet The Team" button |
| FAQ | `#FFFFFF` | Accordion, industry-specific heading e.g. "Common questions about HVAC accounting" |
| CTA banner | `#A42223` | Full-bleed red, headline + button → `/contact/` |

### Industry data shape

Each HTML file passes a `window.INDUSTRY` object to the template:

```js
window.INDUSTRY = {
  slug: 'hvac',
  noun: 'business',           // used in trust bullets ("your business")
  heroPhoto: 'https://...',   // Unsplash URL or real photo
  faqTitle: 'Common questions about HVAC accounting',
  copy: {
    practical: {
      eyebrow: 'For HVAC Businesses',
      headline: <>HVAC accounting that keeps your business <em>running year-round</em>.</>,
      sub: 'One sentence supporting copy.',
    },
    outcome: { /* alternate copy tone, toggled via Tweaks */ }
  },
  painPoints: [               // overrides defaults; 4 items
    { title: '...', body: '...' },
  ],
  faqs: [                     // overrides defaults; 4-6 items
    { q: '...', a: '...' },
  ],
};
```

Medical uses mostly the default `MEDICAL_COPY` / `PAIN_POINTS` / `INDUSTRY_FAQS` constants inside `industry-page.jsx`; other industries override via `window.INDUSTRY`.

### Industry files

| File | Industry | Hero photo source |
|---|---|---|
| `medical.html` | Medical / Dental | Unsplash (dental clinic) |
| `construction.html` | Contractors & Builders | Unsplash (construction) |
| `hvac.html` | HVAC | Unsplash (HVAC tech) |
| `roofing.html` | Roofing | Unsplash (roofing) |
| `real-estate.html` | Real Estate | Unsplash (real estate) |
| `trucking.html` | Trucking & Transportation | Unsplash (trucking) |
| `content-creators.html` | Content Creators | Unsplash (creator) |

### Service card links

| Service | URL |
|---|---|
| Accounting | `/accounting/` |
| Bookkeeping | `/bookkeeping/` |
| Managed Payroll | `/payroll/` |
| Tax | `/tax-individual/` |

### Team section

4 members shown (Christian Kimble, Jim Klostermann, Kelly Flaherty, Tyler Hawkins). Photos are local files in `assets/`. "Meet The Team" button links to `/about/` (update to actual team page URL).

---

## SBA Loan Support Page (`sba-loan-support.html`, `sba-page.jsx`)

A standalone service page. No `window.INDUSTRY` — all content is in `sba-page.jsx` directly.

### Section breakdown

| Section | Background | Content |
|---|---|---|
| Breadcrumb + Hero | `#FFFFFF` | Headline, 1-sentence lead, 4-item checklist (red circle checkmarks), CTA button |
| Pain | `#F6F6F6` | "Where SBA applications usually get stuck" — 4-across numbered tiles |
| Services | `#FFFFFF` | "What we put together for you" — 3 rows: financial statements, cash flow projections, tax return package. Each row: number + label left, title + lead + bullets right |
| Process | `#F6F6F6` | "How the engagement runs" — 3 cards: Discovery call, Build the package, Submission and underwriting |
| Why CPA | `#FFFFFF` | 2x2 tile grid of short trust points |
| CTA | `#A42223` | Full-bleed red banner + "Schedule your consultation" → `/contact/` |

---

## Interactions & Behavior

- **All CTA buttons** → `https://thompsonflaherty.com/contact/`
- **Phone numbers** → `tel:+16186566010` (click-to-call)
- **FAQ accordion** — click to expand/collapse; one open at a time
- **Tweaks panel** — floating panel (bottom-right) for copy tone and accent color; for production this can be removed
- **Hero image** — fades out at bottom and left via CSS mask; Unsplash placeholder; replace with real photo
- **Team photos** — local `assets/team-*.jpeg`; replace with real CDN URLs in production

---

## Assets

| File | Usage |
|---|---|
| `assets/tf-logo.png` | TF logo, used in nav header |
| `assets/team-tyler.jpeg` | Tyler Hawkins headshot |
| `assets/team-kelly.jpeg` | Kelly Flaherty headshot |
| `assets/team-jim.jpeg` | Jim Klostermann headshot |
| `assets/team-christian.jpeg` | Christian Kimble headshot |
| `assets/hero-stripe.png` | Subtle vertical stripe texture behind hero section |

Google Fonts loaded: `Geist` (display), `Red Hat Text` (body).

---

## Adding a New Industry

1. Copy any existing industry HTML file (e.g. `hvac.html`) and rename it.
2. Update `window.INDUSTRY` at the top: `slug`, `noun`, `heroPhoto`, `faqTitle`, `copy.practical.eyebrow`, `copy.practical.headline`, `copy.practical.sub`, and optionally `painPoints` + `faqs`.
3. All other sections (services, process, compare, team, CTA) render automatically from the shared template.

---

## Files in this Package

```
README.md                     ← this file
index.html                    ← directory / preview index
shared.jsx                    ← design tokens, icons, primitives
tf-header.jsx                 ← site nav component
industry-page.jsx             ← shared industry landing template
sba-page.jsx                  ← SBA Loan Support page component
safe-variant.jsx              ← PillEyebrow + opt-in form components
tweaks-panel.jsx              ← in-prototype tweak controls (remove in prod)
image-slot.js                 ← drag-and-drop image placeholder web component
medical.html                  ← Medical/Dental industry page
construction.html             ← Construction industry page
hvac.html                     ← HVAC industry page
roofing.html                  ← Roofing industry page
real-estate.html              ← Real Estate industry page
trucking.html                 ← Trucking industry page
content-creators.html         ← Content Creators industry page
sba-loan-support.html         ← SBA Loan Support service page
assets/tf-logo.png
assets/team-tyler.jpeg
assets/team-kelly.jpeg
assets/team-jim.jpeg
assets/team-christian.jpeg
assets/hero-stripe.png
```
