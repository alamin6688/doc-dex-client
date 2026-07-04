import ResetPasswordForm from "@/components/ResetPasswordForm";
import BackButton from "@/components/shared/BackButton";
import { Stethoscope } from "lucide-react";

const ResetPasswordPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string; email?: string; token?: string }>;
}) => {
  const params = (await searchParams) || {};
  const { redirect, email, token } = params;

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-slate-50 via-indigo-50/40 to-purple-50/30 relative overflow-hidden flex items-center justify-center font-sans py-12 px-4 select-none"> 

      {/* Back Button */}
      <BackButton light />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #4F46E5 1px, transparent 1px), linear-gradient(to bottom, #4F46E5 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Decorative Glow Blurs */}
      <div className="absolute top-[-80px] right-[-80px] w-[380px] h-[380px] bg-indigo-200/40 rounded-full blur-[90px] pointer-events-none z-0" />
      <div className="absolute bottom-[-60px] left-[-60px] w-[320px] h-[320px] bg-purple-200/30 rounded-full blur-[80px] pointer-events-none z-0" />

      {/* Main content wrapper */}
      <div className="w-full max-w-[420px] flex flex-col relative z-10">

        {/* Branding header */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-linear-to-tr from-[#6366F1] to-[#A855F7] rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900 leading-none">
              Doc<span className="text-[#4F46E5]">Dex</span>
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white/85 backdrop-blur-md rounded-[32px] p-8 sm:p-9 shadow-xl shadow-indigo-100/60 border border-white text-left flex flex-col gap-5">

          <div className="text-center space-y-1">
            <h2 className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-tight leading-tight">
              Reset Password
            </h2>
            <p className="text-slate-450 font-bold text-xs">
              Enter your new password below
            </p>
          </div>

          <ResetPasswordForm redirect={redirect} email={email} token={token} />

        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
