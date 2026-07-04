/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  CheckCircle,
  Shield,
  Users,
  Zap,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  X,
  ExternalLink,
} from "lucide-react";

const plans = [
  {
    id: 1,
    name: "Basic Plan",
    price: "৳499",
    period: "/month",
    description: "Perfect for individuals seeking basic healthcare coverage",
    features: [
      "2 Doctor Consultations per month",
      "Basic Health Checkup",
      "Prescription Management",
      "Health Records Access",
      "Email Support",
    ],
    popular: false,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    name: "Family Plan",
    price: "৳1,499",
    period: "/month",
    description: "Comprehensive coverage for your entire family",
    features: [
      "Unlimited Doctor Consultations",
      "Annual Health Checkup for 4 members",
      "Priority Appointment Booking",
      "Specialist Consultations",
      "24/7 Phone Support",
      "Medicine Discounts up to 20%",
      "Diagnostic Test Discounts",
    ],
    popular: true,
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: 3,
    name: "Premium Plan",
    price: "৳2,999",
    period: "/month",
    description: "Ultimate healthcare with VIP benefits",
    features: [
      "Unlimited Consultations (All specialties)",
      "Comprehensive Annual Checkup",
      "Home Visit Services",
      "Emergency Consultation 24/7",
      "Dedicated Health Manager",
      "Medicine Discounts up to 30%",
      "Free Diagnostic Tests (Monthly quota)",
      "Mental Health Support",
    ],
    popular: false,
    color: "from-rose-500 to-pink-500",
  },
];

// Animated Vector SVG representing connected medical care/insurance shields
const HealthPlansAnimation = () => {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-md mx-auto p-4 rounded-3xl bg-[#F8F9FD] border border-slate-100 flex items-center justify-center relative overflow-hidden shrink-0"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
      <svg viewBox="0 0 400 200" className="w-full h-40 z-10">
        {/* Connection Pulse Lines */}
        <motion.path
          d="M 100 100 A 40 40 0 1 1 180 100 A 40 40 0 1 1 100 100"
          stroke="url(#indigo-grad)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 220 100 A 40 40 0 1 1 300 100 A 40 40 0 1 1 220 100"
          stroke="url(#purple-grad)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <defs>
          <linearGradient id="indigo-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>
          <linearGradient id="purple-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>

        {/* Dynamic pulsing icons/dots */}
        <motion.circle
          cx="140"
          cy="100"
          r="8"
          fill="#4F46E5"
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="260"
          cy="100"
          r="8"
          fill="#8B5CF6"
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Pulse rings */}
        <motion.circle
          cx="140"
          cy="100"
          r="16"
          stroke="#6366F1"
          strokeWidth="1"
          fill="none"
          animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.circle
          cx="260"
          cy="100"
          r="16"
          stroke="#A855F7"
          strokeWidth="1"
          fill="none"
          animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
        />
      </svg>
    </motion.div>
  );
};

const HealthPlansPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [submittedSubscription, setSubmittedSubscription] = useState(false);
  const [subscriberName, setSubscriberName] = useState("");
  const [subscriberPhone, setSubscriberPhone] = useState("");
  const [billingCycle, setBillingCycle] = useState("Monthly");
  const [generatedSubscriptionToken, setGeneratedSubscriptionToken] = useState("");
  const [validUntilDate, setValidUntilDate] = useState("");

  const handleModalClose = () => {
    setSelectedPlan(null);
    setSubmittedSubscription(false);
    setSubscriberName("");
    setSubscriberPhone("");
    setBillingCycle("Monthly");
    setGeneratedSubscriptionToken("");
    setValidUntilDate("");
  };

  const handleSubscriptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriberName || !subscriberPhone) return;

    const token = `DEX-SUB-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedSubscriptionToken(token);

    const months = billingCycle === "Annual" ? 12 : 1;
    const expiry = new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    setValidUntilDate(expiry);
    setSubmittedSubscription(true);
  };

  // Framer Motion Variants for Staggered Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 110, damping: 16 },
    },
  } as const;

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-800 font-sans py-12 relative">
      {/* Light background decorative ring */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-50/40 rounded-full blur-[100px] pointer-events-none z-0" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="container mx-auto px-6 max-w-7xl relative z-10"
      >
        {/* Page Header */}
        <motion.div
          variants={itemVariants}
          className="border-b border-slate-200/80 pb-6 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div className="space-y-1 text-left">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              Health Plans & Packages
            </h1>
            <p className="text-slate-500 text-sm mt-1.5">
              Choose a subscription plan that fits your family&apos;s healthcare coverage needs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="bg-[#ECEEFD] text-[#4F46E5] border-none font-bold py-1.5 px-3 rounded-full text-xs">
              <Sparkles className="h-3.5 w-3.5 mr-1 animate-pulse" /> Health Coverage Verified
            </Badge>
          </div>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={itemVariants}
              whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              className={`flex flex-col justify-between p-8 rounded-[32px] bg-white border transition-all text-left relative overflow-hidden ${
                plan.popular ? "border-2 border-[#4F46E5] shadow-sm" : "border-slate-200/80 shadow-xs"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-[#4F46E5] text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-xl">
                  Popular Choice
                </div>
              )}

              <div className="space-y-6">
                {/* Plan Header */}
                <div className="space-y-2.5">
                  <h3 className="text-xl font-black text-slate-900">
                    {plan.name}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed min-h-[32px]">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline pt-2">
                    <span className="text-3xl font-black text-slate-900 tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-slate-400 text-xs font-bold ml-1">
                      {plan.period}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3.5 pt-6 border-t border-slate-100">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                    What&apos;s Included
                  </span>
                  <ul className="space-y-3 text-xs font-semibold text-slate-700">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8 mt-6">
                <Button
                  onClick={() => setSelectedPlan(plan)}
                  className={`w-full font-extrabold rounded-xl py-5 flex items-center justify-center gap-1.5 shadow-xs cursor-pointer text-xs transition-all ${
                    plan.popular
                      ? "bg-[#4F46E5] hover:bg-[#4338CA] text-white"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                  }`}
                >
                  Subscribe Now
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Visual Info Block */}
        <motion.div
          variants={itemVariants}
          className="w-full flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white border border-slate-200/80 p-8 md:p-10 rounded-[32px] mt-8 text-left relative overflow-hidden"
        >
          <div className="space-y-3 max-w-lg">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Comprehensive Care Network
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              All plans grant direct access to verified online specialist doctor consultations, diagnostic checking subsidies, and priority drug home shipments.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 text-xs font-bold text-slate-650">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-500" /> Consultations Included
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-500" /> Subsidy Credits
              </span>
            </div>
          </div>
          <HealthPlansAnimation />
        </motion.div>

        {/* Benefits section */}
        <motion.div variants={itemVariants} className="mt-12 w-full">
          <Card className="bg-white border-slate-200/80 rounded-[32px] p-8 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 tracking-tight mb-6 flex items-center gap-2 text-left">
              <Sparkles className="h-5 w-5 text-[#4F46E5]" /> Why Activate Health Plans?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
              {[
                {
                  icon: Shield,
                  title: "Accredited Partners",
                  desc: "ISO Certified diagnostic centers and clinically vetted medical consultants.",
                },
                {
                  icon: Users,
                  title: "Family Protection",
                  desc: "Scale medical care subsidies for up to 4 family members under one subscription.",
                },
                {
                  icon: Zap,
                  title: "Quick Processing",
                  desc: "Avoid clinic queues with instant digital checkup passes and priority slots.",
                },
                {
                  icon: CheckCircle,
                  title: "Quality Vetting",
                  desc: "Verified prescription handling and authenticated medicine supplies.",
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#F8F9FD] border border-slate-100 space-y-2.5"
                  >
                    <div className="p-2 bg-indigo-50 text-[#4F46E5] rounded-xl shrink-0 h-10 w-10 flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">
                        {item.title}
                      </h4>
                      <p className="text-slate-500 text-xs leading-relaxed mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Enterprise/Corporate Banner */}
        <motion.div variants={itemVariants} className="mt-8 w-full p-8 rounded-[32px] bg-linear-to-br from-white via-white to-indigo-500/5 border border-indigo-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-left">
            <Badge className="bg-[#ECEEFD] text-[#4F46E5] border-none font-bold rounded-md text-[9px] uppercase tracking-wider">
              Corporate Portal
            </Badge>
            <h3 className="text-xl font-bold text-slate-950">
              Need customized plans for your enterprise?
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Integrate corporate employee accounts with Doc Dex subsidies. Enable automated medical checks, insurance tags, and custom monthly prescription benefits.
            </p>
          </div>
          <div className="shrink-0 w-full md:w-auto">
            <Button
              size="lg"
              className="w-full md:w-auto bg-[#4F46E5] hover:bg-[#4338CA] text-white font-extrabold px-8 rounded-xl shadow-xs transition-all gap-2 flex items-center justify-center cursor-pointer"
            >
              Contact Corporate Desk
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </motion.div>

      {/* Subscription Checkout Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleModalClose}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs cursor-pointer z-40"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="bg-white border border-slate-100 rounded-[28px] p-8 shadow-2xl max-w-md w-full relative overflow-hidden z-50"
            >
              {/* Subtle top brand accent line */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-[#6366F1] to-[#A855F7]" />

              {/* Close Button */}
              <button
                onClick={handleModalClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer p-1.5 rounded-full hover:bg-slate-50 transition-colors z-10"
              >
                <X className="h-4 w-4" />
              </button>

              <AnimatePresence mode="wait">
                {!submittedSubscription ? (
                  <motion.div
                    key="checkout-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6 text-left"
                  >
                    <div className="text-left space-y-1">
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                        Plan Subscription
                      </h3>
                      <p className="text-slate-500 text-sm">
                        Activate your selected healthcare tier coverage immediately.
                      </p>
                    </div>

                    {/* Selected Plan Details */}
                    <div className="flex items-center gap-4 p-1">
                      <div className="w-14 h-14 bg-linear-to-tr from-[#6366F1] to-[#A855F7] rounded-[18px] flex items-center justify-center text-white text-base font-bold shadow-md shrink-0 select-none">
                        {selectedPlan?.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-base font-extrabold text-slate-800 tracking-tight">
                          {selectedPlan?.name}
                        </h4>
                        <span className="text-xs font-semibold text-[#6366F1] bg-[#ECEEFD] px-2.5 py-0.5 rounded-full mt-1 inline-block">
                          Price: {selectedPlan?.price} {selectedPlan?.period}
                        </span>
                      </div>
                    </div>

                    <form onSubmit={handleSubscriptionSubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                          Subscriber Name
                        </label>
                        <Input
                          required
                          placeholder="e.g. Alamin"
                          value={subscriberName}
                          onChange={(e) => setSubscriberName(e.target.value)}
                          className="bg-slate-50/80 border-slate-100 text-slate-800 rounded-xl py-5 px-4 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500/50 outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                          Contact Phone Number
                        </label>
                        <Input
                          required
                          type="tel"
                          placeholder="e.g. +880 17XX XXXXXX"
                          value={subscriberPhone}
                          onChange={(e) => setSubscriberPhone(e.target.value)}
                          className="bg-slate-50/80 border-slate-100 text-slate-800 rounded-xl py-5 px-4 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500/50 outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                          Billing Cycle
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {["Monthly", "Annual"].map((cycle) => (
                            <button
                              key={cycle}
                              type="button"
                              onClick={() => setBillingCycle(cycle)}
                              className={`py-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                                billingCycle === cycle
                                  ? "border-[#4F46E5] text-[#4F46E5] bg-[#ECEEFD]"
                                  : "border-slate-200 text-slate-500 hover:bg-slate-50"
                              }`}
                            >
                              {cycle}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 flex gap-3 flex-col sm:flex-row">
                        <Button
                          type="button"
                          onClick={handleModalClose}
                          variant="outline"
                          className="flex-1 rounded-xl border border-slate-200 text-slate-500 font-bold"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-extrabold rounded-xl cursor-pointer py-5 flex items-center justify-center shadow-md shadow-indigo-600/10"
                        >
                          Activate Plan
                        </Button>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="receipt-ticket"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6 text-center"
                  >
                    <div className="mx-auto w-16 h-16 bg-[#ECEEFD] border border-indigo-100 rounded-full flex items-center justify-center animate-bounce">
                      <ShieldCheck className="h-8 w-8 text-[#4F46E5]" />
                    </div>

                    <div className="text-center space-y-1">
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                        Coverage Pass Generated
                      </h3>
                      <p className="text-slate-500 text-sm">
                        Your subscription has been activated successfully. Save this digital ticket details.
                      </p>
                    </div>

                    {/* Digital Ticket Layout */}
                    <div className="p-6 rounded-[24px] bg-[#F8F9FE] border border-slate-100 text-slate-800 shadow-sm relative overflow-hidden text-left">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/50 rounded-bl-full pointer-events-none" />

                      <div className="flex justify-between items-center border-b border-slate-200/60 pb-4 mb-4">
                        <div>
                          <h4 className="text-[10px] uppercase tracking-widest text-[#4F46E5] font-extrabold">
                            Doc Dex Coverage Pass
                          </h4>
                          <p className="text-lg font-black tracking-tight text-slate-900 mt-1">
                            {selectedPlan?.name}
                          </p>
                        </div>
                        <Shield className="h-6 w-6 text-[#4F46E5] shrink-0" />
                      </div>

                      <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-xs">
                        <div>
                          <span className="text-slate-400 font-extrabold uppercase tracking-wider block mb-0.5 text-[9px]">
                            Subscription Code
                          </span>
                          <span className="text-sm font-black text-[#4F46E5] font-mono tracking-wider">
                            {generatedSubscriptionToken}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 font-extrabold uppercase tracking-wider block mb-0.5 text-[9px]">
                            Subscriber
                          </span>
                          <span className="text-sm font-bold text-slate-900 truncate block">
                            {subscriberName}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 font-extrabold uppercase tracking-wider block mb-0.5 text-[9px]">
                            Coverage Status
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Active Verification
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 font-extrabold uppercase tracking-wider block mb-0.5 text-[9px]">
                            Valid Until
                          </span>
                          <span className="text-sm text-slate-700 font-bold">
                            {validUntilDate}
                          </span>
                        </div>
                      </div>

                      {/* Cutout circles for ticket effect */}
                      <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-50" />
                      <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-50" />
                    </div>

                    <div className="pt-2">
                      <Button
                        onClick={handleModalClose}
                        className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white font-extrabold rounded-xl py-5 flex items-center justify-center cursor-pointer shadow-md shadow-indigo-500/10"
                      >
                        Done & Return
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HealthPlansPage;
