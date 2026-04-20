"use client";

import Link from "next/link";

interface NavbarLinkItemProps {
  href: string;
  label: string;
}

export default function NavbarLinkItem({ href, label }: NavbarLinkItemProps) {
  const isAiChat = href === "#ai-chat";

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
      className="hover:text-primary transition-colors text-gray-700 hover:cursor-pointer"
    >
      {label}
    </Link>
  );
}
