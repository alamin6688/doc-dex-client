"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

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
      className={`relative transition-colors duration-150 select-none block hover:cursor-pointer pb-2 pt-2 text-sm ${
        isActive
          ? "text-[#4F46E5] dark:text-[#818CF8] font-extrabold"
          : "text-slate-600 hover:text-[#4F46E5] dark:text-slate-350 dark:hover:text-white font-semibold"
      }`}
    >
      <span>{label}</span>
      {isActive && (
        <motion.div
          layoutId="activeNavbarIndicator"
          className="absolute bottom-0 left-0.5 right-0.5 h-[3px] bg-[#4F46E5] dark:bg-[#818CF8] rounded-full"
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
        />
      )}
    </Link>
  );
}
