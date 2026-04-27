'use client';

import { Wordmark } from '@/components/ui/wordmark';
import { TabBar } from '@/components/ui/tab-bar';

const SCORES = [
  { week: 'Sem 1', value: 63 },
  { week: 'Sem 2', value: 68 },
  { week: 'Sem 3', value: 72 },
  { week: 'Sem 4', value: 74 },
];

const SKILLS = [
  { label: 'Flu\u00EAncia', value: 72, color: '#C8553D' },
  { label: 'Gram\u00E1tica', value: 65, color: '#D97A2B' },
  { label: 'Vocabul\u00E1rio', value: 78, color: '#E8A23A' },
  { label: 'Clareza', value: 70, color: '#1F3147' },
  { label: 'Pron\u00FAncia', value: 60, color: '#5E7A4F' },
];

export default function ProgressPage() {
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

      {/* Title */}
      <div style={{ padding: '8px 22px 4px' }}>
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
          Seu{' '}
          <span style={{ fontStyle: 'italic', color: '#C8553D' }}>progresso.</span>
        </h2>
      </div>

      {/* Weekly speaking minutes */}
      <div style={{ padding: '16px 22px 0' }}>
        <div
          style={{
            padding: '16px 16px',
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
              marginBottom: 8,
            }}
          >
            MINUTOS FALANDO ESTA SEMANA
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span
              style={{
                fontFamily: "var(--font-display), 'Fraunces', 'Cooper', Georgia, serif",
                fontSize: 36,
                color: '#1F1A14',
                fontWeight: 600,
              }}
            >
              18
            </span>
            <span
              style={{
                fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
                fontSize: 14,
                color: '#8A7C6E',
              }}
            >
              / 45 min
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

      {/* Stats row */}
      <div style={{ padding: '12px 22px 0', display: 'flex', gap: 10 }}>
        <div
          style={{
            flex: 1,
            padding: '14px 14px',
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
            SESS&Otilde;ES
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 6 }}>
            <span
              style={{
                fontFamily: "var(--font-display), 'Fraunces', 'Cooper', Georgia, serif",
                fontSize: 28,
                color: '#1F1A14',
                fontWeight: 600,
              }}
            >
              3
            </span>
            <span
              style={{
                fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
                fontSize: 11,
                color: '#8A7C6E',
              }}
            >
              esta semana
            </span>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            padding: '14px 14px',
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
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 6 }}>
            <span
              style={{
                fontFamily: "var(--font-display), 'Fraunces', 'Cooper', Georgia, serif",
                fontSize: 28,
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
        </div>
      </div>

      {/* Score trend */}
      <div style={{ padding: '16px 22px 0' }}>
        <div
          style={{
            padding: '16px 16px',
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
              marginBottom: 14,
            }}
          >
            TEND&Ecirc;NCIA DE SCORE
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {SCORES.map((s) => (
              <div key={s.week} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
                    fontSize: 10,
                    color: '#8A7C6E',
                    width: 42,
                    flexShrink: 0,
                  }}
                >
                  {s.week}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: 22,
                    borderRadius: 6,
                    background: '#F1E8D9',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      width: `${s.value}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #E8A23A, #C8553D)',
                      borderRadius: 6,
                      transition: 'width 0.5s ease',
                    }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-display), 'Fraunces', 'Cooper', Georgia, serif",
                    fontSize: 16,
                    fontWeight: 600,
                    color: '#1F1A14',
                    width: 28,
                    textAlign: 'right',
                    flexShrink: 0,
                  }}
                >
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills section */}
      <div style={{ padding: '16px 22px 0' }}>
        <div
          style={{
            fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
            fontSize: 10,
            color: '#8A7C6E',
            letterSpacing: 1.5,
            marginBottom: 10,
          }}
        >
          &#9473;&#9473; HABILIDADES
        </div>
        <div
          style={{
            padding: '16px 16px',
            borderRadius: 14,
            background: '#FFFCF6',
            border: '1px solid #E7DCC9',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          {SKILLS.map((skill) => (
            <div key={skill.label}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#1F1A14',
                  }}
                >
                  {skill.label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
                    fontSize: 12,
                    color: '#5C5046',
                  }}
                >
                  {skill.value}%
                </span>
              </div>
              <div
                style={{
                  height: 6,
                  borderRadius: 3,
                  background: '#F1E8D9',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${skill.value}%`,
                    height: '100%',
                    background: skill.color,
                    borderRadius: 3,
                    transition: 'width 0.5s ease',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 80 }} />

      {/* Bottom tab bar */}
      <TabBar active="Progresso" />
    </div>
  );
}
