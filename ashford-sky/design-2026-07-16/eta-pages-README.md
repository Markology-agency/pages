# Handoff: Ashford Sky — ETA Service Pages (5 pages)

## Overview
Five service pages for **ashfordsky.com**, repositioned from local-SEO ("Salt Lake City bookkeeping") to a **national acquisition-entrepreneur (ETA) audience** — people buying $500K–$5M businesses, usually with SBA 7(a) financing. Each page targets one slice of the buyer's timeline: **before buying → during the deal → after closing → the first year → and beyond**.

Pages (in `eta-pages/`):
1. `due-diligence.html` — **NEW page.** SEO targets: "financial due diligence", "due diligence services". Stages: before buying + during the deal. Includes the 3-tier pricing section (see below).
2. `tax.html` — deal structuring (asset vs stock, F-reorg, PPA) + year-one setup for maximum savings (depreciation elections, S-Corp timing, estimates) + year-round strategy. Stages: during the deal + first year + beyond.
3. `accounting.html` — the first-90-days build: financial architecture (QBO/payroll/bill pay), purchase price accounting, opening balance sheet, cutover. Stages: after closing + first year.
4. `bookkeeping.html` — monthly close for the first year of ownership; lender-ready reporting. Stages: first year + beyond.
5. `cfo.html` — 13-week cash flow, SBA debt-service/covenant planning, dashboards, next deal / exit. Stages: first year + beyond.
6. `index.html` — internal hub for review only; NOT a production page.

These are **hi-fi design mockups** intended to be rebuilt in the site's WordPress/Elementor stack (Elementor 4.x). Copy is final; the CMS implementation should reproduce the layouts and copy, not the HTML verbatim.

## Fidelity
**High-fidelity.** Copy, structure, colors, and hierarchy are final. Fonts are stand-ins (see Assets). The Calendly blocks are placeholders to be replaced with the real embed.

## Shared page anatomy (all 5 pages, in order)
1. **Nav** — color logo left, links to the 5 sibling pages, "Book a Consult" pill button (navy) right. Sticky, blurred light background.
2. **Hero** — light blue gradient (`#e4eef6 → #f7f9fb`) with a faint vertical bar-chart pattern overlay; centered eyebrow (uppercase, letter-spaced, navy), serif display H1, lede paragraph, two buttons (primary navy pill + ghost anchor link).
3. **Deal-stage timeline bar** (`.stagebar`) — 5 equal cells: Before buying / During the deal / After closing / The first year / And beyond. The page's own stage(s) are highlighted (light blue fill `#eaf3fa`, navy border) with a one-line caption underneath. **Which cells are "on" differs per page** — preserve exactly.
4. **Problem statement** — centered eyebrow + serif H2 + sub paragraph.
5. **Feature grid** — 2×2 (or 2×3 on due-diligence) white cards on cream `#f0ede9`, each with a numbered navy square badge (sky text), serif card title, body copy.
6. **Process steps** — 4 white cards in a row, large ghosted serif numbers (01–04).
7. **Chips** — on tax/cfo pages: 3-col checklist chips with navy circle checkmarks.
8. **Pricing tiers** — due-diligence page ONLY (see below).
9. **Related-service cross-link** (`.related`) — wide white card, tag + serif headline + copy left, navy pill CTA right, linking to a sibling page.
10. **About Darin** (`.darin`) — centered eyebrow "Meet the founder of Ashford Sky", serif headline "Built by a CPA who has actually been the buyer.", 4 credential pills (Former Ernst & Young / Licensed CPA / Bought, operated & sold a business / 10+ years in deal & tax advisory), then a warm-gray card (`#f6f4f0`): copy + sky-bordered pull quote left, photo cutout (`assets/darin-cutout.png`) bottom-aligned right. **The pull quote is different on every page** — keep each page's version.
11. **FAQ** — `<details>` accordions, serif questions, +/– indicator. Questions are keyword-aware; keep phrasing.
12. **Calendly section** (`.book`, cream bg) — replace the dashed placeholder with the real embed:
```html
<div class="calendly-inline-widget" data-url="https://calendly.com/ashfordsky/initial-consult-eta" style="height:900px;"></div>
<script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
```
13. **Footer** — deep navy `#0d2f4f`, white logo, 3-col grid, sky-blue column headings.

## Due-diligence pricing tiers (final copy, keep verbatim)
- **Pre-LOI Screen — Free — 30-minute consult.** Pre-LOI deal screen ✓ 30-minute consult ✓ No charge, no obligation. CTA "Send us a target".
- **Single Services — $2,500 each — 1–2 weeks per offering.** Proof of Cash / Working Capital / Tax Structuring + PPA (each standalone). CTA "Ask about a single service".
- **QoE Lite + Structuring — $7,000–15,000* — 3–4 week turnaround — "Most complete" badge, sky border.** Everything in Single Services + full QoE with EBITDA normalization + add-back pressure-test and off-balance-sheet risk scan + post-close financial architecture recommendations. CTA "Start with QoE Lite".
- Footnote: *Final fee depends on deal size and complexity; fixed before the engagement starts.

## Design tokens
- Navy `#024070` (primary), ink `#143255` (text), sky `#9ED0F0` (accent), cream `#f0ede9` (alt section bg), warm gray `#f6f4f0` (Darin card), deep navy `#0d2f4f` (footer).
- Display font: **Gelica** (brand); the mockups use Bitter (Google Fonts) as stand-in. Body: **General Sans** (brand); mockups use DM Sans. Production should use the licensed brand fonts.
- Headlines: weight 800, tight letter-spacing (−0.02em). Eyebrows: uppercase, 600, 0.2em tracking, 12.5px.
- All buttons are pill-shaped (border-radius 999px).
- **No em dashes anywhere in the copy** (client rule). Don't introduce any.

## Copy rules
- Audience is always the buyer ("you just bought a business", "the books you inherited"). Never generic small-business copy, never Salt Lake City references.
- Recurring anchors: SBA 7(a) financing, $500K–$5M deal size, "first 90 days", 13-week cash flow, QoE Lite, Darin has bought/run/sold a business himself.
- Cross-links: due-diligence ↔ tax ↔ accounting ↔ bookkeeping ↔ cfo (each page's `.related` card points at the most adjacent service). External links go to `https://ashfordsky.com/quality-of-earnings-lite/`.

## Files
- `eta-pages/*.html` — the six pages (5 production + index hub).
- `eta-pages/eta.css` — single shared stylesheet: tokens, nav, hero, stagebar, cards, steps, chips, related, darin, faq, book, footer, responsive breakpoints at 900px. The due-diligence page adds its tier styles in a page-level `<style>` block; the hub likewise.
- `assets/logo-color.png` (nav), `assets/logo-white.png` (footer), `assets/darin-cutout.png` (About Darin). Pages reference them at `../assets/`.

## Implementation notes
- SEO: each page has a final `<title>` and `meta description` — carry them into the CMS. The due-diligence page's FAQ copy deliberately contains the target phrases "financial due diligence" and "due diligence services".
- The stagebar is a strong candidate for a reusable Elementor template/section — only the `on` cells and the caption line change per page.
- FAQ accordions should ship with FAQPage schema markup in production.
- The index hub is for internal review; don't publish it.
