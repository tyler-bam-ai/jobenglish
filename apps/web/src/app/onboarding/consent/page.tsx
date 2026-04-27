'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TopNav } from '@/components/ui/top-nav';
import { Btn } from '@/components/ui/button';
import { setConsents } from '@/lib/onboarding-store';

const CONSENTS = [
  { id: 'voice', label: 'Aceito o processamento da minha voz para análise de inglês.', required: true },
  { id: 'ai', label: 'Aceito receber feedback gerado por IA em português.', required: true },
  { id: 'estimate', label: 'Entendo que as notas são estimativas educacionais — não certificação oficial.', required: true },
  { id: 'audio', label: 'Permitir armazenar áudio por 30 dias para revisão (opcional).', required: false },
];

export default function ConsentPage() {
  const router = useRouter();
  const [accepted, setAccepted] = useState<Record<string, boolean>>({
    voice: false,
    ai: false,
    estimate: false,
    audio: false,
  });

  const allRequired = CONSENTS.filter((c) => c.required).every((c) => accepted[c.id]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#F7F1E8',
        padding: '14px 24px 20px',
        overflow: 'auto',
      }}
    >
      <TopNav onBack={() => router.push('/onboarding/goal')} step={2} total={4} />

      <div style={{ marginTop: 20 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
            fontSize: 10,
            letterSpacing: 1.5,
            color: '#5E7A4F',
            background: '#5E7A4F15',
            padding: '5px 9px',
            borderRadius: 4,
          }}
        >
          <span
            style={{ width: 6, height: 6, borderRadius: '50%', background: '#5E7A4F', display: 'inline-block' }}
          />
          LGPD &middot; ANPD COMPLIANT
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display), 'Fraunces', 'Cooper', Georgia, serif",
            fontWeight: 500,
            fontSize: 28,
            lineHeight: 1.05,
            margin: '12px 0 6px',
            color: '#1F1A14',
            letterSpacing: -0.6,
          }}
        >
          Antes de começar,{' '}
          <span style={{ fontStyle: 'italic', color: '#C8553D' }}>uns combinados.</span>
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
            fontSize: 14,
            color: '#5C5046',
            margin: 0,
            lineHeight: 1.45,
          }}
        >
          Para gerar feedback, vamos processar sua voz, transcrição e respostas. Você pode excluir
          tudo quando quiser.
        </p>
      </div>

      <div
        style={{
          marginTop: 18,
          padding: 14,
          borderRadius: 14,
          background: '#FFFCF6',
          border: '1px solid #E7DCC9',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          flex: 1,
        }}
      >
        {CONSENTS.map((c) => {
          const on = accepted[c.id];
          return (
            <label
              key={c.id}
              style={{
                display: 'flex',
                gap: 12,
                alignItems: 'flex-start',
                cursor: 'pointer',
                fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
              }}
            >
              <div
                onClick={() => setAccepted((a) => ({ ...a, [c.id]: !on }))}
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  background: on ? '#1F1A14' : 'transparent',
                  border: `1.5px solid ${on ? '#1F1A14' : '#8A7C6E'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: 2,
                  transition: 'all 0.15s',
                  cursor: 'pointer',
                }}
              >
                {on && (
                  <span style={{ color: '#FFF8EC', fontSize: 14, lineHeight: 1 }}>&#10003;</span>
                )}
              </div>
              <div style={{ flex: 1, fontSize: 13.5, color: '#1F1A14', lineHeight: 1.4 }}>
                {c.label}
                {!c.required && (
                  <span style={{ color: '#8A7C6E', fontSize: 11, marginLeft: 4 }}>
                    &middot; opcional
                  </span>
                )}
              </div>
            </label>
          );
        })}

        <div
          style={{
            marginTop: 4,
            padding: '12px 14px',
            borderRadius: 10,
            background: '#F1E8D9',
            fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
            fontSize: 12,
            color: '#5C5046',
            lineHeight: 1.4,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
              fontSize: 10,
              color: '#8A7C6E',
              letterSpacing: 1,
            }}
          >
            SEUS DIREITOS &middot;{' '}
          </span>
          Acessar, corrigir, exportar e excluir seus dados a qualquer momento em{' '}
          <strong style={{ color: '#1F1A14' }}>Perfil &rarr; Privacidade</strong>.
        </div>
      </div>

      <Btn
        variant={allRequired ? 'accent' : 'primary'}
        onClick={() => {
          if (allRequired) { setConsents(accepted); router.push('/onboarding/diagnostic'); }
        }}
        style={{
          marginTop: 16,
          opacity: allRequired ? 1 : 0.4,
          cursor: allRequired ? 'pointer' : 'not-allowed',
        }}
      >
        {allRequired ? 'Concordo \u00B7 Continuar \u2192' : 'Aceite os itens obrigatórios'}
      </Btn>
    </div>
  );
}
