'use client';

import { useLang, t } from '@/lib/i18n';

interface CorrectionCardProps {
  index: number;
  you: string;
  better: string;
  why: string;
}

export function CorrectionCard({ index, you, better, why }: CorrectionCardProps) {
  const { lang } = useLang();
  return (
    <div
      style={{
        padding: '14px 16px',
        borderRadius: 16,
        background: '#FFFCF6',
        border: '1px solid #E7DCC9',
        fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span
          style={{
            width: 22,
            height: 22,
            borderRadius: '50%',
            background: '#C8553D',
            color: '#FFF8EC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          {index}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
            fontSize: 10,
            color: '#8A7C6E',
            letterSpacing: 1.2,
          }}
        >
          {t.correction[lang]}
        </span>
      </div>

      {/* You said */}
      <div style={{ marginBottom: 8 }}>
        <div
          style={{
            fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
            fontSize: 9,
            color: '#8A7C6E',
            letterSpacing: 1,
          }}
        >
          {t.youSaid[lang]}
        </div>
        <div
          style={{
            fontSize: 14,
            color: '#5C5046',
            marginTop: 2,
            textDecoration: 'line-through',
            textDecorationColor: '#8A7C6E',
            fontStyle: 'italic',
          }}
        >
          &ldquo;{you}&rdquo;
        </div>
      </div>

      {/* Better */}
      <div
        style={{
          padding: '10px 12px',
          background: '#5E7A4F12',
          borderRadius: 10,
          borderLeft: '3px solid #5E7A4F',
          marginBottom: 10,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
            fontSize: 9,
            color: '#5E7A4F',
            letterSpacing: 1,
            fontWeight: 600,
          }}
        >
          {t.better[lang]}
        </div>
        <div style={{ fontSize: 14, color: '#1F1A14', fontWeight: 500, marginTop: 2 }}>
          &ldquo;{better}&rdquo;
        </div>
      </div>

      {/* Why */}
      <div style={{ fontSize: 12.5, color: '#5C5046', lineHeight: 1.4 }}>
        <strong style={{ color: '#1F1A14' }}>{t.whyPrefix[lang]}</strong>
        {why}
      </div>

      {/* Action buttons */}
      <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
        <button
          style={{
            fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
            fontSize: 11,
            fontWeight: 600,
            background: '#F1E8D9',
            color: '#1F1A14',
            border: 'none',
            padding: '6px 10px',
            borderRadius: 99,
            cursor: 'pointer',
          }}
        >
          {t.savePhrase[lang]}
        </button>
        <button
          style={{
            fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
            fontSize: 11,
            fontWeight: 600,
            background: 'transparent',
            color: '#5C5046',
            border: '1px solid #E7DCC9',
            padding: '6px 10px',
            borderRadius: 99,
            cursor: 'pointer',
          }}
        >
          {t.listen[lang]}
        </button>
      </div>
    </div>
  );
}
