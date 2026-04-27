'use client';

import React from 'react';

type BtnVariant = 'primary' | 'accent' | 'ghost' | 'soft' | 'quiet';
type BtnSize = 'lg' | 'md' | 'sm';

interface BtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: BtnVariant;
  size?: BtnSize;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const sizes: Record<BtnSize, React.CSSProperties> = {
  lg: { fontSize: 16, padding: '16px 20px' },
  md: { fontSize: 14, padding: '12px 18px' },
  sm: { fontSize: 13, padding: '8px 14px' },
};

const variants: Record<BtnVariant, React.CSSProperties> = {
  primary: { background: '#1F1A14', color: '#FFF8EC' },
  accent: { background: '#C8553D', color: '#FFF8EC' },
  ghost: { background: 'transparent', color: '#1F1A14', border: '1.5px solid #1F1A14' },
  soft: { background: '#F2D9C9', color: '#C8553D' },
  quiet: { background: 'transparent', color: '#5C5046' },
};

export function Btn({
  children,
  onClick,
  variant = 'primary',
  size = 'lg',
  style = {},
  icon,
  disabled = false,
}: BtnProps) {
  const base: React.CSSProperties = {
    fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
    fontWeight: 600,
    letterSpacing: -0.1,
    border: 'none',
    borderRadius: 999,
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    transition: 'transform 0.12s ease, opacity 0.12s ease',
    width: '100%',
    boxSizing: 'border-box',
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      onMouseDown={(e) => {
        if (!disabled) (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.98)';
      }}
      onMouseUp={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
      }}
    >
      {icon}
      {children}
    </button>
  );
}
