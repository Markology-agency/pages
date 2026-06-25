// industry-page.jsx — Industry landing page template (Medical/Dental shown).
// Variant-A visual language, white base with #F6F6F6 accent sections.
// Copy reflects Thompson Flaherty's real positioning (thompsonflaherty.com +
// the Medical & Dental deck): year-round tax strategy for high-earning practices.
// Industry copy lives in data blocks so new industries are a content swap.

const _IND = (typeof window !== 'undefined' && window.INDUSTRY) || {};
const _NOUN = _IND.noun || 'practice';

const MEDICAL_COPY = _IND.copy || {
  practical: {
    eyebrow: 'For Medical & Dental Practices',
    headline: <>Accounting, bookkeeping &amp; tax for <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>medical &amp; dental practices</em>.</>,
    sub: 'Accounting, payroll, and tax strategy built around QBI, equipment depreciation, and the realities of a high-income practice. You get a dedicated CPA who knows your numbers all year, not just in April.',
    ctaPrimary: 'Schedule Your Consultation',
    painTitle: 'What we solve for you',
    painLead: 'The challenges high-earning practices actually face.',
    processTitle: 'How working together begins',
    teamTitle: "Who you'll work with",
  },
  outcome: {
    eyebrow: 'For Medical & Dental Practices',
    headline: <>Keep more of what your <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>practice</em> earns.</>,
    sub: 'A profitable practice pushes you into top brackets, self-employment tax, and QBI phase-outs. We plan all year, structuring your income, comp, and equipment purchases so you stop overpaying every April.',
    ctaPrimary: 'Schedule Your Consultation',
    painTitle: 'The hidden cost of waiting until April',
    painLead: 'Without proactive planning, a strong year quietly becomes a big tax bill.',
    processTitle: <>From first call to<br/>year-round partner</>,
    teamTitle: 'Talk to a dedicated CPA, not a call center',
  },
};

const TRUST = _IND.trust || [
  '3,000+ businesses served',
  'Best Accountants Finalist',
  'AICPA Member Firm',
  'QuickBooks Certified ProAdvisor',
  '100% IRS audit success',
];

const PAIN_POINTS = _IND.pain || [
  { title: 'QBI phase-out cliffs',
    body: 'As a specified service business, your 20% QBI deduction phases out fast, and your comp and entity choices decide how much you actually keep.' },
  { title: 'Heavy tax exposure',
    body: 'Self-employment tax plus top federal and state brackets land hard on strong practice income. Proactive structuring is the only lever that moves the number.' },
  { title: 'Expensive equipment',
    body: 'Imaging, chairs, operatories, and IT are major purchases. How you time them and depreciate them, with Section 179 and bonus, drives what they really cost you.' },
  { title: 'Payroll & associate comp',
    body: 'Staff payroll, associate models, and retirement plans all have to be structured well. Done wrong, they quietly cost you every pay run.' },
];

const SERVICES = _IND.services || [
  { icon: 'ledger', name: 'Accounting', lead: 'Practice financials you can actually use.',
    href: 'https://thompsonflaherty.com/accounting/',
    points: ['Monthly close with provider-level P&L', 'Production vs. collections reporting', 'CFO-level benchmarking & advisory'] },
  { icon: 'layers', name: 'Bookkeeping', lead: 'Clean, reconciled books every month.',
    href: 'https://thompsonflaherty.com/bookkeeping/',
    points: ['Insurance reimbursement reconciliation', 'Up-to-date books by the 10th', 'Audit-ready records year-round'] },
  { icon: 'payroll', name: 'Managed Payroll', lead: 'Your team, paid right, on time.',
    href: 'https://thompsonflaherty.com/payroll/',
    points: ['Full-service payroll runs & filings', 'Associate, hygienist & bonus handling', 'Owner retirement-plan contributions'] },
  { icon: 'tax', name: 'Tax', lead: 'Planning all year, not just April.',
    href: 'https://thompsonflaherty.com/tax-individual/',
    points: ['Protect your QBI deduction', 'Section 179 & bonus depreciation timing', 'S-corp & PTE strategy to beat the SALT cap'] },
];

const COMPARE_USED = _IND.compareUsed || [
  'Only hearing from your CPA at tax time',
  "Outdated or messy books you can't trust",
  'Slow responses, or no answers at all',
  'Tax prep only, with zero real planning',
  'Feeling like just another number on a list',
];
const COMPARE_WITH = _IND.compareWith || [
  'Year-round communication and proactive check-ins',
  'Clean, reconciled books every single month',
  'Fast replies by email, text, or phone',
  'Tax strategy that starts now, not in April',
  `A dedicated CPA who knows your name and your ${_NOUN}`,
];

const PROCESS = _IND.process || [
  { title: 'Free intro call', body: "Tell us about the practice and your goals. No pressure and no commitment, just a real conversation.", meta: 'Step 1' },
  { title: 'We review your numbers', body: 'We dig into your books, payroll, and prior returns, then show you exactly where we can help.', meta: 'Step 2' },
  { title: 'We take the wheel', body: 'We transition your accounts, clean things up, and put reliable systems in place. Fast.', meta: 'Step 3' },
  { title: 'Year-round partnership', body: "Proactive planning, fast answers, and ongoing advisory. We're in your corner all year.", meta: 'Ongoing' },
];

const TEAM = [
  { name: 'Tyler Hawkins, CPA', role: 'Senior Certified Public Accountant', key: 'teamTyler', photo: 'assets/team-tyler.jpeg' },
  { name: 'Kelly Flaherty, CPA', role: 'Senior Certified Public Accountant', key: 'teamKelly', photo: 'assets/team-kelly.jpeg' },
  { name: 'Jim Klostermann', role: 'Senior Tax Accountant', key: 'teamJim', photo: 'assets/team-jim.jpeg' },
  { name: 'Christian Kimble, CPA', role: 'Certified Public Accountant', key: 'teamChristian', photo: 'assets/team-christian.jpeg' },
];

const INDUSTRY_FAQS = _IND.faqs || [
  { q: 'Do you work with practices outside Illinois?',
    a: "Yes. We're based in Edwardsville with a Chicago office, and we serve practices across the Metro East, St. Louis, Chicago, and nationwide through virtual CPA services." },
  { q: 'We already have a bookkeeper. Can you just do tax?',
    a: 'Absolutely. Many practices keep their in-house bookkeeper and use us for review, tax planning, and filing. We work alongside your team, not instead of it.' },
  { q: 'What does this cost?',
    a: "Our pricing reflects the strategy and care we bring to every client. Basic returns start at $550; ongoing practice engagements (books, payroll, and tax) are quoted after a quick review of your numbers, with clear pricing and no hourly surprises." },
  { q: 'How is this different from a big, high-volume tax shop?',
    a: "We're not a volume shop. Every client works directly with a dedicated CPA who handles both the tax work and the year-round advice, not a call center, and not a different person every time." },
  { q: 'How fast can we switch?',
    a: 'Most practices are fully transitioned in a few weeks. Mid-year switches are fine; we routinely pick up books partway through the year.' },
];

// ── Shared bits ──────────────────────────────────────────────────────────────

function SectionHead({ accent, eyebrow, title, lead, center, maxTitle = 620, nowrap }) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left', marginBottom: 44 }}>
      <PillEyebrow accent={accent}>{eyebrow}</PillEyebrow>
      <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 40, lineHeight: 1.08,
                   letterSpacing: '-0.018em', margin: center ? '16px auto 12px' : '16px 0 12px',
                   color: TF.ink, maxWidth: maxTitle, whiteSpace: nowrap ? 'nowrap' : 'normal' }}>
        {title}
      </h2>
      {lead && (
        <p style={{ fontFamily: FONT_BODY, fontSize: 16.5, color: TF.inkSoft, maxWidth: 540,
                    margin: center ? '0 auto' : 0, lineHeight: 1.55 }}>
          {lead}
        </p>
      )}
    </div>
  );
}

// ── Sections ───────────────────────────────────────────────────────────────

function IndustryHero({ accent, copy }) {
  return (
    <div style={{ padding: '60px 56px 56px', position: 'relative', overflow: 'hidden',
                  backgroundImage: `url(${(window.__resources && window.__resources.heroStripe) || 'assets/hero-stripe.png'})`,
                  backgroundRepeat: 'no-repeat', backgroundPosition: 'right top', backgroundSize: 'cover' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.02fr 0.98fr', gap: 56, alignItems: 'center' }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <PillEyebrow accent={accent}>{copy.eyebrow}</PillEyebrow>
          <h1 style={{
            fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 58, lineHeight: 1.04,
            letterSpacing: '-0.024em', margin: '20px 0 22px', color: TF.ink,
          }}>
            {copy.headline}
          </h1>
          <p style={{ fontFamily: FONT_BODY, fontSize: 19, lineHeight: 1.55, color: TF.inkSoft,
                      maxWidth: 520, marginBottom: 32 }}>
            {copy.sub}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
            <a href="https://thompsonflaherty.com/contact/" style={{
              background: accent, color: '#fff', border: 'none', padding: '16px 26px',
              borderRadius: 999, fontFamily: FONT_BODY, fontWeight: 600, fontSize: 15,
              display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer',
              textDecoration: 'none',
            }}>
              {copy.ctaPrimary}
              <span style={{ display: 'inline-flex' }}>{Icons.arrowUR}</span>
            </a>
            <span style={{ fontFamily: FONT_BODY, fontSize: 14.5, color: TF.inkSoft }}>
              or call <a href="tel:+16186566010" style={{ color: TF.ink, fontWeight: 600, textDecoration: 'none' }}>(618) 656-6010</a>
            </span>
          </div>
        </div>

        {/* Hero image */}
        <div style={{ position: 'relative' }}>
          <image-slot id="industry-hero" shape="rounded" radius="20"
                      src={_IND.heroPhoto || (window.__resources && window.__resources.heroPhoto) || "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80"}
                      placeholder="Drop a practice photo (waiting room, team, chairside)"
                      style={{ width: '100%', height: 540, display: 'block',
                               WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%), linear-gradient(to left, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
                               WebkitMaskComposite: 'intersect',
                               maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%), linear-gradient(to left, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
                               maskComposite: 'intersect',
                               borderRadius: 0 }}></image-slot>
          <div style={{
            position: 'absolute', left: -20, bottom: 28, zIndex: 2, background: '#fff',
            borderRadius: 14, padding: '15px 19px', border: `1px solid ${TF.border}`,
            boxShadow: TF.shadowLg, display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <span style={{ width: 40, height: 40, borderRadius: 10, background: TF.redWash,
                           color: accent, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              {Icons.check}
            </span>
            <div>
              <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 16, color: TF.ink }}>
                {(_IND.heroBadge && _IND.heroBadge.title) || 'Books closed by the 10th'}
              </div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: TF.inkMute }}>
                {(_IND.heroBadge && _IND.heroBadge.sub) || 'Every month. In writing.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrustStrip({ accent }) {
  return (
    <div style={{ borderTop: `1px solid ${TF.border}`, borderBottom: `1px solid ${TF.border}`,
                  padding: '20px 56px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexWrap: 'wrap',
                    alignItems: 'center', justifyContent: 'space-between', gap: 18 }}>
        {TRUST.map((t, i) => (
          <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 9,
                                fontFamily: FONT_BODY, fontSize: 13.5, fontWeight: 600, color: TF.inkSoft }}>
            <span style={{ color: accent, display: 'inline-flex' }}>{Icons.star}</span>
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

function PainSection({ accent, copy }) {
  return (
    <div style={{ background: TF.surface, padding: '80px 56px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <SectionHead accent={accent} eyebrow="What we solve" title={copy.painTitle} lead={copy.painLead} maxTitle={900} nowrap />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {PAIN_POINTS.map((p, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 16, padding: '28px 24px',
                                  border: `1px solid ${TF.border}`, boxShadow: TF.shadow,
                                  display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: accent + '14',
                            color: accent, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 16, flexShrink: 0 }}>
                {i + 1}
              </div>
              <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 17, color: TF.ink,
                            letterSpacing: '-0.008em', lineHeight: 1.2 }}>
                {p.title}
              </div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 14, lineHeight: 1.6, color: TF.inkSoft }}>
                {p.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServicesSection({ accent }) {
  return (
    <div style={{ padding: '88px 56px', background: TF.paper }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <SectionHead accent={accent} center eyebrow="What we do"
          title="One firm for the whole financial back office."
          lead={`Four services, one team, one monthly rhythm, all built around how your ${_NOUN} actually runs.`} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {SERVICES.map((s, i) => (
            <div key={i} style={{ background: TF.surface, borderRadius: 20, padding: '30px 26px',
                                  border: `1px solid ${TF.border}`, display: 'flex', flexDirection: 'column' }}>
              <span style={{ width: 48, height: 48, borderRadius: 12, background: '#fff',
                             border: `1px solid ${TF.border}`, color: accent, marginBottom: 20,
                             display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                {Icons[s.icon]}
              </span>
              <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 22, color: TF.ink,
                            letterSpacing: '-0.012em', marginBottom: 6 }}>
                {s.name}
              </div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 14, color: TF.inkSoft, marginBottom: 18 }}>
                {s.lead}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {s.points.map((pt, j) => (
                  <div key={j} style={{ display: 'flex', gap: 9, alignItems: 'flex-start',
                                        fontFamily: FONT_BODY, fontSize: 13, lineHeight: 1.45, color: TF.ink }}>
                    <span style={{ color: accent, display: 'inline-flex', flexShrink: 0, marginTop: 1 }}>
                      {Icons.check}
                    </span>
                    {pt}
                  </div>
                ))}
              </div>
              <a href={s.href} target="_blank" rel="noopener noreferrer" style={{
                marginTop: 'auto', paddingTop: 20, display: 'inline-flex', alignItems: 'center', gap: 7,
                fontFamily: FONT_BODY, fontSize: 13.5, fontWeight: 600, color: accent, textDecoration: 'none',
              }}>
                Learn more
                <span style={{ display: 'inline-flex' }}>{Icons.arrowUR}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CompareSection({ accent }) {
  const Col = ({ title, items, on }) => (
    <div style={{ flex: 1, background: on ? accent : '#fff', borderRadius: 20, padding: '32px 32px 36px',
                  border: `1px solid ${on ? accent : TF.border}`, boxShadow: on ? TF.shadowLg : TF.shadow }}>
      <div style={{ fontFamily: FONT_BODY, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em',
                    textTransform: 'uppercase', color: on ? 'rgba(255,255,255,0.55)' : TF.inkMute, marginBottom: 18 }}>
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start',
                                fontFamily: FONT_BODY, fontSize: 15, lineHeight: 1.45,
                                color: on ? '#fff' : TF.inkSoft }}>
            <span style={{ width: 22, height: 22, borderRadius: 999, flexShrink: 0, marginTop: 1,
                           display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                           background: on ? 'rgba(255,255,255,0.22)' : 'rgba(75,48,21,0.06)', color: on ? '#fff' : TF.inkMute }}>
              {on ? <Icon d="M5 12l4 4 10-10" size={13} sw={2.2} /> : <Icon d="M6 6l12 12M18 6 6 18" size={12} sw={2} />}
            </span>
            {it}
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <div style={{ background: TF.surface, padding: '88px 56px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionHead accent={accent} center eyebrow="The difference"
          title="We do things differently than most accountants."
          lead="Most firms are built around volume. File the return, move on, repeat. Here's what you get with us instead." />
        <div style={{ display: 'flex', gap: 20, alignItems: 'stretch' }}>
          <Col title="What you're used to" items={COMPARE_USED} on={false} />
          <Col title="With Thompson Flaherty" items={COMPARE_WITH} on={true} />
        </div>
      </div>
    </div>
  );
}

function ProcessSection({ accent, copy }) {
  return (
    <div style={{ padding: '88px 56px', background: TF.paper }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', display: 'grid',
                    gridTemplateColumns: '0.85fr 1.15fr', gap: 80 }}>
        <div>
          <PillEyebrow accent={accent}>Getting started</PillEyebrow>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 40, lineHeight: 1.08,
                       letterSpacing: '-0.018em', margin: '16px 0 16px', color: TF.ink }}>
            {copy.processTitle}
          </h2>
          <p style={{ fontFamily: FONT_BODY, fontSize: 16, lineHeight: 1.6, color: TF.inkSoft, maxWidth: 380 }}>
            The first call is completely free, with zero pressure and zero obligation. Just a straight, honest read on your {_NOUN}.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {PROCESS.map((p, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '44px 1fr 90px', gap: 16,
                                  alignItems: 'start', padding: '22px 0',
                                  borderBottom: i < PROCESS.length - 1 ? `1px solid ${TF.border}` : 'none' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: TF.surface,
                            border: `1px solid ${TF.border}`, display: 'flex', alignItems: 'center',
                            justifyContent: 'center', fontFamily: FONT_DISPLAY, fontWeight: 700,
                            fontSize: 18, color: accent }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div>
                <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 17, color: TF.ink, marginBottom: 4 }}>
                  {p.title}
                </div>
                <div style={{ fontFamily: FONT_BODY, fontSize: 14.5, lineHeight: 1.55, color: TF.inkSoft }}>
                  {p.body}
                </div>
              </div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 12, fontWeight: 600, color: TF.inkMute,
                            letterSpacing: '0.06em', textTransform: 'uppercase', justifySelf: 'end',
                            paddingTop: 4 }}>
                {p.meta}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TeamSection({ accent, copy }) {
  return (
    <div style={{ background: TF.surface, padding: '88px 56px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <SectionHead accent={accent} eyebrow="The team" title={copy.teamTitle} nowrap maxTitle={820}
          lead="You'll work directly with the same CPA every time, someone who actually knows your numbers, your goals, and your industry." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {TEAM.map((m, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 18, border: `1px solid ${TF.border}`,
                                  boxShadow: TF.shadow, padding: '26px 16px', textAlign: 'center' }}>
              <image-slot id={`team-${i}`} shape="circle"
                          src={(window.__resources && window.__resources[m.key]) || m.photo}
                          placeholder={m.name.split(',')[0]}
                          style={{ width: 104, height: 104, display: 'block', margin: '0 auto 16px' }}></image-slot>
              <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 16.5, color: TF.ink,
                            letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                {m.name}
              </div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 11, fontWeight: 600, color: accent,
                            letterSpacing: '0.04em', textTransform: 'uppercase', marginTop: 6, lineHeight: 1.35 }}>
                {m.role}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 28 }}>
          <button style={{
            background: accent, color: '#fff', border: 'none',
            borderRadius: 999, padding: '14px 26px', cursor: 'pointer',
            fontFamily: FONT_BODY, fontSize: 15, fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', gap: 10,
          }}>
            Meet The Team
            <span style={{ display: 'inline-flex' }}>{Icons.arrowUR}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function IndustryFAQ({ accent }) {
  const [open, setOpen] = React.useState(0);
  return (
    <div style={{ background: TF.paper, padding: '88px 56px' }}>
      <div style={{ maxWidth: 920, margin: '0 auto' }}>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 44, lineHeight: 1.05,
                     letterSpacing: '-0.02em', margin: '0 0 8px', color: TF.ink }}>
          {_IND.faqTitle || 'Common questions'}
        </h2>
        <p style={{ fontFamily: FONT_BODY, fontSize: 16, color: TF.inkSoft, marginBottom: 32, maxWidth: 560 }}>
          Straight answers about working with us. Anything else? Bring it to the call.
        </p>
        <div>
          {INDUSTRY_FAQS.map((f, i) => (
            <FAQRow key={i} {...f} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function BookCallCTA({ accent }) {
  return (
    <div style={{ background: accent, color: '#fff', padding: '76px 56px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', display: 'grid',
                    gridTemplateColumns: '1.2fr 0.8fr', gap: 64, alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 14, letterSpacing: '0.12em',
                        textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 12 }}>
            Let's talk
          </div>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 40, letterSpacing: '-0.02em',
                        lineHeight: 1.1, marginBottom: 18, maxWidth: 600 }}>
            Ready to work with a CPA who actually gets back to you?
          </div>
          <div style={{ fontFamily: FONT_BODY, fontSize: 15.5, lineHeight: 1.6,
                        color: 'rgba(255,255,255,0.85)', maxWidth: 500 }}>
            Whether it's your books, payroll, or a real tax plan, let's talk. The first call is free, with zero pressure.
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <a href="https://thompsonflaherty.com/contact/" style={{
            background: '#fff', color: accent, border: 'none', padding: '18px 28px',
            borderRadius: 999, fontFamily: FONT_BODY, fontWeight: 600, fontSize: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer',
            textDecoration: 'none',
          }}>
            Schedule Your Consultation
            <span style={{ display: 'inline-flex' }}>{Icons.arrowUR}</span>
          </a>
          <div style={{ textAlign: 'center', fontFamily: FONT_BODY, fontSize: 14,
                        color: 'rgba(255,255,255,0.8)' }}>
            Prefer the phone? <a href="tel:+16186566010" style={{ color: '#fff', fontWeight: 700, textDecoration: 'none' }}>(618) 656-6010</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function IndustryPage({ tweaks }) {
  const accent = tweaks.accent;
  const copy = MEDICAL_COPY[tweaks.tone] || MEDICAL_COPY.practical;
  return (
    <div style={{ background: TF.paper, fontFamily: FONT_BODY, color: TF.ink, width: '100%', '--accent': accent }}
         data-screen-label={_IND.label || "Industry Landing - Medical"}>
      <TFHeader />
      <IndustryHero accent={accent} copy={copy} />
      <TrustStrip accent={accent} />
      <PainSection accent={accent} copy={copy} />
      <ServicesSection accent={accent} />
      <CompareSection accent={accent} />
      <ProcessSection accent={accent} copy={copy} />
      <TeamSection accent={accent} copy={copy} />
      <IndustryFAQ accent={accent} />
      <BookCallCTA accent={accent} />
    </div>
  );
}

window.IndustryPage = IndustryPage;
