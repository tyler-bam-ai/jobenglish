'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TopNav } from '@/components/ui/top-nav';
import { Btn } from '@/components/ui/button';

const GOALS = [
  { id: 'tech', label: 'Entrevista tech', sub: 'Backend, frontend, system design', icon: '\u25C6' },
  { id: 'meetings', label: 'Reuniões em inglês', sub: 'Standups, planning, atualizações', icon: '\u25D0' },
  { id: 'data', label: 'Apresentação de projeto', sub: 'IA, dados, dashboards', icon: '\u25B2' },
  { id: 'support', label: 'Suporte ao cliente', sub: 'Atendimento, escalonamentos', icon: '\u25CF' },
  { id: 'sales', label: 'Vendas / clientes internacionais', sub: 'Discovery, demos, objeções', icon: '\u25C7' },
];

export default function GoalPage() {
  const router = useRouter();
  const [picked, setPicked] = useState('tech');

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#F7F1E8',
        padding: '14px 24px 20px',
      }}
    >
      <TopNav onBack={() => router.push('/')} step={1} total={4} />

      <div style={{ marginTop: 20 }}>
        <div
          style={{
            fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
            fontSize: 11,
            color: '#8A7C6E',
            letterSpacing: 2,
          }}
        >
          PASSO 01 &middot; OBJETIVO
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display), 'Fraunces', 'Cooper', Georgia, serif",
            fontWeight: 500,
            fontSize: 30,
            lineHeight: 1.05,
            margin: '8px 0 6px',
            color: '#1F1A14',
            letterSpacing: -0.8,
          }}
        >
          Onde você quer falar inglês{' '}
          <span style={{ fontStyle: 'italic', color: '#C8553D' }}>com confiança?</span>
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
            fontSize: 14,
            color: '#5C5046',
            margin: 0,
          }}
        >
          Escolha um foco principal — você pode mudar depois.
        </p>
      </div>

      <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        {GOALS.map((g) => {
          const active = picked === g.id;
          return (
            <button
              key={g.id}
              onClick={() => setPicked(g.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '14px 16px',
                borderRadius: 16,
                background: active ? '#1F1A14' : '#FFFCF6',
                border: active ? '1.5px solid #1F1A14' : '1.5px solid #E7DCC9',
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
                transition: 'all 0.15s ease',
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: active ? '#C8553D' : '#F2D9C9',
                  color: active ? '#FFF8EC' : '#C8553D',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  flexShrink: 0,
                }}
              >
                {g.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: active ? '#FFF8EC' : '#1F1A14' }}>
                  {g.label}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: active ? '#FFF8EC99' : '#8A7C6E',
                    marginTop: 2,
                  }}
                >
                  {g.sub}
                </div>
              </div>
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  border: active ? 'none' : '1.5px solid #E7DCC9',
                  background: active ? '#FFF8EC' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {active && (
                  <div
                    style={{ width: 8, height: 8, borderRadius: '50%', background: '#1F1A14' }}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>

      <Btn variant="accent" onClick={() => router.push('/onboarding/consent')} style={{ marginTop: 16 }}>
        Continuar &rarr;
      </Btn>
    </div>
  );
}
