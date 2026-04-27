'use client';

import { useState } from 'react';
import { LangContext, type Lang } from '@/lib/i18n';

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('pt');

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
      {/* Floating language toggle */}
      <button
        onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
        style={{
          position: 'fixed',
          top: 12,
          right: 12,
          zIndex: 9999,
          background: '#1F1A14',
          color: '#FFF8EC',
          border: 'none',
          borderRadius: 99,
          padding: '6px 14px',
          fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: 1,
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span style={{ fontSize: 14 }}>{lang === 'pt' ? '🇧🇷' : '🇺🇸'}</span>
        {lang === 'pt' ? 'EN' : 'PT'}
      </button>
    </LangContext.Provider>
  );
}
