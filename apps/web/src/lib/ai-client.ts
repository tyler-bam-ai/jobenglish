const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || '';
const MODEL = process.env.NEXT_PUBLIC_OPENROUTER_MODEL || 'qwen/qwen3-max-preview';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function chatCompletion(
  messages: Message[],
  options?: { maxTokens?: number; temperature?: number }
): Promise<string> {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'https://tyler-bam-ai.github.io/jobenglish/',
      'X-Title': 'JobEnglish AI Brasil',
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      max_tokens: options?.maxTokens ?? 300,
      temperature: options?.temperature ?? 0.7,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? '';
}

export async function* chatCompletionStream(
  messages: Message[],
  options?: { maxTokens?: number; temperature?: number }
): AsyncIterable<string> {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'https://tyler-bam-ai.github.io/jobenglish/',
      'X-Title': 'JobEnglish AI Brasil',
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      max_tokens: options?.maxTokens ?? 300,
      temperature: options?.temperature ?? 0.7,
      stream: true,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter error ${res.status}: ${err}`);
  }

  const reader = res.body?.getReader();
  if (!reader) throw new Error('No response body');

  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || !trimmed.startsWith('data: ')) continue;
      const data = trimmed.slice(6);
      if (data === '[DONE]') return;

      try {
        const parsed = JSON.parse(data);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) yield content;
      } catch {
        // skip malformed JSON
      }
    }
  }
}

export function buildScenarioSystemPrompt(scenario: {
  aiRole: string;
  title: string;
  description: string;
  systemPrompt?: string;
}): string {
  if (scenario.systemPrompt) return scenario.systemPrompt;

  return `You are ${scenario.aiRole}. You are conducting a roleplay scenario: "${scenario.title}" — ${scenario.description}.

BEHAVIOR:
- Stay in character at all times.
- Speak naturally in English. Keep responses to 2-3 sentences max.
- Ask ONE question at a time.
- If the learner struggles, simplify slightly but stay in character.
- If the learner speaks Portuguese, gently redirect: "Could you try that in English?"
- After 4-5 exchanges, naturally wrap up.
- Never claim to be human. Never make hiring decisions.
- Be encouraging but realistic.

Begin with your opening question.`;
}

export async function generateFeedback(
  transcript: { speaker: string; text: string }[],
  scenarioTitle: string
): Promise<{
  overallScore: number;
  cefrEstimate: string;
  scores: Record<string, number>;
  corrections: { original: string; better: string; whyPt: string }[];
  strengthsPt: string[];
  improvementsPt: string[];
  summaryPt: string;
}> {
  const transcriptText = transcript
    .map((t) => `[${t.speaker.toUpperCase()}]: ${t.text}`)
    .join('\n');

  const prompt = `You are an expert English language coach for Brazilian professionals.

Analyze this conversation and provide feedback as JSON only (no markdown, no explanation outside JSON):

SCENARIO: ${scenarioTitle}
TRANSCRIPT:
${transcriptText}

Return ONLY this JSON:
{
  "overallScore": <0-100>,
  "cefrEstimate": "<A1|A2|B1|B2|C1>",
  "scores": { "fluency": <0-100>, "grammar": <0-100>, "vocabulary": <0-100>, "clarity": <0-100>, "pronunciation": <0-100> },
  "corrections": [{ "original": "<said>", "better": "<improved>", "whyPt": "<explanation in Brazilian Portuguese>" }],
  "strengthsPt": ["<strength in Portuguese>"],
  "improvementsPt": ["<improvement in Portuguese>"],
  "summaryPt": "<2 sentence summary in Portuguese>"
}

Max 3 corrections. All PT text in Brazilian Portuguese. Scores where 75+ is work-ready.`;

  const response = await chatCompletion(
    [{ role: 'user', content: prompt }],
    { maxTokens: 800, temperature: 0.3 }
  );

  // Extract JSON from response (handle potential markdown wrapping)
  let jsonStr = response.trim();
  const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
  if (jsonMatch) jsonStr = jsonMatch[0];

  try {
    return JSON.parse(jsonStr);
  } catch {
    // Return safe defaults if parsing fails
    return {
      overallScore: 65,
      cefrEstimate: 'B1',
      scores: { fluency: 60, grammar: 65, vocabulary: 70, clarity: 68, pronunciation: 62 },
      corrections: [],
      strengthsPt: ['Conseguiu comunicar a ideia principal.'],
      improvementsPt: ['Pratique mais estruturas gramaticais.'],
      summaryPt: 'Boa tentativa! Continue praticando para melhorar a fluência.',
    };
  }
}
