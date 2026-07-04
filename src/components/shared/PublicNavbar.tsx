import React from "react";
import Link from "next/link";
import { getCookie } from "@/services/auth/tokenHandlers";
import AISearchDialog from "./AISSearchDialog";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { getUserInfo } from "@/services/auth/getUserInfo";
import MobileMenu from "./MobileMenu";
import NavbarAuthButtons from "./NavbarAuthButtons";
import { Stethoscope } from "lucide-react";
import NavbarLinkItem from "./NavbarLinkItem";

const PublicNavbar = async () => {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/consultation", label: "Consultation" },
    { href: "/ai-assistant", label: "AI Assistant" },
    { href: "/health-plans", label: "Health Plans" },
    { href: "/medicine", label: "Medicine" },
    { href: "/diagnostics", label: "Diagnostics" },
    { href: "/ngos", label: "NGOs" },
  ];

  const accessToken = await getCookie("accessToken");
  const userInfo = accessToken ? await getUserInfo() : null;
  const dashboardRoute = userInfo
    ? getDefaultDashboardRoute(userInfo.role)
    : "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100/80 bg-white/75 backdrop-blur-md select-none dark:bg-slate-900/75 dark:border-slate-800/80">
      <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-6">
        <div>
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-10 h-10 bg-linear-to-tr from-[#6366F1] to-[#A855F7] rounded-xl flex items-center justify-center shadow-md shadow-indigo-500/10 group-hover:scale-105 transition-transform duration-200">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-slate-100 leading-none">
                Doc<span className="text-[#4F46E5]">Dex</span>
              </span>
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                Care Ecosystem
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((link) => (
              <NavbarLinkItem
                key={link.label}
                href={link.href}
                label={link.label}
              />
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-3 border-l border-slate-100 dark:border-slate-800 pl-6">
            <AISearchDialog />
            <NavbarAuthButtons
              initialHasToken={!!accessToken}
              initialUserInfo={userInfo}
              initialDashboardRoute={dashboardRoute}
            />
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center">
            <MobileMenu
              navItems={navItems}
              hasAccessToken={!!accessToken}
              userInfo={userInfo}
              dashboardRoute={dashboardRoute}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;
