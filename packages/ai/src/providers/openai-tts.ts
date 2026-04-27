import OpenAI from 'openai';
import type { TTSProvider, TTSConfig } from '../interfaces';

export class OpenAITTSProvider implements TTSProvider {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async synthesize(text: string, config?: TTSConfig): Promise<Buffer> {
    const response = await this.client.audio.speech.create({
      model: config?.model ?? 'tts-1',
      voice: (config?.voice as any) ?? 'onyx',
      input: text,
      speed: config?.speed ?? 1.0,
      response_format: config?.format ?? 'opus',
    });

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  async *synthesizeStream(text: string, config?: TTSConfig): AsyncIterable<Buffer> {
    const buffer = await this.synthesize(text, config);
    yield buffer;
  }
}
