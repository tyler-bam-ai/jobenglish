'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TopNav } from '@/components/ui/top-nav';
import { Btn } from '@/components/ui/button';
import { Waveform } from '@/components/ui/waveform';
import { setDiagnosticCompleted } from '@/lib/onboarding-store';
import { useLang, t } from '@/lib/i18n';

export default function DiagnosticPage() {
  const router = useRouter();
  const { lang } = useLang();
  const [recording, setRecording] = useState(false);
  const [time, setTime] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!recording) return;
    const id = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [recording]);

  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const handleMic = () => {
    if (!recording && !done) {
      setRecording(true);
      setTime(0);
    } else if (recording) {
      setRecording(false);
      setDone(true);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#F7F1E8',
        padding: '14px 24px 20px',
      }}
    >
      <TopNav onBack={() => router.push('/onboarding/consent')} step={3} total={4} />

      <div style={{ marginTop: 18 }}>
        <div
          style={{
            fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
            fontSize: 11,
            color: '#8A7C6E',
            letterSpacing: 2,
          }}
        >
          {t.diagStep[lang]}
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display), 'Fraunces', 'Cooper', Georgia, serif",
            fontWeight: 500,
            fontSize: 26,
            lineHeight: 1.1,
            margin: '6px 0 0',
            color: '#1F1A14',
            letterSpacing: -0.6,
          }}
        >
          {t.diagTitle1[lang]} <span style={{ fontStyle: 'italic', color: '#C8553D' }}>{t.diagTitle2[lang]}</span>{t.diagTitle3[lang]}
        </h2>
      </div>

      {/* Prompt card */}
      <div
        style={{
          marginTop: 18,
          padding: '20px 18px',
          borderRadius: 18,
          background: '#1F1A14',
          color: '#FFF8EC',
          fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
            fontSize: 10,
            letterSpacing: 1.5,
            color: '#E8A23A',
            marginBottom: 10,
          }}
        >
          &#9473;&#9473; PROMPT &middot; EN
        </div>
        <div
          style={{
            fontFamily: "var(--font-display), 'Fraunces', 'Cooper', Georgia, serif",
            fontSize: 22,
            lineHeight: 1.25,
            fontWeight: 400,
            fontStyle: 'italic',
          }}
        >
          &ldquo;Tell me about your current job or a project you&apos;ve worked on recently.&rdquo;
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 12,
            color: '#FFF8EC99',
            paddingTop: 12,
            borderTop: '1px solid #FFF8EC22',
          }}
        >
          {t.diagTranslation[lang]}
        </div>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Waveform + mic */}
      <div
        style={{
          background: '#FFFCF6',
          borderRadius: 24,
          padding: '20px 16px',
          border: '1px solid #E7DCC9',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <Waveform active={recording} />
        <div
          style={{
            fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
            fontSize: 13,
            color: recording ? '#C8553D' : '#8A7C6E',
            letterSpacing: 1,
            fontWeight: 600,
          }}
        >
          {recording
            ? `${t.diagRecording[lang]} \u00B7 ${fmt(time)}`
            : done
              ? `${t.diagRecorded[lang]} \u00B7 ${fmt(time)}`
              : t.diagTap[lang]}
        </div>

        <button
          onClick={handleMic}
          style={{
            width: 76,
            height: 76,
            borderRadius: '50%',
            background: recording ? '#1F1A14' : '#C8553D',
            border: 'none',
            cursor: 'pointer',
            color: '#FFF8EC',
            boxShadow: recording ? '0 0 0 8px #C8553D33' : '0 8px 24px #C8553D44',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
          }}
        >
          {recording ? (
            <div style={{ width: 22, height: 22, background: '#FFF8EC', borderRadius: 4 }} />
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <rect x="9" y="3" width="6" height="13" rx="3" fill="#FFF8EC" />
              <path
                d="M5 11a7 7 0 0014 0M12 18v3"
                stroke="#FFF8EC"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          )}
        </button>

        <div
          style={{
            display: 'flex',
            gap: 16,
            fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
            fontSize: 13,
            color: '#5C5046',
          }}
        >
          <button
            onClick={() => {
              setRecording(false);
              setDone(false);
              setTime(0);
            }}
            style={{ background: 'transparent', border: 'none', color: '#5C5046', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit' }}
          >
            {t.diagRerecord[lang]}
          </button>
          <span style={{ color: '#E7DCC9' }}>&middot;</span>
          <button
            onClick={() => alert(t.comingSoon[lang])}
            style={{ background: 'transparent', border: 'none', color: '#5C5046', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit' }}
          >
            {t.diagListen[lang]}
          </button>
        </div>
      </div>

      <Btn
        variant="accent"
        onClick={() => {
          if (done) { setDiagnosticCompleted(); router.push('/dashboard'); }
        }}
        style={{
          marginTop: 14,
          opacity: done ? 1 : 0.4,
          cursor: done ? 'pointer' : 'not-allowed',
        }}
      >
        {done ? t.diagSubmit[lang] : t.diagRecord[lang]}
      </Btn>
    </div>
  );
}
