import type { ChatRequest, ChatResponse, APIConfig } from "./types";

export class PerplexityService {
  private config: APIConfig;

  constructor(config: APIConfig) {
    this.config = config;
  }

  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify({
        model: this.config.model || "llama-3.1-sonar-large-128k-online",
        messages: [
          ...(request.ConversationHistory || []),
          { role: "user", content: request.message },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Perplexity API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    return {
      content: data.choices[0].message.content,
      provider: "perplexity",
      usage: data.usage
        ? {
            promptTokens: data.usage.prompt_tokens,
            completionTokens: data.usage.completion_tokens,
            totalTokens: data.usage.total_tokens,
          }
        : undefined,
    };
  }
}