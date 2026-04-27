'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Wordmark } from '@/components/ui/wordmark';
import { Tag } from '@/components/ui/tag';
import { Sun } from '@/components/ui/sun';
import { TabBar } from '@/components/ui/tab-bar';
import { useLang, t } from '@/lib/i18n';
import { getStats, cefrLabel, type UserStats } from '@/lib/user-stats';
import { SCENARIOS } from '@/lib/scenarios';

const TRACK_ITEMS = [
  { i: '01', scenarioId: '1', t: 'Tell me about yourself', d: '5 min' },
  { i: '02', scenarioId: '2', t: 'Explain a backend project', d: '7 min' },
  { i: '03', scenarioId: '3', t: 'Daily standup update', d: '3 min' },
  { i: '04', scenarioId: '4', t: 'Explaining a blocker', d: '5 min' },
];

export default function DashboardPage() {
  const { lang } = useLang();
  const [stats, setStats] = useState<UserStats | null>(null);

  useEffect(() => {
    setStats(getStats());
  }, []);

  // During SSR or before hydration, render nothing to avoid mismatch
  if (!stats) return null;

  const hasData = stats.sessionsCompleted > 0;
  const weeklyPct = stats.weeklyGoalMinutes > 0
    ? Math.min(100, Math.round((stats.weeklyMinutes / stats.weeklyGoalMinutes) * 100))
    : 0;
  const remaining = Math.max(0, stats.weeklyGoalMinutes - stats.weeklyMinutes);

  // Determine the next scenario to practice
  const nextScenario = SCENARIOS.find((s) => !stats.completedScenarioIds.includes(s.id)) || SCENARIOS[0];

  // Level improvement indicator — show only when we have 2+ score sets to compare
  const showLevelUp = stats.latestScores.length > 1;
  let levelDelta = 0;
  if (showLevelUp) {
    const prev = stats.latestScores[stats.latestScores.length - 2];
    const curr = stats.latestScores[stats.latestScores.length - 1];
    const avgPrev = (prev.fluency + prev.grammar + prev.vocabulary + prev.clarity + prev.pronunciation) / 5;
    const avgCurr = (curr.fluency + curr.grammar + curr.vocabulary + curr.clarity + curr.pronunciation) / 5;
    levelDelta = Math.round((avgCurr - avgPrev) * 10) / 10;
  }

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

      {/* Greeting */}
      <div style={{ padding: '8px 22px 4px' }}>
        <div
          style={{
            fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
            fontSize: 13,
            color: '#5C5046',
          }}
        >
          {t.greeting[lang]}
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
          {t.homeTitle1[lang]}{' '}
          <span style={{ fontStyle: 'italic', color: '#C8553D' }}>{t.homeTitle2[lang]}</span>
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
            {t.currentLevel[lang]}
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
              {stats.cefrLevel || '\u2014'}
            </span>
            {showLevelUp && levelDelta !== 0 && (
              <span
                style={{
                  fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
                  fontSize: 11,
                  color: levelDelta > 0 ? '#5E7A4F' : '#C8553D',
                  fontWeight: 600,
                }}
              >
                {levelDelta > 0 ? '\u2191' : '\u2193'} {levelDelta > 0 ? '+' : ''}{levelDelta}
              </span>
            )}
          </div>
          <div
            style={{
              fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
              fontSize: 11,
              color: '#8A7C6E',
              marginTop: 2,
            }}
          >
            {hasData ? cefrLabel(stats.cefrLevel, lang) : (lang === 'pt' ? 'fa\u00e7a uma sess\u00e3o' : 'complete a session')}
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
          <div
            style={{
              fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
              fontSize: 11,
              color: '#FFF8EC99',
              marginTop: 2,
            }}
          >
            {stats.streakDays > 0
              ? t.keepGoing[lang]
              : (lang === 'pt' ? 'comece hoje' : 'start today')}
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
          {t.todayPractice[lang]}
        </div>
        <Link
          href={`/session/${nextScenario.id}`}
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
                {nextScenario.careerTrack.toUpperCase()}
              </Tag>
              <span
                style={{
                  fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
                  fontSize: 11,
                  opacity: 0.85,
                  color: '#FFF8EC',
                }}
              >
                ~ {nextScenario.estimatedMinutes} min
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
              {nextScenario.title}
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
              <span style={{ opacity: 0.9 }}>{t.focus[lang]}</span>
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
              {t.weeklyGoal[lang]}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
                fontSize: 13,
                color: '#5C5046',
              }}
            >
              <strong style={{ color: '#1F1A14' }}>{stats.weeklyMinutes}</strong> / {stats.weeklyGoalMinutes} min
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
          {t.track[lang]}
        </div>
        {TRACK_ITEMS.map((s) => {
          const done = stats.completedScenarioIds.includes(s.scenarioId);
          const active = !done && s.scenarioId === nextScenario.id;
          return (
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
                  background: done ? '#5E7A4F' : active ? '#C8553D' : '#F1E8D9',
                  color: done || active ? '#FFF8EC' : '#8A7C6E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                {done ? '\u2713' : s.i}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
                    fontSize: 14,
                    fontWeight: 500,
                    color: '#1F1A14',
                    opacity: done ? 0.5 : 1,
                    textDecoration: done ? 'line-through' : 'none',
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
              {active && <span style={{ fontSize: 14, color: '#C8553D' }}>&rarr;</span>}
            </div>
          );
        })}
      </div>

      <div style={{ height: 80 }} />

      {/* Bottom tab bar */}
      <TabBar active="home" />
    </div>
  );
}
