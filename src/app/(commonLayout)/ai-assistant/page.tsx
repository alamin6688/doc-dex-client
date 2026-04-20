"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Stethoscope, AlertTriangle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { Badge } from "@/components/ui/badge"; // Removed unused import
import { ChatMessage, sendChatMessage } from "@/services/chat/chat.service";

/**
 * Dedicated AI Assistant page for an immersive medical consultation experience.
 * This page is now inside (commonLayout) to inherit the PublicNavbar.
 */
export default function AIAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("docdex_ai_history");
    if (savedHistory) {
      try {
        setMessages(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse chat history");
        setMessages([
          {
            role: "assistant",
            content: "Hello! I am your DocDex AI Consultant. How can I help you with your health concerns today?",
          },
        ]);
      }
    } else {
      setMessages([
        {
          role: "assistant",
          content: "Hello! I am your DocDex AI Consultant. How can I help you with your health concerns today?",
        },
      ]);
    }
  }, []);

  // Save to localStorage when messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("docdex_ai_history", JSON.stringify(messages));
    }
  }, [messages]);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages, isLoading]);

  const renderContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      // Bold text handling
      const parts = line.split(/\*\*(.*?)\*\*/g);
      const content = parts.map((part, j) =>
        j % 2 === 1 ? (
          <strong key={j} className="font-bold text-primary-dark">
            {part}
          </strong>
        ) : (
          part
        )
      );

      // Simple list detection
      const isListItem = /^\d+\.\s/.test(line) || /^[-*]\s/.test(line);

      return (
        <div
          key={i}
          className={`${
            isListItem ? "ml-4 mb-1 pl-2 border-l-2 border-gray-100" : "mb-2"
          }`}
        >
          {content}
        </div>
      );
    });
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setError(null);
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await sendChatMessage(userMessage, messages);
      if (response.success && response.data?.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: response.data!.reply }]);
      } else {
        setError(response.message || "I'm having trouble connecting right now.");
      }
    } catch (err) {
      setError("Connection failed. Please check your network.");
    } finally {
      setIsLoading(false);
    }
  };

  // Lock body scroll on this page
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const clearHistory = () => {
    const defaultMsg: ChatMessage[] = [
      {
        role: "assistant",
        content: "Hello! I am your DocDex AI Consultant. How can I help you with your health concerns today?",
      },
    ];
    setMessages(defaultMsg);
    localStorage.removeItem("docdex_ai_history");
  };

  return (
    <div className="w-full h-[calc(100vh-64px)] flex flex-col bg-gray-50/30 overflow-hidden">
      <div className="flex-1 flex flex-col min-h-0 p-2 sm:p-4">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row gap-6 flex-1 min-h-0">
          
          {/* Sidebar Info - Hidden on smaller screens */}
          <div className="hidden lg:flex w-80 flex-col gap-4 overflow-y-auto pr-2 shrink-0">
            <Card className="border-blue-100 bg-blue-50/30 shadow-sm shrink-0">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 text-blue-700">
                  <ShieldCheck className="w-5 h-5 font-bold" />
                  <CardTitle className="text-lg font-bold">Security</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-xs text-blue-800/80 space-y-2">
                <p>• Conversations are encrypted.</p>
                <p>• AI suggestions only.</p>
                <p>• Not a diagnosis tool.</p>
              </CardContent>
            </Card>

            <Card className="border-amber-100 bg-amber-50/50 shadow-sm shrink-0">
              <CardHeader className="pb-3 text-amber-700">
                <div className="flex items-center gap-2 font-bold text-amber-800">
                  <AlertTriangle className="w-5 h-5" />
                  <CardTitle className="text-lg">Emergency</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-xs text-amber-900/80">
                If you are experiencing severe chest pain, call emergency services immediately.
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Area */}
          <Card className="flex-1 flex flex-col shadow-2xl overflow-hidden border-none ring-1 ring-gray-200 min-h-0 bg-white">
            <CardHeader className="bg-primary text-primary-foreground py-3 flex flex-row items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full border border-white/30">
                  <Stethoscope className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold tracking-tight">DocDex AI Assistant</CardTitle>
                  <div className="flex items-center gap-1.5 text-[10px] text-white/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Online & Ready
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearHistory}
                  className="text-white/70 hover:text-white hover:bg-white/10 text-xs h-8"
                >
                  Clear Chat
                </Button>
              </div>
            </CardHeader>

          <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            <div className="space-y-6 max-w-3xl mx-auto py-4">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-3 max-w-[90%] md:max-w-[80%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`mt-1 h-9 w-9 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                      m.role === "user" ? "bg-blue-600 shadow-blue-200" : "bg-primary shadow-emerald-200"
                    }`}>
                      {m.role === "user" ? <User className="w-5 h-5 text-white" /> : <Stethoscope className="w-5 h-5 text-white" />}
                    </div>
                    <div className={`rounded-2xl px-5 py-3 text-sm shadow-sm leading-relaxed ${
                      m.role === "user" 
                        ? "bg-blue-600 text-white rounded-tr-none" 
                        : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                    }`}>
                      {renderContent(m.content)}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 flex gap-1 items-center border border-gray-100 shadow-sm">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-duration:1s]" />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s] [animation-duration:1s]" />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s] [animation-duration:1s]" />
                    </div>
                  </div>
                </div>
              )}
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs text-center border border-red-100 shadow-sm flex items-center justify-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  {error}
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </div>

          <CardContent className="p-4 bg-white border-t shrink-0">
            <form onSubmit={handleSend} className="max-w-3xl mx-auto flex gap-3">
              <Input
                placeholder="Describe your symptoms (e.g. 'I have a sore throat and fever')..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1 rounded-full px-6 py-6 border-gray-200 focus-visible:ring-primary shadow-sm h-12"
              />
              <Button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="rounded-full w-12 h-12 p-0 bg-primary hover:bg-primary/90 shadow-lg shrink-0 transition-transform active:scale-95"
              >
                <Send className="w-5 h-5" />
              </Button>
            </form>
            <p className="text-[10px] text-center text-gray-400 mt-3 font-medium">
              Powered by DocDex Medical AI · Encrypted & Confidential
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
  );
}
