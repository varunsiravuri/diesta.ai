export interface APIConfig{
    apiKey: string;
    baseUrl: string;
    model? : string;
}

export interface ChatResponse{
    content: string;
    provider: string;
    usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number; 
  };

}export interface ChatRequest{
    message: string;
    provider: string;
    ConversationHistory?: Array<
    {
        role: "user" | "assistant";
        content: string;

    }>;
}