'use client';

interface WaveformProps {
  active: boolean;
  color?: string;
}

export function Waveform({ active, color = '#C8553D' }: WaveformProps) {
  const bars = 28;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 56 }}>
      {Array.from({ length: bars }).map((_, i) => {
        const seed = (Math.sin(i * 1.7) + 1) / 2;
        const h = active ? 6 + seed * 44 : 6 + seed * 14;
        return (
          <div
            key={i}
            style={{
              width: 3,
              borderRadius: 2,
              height: Math.max(4, h),
              background: color,
              opacity: active ? 0.7 + seed * 0.3 : 0.35,
              animation: active
                ? `pulse-${i % 4} ${0.6 + seed * 0.5}s ease-in-out infinite alternate`
                : 'none',
            }}
          />
        );
      })}
    </div>
  );
}
