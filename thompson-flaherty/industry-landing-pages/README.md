# Thompson Flaherty — Industry Landing Pages

Seven industry-specific landing pages for thompsonflaherty.com (accounting, bookkeeping, managed payroll & tax), built on one shared template. This bundle is ready to **publish to GitHub Pages** for shareable links.

## What's in here

| File | Page | Suggested URL slug |
|---|---|---|
| `index.html` | Directory linking to all seven | `/` |
| `medical.html` | Medical & Dental Practices | `/medical.html` |
| `construction.html` | Construction | `/construction.html` |
| `hvac.html` | HVAC | `/hvac.html` |
| `roofing.html` | Roofing | `/roofing.html` |
| `real-estate.html` | Real Estate Agents & Brokers | `/real-estate.html` |
| `trucking.html` | Trucking & Transportation | `/trucking.html` |
| `content-creators.html` | Content Creators & Influencers | `/content-creators.html` |

**Shared dependencies (must stay alongside the HTML files):**
`shared.jsx`, `industry-page.jsx`, `safe-variant.jsx`, `tf-header.jsx`, `tweaks-panel.jsx`, `image-slot.js`, and `assets/tf-logo.png`.

## How these pages work

These are **functional static pages** — no build step. Each HTML file:
- Loads React + Babel from a CDN and transpiles its JSX **in the browser** (so the visitor must be online — fine for a live site).
- Defines a small `window.INDUSTRY = { … }` content block (headlines, pain points, services, FAQ, photos).
- Renders the shared template in `industry-page.jsx` + `safe-variant.jsx` + the live-site header in `tf-header.jsx`.

To add a new industry, copy any page, edit only its `window.INDUSTRY` block, and save under a new slug.

> Note: because Babel transpiles in-browser there's a brief flash before render. For embedding *inside* the existing WordPress/Elementor site, a pre-bundled single-file embed is better; for standalone shareable links, GitHub Pages as below is the simplest path.

## Publish to GitHub Pages (shareable links)

From inside this folder:

```bash
# 1. Initialise and commit
git init
git add .
git commit -m "Thompson Flaherty industry landing pages"

# 2. Create the repo and push (GitHub CLI)
gh repo create tf-industry-landing --public --source=. --remote=origin --push

# 3. Turn on GitHub Pages from the main branch root
gh api -X POST repos/:owner/tf-industry-landing/pages \
  -f "source[branch]=main" -f "source[path]=/"
```

Pages then serves at:

```
https://<your-org>.github.io/tf-industry-landing/
https://<your-org>.github.io/tf-industry-landing/hvac.html
https://<your-org>.github.io/tf-industry-landing/roofing.html      … etc.
```

(If you prefer the dashboard: push the repo, then **Settings → Pages → Source: Deploy from a branch → main / root**.)

## Things to finish before going fully live

- **Team photos** — the team cards use drag-to-drop `image-slot` placeholders + stock headshots. Replace with real Thompson Flaherty headshots (drop a file on each slot, or set a real `src` in the team data).
- **Hero photos** — currently stock Unsplash images per industry (`heroPhoto` in each `window.INDUSTRY`). Swap for licensed/owned photography.
- **Form / CTA wiring** — the "Schedule Your Consultation" buttons link to `https://thompsonflaherty.com/contact/`. Point at a booking flow if desired.
- **Header links** — `tf-header.jsx` mirrors the live nav (Tax / Accounting / Exit Planning / About / Locations). Update if the live menu changes.

## Design tokens (for reference)

- Accent red `#A42223` (alt options in Tweaks: `#510606`, `#9E122A`, `#0E1E34`)
- Ink `#25211E` · soft ink `#595656` · surface `#F6F6F6` · warm surface `#FAF2EA` · base `#FFFFFF`
- Display font **Geist**, body **Red Hat Text** (both Google Fonts)
- Each page has a **Tweaks** panel (toggle in the toolbar) for tone (`practical` / `outcome`) and accent color.
