"use client";

import dynamic from "next/dynamic";

/**
 * Thin client-component wrapper so that `ssr: false` is valid.
 * `next/dynamic` with `ssr: false` must live inside a Client Component —
 * it cannot be called directly in a Server Component like the root layout.
 */
const MedicalChatbot = dynamic(
  () => import("@/components/shared/MedicalChatbot"),
  { ssr: false }
);

export default function ChatbotLoader() {
  return <MedicalChatbot />;
}
