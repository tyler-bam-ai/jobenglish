'use client';

import Link from 'next/link';
import { Wordmark } from '@/components/ui/wordmark';
import { Tag } from '@/components/ui/tag';
import { Sun } from '@/components/ui/sun';
import { TabBar } from '@/components/ui/tab-bar';

const TRACK_ITEMS = [
  { i: '01', t: 'Tell me about yourself', d: '5 min', done: true, active: false },
  { i: '02', t: 'Explain a backend project', d: '7 min', done: false, active: true },
  { i: '03', t: 'Debugging challenge', d: '7 min', done: false, active: false },
  { i: '04', t: 'System design basics', d: '12 min', done: false, active: false },
];

export default function DashboardPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#F7F1E8',
        overflow: 'auto',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '16px 22px 8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Wordmark size={18} />
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: '#C8553D',
            color: '#FFF8EC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          A
        </div>
      </div>

      {/* Greeting */}
      <div style={{ padding: '8px 22px 4px' }}>
        <div
          style={{
            fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
            fontSize: 13,
            color: '#5C5046',
          }}
        >
          Olá, Ana &#128075;
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display), 'Fraunces', 'Cooper', Georgia, serif",
            fontWeight: 500,
            fontSize: 28,
            lineHeight: 1.05,
            margin: '4px 0 0',
            color: '#1F1A14',
            letterSpacing: -0.6,
          }}
        >
          Sua entrevista{' '}
          <span style={{ fontStyle: 'italic', color: '#C8553D' }}>está mais perto.</span>
        </h2>
      </div>

      {/* Level + Streak strip */}
      <div style={{ padding: '14px 22px 0', display: 'flex', gap: 10 }}>
        <div
          style={{
            flex: 1,
            padding: '12px 14px',
            borderRadius: 14,
            background: '#FFFCF6',
            border: '1px solid #E7DCC9',
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
              fontSize: 9,
              color: '#8A7C6E',
              letterSpacing: 1.4,
            }}
          >
            NÍVEL ATUAL
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
            <span
              style={{
                fontFamily: "var(--font-display), 'Fraunces', 'Cooper', Georgia, serif",
                fontSize: 26,
                color: '#1F1A14',
                fontWeight: 600,
              }}
            >
              B1
            </span>
            <span
              style={{
                fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
                fontSize: 11,
                color: '#5E7A4F',
                fontWeight: 600,
              }}
            >
              &#8593; +0.3
            </span>
          </div>
          <div
            style={{
              fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
              fontSize: 11,
              color: '#8A7C6E',
              marginTop: 2,
            }}
          >
            intermediário
          </div>
        </div>

        <div
          style={{
            flex: 1,
            padding: '12px 14px',
            borderRadius: 14,
            background: '#1F1A14',
            color: '#FFF8EC',
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
              fontSize: 9,
              color: '#FFF8EC99',
              letterSpacing: 1.4,
            }}
          >
            STREAK
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
            <span
              style={{
                fontFamily: "var(--font-display), 'Fraunces', 'Cooper', Georgia, serif",
                fontSize: 26,
                fontWeight: 600,
              }}
            >
              7
            </span>
            <span
              style={{
                fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
                fontSize: 11,
                color: '#E8A23A',
                fontWeight: 600,
              }}
            >
              dias
            </span>
          </div>
          <div
            style={{
              fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
              fontSize: 11,
              color: '#FFF8EC99',
              marginTop: 2,
            }}
          >
            continue assim
          </div>
        </div>
      </div>

      {/* Today's practice — hero card */}
      <div style={{ padding: '16px 22px 0' }}>
        <div
          style={{
            fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
            fontSize: 10,
            color: '#8A7C6E',
            letterSpacing: 1.5,
            marginBottom: 8,
          }}
        >
          &#9473;&#9473; PRÁTICA DE HOJE
        </div>
        <Link
          href="/session/demo"
          style={{
            display: 'block',
            width: '100%',
            borderRadius: 20,
            overflow: 'hidden',
            textAlign: 'left',
            background: '#C8553D',
            color: '#FFF8EC',
            position: 'relative',
            textDecoration: 'none',
          }}
        >
          {/* sun shape */}
          <div style={{ position: 'absolute', top: -40, right: -40, opacity: 0.25 }}>
            <Sun size={140} />
          </div>
          <div style={{ padding: '18px 18px 16px', position: 'relative' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 12,
              }}
            >
              <Tag color="#FFF8EC" bg="#FFF8EC22">
                TECH INTERVIEW
              </Tag>
              <span
                style={{
                  fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
                  fontSize: 11,
                  opacity: 0.85,
                  color: '#FFF8EC',
                }}
              >
                ~ 7 min
              </span>
            </div>
            <div
              style={{
                fontFamily: "var(--font-display), 'Fraunces', 'Cooper', Georgia, serif",
                fontSize: 22,
                lineHeight: 1.15,
                fontWeight: 500,
                letterSpacing: -0.4,
                maxWidth: 260,
                color: '#FFF8EC',
              }}
            >
              Explain a backend project <span style={{ fontStyle: 'italic' }}>you&apos;ve built.</span>
            </div>
            <div
              style={{
                marginTop: 14,
                paddingTop: 12,
                borderTop: '1px solid #FFF8EC33',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
                fontSize: 13,
                color: '#FFF8EC',
              }}
            >
              <span style={{ opacity: 0.9 }}>Foco: fluência + frases naturais</span>
              <span
                style={{
                  background: '#FFF8EC',
                  color: '#C8553D',
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                &rarr;
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* Weekly goal */}
      <div style={{ padding: '14px 22px 0' }}>
        <div
          style={{
            padding: '14px 16px',
            borderRadius: 14,
            background: '#FFFCF6',
            border: '1px solid #E7DCC9',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
                fontSize: 13,
                color: '#1F1A14',
                fontWeight: 600,
              }}
            >
              Meta semanal
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
                fontSize: 13,
                color: '#5C5046',
              }}
            >
              <strong style={{ color: '#1F1A14' }}>18</strong> / 45 min
            </span>
          </div>
          <div
            style={{
              marginTop: 10,
              height: 8,
              borderRadius: 4,
              background: '#F1E8D9',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '40%',
                height: '100%',
                background: 'linear-gradient(90deg, #E8A23A, #C8553D)',
                borderRadius: 4,
              }}
            />
          </div>
          <div
            style={{
              fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
              fontSize: 11,
              color: '#8A7C6E',
              marginTop: 6,
            }}
          >
            Mais 27 minutos para fechar a semana
          </div>
        </div>
      </div>

      {/* Up next list */}
      <div style={{ padding: '16px 22px 0' }}>
        <div
          style={{
            fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
            fontSize: 10,
            color: '#8A7C6E',
            letterSpacing: 1.5,
            marginBottom: 8,
          }}
        >
          &#9473;&#9473; TRILHA &middot; ENGLISH FOR TECH INTERVIEWS
        </div>
        {TRACK_ITEMS.map((s) => (
          <div
            key={s.i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 4px',
              borderBottom: '1px solid #E7DCC9',
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                flexShrink: 0,
                background: s.done ? '#5E7A4F' : s.active ? '#C8553D' : '#F1E8D9',
                color: s.done || s.active ? '#FFF8EC' : '#8A7C6E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              {s.done ? '\u2713' : s.i}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#1F1A14',
                  opacity: s.done ? 0.5 : 1,
                  textDecoration: s.done ? 'line-through' : 'none',
                }}
              >
                {s.t}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
                  fontSize: 10,
                  color: '#8A7C6E',
                  letterSpacing: 0.5,
                }}
              >
                {s.d}
              </div>
            </div>
            {s.active && <span style={{ fontSize: 14, color: '#C8553D' }}>&rarr;</span>}
          </div>
        ))}
      </div>

      <div style={{ height: 80 }} />

      {/* Bottom tab bar */}
      <TabBar active="Início" />
    </div>
  );
}
