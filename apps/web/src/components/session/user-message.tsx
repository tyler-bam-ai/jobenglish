interface UserMessageProps {
  en: string;
}

export function UserMessage({ en }: UserMessageProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <div
        style={{
          background: '#C8553D',
          color: '#FFF8EC',
          padding: '12px 14px',
          borderRadius: '16px 4px 16px 16px',
          maxWidth: 270,
          fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
            fontSize: 9,
            color: '#FFF8EC99',
            letterSpacing: 1,
            marginBottom: 4,
          }}
        >
          YOU &middot; transcript
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.4 }}>&ldquo;{en}&rdquo;</div>
      </div>
    </div>
  );
}
