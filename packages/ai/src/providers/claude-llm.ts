import Anthropic from '@anthropic-ai/sdk';
import type { LLMProvider, ChatMessage, LLMConfig } from '../interfaces';

export class ClaudeLLMProvider implements LLMProvider {
  private client: Anthropic;

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  async *chat(messages: ChatMessage[], config?: LLMConfig): AsyncIterable<string> {
    const systemMessage = messages.find(m => m.role === 'system');
    const chatMessages = messages
      .filter(m => m.role !== 'system')
      .map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }));

    const stream = this.client.messages.stream({
      model: config?.model ?? 'claude-sonnet-4-20250514',
      max_tokens: config?.maxTokens ?? 300,
      temperature: config?.temperature ?? 0.7,
      system: systemMessage?.content,
      messages: chatMessages,
    });

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        yield event.delta.text;
      }
    }
  }
}
