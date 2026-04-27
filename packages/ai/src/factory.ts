import { DeepgramSTTProvider } from './providers/deepgram-stt';
import { ClaudeLLMProvider } from './providers/claude-llm';
import { OpenAITTSProvider } from './providers/openai-tts';
import { VoicePipeline } from './pipeline';
import type { STTProvider, LLMProvider, TTSProvider } from './interfaces';

export interface AIConfig {
  deepgramApiKey?: string;
  anthropicApiKey?: string;
  openaiApiKey?: string;
}

export function createProviders(config: AIConfig): {
  stt: STTProvider | null;
  llm: LLMProvider | null;
  tts: TTSProvider | null;
} {
  return {
    stt: config.deepgramApiKey ? new DeepgramSTTProvider(config.deepgramApiKey) : null,
    llm: config.anthropicApiKey ? new ClaudeLLMProvider(config.anthropicApiKey) : null,
    tts: config.openaiApiKey ? new OpenAITTSProvider(config.openaiApiKey) : null,
  };
}

export function createPipeline(config: AIConfig): VoicePipeline | null {
  const providers = createProviders(config);
  if (!providers.stt || !providers.llm || !providers.tts) return null;
  return new VoicePipeline(providers.stt, providers.llm, providers.tts);
}
