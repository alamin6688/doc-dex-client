/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  User,
  Stethoscope,
  AlertTriangle,
  ShieldCheck,
  Sparkles,
  MessageSquare,
  Trash2,
  Heart,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChatMessage, sendChatMessage } from "@/services/chat/chat.service";

const QUICK_PROMPTS = [
  {
    text: "Common symptoms of seasonal allergies",
    icon: Sparkles,
    label: "Allergies",
  },
  {
    text: "Explain what lipid profile values mean",
    icon: Cpu,
    label: "Lab Test",
  },
  {
    text: "General health tips for managing diabetes",
    icon: Heart,
    label: "Wellness",
  },
];

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
            content: "Hello! I am your DocDex AI Consultant. Describe your symptoms or medical questions, and I will assist you with clinically vetted guidelines.",
          },
        ]);
      }
    } else {
      setMessages([
        {
          role: "assistant",
          content: "Hello! I am your DocDex AI Consultant. Describe your symptoms or medical questions, and I will assist you with clinically vetted guidelines.",
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
          <strong key={j} className="font-extrabold text-[#4F46E5]">
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
            isListItem ? "ml-4 mb-1 pl-2 border-l-2 border-slate-100" : "mb-2"
          }`}
        >
          {content}
        </div>
      );
    });
  };

  const handleSend = async (e?: React.FormEvent, customMessage?: string) => {
    e?.preventDefault();
    const query = (customMessage || input).trim();
    if (!query || isLoading) return;

    setInput("");
    setError(null);
    setMessages((prev) => [...prev, { role: "user", content: query }]);
    setIsLoading(true);

    try {
      const response = await sendChatMessage(query, messages);
      if (response.success && response.data?.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: response.data!.reply }]);
      } else {
        setError(response.message || "I'm having trouble connecting to the servers.");
      }
    } catch (err) {
      setError("Connection failed. Please check your network.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    const defaultMsg: ChatMessage[] = [
      {
        role: "assistant",
        content: "Hello! I am your DocDex AI Consultant. Describe your symptoms or medical questions, and I will assist you with guidelines.",
      },
    ];
    setMessages(defaultMsg);
    localStorage.removeItem("docdex_ai_history");
  };

  // Lock body scroll on this page
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 110, damping: 16 },
    },
  } as const;

  return (
    <div className="w-full h-[calc(100vh-64px)] flex flex-col bg-[#F8F9FC] overflow-hidden relative font-sans">
      {/* Light background decorative ring */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/40 rounded-full blur-[100px] pointer-events-none z-0" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex-1 flex flex-col min-h-0 p-3 sm:p-6 max-w-7xl w-full mx-auto relative z-10"
      >
        <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
          
          {/* Left Sidebar (width 80) - Info & Quick Actions */}
          <div className="hidden lg:flex w-80 flex-col gap-5 overflow-y-auto pr-1 shrink-0 text-left">
            
            {/* AI Assistant specs card */}
            <motion.div variants={itemVariants}>
              <Card className="border-indigo-150/60 bg-linear-to-br from-white to-indigo-50/30 rounded-[24px] shadow-2xs">
                <CardHeader className="pb-3 flex flex-row items-center gap-3">
                  <div className="p-2.5 bg-indigo-50 rounded-xl text-[#4F46E5]">
                    <Cpu className="h-5 w-5 animate-pulse" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-black text-slate-900 tracking-tight">
                      A.I. Health Engine
                    </CardTitle>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
                      Vetted Consultant v2
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="text-xs font-semibold text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Response Speed</span>
                    <span className="text-[#4F46E5]">Instant</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Security Tag</span>
                    <span className="text-emerald-600 inline-flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5" /> Encrypted
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Prompts list */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-450 px-2 flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5 text-indigo-400" /> Suggested Prompts
              </h4>
              <div className="space-y-2.5">
                {QUICK_PROMPTS.map((prompt, idx) => {
                  const Icon = prompt.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSend(undefined, prompt.text)}
                      disabled={isLoading}
                      className="w-full p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-200 transition-all text-left shadow-2xs cursor-pointer group flex flex-col gap-2 hover:bg-indigo-50/5"
                    >
                      <div className="flex items-center justify-between">
                        <Badge className="bg-slate-50 text-slate-550 border-none rounded-md px-2 py-0.5 text-[9px] font-bold group-hover:bg-indigo-50 group-hover:text-indigo-650 transition-colors">
                          {prompt.label}
                        </Badge>
                        <Icon className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#4F46E5] transition-colors" />
                      </div>
                      <span className="text-xs font-semibold text-slate-700 leading-snug group-hover:text-slate-900 transition-colors">
                        {prompt.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Disclaimer Emergency Box */}
            <motion.div variants={itemVariants}>
              <Card className="border-amber-100 bg-amber-50/20 rounded-[24px] shadow-2xs">
                <CardContent className="p-5 space-y-2">
                  <div className="flex items-center gap-2 text-amber-700 font-extrabold text-xs">
                    <AlertTriangle className="h-4.5 w-4.5 shrink-0" />
                    <span>Emergency Disclaimer</span>
                  </div>
                  <p className="text-[10px] text-amber-900/80 leading-relaxed">
                    AI guidelines are only informational. If you suffer chest pain, deep breathing issues, or a cardiac alert, dial national emergency help lines immediately.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

          </div>

          {/* Right Main Chat Frame */}
          <motion.div
            variants={itemVariants}
            className="flex-1 flex flex-col rounded-[28px] border border-slate-200/80 shadow-sm overflow-hidden bg-white min-h-0"
          >
            {/* Header panel */}
            <div className="bg-white border-b border-slate-100 p-5 flex flex-row items-center justify-between shrink-0">
              <div className="flex items-center gap-3 text-left">
                <div className="bg-[#ECEEFD] p-3 rounded-2xl text-[#4F46E5]">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 tracking-tight">DocDex Clinical Assistant</h3>
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Secure Sandbox Active
                  </div>
                </div>
              </div>
              <div>
                <Button
                  onClick={clearHistory}
                  variant="outline"
                  size="sm"
                  className="rounded-xl border border-slate-200 text-slate-500 font-extrabold hover:text-rose-650 hover:bg-rose-50 hover:border-rose-100 transition-colors text-[10px] h-8 px-3 cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Clear Logs
                </Button>
              </div>
            </div>

            {/* Messages Scroll Section */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30 scrollbar-thin scrollbar-thumb-slate-200">
              <div className="space-y-6 max-w-3xl mx-auto py-2">
                <AnimatePresence initial={false}>
                  {messages.map((m, idx) => {
                    const isUser = m.role === "user";

                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`flex gap-3 max-w-[90%] md:max-w-[80%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
                          <div className={`mt-1 h-9 w-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs border ${
                            isUser ? "bg-[#4F46E5] border-indigo-500 text-white" : "bg-white border-slate-100 text-slate-600"
                          }`}>
                            {isUser ? <User className="w-4 h-4" /> : <Stethoscope className="w-4 h-4" />}
                          </div>
                          
                          <div className={`rounded-[22px] px-5 py-3.5 text-xs shadow-2xs text-left leading-relaxed ${
                            isUser 
                              ? "bg-[#4F46E5] text-white rounded-tr-none" 
                              : "bg-white text-slate-800 rounded-tl-none border border-slate-150/70"
                          }`}>
                            {renderContent(m.content)}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}

                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="flex gap-3">
                        <div className="h-9 w-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center shrink-0">
                          <Cpu className="w-4 h-4 text-indigo-500 animate-spin" />
                        </div>
                        <div className="bg-white border border-slate-150/70 rounded-2xl rounded-tl-none px-5 py-3.5 flex gap-1.5 items-center shadow-2xs">
                          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce animation-duration-[1s]" />
                          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s] animation-duration-[1s]" />
                          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s] animation-duration-[1s]" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {error && (
                  <div className="bg-rose-50 text-rose-650 p-4 rounded-2xl text-xs text-center border border-rose-100 shadow-2xs flex items-center justify-center gap-2 max-w-xl mx-auto animate-pulse">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            </div>

            {/* Input Actions Footer panel */}
            <div className="p-4 bg-white border-t border-slate-100 shrink-0">
              <form onSubmit={handleSend} className="max-w-3xl mx-auto flex gap-3">
                <Input
                  placeholder="Ask a question (e.g. 'explain what a high cholesterol value means')..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  className="flex-1  px-5 bg-slate-50/70 border-slate-100 text-slate-800 placeholder-slate-400 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500/50 rounded-xl py-4 h-11 text-xs"
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="rounded-2xl w-11 h-11 p-0 bg-[#4F46E5] hover:bg-[#4338CA] text-white shadow-md shadow-indigo-500/10 shrink-0 transition-transform active:scale-95 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
              <p className="text-[9px] text-center text-slate-400 mt-3 font-semibold uppercase tracking-wider">
                DocDex Secure Engine v2 · Confidential medical guidelines only
              </p>
            </div>

          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
