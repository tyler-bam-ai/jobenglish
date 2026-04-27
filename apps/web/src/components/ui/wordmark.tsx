'use client';

export function Wordmark({ size = 22 }: { size?: number }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-display), 'Fraunces', 'Cooper', Georgia, serif",
        fontWeight: 600,
        fontSize: size,
        color: '#1F1A14',
        letterSpacing: -0.4,
        lineHeight: 1,
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: 0,
      }}
    >
      <span style={{ fontStyle: 'italic' }}>job</span>
      <span>English</span>
      <span
        style={{
          marginLeft: 6,
          fontSize: size * 0.5,
          fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
          color: '#C8553D',
          fontWeight: 500,
          letterSpacing: 1,
          fontStyle: 'normal',
          transform: `translateY(-${size * 0.35}px)`,
          display: 'inline-block',
        }}
      >
        BR
      </span>
    </div>
  );
}
