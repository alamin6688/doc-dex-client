"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  Bot,
  User,
  AlertTriangle,
  Stethoscope,
} from "lucide-react";
import { sendChatMessage, ChatMessage } from "@/services/chat/chat.service";
import { usePathname } from "next/navigation";

// ─── Constants ────────────────────────────────────────────────────────────────

const WELCOME_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "👋 Hi! I'm **DocDex AI**, your medical information assistant.\n\nI can help you understand symptoms, explain what a condition might mean, or guide you toward the right type of specialist — all in plain language.\n\n*I'm here to inform and support, not to replace your doctor.* What's on your mind today?",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Renders a single chat bubble with markdown-like bold support */
function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === "user";

  const renderContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      // Bold text handling
      const parts = line.split(/\*\*(.*?)\*\*/g);
      const content = parts.map((part, j) =>
        j % 2 === 1 ? <strong key={j} className="font-bold underline decoration-emerald-200 decoration-2 underline-offset-2">{part}</strong> : part
      );

      // Simple list/bullet detection
      const isListItem = /^\d+\.\s/.test(line) || /^[-*]\s/.test(line) || /^🚨/.test(line);

      return (
        <span key={i} className={`block ${isListItem ? "ml-3 mb-1" : "mb-2"}`}>
          {content}
        </span>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div
        className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white ${
          isUser ? "bg-primary" : "bg-emerald-600"
        }`}
      >
        {isUser ? <User size={14} /> : <Bot size={14} />}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-muted text-foreground rounded-bl-sm border border-border"
        }`}
      >
        {renderContent(msg.content)}
      </div>
    </motion.div>
  );
}

/** Animated "typing" indicator shown while waiting for the AI */
function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="shrink-0 w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white">
        <Bot size={14} />
      </div>
      <div className="bg-muted border border-border rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MedicalChatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Listen for external open triggers (e.g. from navbar)
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-medical-chatbot", handleOpen);
    return () => window.removeEventListener("open-medical-chatbot", handleOpen);
  }, []);

  // Focus the input whenever the panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  const handleSend = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    // Optimistically add the user message
    const userMessage: ChatMessage = { role: "user", content: trimmed };
    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);
    setInput("");
    setIsLoading(true);

    // Build history excluding the welcome message (it's not part of the real convo)
    const historyForApi = updatedHistory.filter(
      (m) => m.content !== WELCOME_MESSAGE.content
    );

    const response = await sendChatMessage(trimmed, historyForApi.slice(0, -1));

    setIsLoading(false);

    if (response.success && response.data?.reply) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.data!.reply },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    }
  }, [input, isLoading, messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([WELCOME_MESSAGE]);
    setInput("");
  };

  if (pathname === "/ai-assistant") return null;

  return (
    <>
      {/* ── Chat Panel ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed bottom-24 right-5 z-50 w-[360px] max-w-[calc(100vw-2rem)] flex flex-col rounded-2xl shadow-2xl border border-border bg-background overflow-hidden"
            style={{ height: "520px" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-emerald-700 text-white shrink-0">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Stethoscope size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm leading-none">DocDex AI</p>
                <p className="text-xs text-emerald-100 mt-0.5">
                  Medical Information Assistant
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  title="Start new conversation"
                  className="p-1.5 rounded-lg hover:bg-white/20 transition-colors text-xs text-emerald-100"
                >
                  New chat
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                  aria-label="Close chat"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Disclaimer banner */}
            <div className="flex items-start gap-2 px-3 py-2 bg-amber-50 border-b border-amber-200 text-amber-800 text-xs shrink-0">
              <AlertTriangle size={12} className="mt-0.5 shrink-0" />
              <span>
                For guidance only — not a substitute for professional medical
                advice.
              </span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 scroll-smooth">
              {messages.map((msg, i) => (
                <MessageBubble key={i} msg={msg} />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="px-3 py-2 border-t border-border bg-background shrink-0">
              <div className="flex items-end gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2">
                <textarea
                  ref={inputRef}
                  id="medical-chatbot-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe your symptoms or ask a health question…"
                  rows={1}
                  disabled={isLoading}
                  className="flex-1 bg-transparent resize-none outline-none text-sm text-foreground placeholder:text-muted-foreground disabled:opacity-50 max-h-28 leading-relaxed"
                  style={{ fieldSizing: "content" } as React.CSSProperties}
                />
                <button
                  id="medical-chatbot-send"
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="shrink-0 w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Send message"
                >
                  {isLoading ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Send size={14} />
                  )}
                </button>
              </div>
              <p className="text-[10px] text-muted-foreground text-center mt-1">
                Press <kbd className="font-mono">Enter</kbd> to send ·{" "}
                <kbd className="font-mono">Shift+Enter</kbd> for newline
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB (Floating Action Button) ───────────────────────────── */}
      <motion.button
        id="medical-chatbot-fab"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close AI health assistant" : "Open AI health assistant"}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-emerald-700 text-white shadow-lg flex items-center justify-center hover:bg-emerald-800 transition-colors"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unread dot when closed */}
        {!isOpen && (
          <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-amber-400 border-2 border-white" />
        )}
      </motion.button>
    </>
  );
}
