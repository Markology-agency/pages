// sba-page.jsx — SBA Loan Support service page
// Thompson Flaherty CPA — TF design tokens, tf-header, shared.jsx required.

function SBAPage({ tweaks = {} }) {
  const accent = tweaks.accent || '#A42223';

  return (
    <div style={{ background: TF.paper, fontFamily: FONT_BODY, color: TF.inkSoft,
                  width: '100%', '--accent': accent }}>
      <TFHeader />
      <SBAHero accent={accent} />
      <SBAPainSection accent={accent} />
      <SBAServicesSection accent={accent} />
      <SBAProcessSection accent={accent} />
      <SBAWhySection accent={accent} />
      <SBACTASection accent={accent} />
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────
function SBAHero({ accent }) {
  return (
    <div style={{ padding: '80px 56px 72px', background: TF.paper,
                  borderBottom: `1px solid ${TF.border}` }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 12, fontWeight: 600,
                      letterSpacing: '0.18em', textTransform: 'uppercase',
                      color: TF.inkMute, marginBottom: 24 }}>
          <a href="https://thompsonflaherty.com" style={{ color: TF.inkSoft, textDecoration: 'none' }}>
            Thompson Flaherty
          </a>
          {' › SBA Loan Support'}
        </div>

        <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700,
                     fontSize: 'clamp(36px, 5.5vw, 56px)', lineHeight: 1.06,
                     letterSpacing: '-0.022em', color: TF.ink,
                     margin: '0 0 28px', maxWidth: 820 }}>
          SBA loan financials that{' '}
          <em style={{ fontStyle: 'normal', color: accent }}>
            underwriters do not send back.
          </em>
        </h1>

        <p style={{ fontSize: 18, lineHeight: 1.6, color: TF.inkSoft,
                    maxWidth: 660, margin: '0 0 28px' }}>
          Most SBA files get stuck because the financials look improvised. We build the package the way lenders want it. The first time.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36, maxWidth: 600 }}>
          {[
            'CPA-prepared financial statements (compiled, reviewed, or audited)',
            'Cash flow projections in the format SBA underwriters expect',
            'Three years of tax returns reconciled to your books, line by line',
            'Direct communication with your lender during underwriting',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <span style={{ width: 20, height: 20, borderRadius: 999, background: accent,
                             display: 'flex', alignItems: 'center', justifyContent: 'center',
                             flexShrink: 0, marginTop: 2 }}>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4l2.5 2.5L9 1" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span style={{ fontFamily: FONT_BODY, fontSize: 16, color: TF.ink, lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>

        <a href="https://thompsonflaherty.com/contact/"
           style={{ background: accent, color: '#fff', textDecoration: 'none',
                    padding: '16px 28px', borderRadius: 999,
                    fontFamily: FONT_BODY, fontWeight: 600, fontSize: 15,
                    display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          Talk to us about your SBA loan
          <span style={{ display: 'inline-flex' }}>{Icons.arrowUR}</span>
        </a>
      </div>
    </div>
  );
}

// ── Pain ──────────────────────────────────────────────────────────────────
const PAIN_ITEMS = [
  { num: '01',
    title: 'Underwriters want CPA-prepared statements, not a QuickBooks export.',
    body: 'Lenders need financials with a CPA\'s name on them, prepared to a recognized standard. A PDF straight out of QuickBooks looks fine to you, but it does not check the box the underwriter is looking at.' },
  { num: '02',
    title: 'Cash flow projections come back with red marks.',
    body: 'Banks have a format they expect. Twelve or twenty-four months out, broken down by month, with assumptions documented underneath. If the projection looks improvised or the numbers do not tie back to your last twelve months, the file slows down.' },
  { num: '03',
    title: 'Three years of tax returns have to reconcile to your books.',
    body: 'Underwriters cross-check your tax returns against the financial statements you submit. Small inconsistencies read as red flags, even when nothing is actually wrong.' },
  { num: '04',
    title: 'The clock is running while you are still running the business.',
    body: 'Most SBA applications come with a real deadline behind them: a property under contract, an acquisition closing, equipment that needs to be ordered. Doing the financial prep yourself on nights and weekends usually means missing the timeline or sending in something half-finished.' },
];

function SBAPainSection({ accent }) {
  return (
    <div style={{ background: TF.surface, padding: '88px 56px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700,
                     fontSize: 'clamp(28px, 3.6vw, 38px)', lineHeight: 1.14,
                     letterSpacing: '-0.012em', color: TF.ink,
                     margin: '0 0 16px', maxWidth: 760 }}>
          Where SBA applications usually get stuck.
        </h2>
        <p style={{ fontSize: 17, color: TF.inkSoft, maxWidth: 640,
                    margin: '0 0 36px', lineHeight: 1.6 }}>
          The same four issues cause most SBA delays. Here is where files slow down.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {PAIN_ITEMS.map((p, i) => (
            <div key={i} style={{ background: TF.paper, borderRadius: 16, padding: '28px 24px',
                                  border: `1px solid ${TF.border}`, boxShadow: TF.shadow,
                                  display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 12, fontWeight: 700,
                            letterSpacing: '0.18em', textTransform: 'uppercase',
                            color: accent }}>
                {p.num}
              </div>
              <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 17,
                            color: TF.ink, letterSpacing: '-0.008em', lineHeight: 1.25 }}>
                {p.title}
              </div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 14, lineHeight: 1.6,
                            color: TF.inkSoft }}>
                {p.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Services ──────────────────────────────────────────────────────────────
const SERVICE_ROWS = [
  { num: '01', label: 'Financial statements',
    title: 'CPA-prepared financials that satisfy the underwriter on the first pass.',
    lead: 'Compiled, reviewed, or audited based on what your lender requires.',
    bullets: [
      'Balance sheet, income statement, cash flow statement',
      'Issued under our CPA firm letter',
      'Books cleanup included if needed',
    ]},
  { num: '02', label: 'Cash flow projections',
    title: 'Projections built to lender standards, not invented in a spreadsheet.',
    lead: '12 or 36-month projections in the exact format SBA underwriters expect.',
    bullets: [
      'Monthly breakdowns with documented assumptions',
      'Ratio analysis where lenders look for it',
      'Numbers that tie back to your last 12 months',
    ]},
  { num: '03', label: 'Tax return package',
    title: 'Three years of returns reconciled to your financials, line by line.',
    lead: 'We cross-check every return against the statements going into the package.',
    bullets: [
      'Business and personal returns reviewed',
      'Discrepancies flagged and explained',
      'Amendments handled in-scope if needed',
    ]},
];

function SBAServicesSection({ accent }) {
  return (
    <div style={{ padding: '88px 56px', background: TF.paper }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700,
                     fontSize: 'clamp(28px, 3.6vw, 38px)', lineHeight: 1.14,
                     letterSpacing: '-0.012em', color: TF.ink,
                     margin: '0 0 16px', maxWidth: 760 }}>
          What we put together for you.
        </h2>
        <p style={{ fontSize: 17, color: TF.inkSoft, maxWidth: 640,
                    margin: '0 0 40px', lineHeight: 1.6 }}>
          Tailored to your loan type, lender, and timeline. These three deliverables are the core of every package.
        </p>

        {SERVICE_ROWS.map((s, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '220px 1fr', gap: 56,
            padding: '36px 0', borderTop: `1px solid ${TF.border}`,
            ...(i === SERVICE_ROWS.length - 1 ? { borderBottom: `1px solid ${TF.border}` } : {})
          }}>
            <div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 12, fontWeight: 700,
                            letterSpacing: '0.18em', textTransform: 'uppercase',
                            color: accent, marginBottom: 6 }}>
                {s.num}
              </div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 13, fontWeight: 600,
                            letterSpacing: '0.1em', textTransform: 'uppercase',
                            color: TF.inkSoft }}>
                {s.label}
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 20, fontWeight: 600,
                           color: TF.ink, margin: '0 0 14px', letterSpacing: '-0.006em',
                           lineHeight: 1.3 }}>
                {s.title}
              </h3>
              <p style={{ fontFamily: FONT_BODY, fontSize: 15.5, color: TF.inkSoft,
                          margin: '0 0 14px', lineHeight: 1.5 }}>
                {s.lead}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {s.bullets.map((b, bi) => (
                  <div key={bi} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: 999,
                                   background: accent, flexShrink: 0 }}></span>
                    <span style={{ fontFamily: FONT_BODY, fontSize: 14.5,
                                   color: TF.ink }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Process ──────────────────────────────────────────────────────────────
const PROCESS_STEPS = [
  { num: '01', title: 'Discovery call',
    body: 'Tell us the loan type, the lender, the size, and the deadline. We will walk through what the bank is going to ask for and which pieces of the package matter most for your file. No charge for the call.' },
  { num: '02', title: 'Build the package',
    body: 'We pull what we need from your books, financials, and tax returns, clean up anything that needs cleaning up, and prepare the three deliverables to lender format. You see drafts before anything goes out.' },
  { num: '03', title: 'Submission and underwriting',
    body: 'When the package goes to the bank, we stay on call. If the underwriter has questions or needs something restated, we handle that conversation directly with the lender so you do not have to translate.' },
];

function SBAProcessSection({ accent }) {
  return (
    <div style={{ background: TF.surface, padding: '88px 56px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700,
                     fontSize: 'clamp(28px, 3.6vw, 38px)', lineHeight: 1.14,
                     letterSpacing: '-0.012em', color: TF.ink,
                     margin: '0 0 16px', maxWidth: 760 }}>
          How the engagement runs.
        </h2>
        <p style={{ fontSize: 17, color: TF.inkSoft, maxWidth: 640,
                    margin: '0 0 36px', lineHeight: 1.6 }}>
          Most packages are done in two to four weeks.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {PROCESS_STEPS.map((s, i) => (
            <div key={i} style={{ background: TF.paper, borderRadius: 16, padding: '32px 28px',
                                  border: `1px solid ${TF.border}`, boxShadow: TF.shadow }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 44, fontWeight: 700,
                            color: accent, lineHeight: 1, letterSpacing: '-0.02em',
                            marginBottom: 18 }}>
                {s.num}
              </div>
              <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 19, fontWeight: 600,
                           color: TF.ink, margin: '0 0 10px', letterSpacing: '-0.005em',
                           lineHeight: 1.25 }}>
                {s.title}
              </h3>
              <p style={{ fontFamily: FONT_BODY, fontSize: 15, lineHeight: 1.6,
                          color: TF.inkSoft, margin: 0 }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Why CPA ──────────────────────────────────────────────────────────────
function SBAWhySection({ accent }) {
  const WHY_POINTS = [
    { title: 'SBA underwriting is a paper exercise.',
      body: 'The underwriter has never met you. They look at documents. A CPA signature puts your file in a different pile.' },
    { title: 'We work across Metro East IL, St. Louis, and Chicago.',
      body: "Dozens of SBA loans completed. We know what each region's lenders flag, and we build the package around it." },
    { title: '2 to 4 weeks is typical, not 4 months.',
      body: 'Files drag when the financials are not right. We make sure nothing in the package gives the underwriter a reason to slow down.' },
    { title: 'Clean books come first.',
      body: <span>Our <a href="https://thompsonflaherty.com/accounting/" style={{ color: accent, textDecoration: 'none', fontWeight: 600 }}>accounting and bookkeeping</a> is where most SBA engagements start. Every loan package is built on top of clean books.</span> },
  ];
  return (
    <div style={{ padding: '88px 56px', background: TF.paper }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700,
                     fontSize: 'clamp(28px, 3.6vw, 38px)', lineHeight: 1.14,
                     letterSpacing: '-0.012em', color: TF.ink,
                     margin: '0 0 48px', maxWidth: 760 }}>
          Why it matters that a CPA prepares this.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {WHY_POINTS.map((p, i) => (
            <div key={i} style={{ background: TF.surface, borderRadius: 16, padding: '28px 28px',
                                  border: `1px solid ${TF.border}` }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 17,
                            color: TF.ink, marginBottom: 8, letterSpacing: '-0.008em',
                            lineHeight: 1.25 }}>
                {p.title}
              </div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 15, lineHeight: 1.6,
                            color: TF.inkSoft }}>
                {p.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── CTA ──────────────────────────────────────────────────────────────────
function SBACTASection({ accent }) {
  return (
    <div style={{ background: accent, padding: '96px 56px', textAlign: 'center' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700,
                     fontSize: 'clamp(28px, 3.6vw, 38px)', lineHeight: 1.14,
                     letterSpacing: '-0.012em', color: '#fff',
                     margin: '0 auto 16px', maxWidth: 680, textAlign: 'center' }}>
          Got an SBA loan in the pipeline?
        </h2>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.82)', lineHeight: 1.6,
                    maxWidth: 480, margin: '0 auto 36px', textAlign: 'center' }}>
          Tell us your loan type, lender, and deadline. We will tell you exactly what you need.
        </p>
        <a href="https://thompsonflaherty.com/contact/"
           style={{ background: '#fff', color: accent, textDecoration: 'none',
                    padding: '16px 30px', borderRadius: 999,
                    fontFamily: FONT_BODY, fontWeight: 700, fontSize: 15,
                    display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          Schedule your consultation
          <span style={{ display: 'inline-flex', color: accent }}>{Icons.arrowUR}</span>
        </a>
      </div>
    </div>
  );
}

Object.assign(window, { SBAPage });
