"use client";

import { usePathname } from "next/navigation";
import { PublicFooter } from "@/components/shared/PublicFooter";

export default function ConditionalFooter() {
  const pathname = usePathname();
  const isAppLikePage = pathname === "/ai-assistant";

  if (isAppLikePage) return null;

  return <PublicFooter />;
}
