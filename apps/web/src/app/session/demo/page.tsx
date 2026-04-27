'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AiMessage } from '@/components/session/ai-message';
import { UserMessage } from '@/components/session/user-message';
import { Waveform } from '@/components/ui/waveform';

const ROLEPLAY_TURNS = [
  {
    speaker: 'ai' as const,
    en: "Hi Ana. Thanks for joining. To start \u2014 tell me about a backend project you've built recently. What was the main technical challenge?",
    pt: 'Olá Ana. Obrigado por participar. Para começar \u2014 me conte sobre um projeto backend que você construiu recentemente. Qual foi o principal desafio técnico?',
  },
  {
    speaker: 'user' as const,
    en: 'I made an API for login and users. The challenge was make it secure and connect with database.',
    pt: '',
  },
  {
    speaker: 'ai' as const,
    en: 'Got it. How did you handle authentication and protect the user data?',
    pt: 'Entendi. Como você lidou com a autenticação e protegeu os dados do usuário?',
  },
];

export default function RoleplayPage() {
  const router = useRouter();
  const [turn, setTurn] = useState(0);
  const [recording, setRecording] = useState(false);
  const [recTime, setRecTime] = useState(0);

  const visible = ROLEPLAY_TURNS.slice(0, turn + 1);

  useEffect(() => {
    if (!recording) return;
    const id = setInterval(() => setRecTime((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [recording]);

  const handleMic = () => {
    if (!recording) {
      setRecording(true);
      setRecTime(0);
    } else {
      setRecording(false);
      setTimeout(() => setTurn(1), 200);
      setTimeout(() => setTurn(2), 1400);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#F1E8D9',
      }}
    >
      {/* Roleplay header */}
      <div
        style={{
          padding: '12px 18px',
          background: '#1F1A14',
          color: '#FFF8EC',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <button
          onClick={() => router.push('/dashboard')}
          style={{
            background: '#FFF8EC15',
            border: 'none',
            color: '#FFF8EC',
            width: 32,
            height: 32,
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          &times;
        </button>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
              fontSize: 9,
              letterSpacing: 1.5,
              color: '#E8A23A',
            }}
          >
            &#9679; AO VIVO &middot; IA ROLEPLAY
          </div>
          <div
            style={{
              fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
              fontSize: 13,
              fontWeight: 600,
              marginTop: 2,
            }}
          >
            Marcus &middot; Tech Interviewer
          </div>
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
            fontSize: 11,
            padding: '4px 10px',
            background: '#FFF8EC15',
            borderRadius: 99,
          }}
        >
          {Math.min(turn + 1, 3)}/5
        </div>
      </div>

      {/* Scenario context bar */}
      <div
        style={{
          padding: '8px 18px',
          background: '#F1E8D9',
          fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
          fontSize: 10,
          color: '#5C5046',
          letterSpacing: 1,
          borderBottom: '1px solid #E7DCC9',
        }}
      >
        SCENARIO &middot; EXPLAIN A BACKEND PROJECT &middot; 7 MIN
      </div>

      {/* Conversation */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          padding: '18px 18px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        {visible.map((t, i) =>
          t.speaker === 'ai' ? (
            <AiMessage key={i} en={t.en} pt={t.pt} />
          ) : (
            <UserMessage key={i} en={t.en} />
          )
        )}

        {recording && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div
              style={{
                background: '#FFFCF6',
                border: '1.5px dashed #C8553D',
                padding: '12px 16px',
                borderRadius: '16px 4px 16px 16px',
                fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
                fontSize: 11,
                color: '#C8553D',
                letterSpacing: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#C8553D',
                  animation: 'blink 1s infinite',
                  display: 'inline-block',
                }}
              />
              ESCUTANDO...{' '}
              {String(Math.floor(recTime / 60)).padStart(2, '0')}:
              {String(recTime % 60).padStart(2, '0')}
            </div>
          </div>
        )}
      </div>

      {/* Helper chips */}
      <div
        style={{
          padding: '8px 18px 0',
          display: 'flex',
          gap: 8,
          overflow: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        {['\u21BB Repetir', '\u21B7 Traduzir', '\u25C6 Dica', '\u266A Mais devagar'].map((c) => (
          <button
            key={c}
            style={{
              background: '#FFFCF6',
              border: '1px solid #E7DCC9',
              padding: '7px 12px',
              borderRadius: 99,
              fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
              fontSize: 12,
              color: '#1F1A14',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Mic dock */}
      <div
        style={{
          padding: '14px 18px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <button
          onClick={() => router.push('/session/demo/feedback')}
          style={{
            fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
            fontSize: 12,
            fontWeight: 600,
            color: '#5C5046',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Finalizar
        </button>

        <div
          style={{
            flex: 1,
            height: 56,
            borderRadius: 99,
            background: '#FFFCF6',
            border: '1px solid #E7DCC9',
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            overflow: 'hidden',
          }}
        >
          <Waveform active={recording} />
        </div>

        <button
          onClick={turn >= 2 ? () => router.push('/session/demo/feedback') : handleMic}
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: recording ? '#1F1A14' : turn >= 2 ? '#5E7A4F' : '#C8553D',
            border: 'none',
            cursor: 'pointer',
            color: '#FFF8EC',
            boxShadow: '0 6px 16px #C8553D44',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {recording ? (
            <div style={{ width: 16, height: 16, background: '#FFF8EC', borderRadius: 3 }} />
          ) : turn >= 2 ? (
            <span style={{ fontSize: 18 }}>&rarr;</span>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
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
      </div>
    </div>
  );
}
