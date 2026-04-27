'use client';

import Link from 'next/link';
import { useLang, t as tr } from '@/lib/i18n';

const TABS = [
  { key: 'home' as const, icon: '\u25C9', href: '/dashboard' },
  { key: 'practice' as const, icon: '\u25D0', href: '/scenarios' },
  { key: 'progress' as const, icon: '\u25B2', href: '/progress' },
  { key: 'profile' as const, icon: '\u25CB', href: '/dashboard' },
];

interface TabBarProps {
  active?: string;
}

export function TabBar({ active = 'home' }: TabBarProps) {
  const { lang } = useLang();

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
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <Link
            key={tab.key}
            href={tab.href}
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
            <div style={{ fontSize: 18 }}>{tab.icon}</div>
            {tr[tab.key][lang]}
          </Link>
        );
      })}
    </div>
  );
}
