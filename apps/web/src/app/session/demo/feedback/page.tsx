'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Btn } from '@/components/ui/button';
import { Tag } from '@/components/ui/tag';
import { Sun } from '@/components/ui/sun';
import { RadarChart } from '@/components/feedback/radar-chart';
import { CorrectionCard } from '@/components/feedback/correction-card';

const SKILLS = [
  { k: 'Fluência', v: 68 },
  { k: 'Gramática', v: 64 },
  { k: 'Vocabulário', v: 76 },
  { k: 'Clareza', v: 74 },
  { k: 'Pronúncia', v: 70 },
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
          <Tag color="#5E7A4F">&#9679; SESSÃO COMPLETA</Tag>
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
            &#9473;&#9473; FEEDBACK &middot; TECH INTERVIEW
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
            Você comunicou bem{' '}
            <span style={{ fontStyle: 'italic', color: '#C8553D' }}>a ideia principal.</span>
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
              SCORE GERAL
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
              &#8593; +9 vs. tentativa 1
            </div>
            <div
              style={{
                fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
                fontSize: 12,
                color: '#FFF8EC',
                lineHeight: 1.4,
              }}
            >
              <strong>Work-ready em cenários comuns.</strong> Vamos deixar seu inglês mais natural
              para entrevistas.
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
              &#9473;&#9473; HABILIDADES
            </span>
            <span
              style={{
                fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
                fontSize: 11,
                color: '#8A7C6E',
              }}
            >
              nesta sessão
            </span>
          </div>
          <RadarChart skills={SKILLS} />
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
            &#9473;&#9473; TOP 3 CORREÇÕES
          </span>
          <span
            style={{
              fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
              fontSize: 11,
              color: '#8A7C6E',
            }}
          >
            EN &rarr; PT
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
            AVISO &middot;{' '}
          </span>
          Notas geradas por IA, são{' '}
          <strong style={{ color: '#1F1A14' }}>estimativas educacionais</strong>. Não substituem
          certificação oficial e não devem ser usadas como base única para decisões de contratação.
        </div>
      </div>

      {/* CTA + B2B teaser */}
      <div
        style={{ padding: '16px 22px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}
      >
        <Btn variant="accent" onClick={() => router.push('/session/demo')}>
          &#8635; Tentar novamente
        </Btn>
        <Link href="/b2b" style={{ textDecoration: 'none' }}>
          <Btn variant="ghost">Praticar frases técnicas</Btn>
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
              <div style={{ fontSize: 13, fontWeight: 600 }}>Para empresas e bootcamps</div>
              <div style={{ fontSize: 11, color: '#FFF8EC99', marginTop: 2 }}>
                Acompanhe minutos, evolução e prontidão do time
              </div>
            </div>
            <span style={{ fontSize: 16 }}>&rarr;</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
