// tf-header.jsx — Faithful recreation of the live thompsonflaherty.com header.
// Top utility bar (phone + Chicago note, wave divider) → sticky white nav bar
// with the real menu structure, dropdowns, Portal + Schedule Your Consultation.

const TF_NAV = [
  { label: 'Tax Services', href: 'https://thompsonflaherty.com/tax-individual/', sub: [
    ['Individual Taxes', 'https://thompsonflaherty.com/tax-individual/'],
    ['Business Taxes', 'https://thompsonflaherty.com/tax-business/'],
  ]},
  { label: 'Accounting Services', href: 'https://thompsonflaherty.com/accounting/', sub: [
    ['Monthly Accounting', 'https://thompsonflaherty.com/accounting/'],
    ['Monthly Bookkeeping', 'https://thompsonflaherty.com/bookkeeping/'],
    ['Payroll', 'https://thompsonflaherty.com/payroll/'],
    ['CFO Services', 'https://thompsonflaherty.com/cfo-services/'],
    ['Chart of Accounts', 'https://thompsonflaherty.com/chart-of-accounts/'],
  ]},
  { label: 'Exit Planning', href: 'https://thompsonflaherty.com/exit-planning/', sub: [
    ['Exit Planning & Selling', 'https://thompsonflaherty.com/exit-planning/'],
    ['QoE Services', 'https://thompsonflaherty.com/qoe-service/'],
  ]},
  { label: 'About Us', href: 'https://thompsonflaherty.com/about/' },
  { label: 'Locations', href: 'https://thompsonflaherty.com/locations/', sub: [
    ['Edwardsville', 'https://thompsonflaherty.com/locations/#edwardsville'],
    ['Chicago', 'https://thompsonflaherty.com/locations/#chicago'],
  ]},
];

const TF_LOGO = 'https://thompsonflaherty.com/wp-content/uploads/2026/04/logo-main.svg';

if (typeof document !== 'undefined' && !document.getElementById('tfh-style')) {
  const s = document.createElement('style');
  s.id = 'tfh-style';
  s.textContent = `
  .tfh *{box-sizing:border-box}
  .tfh-top{background:#A42223;color:#fff;font-family:'Red Hat Text',sans-serif;font-size:13px;
    display:flex;align-items:center;justify-content:space-between;padding:9px 56px}
  .tfh-top a{color:#fff;text-decoration:none}
  .tfh-top a:hover{opacity:.85}
  .tfh-wave{display:block;width:100%;height:18px;margin-top:-1px}
  .tfh-bar{position:sticky;top:0;z-index:50;background:#fff;border-bottom:1px solid rgba(75,48,21,0.10);
    display:flex;align-items:center;justify-content:space-between;padding:14px 56px;gap:24px}
  .tfh-nav{display:flex;align-items:center;gap:30px}
  .tfh-item{position:relative}
  .tfh-link{font-family:'Red Hat Text',sans-serif;font-size:14.5px;font-weight:500;color:#25211E;
    text-decoration:none;display:inline-flex;align-items:center;gap:6px;cursor:pointer;padding:8px 0;white-space:nowrap}
  .tfh-link:hover{color:#A42223}
  .tfh-chev{transition:transform .2s}
  .tfh-item:hover .tfh-chev{transform:rotate(180deg)}
  .tfh-dd{position:absolute;top:100%;left:50%;transform:translateX(-50%) translateY(6px);
    background:#fff;border:1px solid rgba(75,48,21,0.10);border-radius:12px;
    box-shadow:0 14px 40px rgba(75,48,21,0.16);padding:8px;min-width:230px;
    opacity:0;visibility:hidden;transition:all .16s;pointer-events:none}
  .tfh-item:hover .tfh-dd{opacity:1;visibility:visible;transform:translateX(-50%) translateY(2px);pointer-events:auto}
  .tfh-dd a{display:block;font-family:'Red Hat Text',sans-serif;font-size:14px;color:#595656;
    text-decoration:none;padding:9px 14px;border-radius:8px;white-space:nowrap}
  .tfh-dd a:hover{background:#FAF2EA;color:#A42223}
  .tfh-actions{display:flex;align-items:center;gap:14px}
  .tfh-portal{font-family:'Red Hat Text',sans-serif;font-size:14px;font-weight:600;color:#25211E;text-decoration:none}
  .tfh-portal:hover{color:#A42223}
  .tfh-cta{font-family:'Red Hat Text',sans-serif;font-size:14px;font-weight:600;color:#fff;
    background:#A42223;border-radius:999px;padding:12px 22px;text-decoration:none;white-space:nowrap}
  .tfh-cta:hover{background:#8a1d1e}
  .tfh-burger{display:none;background:none;border:0;cursor:pointer;padding:6px}
  .tfh-mobile{display:none;flex-direction:column;gap:2px;background:#fff;padding:12px 56px 20px;
    border-bottom:1px solid rgba(75,48,21,0.10)}
  .tfh-mobile a{font-family:'Red Hat Text',sans-serif;font-size:15px;color:#25211E;text-decoration:none;padding:10px 0;
    border-bottom:1px solid rgba(75,48,21,0.06)}
  @media (max-width:1024px){
    .tfh-top{padding:9px 24px}
    .tfh-bar{padding:12px 24px}
    .tfh-nav,.tfh-portal{display:none}
    .tfh-burger{display:block}
    .tfh-mobile.open{display:flex}
  }`;
  document.head.appendChild(s);
}

function TFHeader() {
  const [open, setOpen] = React.useState(false);
  const chev = (
    <svg className="tfh-chev" width="11" height="11" viewBox="0 0 12 12" fill="none"
         stroke="currentColor" strokeWidth="1.8"><path d="M3 5l3 3 3-3" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );
  return (
    <div className="tfh">
      <div className="tfh-top">
        <a href="tel:+16186566010" style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
          <svg width="15" height="15" viewBox="0 0 20 20" fill="#fff" aria-hidden="true">
            <path d="M19.46 14.68l-2.79-2.79c-1-1-2.69-.6-3.09.7-.3.9-1.3 1.4-2.2 1.2-1.99-.5-4.68-3.09-5.18-5.18-.3-.9.3-1.9 1.2-2.2 1.29-.4 1.69-2.09.69-3.09L5.3.52c-.8-.7-2-.7-2.69 0L.72 2.42C-1.18 4.41.92 9.69 5.6 14.38c4.69 4.68 9.97 6.88 11.96 4.88l1.9-1.89c.69-.8.69-2 0-2.69z"/>
          </svg>
          (618) 656-6010
        </a>
        <a href="https://thompsonflaherty.com/locations/#chicago"
           style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          We're now in Chicago!
        </a>
      </div>
      <svg className="tfh-wave" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">
        <path fill="#A42223" d="M790.5,93.1c-59.3-5.3-116.8-18-192.6-50c-29.6-12.7-76.9-31-100.5-35.9c-23.6-4.9-52.6-7.8-75.5-5.3c-10.2,1.1-22.6,1.4-50.1,7.4c-27.2,6.3-58.2,16.6-79.4,24.7c-41.3,15.9-94.9,21.9-134,22.6C72,58.2,0,25.8,0,25.8V0h1000V65.3c0,0-51.5,19.4-106.2,25.7C839.5,97,814.1,95.2,790.5,93.1z"/>
      </svg>

      <div className="tfh-bar">
        <a href="https://thompsonflaherty.com" style={{ display: 'inline-flex', flex: '0 0 auto' }}>
          <img src={TF_LOGO} alt="Thompson Flaherty" style={{ height: 46, width: 'auto', display: 'block' }} />
        </a>
        <nav className="tfh-nav">
          {TF_NAV.map((it, i) => (
            <div className="tfh-item" key={i}>
              <a className="tfh-link" href={it.href}>{it.label}{it.sub && chev}</a>
              {it.sub && (
                <div className="tfh-dd">
                  {it.sub.map(([l, h], j) => <a key={j} href={h}>{l}</a>)}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="tfh-actions">
          <a className="tfh-cta" href="https://thompsonflaherty.com/contact/">Schedule Your Consultation</a>
          <button className="tfh-burger" aria-label="Menu" onClick={() => setOpen(o => !o)}>
            <svg width="26" height="26" viewBox="0 0 640 640" fill="#A42223"><path d="M96 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32-14.3-32-32zm448 160c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32z"/></svg>
          </button>
        </div>
      </div>
      <div className={'tfh-mobile' + (open ? ' open' : '')}>
        {TF_NAV.map((it, i) => <a key={i} href={it.href}>{it.label}</a>)}
        <a href="https://thompsonflaherty.com/contact/" style={{ color: '#A42223', fontWeight: 700 }}>Schedule Your Consultation</a>
      </div>
    </div>
  );
}

Object.assign(window, { TFHeader });
