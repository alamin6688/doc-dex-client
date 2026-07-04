import LoginForm from "@/components/login-form";
import BackButton from "@/components/shared/BackButton";
import {
  AuthAnimatedBlob,
  AuthAnimatedItem,
  AuthPageWrapper,
} from "@/components/shared/AuthPageWrapper";
import { Stethoscope } from "lucide-react";
import Link from "next/link";

const LoginPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) => {
  const params = (await searchParams) || {};

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-slate-50 via-indigo-50/40 to-purple-50/30 relative overflow-hidden flex items-center justify-center font-sans py-12 px-4 select-none">

      {/* Back Button — dark version for light background */}
      <BackButton light />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #4F46E5 1px, transparent 1px), linear-gradient(to bottom, #4F46E5 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Animated Decorative Glow Blurs */}
      <AuthAnimatedBlob className="absolute top-[-80px] right-[-80px] w-[380px] h-[380px] bg-indigo-200/40 rounded-full blur-[90px] pointer-events-none z-0" />
      <AuthAnimatedBlob className="absolute bottom-[-60px] left-[-60px] w-[320px] h-[320px] bg-purple-200/30 rounded-full blur-[80px] pointer-events-none z-0" />

      {/* Main content wrapper */}
      <AuthPageWrapper>
        <div className="w-full max-w-[420px] flex flex-col relative z-10">

          {/* Branding header above card */}
          <AuthAnimatedItem className="flex justify-center mb-7">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-linear-to-tr from-[#6366F1] to-[#A855F7] rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-300/40">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-900 leading-none">
                Doc<span className="text-[#4F46E5]">Dex</span>
              </span>
            </div>
          </AuthAnimatedItem>

          {/* Login White Card */}
          <AuthAnimatedItem className="bg-white/85 backdrop-blur-md rounded-[32px] p-8 sm:p-9 shadow-xl shadow-indigo-100/60 border border-white text-left flex flex-col gap-5">

            {/* Title */}
            <div className="text-center space-y-1">
              <h2 className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-wide leading-tight">
                Welcome Back
              </h2>
              <p className="text-slate-450 font-normal text-xs tracking-wide">
                Sign in to your account
              </p>
            </div>

            {/* Form */}
            <LoginForm redirect={params?.redirect} />

            {/* Footer link */}
            <div className="text-center text-xs font-semibold text-slate-500 mt-1">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-[#4F46E5] font-extrabold hover:text-[#4338CA] transition-colors"
              >
                Sign up
              </Link>
            </div>

          </AuthAnimatedItem>

        </div>
      </AuthPageWrapper>
    </div>
  );
};

export default LoginPage;
