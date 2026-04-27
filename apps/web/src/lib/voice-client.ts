// ─── Browser Speech Recognition (STT) ───
export function createSpeechRecognition(): any {
  if (typeof window === 'undefined') return null;
  const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SR) return null;
  const recognition = new SR();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  recognition.maxAlternatives = 1;
  return recognition;
}

// ─── TTS: use high-quality browser voices ───
export function speakWithAI(text: string, onEnd?: () => void): void {
  speak(text, onEnd);
}

export function speak(text: string, onEnd?: () => void): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    onEnd?.();
    return;
  }
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.95;
  utterance.pitch = 1.05;

  // Pick the best available voice
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(
    (v) =>
      v.lang.startsWith('en') &&
      (v.name.includes('Samantha') ||
        v.name.includes('Karen') ||
        v.name.includes('Google US') ||
        v.name.includes('Natural') ||
        v.name.includes('Premium'))
  ) || voices.find((v) => v.lang.startsWith('en-'));

  if (preferred) utterance.voice = preferred;
  if (onEnd) utterance.onend = onEnd;
  utterance.onerror = () => onEnd?.();

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if (typeof window === 'undefined') return;
  window.speechSynthesis?.cancel();
}
