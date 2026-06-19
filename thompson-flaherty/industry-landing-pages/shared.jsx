// shared.jsx — design tokens, icons, primitives shared between variants

const TF = {
  cream: '#FFFAF5',
  cream2: '#FAF2EA',
  paper: '#FFFFFF',
  ink: '#25211E',
  inkSoft: '#595656',
  inkMute: '#8A7F76',
  red: '#A42223',
  redDark: '#9E122A',
  redDeep: '#510606',
  redWash: '#F6E9E9',
  border: 'rgba(75,48,21,0.10)',
  borderStrong: 'rgba(75,48,21,0.18)',
  surface: '#F6F6F6',
  shadow: '0 1px 2px rgba(75,48,21,0.04), 0 8px 24px rgba(75,48,21,0.06)',
  shadowLg: '0 2px 4px rgba(75,48,21,0.05), 0 30px 60px -20px rgba(75,48,21,0.18)',
};

const FONT_DISPLAY = `'Geist', ui-sans-serif, system-ui, -apple-system, sans-serif`;
const FONT_BODY = `'Red Hat Text', ui-sans-serif, system-ui, -apple-system, sans-serif`;

// ── Tiny stroked icons (1.5px) used throughout ────────────────────────────
const Icon = ({ d, size = 20, stroke = 'currentColor', fill = 'none', sw = 1.6, vb = 24 }) => (
  <svg width={size} height={size} viewBox={`0 0 ${vb} ${vb}`} fill={fill} stroke={stroke}
       strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {typeof d === 'string' ? <path d={d} /> : d}
  </svg>
);

const Icons = {
  ledger: <Icon d={
    <g>
      <path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/>
      <path d="M5 17h14"/>
      <path d="M9 8h6M9 12h4"/>
    </g>
  } />,
  layers: <Icon d={
    <g>
      <path d="M12 3 3 8l9 5 9-5z"/>
      <path d="M3 13l9 5 9-5"/>
      <path d="M3 18l9 5 9-5"/>
    </g>
  } />,
  quickbooks: <Icon d={
    <g>
      <circle cx="12" cy="12" r="9"/>
      <path d="M9 8.5a3.5 3.5 0 1 0 0 7H10"/>
      <path d="M15 15.5a3.5 3.5 0 1 0 0-7H14"/>
    </g>
  } />,
  tax: <Icon d={
    <g>
      <path d="M7 3h7l5 5v13H7z"/>
      <path d="M14 3v5h5"/>
      <path d="M10 13l4 4M14 13l-4 4"/>
    </g>
  } />,
  guide: <Icon d={
    <g>
      <path d="M4 5a2 2 0 0 1 2-2h7l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/>
      <path d="M13 3v5h5"/>
      <path d="M8 13h7M8 16h5"/>
    </g>
  } />,
  check: <Icon d="M5 12l4 4 10-10"/>,
  arrow: <Icon d="M5 12h14M13 5l7 7-7 7"/>,
  arrowUR: <Icon d="M7 17 17 7M9 7h8v8"/>,
  download: <Icon d={
    <g>
      <path d="M12 4v12"/>
      <path d="M7 11l5 5 5-5"/>
      <path d="M5 20h14"/>
    </g>
  } />,
  lock: <Icon d={
    <g>
      <rect x="5" y="10" width="14" height="10" rx="2"/>
      <path d="M8 10V7a4 4 0 0 1 8 0v3"/>
    </g>
  } />,
  star: <Icon d="M12 3.5l2.7 5.5 6 .9-4.3 4.2 1 6L12 17.3 6.6 20.1l1-6L3.3 9.9l6-.9z" fill="currentColor" sw={0} />,
  spark: <Icon d={
    <g>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.5 5.5l2.8 2.8M15.7 15.7l2.8 2.8M5.5 18.5l2.8-2.8M15.7 8.3l2.8-2.8"/>
    </g>
  } />,
  plus: <Icon d="M12 5v14M5 12h14"/>,
  minus: <Icon d="M5 12h14"/>,
  phone: <Icon d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 4.5 4.5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A14.5 14.5 0 0 1 4.5 5.5a2 2 0 0 1 2-2z" />,
  payroll: <Icon d={
    <g>
      <circle cx="9" cy="8" r="3"/>
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0"/>
      <circle cx="18" cy="9.5" r="2.2"/>
      <path d="M16 14.5l1.5 1.5 3-3.2"/>
    </g>
  } />,
};

// ── A faint kraft "swoosh" decorator pulled from the Figma brand ──────────
const BrandSwoosh = ({ style }) => (
  <svg viewBox="0 0 400 80" style={style} aria-hidden="true">
    <path d="M0 60 C 80 20, 160 20, 240 50 S 360 70, 400 30"
          fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M0 70 C 80 30, 160 30, 240 60 S 360 80, 400 40"
          fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
  </svg>
);

// ── COA document preview (stylized, monospaced) ───────────────────────────
const CoaPage = ({ accent = TF.red, scale = 1 }) => {
  const accountRow = (code, name, type) => (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, padding: '5px 0',
                  borderBottom: `1px dashed ${TF.border}`, fontSize: 10.5,
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
      <span style={{ color: accent, fontWeight: 600, width: 38 }}>{code}</span>
      <span style={{ color: TF.ink, flex: 1 }}>{name}</span>
      <span style={{ color: TF.inkMute, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{type}</span>
    </div>
  );
  return (
    <div style={{
      width: 320 * scale, padding: 28 * scale, background: TF.paper,
      boxShadow: TF.shadowLg, borderRadius: 4,
      fontFamily: FONT_BODY, transform: `scale(${scale})`, transformOrigin: 'top left',
    }}>
      <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 16, color: TF.ink, marginBottom: 2 }}>
        Chart of Accounts
      </div>
      <div style={{ fontSize: 10, color: TF.inkMute, marginBottom: 18, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        Thompson Flaherty CPA · Small Business Template
      </div>
      <div style={{ fontSize: 9.5, fontWeight: 600, color: accent, letterSpacing: '0.08em', marginBottom: 4 }}>
        1000 · ASSETS
      </div>
      {accountRow('1010', 'Operating Checking', 'Bank')}
      {accountRow('1020', 'Savings / Reserve', 'Bank')}
      {accountRow('1100', 'Accounts Receivable', 'A/R')}
      {accountRow('1200', 'Prepaid Expenses', 'Other CA')}
      {accountRow('1500', 'Office Equipment', 'Fixed')}
      <div style={{ height: 14 }} />
      <div style={{ fontSize: 9.5, fontWeight: 600, color: accent, letterSpacing: '0.08em', marginBottom: 4 }}>
        2000 · LIABILITIES
      </div>
      {accountRow('2010', 'Accounts Payable', 'A/P')}
      {accountRow('2100', 'Credit Card – Visa', 'CC')}
      {accountRow('2300', 'Payroll Liabilities', 'Other CL')}
      <div style={{ height: 14 }} />
      <div style={{ fontSize: 9.5, fontWeight: 600, color: accent, letterSpacing: '0.08em', marginBottom: 4 }}>
        4000 · REVENUE
      </div>
      {accountRow('4010', 'Service Revenue', 'Income')}
      {accountRow('4020', 'Product Sales', 'Income')}
    </div>
  );
};

Object.assign(window, { TF, FONT_DISPLAY, FONT_BODY, Icon, Icons, BrandSwoosh, CoaPage });
