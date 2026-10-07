const { useComposition, CompositionStage, Captions, Easing, animate, clamp } = window;

const MOTION = {
  enter: (start, dur = 0.5) => (T) => ({
    o: animate({ from: 0, to: 1, start, end: start + dur, ease: Easing.easeOutCubic })(T),
    y: animate({ from: 24, to: 0, start, end: start + dur, ease: Easing.easeOutCubic })(T),
  }),
  pop: (start, dur = 0.45) => (T) => animate({ from: 0.6, to: 1, start, end: start + dur, ease: Easing.easeOutBack })(T),
  drift: (start, end, from, to) => (T) => animate({ from, to, start, end, ease: Easing.easeInOutSine })(T),
};

const LOGO = 'https://coreadvisors.com/wp-content/uploads/2024/12/CoreAdvisors-logo-with-text.png';
const F = "'Euclid Circular B', sans-serif";

const Avatar = ({ c, i }) => (
  <div style={{ width: 54, height: 54, borderRadius: '50%', background: c, border: '3px solid #fff', marginLeft: i ? -14 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 20, fontWeight: 600 }}>{['C', 'F', 'B', 'P'][i]}</div>
);

const Bubble = ({ who, text, me, at, T, typingAt }) => {
  const typing = typingAt != null && T >= typingAt && T < at;
  const e = MOTION.enter(at, 0.4)(T);
  const te = MOTION.enter(typingAt ?? at, 0.3)(T);
  if (!typing && T < at) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: me ? 'flex-end' : 'flex-start', gap: 6, opacity: typing ? te.o : e.o, transform: `translateY(${typing ? te.y : e.y}px)` }}>
      {!me && <span style={{ fontSize: 20, color: '#8a8a8e', padding: '0 14px' }}>{who}</span>}
      <div style={{ maxWidth: '78%', background: me ? '#155081' : '#e9e9eb', color: me ? '#fff' : '#111', borderRadius: 28, padding: typing ? '18px 26px' : '18px 26px', fontSize: 30, lineHeight: 1.3, fontFamily: F }}>
        {typing ? (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', height: 30 }}>
            {[0, 1, 2].map((d) => <div key={d} style={{ width: 12, height: 12, borderRadius: '50%', background: '#8a8a8e', opacity: 0.4 + 0.6 * Math.abs(Math.sin((T * 4 + d) * 1.3)) }} />)}
          </div>
        ) : text}
      </div>
    </div>
  );
};

const CLICK = 'uploads/matthewvakaliuk73627-mouse-click-290204.mp3';
const ClickSfx = ({ at, T }) => {
  const on = T >= at && T < at + 0.35;
  const fired = React.useRef(false);
  React.useEffect(() => {
    if (on && !fired.current) { fired.current = true; try { const a = new Audio(CLICK); a.volume = 0.8; a.play().catch(() => {}); } catch (e) {} }
    if (!on) fired.current = false;
  }, [on]);
  if (!on) return null;
  return <video src={CLICK} muted={false} data-om-exportable-video-play-start="0" data-om-exportable-video-play-end="0.3" style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }} />;
};

const Piece = () => {
  const { T, CUES, authoredTotal, playing } = useComposition();
  const Q = CUES.Question, R = CUES.Replies, S = CUES.Seen, P = CUES.Punch, E = CUES.End;
  const phoneScale = MOTION.drift(0, P, 1, 1.04)(T) * (T >= P ? animate({ from: 1, to: 0.94, start: P, end: P + 0.7, ease: Easing.easeInOutCubic })(T) : 1);
  const phoneY = 0;
  const head = MOTION.enter(P + 0.4, 0.6)(T);
  const head2 = MOTION.enter(P + 1.1, 0.6)(T);
  const cta = MOTION.enter(E, 0.5)(T);
  const seenE = MOTION.enter(S, 0.4)(T);
  const dim = 0;
  const msgs = [
    { who: 'Me', text: 'Did anyone plan for the new op?', me: true, at: Q + 0.3 },
    { who: 'CPA', text: 'Check with your financial advisor.', at: R + 0.9, typingAt: R },
    { who: 'Financial Advisor', text: 'Not my area, sorry.', at: R + 2.3, typingAt: R + 1.5 },
    { who: 'Bookkeeper', text: 'Did it hit the books yet?', at: R + 3.7, typingAt: R + 2.9 },
    { who: 'Payroll', text: 'Not my area.', at: R + 4.9, typingAt: R + 4.2 },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#d5ecf6', fontFamily: F, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 340, background: '#fff' }} />
      <div style={{ position: 'absolute', left: 80, right: 80, top: 230, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 5 }}>
        <img src={LOGO} alt="" style={{ height: 96, width: 'auto' }} />
        <span style={{ fontSize: 22, fontWeight: 600, letterSpacing: '0.12em', color: '#092d4f' }}>ONE TEAM FOR DENTISTS</span>
      </div>
      <div style={{ position: 'absolute', left: 90, right: 90, top: 400, height: 900, transform: `translateY(${phoneY}px) scale(${phoneScale})`, transformOrigin: 'top center' }}>
        <div style={{ background: '#fff', borderRadius: 48, boxShadow: '0 40px 90px rgba(9,45,79,0.3)', overflow: 'hidden', height: '100%', position: 'relative' }}>
          <div style={{ borderBottom: '1px solid #e5e5ea', padding: '30px 24px 24px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>{['#092d4f', '#155081', '#5d7186', '#7d8fa3'].map((c, i) => <Avatar key={i} c={c} i={i} />)}</div>
            <p style={{ margin: 0, fontSize: 28, fontWeight: 600, color: '#111' }}>My Advisors</p>
            <p style={{ margin: '4px 0 0', fontSize: 19, color: '#8a8a8e' }}>CPA, Bookkeeper, Payroll, Financial Advisor</p>
          </div>
          <div style={{ padding: '34px 28px', display: 'flex', flexDirection: 'column', gap: 22 }}>
            {msgs.map((m, i) => <Bubble key={i} {...m} T={T} />)}
            {msgs.map((m, i) => <ClickSfx key={'s' + i} at={m.at} T={T} />)}
            {T >= S && <p style={{ margin: '6px 14px 0', textAlign: 'right', fontSize: 20, color: '#8a8a8e', opacity: seenE.o }}>Seen by 4</p>}
          </div>
          <div style={{ position: 'absolute', inset: 0, background: `rgba(9,45,79,${dim})`, pointerEvents: 'none' }} />
        </div>
      </div>
      <div style={{ position: 'absolute', left: 80, right: 80, bottom: 150, zIndex: 6, textAlign: 'center' }}>
        <h2 style={{ margin: 0, fontSize: 82, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.025em', color: '#092d4f', opacity: head.o, transform: `translateY(${head.y}px)` }}>Your advisors don't talk.</h2>
        <h2 style={{ margin: '6px 0 0', fontSize: 82, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.025em', color: '#155081', opacity: head2.o, transform: `translateY(${head2.y}px)` }}>Ours share a table.</h2>
        <div style={{ marginTop: 48, display: 'flex', justifyContent: 'center', opacity: cta.o, transform: `translateY(${cta.y}px)` }}><div style={{ background: '#092d4f', color: '#fff', borderRadius: 99, padding: '30px 64px', fontSize: 36, fontWeight: 600 }}>Book a free 30-minute call</div></div>
      </div>
    </div>
  );
};

window.GroupChatReel = () => (
  <CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#d5ecf6">
    <Piece />
  </CompositionStage>
);
