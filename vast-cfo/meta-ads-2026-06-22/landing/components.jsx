// ===========================================================================
// VAST Landing, shared components (React, exported to window)
// Loaded after React+Babel. Each page passes a PAGE config object.
// ===========================================================================
const { useState } = React;
// Resolve photo paths to inlined data URIs when available (for standalone export)
const RP = (p) => (typeof window !== "undefined" && window.VAST_PHOTOS && window.VAST_PHOTOS[p]) || p;

// ---- Arrow + icon set (Lucide-style 24px stroke) ------------------------
function Arrow({ w = 20 }) {
  return (<svg width={w} height={w * 0.45} viewBox="0 0 34 14" fill="none"><path d="M0 7h31M25 1l7 6-7 6" stroke="currentColor" strokeWidth="2.6" fill="none" /></svg>);
}
const ICONS = {
  receipt: <path d="M4 2v20l2.5-1.5L9 22l3-1.5L15 22l2.5-1.5L20 22V2l-2.5 1.5L15 2l-3 1.5L9 2 6.5 3.5 4 2zM8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round" />,
  coins: <g stroke="currentColor" strokeWidth="2" fill="none"><ellipse cx="8" cy="6" rx="6" ry="3" /><path d="M2 6v6c0 1.66 2.69 3 6 3M2 12v6c0 1.66 2.69 3 6 3" /><circle cx="16" cy="14" r="6" /></g>,
  chart: <path d="M3 3v18h18M7 15l4-5 4 3 5-7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
  scale: <path d="M12 3v18M7 21h10M5 7h14M5 7l-3 6a3 3 0 006 0L5 7zm14 0l-3 6a3 3 0 006 0l-3-6zM12 3a2 2 0 100-.01" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
  users: <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM22 21v-2a4 4 0 00-3-3.87M16 3.13A4 4 0 0116 11" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
  shield: <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3zM9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
  clock: <g stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></g>,
  calc: <g stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M8 6h8M8 10h2M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h4" /></g>,
  trend: <path d="M3 17l6-6 4 4 7-8M14 7h6v6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
  pig: <path d="M19 11h2M5 13a7 7 0 017-7c2 0 3.5.5 4.5 1.5L20 8l-1 3M5 13a4 4 0 00-1 2 2 2 0 002 2M5 13c-1-1-1-3 0-4M9 6V4M6 17l1 3h2l.5-2M15 18l.5 2h2l1-3M8 11h.01" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
};
function Icon({ name }) { return (<svg viewBox="0 0 24 24" width="24" height="24">{ICONS[name] || ICONS.chart}</svg>); }
function XMark({ color = "#FF2147" }) {
  return (<svg viewBox="0 0 30 30" fill="none"><circle cx="15" cy="15" r="14" stroke={color} strokeWidth="2" /><path d="M10 10l10 10M20 10L10 20" stroke={color} strokeWidth="2.4" strokeLinecap="round" /></svg>);
}

// ---- Logo ---------------------------------------------------------------
function Logo({ color = "var(--ink)", href = "#top", size }) {
  return (
    <a className="logo" href={href} style={{ color, fontSize: size }}>
      Vas<span className="lt">t<span className="dot" style={{ background: color }} /></span>
    </a>
  );
}

// ---- Nav ----------------------------------------------------------------
function Nav({ dark, ctaTheme = "btn-yellow", phone = "(775) 232-7671" }) {
  return (
    <nav className={"nav" + (dark ? " on-dark" : "")}>
      <Logo color={dark ? "var(--white)" : "var(--ink)"} />
      <div className="nav-cta">
        <a className="ph" href={"tel:" + phone.replace(/[^0-9]/g, "")}>{phone}</a>
        <a className={"btn " + ctaTheme} href="#book">Book an intro call <Arrow /></a>
      </div>
    </nav>
  );
}

// ---- Hero ---------------------------------------------------------------
function Hero({ theme = "t-black", sticker, stickerTheme = "", headline, sub, photo, photoBadge, badgeTheme = "", primaryTheme = "btn-yellow", trust, solo }) {
  return (
    <header className={"hero " + theme} id="top">
      <div className={"hero-grid" + (solo ? " solo" : "")}>
        <div className="hero-copy">
          {sticker && <div className={"hero-sticker " + stickerTheme}>{sticker}</div>}
          <h1 className="display">{headline}</h1>
          <p className="lede" style={{ marginTop: 26, maxWidth: 620 }}>{sub}</p>
          <div className="hero-cta">
            <a className={"btn btn-lg " + primaryTheme} href="#book">Book an intro call <Arrow /></a>
            <a className={"btn btn-lg " + (theme === "t-black" ? "btn-outline" : "btn-black")} href="#how" style={theme === "t-black" ? { boxShadow: "inset 0 0 0 2.5px rgba(255,255,255,.5)", color: "#fff" } : {}}>See how it works</a>
          </div>
          {trust && <p className="hero-trust">{trust}</p>}
        </div>
        {!solo && photo && (
          <div className="hero-photo">
            <div className="ph-frame"><img src={RP(photo)} alt="" /></div>
            {photoBadge && <div className={"ph-badge " + badgeTheme}>{photoBadge}</div>}
          </div>
        )}
      </div>
    </header>
  );
}

// ---- Section header ------------------------------------------------------
function SecHead({ eyebrow, title, intro, center, eyebrowColor }) {
  return (
    <div className={center ? "center" : ""} style={{ maxWidth: center ? 800 : 760, margin: center ? "0 auto" : 0 }}>
      {eyebrow && <span className="eyebrow" style={{ color: eyebrowColor }}>{eyebrow}</span>}
      <h2 className="display">{title}</h2>
      {intro && <p className="lede" style={{ marginTop: 22 }}>{intro}</p>}
    </div>
  );
}

// ---- Problem grid ("does your accountant do THIS?") ----------------------
function ProblemBand({ eyebrow, title, items }) {
  return (
    <section className="section t-black">
      <div className="wrap">
        <SecHead eyebrow={eyebrow} title={title} eyebrowColor="var(--yellow)" />
        <div className="prob-grid">
          {items.map((it, i) => (
            <div className="prob" key={i}>
              <div className="x"><XMark /></div>
              <p className="q">{it.q}</p>
              <p className="a">{it.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Service cards -------------------------------------------------------
function Services({ eyebrow, title, intro, cards, theme = "t-paper" }) {
  return (
    <section className={"section " + theme} id="how">
      <div className="wrap">
        <SecHead eyebrow={eyebrow} title={title} intro={intro} eyebrowColor="var(--ink)" />
        <div className="cards">
          {cards.map((c, i) => (
            <div className="card" key={i}>
              <div className="ic"><Icon name={c.icon} /></div>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- How it works steps --------------------------------------------------
function Steps({ title, steps, theme = "t-cream" }) {
  return (
    <section className={"section " + theme}>
      <div className="wrap">
        <h2 className="display">{title}</h2>
        <div className="steps">
          {steps.map((s, i) => (
            <div className="step" key={i}>
              <div className="sn">{String(i + 1).padStart(2, "0")}</div>
              <h4>{s.h}</h4>
              <p>{s.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Tanya proof ---------------------------------------------------------
function TanyaProof({ theme = "t-paper", photo = "assets/photo-tanya-kitchen.png" }) {
  return (
    <section className={"section " + theme} id="tanya">
      <div className="wrap">
        <div className="proof-grid">
          <div className="proof-photo"><img src={RP(photo)} alt="Tanya McCaffery, CPA, founder of VAST" /></div>
          <div>
            <span className="eyebrow">Meet Tanya McCaffery, CPA</span>
            <h2 className="display">A CPA who actually <span className="mark">owns restaurants.</span></h2>
            <p className="lede" style={{ marginTop: 24 }}>
              Tanya is Founder &amp; CEO of VAST and Co-Owner &amp; CFO of Local Food Group, a
              multi-unit Reno restaurant group. She's built and operated brick-and-mortar
              restaurants and reviewed thousands of restaurant P&amp;Ls. She reads your numbers
              like a line cook reads a ticket.
            </p>
            <div className="cred-row">
              <span className="cred">CPA</span>
              <span className="cred">20+ Years</span>
              <span className="cred">B.S. Accounting, UNR</span>
              <span className="cred">Restaurant Owner</span>
              <span className="cred">Fractional CFO</span>
            </div>
            <div className="concepts">
              <span>Great Basin Brewing</span><span>Liberty Food &amp; Wine</span>
              <span>Cucina Lupo</span><span>Pizzeria Lupo</span><span>Overland</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Stat band -----------------------------------------------------------
function Stats({ theme = "t-yellow", stats }) {
  return (
    <section className={"section " + theme} style={{ paddingTop: 0, paddingBottom: 0 }}>
      <div className="wrap" style={{ paddingTop: "clamp(48px,6vw,80px)", paddingBottom: "clamp(48px,6vw,80px)" }}>
        <div className="stats">
          {stats.map((s, i) => (
            <div className="stat" key={i}><div className="n">{s.n}</div><div className="l">{s.l}</div></div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Testimonial ---------------------------------------------------------
function Testimonial({ theme = "t-black", quote, cite }) {
  return (
    <section className={"section " + theme}>
      <div className="wrap quote">
        <blockquote>&ldquo;{quote}&rdquo;</blockquote>
        <div className="cite">{cite}</div>
      </div>
    </section>
  );
}

// ---- FAQ -----------------------------------------------------------------
function FAQ({ theme = "t-paper", items, title = "Questions, answered." }) {
  return (
    <section className={"section " + theme} id="faq">
      <div className="wrap">
        <h2 className="display center">{title}</h2>
        <div className="faq">
          {items.map((f, i) => (
            <details key={i} {...(i === 0 ? { open: true } : {})}>
              <summary>{f.q}<span className="plus" /></summary>
              <div className="ans">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Lead form + booking CTA --------------------------------------------
function BookBand({ theme = "t-black", title, intro, primaryTheme = "btn-aqua" }) {
  const [sent, setSent] = useState(false);
  const submit = (e) => { e.preventDefault(); setSent(true); };
  return (
    <section className={"section cta-band " + theme} id="book">
      <div className="form-grid">
        <div>
          <span className="eyebrow" style={{ color: theme === "t-black" ? "var(--aqua)" : "var(--ink)" }}>Start the conversation</span>
          <h2 className="display">{title}</h2>
          <p className="lede" style={{ marginTop: 22 }}>{intro}</p>
          <div className="steps" style={{ marginTop: 36 }}>
            <div className="step"><div className="sn">01</div><h4>Tell us about your restaurant</h4><p>Two minutes, the form on the right.</p></div>
            <div className="step"><div className="sn">02</div><h4>Book your intro call</h4><p>Pick a time that works for you.</p></div>
            <div className="step"><div className="sn">03</div><h4>Get a clear plan</h4><p>We map Start, Fix, or Grow to you.</p></div>
          </div>
        </div>
        <form className="lead-form" onSubmit={submit}>
          {!sent ? (
            <React.Fragment>
              <div className="field"><label>Your name</label><input required placeholder="Jordan Rivera" /></div>
              <div className="field"><label>Email</label><input required type="email" placeholder="jordan@yourrestaurant.com" /></div>
              <div className="field"><label>Restaurant name</label><input required placeholder="The Copper Spoon" /></div>
              <div className="field"><label>Number of locations</label>
                <select defaultValue=""><option value="" disabled>Select…</option><option>1</option><option>2–3</option><option>4–9</option><option>10+</option></select>
              </div>
              <button className={"btn btn-lg " + primaryTheme} type="submit" style={{ width: "100%", justifyContent: "center" }}>Continue to booking <Arrow /></button>
              <p className="form-foot">No spam. We'll only use this to prep your intro call.</p>
            </React.Fragment>
          ) : (
            <div className="form-success">
              <div className="check"><Arrow w={26} /></div>
              <h3 className="display" style={{ fontSize: 28 }}>You're all set.</h3>
              <p style={{ color: "var(--muted)", marginTop: 12 }}>Pick a time and Tanya's team will be ready with your restaurant's numbers in mind.</p>
              <a className="btn btn-lg btn-black" href="#top" style={{ marginTop: 22 }}>Open the calendar <Arrow /></a>
              <p className="form-foot" style={{ marginTop: 16 }}>Calendar booking embeds here in production.</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

// ---- Footer --------------------------------------------------------------
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-in">
        <div style={{ maxWidth: 360 }}>
          <Logo color="var(--white)" />
          <p style={{ marginTop: 16, fontSize: 15, lineHeight: 1.6 }}>Specialized accounting &amp; fractional CFO services, built only for restaurants.</p>
        </div>
        <div className="contact">
          <strong style={{ color: "#fff", display: "block", marginBottom: 8 }}>Talk to us</strong>
          <a href="tel:7752327671">(775) 232-7671</a><br />
          <a href="mailto:Tanya@VastCFO.com">Tanya@VastCFO.com</a><br />
          4745 Caughlin Parkway, Suite 200<br />Reno, NV 89519
        </div>
        <div className="contact">
          <strong style={{ color: "#fff", display: "block", marginBottom: 8 }}>Three ways in</strong>
          Start, get set up right<br />Fix, clean up the books<br />Grow, scale with a CFO
        </div>
      </div>
      <div className="footer-base">
        <span>© {new Date().getFullYear()} VAST · Virtual Accounting Services Team</span>
        <span>Big numbers. Real operators.</span>
      </div>
    </footer>
  );
}

// ---- FICA tip-credit calculator -----------------------------------------
function FicaCalc() {
  const [tipped, setTipped] = useState(12);
  const [avgTips, setAvgTips] = useState(180);
  // FICA tip credit ≈ 7.65% of tips above the wage that brings tipped pay to $5.15/hr floor.
  // Simplified estimate: credit ≈ 7.65% × annual tips reported (common rule-of-thumb upper bound).
  const annualTips = tipped * avgTips * 52;
  const credit = Math.round(annualTips * 0.0765);
  const fmt = (n) => "$" + n.toLocaleString("en-US");
  return (
    <section className="section t-cream" id="calc">
      <div className="wrap">
        <SecHead eyebrow="Estimate your credit" title={<span>How much is <span className="mark">hiding</span> in your payroll?</span>}
          intro="Most restaurants leave the FICA tip credit on the table. Move the sliders for a rough annual estimate, then we'll find the exact number." />
        <div className="calc" style={{ marginTop: 48 }}>
          <div className="calc-in">
            <div className="slider-row">
              <div className="top"><span className="lab">Tipped employees</span><span className="val">{tipped}</span></div>
              <input type="range" min="1" max="80" value={tipped} onChange={(e) => setTipped(+e.target.value)} />
            </div>
            <div className="slider-row">
              <div className="top"><span className="lab">Avg weekly tips / employee</span><span className="val">{fmt(avgTips)}</span></div>
              <input type="range" min="40" max="600" step="10" value={avgTips} onChange={(e) => setAvgTips(+e.target.value)} />
            </div>
            <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.5, marginTop: 6 }}>
              The FICA tip credit lets you recoup the employer payroll tax (7.65%) you pay on
              reported employee tips. The cleaner your tip reporting, the bigger the recovery.
            </p>
          </div>
          <div className="calc-out">
            <span className="est-label">Estimated annual credit</span>
            <div className="est">{fmt(credit)}</div>
            <p className="est-sub">Based on ~{fmt(annualTips)} in reported tips per year across {tipped} tipped staff.</p>
            <a className="btn btn-lg btn-aqua" href="#book" style={{ marginTop: 24, alignSelf: "flex-start" }}>Claim it with VAST <Arrow /></a>
            <p className="calc-disc">Rough estimate for illustration only, actual credit depends on tip reporting, the $5.15/hr wage floor, and your filing. VAST calculates the exact figure.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, {
  Arrow, Icon, XMark, Logo, Nav, Hero, SecHead,
  ProblemBand, Services, Steps, TanyaProof, Stats, Testimonial, FAQ, BookBand, Footer, FicaCalc,
});
