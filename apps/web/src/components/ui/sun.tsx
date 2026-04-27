interface SunProps {
  size?: number;
}

export function Sun({ size = 80 }: SunProps) {
  const lines = Array.from({ length: 12 }).map((_, i) => {
    const a = (i / 12) * Math.PI * 2;
    const x1 = 40 + Math.cos(a) * 22;
    const y1 = 40 + Math.sin(a) * 22;
    const x2 = 40 + Math.cos(a) * 32;
    const y2 = 40 + Math.sin(a) * 32;
    return { x1, y1, x2, y2 };
  });

  return (
    <svg width={size} height={size} viewBox="0 0 80 80" style={{ display: 'block' }}>
      <circle cx="40" cy="40" r="14" fill="#E8A23A" />
      {lines.map((l, i) => (
        <line
          key={i}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke="#E8A23A"
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
