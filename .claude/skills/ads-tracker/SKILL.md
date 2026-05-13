---
name: ads-tracker
description: Use when setting up an always-on Google Ads + leads performance dashboard for a Markology client. Produces a live HTML tracker at pages/[client-slug]/ads-tracker/ that auto-refreshes daily from Google Ads (Pipeboard MCP) and Google Sheets lead data (Composio). Schedules two recurring routines (daily Google Ads anomaly check + daily lead-sheet rebuild), wires Asana comments, and ships a brand-templated dashboard. Use this for ongoing tracking — NOT for one-shot audits (those use leadgen-google-ads-audit or ecomm-google-ads-audit). Trigger when user says "set up ads tracker", "live dashboard", "performance tracker", or "daily monitoring" for a client.
---

# Ads & Leads Performance Tracker

A live, daily-refreshing HTML dashboard that combines Google Ads spend/conversions with lead-sheet form submissions. Surfaces conversions, anomalies, campaign changes, and the running existing-practice lead count.

**Proven pattern:** Built for Virjee Consulting May 2026 (dual-business: Dental + Local). Live at `https://markology-agency.github.io/pages/virjee/ads-tracker/`.

## What this skill produces

1. **Live HTML dashboard** at `pages/[client-slug]/ads-tracker/` (Markology brand: Bangers + Inter, navy/blue/lilac, Chart.js 4.4.1).
2. **Daily Google Ads check routine** — 8am client-time. Pulls yesterday's metrics per campaign, flags anomalies (paused campaigns, 0 impressions, ≥50% conversion drop, spend at cap, CPC spike), updates the campaign table on the dashboard, posts an Asana comment.
3. **Daily lead-sheet refresh routine** — 10am client-time. Rebuilds the derived `Enriched` tab from the raw `All Leads` source tab, recomputes monthly totals, updates KPI cards and charts on the dashboard.
4. **Asana cadence** — daily Asana comment from the Google Ads routine + Mondays/1st-of-month comment from the lead routine.
5. **Memory entry** documenting the client's classifier rules and sheet structure (so future sessions don't re-discover).

## When to use this vs. other ads skills

| Need | Skill |
|---|---|
| One-shot deep audit of a Google Ads account | `leadgen-google-ads-audit` or `ecomm-google-ads-audit` |
| Ongoing daily monitoring with live dashboard | **`ads-tracker` (this skill)** |
| Strategic review including SEO + Ads + GSC | `client-strategy-review` |

## Required inputs (ask user before starting)

1. **Client slug** (e.g. `virjee`, `core-advisors`). Check `Departments/Reporting/CLAUDE.md` slug table.
2. **Google Ads customer IDs** — one or more. Use `mcp__claude_ai_Pipeboard_Google_Ads__list_google_ads_customers` to find by client name.
3. **Lead-tracking Google Sheet(s)** — sheet IDs. Each sheet should have a raw "All Leads" tab (form submissions) and ideally an Enriched tab (or one can be created).
4. **Business units** — if the client has multiple (e.g. Virjee Dental + Virjee Local), name them. Single-unit clients skip this.
5. **Existing-practice classifier rule** — the column(s) and values that mark a high-value lead. Ask the user to confirm — defaults vary by industry. See `references/classifier-patterns.md`.
6. **Monthly existing-practice goal** — the number you're tracking toward (e.g. 20 for Virjee).

## Requirements

- Pipeboard Google Ads MCP connected (`mcp__claude_ai_Pipeboard_Google_Ads__*`).
- Composio Google Sheets toolkit (`GOOGLESHEETS_*`) for sheet reads/writes.
- Asana MCP for comments.
- `gh` CLI logged in to `markology-agency` for repo writes.

## Process

### Phase 1: Inspect the client's lead sheet structure

For each sheet provided:

1. `GOOGLESHEETS_GET_SHEET_NAMES` — confirm tab names. The raw source is typically the first tab (e.g. `All Leads - Dental`, `Local Leads-Raw`).
2. Read row 1 of the raw source (`GOOGLESHEETS_VALUES_GET` range `'Tab Name'!A1:AZ1`) — capture full column headers and indices.
3. Read 10-20 sample rows including the most recent. Look for:
   - Entry Date column index
   - Source column (e.g., "How Did You Hear About Us?")
   - Industry column (if multi-industry)
   - "Best Describes You" column (the strongest classifier signal)
   - Revenue/collections columns (alt classifier signals)
4. List the other tabs (Enriched, report tabs). Note column structure of the Enriched tab — the formulas in v2 report tabs reference these columns by letter.

Write a `references/[client]-schema.md` in the skill folder documenting the discovered structure (or save to memory as `project_[client]_leads_report_structure.md`).

### Phase 2: Confirm the existing-practice classifier with the user

Don't guess. Walk through the most recent ~10 rows and ask the user which are "existing" vs not. Codify the rule precisely. Common patterns:

- **Dental/Medical only:** Industry must be Dental/Medical/Vet AND Best Describes contains "own"/"owner" OR collections column filled. Excludes 1099, associates, startups, "in process".
- **Any business owner:** Best Describes contains "own"/"owner" OR business-revenue column filled.
- **Specific revenue threshold:** Only count if revenue field ≥ $400k or similar.

Document the final rule in code form (Python function) so the routine can reuse it verbatim. See `references/classifier-patterns.md` for examples.

### Phase 3: Build the Enriched tab pipeline

This is the data layer. The v2 report tabs (Leads by Month, Lead Source, Lead Type, etc.) reference an Enriched tab with normalized columns. Build that pipeline once, both manually now and in the daily routine prompt.

Standard Enriched schema:
- A: Entry Date (ISO `YYYY-MM-DD HH:MM:SS`)
- B: Year
- C: Month Key (`YYYY-MM`) — referenced by all COUNTIF formulas
- D-F: Full Name, Email, Phone
- G-L: Source, Industry Raw, Industry Grouped, Best Describes, Existing Practice (TRUE/FALSE as STRING), Source Form
- Column count varies by client; preserve any existing Enriched columns the v2 report formulas reference.

Rebuild flow:
1. Read raw + existing Enriched.
2. Preserve Enriched rows with Entry Date BEFORE the first raw-source row's date (pre-form-migration legacy data).
3. Build new rows from raw using the column mapping + classifier. Sort by Entry Date ascending.
4. Convert booleans to `'TRUE'` / `'FALSE'` strings (the v2 formulas check string match: `COUNTIFS(..., I:I, "TRUE")`).
5. `GOOGLESHEETS_CLEAR_VALUES` on rows beyond the new total (so old rows don't leak when count shrinks).
6. `GOOGLESHEETS_VALUES_UPDATE` `A1:[last col][n]` with `value_input_option=USER_ENTERED`.

### Phase 4: Build the dashboard HTML

Use the brand template. Reference: `references/dashboard-template.html` (Virjee version, copy and adapt).

Required sections:
1. **Hero** — Live Tracker pill, client name, lede, last-refreshed timestamp, toolbar links (Sheet, Google Ads UI)
2. **Goal tracker** — Current existing-practice count / goal, progress bar, blurb explaining what counts
3. **KPI strip (4 cards)** — Total leads MTD, Existing-practice leads MTD, Ads spend MTD, Ads conversions MTD. Each with delta vs prior month / pace.
4. **Account breakdown** — One card per Google Ads customer ID with key stats
5. **Charts row** — Monthly Leads (bar, Dental/Local or however the client is split) + Existing-Practice Leads (line, the prized segment trend)
6. **Active campaigns table** — All non-removed campaigns with last-30-day spend/conv/CPL
7. **Changes log timeline** — Chronological list of every campaign change (budget moves, negatives, pauses). Prepend new items.
8. **Anomaly log** — Empty state initially. Daily routine appends.
9. **Footer**

Build the file in `/tmp/pages-check/[client-slug]/ads-tracker/index.html`, commit, push.

### Phase 5: Update the client's hub landing page

If the client uses the `pages/[client]/` hub pattern (see `CLIENT_HUBS` in `scripts/build_reports_index.py`), update `pages/[client]/index.html` to include the ads-tracker as a "Cross-Account / Live Dashboard" card.

If the client is single-business-unit and currently has only monthly SEO reports at `pages/[client]/[month]/`, add a per-client `index.html` landing page (use `references/client-hub-template.html`) and add the client to `CLIENT_HUBS` in the script.

### Phase 6: Schedule the two routines

Use the `schedule` skill via Skill tool, or call `RemoteTrigger` directly.

**Routine 1 — Daily Google Ads check** (cron `0 22 * * *` = 8am Melbourne if Whitney is the client):
- MCP connections: Pipeboard-Google-Ads, Asana
- Repo source: `markology-agency/pages`
- Prompt template in `references/routine-ads-check-prompt.md`
- Tasks: pull yesterday's metrics, flag anomalies, update dashboard table + anomaly log, commit/push, Asana comment

**Routine 2 — Daily lead-sheet refresh** (cron `0 0 * * *` = 10am Melbourne):
- MCP connections: Google-Drive, Zapier (or Composio if available), Asana
- Repo source: `markology-agency/pages`
- Prompt template in `references/routine-leads-refresh-prompt.md`
- Tasks: rebuild Enriched from raw, refresh dashboard KPIs/charts, commit/push, Asana comment (throttled to Mondays + 1st of month)

Stagger by 2 hours so the second routine pulls --rebase before pushing.

### Phase 7: Save context to memory

Write `memory/project_[client]_ads_tracker.md`:
- Sheet IDs + first-tab names
- Existing-practice classifier rule (in code form)
- Google Ads customer IDs
- Routine IDs (trig_...)
- Goal metric for the current month
- Any client-specific quirks (e.g. trial-campaign quirks, conversion-tracking notes)

Add a pointer in `MEMORY.md`.

### Phase 8: Verify

1. Open the dashboard URL — check it renders, charts populate, numbers look right
2. Inspect the live Google Ads numbers vs what's on the dashboard
3. Look at one entry in the Asana task and confirm the comment posted (if the routine has fired yet)

## Key context to bake into routine prompts

Every routine prompt must include:
- Sheet IDs + exact tab names (not assumed — the user may have renamed)
- Column indices for raw source (Entry Date, Source, Best Describes, etc.)
- The existing-practice classifier rule in Python code form
- Hard exclusions ("I work as a 1099", "associate", "startup", "in process")
- The dashboard HTML element IDs the routine should update (`goal-current`, `goal-bar-fill`, `last-refresh`, etc.)
- Stagger / rebase instructions to avoid git conflicts between routines

## Anti-patterns (don't do these)

- **Don't guess the classifier.** Ask the user. Walk through actual rows. The classifier is the entire metric — getting it wrong invalidates the dashboard.
- **Don't fabricate historical numbers.** Pull real counts from the rebuilt Enriched. If a chart point is unknown, leave it null or mark it estimated.
- **Don't post daily Asana comments from both routines.** That's 2/day per task = 60/month. Throttle the lead-sheet routine to Mondays + 1st-of-month.
- **Don't put the dashboard at `pages/ads-tracker/` (root).** Always `pages/[client-slug]/ads-tracker/` so it's part of the client's hub.
- **Don't skip the per-client memory write.** The classifier rule is non-obvious and varies by client. Future sessions must not have to re-discover it.
