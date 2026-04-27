'use client';

import Link from 'next/link';

const TABS = [
  { label: 'Início', icon: '\u25C9', href: '/dashboard' },
  { label: 'Praticar', icon: '\u25D0', href: '/scenarios' },
  { label: 'Progresso', icon: '\u25B2', href: '/progress' },
  { label: 'Perfil', icon: '\u25CB', href: '/dashboard' },
];

interface TabBarProps {
  active?: string;
}

export function TabBar({ active = 'Início' }: TabBarProps) {
  return (
    <div
      style={{
        position: 'sticky',
        bottom: 0,
        background: '#FFFCF6',
        borderTop: '1px solid #E7DCC9',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px 0 8px',
      }}
    >
      {TABS.map((t) => {
        const isActive = t.label === active;
        return (
          <Link
            key={t.label}
            href={t.href}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              color: isActive ? '#C8553D' : '#8A7C6E',
              fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
              fontSize: 10,
              fontWeight: isActive ? 600 : 500,
              textDecoration: 'none',
            }}
          >
            <div style={{ fontSize: 18 }}>{t.icon}</div>
            {t.label}
          </Link>
        );
      })}
    </div>
  );
}
