'use client';

interface TopNavProps {
  onBack: () => void;
  step: number;
  total: number;
}

export function TopNav({ onBack, step, total }: TopNavProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <button
        onClick={onBack}
        style={{
          background: '#FFFCF6',
          border: '1px solid #E7DCC9',
          width: 40,
          height: 40,
          borderRadius: '50%',
          cursor: 'pointer',
          fontSize: 16,
          color: '#1F1A14',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        &larr;
      </button>
      <div style={{ display: 'flex', gap: 6 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            style={{
              width: i < step ? 18 : 8,
              height: 4,
              borderRadius: 2,
              background: i < step ? '#C8553D' : '#E7DCC9',
              transition: 'all 0.2s',
            }}
          />
        ))}
      </div>
      <div style={{ width: 40 }} />
    </div>
  );
}
