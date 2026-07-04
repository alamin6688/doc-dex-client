"use client";

import { registerPatient } from "@/services/auth/registerPatient";
import { useActionState, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(registerPatient, null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.05 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3.5 text-left"
      >
        
        {/* Name Field */}
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-xs font-bold text-slate-700">
            Full Name
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            className="h-11 border-slate-200 focus-visible:ring-indigo-500/20 focus-visible:border-[#4F46E5] rounded-xl text-xs sm:text-sm px-4"
          />
          <InputFieldError field="name" state={state} />
        </div>

        {/* Address Field */}
        <div className="space-y-1.5">
          <label htmlFor="address" className="text-xs font-bold text-slate-700">
            Address
          </label>
          <Input
            id="address"
            name="address"
            type="text"
            placeholder="123 Main St"
            className="h-11 border-slate-200 focus-visible:ring-indigo-500/20 focus-visible:border-[#4F46E5] rounded-xl text-xs sm:text-sm px-4"
          />
          <InputFieldError field="address" state={state} />
        </div>

        {/* Email Field */}
        <div className="space-y-1.5 md:col-span-2">
          <label htmlFor="email" className="text-xs font-bold text-slate-700">
            Email Address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            className="h-11 border-slate-200 focus-visible:ring-indigo-500/20 focus-visible:border-[#4F46E5] rounded-xl text-xs sm:text-sm px-4"
          />
          <InputFieldError field="email" state={state} />
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <label htmlFor="password" className="text-xs font-bold text-slate-700">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
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
          <InputFieldError field="password" state={state} />
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-1.5">
          <label htmlFor="confirmPassword" className="text-xs font-bold text-slate-700">
            Confirm Password
          </label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              className="h-11 border-slate-200 focus-visible:ring-indigo-500/20 focus-visible:border-[#4F46E5] rounded-xl text-xs sm:text-sm px-4 pr-11"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          <InputFieldError field="confirmPassword" state={state} />
        </div>

      </motion.div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.2 }}
        className="pt-2"
      >
        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white font-extrabold rounded-xl h-11 text-xs cursor-pointer shadow-xs transition-transform active:scale-[0.98]"
        >
          {isPending ? "Creating Account..." : "Create Account"}
        </Button>
      </motion.div>
    </form>
  );
};

export default RegisterForm;
