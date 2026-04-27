import { createClient, LiveTranscriptionEvents } from '@deepgram/sdk';
import { EventEmitter } from 'events';
import type { STTProvider, STTStream, STTConfig, TranscriptChunk } from '../interfaces';

export class DeepgramSTTProvider implements STTProvider {
  private client;

  constructor(apiKey: string) {
    this.client = createClient(apiKey);
  }

  async createStream(config?: STTConfig): Promise<STTStream> {
    const connection = this.client.listen.live({
      model: config?.model ?? 'nova-3',
      language: config?.language ?? 'en',
      smart_format: true,
      endpointing: config?.endpointing ?? 1000,
      interim_results: true,
      utterance_end_ms: 1500,
      sample_rate: config?.sampleRate ?? 16000,
      encoding: 'opus',
    });

    const emitter = new EventEmitter();

    connection.on(LiveTranscriptionEvents.Transcript, (data: any) => {
      const alt = data.channel?.alternatives?.[0];
      if (!alt) return;
      const chunk: TranscriptChunk = {
        text: alt.transcript || '',
        isFinal: data.is_final ?? false,
        speechFinal: data.speech_final ?? false,
        confidence: alt.confidence ?? 0,
        words: alt.words?.map((w: any) => ({
          word: w.word,
          start: w.start,
          end: w.end,
          confidence: w.confidence,
        })),
      };
      emitter.emit('transcript', chunk);
    });

    connection.on(LiveTranscriptionEvents.Error, (err: any) => {
      emitter.emit('error', err instanceof Error ? err : new Error(String(err)));
    });

    connection.on(LiveTranscriptionEvents.Close, () => {
      emitter.emit('close');
    });

    return {
      write(audio: Buffer) {
        connection.send(audio);
      },
      on(event: string, handler: (...args: any[]) => void) {
        emitter.on(event, handler);
        return this;
      },
      close() {
        connection.finish();
      },
    };
  }
}
