'use client';

import Link from 'next/link';
import { Wordmark } from '@/components/ui/wordmark';
import { Tag } from '@/components/ui/tag';
import { TabBar } from '@/components/ui/tab-bar';

interface Scenario {
  title: string;
  titlePt: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  minutes: number;
  aiRole: string;
}

const TRACKS: {
  key: string;
  label: string;
  icon: string;
  tagColor: string;
  tagBg: string;
  scenarios: Scenario[];
}[] = [
  {
    key: 'tech',
    label: 'ENTREVISTA TECH',
    icon: '\u25C6',
    tagColor: '#C8553D',
    tagBg: '#C8553D15',
    scenarios: [
      { title: 'Tell me about yourself', titlePt: 'Fale sobre voc\u00EA', difficulty: 'beginner', minutes: 5, aiRole: 'Sarah, Senior Recruiter' },
      { title: 'Explain a backend project', titlePt: 'Explique um projeto backend', difficulty: 'intermediate', minutes: 7, aiRole: 'Marcus, Tech Interviewer' },
    ],
  },
  {
    key: 'meetings',
    label: 'REUNI\u00D5ES EM INGL\u00CAS',
    icon: '\u25D0',
    tagColor: '#1F3147',
    tagBg: '#1F314715',
    scenarios: [
      { title: 'Daily standup update', titlePt: 'Atualiza\u00E7\u00E3o no standup', difficulty: 'beginner', minutes: 3, aiRole: 'James, Engineering Manager' },
      { title: 'Explaining a blocker', titlePt: 'Explicando um bloqueio', difficulty: 'intermediate', minutes: 5, aiRole: 'Emily, Product Manager' },
    ],
  },
  {
    key: 'data',
    label: 'IA / DADOS',
    icon: '\u25B2',
    tagColor: '#D97A2B',
    tagBg: '#D97A2B15',
    scenarios: [
      { title: 'Present dashboard insights', titlePt: 'Insights de dashboard', difficulty: 'intermediate', minutes: 7, aiRole: 'David, VP of Product' },
      { title: 'Explain model accuracy', titlePt: 'Acur\u00E1cia do modelo', difficulty: 'advanced', minutes: 7, aiRole: 'Lisa, Chief Data Officer' },
    ],
  },
  {
    key: 'support',
    label: 'SUPORTE AO CLIENTE',
    icon: '\u25CF',
    tagColor: '#5E7A4F',
    tagBg: '#5E7A4F15',
    scenarios: [
      { title: 'Handle an angry customer', titlePt: 'Cliente irritado', difficulty: 'intermediate', minutes: 5, aiRole: 'Robert, Angry Customer' },
      { title: 'Technical troubleshooting', titlePt: 'Troubleshooting t\u00E9cnico', difficulty: 'intermediate', minutes: 7, aiRole: 'Karen, Customer' },
    ],
  },
  {
    key: 'sales',
    label: 'VENDAS / CLIENTES',
    icon: '\u25C7',
    tagColor: '#E8A23A',
    tagBg: '#E8A23A15',
    scenarios: [
      { title: 'Discovery call', titlePt: 'Chamada de discovery', difficulty: 'intermediate', minutes: 7, aiRole: 'Alex, VP of Engineering' },
      { title: 'Handle a pricing objection', titlePt: 'Obje\u00E7\u00E3o de pre\u00E7o', difficulty: 'advanced', minutes: 5, aiRole: 'Michelle, Procurement Director' },
    ],
  },
];

const DIFFICULTY_MAP: Record<string, { label: string; color: string; bg: string }> = {
  beginner: { label: 'Iniciante', color: '#5E7A4F', bg: '#5E7A4F18' },
  intermediate: { label: 'Intermedi\u00E1rio', color: '#D97A2B', bg: '#D97A2B18' },
  advanced: { label: 'Avan\u00E7ado', color: '#C8553D', bg: '#C8553D18' },
};

export default function ScenariosPage() {
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
          Cen&aacute;rios para{' '}
          <span style={{ fontStyle: 'italic', color: '#C8553D' }}>praticar.</span>
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
            fontSize: 14,
            color: '#5C5046',
            margin: '6px 0 0',
          }}
        >
          Escolha um cen&aacute;rio e comece a falar em ingl&ecirc;s com IA.
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
              {track.icon} {track.label}
            </div>

            {/* Scenario cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {track.scenarios.map((scenario) => {
                const diff = DIFFICULTY_MAP[scenario.difficulty];
                return (
                  <Link
                    key={scenario.title}
                    href="/session/demo"
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
                          {track.label}
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
                            {diff.label.toUpperCase()}
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
      <TabBar active="Praticar" />
    </div>
  );
}
