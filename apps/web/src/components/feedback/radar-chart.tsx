interface Skill {
  k: string;
  v: number;
}

interface RadarProps {
  skills: Skill[];
}

export function RadarChart({ skills }: RadarProps) {
  const cx = 120;
  const cy = 120;
  const r = 90;
  const n = skills.length;

  const points = skills.map((s, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    const dist = (s.v / 100) * r;
    return [cx + Math.cos(a) * dist, cy + Math.sin(a) * dist] as const;
  });

  const labels = skills.map((s, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    const dist = r + 18;
    return {
      x: cx + Math.cos(a) * dist,
      y: cy + Math.sin(a) * dist,
      ...s,
    };
  });

  const path =
    points.map((p, i) => (i === 0 ? 'M' : 'L') + p[0] + ',' + p[1]).join(' ') + 'Z';

  return (
    <svg width={240} height={240} viewBox="0 0 240 240">
      {/* rings */}
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <circle key={f} cx={cx} cy={cy} r={r * f} fill="none" stroke="#E7DCC9" strokeWidth="1" />
      ))}
      {/* spokes */}
      {skills.map((_, i) => {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2;
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={cx + Math.cos(a) * r}
            y2={cy + Math.sin(a) * r}
            stroke="#E7DCC9"
          />
        );
      })}
      {/* filled shape */}
      <path
        d={path}
        fill="#C8553D"
        fillOpacity="0.18"
        stroke="#C8553D"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* dots */}
      {points.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="4" fill="#C8553D" />
      ))}
      {/* labels */}
      {labels.map((l, i) => (
        <g key={i}>
          <text
            x={l.x}
            y={l.y - 4}
            textAnchor="middle"
            fontFamily="var(--font-mono), 'JetBrains Mono', ui-monospace, monospace"
            fontSize="9"
            letterSpacing="1"
            fill="#8A7C6E"
          >
            {l.k.toUpperCase()}
          </text>
          <text
            x={l.x}
            y={l.y + 8}
            textAnchor="middle"
            fontFamily="var(--font-display), 'Fraunces', 'Cooper', Georgia, serif"
            fontSize="13"
            fontWeight="600"
            fill="#1F1A14"
          >
            {l.v}
          </text>
        </g>
      ))}
    </svg>
  );
}
