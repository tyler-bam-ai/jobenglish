const XAI_API_KEY = process.env.NEXT_PUBLIC_XAI_API_KEY || '';

// Browser Speech Recognition (for STT - free, works in Chrome/Edge)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createSpeechRecognition(): any {
  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SpeechRecognition) return null;

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  recognition.maxAlternatives = 1;
  return recognition;
}

// Browser Speech Synthesis (for TTS - free, works everywhere)
export function speak(text: string, onEnd?: () => void): void {
  if (!window.speechSynthesis) return;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.9;
  utterance.pitch = 1;

  // Try to pick a natural English voice
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(
    (v) => v.lang.startsWith('en') && (v.name.includes('Samantha') || v.name.includes('Google') || v.name.includes('Natural'))
  );
  if (preferred) utterance.voice = preferred;

  if (onEnd) utterance.onend = onEnd;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  window.speechSynthesis?.cancel();
}

// xAI TTS via REST API (higher quality alternative)
export async function xaiTTS(text: string): Promise<ArrayBuffer | null> {
  if (!XAI_API_KEY) return null;

  try {
    const res = await fetch('https://api.x.ai/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${XAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'grok-3-mini-tts',
        input: text,
        voice: 'eve',
        response_format: 'mp3',
      }),
    });

    if (!res.ok) {
      console.warn('xAI TTS failed, falling back to browser TTS');
      return null;
    }

    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

// Play audio buffer
export function playAudioBuffer(buffer: ArrayBuffer, onEnd?: () => void): void {
  const blob = new Blob([buffer], { type: 'audio/mp3' });
  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);
  audio.onended = () => {
    URL.revokeObjectURL(url);
    onEnd?.();
  };
  audio.play().catch(() => {
    // Autoplay blocked, fall back
    onEnd?.();
  });
}

// Combined: try xAI TTS, fall back to browser TTS
export async function speakWithAI(text: string, onEnd?: () => void): Promise<void> {
  const audioBuffer = await xaiTTS(text);
  if (audioBuffer) {
    playAudioBuffer(audioBuffer, onEnd);
  } else {
    speak(text, onEnd);
  }
}
