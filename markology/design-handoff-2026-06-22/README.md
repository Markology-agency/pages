# Handoff: Markology pages → shareable GitHub Pages links

## Goal
Publish each finished HTML page in `pages/` to GitHub Pages under the existing
`markology-agency` setup (the same place as `markology-agency.github.io/pages/markology/...`)
so every page gets its own public, shareable URL. Return one link per page.

## What's in this bundle
- `pages/` — the finished, hi-fidelity Markology marketing pages (one file per service, plus the homepage sections and the Lite landing page).
- `uploads/` — the image assets the pages reference via `../uploads/...`. Keep `uploads/` as a sibling of `pages/` (or rewrite the relative paths) so images resolve.

These are **design references built in HTML** — final, production-quality marketing pages, not a component library. For this task you can publish them as-is. (If you are instead pasting them back into the live Webflow site, treat each file as the visual + copy spec for that page; everything is scoped under a single `.mk-*` wrapper class so it won't collide with Webflow globals.)

## Pages and suggested slugs
| File | Suggested slug | Purpose |
|---|---|---|
| `ai-marketing-for-accountants.html` | `ai-marketing-for-accountants` | Master AI-marketing page: the two ways to work with Markology (Lite vs the Claude Course). |
| `accounting-ads.html` | `accounting-ads` | Paid ads service. Includes the $1M Fitness CPA ERC case + quiz mock and Vast ad creative. |
| `geo-for-accountants.html` | `geo-for-accountants` | GEO / AI-search visibility service. |
| `content-marketing-for-accountants.html` | `content-marketing-for-accountants` | Content marketing service. |
| `accounting-client-lead-funnels.html` | `accounting-client-lead-funnels` | Lead-funnel service. |
| `website-for-accountants.html` | `website-for-accountants` | Website builds service. Includes the example gallery + MuseMinded testimonial. |
| `success-stories.html` | `success-stories` | Reviews / case studies. |
| `lite-landing.html` | `lite` | Markology Lite done-for-you landing page. |
| `homepage-sections.html` | `home` | Homepage section blocks. |

## Suggested publishing steps
1. Locate the repo that serves `markology-agency.github.io` (or create a new Pages repo).
2. For each page, create a folder like `pages/markology/<slug>/index.html` and copy the page file in. Place a single shared `uploads/` folder so the pages' `../uploads/...` references resolve (adjust depth or relative paths as needed for your layout).
3. Commit and push. Enable GitHub Pages for the repo/branch if it isn't already.
4. Return the public URL for each page.

## Technical notes
- **Fonts:** Google Fonts (Anton + Inter) load via CDN `<link>` — no local font files needed.
- **Calendly:** each CTA embeds a Calendly inline widget via Calendly's script; works on any HTTPS host.
- **Gallery thumbnails** on the website page load live screenshots from `image.thum.io` (external service) — no local assets, but they depend on that service being reachable.
- **Self-contained:** all CSS/JS is inline per file and scoped under a `.mk-*` wrapper, so pages don't depend on each other.

## Brand system
- Colors: navy `#070630`, electric blue `#3872EB`, light blue `#7DA4F4`, paper `#F9F9FF`, lilac `#E6E9FF`.
- Display font: **Anton** (uppercase). Body font: **Inter**.
- Copy rules: always pair "Google and AI search"; no em dashes; lead with being found / recommended / getting leads (no "ranking" language).

## Files
```
design_handoff_markology/
  README.md
  pages/        (9 HTML pages — see table above)
  uploads/      (13 image assets referenced by the pages)
```
