import type { STTProvider, LLMProvider, TTSProvider, ChatMessage } from './interfaces';

export interface SessionContext {
  scenarioSystemPrompt: string;
  conversationHistory: ChatMessage[];
  userLevel: string;
  userGoal: string;
}

export interface PipelineEvent {
  type: 'transcript' | 'ai_text' | 'ai_audio' | 'turn_end' | 'error';
  text?: string;
  audio?: Buffer;
  isFinal?: boolean;
  error?: Error;
}

export class VoicePipeline {
  constructor(
    private stt: STTProvider,
    private llm: LLMProvider,
    private tts: TTSProvider,
  ) {}

  async *processUserTurn(
    transcript: string,
    context: SessionContext,
  ): AsyncIterable<PipelineEvent> {
    context.conversationHistory.push({ role: 'user', content: transcript });

    const messages: ChatMessage[] = [
      { role: 'system', content: context.scenarioSystemPrompt },
      ...context.conversationHistory,
    ];

    let fullResponse = '';
    let sentenceBuffer = '';

    for await (const chunk of this.llm.chat(messages)) {
      fullResponse += chunk;
      sentenceBuffer += chunk;

      yield { type: 'ai_text', text: chunk };

      const sentenceEnd = sentenceBuffer.match(/[.!?]\s/);
      if (sentenceEnd) {
        const sentence = sentenceBuffer.substring(0, sentenceEnd.index! + 1);
        sentenceBuffer = sentenceBuffer.substring(sentenceEnd.index! + 2);

        try {
          const audio = await this.tts.synthesize(sentence.trim());
          yield { type: 'ai_audio', audio };
        } catch (err) {
          yield { type: 'error', error: err instanceof Error ? err : new Error(String(err)) };
        }
      }
    }

    if (sentenceBuffer.trim()) {
      try {
        const audio = await this.tts.synthesize(sentenceBuffer.trim());
        yield { type: 'ai_audio', audio };
      } catch (err) {
        yield { type: 'error', error: err instanceof Error ? err : new Error(String(err)) };
      }
    }

    context.conversationHistory.push({ role: 'assistant', content: fullResponse });
    yield { type: 'turn_end', text: fullResponse };
  }

  async createSTTStream() {
    return this.stt.createStream();
  }
}
