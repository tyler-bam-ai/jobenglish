'use client';

import Link from 'next/link';
import { Wordmark } from '@/components/ui/wordmark';
import { Tag } from '@/components/ui/tag';
import { TabBar } from '@/components/ui/tab-bar';
import { useLang, t } from '@/lib/i18n';

interface ScenarioItem {
  id: string;
  title: string;
  titlePt: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  minutes: number;
  aiRole: string;
}

const TRACKS: {
  key: string;
  labelKey: string;
  icon: string;
  tagColor: string;
  tagBg: string;
  scenarios: ScenarioItem[];
}[] = [
  {
    key: 'tech',
    labelKey: 'trackTechInterview',
    icon: '\u25C6',
    tagColor: '#C8553D',
    tagBg: '#C8553D15',
    scenarios: [
      { id: '1', title: 'Tell me about yourself', titlePt: 'Fale sobre você', difficulty: 'beginner', minutes: 5, aiRole: 'Sarah, Senior Recruiter' },
      { id: '2', title: 'Explain a backend project', titlePt: 'Explique um projeto backend', difficulty: 'intermediate', minutes: 7, aiRole: 'Marcus, Tech Interviewer' },
    ],
  },
  {
    key: 'meetings',
    labelKey: 'trackMeetings',
    icon: '\u25D0',
    tagColor: '#1F3147',
    tagBg: '#1F314715',
    scenarios: [
      { id: '3', title: 'Daily standup update', titlePt: 'Atualização no standup', difficulty: 'beginner', minutes: 3, aiRole: 'James, Engineering Manager' },
      { id: '4', title: 'Explaining a blocker', titlePt: 'Explicando um bloqueio', difficulty: 'intermediate', minutes: 5, aiRole: 'Emily, Product Manager' },
    ],
  },
  {
    key: 'data',
    labelKey: 'trackData',
    icon: '\u25B2',
    tagColor: '#D97A2B',
    tagBg: '#D97A2B15',
    scenarios: [
      { id: '5', title: 'Present dashboard insights', titlePt: 'Insights de dashboard', difficulty: 'intermediate', minutes: 7, aiRole: 'David, VP of Product' },
      { id: '6', title: 'Explain model accuracy', titlePt: 'Acurácia do modelo', difficulty: 'advanced', minutes: 7, aiRole: 'Lisa, Chief Data Officer' },
    ],
  },
  {
    key: 'support',
    labelKey: 'trackSupport',
    icon: '\u25CF',
    tagColor: '#5E7A4F',
    tagBg: '#5E7A4F15',
    scenarios: [
      { id: '7', title: 'Handle an angry customer', titlePt: 'Cliente irritado', difficulty: 'intermediate', minutes: 5, aiRole: 'Robert, Angry Customer' },
      { id: '8', title: 'Technical troubleshooting', titlePt: 'Troubleshooting técnico', difficulty: 'intermediate', minutes: 7, aiRole: 'Karen, Customer' },
    ],
  },
  {
    key: 'sales',
    labelKey: 'trackSales',
    icon: '\u25C7',
    tagColor: '#E8A23A',
    tagBg: '#E8A23A15',
    scenarios: [
      { id: '9', title: 'Discovery call', titlePt: 'Chamada de discovery', difficulty: 'intermediate', minutes: 7, aiRole: 'Alex, VP of Engineering' },
      { id: '10', title: 'Handle a pricing objection', titlePt: 'Objeção de preço', difficulty: 'advanced', minutes: 5, aiRole: 'Michelle, Procurement Director' },
    ],
  },
];

const DIFFICULTY_MAP: Record<string, { labelKey: string; color: string; bg: string }> = {
  beginner: { labelKey: 'beginner', color: '#5E7A4F', bg: '#5E7A4F18' },
  intermediate: { labelKey: 'intermediateLevel', color: '#D97A2B', bg: '#D97A2B18' },
  advanced: { labelKey: 'advanced', color: '#C8553D', bg: '#C8553D18' },
};

export default function ScenariosPage() {
  const { lang } = useLang();

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
          {t.scenariosPageTitle[lang]}{' '}
          <span style={{ fontStyle: 'italic', color: '#C8553D' }}>{t.scenariosPageTitleAccent[lang]}</span>
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
            fontSize: 14,
            color: '#5C5046',
            margin: '6px 0 0',
          }}
        >
          {t.scenariosPageSub[lang]}
        </p>
      </div>

      {/* Scenario list grouped by track */}
      <div style={{ padding: '12px 22px 0', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {TRACKS.map((track) => (
          <div key={track.key}>
            {/* Track header */}
            <div
              style={{
                fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
                fontSize: 10,
                color: '#8A7C6E',
                letterSpacing: 1.5,
                marginBottom: 10,
              }}
            >
              {track.icon} {t[track.labelKey][lang]}
            </div>

            {/* Scenario cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {track.scenarios.map((scenario) => {
                const diff = DIFFICULTY_MAP[scenario.difficulty];
                return (
                  <Link
                    key={scenario.id}
                    href={`/session/${scenario.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div
                      style={{
                        background: '#FFFCF6',
                        border: '1px solid #E7DCC9',
                        borderRadius: 16,
                        padding: '16px 16px 14px',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {/* Top row: tag + duration */}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: 10,
                        }}
                      >
                        <Tag color={track.tagColor} bg={track.tagBg}>
                          {t[track.labelKey][lang]}
                        </Tag>
                        <span
                          style={{
                            fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
                            fontSize: 11,
                            color: '#8A7C6E',
                          }}
                        >
                          ~ {scenario.minutes} min
                        </span>
                      </div>

                      {/* Title */}
                      <div
                        style={{
                          fontFamily: "var(--font-display), 'Fraunces', 'Cooper', Georgia, serif",
                          fontSize: 20,
                          lineHeight: 1.15,
                          fontWeight: 500,
                          letterSpacing: -0.3,
                          color: '#1F1A14',
                        }}
                      >
                        {scenario.title}
                      </div>

                      {/* Portuguese subtitle */}
                      <div
                        style={{
                          fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
                          fontSize: 13,
                          color: '#8A7C6E',
                          marginTop: 4,
                        }}
                      >
                        {scenario.titlePt}
                      </div>

                      {/* Bottom row: difficulty + AI role + arrow */}
                      <div
                        style={{
                          marginTop: 12,
                          paddingTop: 10,
                          borderTop: '1px solid #E7DCC9',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span
                            style={{
                              fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
                              fontSize: 10,
                              fontWeight: 500,
                              letterSpacing: 0.8,
                              color: diff.color,
                              background: diff.bg,
                              padding: '3px 7px',
                              borderRadius: 4,
                            }}
                          >
                            {t[diff.labelKey][lang].toUpperCase()}
                          </span>
                          <span
                            style={{
                              fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
                              fontSize: 12,
                              color: '#5C5046',
                            }}
                          >
                            {scenario.aiRole}
                          </span>
                        </div>
                        <span
                          style={{
                            background: '#C8553D',
                            color: '#FFF8EC',
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 14,
                            fontWeight: 700,
                            flexShrink: 0,
                          }}
                        >
                          &rarr;
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: 80 }} />

      {/* Bottom tab bar */}
      <TabBar active="practice" />
    </div>
  );
}
