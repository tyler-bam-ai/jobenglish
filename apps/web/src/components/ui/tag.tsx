interface TagProps {
  children: React.ReactNode;
  color?: string;
  bg?: string;
}

export function Tag({ children, color = '#C8553D', bg }: TagProps) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        color,
        background: bg || `${color}15`,
        padding: '4px 8px',
        borderRadius: 4,
        display: 'inline-block',
      }}
    >
      {children}
    </span>
  );
}
