---
name: local-seo-audit
description: Use when running a local SEO audit for a Markology Local Monthly client (e.g. Adam Traywick, Affinity, Ashford Sky, Tarleton, Elevated Tax, Virjee Local). Audits Google Business Profile completeness, local pack rankings, citation NAP consistency, review profile, on-site local signals (schema, NAP, city pages), and competitor gaps. Ships a brand-templated HTML scorecard to pages/[client-slug]/local-seo-audit/ plus a queued set of Asana follow-up tasks. Trigger when user says "run local SEO audit for [client]", "GBP audit", "local audit", "local pack analysis", or "local rankings deep dive". For non-local clients (national-only), use client-strategy-review instead.
---

# Local SEO Audit

End-to-end local SEO audit for a Markology Local Monthly client. Surfaces every leak in local pack visibility, GBP optimization, citation hygiene, and on-site local signals — then ships actionable Asana tasks.

## What this skill produces

1. **Live HTML scorecard** at `pages/[client-slug]/local-seo-audit/` (Markology brand: Bangers + Inter, navy/blue/lilac, Chart.js).
2. **8-dimension scorecard** — visual grade per dimension (A/B/C/D/F) with specific findings:
   - GBP completeness (categories, services, attributes, products, posts, photos)
   - Local pack rankings (target city + service combos via SEMrush local tracking project)
   - Citation NAP consistency (top 20 citations checked)
   - Review profile (count, rating, recency, response rate)
   - On-site local signals (schema, NAP in footer, embedded map, city pages)
   - Competitor delta (top 3 local competitors — their GBP, rankings, reviews)
   - Local content (city pages, neighborhood pages, "near me" coverage)
   - Conversion path (driving directions click-through, phone-call tracking, GBP messaging enabled)
3. **3 priority recommendations** with sized impact (e.g. "Add 4 missing GBP service categories → est. +12% category coverage")
4. **Asana task queue** — one task per recommendation, placed on Master Client Tasks List + client's monthly board WEEK section
5. **Optional deliverables** (if the audit reveals the need): GBP description rewrite, city pages outline, citation cleanup list, review-response templates

## Differs from other audits

| Need | Skill |
|---|---|
| Local-only audit (GBP, citations, local pack, reviews) | **`local-seo-audit` (this skill)** |
| National-scope strategic review (SEMrush + GSC + Ads) | `client-strategy-review` |
| AI-visibility audit (Google AI Overviews, Perplexity, etc.) | `eeat-sprint` |
| One-shot Google Ads waste analysis | `leadgen-google-ads-audit` |

## Required inputs (ask before starting)

1. **Client slug** (e.g. `adam-traywick`, `ashford-sky`)
2. **Business name** as it appears on GBP (exact match matters)
3. **Primary location** — city, state, ZIP
4. **Service area** — radius or specific cities served (some clients target multiple metros)
5. **Top 3-5 local competitors** — domain + business name. If unknown, pull top local-pack competitors from SEMrush.
6. **Existing keyword doc location** — should be in Google Drive ("SEO & Expanded Keyword Mapping" or similar). Per Local SEO CLAUDE.md, ALWAYS read this first.

## Requirements

- SEMrush MCP for local rank tracking (`mcp__claude_ai_SEMRush__tracking_research`, `mcp__claude_ai_SEMRush__overview_research`)
- Google Drive MCP for client keyword doc
- Web fetch / scraping for GBP, citations, on-site checks
- Asana MCP for task queue
- `gh` CLI logged in to `markology-agency` for repo writes
- Optional: Brightlocal API or similar for automated citation audit

## Process

### Phase 0: Mandatory pre-audit (per Local SEO CLAUDE.md)

1. **Read the client's keyword doc from Google Drive.** Locate "SEO & Expanded Keyword Mapping" spreadsheet via `mcp__claude_ai_Google_Drive__search_files`. Capture the full keyword list (volume, KD, intent) and the named competitor domains.
2. **Pull current rankings from SEMrush** for the client domain + each competitor. Use the SEMrush local tracking project (NOT broad `domain_organic`) — see `Departments/Reporting/CLAUDE.md` memory `feedback_use_semrush_tracking_projects.md` for why.
3. **Check sitemaps before marking any page as "Create new."** Fetch `[domain]/sitemap.xml`, `[domain]/sitemap_index.xml`, `[domain]/wp-sitemap.xml`. Existing pages = optimize. Missing = create.

### Phase 1: GBP audit

Fetch the client's GBP listing (Google Maps URL or direct search). Score:

- **Categories** — primary + up to 9 secondary. Missing relevant categories = points off.
- **Services** — itemized list with descriptions. Empty = F.
- **Attributes** — pay options, accessibility, virtual care, etc.
- **Products** (optional but adds completeness)
- **Posts** — last post < 30 days = A. None in 90 days = F.
- **Photos** — interior, exterior, team, product. <10 photos = D.
- **Q&A** — owner-answered = good. User questions ignored = bad.
- **Description** — keyword-rich, location-anchored, ≤750 chars
- **Hours, address, phone, website URL** — verify accuracy

Output: per-field grade + list of missing/weak items.

### Phase 2: Local pack rankings

Pull rankings from the client's SEMrush local tracking project (if it exists). For each target keyword + city combo:
- Current local-pack position (1-3, 4-10, off-pack)
- Organic position (since map pack and organic interact)
- Change vs 30 days ago, 90 days ago

Identify:
- Top 5 keywords already in local pack (defend)
- Top 10 keywords on local-pack page 1 but off-pack (push)
- Top 10 keywords with high volume but no ranking (build)

### Phase 3: Citation audit

Check NAP (Name/Address/Phone) consistency across the top 20 citation sources:
- Google Business Profile (the source of truth)
- Bing Places
- Apple Maps
- Yelp
- Facebook
- Industry-specific (e.g., for CPAs: AICPA, Texas State Board if applicable; for law: Avvo, Justia, FindLaw; for medical: Healthgrades, Vitals, Zocdoc)
- Data aggregators: Foursquare, Factual/Data Axle, Localeze, Neustar
- BBB
- Chamber of Commerce

For each: flag wrong/outdated NAP, missing listings, duplicate listings.

### Phase 4: Review profile

For each platform with reviews (Google, Yelp, industry-specific):
- Total review count
- Average rating
- Most recent review date
- Owner response rate (% of reviews with an owner response)
- Negative review presence (1-2 star count + most recent)

Score: A if 50+ Google reviews, 4.5+ rating, 80%+ response rate, no recent negatives. F if <10 reviews, <4.0 rating, or unanswered negatives.

### Phase 5: On-site local signals

Fetch the client homepage + service pages + city pages (if any). Check:

- **LocalBusiness schema** — present? Includes geo, address, phone, openingHours, sameAs (social profiles)?
- **NAP in footer** — matches GBP exactly?
- **Embedded Google Map** — homepage or contact page?
- **City pages** — one per target city? Unique content (>800 words), not boilerplate? Internal linking from homepage?
- **Service + city combo pages** — for service-area businesses serving multiple metros

### Phase 6: Competitor delta

For each top-3 competitor:
- Their GBP completeness (compare to client's)
- Their local-pack rankings on shared keywords
- Their review count + rating
- Their city pages / "near me" coverage
- Their backlink profile (via SEMrush `backlink_research`)

Identify the single biggest gap where they win and the client loses.

### Phase 7: Build the HTML scorecard

Use the Markology brand template. Reference: `Departments/Reporting/CLAUDE.md` for fonts, palette, layout.

Required sections:
1. **Hero** — Local SEO Audit pill, client name, location, lede summarizing biggest finding
2. **Scorecard strip (8 cards)** — A/B/C/D/F grade per dimension with one-line explanation
3. **Overall grade callout** — weighted average across dimensions
4. **Rankings deep-dive** — table of top 10 local-pack opportunities + chart of pack vs organic position
5. **GBP detail** — checklist of what's complete vs missing
6. **Citation table** — top 20 citations with NAP-consistent / inconsistent / missing flags
7. **Review snapshot** — stat tiles for total, rating, response rate, recency
8. **Competitor matrix** — 3-col comparison (client vs each competitor) across key dimensions
9. **Priorities (3 numbered)** — each with: what, why, impact estimate, who owns, tag (GBP / Citations / On-site / Reviews / Content / Tracking)
10. **Footer**

Build the file in `/tmp/pages-check/[client-slug]/local-seo-audit/index.html`, commit, push.

### Phase 8: Update the client landing page

If the client has a hub at `pages/[client-slug]/index.html`, add a Local SEO Audit card. If not, this audit is the first non-monthly report — add a per-client landing page using `references/client-hub-template.html` and add the client to `CLIENT_HUBS` in `scripts/build_reports_index.py`.

### Phase 9: Queue Asana tasks

Use the `asana-task-batch` skill or call `mcp__claude_ai_Asana__create_tasks` directly. For each of the 3 priorities:

- **Task name:** `[Local SEO] {priority headline}`
- **Notes:** the priority paragraph + link to live audit URL
- **Project:** Master Client Tasks List (`1209521999646340`), Queue section (`1212290286879699`)
- **Custom fields:** Status = Not Started, Dept = SEO (`1203981676642172`), Client = (matching GID)
- **Due:** Priority 1 → mid WEEK 3, Priority 2 → mid WEEK 4, Priority 3 → end WEEK 4 of current month
- **Also add to client's monthly board** (e.g. `[Client] - May 2026`) in correct WEEK section

For follow-on deliverables (GBP description, city pages, citation cleanup) that aren't part of the top 3 priorities, queue as additional tasks on the monthly board.

### Phase 10: Save context to memory

Write `memory/project_[client]_local_seo_audit_[month-year].md`:
- Audit date + overall grade
- 3 priorities + status
- Top 5 local-pack opportunities (the "push" set)
- Top competitor + their biggest advantage
- Any open questions for the next audit

Add a pointer in `MEMORY.md`.

## Anti-patterns

- **Don't audit without reading the keyword doc first.** Per Local SEO CLAUDE.md, the doc has the targeted keyword + competitor list already. Pulling fresh keywords without it produces a different audit each time.
- **Don't mark a page "Create new" without checking the sitemap.** If it already exists, the task is "optimize," not "create."
- **Don't use broad SEMrush `domain_organic` for the rankings deep-dive.** Use the client's Position Tracking project (the local tracking campaign). Memory entry `feedback_use_semrush_tracking_projects.md` explains why.
- **Don't include national-volume keywords in the local-pack ranking section.** Local audit is about geo-modified queries ("cpa fort worth", "estate attorney near me"). National keyword coverage belongs in the monthly SEO report.
- **Don't ship the audit without the 3 prioritized Asana tasks.** The audit document is the diagnosis. The Asana queue is the cure. Both must ship together.
- **Don't grade citations harshly if the client is brand-new (<6 months in business).** Citation indexing takes time. Mark "in progress" with a follow-up date instead.

## Compliance notes

- Per Markology root CLAUDE.md, never promise specific traffic numbers or rankings. Impact estimates should use ranges (e.g. "est. 15-30% local pack coverage lift") sourced from comparable client data or industry benchmarks.
- For law clients (Tarleton), follow law-firm advertising rules: no "best", "top-rated", "guaranteed outcomes" language in any recommendation.
- For RIA clients (Keen, KB Financial — though those are national), no specific return promises.
