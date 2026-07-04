"use client";

import { useAuthToken } from "@/hooks/useAuthToken";
import { UserInfo } from "@/types/user.interface";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import UserDropdown from "../modules/Dashboard/UserDropdown";
import { Button } from "../ui/button";

interface NavbarAuthButtonsProps {
  initialHasToken: boolean;
  initialUserInfo: UserInfo | null;
  initialDashboardRoute: string;
}

export default function NavbarAuthButtons({
  initialHasToken,
  initialUserInfo,
  initialDashboardRoute,
}: NavbarAuthButtonsProps) {
  // Detect client-side auth state changes on navigation
  const clientHasToken = useAuthToken();

  // Use client token state if available, otherwise fall back to server state
  const hasToken = clientHasToken || initialHasToken;
  const userInfo = hasToken ? initialUserInfo : null;
  const dashboardRoute = initialDashboardRoute;

  if (hasToken && userInfo) {
    return (
      <>
        <Link href={dashboardRoute}>
          <Button variant="outline" className="gap-2 border-slate-200 text-slate-700 font-bold hover:bg-slate-50 rounded-xl px-4 py-2 text-xs">
            <LayoutDashboard className="h-3.5 w-3.5 text-slate-500" />
            Dashboard
          </Button>
        </Link>
        <UserDropdown userInfo={userInfo} />
      </>
    );
  }

  return (
    <Link href="/login">
      <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white font-extrabold rounded-xl px-6 py-2 text-xs shadow-md shadow-indigo-500/10 transition-all duration-200 hover:scale-[1.02] cursor-pointer">
        Login
      </Button>
    </Link>
  );
}
