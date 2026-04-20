import PublicNavbar from "@/components/shared/PublicNavbar";
import ConditionalFooter from "@/components/shared/ConditionalFooter";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PublicNavbar />
      {children}
      <ConditionalFooter />
    </>
  );
};

export default CommonLayout;
