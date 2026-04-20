"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ChatResponse = {
  success: boolean;
  message: string;
  data: { reply: string } | null;
};

/**
 * Sends the current user message together with the conversation history to
 * the backend chat endpoint. The Anthropic API key never leaves the server.
 */
export async function sendChatMessage(
  message: string,
  history: ChatMessage[] = []
): Promise<ChatResponse> {
  try {
    const response = await serverFetch.post("/chat", {
      body: JSON.stringify({ message, history }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Chat server error (${response.status}):`, errorText);
      try {
        const errorJson = JSON.parse(errorText);
        return { success: false, message: errorJson.message || "Server Error", data: null };
      } catch (e) {
        return { success: false, message: `Server error: ${response.status}`, data: null };
      }
    }

    const result = await response.json();
    console.log("Chat result:", result);
    return result;
  } catch (error: any) {
    console.error("Chat fetch error:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? `Fetch Error: ${error.message}`
          : "Failed to reach the AI assistant. Please try again.",
      data: null,
    };
  }
}
