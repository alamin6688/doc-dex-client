/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { loginUser } from "@/services/auth/loginUser";
import { toast } from "sonner";
import Link from "next/link";
import { Eye, EyeOff, ChevronRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

const makeVariant = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 280, damping: 24, delay },
  },
});

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [state, formAction, ispending] = useActionState(loginUser, null);
  
  // Controlled input states to support Quick Demo Autofill
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const getFieldError = (fieldName: string) => {
    if (state && state.errors) {
      const error = state.errors.find((err: any) => err.field === fieldName);
      return error?.message;
    }
    return null;
  };

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-4" noValidate>
      {redirect && <input type="hidden" name="redirect" value={redirect} />}

      {/* Email Field */}
      <motion.div variants={makeVariant(0)} initial="hidden" animate="visible" className="space-y-1.5 text-left">
        <label htmlFor="email" className="text-xs font-bold text-slate-700">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11 border-slate-200 focus-visible:ring-indigo-500/20 focus-visible:border-[#4F46E5] rounded-xl text-xs sm:text-sm px-4"
        />
        {getFieldError("email") && (
          <p className="text-rose-600 text-[11px] font-semibold mt-1">
            {getFieldError("email")}
          </p>
        )}
      </motion.div>

      {/* Password Field */}
      <motion.div variants={makeVariant(0.07)} initial="hidden" animate="visible" className="space-y-1.5 text-left">
        <div className="flex justify-between items-center">
          <label htmlFor="password" className="text-xs font-bold text-slate-700">
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-[11px] font-bold text-[#4F46E5] hover:text-[#4338CA]"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 border-slate-200 focus-visible:ring-indigo-500/20 focus-visible:border-[#4F46E5] rounded-xl text-xs sm:text-sm px-4 pr-11"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {getFieldError("password") && (
          <p className="text-rose-600 text-[11px] font-semibold mt-1">
            {getFieldError("password")}
          </p>
        )}
      </motion.div>

      {/* Remember me Checkbox */}
      <motion.div variants={makeVariant(0.14)} initial="hidden" animate="visible" className="flex items-center gap-2 pt-0.5">
        <input
          type="checkbox"
          id="rememberMe"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="w-4 h-4 rounded-md border-slate-300 text-[#4F46E5] focus:ring-[#4F46E5] cursor-pointer accent-[#4F46E5]"
        />
        <label
          htmlFor="rememberMe"
          className="text-xs font-semibold text-slate-600 select-none cursor-pointer"
        >
          Remember me
        </label>
      </motion.div>

      {/* Submit Action Button */}
      <motion.div variants={makeVariant(0.21)} initial="hidden" animate="visible">
      <Button
        type="submit"
        disabled={ispending}
        className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white font-extrabold rounded-xl h-11 text-xs cursor-pointer shadow-xs mt-1 transition-transform active:scale-[0.98]"
      >
        {ispending ? "Signing in..." : "Sign in"}
      </Button>
      </motion.div>

      {/* Quick Demo Access Box */}
      <motion.div variants={makeVariant(0.28)} initial="hidden" animate="visible" className="pt-4 border-t border-slate-100 mt-4">
        <button
          type="button"
          onClick={() => {
            setEmail("admin@example.com");
            setPassword("admin789");
          }}
          className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-150/70 hover:border-[#4F46E5]/45 hover:bg-indigo-50/10 transition-all text-left flex items-center justify-between group cursor-pointer"
        >
          <div className="space-y-0.5">
            <span className="text-[9px] font-bold text-[#4F46E5] uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Quick Demo Access
            </span>
            <h5 className="text-xs font-extrabold text-slate-800">
              Use admin account
            </h5>
            <p className="text-[10px] text-slate-450 font-medium">
              admin@example.com / admin789
            </p>
          </div>
          <div className="w-7 h-7 bg-white border border-slate-200/80 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-[#4F46E5] group-hover:border-indigo-150 transition-colors shadow-2xs shrink-0">
            <ChevronRight className="h-4 w-4" />
          </div>
        </button>
      </motion.div>
    </form>
  );
};

export default LoginForm;
