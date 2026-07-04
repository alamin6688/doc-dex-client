"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarLinkItemProps {
  href: string;
  label: string;
}

export default function NavbarLinkItem({ href, label }: NavbarLinkItemProps) {
  const pathname = usePathname();
  const isAiChat = href === "#ai-chat";
  const isActive = pathname === href || (pathname.startsWith(href) && href !== "/");

  const handleClick = (e: React.MouseEvent) => {
    if (isAiChat) {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("open-medical-chatbot"));
    }
  };

  return (
    <Link
      href={href}
      prefetch={true}
      onClick={handleClick}
      className={`relative transition-all duration-200 select-none block hover:cursor-pointer rounded-xl px-3.5 py-2 text-xs font-bold ${
        isActive
          ? "text-[#4F46E5] bg-[#ECEEFD] font-extrabold"
          : "text-slate-650 hover:text-slate-900 hover:bg-slate-50"
      }`}
    >
      {label}
    </Link>
  );
}
