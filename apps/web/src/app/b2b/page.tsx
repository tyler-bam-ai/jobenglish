'use client';

import { useRouter } from 'next/navigation';
import { Btn } from '@/components/ui/button';
import { Tag } from '@/components/ui/tag';
import { useLang, t } from '@/lib/i18n';

const STATS = [
  { kKey: 'activeStudents' as const, v: '42', sKey: 'seats' as const, good: false },
  { kKey: 'minutesPracticed' as const, v: '318', sKey: 'thisWeek' as const, good: false },
  { kKey: 'clarityEvolution' as const, v: '+18%', sKey: 'inWeeks' as const, good: true },
  { kKey: 'completedWeek' as const, v: '76%', sKey: 'ofCohort' as const, good: true },
];

const SKILL_BARS = [
  { kKey: 'fluency' as const, a: 58, b: 71 },
  { kKey: 'clarity' as const, a: 62, b: 78 },
  { kKey: 'pronunciation' as const, a: 64, b: 70 },
];

const USE_CASE_KEYS = ['techBootcamps', 'supportTeams', 'bpos', 'productSquads'] as const;

export default function B2BPage() {
  const router = useRouter();
  const { lang } = useLang();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#1F3147',
        color: '#FFF8EC',
        overflow: 'auto',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '14px 22px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <button
          onClick={() => router.push('/scenarios')}
          style={{
            background: '#FFF8EC15',
            border: 'none',
            color: '#FFF8EC',
            width: 36,
            height: 36,
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          &larr;
        </button>
        <Tag color="#E8A23A" bg="#FFF8EC15">
          {t.forTeams[lang]}
        </Tag>
        <div style={{ width: 36 }} />
      </div>

      {/* Hero text */}
      <div style={{ padding: '8px 22px 16px' }}>
        <div
          style={{
            fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
            fontSize: 11,
            color: '#E8A23A',
            letterSpacing: 2,
          }}
        >
          {t.b2bForTeamsHeader[lang]}
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display), 'Fraunces', 'Cooper', Georgia, serif",
            fontWeight: 500,
            fontSize: 30,
            lineHeight: 1.05,
            margin: '6px 0 0',
            letterSpacing: -0.6,
          }}
        >
          {t.b2bTitle1[lang]}{' '}
          <span style={{ fontStyle: 'italic', color: '#E8A23A' }}>{t.b2bTitle2[lang]}</span>
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
            fontSize: 14,
            color: '#FFF8EC99',
            margin: '10px 0 0',
            lineHeight: 1.45,
          }}
        >
          {t.b2bSub[lang]}
        </p>
      </div>

      {/* Mini dashboard */}
      <div style={{ padding: '0 22px 16px' }}>
        <div
          style={{
            background: '#FFF8EC',
            color: '#1F1A14',
            borderRadius: 18,
            padding: '16px 16px 14px',
            fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: 14,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
                  fontSize: 9,
                  color: '#8A7C6E',
                  letterSpacing: 1.5,
                }}
              >
                COHORT
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display), 'Fraunces', 'Cooper', Georgia, serif",
                  fontSize: 17,
                  fontWeight: 600,
                  marginTop: 2,
                }}
              >
                Trybe &middot; Bootcamp Q2
              </div>
            </div>
            <Tag color="#5E7A4F">&#9679; {t.active[lang]}</Tag>
          </div>

          {/* 4 stat tiles */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {STATS.map((s) => (
              <div
                key={s.kKey}
                style={{
                  padding: '10px 12px',
                  borderRadius: 12,
                  background: '#F1E8D9',
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
                    fontSize: 9,
                    color: '#8A7C6E',
                    letterSpacing: 1,
                  }}
                >
                  {t[s.kKey][lang].toUpperCase()}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display), 'Fraunces', 'Cooper', Georgia, serif",
                    fontSize: 24,
                    fontWeight: 600,
                    marginTop: 2,
                    color: s.good ? '#5E7A4F' : '#1F1A14',
                    letterSpacing: -0.5,
                  }}
                >
                  {s.v}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
                    fontSize: 10,
                    color: '#8A7C6E',
                    marginTop: 1,
                  }}
                >
                  {t[s.sKey][lang]}
                </div>
              </div>
            ))}
          </div>

          {/* Skill progress bars */}
          <div style={{ marginTop: 14 }}>
            <div
              style={{
                fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
                fontSize: 9,
                color: '#8A7C6E',
                letterSpacing: 1.5,
                marginBottom: 8,
              }}
            >
              {t.avgSkillEvolution[lang]}
            </div>
            {SKILL_BARS.map((s) => (
              <div key={s.kKey} style={{ marginBottom: 10 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
                    fontSize: 11,
                    marginBottom: 4,
                  }}
                >
                  <span style={{ color: '#1F1A14', fontWeight: 500 }}>{t[s.kKey][lang]}</span>
                  <span
                    style={{
                      color: '#8A7C6E',
                      fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
                    }}
                  >
                    {s.a}{' '}
                    <span style={{ color: '#5E7A4F', fontWeight: 600 }}>&rarr; {s.b}</span>
                  </span>
                </div>
                <div
                  style={{
                    height: 6,
                    borderRadius: 3,
                    background: '#F1E8D9',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      left: `${s.a}%`,
                      width: `${s.b - s.a}%`,
                      height: '100%',
                      background: '#5E7A4F',
                      borderRadius: 3,
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: `${s.a}%`,
                      top: -2,
                      width: 2,
                      height: 10,
                      background: '#8A7C6E',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Privacy note */}
          <div
            style={{
              marginTop: 12,
              padding: '10px 12px',
              borderRadius: 10,
              background: '#5E7A4F12',
              borderLeft: '3px solid #5E7A4F',
              fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
              fontSize: 11,
              color: '#5C5046',
              lineHeight: 1.4,
            }}
          >
            <strong style={{ color: '#1F1A14' }}>{t.privacyByDefault[lang]}</strong> {t.privacyNote[lang]}
          </div>
        </div>
      </div>

      {/* Social proof / use cases */}
      <div style={{ padding: '0 22px 16px' }}>
        <div
          style={{
            fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
            fontSize: 10,
            color: '#FFF8EC99',
            letterSpacing: 1.5,
            marginBottom: 8,
          }}
        >
          {t.usedBy[lang]}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {USE_CASE_KEYS.map((key) => (
            <div
              key={key}
              style={{
                padding: '8px 12px',
                borderRadius: 99,
                background: '#FFF8EC10',
                border: '1px solid #FFF8EC22',
                fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
                fontSize: 12,
              }}
            >
              {t[key][lang]}
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1 }} />

      {/* CTAs */}
      <div
        style={{ padding: '12px 22px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}
      >
        <Btn variant="accent" onClick={() => window.open('mailto:contato@jobenglish.com.br?subject=JobEnglish%20for%20Teams')}>
          {t.talkToSales[lang]}
        </Btn>
        <Btn
          variant="quiet"
          size="md"
          style={{ color: '#FFF8EC99' }}
          onClick={() => router.push('/dashboard')}
        >
          {t.backToApp[lang]}
        </Btn>
      </div>
    </div>
  );
}
