"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  /** Set to true when the background is light (default is dark) */
  light?: boolean;
}

export default function BackButton({ light = false }: BackButtonProps) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      aria-label="Go back"
      className={`absolute top-5 left-5 z-20 flex items-center justify-center w-10 h-10 rounded-2xl border backdrop-blur-sm transition-all duration-200 cursor-pointer shadow-md ${
        light
          ? "bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-600 hover:text-[#4F46E5] shadow-slate-200/60"
          : "bg-white/10 hover:bg-white/20 border-white/15 hover:border-white/30 text-white shadow-black/10"
      }`}
    >
      <ArrowLeft className="w-5 h-5" />
    </button>
  );
}
