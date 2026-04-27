// JobEnglish AI Brasil — interactive prototype
// Warm Brazilian-modern. Android frame. PT-BR UI, EN roleplay content.

const { useState, useEffect, useRef, useMemo } = React;

// ─────────────────────────────────────────────────────────────
// Design tokens
// ─────────────────────────────────────────────────────────────
const T = {
  // surfaces — warm off-white
  bg: '#F7F1E8',
  bgDeep: '#F1E8D9',
  card: '#FFFCF6',
  ink: '#1F1A14',
  ink2: '#5C5046',
  ink3: '#8A7C6E',
  hairline: '#E7DCC9',
  // accents
  terracotta: '#C8553D',     // primary action / hero
  sun: '#E8A23A',            // sun / progress
  mango: '#D97A2B',           // secondary warm
  navy: '#1F3147',            // deep cool ink
  leaf: '#5E7A4F',            // success
  blush: '#F2D9C9',
  sky: '#CDDDE6',
};

const FONT_DISPLAY = `'Fraunces', 'Cooper', Georgia, serif`;
const FONT_BODY = `'Manrope', 'Inter', system-ui, sans-serif`;
const FONT_MONO = `'JetBrains Mono', ui-monospace, monospace`;

// ─────────────────────────────────────────────────────────────
// Android device frame (custom, themed)
// ─────────────────────────────────────────────────────────────
function StatusBar({ tone = 'light' }) {
  const c = tone === 'dark' ? '#fff' : T.ink;
  return (
    <div style={{
      height: 38, display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 18px',
      position: 'relative', flexShrink: 0,
      fontFamily: FONT_BODY,
    }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: c, letterSpacing: 0.2 }}>9:41</span>
      <div style={{
        position: 'absolute', left: '50%', top: 8, transform: 'translateX(-50%)',
        width: 22, height: 22, borderRadius: 100, background: '#0a0a0a',
      }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <svg width="14" height="10" viewBox="0 0 16 12"><path d="M8 11.5L.5 4a10.5 10.5 0 0115 0L8 11.5z" fill={c}/></svg>
        <svg width="14" height="10" viewBox="0 0 16 12"><path d="M14 11V1L1.5 11H14z" fill={c}/></svg>
        <svg width="20" height="10" viewBox="0 0 22 12"><rect x="0.5" y="1.5" width="18" height="9" rx="2" stroke={c} fill="none"/><rect x="2" y="3" width="13" height="6" rx="1" fill={c}/><rect x="19.5" y="4" width="2" height="4" rx="1" fill={c}/></svg>
      </div>
    </div>
  );
}

function NavBar() {
  return (
    <div style={{ height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <div style={{ width: 120, height: 4, borderRadius: 2, background: T.ink, opacity: 0.55 }} />
    </div>
  );
}

function Device({ children, bg = T.bg }) {
  return (
    <div style={{
      width: 392, height: 820, borderRadius: 44, overflow: 'hidden',
      background: bg,
      border: `2px solid #2a241d`,
      boxShadow: '0 40px 90px -20px rgba(40,28,12,0.45), 0 0 0 8px #1a140e, 0 0 0 9px #3d3127',
      display: 'flex', flexDirection: 'column', boxSizing: 'border-box',
      position: 'relative',
    }}>
      <StatusBar />
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
      <NavBar />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Wordmark
// ─────────────────────────────────────────────────────────────
function Wordmark({ size = 22, mono = false }) {
  return (
    <div style={{
      fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: size,
      color: mono ? T.ink : T.ink, letterSpacing: -0.4, lineHeight: 1,
      display: 'inline-flex', alignItems: 'baseline', gap: 0,
    }}>
      <span style={{ fontStyle: 'italic' }}>job</span>
      <span>English</span>
      <span style={{
        marginLeft: 6, fontSize: size * 0.5, fontFamily: FONT_MONO,
        color: T.terracotta, fontWeight: 500, letterSpacing: 1, fontStyle: 'normal',
        transform: 'translateY(-' + (size * 0.35) + 'px)',
      }}>BR</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Primitives
// ─────────────────────────────────────────────────────────────
function Btn({ children, onClick, variant = 'primary', size = 'lg', style = {}, icon }) {
  const base = {
    fontFamily: FONT_BODY, fontWeight: 600, letterSpacing: -0.1,
    border: 'none', borderRadius: 999, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    transition: 'transform 0.12s ease, opacity 0.12s ease',
    width: '100%', boxSizing: 'border-box',
  };
  const sizes = {
    lg: { fontSize: 16, padding: '16px 20px' },
    md: { fontSize: 14, padding: '12px 18px' },
    sm: { fontSize: 13, padding: '8px 14px' },
  };
  const variants = {
    primary: { background: T.ink, color: '#FFF8EC' },
    accent: { background: T.terracotta, color: '#FFF8EC' },
    ghost: { background: 'transparent', color: T.ink, border: `1.5px solid ${T.ink}` },
    soft: { background: T.blush, color: T.terracotta },
    quiet: { background: 'transparent', color: T.ink2 },
  };
  return (
    <button onClick={onClick} style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
      onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      {icon}{children}
    </button>
  );
}

function Tag({ children, color = T.terracotta, bg }) {
  return (
    <span style={{
      fontFamily: FONT_MONO, fontSize: 10, fontWeight: 500,
      letterSpacing: 1.2, textTransform: 'uppercase',
      color, background: bg || `${color}15`,
      padding: '4px 8px', borderRadius: 4,
      display: 'inline-block',
    }}>{children}</span>
  );
}

// little hand-drawn-ish sun
function Sun({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" style={{ display: 'block' }}>
      <circle cx="40" cy="40" r="14" fill={T.sun}/>
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const x1 = 40 + Math.cos(a) * 22, y1 = 40 + Math.sin(a) * 22;
        const x2 = 40 + Math.cos(a) * 32, y2 = 40 + Math.sin(a) * 32;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={T.sun} strokeWidth="3" strokeLinecap="round"/>;
      })}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN: 01 Welcome
// ─────────────────────────────────────────────────────────────
function ScreenWelcome({ go }) {
  return (
    <div data-screen-label="01 Welcome" style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      background: `linear-gradient(180deg, ${T.bg} 0%, ${T.bgDeep} 100%)`,
      padding: '20px 24px 24px', position: 'relative', overflow: 'hidden',
    }}>
      {/* sun graphic top-right */}
      <div style={{ position: 'absolute', top: 30, right: -30, opacity: 0.85 }}>
        <Sun size={180}/>
      </div>
      {/* terracotta blob bottom-left */}
      <div style={{
        position: 'absolute', left: -80, bottom: 120, width: 240, height: 240,
        borderRadius: '50%', background: T.terracotta, opacity: 0.12, filter: 'blur(2px)',
      }}/>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
        <Wordmark size={20}/>
        <Tag color={T.ink2}>v1.0 · beta</Tag>
      </div>

      <div style={{ flex: 1 }}/>

      <div style={{ position: 'relative' }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: T.terracotta, letterSpacing: 2, marginBottom: 14 }}>
          ━━ SEU SIMULADOR DE INGLÊS PROFISSIONAL
        </div>
        <h1 style={{
          fontFamily: FONT_DISPLAY, fontWeight: 500, fontSize: 44, lineHeight: 0.98,
          color: T.ink, margin: 0, letterSpacing: -1.5,
        }}>
          Treine o inglês <span style={{ fontStyle: 'italic', color: T.terracotta }}>que sua carreira precisa.</span>
        </h1>
        <p style={{
          fontFamily: FONT_BODY, fontSize: 16, lineHeight: 1.45, color: T.ink2,
          marginTop: 18, marginBottom: 0, maxWidth: 300,
        }}>
          Simule entrevistas, reuniões e apresentações em inglês com IA — e receba feedback em português.
        </p>
      </div>

      <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Btn variant="accent" onClick={() => go('goal')}>
          Começar diagnóstico grátis
          <span style={{ fontSize: 18, marginLeft: 4 }}>→</span>
        </Btn>
        <Btn variant="quiet" size="md" onClick={() => go('goal')}>
          Já tenho conta · Entrar
        </Btn>
      </div>

      <div style={{
        marginTop: 18, display: 'flex', alignItems: 'center', gap: 10,
        fontFamily: FONT_BODY, fontSize: 12, color: T.ink3,
      }}>
        <div style={{ display: 'flex' }}>
          {['#C8553D', '#E8A23A', '#5E7A4F'].map((c, i) => (
            <div key={i} style={{
              width: 22, height: 22, borderRadius: '50%', background: c,
              border: `2px solid ${T.bg}`, marginLeft: i ? -6 : 0,
            }}/>
          ))}
        </div>
        <span>+312 brasileiros praticaram esta semana</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN: 02 Goal selection
// ─────────────────────────────────────────────────────────────
const GOALS = [
  { id: 'tech', label: 'Entrevista tech', sub: 'Backend, frontend, system design', icon: '◆' },
  { id: 'meetings', label: 'Reuniões em inglês', sub: 'Standups, planning, atualizações', icon: '◐' },
  { id: 'data', label: 'Apresentação de projeto', sub: 'IA, dados, dashboards', icon: '▲' },
  { id: 'support', label: 'Suporte ao cliente', sub: 'Atendimento, escalonamentos', icon: '●' },
  { id: 'sales', label: 'Vendas / clientes internacionais', sub: 'Discovery, demos, objeções', icon: '◇' },
];

function ScreenGoal({ go }) {
  const [picked, setPicked] = useState('tech');
  return (
    <div data-screen-label="02 Goal" style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      background: T.bg, padding: '14px 24px 20px',
    }}>
      <TopNav onBack={() => go('welcome')} step={1} total={4}/>

      <div style={{ marginTop: 20 }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: T.ink3, letterSpacing: 2 }}>
          PASSO 01 · OBJETIVO
        </div>
        <h2 style={{
          fontFamily: FONT_DISPLAY, fontWeight: 500, fontSize: 30, lineHeight: 1.05,
          margin: '8px 0 6px', color: T.ink, letterSpacing: -0.8,
        }}>
          Onde você quer falar inglês <span style={{ fontStyle: 'italic', color: T.terracotta }}>com confiança?</span>
        </h2>
        <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: T.ink2, margin: 0 }}>
          Escolha um foco principal — você pode mudar depois.
        </p>
      </div>

      <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        {GOALS.map(g => {
          const active = picked === g.id;
          return (
            <button key={g.id} onClick={() => setPicked(g.id)} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 16px', borderRadius: 16,
              background: active ? T.ink : T.card,
              border: active ? `1.5px solid ${T.ink}` : `1.5px solid ${T.hairline}`,
              cursor: 'pointer', textAlign: 'left',
              fontFamily: FONT_BODY,
              transition: 'all 0.15s ease',
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: active ? T.terracotta : T.blush,
                color: active ? '#FFF8EC' : T.terracotta,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, flexShrink: 0,
              }}>{g.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: active ? '#FFF8EC' : T.ink }}>
                  {g.label}
                </div>
                <div style={{ fontSize: 12, color: active ? '#FFF8EC99' : T.ink3, marginTop: 2 }}>
                  {g.sub}
                </div>
              </div>
              <div style={{
                width: 20, height: 20, borderRadius: '50%',
                border: active ? 'none' : `1.5px solid ${T.hairline}`,
                background: active ? '#FFF8EC' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {active && <div style={{ width: 8, height: 8, borderRadius: '50%', background: T.ink }}/>}
              </div>
            </button>
          );
        })}
      </div>

      <Btn variant="accent" onClick={() => go('consent')} style={{ marginTop: 16 }}>
        Continuar →
      </Btn>
    </div>
  );
}

function TopNav({ onBack, step, total }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <button onClick={onBack} style={{
        background: T.card, border: `1px solid ${T.hairline}`, width: 40, height: 40,
        borderRadius: '50%', cursor: 'pointer', fontSize: 16, color: T.ink,
      }}>←</button>
      <div style={{ display: 'flex', gap: 6 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{
            width: i < step ? 18 : 8, height: 4, borderRadius: 2,
            background: i < step ? T.terracotta : T.hairline, transition: 'all 0.2s',
          }}/>
        ))}
      </div>
      <div style={{ width: 40 }}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN: 03 LGPD Consent
// ─────────────────────────────────────────────────────────────
const CONSENTS = [
  { id: 'voice', label: 'Aceito o processamento da minha voz para análise de inglês.', required: true },
  { id: 'ai', label: 'Aceito receber feedback gerado por IA em português.', required: true },
  { id: 'estimate', label: 'Entendo que as notas são estimativas educacionais — não certificação oficial.', required: true },
  { id: 'audio', label: 'Permitir armazenar áudio por 30 dias para revisão (opcional).', required: false },
];

function ScreenConsent({ go }) {
  const [accepted, setAccepted] = useState({ voice: false, ai: false, estimate: false, audio: false });
  const required = CONSENTS.filter(c => c.required).every(c => accepted[c.id]);

  return (
    <div data-screen-label="03 Consent" style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      background: T.bg, padding: '14px 24px 20px', overflow: 'auto',
    }}>
      <TopNav onBack={() => go('goal')} step={2} total={4}/>

      <div style={{ marginTop: 20 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontFamily: FONT_MONO, fontSize: 10, letterSpacing: 1.5,
          color: T.leaf, background: `${T.leaf}15`, padding: '5px 9px', borderRadius: 4,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.leaf }}/>
          LGPD · ANPD COMPLIANT
        </div>
        <h2 style={{
          fontFamily: FONT_DISPLAY, fontWeight: 500, fontSize: 28, lineHeight: 1.05,
          margin: '12px 0 6px', color: T.ink, letterSpacing: -0.6,
        }}>
          Antes de começar, <span style={{ fontStyle: 'italic', color: T.terracotta }}>uns combinados.</span>
        </h2>
        <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: T.ink2, margin: 0, lineHeight: 1.45 }}>
          Para gerar feedback, vamos processar sua voz, transcrição e respostas. Você pode excluir tudo quando quiser.
        </p>
      </div>

      <div style={{
        marginTop: 18, padding: 14, borderRadius: 14,
        background: T.card, border: `1px solid ${T.hairline}`,
        display: 'flex', flexDirection: 'column', gap: 12, flex: 1,
      }}>
        {CONSENTS.map(c => {
          const on = accepted[c.id];
          return (
            <label key={c.id} style={{
              display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer',
              fontFamily: FONT_BODY,
            }}>
              <div onClick={() => setAccepted(a => ({ ...a, [c.id]: !on }))} style={{
                width: 22, height: 22, borderRadius: 6,
                background: on ? T.ink : 'transparent',
                border: `1.5px solid ${on ? T.ink : T.ink3}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, marginTop: 2, transition: 'all 0.15s',
              }}>
                {on && <span style={{ color: '#FFF8EC', fontSize: 14, lineHeight: 1 }}>✓</span>}
              </div>
              <div style={{ flex: 1, fontSize: 13.5, color: T.ink, lineHeight: 1.4 }}>
                {c.label}
                {!c.required && <span style={{ color: T.ink3, fontSize: 11, marginLeft: 4 }}>· opcional</span>}
              </div>
            </label>
          );
        })}

        <div style={{
          marginTop: 4, padding: '12px 14px', borderRadius: 10,
          background: T.bgDeep, fontFamily: FONT_BODY, fontSize: 12, color: T.ink2, lineHeight: 1.4,
        }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: T.ink3, letterSpacing: 1 }}>SEUS DIREITOS · </span>
          Acessar, corrigir, exportar e excluir seus dados a qualquer momento em <strong style={{ color: T.ink }}>Perfil → Privacidade</strong>.
        </div>
      </div>

      <Btn
        variant={required ? 'accent' : 'primary'}
        onClick={() => required && go('mic')}
        style={{ marginTop: 16, opacity: required ? 1 : 0.4, cursor: required ? 'pointer' : 'not-allowed' }}
      >
        {required ? 'Concordo · Continuar →' : 'Aceite os itens obrigatórios'}
      </Btn>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN: 04 Diagnostic / Mic test
// ─────────────────────────────────────────────────────────────
function Waveform({ active, color = T.terracotta }) {
  const bars = 28;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 56 }}>
      {Array.from({ length: bars }).map((_, i) => {
        const seed = (Math.sin(i * 1.7) + 1) / 2;
        const h = active ? 6 + seed * 44 + Math.sin(Date.now() / 200 + i) * 8 : 6 + seed * 14;
        return (
          <div key={i} style={{
            width: 3, borderRadius: 2,
            height: Math.max(4, h),
            background: color,
            opacity: active ? 0.7 + seed * 0.3 : 0.35,
            animation: active ? `pulse-${i % 4} ${0.6 + seed * 0.5}s ease-in-out infinite alternate` : 'none',
          }}/>
        );
      })}
    </div>
  );
}

function ScreenDiagnostic({ go }) {
  const [recording, setRecording] = useState(false);
  const [time, setTime] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!recording) return;
    const id = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(id);
  }, [recording]);

  const fmt = s => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  return (
    <div data-screen-label="04 Diagnostic" style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      background: T.bg, padding: '14px 24px 20px',
    }}>
      <TopNav onBack={() => go('consent')} step={3} total={4}/>

      <div style={{ marginTop: 18 }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: T.ink3, letterSpacing: 2 }}>
          DIAGNÓSTICO · 1 DE 5
        </div>
        <h2 style={{
          fontFamily: FONT_DISPLAY, fontWeight: 500, fontSize: 26, lineHeight: 1.1,
          margin: '6px 0 0', color: T.ink, letterSpacing: -0.6,
        }}>
          Responda em <span style={{ fontStyle: 'italic', color: T.terracotta }}>inglês</span>, do seu jeito.
        </h2>
      </div>

      <div style={{
        marginTop: 18, padding: '20px 18px', borderRadius: 18,
        background: T.ink, color: '#FFF8EC',
        fontFamily: FONT_BODY,
      }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: 1.5, color: T.sun, marginBottom: 10 }}>
          ━━ PROMPT · EN
        </div>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 22, lineHeight: 1.25, fontWeight: 400, fontStyle: 'italic' }}>
          “Tell me about your current job or a project you've worked on recently.”
        </div>
        <div style={{
          marginTop: 12, fontSize: 12, color: '#FFF8EC99',
          paddingTop: 12, borderTop: `1px solid #FFF8EC22`,
        }}>
          Tradução: Conte sobre seu trabalho atual ou um projeto recente.
        </div>
      </div>

      <div style={{ flex: 1 }}/>

      {/* waveform + mic */}
      <div style={{
        background: T.card, borderRadius: 24, padding: '20px 16px',
        border: `1px solid ${T.hairline}`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
      }}>
        <Waveform active={recording}/>
        <div style={{
          fontFamily: FONT_MONO, fontSize: 13, color: recording ? T.terracotta : T.ink3,
          letterSpacing: 1, fontWeight: 600,
        }}>
          {recording ? `● GRAVANDO · ${fmt(time)}` : done ? `✓ GRAVADO · ${fmt(time)}` : 'TOQUE PARA GRAVAR'}
        </div>

        <button onClick={() => {
          if (!recording && !done) { setRecording(true); setTime(0); }
          else if (recording) { setRecording(false); setDone(true); }
        }} style={{
          width: 76, height: 76, borderRadius: '50%',
          background: recording ? T.ink : T.terracotta,
          border: 'none', cursor: 'pointer',
          color: '#FFF8EC',
          boxShadow: recording ? `0 0 0 8px ${T.terracotta}33` : `0 8px 24px ${T.terracotta}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s',
        }}>
          {recording ? (
            <div style={{ width: 22, height: 22, background: '#FFF8EC', borderRadius: 4 }}/>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <rect x="9" y="3" width="6" height="13" rx="3" fill="#FFF8EC"/>
              <path d="M5 11a7 7 0 0014 0M12 18v3" stroke="#FFF8EC" strokeWidth="2" strokeLinecap="round" fill="none"/>
            </svg>
          )}
        </button>

        <div style={{ display: 'flex', gap: 16, fontFamily: FONT_BODY, fontSize: 13, color: T.ink2 }}>
          <button style={{ background: 'transparent', border: 'none', color: T.ink2, cursor: 'pointer' }}>↻ Regravar</button>
          <span style={{ color: T.hairline }}>·</span>
          <button style={{ background: 'transparent', border: 'none', color: T.ink2, cursor: 'pointer' }}>♪ Ouvir</button>
        </div>
      </div>

      <Btn
        variant="accent"
        onClick={() => done && go('home')}
        style={{ marginTop: 14, opacity: done ? 1 : 0.4, cursor: done ? 'pointer' : 'not-allowed' }}
      >
        {done ? 'Enviar resposta →' : 'Grave para continuar'}
      </Btn>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN: 05 Learner home
// ─────────────────────────────────────────────────────────────
function ScreenHome({ go }) {
  return (
    <div data-screen-label="05 Home" style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      background: T.bg, overflow: 'auto',
    }}>
      {/* header */}
      <div style={{ padding: '16px 22px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Wordmark size={18}/>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: T.terracotta, color: '#FFF8EC',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: FONT_BODY, fontSize: 14, fontWeight: 700,
        }}>A</div>
      </div>

      <div style={{ padding: '8px 22px 4px' }}>
        <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: T.ink2 }}>Olá, Ana 👋</div>
        <h2 style={{
          fontFamily: FONT_DISPLAY, fontWeight: 500, fontSize: 28, lineHeight: 1.05,
          margin: '4px 0 0', color: T.ink, letterSpacing: -0.6,
        }}>
          Sua entrevista <span style={{ fontStyle: 'italic', color: T.terracotta }}>está mais perto.</span>
        </h2>
      </div>

      {/* level + streak strip */}
      <div style={{ padding: '14px 22px 0', display: 'flex', gap: 10 }}>
        <div style={{
          flex: 1, padding: '12px 14px', borderRadius: 14,
          background: T.card, border: `1px solid ${T.hairline}`,
        }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: T.ink3, letterSpacing: 1.4 }}>NÍVEL ATUAL</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 26, color: T.ink, fontWeight: 600 }}>B1</span>
            <span style={{ fontFamily: FONT_BODY, fontSize: 11, color: T.leaf, fontWeight: 600 }}>↑ +0.3</span>
          </div>
          <div style={{ fontFamily: FONT_BODY, fontSize: 11, color: T.ink3, marginTop: 2 }}>intermediário</div>
        </div>
        <div style={{
          flex: 1, padding: '12px 14px', borderRadius: 14,
          background: T.ink, color: '#FFF8EC',
        }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: '#FFF8EC99', letterSpacing: 1.4 }}>STREAK</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 26, fontWeight: 600 }}>7</span>
            <span style={{ fontFamily: FONT_BODY, fontSize: 11, color: T.sun, fontWeight: 600 }}>dias</span>
          </div>
          <div style={{ fontFamily: FONT_BODY, fontSize: 11, color: '#FFF8EC99', marginTop: 2 }}>continue assim</div>
        </div>
      </div>

      {/* today's practice — hero card */}
      <div style={{ padding: '16px 22px 0' }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: T.ink3, letterSpacing: 1.5, marginBottom: 8 }}>
          ━━ PRÁTICA DE HOJE
        </div>
        <button onClick={() => go('roleplay')} style={{
          width: '100%', padding: 0, border: 'none', cursor: 'pointer',
          borderRadius: 20, overflow: 'hidden', textAlign: 'left',
          background: T.terracotta, color: '#FFF8EC',
          position: 'relative',
        }}>
          {/* sun shape */}
          <div style={{ position: 'absolute', top: -40, right: -40, opacity: 0.25 }}>
            <Sun size={140}/>
          </div>
          <div style={{ padding: '18px 18px 16px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <Tag color="#FFF8EC" bg="#FFF8EC22">TECH INTERVIEW</Tag>
              <span style={{ fontFamily: FONT_MONO, fontSize: 11, opacity: 0.85 }}>~ 7 min</span>
            </div>
            <div style={{
              fontFamily: FONT_DISPLAY, fontSize: 22, lineHeight: 1.15, fontWeight: 500,
              letterSpacing: -0.4, maxWidth: 260,
            }}>
              Explain a backend project <span style={{ fontStyle: 'italic' }}>you've built.</span>
            </div>
            <div style={{
              marginTop: 14, paddingTop: 12, borderTop: '1px solid #FFF8EC33',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              fontFamily: FONT_BODY, fontSize: 13,
            }}>
              <span style={{ opacity: 0.9 }}>Foco: fluência + frases naturais</span>
              <span style={{
                background: '#FFF8EC', color: T.terracotta,
                width: 32, height: 32, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, fontWeight: 700,
              }}>→</span>
            </div>
          </div>
        </button>
      </div>

      {/* weekly goal */}
      <div style={{ padding: '14px 22px 0' }}>
        <div style={{
          padding: '14px 16px', borderRadius: 14,
          background: T.card, border: `1px solid ${T.hairline}`,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontFamily: FONT_BODY, fontSize: 13, color: T.ink, fontWeight: 600 }}>Meta semanal</span>
            <span style={{ fontFamily: FONT_MONO, fontSize: 13, color: T.ink2 }}>
              <strong style={{ color: T.ink }}>18</strong> / 45 min
            </span>
          </div>
          <div style={{
            marginTop: 10, height: 8, borderRadius: 4, background: T.bgDeep, overflow: 'hidden',
          }}>
            <div style={{
              width: '40%', height: '100%',
              background: `linear-gradient(90deg, ${T.sun}, ${T.terracotta})`, borderRadius: 4,
            }}/>
          </div>
          <div style={{ fontFamily: FONT_BODY, fontSize: 11, color: T.ink3, marginTop: 6 }}>
            Mais 27 minutos para fechar a semana
          </div>
        </div>
      </div>

      {/* up next list */}
      <div style={{ padding: '16px 22px 0' }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: T.ink3, letterSpacing: 1.5, marginBottom: 8 }}>
          ━━ TRILHA · ENGLISH FOR TECH INTERVIEWS
        </div>
        {[
          { i: '01', t: 'Tell me about yourself', d: '5 min', done: true },
          { i: '02', t: 'Explain a backend project', d: '7 min', done: false, active: true },
          { i: '03', t: 'Debugging challenge', d: '7 min', done: false },
          { i: '04', t: 'System design basics', d: '12 min', done: false },
        ].map(s => (
          <div key={s.i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 4px', borderBottom: `1px solid ${T.hairline}`,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8, flexShrink: 0,
              background: s.done ? T.leaf : s.active ? T.terracotta : T.bgDeep,
              color: (s.done || s.active) ? '#FFF8EC' : T.ink3,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: FONT_MONO, fontSize: 11, fontWeight: 600,
            }}>{s.done ? '✓' : s.i}</div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: FONT_BODY, fontSize: 14, fontWeight: 500,
                color: T.ink, opacity: s.done ? 0.5 : 1,
                textDecoration: s.done ? 'line-through' : 'none',
              }}>{s.t}</div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: T.ink3, letterSpacing: 0.5 }}>{s.d}</div>
            </div>
            {s.active && <span style={{ fontSize: 14, color: T.terracotta }}>→</span>}
          </div>
        ))}
      </div>

      <div style={{ height: 80 }}/>

      {/* bottom tab bar */}
      <div style={{
        position: 'sticky', bottom: 0,
        background: T.card, borderTop: `1px solid ${T.hairline}`,
        display: 'flex', justifyContent: 'space-around', padding: '10px 0 8px',
      }}>
        {[
          { l: 'Início', a: true, i: '◉' },
          { l: 'Praticar', a: false, i: '◐' },
          { l: 'Progresso', a: false, i: '▲' },
          { l: 'Perfil', a: false, i: '○' },
        ].map(t => (
          <div key={t.l} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            color: t.a ? T.terracotta : T.ink3,
            fontFamily: FONT_BODY, fontSize: 10, fontWeight: t.a ? 600 : 500,
          }}>
            <div style={{ fontSize: 18 }}>{t.i}</div>
            {t.l}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN: 06 Roleplay
// ─────────────────────────────────────────────────────────────
const ROLEPLAY_TURNS = [
  {
    speaker: 'ai',
    en: "Hi Ana. Thanks for joining. To start — tell me about a backend project you've built recently. What was the main technical challenge?",
    pt: 'Olá Ana. Obrigado por participar. Para começar — me conte sobre um projeto backend que você construiu recentemente. Qual foi o principal desafio técnico?',
  },
  {
    speaker: 'user',
    en: "I made an API for login and users. The challenge was make it secure and connect with database.",
  },
  {
    speaker: 'ai',
    en: "Got it. How did you handle authentication and protect the user data?",
    pt: 'Entendi. Como você lidou com a autenticação e protegeu os dados do usuário?',
  },
];

function ScreenRoleplay({ go }) {
  const [turn, setTurn] = useState(0); // index into roleplay
  const [recording, setRecording] = useState(false);
  const [recTime, setRecTime] = useState(0);

  const visible = ROLEPLAY_TURNS.slice(0, turn + 1);

  useEffect(() => {
    if (!recording) return;
    const id = setInterval(() => setRecTime(t => t + 1), 1000);
    return () => clearInterval(id);
  }, [recording]);

  const handleMic = () => {
    if (!recording) {
      setRecording(true); setRecTime(0);
    } else {
      setRecording(false);
      // advance to show user response, then AI follow-up
      setTimeout(() => setTurn(1), 200);
      setTimeout(() => setTurn(2), 1400);
    }
  };

  return (
    <div data-screen-label="06 Roleplay" style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      background: T.bgDeep,
    }}>
      {/* roleplay header */}
      <div style={{
        padding: '12px 18px',
        background: T.ink, color: '#FFF8EC',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <button onClick={() => go('home')} style={{
          background: '#FFF8EC15', border: 'none', color: '#FFF8EC',
          width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', fontSize: 14,
        }}>×</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 9, letterSpacing: 1.5, color: T.sun }}>
            ● AO VIVO · IA ROLEPLAY
          </div>
          <div style={{ fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600, marginTop: 2 }}>
            Marcus · Tech Interviewer
          </div>
        </div>
        <div style={{
          fontFamily: FONT_MONO, fontSize: 11, padding: '4px 10px',
          background: '#FFF8EC15', borderRadius: 99,
        }}>
          {Math.min(turn + 1, 3)}/5
        </div>
      </div>

      {/* scenario context bar */}
      <div style={{
        padding: '8px 18px', background: T.bgDeep,
        fontFamily: FONT_MONO, fontSize: 10, color: T.ink2, letterSpacing: 1,
        borderBottom: `1px solid ${T.hairline}`,
      }}>
        SCENARIO · EXPLAIN A BACKEND PROJECT · 7 MIN
      </div>

      {/* conversation */}
      <div style={{
        flex: 1, overflow: 'auto', padding: '18px 18px 12px',
        display: 'flex', flexDirection: 'column', gap: 14,
      }}>
        {visible.map((t, i) => t.speaker === 'ai' ? (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
              background: T.navy, color: '#FFF8EC',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: FONT_DISPLAY, fontSize: 16, fontWeight: 600,
            }}>M</div>
            <div style={{
              background: T.card, padding: '12px 14px',
              borderRadius: '4px 16px 16px 16px',
              border: `1px solid ${T.hairline}`,
              maxWidth: 270, fontFamily: FONT_BODY,
            }}>
              <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: T.ink3, letterSpacing: 1, marginBottom: 4 }}>
                EN · ♪ playing
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.4, color: T.ink }}>{t.en}</div>
              <details style={{ marginTop: 8 }}>
                <summary style={{
                  fontFamily: FONT_MONO, fontSize: 10, color: T.terracotta,
                  cursor: 'pointer', letterSpacing: 0.5, listStyle: 'none',
                }}>
                  ⤷ Traduzir
                </summary>
                <div style={{
                  fontSize: 12, color: T.ink2, lineHeight: 1.4, marginTop: 6,
                  paddingTop: 6, borderTop: `1px dashed ${T.hairline}`,
                }}>{t.pt}</div>
              </details>
            </div>
          </div>
        ) : (
          <div key={i} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{
              background: T.terracotta, color: '#FFF8EC',
              padding: '12px 14px', borderRadius: '16px 4px 16px 16px',
              maxWidth: 270, fontFamily: FONT_BODY,
            }}>
              <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: '#FFF8EC99', letterSpacing: 1, marginBottom: 4 }}>
                YOU · transcript
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.4 }}>“{t.en}”</div>
            </div>
          </div>
        ))}

        {recording && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{
              background: T.card, border: `1.5px dashed ${T.terracotta}`,
              padding: '12px 16px', borderRadius: '16px 4px 16px 16px',
              fontFamily: FONT_MONO, fontSize: 11, color: T.terracotta, letterSpacing: 1,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%', background: T.terracotta,
                animation: 'blink 1s infinite',
              }}/>
              ESCUTANDO... {String(Math.floor(recTime/60)).padStart(2,'0')}:{String(recTime%60).padStart(2,'0')}
            </div>
          </div>
        )}
      </div>

      {/* helper chips */}
      <div style={{
        padding: '8px 18px 0', display: 'flex', gap: 8, overflow: 'auto',
        scrollbarWidth: 'none',
      }}>
        {['↻ Repetir', '⤷ Traduzir', '◆ Dica', '♪ Mais devagar'].map(c => (
          <button key={c} style={{
            background: T.card, border: `1px solid ${T.hairline}`,
            padding: '7px 12px', borderRadius: 99,
            fontFamily: FONT_BODY, fontSize: 12, color: T.ink, whiteSpace: 'nowrap',
            cursor: 'pointer',
          }}>{c}</button>
        ))}
      </div>

      {/* mic dock */}
      <div style={{
        padding: '14px 18px 16px',
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <button onClick={() => go('feedback')} style={{
          fontFamily: FONT_BODY, fontSize: 12, fontWeight: 600,
          color: T.ink2, background: 'transparent', border: 'none', cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}>Finalizar</button>

        <div style={{
          flex: 1, height: 56, borderRadius: 99,
          background: T.card, border: `1px solid ${T.hairline}`,
          display: 'flex', alignItems: 'center', padding: '0 16px',
        }}>
          <Waveform active={recording}/>
        </div>

        <button onClick={turn >= 2 ? () => go('feedback') : handleMic} style={{
          width: 56, height: 56, borderRadius: '50%',
          background: recording ? T.ink : turn >= 2 ? T.leaf : T.terracotta,
          border: 'none', cursor: 'pointer', color: '#FFF8EC',
          boxShadow: `0 6px 16px ${T.terracotta}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          {recording ? (
            <div style={{ width: 16, height: 16, background: '#FFF8EC', borderRadius: 3 }}/>
          ) : turn >= 2 ? (
            <span style={{ fontSize: 18 }}>→</span>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="9" y="3" width="6" height="13" rx="3" fill="#FFF8EC"/>
              <path d="M5 11a7 7 0 0014 0M12 18v3" stroke="#FFF8EC" strokeWidth="2" strokeLinecap="round" fill="none"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN: 07 Feedback
// ─────────────────────────────────────────────────────────────
const SKILLS = [
  { k: 'Fluência', v: 68 },
  { k: 'Gramática', v: 64 },
  { k: 'Vocabulário', v: 76 },
  { k: 'Clareza', v: 74 },
  { k: 'Pronúncia', v: 70 },
];

function Radar({ skills }) {
  const cx = 120, cy = 120, r = 90;
  const n = skills.length;
  const points = skills.map((s, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    const dist = (s.v / 100) * r;
    return [cx + Math.cos(a) * dist, cy + Math.sin(a) * dist];
  });
  const labels = skills.map((s, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    const dist = r + 18;
    return { x: cx + Math.cos(a) * dist, y: cy + Math.sin(a) * dist, ...s, a };
  });
  const path = points.map((p, i) => (i === 0 ? 'M' : 'L') + p[0] + ',' + p[1]).join(' ') + 'Z';

  return (
    <svg width={240} height={240} viewBox="0 0 240 240">
      {/* rings */}
      {[0.25, 0.5, 0.75, 1].map(f => (
        <circle key={f} cx={cx} cy={cy} r={r * f} fill="none" stroke={T.hairline} strokeWidth="1"/>
      ))}
      {/* spokes */}
      {skills.map((_, i) => {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2;
        return <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(a) * r} y2={cy + Math.sin(a) * r} stroke={T.hairline}/>;
      })}
      {/* shape */}
      <path d={path} fill={T.terracotta} fillOpacity="0.18" stroke={T.terracotta} strokeWidth="2" strokeLinejoin="round"/>
      {points.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="4" fill={T.terracotta}/>
      ))}
      {/* labels */}
      {labels.map((l, i) => (
        <g key={i}>
          <text x={l.x} y={l.y - 4} textAnchor="middle"
            fontFamily={FONT_MONO} fontSize="9" letterSpacing="1" fill={T.ink3}>
            {l.k.toUpperCase()}
          </text>
          <text x={l.x} y={l.y + 8} textAnchor="middle"
            fontFamily={FONT_DISPLAY} fontSize="13" fontWeight="600" fill={T.ink}>
            {l.v}
          </text>
        </g>
      ))}
    </svg>
  );
}

const CORRECTIONS = [
  {
    you: 'I made an API for login and users.',
    better: 'I built an API for user authentication.',
    why: '“Authentication” soa mais profissional em contexto técnico, e “built” é mais comum que “made” para projetos de engenharia.',
  },
  {
    you: 'The challenge was make it secure.',
    better: 'The challenge was making it secure.',
    why: 'Depois de “was,” aqui usamos verbo com -ing — “making.”',
  },
  {
    you: 'connect with database.',
    better: 'connect it to the database.',
    why: 'Em inglês técnico, “connect to the database” é mais natural — e use o artigo “the.”',
  },
];

function ScreenFeedback({ go }) {
  return (
    <div data-screen-label="07 Feedback" style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      background: T.bg, overflow: 'auto',
    }}>
      {/* hero */}
      <div style={{
        padding: '14px 22px 22px',
        background: `linear-gradient(180deg, ${T.bg} 0%, ${T.bg} 100%)`,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -50, right: -50, opacity: 0.7 }}>
          <Sun size={180}/>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          <button onClick={() => go('home')} style={{
            background: T.card, border: `1px solid ${T.hairline}`, width: 36, height: 36,
            borderRadius: '50%', cursor: 'pointer', fontSize: 14, color: T.ink,
          }}>×</button>
          <Tag color={T.leaf}>● SESSÃO COMPLETA</Tag>
          <div style={{ width: 36 }}/>
        </div>

        <div style={{ marginTop: 16, position: 'relative' }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: T.ink3, letterSpacing: 2 }}>
            ━━ FEEDBACK · TECH INTERVIEW
          </div>
          <h2 style={{
            fontFamily: FONT_DISPLAY, fontWeight: 500, fontSize: 26, lineHeight: 1.05,
            margin: '6px 0 12px', color: T.ink, letterSpacing: -0.6,
          }}>
            Você comunicou bem <span style={{ fontStyle: 'italic', color: T.terracotta }}>a ideia principal.</span>
          </h2>
        </div>

        {/* score row */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', gap: 18, position: 'relative',
          padding: '12px 16px', background: T.ink, borderRadius: 18, color: '#FFF8EC',
        }}>
          <div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: T.sun, letterSpacing: 1.5 }}>
              SCORE GERAL
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 2 }}>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: 56, fontWeight: 500, lineHeight: 1, letterSpacing: -2 }}>72</span>
              <span style={{ fontFamily: FONT_BODY, fontSize: 14, color: '#FFF8EC99' }}>/100</span>
            </div>
          </div>
          <div style={{ flex: 1, paddingBottom: 8 }}>
            <div style={{
              fontFamily: FONT_BODY, fontSize: 11, color: '#FFF8EC99',
              padding: '4px 8px', background: '#FFF8EC15', borderRadius: 4, display: 'inline-block',
              marginBottom: 6,
            }}>
              ↑ +9 vs. tentativa 1
            </div>
            <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: '#FFF8EC', lineHeight: 1.4 }}>
              <strong>Work-ready em cenários comuns.</strong> Vamos deixar seu inglês mais natural para entrevistas.
            </div>
          </div>
        </div>
      </div>

      {/* radar */}
      <div style={{ padding: '0 22px' }}>
        <div style={{
          padding: '14px 16px', borderRadius: 18,
          background: T.card, border: `1px solid ${T.hairline}`,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 6 }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: T.ink3, letterSpacing: 1.5 }}>
              ━━ HABILIDADES
            </span>
            <span style={{ fontFamily: FONT_BODY, fontSize: 11, color: T.ink3 }}>nesta sessão</span>
          </div>
          <Radar skills={SKILLS}/>
        </div>
      </div>

      {/* corrections */}
      <div style={{ padding: '16px 22px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: T.ink3, letterSpacing: 1.5 }}>
            ━━ TOP 3 CORREÇÕES
          </span>
          <span style={{ fontFamily: FONT_BODY, fontSize: 11, color: T.ink3 }}>EN → PT</span>
        </div>
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {CORRECTIONS.map((c, i) => (
            <div key={i} style={{
              padding: '14px 16px', borderRadius: 16,
              background: T.card, border: `1px solid ${T.hairline}`,
              fontFamily: FONT_BODY,
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8,
              }}>
                <span style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: T.terracotta, color: '#FFF8EC',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: FONT_MONO, fontSize: 11, fontWeight: 700,
                }}>{i + 1}</span>
                <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: T.ink3, letterSpacing: 1.2 }}>
                  CORREÇÃO
                </span>
              </div>

              {/* you said */}
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: T.ink3, letterSpacing: 1 }}>VOCÊ DISSE</div>
                <div style={{
                  fontSize: 14, color: T.ink2, marginTop: 2,
                  textDecoration: 'line-through', textDecorationColor: T.ink3,
                  fontStyle: 'italic',
                }}>“{c.you}”</div>
              </div>

              {/* better */}
              <div style={{
                padding: '10px 12px', background: `${T.leaf}12`, borderRadius: 10,
                borderLeft: `3px solid ${T.leaf}`,
                marginBottom: 10,
              }}>
                <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: T.leaf, letterSpacing: 1, fontWeight: 600 }}>
                  ✓ MELHOR
                </div>
                <div style={{ fontSize: 14, color: T.ink, fontWeight: 500, marginTop: 2 }}>
                  “{c.better}”
                </div>
              </div>

              {/* why */}
              <div style={{ fontSize: 12.5, color: T.ink2, lineHeight: 1.4 }}>
                <strong style={{ color: T.ink }}>Por quê: </strong>{c.why}
              </div>

              <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                <button style={{
                  fontFamily: FONT_BODY, fontSize: 11, fontWeight: 600,
                  background: T.bgDeep, color: T.ink, border: 'none',
                  padding: '6px 10px', borderRadius: 99, cursor: 'pointer',
                }}>★ Salvar frase</button>
                <button style={{
                  fontFamily: FONT_BODY, fontSize: 11, fontWeight: 600,
                  background: 'transparent', color: T.ink2, border: `1px solid ${T.hairline}`,
                  padding: '6px 10px', borderRadius: 99, cursor: 'pointer',
                }}>♪ Ouvir</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* disclaimer */}
      <div style={{ padding: '14px 22px 0' }}>
        <div style={{
          padding: '10px 12px', borderRadius: 10,
          background: T.bgDeep, border: `1px dashed ${T.ink3}55`,
          fontFamily: FONT_BODY, fontSize: 11, color: T.ink2, lineHeight: 1.4,
        }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: 9, color: T.ink3, letterSpacing: 1 }}>AVISO · </span>
          Notas geradas por IA, são <strong style={{ color: T.ink }}>estimativas educacionais</strong>. Não substituem certificação oficial e não devem ser usadas como base única para decisões de contratação.
        </div>
      </div>

      {/* CTA + B2B teaser */}
      <div style={{ padding: '16px 22px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Btn variant="accent" onClick={() => go('roleplay')}>
          ↻ Tentar novamente
        </Btn>
        <Btn variant="ghost" onClick={() => go('b2b')}>
          Praticar frases técnicas
        </Btn>
      </div>

      <div style={{ padding: '0 22px 24px' }}>
        <button onClick={() => go('b2b')} style={{
          width: '100%', padding: 0, border: 'none', cursor: 'pointer',
          background: 'transparent', textAlign: 'left',
        }}>
          <div style={{
            padding: '14px 16px', borderRadius: 16,
            background: T.navy, color: '#FFF8EC',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10, background: '#FFF8EC15',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: FONT_DISPLAY, fontSize: 18,
            }}>◫</div>
            <div style={{ flex: 1, fontFamily: FONT_BODY }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Para empresas e bootcamps</div>
              <div style={{ fontSize: 11, color: '#FFF8EC99', marginTop: 2 }}>
                Acompanhe minutos, evolução e prontidão do time
              </div>
            </div>
            <span style={{ fontSize: 16 }}>→</span>
          </div>
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN: 08 B2B teaser
// ─────────────────────────────────────────────────────────────
function ScreenB2B({ go }) {
  return (
    <div data-screen-label="08 B2B" style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      background: T.navy, color: '#FFF8EC', overflow: 'auto',
    }}>
      <div style={{ padding: '14px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => go('feedback')} style={{
          background: '#FFF8EC15', border: 'none', color: '#FFF8EC',
          width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', fontSize: 14,
        }}>←</button>
        <Tag color={T.sun} bg="#FFF8EC15">PARA EMPRESAS</Tag>
        <div style={{ width: 36 }}/>
      </div>

      <div style={{ padding: '8px 22px 16px' }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: T.sun, letterSpacing: 2 }}>
          ━━ JOBENGLISH FOR TEAMS
        </div>
        <h2 style={{
          fontFamily: FONT_DISPLAY, fontWeight: 500, fontSize: 30, lineHeight: 1.05,
          margin: '6px 0 0', letterSpacing: -0.6,
        }}>
          Inglês de carreira <span style={{ fontStyle: 'italic', color: T.sun }}>para times inteiros.</span>
        </h2>
        <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: '#FFF8EC99', margin: '10px 0 0', lineHeight: 1.45 }}>
          Acompanhe minutos praticados, evolução por habilidade e prontidão para entrevistas — sem expor áudios privados.
        </p>
      </div>

      {/* mini dashboard */}
      <div style={{ padding: '0 22px 16px' }}>
        <div style={{
          background: '#FFF8EC', color: T.ink, borderRadius: 18,
          padding: '16px 16px 14px',
          fontFamily: FONT_BODY,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
            <div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: T.ink3, letterSpacing: 1.5 }}>COHORT</div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 17, fontWeight: 600, marginTop: 2 }}>
                Trybe · Bootcamp Q2
              </div>
            </div>
            <Tag color={T.leaf}>● ATIVO</Tag>
          </div>

          {/* 4 stat tiles */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { k: 'Alunos ativos', v: '42', s: '/ 50 lugares' },
              { k: 'Minutos praticados', v: '318', s: 'esta semana' },
              { k: 'Evolução em clareza', v: '+18%', s: 'em 4 semanas', good: true },
              { k: 'Completaram a semana', v: '76%', s: 'do cohort', good: true },
            ].map(s => (
              <div key={s.k} style={{
                padding: '10px 12px', borderRadius: 12,
                background: T.bgDeep,
              }}>
                <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: T.ink3, letterSpacing: 1 }}>
                  {s.k.toUpperCase()}
                </div>
                <div style={{
                  fontFamily: FONT_DISPLAY, fontSize: 24, fontWeight: 600, marginTop: 2,
                  color: s.good ? T.leaf : T.ink, letterSpacing: -0.5,
                }}>{s.v}</div>
                <div style={{ fontFamily: FONT_BODY, fontSize: 10, color: T.ink3, marginTop: 1 }}>{s.s}</div>
              </div>
            ))}
          </div>

          {/* skill progress bars */}
          <div style={{ marginTop: 14 }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: T.ink3, letterSpacing: 1.5, marginBottom: 8 }}>
              ━━ EVOLUÇÃO MÉDIA POR HABILIDADE
            </div>
            {[
              { k: 'Fluência', a: 58, b: 71 },
              { k: 'Clareza', a: 62, b: 78 },
              { k: 'Pronúncia', a: 64, b: 70 },
            ].map(s => (
              <div key={s.k} style={{ marginBottom: 10 }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  fontFamily: FONT_BODY, fontSize: 11, marginBottom: 4,
                }}>
                  <span style={{ color: T.ink, fontWeight: 500 }}>{s.k}</span>
                  <span style={{ color: T.ink3, fontFamily: FONT_MONO }}>
                    {s.a} <span style={{ color: T.leaf, fontWeight: 600 }}>→ {s.b}</span>
                  </span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: T.bgDeep, position: 'relative' }}>
                  <div style={{
                    position: 'absolute', left: `${s.a}%`, width: `${s.b - s.a}%`,
                    height: '100%', background: T.leaf, borderRadius: 3,
                  }}/>
                  <div style={{
                    position: 'absolute', left: `${s.a}%`, top: -2, width: 2, height: 10,
                    background: T.ink3,
                  }}/>
                </div>
              </div>
            ))}
          </div>

          {/* privacy note */}
          <div style={{
            marginTop: 12, padding: '10px 12px', borderRadius: 10,
            background: `${T.leaf}12`, borderLeft: `3px solid ${T.leaf}`,
            fontFamily: FONT_BODY, fontSize: 11, color: T.ink2, lineHeight: 1.4,
          }}>
            <strong style={{ color: T.ink }}>Privacidade por padrão.</strong> Admins veem progresso agregado — não áudios privados sem consentimento explícito do aluno.
          </div>
        </div>
      </div>

      {/* social proof / use cases */}
      <div style={{ padding: '0 22px 16px' }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: '#FFF8EC99', letterSpacing: 1.5, marginBottom: 8 }}>
          ━━ USADO POR
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['Bootcamps de tech', 'Times de suporte', 'BPOs', 'Squads de produto'].map(t => (
            <div key={t} style={{
              padding: '8px 12px', borderRadius: 99,
              background: '#FFF8EC10', border: '1px solid #FFF8EC22',
              fontFamily: FONT_BODY, fontSize: 12,
            }}>{t}</div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1 }}/>

      <div style={{ padding: '12px 22px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Btn variant="accent" onClick={() => go('home')}>
          Falar com vendas →
        </Btn>
        <Btn variant="quiet" size="md" style={{ color: '#FFF8EC99' }} onClick={() => go('home')}>
          Voltar para o app
        </Btn>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// App shell — flow + frame
// ─────────────────────────────────────────────────────────────
const SCREENS = ['welcome', 'goal', 'consent', 'mic', 'home', 'roleplay', 'feedback', 'b2b'];
const SCREEN_LABELS = {
  welcome: 'Welcome',
  goal: 'Objetivo',
  consent: 'LGPD',
  mic: 'Diagnóstico',
  home: 'Home',
  roleplay: 'Roleplay',
  feedback: 'Feedback',
  b2b: 'B2B Teaser',
};

function App() {
  const [screen, setScreen] = useState('welcome');
  const go = s => setScreen(s);

  const screens = {
    welcome: <ScreenWelcome go={go}/>,
    goal: <ScreenGoal go={go}/>,
    consent: <ScreenConsent go={go}/>,
    mic: <ScreenDiagnostic go={go}/>,
    home: <ScreenHome go={go}/>,
    roleplay: <ScreenRoleplay go={go}/>,
    feedback: <ScreenFeedback go={go}/>,
    b2b: <ScreenB2B go={go}/>,
  };

  return (
    <div style={{
      minHeight: '100vh', width: '100%',
      background: `radial-gradient(ellipse at top, ${T.bgDeep} 0%, ${T.bg} 60%, #EDE2CE 100%)`,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '24px 16px 80px', boxSizing: 'border-box',
      fontFamily: FONT_BODY,
    }}>
      {/* top header */}
      <div style={{ width: '100%', maxWidth: 920, marginBottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Wordmark size={20}/>
        <div style={{
          fontFamily: FONT_MONO, fontSize: 11, color: T.ink3, letterSpacing: 1.5,
        }}>
          PROTOTYPE · ANDROID · PT-BR
        </div>
      </div>

      {/* device + nav */}
      <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>
        <Device>
          {screens[screen]}
        </Device>

        {/* screen index */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 30, minWidth: 180 }}>
          <div style={{
            fontFamily: FONT_MONO, fontSize: 10, color: T.ink3, letterSpacing: 1.5,
            marginBottom: 8,
          }}>
            ━━ FLOW
          </div>
          {SCREENS.map((s, i) => {
            const active = screen === s;
            return (
              <button key={s} onClick={() => go(s)} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 12px', borderRadius: 8,
                border: 'none', cursor: 'pointer',
                background: active ? T.ink : 'transparent',
                color: active ? '#FFF8EC' : T.ink2,
                fontFamily: FONT_BODY, fontSize: 13, fontWeight: active ? 600 : 500,
                textAlign: 'left', transition: 'all 0.15s',
              }}>
                <span style={{
                  fontFamily: FONT_MONO, fontSize: 11,
                  color: active ? T.sun : T.ink3, letterSpacing: 1,
                  minWidth: 22,
                }}>{String(i + 1).padStart(2, '0')}</span>
                <span>{SCREEN_LABELS[s]}</span>
                {active && <span style={{ marginLeft: 'auto', color: T.sun }}>●</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* footer caption */}
      <div style={{
        marginTop: 32, fontFamily: FONT_BODY, fontSize: 12, color: T.ink3,
        textAlign: 'center', maxWidth: 520, lineHeight: 1.5,
      }}>
        <span style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: 1.5, color: T.terracotta }}>
          JOBENGLISH AI BRASIL · v1.0 BETA
        </span>
        <br/>
        Treine o inglês que sua carreira precisa · LGPD por design · Feedback em português
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes pulse-0 { from { transform: scaleY(0.7); } to { transform: scaleY(1.2); } }
        @keyframes pulse-1 { from { transform: scaleY(1); } to { transform: scaleY(0.5); } }
        @keyframes pulse-2 { from { transform: scaleY(0.5); } to { transform: scaleY(1.4); } }
        @keyframes pulse-3 { from { transform: scaleY(1.2); } to { transform: scaleY(0.8); } }
      `}</style>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
