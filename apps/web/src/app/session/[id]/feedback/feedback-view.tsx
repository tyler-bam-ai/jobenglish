'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useLang, t } from '@/lib/i18n';
import { generateFeedback } from '@/lib/ai-client';
import { recordSession } from '@/lib/user-stats';
import { RadarChart } from '@/components/feedback/radar-chart';
import { CorrectionCard } from '@/components/feedback/correction-card';
import { Btn } from '@/components/ui/button';
import { Tag } from '@/components/ui/tag';
import { Sun } from '@/components/ui/sun';

interface FeedbackData {
  overallScore: number;
  cefrEstimate: string;
  scores: Record<string, number>;
  corrections: { original: string; better: string; whyPt: string }[];
  strengthsPt: string[];
  improvementsPt: string[];
  summaryPt: string;
}

export default function FeedbackView() {
  const router = useRouter();
  const params = useParams();
  const scenarioId = params.id as string;
  const { lang } = useLang();

  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sessionData, setSessionData] = useState<{
    scenarioTitle: string;
    aiRole: string;
    turns: { speaker: string; text: string }[];
  } | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('lastSession');
    if (!raw) {
      setLoading(false);
      setError('No session data found. Complete a roleplay first.');
      return;
    }

    const data = JSON.parse(raw);
    setSessionData(data);

    generateFeedback(data.turns, data.scenarioTitle)
      .then((fb) => {
        setFeedback(fb);
        setLoading(false);

        // Record the session in persistent stats
        const startTime = parseInt(sessionStorage.getItem('sessionStartTime') || '0', 10);
        const duration = startTime ? Math.round((Date.now() - startTime) / 1000) : 300;
        recordSession(
          duration,
          {
            fluency: fb.scores.fluency || 0,
            grammar: fb.scores.grammar || 0,
            vocabulary: fb.scores.vocabulary || 0,
            clarity: fb.scores.clarity || 0,
            pronunciation: fb.scores.pronunciation || 0,
          },
          fb.cefrEstimate,
          scenarioId,
        );
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#F7F1E8', gap: 16 }}>
        <div style={{ width: 48, height: 48, border: '3px solid #E7DCC9', borderTopColor: '#C8553D', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 14, color: '#5C5046' }}>
          {lang === 'pt' ? 'Analisando sua sessão...' : 'Analyzing your session...'}
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error || !feedback) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#F7F1E8', padding: 24, gap: 16 }}>
        <p style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 14, color: '#C8553D', textAlign: 'center' }}>
          {error || 'Could not generate feedback'}
        </p>
        <Btn variant="accent" onClick={() => router.push('/scenarios')}>
          {lang === 'pt' ? 'Voltar aos cenários' : 'Back to scenarios'}
        </Btn>
      </div>
    );
  }

  const skills = [
    { k: t.fluency[lang], v: feedback.scores.fluency || 0 },
    { k: t.grammar[lang], v: feedback.scores.grammar || 0 },
    { k: t.vocabulary[lang], v: feedback.scores.vocabulary || 0 },
    { k: t.clarity[lang], v: feedback.scores.clarity || 0 },
    { k: t.pronunciation[lang], v: feedback.scores.pronunciation || 0 },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F7F1E8', overflow: 'auto' }}>
      {/* Hero */}
      <div style={{ padding: '14px 22px 22px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -50, right: -50, opacity: 0.7 }}>
          <Sun size={180} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          <button onClick={() => router.push('/dashboard')} style={{ background: '#FFFCF6', border: '1px solid #E7DCC9', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', fontSize: 14, color: '#1F1A14' }}>
            &times;
          </button>
          <Tag color="#5E7A4F">{t.sessionComplete[lang]}</Tag>
          <div style={{ width: 36 }} />
        </div>

        <div style={{ marginTop: 16, position: 'relative' }}>
          <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: '#8A7C6E', letterSpacing: 2 }}>
            {t.feedbackSectionLabel[lang]}
          </div>
          <h2 style={{ fontFamily: "var(--font-display), serif", fontWeight: 500, fontSize: 26, lineHeight: 1.05, margin: '6px 0 12px', color: '#1F1A14', letterSpacing: -0.6 }}>
            {feedback.summaryPt ? feedback.summaryPt.split('.')[0] + '.' : t.feedbackTitle1[lang]}
          </h2>
        </div>

        {/* Score */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18, padding: '12px 16px', background: '#1F1A14', borderRadius: 18, color: '#FFF8EC' }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 9, color: '#E8A23A', letterSpacing: 1.5 }}>
              {t.overallScore[lang]}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 2 }}>
              <span style={{ fontFamily: "var(--font-display), serif", fontSize: 56, fontWeight: 500, lineHeight: 1, letterSpacing: -2 }}>{feedback.overallScore}</span>
              <span style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 14, color: '#FFF8EC99' }}>/100</span>
            </div>
          </div>
          <div style={{ flex: 1, paddingBottom: 8 }}>
            <div style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 11, color: '#FFF8EC99', padding: '4px 8px', background: '#FFF8EC15', borderRadius: 4, display: 'inline-block', marginBottom: 6 }}>
              CEFR: {feedback.cefrEstimate}
            </div>
            <div style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 12, color: '#FFF8EC', lineHeight: 1.4 }}>
              {feedback.summaryPt}
            </div>
          </div>
        </div>
      </div>

      {/* Radar */}
      <div style={{ padding: '0 22px' }}>
        <div style={{ padding: '14px 16px', borderRadius: 18, background: '#FFFCF6', border: '1px solid #E7DCC9', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 6 }}>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, color: '#8A7C6E', letterSpacing: 1.5 }}>
              {t.skills[lang]}
            </span>
            <span style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 11, color: '#8A7C6E' }}>{t.thisSession[lang]}</span>
          </div>
          <RadarChart skills={skills} />
        </div>
      </div>

      {/* Corrections */}
      {feedback.corrections.length > 0 && (
        <div style={{ padding: '16px 22px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, color: '#8A7C6E', letterSpacing: 1.5 }}>
              {t.corrections[lang]}
            </span>
          </div>
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {feedback.corrections.map((c, i) => (
              <CorrectionCard key={i} index={i} you={c.original} better={c.better} why={c.whyPt} />
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div style={{ padding: '14px 22px 0' }}>
        <div style={{ padding: '10px 12px', borderRadius: 10, background: '#F1E8D9', border: '1px dashed #8A7C6E55', fontFamily: "var(--font-body), sans-serif", fontSize: 11, color: '#5C5046', lineHeight: 1.4 }}>
          <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 9, color: '#8A7C6E', letterSpacing: 1 }}>{t.disclaimerLabel[lang]}</span>
          {t.disclaimer[lang]}
        </div>
      </div>

      {/* CTAs */}
      <div style={{ padding: '16px 22px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Btn variant="accent" onClick={() => router.push(`/session/${scenarioId}`)}>
          {t.retry[lang]}
        </Btn>
        <Btn variant="ghost" onClick={() => router.push('/scenarios')}>
          {lang === 'pt' ? 'Outros cenários' : 'Other scenarios'}
        </Btn>
      </div>
    </div>
  );
}
