import React from "react";
import Link from "next/link";
import { getCookie } from "@/services/auth/tokenHandlers";
import AISearchDialog from "./AISSearchDialog";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { getUserInfo } from "@/services/auth/getUserInfo";
import MobileMenu from "./MobileMenu";
import NavbarAuthButtons from "./NavbarAuthButtons";
import { Stethoscope } from "lucide-react";

const PublicNavbar = async () => {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/consultation", label: "Consultation" },
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur  dark:bg-background/95">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-0">
        <div>
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-16 h-11 bg-blue-600 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
              <span className="w-full text-2xl font-bold text-primary">DocDex</span>
          </Link>
        </div>
        <div className="container mx-auto flex h-16 items-center justify-end gap-4 px-4">
          {/* <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">DocDex</span>
        </Link> */}

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navItems.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                prefetch={true}
                className="hover:text-primary transition-colors text-gray-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-2">
            <AISearchDialog />
            <NavbarAuthButtons
              initialHasToken={!!accessToken}
              initialUserInfo={userInfo}
              initialDashboardRoute={dashboardRoute}
            />
          </div>

          {/* Mobile Menu */}
          <MobileMenu
            navItems={navItems}
            hasAccessToken={!!accessToken}
            userInfo={userInfo}
            dashboardRoute={dashboardRoute}
          />
        </div>{" "}
      </div>
    </header>
  );
};

export default PublicNavbar;
