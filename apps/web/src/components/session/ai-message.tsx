'use client';

interface AiMessageProps {
  en: string;
  pt: string;
}

export function AiMessage({ en, pt }: AiMessageProps) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          flexShrink: 0,
          background: '#1F3147',
          color: '#FFF8EC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "var(--font-display), 'Fraunces', 'Cooper', Georgia, serif",
          fontSize: 16,
          fontWeight: 600,
        }}
      >
        M
      </div>
      <div
        style={{
          background: '#FFFCF6',
          padding: '12px 14px',
          borderRadius: '4px 16px 16px 16px',
          border: '1px solid #E7DCC9',
          maxWidth: 270,
          fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
            fontSize: 9,
            color: '#8A7C6E',
            letterSpacing: 1,
            marginBottom: 4,
          }}
        >
          EN &middot; &#9834; playing
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.4, color: '#1F1A14' }}>{en}</div>
        <details style={{ marginTop: 8 }}>
          <summary
            style={{
              fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
              fontSize: 10,
              color: '#C8553D',
              cursor: 'pointer',
              letterSpacing: 0.5,
            }}
          >
            &#8631; Traduzir
          </summary>
          <div
            style={{
              fontSize: 12,
              color: '#5C5046',
              lineHeight: 1.4,
              marginTop: 6,
              paddingTop: 6,
              borderTop: '1px dashed #E7DCC9',
            }}
          >
            {pt}
          </div>
        </details>
      </div>
    </div>
  );
}
