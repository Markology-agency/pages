---
name: client-strategy-review
description: End-to-end strategic audit for a Markology client. Pulls SEMrush rankings + YoY position movement, GSC organic data + CTR opportunities, Google Ads campaign performance + conversion-tracking audit, then ships a brand-templated HTML strategy memo to GitHub Pages plus a queued set of Asana tasks. Use when Whitney asks for a "strategy review", "deep dive", "audit", or pre-meeting prep on a specific client. Pattern proven on Core Advisors, Elevated Tax, Keen Capital (May 2026).
---

# Client Strategy Review

A repeatable workflow that turns raw data from four sources into a polished, brand-templated strategy memo at `markology-agency.github.io/pages/[client-slug]/[month]-strategy/` plus a populated Asana task queue ready for execution.

## When to invoke

- "Let's do a strategy review for [Client]"
- "Audit [Client] before tomorrow's meeting"
- "Strategy deep-dive on [Client]"
- "Pre-meeting prep on [Client]"
- Any time Whitney needs a polished client-facing deliverable + internal action list

## Required inputs (auto-discoverable)

Read first from `Clients/[Client Name]/CLAUDE.md` for: domain, audience, brand voice, target keywords, services, internal contact, compliance rules.

Then look up the rest:

| Input | Where to find it |
|---|---|
| Client slug | `Departments/Reporting/CLAUDE.md` slug table |
| Domain | Client CLAUDE.md or Reporting slug table |
| GA4 property ID | `Departments/Reporting/CLAUDE.md` GA table |
| Google Ads customer ID | GAQL: `SELECT customer_client.id, customer_client.descriptive_name FROM customer_client` against MCC `8210062698` |
| GSC property URL | List sites via `https://www.googleapis.com/webmasters/v3/sites` and pick the URL-prefix property (e.g. `https://elevatedtax.com/`) |
| SEMrush tracking project + campaign ID | `projects_research → list_projects` then `tracking_research → campaigns` for the project |
| Asana monthly board GID + section GIDs | `mcp__claude_ai_Asana__search_objects` for `[Client] - [Month] [Year]`, then `get_project` with `include_sections=true` |
| Asana Client custom field option GID | Global CLAUDE.md "Client custom field GID" table |

## Workflow

### Phase 1: Pull all data (fire in parallel)

1. **SEMrush current rankings** (`domain_organic`): `display_filter: +|Po|Lt|101`, sort by `tr_desc`, limit 50
2. **SEMrush historical rankings** (`domain_organic`): same params + `display_date: 20[YEAR-1]0515` to get rankings exactly 1 year ago
3. **SEMrush keyword history** (`domain_rank_history`): 12 monthly data points
4. **SEMrush top pages** (`domain_organic_unique`): top 25 pages by traffic
5. **SEMrush competitors** (`domain_organic_organic`): top 15 by relevance (may return "NOTHING FOUND" for very small domains)
6. **SEMrush position tracking** (`tracking_position_organic`): use the campaign ID from Phase 0, date_begin = campaign start (find via `tracking_campaign_dates`), date_end = today
7. **GSC monthly organic clicks**: 12 months of single-row queries (no dimensions) for trend chart
8. **GSC top pages last 90d**: dims=`["page"]`, row_limit=20 → identifies low-CTR opportunities
9. **GSC top non-branded queries last 90d**: dims=`["query"]`, row_limit=50, filter out brand terms
10. **Google Ads account info + conversion actions**: `SELECT customer.id, customer.descriptive_name, customer.auto_tagging_enabled, customer.conversion_tracking_setting...` and `SELECT conversion_action.id, conversion_action.name, conversion_action.status, conversion_action.category, conversion_action.primary_for_goal, conversion_action.include_in_conversions_metric FROM conversion_action`
11. **Google Ads campaigns 90d**: `SELECT campaign.name, campaign.advertising_channel_type, metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions, metrics.all_conversions FROM campaign WHERE segments.date BETWEEN '[90d ago]' AND '[today]' ORDER BY metrics.cost_micros DESC`
12. **Google Ads monthly trend 6mo**: `SELECT segments.month, metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions, metrics.all_conversions FROM customer WHERE segments.date BETWEEN '[6mo ago]' AND '[end of last month]'`
13. **Google Ads per-campaign per-conversion-action breakdown**: separate query for `SELECT campaign.name, segments.conversion_action_name, metrics.all_conversions FROM campaign` to expose tracking-mismatch issues (e.g., button clicks vs actual bookings)

### Phase 2: Build the YoY Movement table (the centerpiece)

Match current SEMrush rankings to historical (May 2025) for the strategically tracked keywords. Build a table with columns: `Keyword | Volume | May Last Year | This Month | Movement`. Highlight gains as `+N spots` or `NEW` (if not ranking 1 year ago). This is the report's strongest evidence and should be prominently featured.

### Phase 3: Write the HTML report

Save to `Drafts/[client-slug]-strategy/index.html`. Use the Markology brand template (Bangers + Inter fonts, palette: navy `#070630`, blue `#3872EB`, lilac `#E6E9FF`, paper `#F9F9FF`). Reference template: any existing report at `markology-agency.github.io/pages/[client]/may-2026-strategy/`.

Required sections in order:
1. **Hero**: positive headline, lede explaining the strategic story in 2-3 sentences (no em dashes ever)
2. **4 KPI cards**: Organic Clicks (current month from GSC), Total Keywords Ranking (SEMrush current), Avg Ranking Position (GSC monthly), Top Strategic Keyword Gain (largest YoY movement)
3. **Trajectory section**: 12-month organic clicks bar chart + 12-month avg position line chart (no GA sessions)
4. **What's Working** 3 story cards: pick the 3 strongest signals (e.g., +N spots gained, NEW keywords, position improvement)
5. **YoY Movement table**: the centerpiece, 10-13 strategic keywords with year-over-year position changes
6. **Next Unlock CTR table**: top 8-12 high-impression-low-CTR pages from GSC, with "+N clicks" upside column
7. **Google Ads section**: campaign performance comparison + conversion tracking audit findings
8. **Game Plan**: 6-7 numbered priorities, alternating plain/lilac backgrounds, with `This Week` / `30 Days` / `60 Days` tags
9. **New Plays**: 4 outside-the-box ideas as cards
10. **How We Measure This**: 3 forward-looking metrics (current → target)
11. **Footer**: navy background with closing line

### Phase 4: Quality checks

Before pushing, verify:
- **No em dashes** anywhere (`grep -n "—" file` returns nothing) — Markology rule
- **Positive framing** throughout (no "decline", "drop", "leak" framing — reframe as "opportunity")
- **No GA sessions data** in charts (use organic clicks instead — GA can be unreliable across clients)
- **All metrics traceable** to a real data source (anti-fabrication rule)
- **Brand voice match**: check the client CLAUDE.md and ensure tone matches (warm vs. authoritative vs. measured)
- **Compliance**: SEC for investment clients (no return promises), no "guaranteed" / "maximum" / specific outcome claims for tax/finance clients

### Phase 5: Publish to GitHub Pages

```
B64=$(base64 -i Drafts/[client-slug]-strategy/index.html | tr -d '\n')
gh api -X PUT repos/markology-agency/pages/contents/[client-slug]/[month-year]-strategy/index.html \
  -f message="[Client] [Month Year] strategy review" -f content="$B64"
gh api -X POST repos/markology-agency/pages/pages/builds
```

Live URL pattern: `https://markology-agency.github.io/pages/[client-slug]/[month-year]-strategy/`

### Phase 6: Create Asana tasks (one task per priority + each new play)

Per global CLAUDE.md Asana workflow:
1. Create on Master Client Tasks List (`1209521999646340`) → Queue section (`1212290286879699`)
2. Set all five required custom fields:
   - Status: Not Started (`1210841787749756`)
   - Dept: SEO/Writing/Ads/Strategy/Development as appropriate
   - Client: option GID for this client (lookup table in global CLAUDE.md)
   - Due date: matches WEEK section (Mon-Sun blocks)
   - Assignee: `me` (Whitney)
3. Then `update_tasks` with `add_projects` to add to client's monthly board WEEK section based on due date

Map due dates to WEEK sections:
- This week → WEEK 1
- 8-14 days out → WEEK 2
- 15-21 days out → WEEK 3
- 22-28 days out → WEEK 4
- 29+ days out → FUTURE

Task naming convention: `[Client]: [Action verb] [specific target]` (e.g., "Core Advisors: Push 'dental financial advisors' #8 → top 3").

Task notes should always include: the specific data point that triggered the task, the action steps, the expected outcome, and the priority tier.

## Output checklist

- [ ] Live URL at `markology-agency.github.io/pages/[client-slug]/[month-year]-strategy/` returns HTTP 200
- [ ] No em dashes in HTML
- [ ] YoY Movement table includes 8+ strategic keywords with positions for both periods
- [ ] Google Ads section shows campaign comparison + at least one tracking-issue finding
- [ ] 6-7 priorities created as Asana tasks on monthly board WEEK sections
- [ ] All Asana tasks have all 5 required custom fields set

## Common findings to watch for

These show up across nearly every Markology client. Don't miss them:

1. **Conversion tracking gaps** — exclude-from-conversions-metric checkbox is silently checked on enabled actions; campaigns optimize against the wrong signal. Always run the per-campaign per-action breakdown query.
2. **Button clicks tracked instead of real outcomes** — campaigns report "conversions" that are actually "clicked the Book a Call button," not "completed Calendly booking." Real outcome should be the conversion event.
3. **Massive low-CTR pages** — 3K to 100K monthly impressions on a page at 0.05 to 0.5% CTR. Title rewrite is the single highest-leverage move.
4. **Strategic local terms newly ranking** — geo+service queries that weren't in top 100 a year ago and now sit at #15-25. One push gets them on page 1.
5. **No UTM tracking on lead-capture links** — every booking, form submission, or call comes through with no source attribution. Fix this first or every other recommendation is unmeasurable.

## Past examples

| Client | URL | Date | Notes |
|---|---|---|---|
| Core Advisors | `/core-advisors/may-2026-strategy/` | 2026-05 | Pioneered the format. PMax tracking-issue finding shifted true CPA from $13.55 to $20-30 per actual booking |
| Elevated Tax | `/elevated-tax/may-2026-strategy/` | 2026-05 | First version emphasized wrong audience (dental), refocused on Missoula CPA YoY gains. 7 of 11 strategic terms NEW since May 2025 |
| Keen Capital | `/keen-capital/may-2026-strategy/` | 2026-05 | Added Chapin SC local pilot priority. Safe Withdrawal Rates page = 102K impressions at 0.02% CTR (single biggest CTR opportunity ever found) |

## What NOT to do

- Don't lead with the highest-impression blog if it's pulling the wrong audience (see Elevated Tax — dental distributions blog was getting 75K impressions but from dental owners, not Missoula small businesses)
- Don't include GA sessions data in the trajectory chart unless the client specifically wants it — organic clicks tell a cleaner story
- Don't focus on the negatives ("60% session drop") — reframe as opportunities ("recovery is the highest-leverage near-term move")
- Don't use em dashes anywhere — Markology brand rule
- Don't skip the conversion tracking audit — it's where most clients have hidden problems
- Don't produce keyword tables without YoY context — strategic keywords with movement data is what proves the work is compounding
