# Markology.io URL Fix, Handoff

**Cloud session:** `session_015APapaNqzwUn93EoWDFtae`
**Date:** 21 September 2026
**Status:** diagnosis complete and merged, execution blocked on network access

---

## Why this document exists

The cloud session that did the diagnosis runs behind an egress proxy that does not allow `markology.io`, so it could not push live changes. Everything below is ready to execute from a machine that can reach the site.

---

## The finding

markology.io migrated from Webflow to WordPress. The migration left three classes of broken URL signal. This is not a content problem and not a competition problem.

Evidence comes from the Google Search Console URL Inspection API, run against all 70 URLs Google has served for the property. These are Google's own reported states, not inferences.

### Bug 1: three articles redirect to the homepage

Someone searches, sees Markology, clicks, and lands on the homepage instead of the article they chose.

| URL | Impressions (16mo) | Clicks | Google canonical |
|---|---|---|---|
| `/post/facebook-vs-google-ads` | 11,717 | 25 | `/` |
| `/post/website-design-tips-for-accountants` | 11,657 | 5 | `/` |
| `/post/best-website-builder-for-accountants` | 8,949 | 13 | `/` |

**32,323 impressions and 43 clicks discarded.**

### Bug 2: a canonical pointing at a URL Google has never crawled

`/seo-for-accountants` is indexed and declares its canonical as `/seo-for-accountants/`. Search Console reports that second URL as **"URL is unknown to Google"**. Google ignores the instruction, keeps the old address indexed, and demotes it for the conflicting signal.

- 41,813 impressions, **0 clicks**, average position 63.8 over 16 months
- Held 12 keywords in search in the top 100 in September 2025
- Holds **0** today

### Bug 3: pages indexed at two addresses

Google treats each address as a separate page and splits every signal between them.

| Keep | Impressions | 301 from | Impressions |
|---|---|---|---|
| `/accounting-ads/` | 520 | `/accounting-ads` | 1,490 |
| `/about-us/` | 4 | `/about-us` | 897 |
| `/faqs/` | 3 | `/faqs` | 87 |
| `/ai-and-accountants/` | 10 | `/post/ai-and-accountants` | 2,599 |

In every pair the retired address carries more impressions than the live one.

### Also found

- **`/lite` is unknown to Google.** The landing page for a $1,599/mo product with paid campaigns pointed at it has never been crawled.
- **`/post/guide-to-marketing-for-accountants-in-2024`** holds 4,536 impressions and has no migrated version anywhere on the site.
- **Zero of the six primary keyword themes** named in `Clients/Markology/CLAUDE.md` are in the top 100.
- The sitemap still advertises retired addresses. Search Console lists `sitemap.xml` as a referring URL for pages that now redirect.

---

## The one decision that needs a human

`/seo-for-accountants` needs a canonical call. Two valid options, pick one:

**Option A.** Publish `/seo-for-accountants/` as a real page, link it from the nav and the sitemap, then 301 `/seo-for-accountants` onto it.

**Option B.** Leave the page where it is and change the declared canonical to `/seo-for-accountants`, the address Google already has indexed.

Both work. The current state, declaring a canonical to a URL that does not exist, is the only option that cannot.

---

## Execution order

Order matters. Elementor and WP Engine both cache aggressively.

1. **Republish the website builder article** at `/best-website-builder-for-accountants/`. It is the only P0 with a hard dependency, because step 2 has nowhere to land without it. Recover content from the old URL's cached version or the Webflow export.

2. **Load the redirect map.** All permanent 301s. Full list in `redirect-map.csv` next to this file.

   ```
   /post/facebook-vs-google-ads               -> /facebook-vs-google-ads/
   /post/website-design-tips-for-accountants  -> /website-design-tips-for-accountants/
   /post/best-website-builder-for-accountants -> /best-website-builder-for-accountants/
   /post/ai-and-accountants                   -> /ai-and-accountants/
   /accounting-ads                            -> /accounting-ads/
   /about-us                                  -> /about-us/
   /faqs                                      -> /faqs/
   /may-pricing                               -> /pricing
   ```

3. **Resolve the SEO page canonical** per the decision above.

4. **Make `/lite` crawlable.** Add to sitemap, link from nav and homepage.

5. **Decide on `/post/guide-to-marketing-for-accountants-in-2024`.** Migrate the article, or 301 to the closest live equivalent.

6. **Regenerate the sitemap** so it lists only live canonical URLs, then resubmit in Search Console.

7. **Flush caches in this exact order:** Elementor, then WP Engine, then Cloudflare.

   ```
   DELETE /wp-json/elementor/v1/cache
   then WP Engine object + page cache
   then Cloudflare purge
   ```

8. **Request reindexing** on the five P0 URLs in Search Console.

9. **Re-run the audit in 14 days** and confirm every coverage state changed.

---

## Landmines, from the Development department memory

- **`reference_markology_wpe_elementor_cache_flush_rest.md`** — REST edits to `_elementor_data` on markology.io save to the database but keep serving stale HTML. Two REST routes are needed to flush.
- **`feedback_rank_math_schema_edit_corrupts_elementor.md`** — HIGH RISK. Rank Math schema and canonical edits made from inside the Elementor editor can corrupt Elementor data. Surfaced on Adam Traywick, June 2026. Relevant to step 3.
- **`feedback_check_wp_app_password_role.md`** — the "markology api" app password user is often Contributor tier and cannot create pages. Check the role before step 1.
- **`reference_markology_wp_rest_access.md`** — how to make authenticated REST calls to markology.io. Lives in the `markology-memory` repo, not in `claude-code-whitney`.

Platform: WordPress on WP Engine, Elementor, behind Cloudflare.

---

## Already shipped

Merged to `Markology-agency/pages` on main:

| Path | What |
|---|---|
| `markology/sept-2026-strategy/` | Strategy memo, rewritten around the migration root cause |
| `markology/url-fix-2026-09/index.html` | The fix sheet, all 70 URLs audited |
| `markology/url-fix-2026-09/redirect-map.csv` | Machine readable redirect map |
| `markology/url-fix-2026-09/HANDOFF.md` | This file |

PRs: #47 (first memo), #48 (rewrite), #49 (fix sheet).

Also created, and needs revisiting: Asana project **Markology - Agency Growth (Sept-Nov 2026)**, GID `1218715209439294`. Its task list predates the migration finding and is now stale. Markology's real Asana Client GID is `1213234187840352`.

---

## Copy rules that apply to anything written for Markology

From `Clients/Markology/CLAUDE.md`, enforced site-wide:

1. Always pair "Google and AI search". Never describe visibility on only one.
2. No em dashes anywhere.
3. No ranking language. Lead with being found, recommended or chosen. Use "keywords in search" for factual SEMrush data.
4. No "shipped" in client-facing copy. Use Completed, Done, Live, Published.
5. Use the % symbol, never the word.
6. Display font is Anton. Bangers is retired.
7. Never leave Asana comments. Update the notes field instead.

Note: `Departments/Reporting/CLAUDE.md` still says Bangers and needs updating.

---

## Open caveats

- **Meta ads are unverified.** `Clients/Markology/CLAUDE.md` records active campaigns for Markology LITE and the Claude Marketing Course. The connected Meta user sees only four client ad accounts and no Markology one. Google Ads shows no spend. Someone should check Ads Manager directly.
- **GSC property mismatch.** The brand file says to use `sc-domain:markology.io`. That property is not on the connected OAuth account, which has only the two URL-prefix properties. All data here came from `https://www.markology.io/`, which excludes non-www and subdomains.
- **Query-level click data is partial.** Google withholds rare queries, so named-query rows cover 56 of 114 total clicks in the 90-day window. The non-branded finding survives the worst case: even if every unattributed click were non-branded, the rate is 0.375%.
- **`claude-code-whitney` main is stale.** Main sits at June 24 with 657 files. Current state is on branch `snapshot-2026-09-21` with 6,219 files. A session starting on main gets three-month-old context and will miss `Clients/Markology/Outreach/`.
