// safe-variant.jsx — On-brand split layout: hero copy left, opt-in form right.
// Matches the existing Thompson Flaherty site language exactly.

function SafeNav({ accent, label = 'Free Resource · For Small Business Owners' }) {
  return (
    <div style={{ background: accent, height: 56, color: '#fff', fontFamily: FONT_BODY,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0 56px', fontSize: 13 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ display: 'inline-flex', width: 15, height: 15, alignItems: 'center', justifyContent: 'center' }}>
          {Icons.phone}
        </span>
        <a href="tel:+16186566010" style={{ color: '#fff', textDecoration: 'none' }}>(618) 656-6010</a>
      </div>
      <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        {label}
      </div>
    </div>
  );
}

function SafeHeader({ accent = TF.red }) {
  const link = (label, caret = true) => (
    <span style={{ fontSize: 13.5, color: TF.inkSoft, fontFamily: FONT_BODY, fontWeight: 500,
                   display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      {label}
      {caret && (
        <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 5l3 3 3-3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </span>
  );
  return (
    <div style={{ height: 84, background: TF.cream, display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', padding: '0 56px', borderBottom: `1px solid ${TF.border}` }}>
      <img src={(window.__resources && window.__resources.tfLogo) || "https://thompsonflaherty.com/wp-content/uploads/2026/04/logo-main.svg"}
           alt="Thompson Flaherty CPA & Tax Consultants" style={{ height: 48, width: 'auto' }} />
      <div style={{ display: 'flex', gap: 26, alignItems: 'center' }}>
        {link('Tax Services')}
        {link('Accounting Services')}
        {link('Exit Planning')}
        {link('About Us', false)}
        {link('Locations')}
      </div>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        <span style={{ fontSize: 13.5, color: TF.inkSoft, fontFamily: FONT_BODY, fontWeight: 500 }}>Portal</span>
        <button style={{
          background: accent, border: 'none', color: '#fff', cursor: 'pointer',
          borderRadius: 999, padding: '12px 20px', fontFamily: FONT_BODY, fontSize: 13.5, fontWeight: 600,
        }}>Schedule Your Consultation</button>
      </div>
    </div>
  );
}

function PillEyebrow({ accent, children }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '6px 12px 6px 10px', borderRadius: 999,
      background: '#fff', border: `1px solid ${TF.border}`,
      fontFamily: FONT_BODY, fontSize: 12, fontWeight: 600, color: accent,
      letterSpacing: '0.06em', textTransform: 'uppercase',
    }}>
      {children}
    </div>
  );
}

function NumberedItem({ n, title, body, accent }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '44px 1fr', gap: 16, alignItems: 'start' }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12, background: '#fff',
        border: `1px solid ${TF.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 18, color: accent,
      }}>{String(n).padStart(2, '0')}</div>
      <div>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 17, color: TF.ink, marginBottom: 4 }}>
          {title}
        </div>
        <div style={{ fontFamily: FONT_BODY, fontSize: 14.5, lineHeight: 1.55, color: TF.inkSoft }}>
          {body}
        </div>
      </div>
    </div>
  );
}

function CredentialChip({ label }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '8px 14px', borderRadius: 8, background: '#fff',
      border: `1px solid ${TF.border}`, fontFamily: FONT_BODY, fontSize: 12.5,
      color: TF.inkSoft, fontWeight: 500,
    }}>
      <span style={{ color: TF.red, display: 'inline-flex' }}>{Icons.check}</span>
      {label}
    </div>
  );
}

function OptInForm({ accent, longForm = true, density = 'regular' }) {
  const pad = density === 'compact' ? '10px 14px' : '13px 16px';
  const fld = (label, ph, type = 'text', required = false) => (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontFamily: FONT_BODY, fontSize: 12.5, fontWeight: 600, color: TF.ink, letterSpacing: '0.01em' }}>
        {label}{required && <span style={{ color: accent, marginLeft: 4 }}>*</span>}
      </span>
      <input type={type} placeholder={ph} style={{
        padding: pad, borderRadius: 8, border: `1.2px solid ${TF.borderStrong}`,
        background: '#fff', fontFamily: FONT_BODY, fontSize: 14, color: TF.ink, outline: 'none',
      }} />
    </label>
  );
  return (
    <div style={{
      background: TF.cream2, borderRadius: 20, padding: 32,
      border: `1px solid ${TF.border}`, boxShadow: TF.shadowLg,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <span style={{ color: accent, display: 'inline-flex' }}>{Icons.download}</span>
        <span style={{ fontFamily: FONT_BODY, fontSize: 12, color: TF.inkSoft,
                       letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
          Free Download · No Credit Card
        </span>
      </div>
      <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 26, color: TF.ink,
                    lineHeight: 1.15, marginBottom: 6 }}>
        Get the template
      </div>
      <div style={{ fontFamily: FONT_BODY, fontSize: 14, color: TF.inkSoft, marginBottom: 22 }}>
        We'll email it to you in under a minute. Unsubscribe anytime.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        {fld('First name', 'Jordan')}
        {fld('Last name', 'Reyes')}
      </div>
      <div style={{ display: 'grid', gap: 12, marginBottom: longForm ? 12 : 18 }}>
        {fld('Work email', 'jordan@acme.com', 'email', true)}
      </div>
      {longForm && (
        <>
          <div style={{ display: 'grid', gap: 12, marginBottom: 12 }}>
            {fld('Business name', 'Acme Co.')}
          </div>
          <div style={{ display: 'grid', gap: 12, marginBottom: 18 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontFamily: FONT_BODY, fontSize: 12.5, fontWeight: 600, color: TF.ink }}>
                How did you hear about us?
              </span>
              <select style={{
                padding: pad, borderRadius: 8, border: `1.2px solid ${TF.borderStrong}`,
                background: '#fff', fontFamily: FONT_BODY, fontSize: 14, color: TF.inkSoft, outline: 'none',
                appearance: 'none', backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'><path d='M3 5l3 3 3-3' stroke='%23595656' stroke-width='1.6' fill='none' stroke-linecap='round'/></svg>")`,
                backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center',
              }}>
                <option>Select an option…</option>
                <option>Google search</option>
                <option>Referral from a client</option>
                <option>Newsletter / email</option>
                <option>LinkedIn</option>
                <option>Other</option>
              </select>
            </label>
          </div>
        </>
      )}

      <button style={{
        width: '100%', padding: '15px 18px', borderRadius: 999, border: 'none',
        background: accent, color: '#fff', fontFamily: FONT_BODY, fontSize: 15, fontWeight: 600,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer',
        boxShadow: `0 4px 0 ${TF.redDeep}40`,
      }}>
        Send me the template
        <span style={{ display: 'inline-flex' }}>{Icons.arrowUR}</span>
      </button>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    marginTop: 14, fontFamily: FONT_BODY, fontSize: 12, color: TF.inkMute }}>
        <span style={{ display: 'inline-flex' }}>{Icons.lock}</span>
        Your details stay with us. No spam, ever.
      </div>
    </div>
  );
}

function Testimonial() {
  return (
    <div style={{
      background: '#fff', borderRadius: 16, padding: 24, border: `1px solid ${TF.border}`,
      display: 'flex', flexDirection: 'column', gap: 14, boxShadow: TF.shadow,
    }}>
      <div style={{ display: 'flex', gap: 2, color: '#E6A52B' }}>
        {[0,1,2,3,4].map(i => <span key={i} style={{ display: 'inline-flex' }}>{Icons.star}</span>)}
      </div>
      <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 500, fontSize: 17, color: TF.ink,
                    lineHeight: 1.45, letterSpacing: '-0.005em' }}>
        “We rebuilt our books around Thompson Flaherty's chart of accounts and our monthly close
        went from three days to four hours. Worth every penny, except it's free.”
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 4 }}>
        <div style={{ width: 40, height: 40, borderRadius: 999,
                      background: 'linear-gradient(135deg,#D8C5A8,#A88B66)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 14 }}>
          TE
        </div>
        <div>
          <div style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: 13.5, color: TF.ink }}>
            Thomas Edmonds
          </div>
          <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: TF.inkMute }}>
            Owner, Edmonds Veterinary · Illinois
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQRow({ q, a, open, onToggle }) {
  return (
    <div style={{ borderBottom: `1px solid ${TF.border}`, padding: '20px 0' }}>
      <button onClick={onToggle} style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left',
        fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 18, color: TF.ink, letterSpacing: '-0.005em',
      }}>
        {q}
        <span style={{
          width: 28, height: 28, borderRadius: 999, background: open ? TF.red : TF.cream2,
          color: open ? '#fff' : TF.ink, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all .18s',
        }}>{open ? Icons.minus : Icons.plus}</span>
      </button>
      {open && (
        <div style={{ marginTop: 12, fontFamily: FONT_BODY, fontSize: 14.5, lineHeight: 1.6,
                      color: TF.inkSoft, maxWidth: 720 }}>
          {a}
        </div>
      )}
    </div>
  );
}

function SafeVariant({ tweaks }) {
  const accent = tweaks.accent;
  const [openFaq, setOpenFaq] = React.useState(0);
  const faqs = [
    { q: "What's in the Chart of Accounts template?",
      a: "A pre-numbered, five-section structure (Assets, Liabilities, Equity, Revenue, Expenses) tuned for small service and product businesses. Comes as a .QBO/.IIF import file plus a clean Excel and PDF reference." },
    { q: "Can I import this directly into QuickBooks Online?",
      a: "Yes. The download includes a QBO-ready file and a step-by-step import guide. If you're on Xero or Wave, an Excel version with mapping notes is included too." },
    { q: "Is the structure customizable to my industry?",
      a: "Absolutely. We've included optional add-on blocks for retail (COGS, inventory adjustments), professional services (WIP, retainers), and contractors (job costing). Pick what you need; ignore the rest." },
    { q: "Do I need accounting experience to use it?",
      a: "No. Each account has a one-line plain-English description and an example of what belongs there. If you can run a business, you can run this." },
    { q: "Is this really free? What's the catch?",
      a: "It's genuinely free. We give this away because clients who start with a clean COA are easier (and cheaper) to serve. If you want a CPA to set it up for you, you know where to find us." },
  ];

  return (
    <div style={{ background: TF.cream, fontFamily: FONT_BODY, color: TF.ink, width: '100%' }}>
      <SafeNav accent={accent} />
      <SafeHeader />

      {/* HERO — split */}
      <div style={{ padding: '64px 56px 88px', position: 'relative' }}>
        <div style={{ position: 'absolute', right: 24, top: 80, width: 360, color: TF.border, opacity: 0.6 }}>
          <BrandSwoosh style={{ width: '100%', height: 80 }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 64, alignItems: 'start' }}>
          <div>
            <PillEyebrow accent={accent}>Free CPA Template</PillEyebrow>
            <h1 style={{
              fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 62, lineHeight: 1.04,
              letterSpacing: '-0.022em', margin: '20px 0 22px', color: TF.ink,
            }}>
              The Chart of Accounts <span style={{ color: accent }}>your bookkeeper</span> wishes you started with.
            </h1>
            <p style={{
              fontFamily: FONT_BODY, fontSize: 19, lineHeight: 1.55, color: TF.inkSoft,
              maxWidth: 540, marginBottom: 28,
            }}>
              A clean, CPA-built account structure that imports into QuickBooks in under five minutes.
              Built for small businesses doing <strong style={{ color: TF.ink, fontWeight: 600 }}>$0-$5M</strong> in annual revenue.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
              <CredentialChip label="QuickBooks-ready (.QBO + .IIF)" />
              <CredentialChip label="Excel & PDF included" />
              <CredentialChip label="Industry add-ons" />
            </div>

            {tweaks.showProof && <Testimonial />}
          </div>

          <div style={{ position: 'sticky', top: 24 }}>
            <OptInForm accent={accent} longForm={tweaks.longForm} density="regular" />
          </div>
        </div>
      </div>

      {/* WHAT'S INSIDE — numbered */}
      <div style={{ padding: '24px 56px 96px' }}>
        <div style={{ borderTop: `1px solid ${TF.border}`, paddingTop: 64,
                      display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 80 }}>
          <div>
            <PillEyebrow accent={accent}>What's inside</PillEyebrow>
            <h2 style={{
              fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 40, lineHeight: 1.08,
              letterSpacing: '-0.018em', margin: '16px 0 16px', color: TF.ink,
            }}>
              Six things you'll get with the download.
            </h2>
            <p style={{ fontFamily: FONT_BODY, fontSize: 16, lineHeight: 1.6, color: TF.inkSoft, maxWidth: 380 }}>
              Built by the CPAs at Thompson Flaherty and refined over 3,000+ small business engagements.
            </p>
            <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <CredentialChip label="AICPA Member Firm" />
              <CredentialChip label="Certified QuickBooks ProAdvisor" />
              <CredentialChip label="100% on-time delivery (last 24 mo.)" />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <NumberedItem n={1} accent={accent} title="A complete five-section structure"
              body="Assets, Liabilities, Equity, Revenue, and Expenses, pre-numbered using the 1000/2000/4000/5000 convention every bookkeeper recognizes." />
            <NumberedItem n={2} accent={accent} title="Industry-tuned add-on blocks"
              body="Optional sub-sections for service businesses, retail/inventory, professional services, and contractors. Snap them in or leave them out." />
            <NumberedItem n={3} accent={accent} title="QuickBooks-ready import file"
              body="Drop the .QBO or .IIF file straight into QuickBooks. We've also included Xero and Wave-compatible CSVs." />
            <NumberedItem n={4} accent={accent} title="Tax-aware account groupings"
              body="Accounts are pre-mapped to Schedule C / 1120 lines, so year-end becomes a copy/paste job instead of a re-categorization marathon." />
            <NumberedItem n={5} accent={accent} title="Plain-English setup guide"
              body="A 12-page PDF that walks a non-accountant through every account: what it's for, what goes there, and a real-world example." />
            <NumberedItem n={6} accent={accent} title="Monthly reconciliation checklist"
              body="The same one our team uses on client books. Print it, tape it to your monitor, never miss a tie-out again." />
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ background: TF.surface, padding: '88px 56px' }}>
        <div style={{ maxWidth: 920, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 44, lineHeight: 1.05,
            letterSpacing: '-0.02em', margin: '0 0 8px', color: TF.ink,
          }}>
            Questions about the template
          </h2>
          <p style={{ fontFamily: FONT_BODY, fontSize: 16, color: TF.inkSoft, marginBottom: 32, maxWidth: 560 }}>
            Short, honest answers. If you're still not sure, reply to the download email and a real person will help.
          </p>
          <div>
            {faqs.map((f, i) => (
              <FAQRow key={i} {...f} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA strip */}
      <div style={{ background: accent, color: '#fff', padding: '56px', textAlign: 'center' }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 14, letterSpacing: '0.12em',
                      textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 12 }}>
          Still scrolling?
        </div>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 36, letterSpacing: '-0.015em',
                      lineHeight: 1.15, maxWidth: 720, margin: '0 auto 24px' }}>
          You've read the whole page. Just grab the template.
        </div>
        <button style={{
          background: '#fff', color: accent, border: 'none', padding: '14px 28px',
          borderRadius: 999, fontFamily: FONT_BODY, fontWeight: 600, fontSize: 15,
          display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer',
        }}>
          Send me the template
          <span style={{ display: 'inline-flex' }}>{Icons.arrowUR}</span>
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { SafeVariant, SafeNav, SafeHeader, PillEyebrow, NumberedItem, CredentialChip, FAQRow, OptInForm, Testimonial });
