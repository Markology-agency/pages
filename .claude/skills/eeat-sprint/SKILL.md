---
name: eeat-sprint
description: |
  Run Markology's full E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) dev sprint
  on a client website to boost AI visibility (Google AI Overviews, Perplexity, ChatGPT, Claude).
  Audits 8 dimensions, ships schema + visible HTML + author bios + Q&A blocks via REST API, builds
  brand-templated scorecard at markology-agency.github.io/pages/[client]/eeat/, drafts llms.txt,
  builds 30/90-day baseline measurement doc, queues Asana follow-ups on client monthly board.
  Includes blog consolidation workflow for clients with thin-content / unindexed-pages problems.

  Trigger phrases:
    - "run E-E-A-T sprint on [client]"
    - "run the E-E-A-T audit on [client]"
    - "E-E-A-T fix for [client]"
    - "ship the E-E-A-T sprint to [client]"
    - "consolidate [client]'s thin blog posts"
    - "fix [client]'s indexation problem"
---

# E-E-A-T Sprint — Markology SOP

End-to-end playbook for boosting AI visibility (Google AI Overviews, Perplexity, ChatGPT, Claude)
on any Markology client website. Built and proven on:

- **KB Financial Advisors** (RIA, WordPress + Elementor + Rank Math, May 12, 2026)
- **Adam Traywick, CPA** (Texas CPA, WordPress + Elementor + Rank Math, May 12, 2026)
- **BizBud** (Creator-economy CPA, WordPress + Elementor + Rank Math, May 12, 2026)

The scorecard for each lives at `https://markology-agency.github.io/pages/[client-slug]/eeat/`.

---

## When to use this skill

Use when:
- Whitney says "run E-E-A-T sprint on [client]" or any of the trigger phrases above
- A client has visibly low AI visibility (SEMrush AI score, no AI Overview citations)
- A new client comes online and needs the baseline schema work before any other AI/SEO push
- A client has hundreds of unindexed pages (use the indexation-cleanup + consolidation paths)

---

## Phase 0: Setup + credentials

For every client:

1. **WP App Password** — pull via `lpass show --password 'https://[domain]/wp-json/'`. Username is `whitney@markology.io` regardless of the "Username" field stored in LastPass (that field sometimes contains the App Password label like "wp json" instead).
2. **If no App Password exists yet** — pause, ask Whitney to create one via WP admin → Users → Your Profile → Application Passwords. Save to LastPass as `https://[domain]/wp-json/`.
3. **Test auth:** `curl -s -A "Mozilla/5.0 ..." -u "whitney@markology.io:$PASS" https://[domain]/wp-json/wp/v2/users/me?context=edit` — should return 200 with role=administrator.
4. **For Webflow clients** (BFB, WW Aesthetics, Cherry Hill): pull Webflow API token from LastPass entry `[Client] - Webflow API Token`. Each Webflow site is in a separate workspace, requires its own token.

---

## Phase 1: Discovery

Pull baseline data so the schema injection is accurate:

1. **Plugin inventory:** `GET /wp/v2/plugins` (auth required). Confirm Rank Math is active. If Yoast or other, the meta-key pattern is different.
2. **Site settings:** `GET /wp/v2/settings` — capture `page_on_front` (homepage ID), `page_for_posts`.
3. **WP authors:** `GET /wp/v2/users?per_page=20` — identify real authors with content (filter out admin/dev accounts).
4. **Recent posts:** `GET /wp/v2/posts?per_page=10&_fields=id,slug,title,date,author` — get the top 5-10 recent for FAQ schema work.
5. **Service pages:** `GET /wp/v2/pages?per_page=50&_fields=id,slug,title` — identify commercial-intent pages for Service schema.
6. **About page:** find by slug `about`, `about-us`, `team`, or check footer links. Pull content to build Person bios.
7. **Existing schema baseline:** `curl https://[domain]/ | grep ld+json` — see what Rank Math is already outputting so you know what you're enriching vs duplicating.

---

## Phase 2: The 8 E-E-A-T audit dimensions

Score each green / yellow / red. Plan fixes accordingly.

| # | Dimension | Markology can ship | Needs client input |
|---|---|---|---|
| 1 | Author bylines + Person schema on blog content | Schema enrichment | Bios, headshots, LinkedIn URLs |
| 2 | Organization + Person JSON-LD enrichment | knowsAbout, employee, founder, areaServed | Logo file, professional org links |
| 3 | About page completeness | Person schema | Real bios with credentials |
| 4 | Blog content structure (heading-as-query, FAQ schema) | Full schema + content | Approval on rewrites |
| 5 | sameAs / entity knowledge graph (LinkedIn, NAPFA, AICPA) | Schema integration | Personal LinkedIn URLs, CFP/Bar profile URLs |
| 6 | Original data + proprietary tools | Brainstorm, document, build landing pages | Anonymized client data, surveys |
| 7 | Reviews + external citations (compliance-safe by client type) | Draft strategy, schema | Reviews, press mentions list |
| 8 | llms.txt file | Draft content | SFTP upload to web root |

---

## Phase 3: Ship schema (the leverage point)

**Rank Math REST API is the key pattern.** Endpoint: `POST /rankmath/v1/updateMeta`

Payload:
```json
{
  "objectID": <post_or_page_id>,
  "objectType": "post",
  "meta": {
    "rank_math_schema_<UniqueName>": { ...schema object... }
  }
}
```

The meta key namespace is `rank_math_schema_<UniqueName>`. Examples:
- `rank_math_schema_Organization` — enriched org on homepage
- `rank_math_schema_Person_Landon` — Person schema for one team member
- `rank_math_schema_FAQPage` — FAQ schema on a blog post
- `rank_math_schema_Service_<slug>` — Service schema on a service page

**Do NOT use `/rankmath/v1/updateSchemas`** — it accepts payloads but silently fails to write. Use `updateMeta` exclusively.

### Standard schemas to ship per client

1. **Homepage**: enriched Organization schema with `knowsAbout` (15-18 client-specific expertise topics), `employee` array (all team members), `founder` Person reference, `areaServed`, `foundingDate`, full address, `slogan`, social `sameAs` array.

2. **About/Team page**: one Person schema per credentialed team member with `description`, `jobTitle`, `knowsAbout` (specialties), `hasCredential` properly typed (CFP→CFP Board, EA→IRS, CPA→AICPA, JD→state bar). Format:
```json
{
  "@type": "EducationalOccupationalCredential",
  "credentialCategory": "Professional Certification",
  "name": "CERTIFIED FINANCIAL PLANNER (CFP)",
  "recognizedBy": {"@type": "Organization", "name": "Certified Financial Planner Board of Standards"}
}
```

3. **Service pages** (typically 10-15 per client): one Service schema per page with `serviceType`, `description`, `provider` (Org ref), `areaServed`, `url`.

4. **Blog posts (top 5-10 recent)**: one FAQPage schema with 4-5 Q&As drafted from the post's actual content.

### Anti-patterns (failure modes from past sprints)

- **FAQ schema requires matching visible content.** Google's policy: every Q&A in the schema must appear on the rendered page. Without matching visible HTML, schema is risky/penalized. **Always pair FAQ schema with a visible "Common Questions" section.**

- **Elementor pages do NOT render WP `post_content`.** Append-to-content via WP REST API silently fails on Elementor-built pages. If the page is Elementor:
  - Schema injection via Rank Math API still works (schema lives in post_meta, not content)
  - Visible content additions need Elementor template edits OR rebuild via Designer
  - For FAQ schema: skip on Elementor pages OR queue Elementor work as a separate task
  - Adam Traywick HSA POC hit this — content rendered but H2 hierarchy was flattened to paragraph text by Elementor

- **iThemes Security blocks plain Python urllib with 403.** Set browser User-Agent header on all requests: `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36`.

- **NitroPack caches schema/HTML changes.** Append `?cb=$(date +%s)` to verification URLs to bypass cache.

- **Multiple Organization nodes can coexist.** Rank Math's baseline Org node may remain alongside your injected enriched Org node. AI engines merge by `@id`. Either set matching `@id` on the custom Org or live with duplicate (both render in @graph, search engines reconcile).

---

## Phase 4: Visible HTML (Gutenberg posts only)

For each blog post that got FAQ schema, append matching visible "Common Questions" section + author bio block via `POST /wp/v2/posts/<id>` with new content. Gutenberg block format:

```html
<!-- wp:spacer {"height":"40px"} -->
<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Common Questions</strong></h2>
<!-- /wp:heading -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Question 1?</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Answer 1.</p>
<!-- /wp:paragraph -->
... (repeat per Q&A) ...
```

Author bio block at the very end, using `<!-- wp:columns -->` with image + paragraph + CTA links. Pull the bio text from the WP user `description` field (which should also be populated as part of the sprint).

---

## Phase 5: llms.txt

Draft file content per the emerging standard at llmstxt.org. Structure:

```
# [Client Name]

> [One-paragraph summary of the firm: what they do, who they serve, location, credentials, key specialty]

## Services
- [Service 1](URL): description.
- [Service 2](URL): description.
...

## Tools and Calculators
- [Tool 1](URL): description.

## Recent Insights
- [Post 1](URL)
- [Post 2](URL)

## About
- [About page](URL): summary.

## Team
- Name, credentials — role description.

## Contact
- Phone, email, address.
```

Save to `Clients/[Client]/SEO/llms.txt`. **Cannot be uploaded to web root via REST API.** Queue Asana task for Whitney to upload via SFTP/cPanel.

---

## Phase 6: Brand-templated HTML scorecard

Build at `Drafts/[client-slug]-eeat-scorecard/index.html` using the template from
`Drafts/_brand-template-base.html` (Bangers + Inter fonts, navy/blue/lilac palette).

Sections:
- Hero with pill, title, lede, meta row (client, domain, ship date, re-check date, compliance type)
- KPI grid (4 boxes: schema entities shipped, Q&As, pages hit, dimensions green count)
- Shipped section (cards for each thing live)
- "By the Numbers" entity breakdown (Org, Person, Service, FAQPage counts)
- 8-dimension scorecard with before/after status
- Queued section (Asana follow-ups)
- Footer with re-check date

Push to GitHub Pages: `markology-agency/pages` repo, path `[client-slug]/eeat/index.html`. Verify live at `https://markology-agency.github.io/pages/[client-slug]/eeat/`.

---

## Phase 7: Baseline measurement doc

Save at `Clients/[Client]/SEO/eeat-baseline-YYYY-MM-DD.md`. Include:

- SEMrush baseline snapshot (run `domain_rank` via SEMrush MCP)
- 18 high-intent AI engine queries tailored to client's niche
- 4 engines to test (Google AI Overviews, Perplexity, ChatGPT, Claude)
- Schedule: 30-day re-check + 90-day re-check
- What was shipped (mirror the scorecard)

---

## Phase 8: Asana follow-ups

Update the parent "Run E-E-A-T audit + Markology-side dev sprint" task to **Internal Review** status with full completion notes pointing to the scorecard URL.

Create follow-up tasks on the client's monthly board WEEK 4 section + Master Client Tasks List Queue:

- **Upload llms.txt** (Whitney — SFTP)
- **Provide personal LinkedIn URLs** for each advisor (client owner)
- **Provide bios** for any team member missing from /about/ schema (client owner)
- **Provide high-res headshots** (client owner)
- **Inject Elementor visible content** if any FAQ schema went on Elementor pages (Markology Dev)
- **Inventory press mentions / earned media** (client owner)
- **Compliance-safe reviews strategy** (Markology Strategy — for RIA/CPA/law clients)
- **30-day re-check** at YYYY-MM-DD + 30 (Markology SEO)
- **90-day re-check** at YYYY-MM-DD + 90

All tasks: Status=Not Started, Dept=appropriate (SEO/Development/Strategy/Writing), Client=client GID. Multi-home to Master Queue + client monthly board WEEK 4.

---

## Indexation cleanup (when applicable)

If client has 100+ unindexed pages in GSC "Discovered – currently not indexed":

1. **Pull GSC drilldown** via Search Console API or ask Whitney for the GSC export.
2. **Bucket the URLs** by publish year + word count via WP REST API.
3. **Categorize:**
   - `DELETE_OR_REDIRECT`: pre-2023 or stale year-stamped content
   - `EXPAND_OR_CONSOLIDATE`: 2023-2024 marginal posts (400-799 words)
   - `DELETE_OR_EXPAND`: sub-400-word stubs from recent years
   - `FORCE_INDEX`: recent quality posts not yet crawled (use Indexing API)
4. **Save action list CSV** to `Clients/[Client]/SEO/YYYY-MM-DD-indexation-action-list.csv`.
5. **Force-index high-value recent pages** via Google Indexing API (Notification Type: URL_UPDATED).
6. **DO NOT mass-force-index thin content.** Re-submitting low-quality content via Indexing API damages domain quality score further. Focus on content cleanup.

---

## Blog consolidation (for marginal-content clusters)

For clients with 50-200 thin (400-800 word) posts on overlapping topics:

1. **Cluster posts by topic keyword** (S-Corp, mileage, HSA, charitable, audits, etc.).
2. **For each cluster of 2+ posts:**
   - Identify canonical (longest, most recent, or already-strongest)
   - Write comprehensive 1500-2300 word guide per universal blog SEO + LLM rules (heading-as-query, answer-first, benchmark-per-section, 2+ internal links)
   - Update canonical via `POST /wp/v2/posts/<id>` with new content + title + slug (rename to year-current like `health-savings-accounts-2026`)
   - Push FAQ schema + meta title/description
   - Set rel=canonical on the merge URLs pointing to new canonical
   - **WordPress auto-handles the slug-rename 301** via `_wp_old_slug` — verify with `curl -sI old-url` returns 301.
   - **Manual 301s needed** for merge URLs that weren't the canonical's old slug — queue Asana task with the source/target pairs for Whitney to add via WP admin → Rank Math → Redirections.

3. **Slug strategy:** rename canonical to a year-current evergreen slug. Examples from proven sprints:
   - `health-savings-accounts-2` → `health-savings-accounts-2026`
   - `business-mileage-rate-2023` → `business-mileage-rate-2026`
   - `important-tax-deadline` → `small-business-tax-deadlines-calendar`
   - `estimated-taxes` → `quarterly-estimated-tax-guide`

4. **Rank Math `/updateRedirection` REST API is wonky** — accepts payloads but doesn't fully activate redirects. Required params: `objectID`, `objectType`, `hasRedirect`, `redirectionUrl`, `redirectionType`. Even when 200 OK, the redirect may not fire. Manual UI step in WP admin is the reliable path.

---

## Webflow clients (BFB, WW Aesthetics, Cherry Hill)

Different stack, different mechanics:

- **Each in a separate Webflow workspace** — needs its own API token.
- **Schema injection via Custom Code endpoint:** `PATCH /v2/sites/{site_id}/custom_code` (site-wide head/footer) or `PATCH /v2/sites/{site_id}/pages/{page_id}/custom_code` (per-page).
- **Visible HTML cannot be added via API** for static pages — page layout is Designer-only. For Webflow CMS Collection-based blogs, rich text fields CAN be updated via API.
- **Workflow:** schema-only via API + queue Asana task for visible HTML work in Designer.

---

## Reference: Resources

- **KB Financial Advisors scorecard** (RIA exemplar): https://markology-agency.github.io/pages/kb-financial-advisors/eeat/
- **Adam Traywick scorecard** (CPA exemplar): https://markology-agency.github.io/pages/adam-traywick/eeat/
- **BizBud scorecard** (creator-economy exemplar): https://markology-agency.github.io/pages/bizbud/eeat/
- **Brand template:** `Drafts/_brand-template-base.html`
- **Reusable scripts:**
  - `/tmp/kb_visible_faq.py` (Gutenberg visible FAQ HTML pattern)
  - `/tmp/kb_service_schema.py` (Service schema batch)
  - `/tmp/kb_author_bio.py` (author bio block append)
  - `/tmp/kb_retrofit.py` (older blog post retrofit)
  - `/tmp/at_hsa_consolidate.py` (blog consolidation POC)
  - `/tmp/at_4clusters_consolidate.py` (batch blog consolidation pattern)

---

## Memory references

These memory entries inform the SOP:

- `project_eeat_sop_rollout.md` — rollout state across the roster
- `project_webflow_clients.md` — 3 Webflow clients separate workspaces
- `project_virjee_two_sites.md` — Virjee Local + Dental on separate domains
- `feedback_blog_seo_llm_structure.md` — universal blog SEO + LLM structure rules
- `project_client_compliance_types.md` — RIA vs CPA vs law-firm compliance overlays

Cross-project rules in `global_rules` table:
- `rank_math_schema_injection_pattern` — the leverage pattern
- `elementor_pages_do_not_render_post_content` — the gotcha
- `faq_schema_requires_visible_matching_content` — Google policy compliance
- `ithemes_security_blocks_python_urllib_403` — UA workaround

---

## Compliance overlays per client type

- **RIA (Keen Capital, KB Financial Advisors)** — SEC Marketing Rule 206(4)-1 for testimonials. No return guarantees, no performance claims, past performance disclaimers.
- **CPA (most clients)** — no guaranteed tax savings, individual situations disclaimer.
- **Law firm (Tarleton Estate Attorney)** — state bar attorney testimonial rules apply. Confirm with client before any reviews work.
- **Healthcare-adjacent (Virjee Dental, WW Aesthetics)** — HIPAA considerations; no patient-specific data.

---

## Time budget per client

Sprint phases:
- Phase 0-1 (setup + discovery): 15 min
- Phase 2 (audit decisions): 10 min
- Phase 3 (schema injection): 30-45 min for typical client
- Phase 4 (visible HTML on 5 posts): 30 min
- Phase 5 (llms.txt draft): 10 min
- Phase 6 (scorecard HTML): 45 min
- Phase 7 (baseline doc): 10 min
- Phase 8 (Asana follow-ups): 15 min

**Total: ~2.5-3 hours per client** for the standard sprint. Add 2-3 hours for indexation cleanup if applicable. Add 30-45 min per blog consolidation cluster.
