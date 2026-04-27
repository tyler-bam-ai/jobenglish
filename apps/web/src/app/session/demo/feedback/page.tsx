'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Btn } from '@/components/ui/button';
import { Tag } from '@/components/ui/tag';
import { Sun } from '@/components/ui/sun';
import { RadarChart } from '@/components/feedback/radar-chart';
import { CorrectionCard } from '@/components/feedback/correction-card';
import { useLang, t } from '@/lib/i18n';

const SKILLS = [
  { kKey: 'fluency' as const, v: 68 },
  { kKey: 'grammar' as const, v: 64 },
  { kKey: 'vocabulary' as const, v: 76 },
  { kKey: 'clarity' as const, v: 74 },
  { kKey: 'pronunciation' as const, v: 70 },
];

const CORRECTIONS = [
  {
    you: 'I made an API for login and users.',
    better: 'I built an API for user authentication.',
    why: '"Authentication" soa mais profissional em contexto técnico, e "built" é mais comum que "made" para projetos de engenharia.',
  },
  {
    you: 'The challenge was make it secure.',
    better: 'The challenge was making it secure.',
    why: 'Depois de "was," aqui usamos verbo com -ing \u2014 "making."',
  },
  {
    you: 'connect with database.',
    better: 'connect it to the database.',
    why: 'Em inglês técnico, "connect to the database" é mais natural \u2014 e use o artigo "the."',
  },
];

export default function FeedbackPage() {
  const router = useRouter();
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
      {/* Hero */}
      <div
        style={{
          padding: '14px 22px 22px',
          background: 'linear-gradient(180deg, #F7F1E8 0%, #F7F1E8 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: -50, right: -50, opacity: 0.7 }}>
          <Sun size={180} />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          <button
            onClick={() => router.push('/dashboard')}
            style={{
              background: '#FFFCF6',
              border: '1px solid #E7DCC9',
              width: 36,
              height: 36,
              borderRadius: '50%',
              cursor: 'pointer',
              fontSize: 14,
              color: '#1F1A14',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            &times;
          </button>
          <Tag color="#5E7A4F">{t.sessionComplete[lang]}</Tag>
          <div style={{ width: 36 }} />
        </div>

        <div style={{ marginTop: 16, position: 'relative' }}>
          <div
            style={{
              fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
              fontSize: 11,
              color: '#8A7C6E',
              letterSpacing: 2,
            }}
          >
            {t.feedbackSectionLabel[lang]}
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display), 'Fraunces', 'Cooper', Georgia, serif",
              fontWeight: 500,
              fontSize: 26,
              lineHeight: 1.05,
              margin: '6px 0 12px',
              color: '#1F1A14',
              letterSpacing: -0.6,
            }}
          >
            {t.feedbackTitle1[lang]}{' '}
            <span style={{ fontStyle: 'italic', color: '#C8553D' }}>{t.feedbackTitle2[lang]}</span>
          </h2>
        </div>

        {/* Score row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 18,
            position: 'relative',
            padding: '12px 16px',
            background: '#1F1A14',
            borderRadius: 18,
            color: '#FFF8EC',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
                fontSize: 9,
                color: '#E8A23A',
                letterSpacing: 1.5,
              }}
            >
              {t.overallScore[lang]}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 2 }}>
              <span
                style={{
                  fontFamily: "var(--font-display), 'Fraunces', 'Cooper', Georgia, serif",
                  fontSize: 56,
                  fontWeight: 500,
                  lineHeight: 1,
                  letterSpacing: -2,
                }}
              >
                72
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
                  fontSize: 14,
                  color: '#FFF8EC99',
                }}
              >
                /100
              </span>
            </div>
          </div>
          <div style={{ flex: 1, paddingBottom: 8 }}>
            <div
              style={{
                fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
                fontSize: 11,
                color: '#FFF8EC99',
                padding: '4px 8px',
                background: '#FFF8EC15',
                borderRadius: 4,
                display: 'inline-block',
                marginBottom: 6,
              }}
            >
              {t.vsAttempt[lang]}
            </div>
            <div
              style={{
                fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
                fontSize: 12,
                color: '#FFF8EC',
                lineHeight: 1.4,
              }}
            >
              <strong>{t.workReady[lang]}</strong> {t.workReadySub[lang]}
            </div>
          </div>
        </div>
      </div>

      {/* Radar */}
      <div style={{ padding: '0 22px' }}>
        <div
          style={{
            padding: '14px 16px',
            borderRadius: 18,
            background: '#FFFCF6',
            border: '1px solid #E7DCC9',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              marginBottom: 6,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
                fontSize: 10,
                color: '#8A7C6E',
                letterSpacing: 1.5,
              }}
            >
              {t.skills[lang]}
            </span>
            <span
              style={{
                fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
                fontSize: 11,
                color: '#8A7C6E',
              }}
            >
              {t.thisSession[lang]}
            </span>
          </div>
          <RadarChart skills={SKILLS.map(s => ({ k: t[s.kKey][lang], v: s.v }))} />
        </div>
      </div>

      {/* Corrections */}
      <div style={{ padding: '16px 22px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span
            style={{
              fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
              fontSize: 10,
              color: '#8A7C6E',
              letterSpacing: 1.5,
            }}
          >
            {t.corrections[lang]}
          </span>
          <span
            style={{
              fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
              fontSize: 11,
              color: '#8A7C6E',
            }}
          >
            {t.enToPt[lang]}
          </span>
        </div>
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {CORRECTIONS.map((c, i) => (
            <CorrectionCard key={i} index={i + 1} you={c.you} better={c.better} why={c.why} />
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{ padding: '14px 22px 0' }}>
        <div
          style={{
            padding: '10px 12px',
            borderRadius: 10,
            background: '#F1E8D9',
            border: '1px dashed #8A7C6E55',
            fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
            fontSize: 11,
            color: '#5C5046',
            lineHeight: 1.4,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
              fontSize: 9,
              color: '#8A7C6E',
              letterSpacing: 1,
            }}
          >
            {t.disclaimerLabel[lang]}
          </span>
          {t.disclaimer[lang]}
        </div>
      </div>

      {/* CTA + B2B teaser */}
      <div
        style={{ padding: '16px 22px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}
      >
        <Btn variant="accent" onClick={() => router.push('/session/demo')}>
          {t.retry[lang]}
        </Btn>
        <Link href="/b2b" style={{ textDecoration: 'none' }}>
          <Btn variant="ghost">{t.practicePhrase[lang]}</Btn>
        </Link>
      </div>

      <div style={{ padding: '0 22px 24px' }}>
        <Link href="/b2b" style={{ display: 'block', textDecoration: 'none' }}>
          <div
            style={{
              padding: '14px 16px',
              borderRadius: 16,
              background: '#1F3147',
              color: '#FFF8EC',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: '#FFF8EC15',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "var(--font-display), 'Fraunces', 'Cooper', Georgia, serif",
                fontSize: 18,
              }}
            >
              &#9707;
            </div>
            <div
              style={{
                flex: 1,
                fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600 }}>{t.forCompaniesAndBootcamps[lang]}</div>
              <div style={{ fontSize: 11, color: '#FFF8EC99', marginTop: 2 }}>
                {t.trackMinutesEvolution[lang]}
              </div>
            </div>
            <span style={{ fontSize: 16 }}>&rarr;</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
