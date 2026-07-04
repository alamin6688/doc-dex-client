/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Brain,
  FileText,
  Heart,
  Microscope,
  Search,
  ArrowUpRight,
  ShieldCheck,
  Clock,
  X,
  Droplet,
  ExternalLink,
  Sparkles,
} from "lucide-react";

// Mock Directory Data for Interactive Diagnostic Tests (12 items in total)
const mockTests = [
  {
    id: 1,
    name: "Complete Blood Count (CBC)",
    category: "Pathology & Blood",
    description:
      "Evaluates overall health and detects a wide range of disorders including anemia, infection, and leukemia.",
    price: "BDT 450",
    timeRequired: "12 Hours",
    sampleType: "Blood",
  },
  {
    id: 2,
    name: "Lipid Profile (Cholesterol)",
    category: "Pathology & Blood",
    description:
      "Measures total cholesterol, LDL, HDL, and triglycerides to evaluate cardiac risk.",
    price: "BDT 800",
    timeRequired: "12 Hours",
    sampleType: "Blood (Fasting)",
  },
  {
    id: 3,
    name: "HbA1c (Diabetes Tracker)",
    category: "Pathology & Blood",
    description:
      "Measures average blood sugar levels over the past 3 months to monitor diabetes.",
    price: "BDT 650",
    timeRequired: "8 Hours",
    sampleType: "Blood",
  },
  {
    id: 4,
    name: "Magnetic Resonance Imaging (MRI) - Brain",
    category: "Radiology & Imaging",
    description:
      "High-resolution imaging to detect tumors, aneurysms, stroke, and nerve structures.",
    price: "BDT 6,500",
    timeRequired: "24 Hours",
    sampleType: "Scan",
  },
  {
    id: 5,
    name: "Ultrasonography (USG) - Whole Abdomen",
    category: "Radiology & Imaging",
    description:
      "Ultrasound scan to inspect internal organs like liver, gallbladder, kidneys, and spleen.",
    price: "BDT 1,500",
    timeRequired: "4 Hours",
    sampleType: "Scan",
  },
  {
    id: 6,
    name: "Digital Chest X-Ray",
    category: "Radiology & Imaging",
    description:
      "Quick chest scan to evaluate lungs, heart shape, and chest wall conditions.",
    price: "BDT 500",
    timeRequired: "2 Hours",
    sampleType: "Scan",
  },
  {
    id: 7,
    name: "Electrocardiogram (ECG / EKG)",
    category: "Cardiology Tests",
    description:
      "Records the electrical signals of the heart to check for rhythm abnormalities and heart issues.",
    price: "BDT 400",
    timeRequired: "Instant",
    sampleType: "Electrodes",
  },
  {
    id: 8,
    name: "Echocardiogram (Color Doppler)",
    category: "Cardiology Tests",
    description:
      "Ultrasound scan of the heart to assess heart valves, chamber size, and pumping action.",
    price: "BDT 2,200",
    timeRequired: "6 Hours",
    sampleType: "Scan",
  },
  {
    id: 9,
    name: "Full Body Health Package (Silver)",
    category: "Health Packages",
    description:
      "Comprehensive package including CBC, Liver & Kidney functions, Lipid profile, and Blood Sugar.",
    price: "BDT 3,500",
    timeRequired: "24 Hours",
    sampleType: "Blood & Urine",
  },
  {
    id: 10,
    name: "Executive Health Checkup (Platinum)",
    category: "Health Packages",
    description:
      "Elite diagnostic suite with ECG, USG, Thyroid tests, Vitamin profiling, and complete bio-analysis.",
    price: "BDT 7,800",
    timeRequired: "36 Hours",
    sampleType: "Blood, Urine & ECG",
  },
  {
    id: 11,
    name: "Thyroid Profile (T3, T4, TSH)",
    category: "Pathology & Blood",
    description:
      "Evaluates thyroid gland function to screen for, diagnose, and monitor hypo- and hyperthyroidism.",
    price: "BDT 1,100",
    timeRequired: "12 Hours",
    sampleType: "Blood",
  },
  {
    id: 12,
    name: "CT Scan - Brain & Head",
    category: "Radiology & Imaging",
    description:
      "Generates cross-sectional images of the brain to detect hemorrhages, tumors, and structural abnormalities.",
    price: "BDT 4,500",
    timeRequired: "8 Hours",
    sampleType: "Scan",
  },
];

const categoryMetadata: Record<
  string,
  { icon: any; color: string; bgGlow: string }
> = {
  "Pathology & Blood": {
    icon: Microscope,
    color: "text-rose-500",
    bgGlow: "from-rose-500/5 to-transparent",
  },
  "Radiology & Imaging": {
    icon: Brain,
    color: "text-indigo-500",
    bgGlow: "from-indigo-500/5 to-transparent",
  },
  "Cardiology Tests": {
    icon: Heart,
    color: "text-amber-500",
    bgGlow: "from-amber-500/5 to-transparent",
  },
  "Health Packages": {
    icon: FileText,
    color: "text-emerald-500",
    bgGlow: "from-emerald-500/5 to-transparent",
  },
};

// Animated Vector SVG representing connected diagnostics heart rate
const DiagnosticsAnimation = () => {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-md mx-auto p-4 rounded-3xl bg-[#F8F9FD] border border-slate-100 flex items-center justify-center relative overflow-hidden shrink-0"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
      <svg viewBox="0 0 400 200" className="w-full h-40 z-10">
        {/* Heart Rate / Pulse wave */}
        <motion.path
          d="M 20 100 L 100 100 L 120 70 L 140 140 L 160 100 L 175 100 L 185 85 L 195 115 L 205 100 L 250 100 L 265 40 L 285 160 L 305 100 L 380 100"
          stroke="#E2E8F0"
          strokeWidth="2"
          fill="none"
        />
        <motion.path
          d="M 20 100 L 100 100 L 120 70 L 140 140 L 160 100 L 175 100 L 185 85 L 195 115 L 205 100 L 250 100 L 265 40 L 285 160 L 305 100 L 380 100"
          stroke="url(#purple-grad)"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <defs>
          <linearGradient id="purple-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="50%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>

        {/* Pulse Dot */}
        <motion.circle
          cx="20"
          cy="100"
          r="5"
          fill="#A855F7"
          animate={{
            cx: [
              20, 100, 120, 140, 160, 175, 185, 195, 205, 250, 265, 285, 305,
              380,
            ],
            cy: [
              100, 100, 70, 140, 100, 100, 85, 115, 100, 100, 40, 160, 100, 100,
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Pulsing Scan Rings */}
        <motion.circle
          cx="285"
          cy="160"
          r="15"
          stroke="#EC4899"
          strokeWidth="1.5"
          fill="none"
          animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.circle
          cx="120"
          cy="70"
          r="12"
          stroke="#6366F1"
          strokeWidth="1"
          fill="none"
          animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
        />
      </svg>
    </motion.div>
  );
};

const DiagnosticsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedTest, setSelectedTest] = useState<any>(null);
  const [submittedBooking, setSubmittedBooking] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [generatedBookingToken, setGeneratedBookingToken] = useState("");
  const [validUntilDate, setValidUntilDate] = useState("");

  const filteredTests = useMemo(() => {
    return mockTests.filter((test) => {
      return (
        test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.sampleType.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery]);

  const handleModalClose = () => {
    setSelectedTest(null);
    setSubmittedBooking(false);
    setPatientName("");
    setPatientPhone("");
    setPreferredDate("");
    setPreferredTime("");
    setGeneratedBookingToken("");
    setValidUntilDate("");
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientPhone || !preferredDate || !preferredTime)
      return;

    const token = `DEX-DIAG-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedBookingToken(token);

    const expiry = new Date(
      Date.now() + 15 * 24 * 60 * 60 * 1000,
    ).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    setValidUntilDate(expiry);
    setSubmittedBooking(true);
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
        {/* Workspace Style Page Header */}
        <motion.div
          variants={itemVariants}
          className="border-b border-slate-200/80 pb-6 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div className="space-y-1 text-left">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
              Diagnostics Hub
            </h1>
            <p className="text-slate-500 text-sm mt-1.5">
              Schedule clinical test packages online, choose safe home
              collection, and access digital lab checkup passes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="bg-[#ECEEFD] text-[#4F46E5] hover:bg-[#ECEEFD] border-none font-bold py-1.5 px-3 rounded-full text-xs">
              <Sparkles className="h-3.5 w-3.5 mr-1 animate-pulse" /> Certified
              Labs
            </Badge>
          </div>
        </motion.div>

        {/* Main Content Workspace Card */}
        <motion.div variants={itemVariants} className="w-full">
          <Card className="bg-white rounded-[28px] border border-slate-200/80 p-8 md:p-10 shadow-xs relative overflow-hidden z-10">
            <div className="space-y-8">
              {/* Visual Section */}
              {searchQuery === "" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-slate-100 pb-8 text-left"
                >
                  <div className="space-y-3 max-w-md">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                      Integrated Labs Network
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Book direct testing slots, choose home blood draw
                      collections, and track lab report diagnostics in real
                      time.
                    </p>
                  </div>
                  <DiagnosticsAnimation />
                </motion.div>
              )}

              {/* Sub-header directory section & Search Bar */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-slate-100 pb-5">
                <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <Microscope className="h-5 w-5 text-[#4F46E5]" /> Diagnostic
                  Test Catalog
                </h3>
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Search test or sample type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-slate-50/80 border-slate-100 text-slate-800 placeholder-slate-400 focus-visible:ring-indigo-500/20 rounded-xl py-4 h-10"
                  />
                </div>
              </div>

              {/* Interactive 3-Column Test Grid */}
              <motion.div
                layout
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {filteredTests.length > 0 ? (
                    filteredTests.map((test) => {
                      const meta = categoryMetadata[test.category] || {
                        icon: Microscope,
                        color: "text-[#6366F1]",
                        accentColor: "indigo",
                      };
                      const Icon = meta.icon;

                      return (
                        <motion.div
                          key={test.id}
                          layout
                          variants={itemVariants}
                          whileHover={{
                            y: -6,
                            boxShadow:
                              "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
                          }}
                          className="flex flex-col justify-between p-6 rounded-3xl bg-white border border-slate-150 shadow-2xs hover:border-slate-250 transition-all text-left relative overflow-hidden group min-h-[290px]"
                        >
                          <div className="space-y-4">
                            {/* Card Top: Title & Icon */}
                            <div className="flex justify-between items-start gap-3">
                              <div
                                className={`p-3 bg-slate-50 rounded-2xl ${meta.color} group-hover:scale-110 transition-transform duration-200`}
                              >
                                <Icon className="h-5 w-5" />
                              </div>
                              <Badge className="bg-slate-100 text-slate-655 font-bold text-[9px] uppercase tracking-wider border-none rounded-md px-2 py-0.5 mt-0.5">
                                {test.category}
                              </Badge>
                            </div>

                            {/* Card Body */}
                            <div className="space-y-1.5">
                              <h4 className="text-base font-extrabold text-slate-900 group-hover:text-[#4F46E5] transition-colors leading-tight">
                                {test.name}
                              </h4>
                              <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                                {test.description}
                              </p>
                            </div>
                          </div>

                          {/* Card Footer: Metrics & Actions */}
                          <div className="space-y-4 pt-4 mt-4 border-t border-slate-100/60">
                            <div className="flex flex-wrap gap-2 text-[10px] font-bold">
                              <span className="inline-flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md text-slate-500">
                                <Clock className="h-3 w-3 text-slate-400" />{" "}
                                {test.timeRequired}
                              </span>
                              <span className="inline-flex items-center gap-1 bg-indigo-50/50 px-2 py-1 rounded-md text-indigo-600">
                                <Droplet className="h-3 w-3 text-indigo-400" />{" "}
                                {test.sampleType}
                              </span>
                            </div>

                            <div className="flex items-center justify-between gap-2">
                              <span className="text-lg font-bold text-slate-900">
                                {test.price}
                              </span>
                              <Button
                                onClick={() => setSelectedTest(test)}
                                className="bg-[#4F46E5] hover:bg-[#4338CA] text-white font-extrabold rounded-xl py-4 px-4 flex items-center justify-center gap-1.5 shadow-xs cursor-pointer text-xs h-9"
                              >
                                Schedule Test
                                <ArrowUpRight className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="col-span-full py-16 text-center"
                    >
                      <Microscope className="h-10 w-10 text-slate-350 mx-auto mb-3 animate-pulse" />
                      <h3 className="text-base font-bold text-slate-650">
                        No diagnostic tests match your query
                      </h3>
                      <p className="text-slate-400 text-xs mt-1">
                        Try resetting your query or search another term.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* How Booking Works section */}
        <motion.div variants={itemVariants} className="mt-8 w-full">
          <Card className="bg-white border-slate-200/80 rounded-[32px] p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-6 flex items-center gap-2 text-left">
              <Sparkles className="h-5 w-5 text-[#4F46E5]" /> How Diagnostics
              Booking Works
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {[
                {
                  title: "1. Select Test & Schedule",
                  desc: "Pick your diagnostic tests or complete package, fill in patient name/phone, and choose your preferred date and time.",
                },
                {
                  title: "2. Sample Collection",
                  desc: "Visit our labs or have a certified phlebotomist perform an sterile home collection, adhering to cold-chain preservation.",
                },
                {
                  title: "3. Access Reports Online",
                  desc: "Receive your immediate digital booking pass. Laboratory analysis reports are delivered directly to your device.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#F8F9FD] border border-slate-100 space-y-2"
                >
                  <h4 className="text-sm font-extrabold text-slate-900">
                    {item.title}
                  </h4>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Partner Labs Banner */}
        <motion.div
          variants={itemVariants}
          className="mt-8 w-full p-8 rounded-[32px] bg-linear-to-br from-white via-white to-indigo-500/5 border border-indigo-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-xl text-left">
            <Badge className="bg-[#ECEEFD] text-[#4F46E5] border-none font-bold rounded-md text-[9px] uppercase tracking-wider">
              CAP & ISO Certified
            </Badge>
            <h3 className="text-xl font-bold text-slate-950">
              Are you an accredited Diagnostic Center?
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Partner your diagnostics laboratory with the Doc Dex network.
              Secure digital patient routing, automate report synchronization,
              and scale medical diagnostic tracking.
            </p>
          </div>
          <div className="shrink-0 w-full md:w-auto">
            <Button
              size="lg"
              className="w-full md:w-auto bg-[#4F46E5] hover:bg-[#4338CA] text-white font-extrabold px-8 rounded-xl shadow-xs transition-all gap-2 flex items-center justify-center cursor-pointer"
            >
              Partner with Us
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </motion.div>

      {/* Interactive Booking Modal */}
      <AnimatePresence>
        {selectedTest && (
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
                {!submittedBooking ? (
                  <motion.div
                    key="booking-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="text-left space-y-1">
                      <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                        Schedule Test
                      </h3>
                      <p className="text-slate-500 text-sm">
                        Schedule a slot for your diagnostic profile booking
                        immediately.
                      </p>
                    </div>

                    {/* Test Info Box */}
                    <div className="flex items-center gap-4 p-1">
                      <div className="w-16 h-16 bg-linear-to-tr from-[#6366F1] to-[#A855F7] rounded-[20px] flex items-center justify-center text-white text-xl font-bold shadow-md shrink-0 select-none">
                        {selectedTest?.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      <div className="text-left">
                        <h4 className="text-base font-extrabold text-slate-800 tracking-tight leading-snug">
                          {selectedTest?.name}
                        </h4>
                        <span className="text-xs font-semibold text-[#6366F1] bg-[#ECEEFD] px-2.5 py-0.5 rounded-full mt-1 inline-block">
                          Price: {selectedTest?.price}
                        </span>
                      </div>
                    </div>

                    <form
                      onSubmit={handleBookingSubmit}
                      className="space-y-4 text-left"
                    >
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                          Patient Full Name
                        </label>
                        <Input
                          required
                          placeholder="e.g. Alamin"
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          className="bg-slate-50/80 border-slate-100 text-slate-800 rounded-xl py-5 px-4 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500/50 outline-none animate-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                          Contact Number
                        </label>
                        <Input
                          required
                          type="tel"
                          placeholder="e.g. +880 17XX XXXXXX"
                          value={patientPhone}
                          onChange={(e) => setPatientPhone(e.target.value)}
                          className="bg-slate-50/80 border-slate-100 text-slate-800 rounded-xl py-5 px-4 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500/50 outline-none animate-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                            Preferred Date
                          </label>
                          <Input
                            required
                            type="date"
                            value={preferredDate}
                            onChange={(e) => setPreferredDate(e.target.value)}
                            className="bg-slate-50/80 border-slate-100 text-slate-850 rounded-xl py-5 px-4 focus-visible:ring-indigo-550/20 focus-visible:border-indigo-500/50 outline-none"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                            Preferred Time
                          </label>
                          <Input
                            required
                            type="time"
                            value={preferredTime}
                            onChange={(e) => setPreferredTime(e.target.value)}
                            className="bg-slate-50/80 border-slate-100 text-slate-850 rounded-xl py-5 px-4 focus-visible:ring-indigo-550/20 focus-visible:border-indigo-500/50 outline-none"
                          />
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
                          Book Slot
                        </Button>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="booking-ticket"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6 text-center"
                  >
                    <div className="mx-auto w-16 h-16 bg-[#ECEEFD] border border-indigo-100 rounded-full flex items-center justify-center animate-bounce">
                      <ShieldCheck className="h-8 w-8 text-[#4F46E5]" />
                    </div>

                    <div className="text-center space-y-1">
                      <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                        Booking Pass Generated
                      </h3>
                      <p className="text-slate-500 text-sm">
                        Your laboratory checkup pass is verified. Present this
                        pass at checkout.
                      </p>
                    </div>

                    {/* Digital Ticket Layout */}
                    <div className="p-6 rounded-[24px] bg-[#F8F9FE] border border-slate-100 text-slate-800 shadow-sm relative overflow-hidden text-left">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/50 rounded-bl-full pointer-events-none" />

                      <div className="flex justify-between items-center border-b border-slate-200/60 pb-4 mb-4">
                        <div>
                          <h4 className="text-[10px] uppercase tracking-widest text-[#4F46E5] font-extrabold">
                            Doc Dex Diagnostic Pass
                          </h4>
                          <p className="text-lg font-bold tracking-tight text-slate-900 mt-1">
                            {selectedTest?.name}
                          </p>
                        </div>
                        <Microscope className="h-6 w-6 text-[#4F46E5] shrink-0" />
                      </div>

                      <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-xs">
                        <div>
                          <span className="text-slate-400 font-extrabold uppercase tracking-wider block mb-0.5 text-[9px]">
                            Checkup Pass Code
                          </span>
                          <span className="text-sm font-bold text-[#4F46E5] font-mono tracking-wider">
                            {generatedBookingToken}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 font-extrabold uppercase tracking-wider block mb-0.5 text-[9px]">
                            Patient Name
                          </span>
                          <span className="text-sm font-bold text-slate-900 truncate block">
                            {patientName}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 font-extrabold uppercase tracking-wider block mb-0.5 text-[9px]">
                            Scheduled Slot
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-indigo-600 font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                            {preferredDate} @ {preferredTime}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 font-extrabold uppercase tracking-wider block mb-0.5 text-[9px]">
                            Pass Valid Until
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

export default DiagnosticsPage;
