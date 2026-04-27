'use client';

import { useState, useEffect } from 'react';
import { Wordmark } from '@/components/ui/wordmark';
import { TabBar } from '@/components/ui/tab-bar';
import { useLang, t } from '@/lib/i18n';
import { getStats, type UserStats } from '@/lib/user-stats';

const SKILL_META: { labelKey: 'fluency' | 'grammar' | 'vocabulary' | 'clarity' | 'pronunciation'; color: string }[] = [
  { labelKey: 'fluency', color: '#C8553D' },
  { labelKey: 'grammar', color: '#D97A2B' },
  { labelKey: 'vocabulary', color: '#E8A23A' },
  { labelKey: 'clarity', color: '#1F3147' },
  { labelKey: 'pronunciation', color: '#5E7A4F' },
];

export default function ProgressPage() {
  const { lang } = useLang();
  const [stats, setStats] = useState<UserStats | null>(null);

  useEffect(() => {
    setStats(getStats());
  }, []);

  if (!stats) return null;

  const hasData = stats.sessionsCompleted > 0;
  const weeklyPct = stats.weeklyGoalMinutes > 0
    ? Math.min(100, Math.round((stats.weeklyMinutes / stats.weeklyGoalMinutes) * 100))
    : 0;
  const remaining = Math.max(0, stats.weeklyGoalMinutes - stats.weeklyMinutes);

  // Build score trend from latestScores — compute average per session
  const scoreTrend = stats.latestScores.map((s, i) => {
    const avg = Math.round((s.fluency + s.grammar + s.vocabulary + s.clarity + s.pronunciation) / 5);
    return { sessionNum: i + 1, value: avg };
  });

  // Latest skills (most recent score set)
  const latestSkills = stats.latestScores.length > 0
    ? stats.latestScores[stats.latestScores.length - 1]
    : null;

  // Empty state message
  const emptyMsg = lang === 'pt'
    ? 'Complete sua primeira sess\u00e3o para ver seu progresso aqui.'
    : 'Complete your first session to see your progress here.';

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
          &#9673;
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
          {t.progressTitle[lang]}{' '}
          <span style={{ fontStyle: 'italic', color: '#C8553D' }}>{t.progressTitleAccent[lang]}</span>
        </h2>
      </div>

      {/* Empty state banner when no sessions */}
      {!hasData && (
        <div style={{ padding: '20px 22px 0' }}>
          <div
            style={{
              padding: '20px 16px',
              borderRadius: 14,
              background: '#FFFCF6',
              border: '1px dashed #E7DCC9',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display), 'Fraunces', 'Cooper', Georgia, serif",
                fontSize: 18,
                color: '#1F1A14',
                fontWeight: 500,
                marginBottom: 6,
              }}
            >
              {lang === 'pt' ? 'Nenhuma sess\u00e3o ainda' : 'No sessions yet'}
            </div>
            <div
              style={{
                fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
                fontSize: 13,
                color: '#8A7C6E',
                lineHeight: 1.4,
              }}
            >
              {emptyMsg}
            </div>
          </div>
        </div>
      )}

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
            {t.speakingMinutesThisWeek[lang]}
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
              {stats.weeklyMinutes}
            </span>
            <span
              style={{
                fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
                fontSize: 14,
                color: '#8A7C6E',
              }}
            >
              / {stats.weeklyGoalMinutes} min
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
                width: `${weeklyPct}%`,
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
            {remaining > 0
              ? (lang === 'pt'
                  ? `Mais ${remaining} minutos para fechar a semana`
                  : `${remaining} more minutes to close the week`)
              : (lang === 'pt' ? 'Meta semanal atingida!' : 'Weekly goal reached!')}
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
            {t.sessions[lang]}
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
              {stats.weeklySessionCount}
            </span>
            <span
              style={{
                fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
                fontSize: 11,
                color: '#8A7C6E',
              }}
            >
              {t.thisWeek[lang]}
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
              {stats.streakDays}
            </span>
            <span
              style={{
                fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
                fontSize: 11,
                color: '#E8A23A',
                fontWeight: 600,
              }}
            >
              {t.days[lang]}
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
            {t.scoreTrendLabel[lang]}
          </div>
          {scoreTrend.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {scoreTrend.map((s) => (
                <div key={s.sessionNum} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
                      fontSize: 10,
                      color: '#8A7C6E',
                      width: 42,
                      flexShrink: 0,
                    }}
                  >
                    #{s.sessionNum}
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
          ) : (
            <div
              style={{
                fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
                fontSize: 13,
                color: '#8A7C6E',
                textAlign: 'center',
                padding: '14px 0',
              }}
            >
              {lang === 'pt'
                ? 'Complete sess\u00f5es para ver sua tend\u00eancia de score.'
                : 'Complete sessions to see your score trend.'}
            </div>
          )}
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
          {t.skillsProgress[lang]}
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
          {latestSkills ? (
            SKILL_META.map((skill) => {
              const value = latestSkills[skill.labelKey] || 0;
              return (
                <div key={skill.labelKey}>
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
                      {t[skill.labelKey][lang]}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
                        fontSize: 12,
                        color: '#5C5046',
                      }}
                    >
                      {value}%
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
                        width: `${value}%`,
                        height: '100%',
                        background: skill.color,
                        borderRadius: 3,
                        transition: 'width 0.5s ease',
                      }}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div
              style={{
                fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
                fontSize: 13,
                color: '#8A7C6E',
                textAlign: 'center',
                padding: '14px 0',
              }}
            >
              {emptyMsg}
            </div>
          )}
        </div>
      </div>

      <div style={{ height: 80 }} />

      {/* Bottom tab bar */}
      <TabBar active="progress" />
    </div>
  );
}
