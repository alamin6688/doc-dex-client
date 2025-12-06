import LogoutButton from "@/components/shared/LogoutButton";
import { Button } from "@/components/ui/button";
import { getCookie } from "@/services/auth/tokenHandlers";
import Link from "next/link";

const CommonDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const accessToken = await getCookie("accessToken");
  return (
    <div className="flex h-screen overflow-hidden">
      {accessToken ? (
        <LogoutButton />
      ) : (
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      )}
      <h3>Patieent Dashboard Layout</h3>
      {/* <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardNavbar />
        <main className="flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6">
          <div className="max-w-7xl">{children}</div>
        </main>
      </div> */}
    </div>
  );
};

export default CommonDashboardLayout;
