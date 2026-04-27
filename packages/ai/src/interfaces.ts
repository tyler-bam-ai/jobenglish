export interface STTConfig {
  language?: string;
  model?: string;
  sampleRate?: number;
  endpointing?: number;
}

export interface TranscriptChunk {
  text: string;
  isFinal: boolean;
  speechFinal: boolean;
  confidence: number;
  words?: { word: string; start: number; end: number; confidence: number }[];
}

export interface STTStream {
  write(audio: Buffer): void;
  on(event: 'transcript', handler: (chunk: TranscriptChunk) => void): this;
  on(event: 'error', handler: (error: Error) => void): this;
  on(event: 'close', handler: () => void): this;
  close(): void;
}

export interface STTProvider {
  createStream(config?: STTConfig): Promise<STTStream>;
}

export interface LLMConfig {
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface LLMProvider {
  chat(messages: ChatMessage[], config?: LLMConfig): AsyncIterable<string>;
}

export interface TTSConfig {
  voice?: string;
  speed?: number;
  model?: string;
  format?: 'mp3' | 'opus' | 'aac' | 'flac' | 'pcm';
}

export interface TTSProvider {
  synthesize(text: string, config?: TTSConfig): Promise<Buffer>;
  synthesizeStream(text: string, config?: TTSConfig): AsyncIterable<Buffer>;
}
