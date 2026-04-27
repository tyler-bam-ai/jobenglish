'use client';

import Link from 'next/link';
import { Wordmark } from '@/components/ui/wordmark';
import { Btn } from '@/components/ui/button';
import { Tag } from '@/components/ui/tag';
import { Sun } from '@/components/ui/sun';

export default function WelcomePage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, #F7F1E8 0%, #F1E8D9 100%)',
        padding: '20px 24px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Sun graphic top-right */}
      <div style={{ position: 'absolute', top: 30, right: -30, opacity: 0.85 }}>
        <Sun size={180} />
      </div>

      {/* Terracotta blob bottom-left */}
      <div
        style={{
          position: 'absolute',
          left: -80,
          bottom: 120,
          width: 240,
          height: 240,
          borderRadius: '50%',
          background: '#C8553D',
          opacity: 0.12,
          filter: 'blur(2px)',
        }}
      />

      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Wordmark size={20} />
        <Tag color="#5C5046">v1.0 &middot; beta</Tag>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Hero content */}
      <div style={{ position: 'relative' }}>
        <div
          style={{
            fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
            fontSize: 11,
            color: '#C8553D',
            letterSpacing: 2,
            marginBottom: 14,
          }}
        >
          &#9473;&#9473; SEU SIMULADOR DE INGLÊS PROFISSIONAL
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display), 'Fraunces', 'Cooper', Georgia, serif",
            fontWeight: 500,
            fontSize: 44,
            lineHeight: 0.98,
            color: '#1F1A14',
            margin: 0,
            letterSpacing: -1.5,
          }}
        >
          Treine o inglês{' '}
          <span style={{ fontStyle: 'italic', color: '#C8553D' }}>
            que sua carreira precisa.
          </span>
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
            fontSize: 16,
            lineHeight: 1.45,
            color: '#5C5046',
            marginTop: 18,
            marginBottom: 0,
            maxWidth: 300,
          }}
        >
          Simule entrevistas, reuniões e apresentações em inglês com IA — e receba feedback em
          português.
        </p>
      </div>

      {/* CTAs */}
      <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Link href="/onboarding/goal" style={{ textDecoration: 'none' }}>
          <Btn variant="accent">
            Começar diagnóstico grátis
            <span style={{ fontSize: 18, marginLeft: 4 }}>&rarr;</span>
          </Btn>
        </Link>
        <Link href="/onboarding/goal" style={{ textDecoration: 'none' }}>
          <Btn variant="quiet" size="md">
            Já tenho conta &middot; Entrar
          </Btn>
        </Link>
      </div>

      {/* Social proof */}
      <div
        style={{
          marginTop: 18,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
          fontSize: 12,
          color: '#8A7C6E',
        }}
      >
        <div style={{ display: 'flex' }}>
          {['#C8553D', '#E8A23A', '#5E7A4F'].map((c, i) => (
            <div
              key={i}
              style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: c,
                border: '2px solid #F7F1E8',
                marginLeft: i ? -6 : 0,
              }}
            />
          ))}
        </div>
        <span>+312 brasileiros praticaram esta semana</span>
      </div>
    </div>
  );
}
