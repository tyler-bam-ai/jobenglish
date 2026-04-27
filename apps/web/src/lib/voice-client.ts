const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || '';

// ─── Browser Speech Recognition (STT) ───
export function createSpeechRecognition(): any {
  if (typeof window === 'undefined') return null;
  const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SR) return null;
  const recognition = new SR();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  recognition.maxAlternatives = 1;
  return recognition;
}

// ─── High-quality TTS via OpenRouter gpt-4o-audio ───
export async function speakWithAI(text: string, onEnd?: () => void): Promise<void> {
  try {
    const audioBuffer = await generateSpeech(text);
    if (audioBuffer) {
      playPCM16(audioBuffer, onEnd);
      return;
    }
  } catch (e) {
    console.warn('AI TTS failed, falling back to browser:', e);
  }
  speak(text, onEnd);
}

async function generateSpeech(text: string): Promise<ArrayBuffer | null> {
  if (!OPENROUTER_API_KEY) return null;

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : '',
      'X-Title': 'JobEnglish AI Brasil',
    },
    body: JSON.stringify({
      model: 'openai/gpt-4o-audio-preview',
      modalities: ['text', 'audio'],
      audio: { voice: 'nova', format: 'pcm16' },
      messages: [
        { role: 'system', content: 'You are a text-to-speech engine. Repeat the user text exactly as given. Do not add anything.' },
        { role: 'user', content: text },
      ],
      max_tokens: 500,
      stream: true,
    }),
  });

  if (!res.ok) return null;

  const reader = res.body?.getReader();
  if (!reader) return null;

  const decoder = new TextDecoder();
  let buffer = '';
  const audioChunks: string[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('data: ')) continue;
      const data = trimmed.slice(6);
      if (data === '[DONE]') break;

      try {
        const parsed = JSON.parse(data);
        const audioData = parsed.choices?.[0]?.delta?.audio?.data;
        if (audioData) audioChunks.push(audioData);
      } catch { /* skip */ }
    }
  }

  if (audioChunks.length === 0) return null;

  // Decode base64 chunks to a single PCM16 buffer
  const totalB64 = audioChunks.join('');
  const binaryString = atob(totalB64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

function playPCM16(pcmBuffer: ArrayBuffer, onEnd?: () => void) {
  const audioCtx = new AudioContext({ sampleRate: 24000 });
  const int16 = new Int16Array(pcmBuffer);
  const float32 = new Float32Array(int16.length);
  for (let i = 0; i < int16.length; i++) {
    float32[i] = int16[i] / 32768;
  }

  const audioBuffer = audioCtx.createBuffer(1, float32.length, 24000);
  audioBuffer.getChannelData(0).set(float32);

  const source = audioCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioCtx.destination);
  source.onended = () => {
    audioCtx.close();
    onEnd?.();
  };
  source.start();
}

// ─── Browser TTS fallback ───
export function speak(text: string, onEnd?: () => void): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    onEnd?.();
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.9;
  if (onEnd) utterance.onend = onEnd;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if (typeof window === 'undefined') return;
  window.speechSynthesis?.cancel();
}
