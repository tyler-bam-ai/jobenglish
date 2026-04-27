'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Waveform } from '@/components/ui/waveform';
import { useLang, t } from '@/lib/i18n';
import { chatCompletionStream, chatCompletion } from '@/lib/ai-client';
import { createSpeechRecognition, speakWithAI, stopSpeaking } from '@/lib/voice-client';
import { getScenario } from '@/lib/scenarios';

interface Turn {
  speaker: 'ai' | 'user';
  text: string;
}

export default function SessionView() {
  const router = useRouter();
  const params = useParams();
  const scenarioId = params.id as string;
  const { lang } = useLang();

  const scenario = getScenario(scenarioId);

  const [turns, setTurns] = useState<Turn[]>([]);
  const [recording, setRecording] = useState(false);
  const [recTime, setRecTime] = useState(0);
  const [aiThinking, setAiThinking] = useState(false);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [error, setError] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const chatRef = useRef<Turn[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Keep chatRef in sync
  useEffect(() => {
    chatRef.current = turns;
  }, [turns]);

  // Auto-scroll on new turns
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [turns, interimText, aiThinking]);

  // Start session — get AI's opening message
  useEffect(() => {
    if (!scenario || turns.length > 0) return;
    getAIResponse([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenario]);

  // Recording timer
  useEffect(() => {
    if (recording) {
      timerRef.current = setInterval(() => setRecTime((t) => t + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [recording]);

  const getAIResponse = useCallback(
    async (currentTurns: Turn[]) => {
      if (!scenario) return;
      setAiThinking(true);
      setError('');

      const messages = [
        { role: 'system' as const, content: scenario.systemPrompt },
        ...currentTurns.map((t) => ({
          role: (t.speaker === 'ai' ? 'assistant' : 'user') as 'assistant' | 'user',
          content: t.text,
        })),
      ];

      try {
        let aiText = '';
        const newTurn: Turn = { speaker: 'ai', text: '' };
        setTurns((prev) => [...prev, newTurn]);

        for await (const chunk of chatCompletionStream(messages)) {
          aiText += chunk;
          setTurns((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { speaker: 'ai', text: aiText };
            return updated;
          });
        }

        // Clean up any thinking tags from the response
        const cleanText = aiText.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
        if (cleanText !== aiText) {
          setTurns((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { speaker: 'ai', text: cleanText };
            return updated;
          });
          aiText = cleanText;
        }

        setAiThinking(false);

        // Speak the response
        if (aiText) {
          setAiSpeaking(true);
          await speakWithAI(aiText, () => setAiSpeaking(false));
        }
      } catch (err) {
        setAiThinking(false);
        setError(err instanceof Error ? err.message : 'AI error');
      }
    },
    [scenario]
  );

  const startRecording = useCallback(() => {
    stopSpeaking();
    setAiSpeaking(false);
    setInterimText('');
    setRecTime(0);

    const recognition = createSpeechRecognition();
    if (!recognition) {
      setError('Speech recognition not supported. Try Chrome or Edge.');
      return;
    }

    recognitionRef.current = recognition;
    let finalTranscript = '';

    recognition.onresult = (event: any) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript + ' ';
        } else {
          interim += result[0].transcript;
        }
      }
      setInterimText(finalTranscript + interim);
    };

    recognition.onend = () => {
      const text = finalTranscript.trim();
      setRecording(false);
      setInterimText('');

      if (text) {
        const userTurn: Turn = { speaker: 'user', text };
        setTurns((prev) => {
          const updated = [...prev, userTurn];
          // Trigger AI response with the new turns
          setTimeout(() => getAIResponse(updated), 100);
          return updated;
        });
      }
    };

    recognition.onerror = (event: any) => {
      if (event.error !== 'aborted') {
        setError(`Speech error: ${event.error}`);
      }
      setRecording(false);
      setInterimText('');
    };

    recognition.start();
    setRecording(true);
  }, [getAIResponse]);

  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  const handleMic = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleFinish = () => {
    stopSpeaking();
    recognitionRef.current?.stop();
    // Store turns for feedback page
    sessionStorage.setItem(
      'lastSession',
      JSON.stringify({
        scenarioId,
        scenarioTitle: scenario?.title,
        aiRole: scenario?.aiRole,
        turns,
      })
    );
    router.push(`/session/${scenarioId}/feedback`);
  };

  if (!scenario) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F7F1E8' }}>
        <p>Scenario not found</p>
      </div>
    );
  }

  const turnCount = turns.filter((t) => t.speaker === 'user').length;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F1E8D9' }}>
      {/* Header */}
      <div style={{ padding: '12px 18px', background: '#1F1A14', color: '#FFF8EC', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={handleFinish}
          style={{ background: '#FFF8EC15', border: 'none', color: '#FFF8EC', width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          &times;
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace", fontSize: 9, letterSpacing: 1.5, color: '#E8A23A' }}>
            {aiSpeaking ? t.speaking[lang] : aiThinking ? t.thinking[lang] : `● ${t.liveRoleplay[lang]}`}
          </div>
          <div style={{ fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif", fontSize: 13, fontWeight: 600, marginTop: 2 }}>
            {scenario.aiRole}
          </div>
        </div>
        <div style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace", fontSize: 11, padding: '4px 10px', background: '#FFF8EC15', borderRadius: 99 }}>
          {turnCount}/5
        </div>
      </div>

      {/* Scenario context */}
      <div style={{ padding: '8px 18px', background: '#F1E8D9', fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace", fontSize: 10, color: '#5C5046', letterSpacing: 1, borderBottom: '1px solid #E7DCC9' }}>
        SCENARIO · {scenario.title.toUpperCase()} · {scenario.estimatedMinutes} MIN
      </div>

      {/* Conversation */}
      <div ref={scrollRef} style={{ flex: 1, overflow: 'auto', padding: '18px 18px 12px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {turns.map((turn, i) =>
          turn.speaker === 'ai' ? (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, background: '#1F3147', color: '#FFF8EC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "var(--font-display), serif", fontSize: 16, fontWeight: 600 }}>
                {scenario.aiRole[0]}
              </div>
              <div style={{ background: '#FFFCF6', padding: '12px 14px', borderRadius: '4px 16px 16px 16px', border: '1px solid #E7DCC9', maxWidth: '80%', fontFamily: "var(--font-body), sans-serif" }}>
                <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 9, color: '#8A7C6E', letterSpacing: 1, marginBottom: 4 }}>
                  {aiThinking && i === turns.length - 1 && !turn.text ? '● thinking...' : 'EN'}
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.4, color: '#1F1A14' }}>
                  {turn.text || '...'}
                </div>
              </div>
            </div>
          ) : (
            <div key={i} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ background: '#C8553D', color: '#FFF8EC', padding: '12px 14px', borderRadius: '16px 4px 16px 16px', maxWidth: '80%', fontFamily: "var(--font-body), sans-serif" }}>
                <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 9, color: '#FFF8EC99', letterSpacing: 1, marginBottom: 4 }}>{t.you[lang]}</div>
                <div style={{ fontSize: 14, lineHeight: 1.4 }}>&ldquo;{turn.text}&rdquo;</div>
              </div>
            </div>
          )
        )}

        {/* Interim (live transcription) */}
        {recording && interimText && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ background: '#FFFCF6', border: '1.5px dashed #C8553D', padding: '12px 16px', borderRadius: '16px 4px 16px 16px', maxWidth: '80%', fontFamily: "var(--font-mono), monospace", fontSize: 12, color: '#C8553D' }}>
              {interimText}
            </div>
          </div>
        )}

        {recording && !interimText && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ background: '#FFFCF6', border: '1.5px dashed #C8553D', padding: '12px 16px', borderRadius: '16px 4px 16px 16px', fontFamily: "var(--font-mono), monospace", fontSize: 11, color: '#C8553D', letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#C8553D', animation: 'blink 1s infinite', display: 'inline-block' }} />
              {t.listening[lang]} {String(Math.floor(recTime / 60)).padStart(2, '0')}:{String(recTime % 60).padStart(2, '0')}
            </div>
          </div>
        )}

        {error && (
          <div style={{ padding: '10px 14px', background: '#C8553D15', border: '1px solid #C8553D33', borderRadius: 12, fontFamily: "var(--font-body), sans-serif", fontSize: 12, color: '#C8553D' }}>
            {error}
          </div>
        )}
      </div>

      {/* Helper chips */}
      <div style={{ padding: '8px 18px 0', display: 'flex', gap: 8, overflow: 'auto', scrollbarWidth: 'none' }}>
        {/* Repeat */}
        <button
          onClick={() => {
            const lastAi = [...turns].reverse().find((t) => t.speaker === 'ai');
            if (lastAi?.text) speakWithAI(lastAi.text);
          }}
          style={{ background: '#FFFCF6', border: '1px solid #E7DCC9', padding: '7px 12px', borderRadius: 99, fontFamily: "var(--font-body), sans-serif", fontSize: 12, color: '#1F1A14', whiteSpace: 'nowrap', cursor: 'pointer' }}
        >
          {t.repeat[lang]}
        </button>
        {/* Translate */}
        <button
          onClick={async () => {
            const lastAi = [...turns].reverse().find((t) => t.speaker === 'ai');
            if (!lastAi?.text) return;
            try {
              const translation = await chatCompletion([
                { role: 'system', content: 'Translate the following English text to Brazilian Portuguese. Return ONLY the translation, nothing else.' },
                { role: 'user', content: lastAi.text },
              ], { maxTokens: 200, temperature: 0.3 });
              const clean = translation.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
              setTurns((prev) => [...prev, { speaker: 'ai', text: `🇧🇷 ${clean}` }]);
            } catch {
              setError(t.translating[lang]);
            }
          }}
          style={{ background: '#FFFCF6', border: '1px solid #E7DCC9', padding: '7px 12px', borderRadius: 99, fontFamily: "var(--font-body), sans-serif", fontSize: 12, color: '#1F1A14', whiteSpace: 'nowrap', cursor: 'pointer' }}
        >
          {t.translate[lang]}
        </button>
        {/* Hint */}
        <button
          onClick={async () => {
            if (!scenario) return;
            const lastAi = [...turns].reverse().find((t) => t.speaker === 'ai');
            if (!lastAi?.text) return;
            try {
              const hint = await chatCompletion([
                { role: 'system', content: 'You are an English tutor helping a Brazilian professional. Given the AI interviewer\'s last message, suggest a short phrase (1-2 sentences) the learner could use to respond. Return ONLY the suggestion in English, nothing else.' },
                { role: 'user', content: `The interviewer said: "${lastAi.text}". Suggest a response phrase.` },
              ], { maxTokens: 100, temperature: 0.7 });
              const clean = hint.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
              setTurns((prev) => [...prev, { speaker: 'ai', text: `💡 Hint: ${clean}` }]);
            } catch {
              setError(t.hintLoading[lang]);
            }
          }}
          style={{ background: '#FFFCF6', border: '1px solid #E7DCC9', padding: '7px 12px', borderRadius: 99, fontFamily: "var(--font-body), sans-serif", fontSize: 12, color: '#1F1A14', whiteSpace: 'nowrap', cursor: 'pointer' }}
        >
          {t.hint[lang]}
        </button>
        {/* Slower */}
        <button
          onClick={() => {
            const lastAi = [...turns].reverse().find((t) => t.speaker === 'ai');
            if (!lastAi?.text) return;
            stopSpeaking();
            const utterance = new SpeechSynthesisUtterance(lastAi.text);
            utterance.lang = 'en-US';
            utterance.rate = 0.6;
            utterance.pitch = 1;
            window.speechSynthesis.speak(utterance);
          }}
          style={{ background: '#FFFCF6', border: '1px solid #E7DCC9', padding: '7px 12px', borderRadius: 99, fontFamily: "var(--font-body), sans-serif", fontSize: 12, color: '#1F1A14', whiteSpace: 'nowrap', cursor: 'pointer' }}
        >
          {t.slower[lang]}
        </button>
      </div>

      {/* Mic dock */}
      <div style={{ padding: '14px 18px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <button onClick={handleFinish} style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 12, fontWeight: 600, color: '#5C5046', background: 'transparent', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
          {t.finish[lang]}
        </button>

        <div style={{ flex: 1, height: 56, borderRadius: 99, background: '#FFFCF6', border: '1px solid #E7DCC9', display: 'flex', alignItems: 'center', padding: '0 16px', overflow: 'hidden' }}>
          <Waveform active={recording} />
        </div>

        <button
          onClick={handleMic}
          disabled={aiThinking || aiSpeaking}
          style={{
            width: 56, height: 56, borderRadius: '50%',
            background: recording ? '#1F1A14' : aiThinking || aiSpeaking ? '#8A7C6E' : '#C8553D',
            border: 'none', cursor: aiThinking || aiSpeaking ? 'wait' : 'pointer',
            color: '#FFF8EC', boxShadow: '0 6px 16px #C8553D44',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}
        >
          {recording ? (
            <div style={{ width: 16, height: 16, background: '#FFF8EC', borderRadius: 3 }} />
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="9" y="3" width="6" height="13" rx="3" fill="#FFF8EC" />
              <path d="M5 11a7 7 0 0014 0M12 18v3" stroke="#FFF8EC" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
