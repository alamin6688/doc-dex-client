/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Heart,
  HandHeart,
  Users,
  Building2,
  Award,
  Globe,
  Search,
  ArrowUpRight,
  ShieldCheck,
  Star,
  ExternalLink,
  MapPin,
  Sparkles,
  Calendar,
  Clock,
  CircleDollarSign,
  FlaskConical,
  Stethoscope,
  X,
} from "lucide-react";

// Mock Directory Data for Interactive NGOs Search
const mockNGOs = [
  {
    id: 1,
    name: "Sadhona Health Foundation",
    category: "Health & Wellness",
    description:
      "Provides free weekly health checkups, primary dental care, and essential medicines to remote communities.",
    rating: 4.9,
    location: "Sylhet, Bangladesh",
    impact: "12,000+ Treated",
    founded: 2018,
    featured: true,
  },
  {
    id: 2,
    name: "Niramoy Support Group",
    category: "Patient Support",
    description:
      "Secures financial sponsorships and emergency funds for cancer treatments and critical surgeries.",
    rating: 4.8,
    location: "Dhaka, Bangladesh",
    impact: "850+ Sponsored",
    founded: 2020,
    featured: true,
  },
  {
    id: 3,
    name: "Bishwas Care & Clinics",
    category: "Community Health",
    description:
      "Grassroots deployment of maternal health clinics and sanitation education in coastal areas.",
    rating: 4.7,
    location: "Khulna, Bangladesh",
    impact: "25,000+ Reached",
    founded: 2015,
    featured: false,
  },
  {
    id: 4,
    name: "Apex Medical Institute",
    category: "Medical Research",
    description:
      "Collaborates with global universities to research infectious disease prevention and vaccine supply chain.",
    rating: 4.9,
    location: "Dhaka, Bangladesh",
    impact: "14 Clinical Papers",
    founded: 2021,
    featured: false,
  },
  {
    id: 5,
    name: "Mukto Kunj Free Clinic",
    category: "Medical Facilities",
    description:
      "An urban modern free clinic delivering physical therapy, optical aids, and mental health counseling.",
    rating: 4.8,
    location: "Chittagong, Bangladesh",
    impact: "8,000+ Consultations",
    founded: 2019,
    featured: true,
  },
  {
    id: 6,
    name: "Green Hope International",
    category: "International Aid",
    description:
      "Globally funded medical mission sending mobile units to remote rural communities across the country.",
    rating: 4.9,
    location: "Rangpur, Bangladesh",
    impact: "50,000+ Immunized",
    founded: 2012,
    featured: false,
  },
  {
    id: 7,
    name: "Amar Shasthya Network",
    category: "Community Health",
    description:
      "Connecting remote villages to urban specialist doctors using custom telemedicine booths.",
    rating: 4.6,
    location: "Barishal, Bangladesh",
    impact: "5,000+ Digital Consults",
    founded: 2022,
    featured: false,
  },
  {
    id: 8,
    name: "Breathe Easy Association",
    category: "Patient Support",
    description:
      "Distributes free nebulizers, oxygen concentrators, and inhalers to underprivileged asthmatic children.",
    rating: 4.8,
    location: "Dhaka, Bangladesh",
    impact: "3,200+ Assisted",
    founded: 2017,
    featured: false,
  },
];

const categoryMetadata: Record<
  string,
  { icon: React.ComponentType<any>; color: string; bgGlow: string }
> = {
  "Health & Wellness": {
    icon: Heart,
    color: "text-[#6366F1]",
    bgGlow: "from-indigo-500/5 to-transparent",
  },
  "Patient Support": {
    icon: HandHeart,
    color: "text-[#A855F7]",
    bgGlow: "from-purple-500/5 to-transparent",
  },
  "Community Health": {
    icon: Users,
    color: "text-[#3B82F6]",
    bgGlow: "from-blue-500/5 to-transparent",
  },
  "Medical Facilities": {
    icon: Building2,
    color: "text-[#10B981]",
    bgGlow: "from-emerald-500/5 to-transparent",
  },
  "Medical Research": {
    icon: Award,
    color: "text-[#F59E0B]",
    bgGlow: "from-amber-500/5 to-transparent",
  },
  "International Aid": {
    icon: Globe,
    color: "text-[#EC4899]",
    bgGlow: "from-pink-500/5 to-transparent",
  },
};

// Animated Vector SVG representing connected healthcare networks
const NetworkAnimation = () => {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-md mx-auto p-4 rounded-3xl bg-[#F8F9FD] border border-slate-100 flex items-center justify-center relative overflow-hidden shrink-0"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
      <svg viewBox="0 0 400 200" className="w-full h-40 z-10">
        {/* Connection Lines */}
        <motion.path
          d="M 60 100 L 140 50 M 140 50 L 260 150 M 260 150 L 340 100 M 140 50 L 340 100 M 60 100 L 260 150"
          stroke="#E2E8F0"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          fill="none"
        />
        <motion.path
          d="M 60 100 L 140 50 M 140 50 L 260 150 M 260 150 L 340 100"
          stroke="url(#indigo-grad)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        {/* Gradients */}
        <defs>
          <linearGradient id="indigo-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>

        {/* Nodes */}
        <motion.circle
          cx="60"
          cy="100"
          r="7"
          fill="#A855F7"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="140"
          cy="50"
          r="9"
          fill="#6366F1"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        <motion.circle
          cx="260"
          cy="150"
          r="8"
          fill="#3B82F6"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.circle
          cx="340"
          cy="100"
          r="7"
          fill="#10B981"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{
            duration: 2.7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />

        {/* Decorative pulse rings */}
        <motion.circle
          cx="140"
          cy="50"
          r="18"
          stroke="#6366F1"
          strokeWidth="1"
          fill="none"
          animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.circle
          cx="260"
          cy="150"
          r="16"
          stroke="#3B82F6"
          strokeWidth="1"
          fill="none"
          animate={{ scale: [1, 1.7], opacity: [0.4, 0] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.5,
          }}
        />

        {/* Center Glowing Hub Icon */}
        <g transform="translate(190, 80)">
          <motion.circle
            cx="10"
            cy="10"
            r="16"
            fill="#ECEEFD"
            stroke="#6366F1"
            strokeWidth="1.5"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <path
            d="M 6 10 L 14 10 M 10 6 L 10 14"
            stroke="#6366F1"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </motion.div>
  );
};

const NGOsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [selectedNGO, setSelectedNGO] = useState<any>(null);
  const [submittedReferral, setSubmittedReferral] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [medicalCase, setMedicalCase] = useState("");
  const [generatedReferralToken, setGeneratedReferralToken] = useState("");
  const [validUntilDate, setValidUntilDate] = useState("");

  const categories = useMemo(
    () => ["All", ...Object.keys(categoryMetadata)],
    [],
  );

  const filteredNGOs = useMemo(() => {
    return mockNGOs.filter((ngo) => {
      const matchesSearch =
        ngo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ngo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ngo.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || ngo.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleModalClose = () => {
    setSelectedNGO(null);
    setSubmittedReferral(false);
    setPatientName("");
    setPatientPhone("");
    setMedicalCase("");
    setGeneratedReferralToken("");
    setValidUntilDate("");
  };

  const handleReferralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientPhone) return;
    const token = `DEX-NGO-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedReferralToken(token);

    const expiry = new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000,
    ).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    setValidUntilDate(expiry);

    setSubmittedReferral(true);
  };

  // Content render helper for customized layout per tab
  const renderCategoryLayoutContent = () => {
    switch (selectedCategory) {
      case "Health & Wellness":
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <motion.div
              variants={itemVariants}
              className="p-6 bg-[#F8F9FD] border border-slate-100 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#4F46E5] uppercase tracking-wider block">
                  Active Initiatives
                </span>
                <h4 className="text-lg font-bold text-slate-900">
                  Mobile Health Camps Timeline
                </h4>
                <p className="text-slate-500 text-xs">
                  Simulated clinical camps deploying local diagnostic devices in
                  remote villages.
                </p>
              </div>
              <div className="flex gap-2">
                <div className="bg-white border border-slate-150 py-2.5 px-4 rounded-xl text-center shadow-2xs">
                  <span className="text-sm font-bold text-emerald-600 block">
                    Active Camps
                  </span>
                  <span className="text-xs text-slate-500">14 Rural Hubs</span>
                </div>
                <div className="bg-white border border-slate-150 py-2.5 px-4 rounded-xl text-center shadow-2xs">
                  <span className="text-sm font-bold text-[#4F46E5] block">
                    Medicine Stock
                  </span>
                  <span className="text-xs text-slate-500">92% Subsidized</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <motion.div
                whileHover={{ y: -3 }}
                className="p-5 bg-white border border-slate-150 rounded-2xl flex gap-3 shadow-2xs"
              >
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl shrink-0 h-10 w-10 flex items-center justify-center">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-slate-800">
                    Primary Dental Checkups
                  </h5>
                  <p className="text-xs text-slate-500 mt-1">
                    Available at Sadhona Health Foundation hubs every Friday.
                  </p>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ y: -3 }}
                className="p-5 bg-white border border-slate-150 rounded-2xl flex gap-3 shadow-2xs"
              >
                <div className="p-2.5 bg-indigo-50 text-[#6366F1] rounded-xl shrink-0 h-10 w-10 flex items-center justify-center">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-slate-800">
                    Maternal Wellness Seminars
                  </h5>
                  <p className="text-xs text-slate-500 mt-1">
                    Free webinars and nutritional package distributions monthly.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        );

      case "Patient Support":
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <motion.div
              variants={itemVariants}
              className="p-6 bg-[#F8F9FD] border border-slate-100 rounded-2xl"
            >
              <span className="text-[10px] font-bold text-[#4F46E5] uppercase tracking-wider block mb-1">
                Financial Subsidy
              </span>
              <h4 className="text-lg font-bold text-slate-900 mb-3">
                Critical Surgery Matching Program
              </h4>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                    <span>Emergency Aid Fund Allocation</span>
                    <span className="text-[#4F46E5]">82% Disbursed</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "82%" }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                      className="bg-linear-to-r from-[#6366F1] to-[#A855F7] h-full rounded-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
                  <div className="flex items-center gap-2">
                    <CircleDollarSign className="h-4 w-4 text-[#A855F7]" />
                    <span className="text-slate-550">
                      Avg. Grant Size:{" "}
                      <strong className="text-slate-800">BDT 45,000</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#6366F1]" />
                    <span className="text-slate-550">
                      Approval window:{" "}
                      <strong className="text-slate-800">48-72 Hours</strong>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );

      case "Community Health":
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  label: "Villages Covered",
                  val: "180+",
                  sub: "Remote border sectors",
                },
                {
                  label: "Telehealth Booths",
                  val: "42 Units",
                  sub: "Fully operational",
                },
                {
                  label: "Community Officers",
                  val: "90 Staff",
                  sub: "Verify logs daily",
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -3 }}
                  className="p-5 bg-[#F8F9FD] border border-slate-100 rounded-2xl shadow-2xs"
                >
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {stat.label}
                  </span>
                  <span className="text-2xl font-bold text-[#4F46E5] mt-1 block">
                    {stat.val}
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-1">
                    {stat.sub}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case "Medical Facilities":
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div
              variants={itemVariants}
              className="p-6 bg-[#F8F9FD] border border-slate-100 rounded-2xl space-y-4"
            >
              <h4 className="text-sm font-extrabold text-slate-800">
                Clinic Availability Matrix
              </h4>
              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex justify-between py-1.5 border-b border-slate-200/50">
                  <span>Mukto Kunj Free Clinic (Chittagong)</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Open: 09:00 - 17:00
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-200/50">
                  <span>Physiotherapy Unit (Dhaka Hub)</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Open: 10:00 - 16:00
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );

      case "Medical Research":
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div
              variants={itemVariants}
              className="p-6 bg-[#F8F9FD] border border-slate-100 rounded-2xl space-y-4"
            >
              <div className="flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-[#A855F7]" />
                <h4 className="text-sm font-extrabold text-slate-800">
                  Active Epidemiological Trials
                </h4>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed">
                Researching vaccine supply networks and cold-chain integrity
                monitors with global institutions.
              </p>
              <div className="flex gap-2">
                <Badge className="bg-[#ECEEFD] text-[#4F46E5] border-none text-[10px] font-bold">
                  14 Papers Published
                </Badge>
                <Badge className="bg-[#ECEEFD] text-[#4F46E5] border-none text-[10px] font-bold">
                  5 Partner Universities
                </Badge>
              </div>
            </motion.div>
          </motion.div>
        );

      default:
        return null;
    }
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
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
              NGO Network Workspace
            </h1>
            <p className="text-slate-500 text-sm mt-1.5">
              Manage connection referrals, search directory listings, and
              request subsidized health services.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="bg-[#ECEEFD] text-[#4F46E5] hover:bg-[#ECEEFD] border-none font-bold py-1.5 px-3 rounded-full text-xs">
              <Sparkles className="h-3.5 w-3.5 mr-1 animate-pulse" /> Active
              Connection
            </Badge>
          </div>
        </motion.div>

        {/* Chrome Tab Style Navigation Bar */}
        <motion.div
          variants={itemVariants}
          style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
          className="flex items-end gap-1.5 overflow-x-auto px-4 pt-3 bg-slate-200/50 border-b border-slate-200 rounded-t-[28px] relative z-20 [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            const meta = categoryMetadata[category] || {
              icon: Globe,
              color: "text-[#6366F1]",
            };
            const Icon = meta.icon;

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-3.5 text-xs font-bold transition-all border-t border-x cursor-pointer select-none rounded-t-xl whitespace-nowrap flex items-center gap-2 relative ${
                  isActive
                    ? "bg-white text-[#4F46E5] border-slate-200/80 -mb-[1.5px] z-30"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/30 border-transparent z-10"
                }`}
              >
                <Icon
                  className={`h-3.5 w-3.5 ${isActive ? "text-[#4F46E5]" : "text-slate-400"}`}
                />
                <span>
                  {category === "All" ? "All Organizations" : category}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Main Content Workspace Card (Blends directly with the Chrome tabs above) */}
        <motion.div variants={itemVariants} className="w-full">
          <Card className="bg-white rounded-b-[28px] rounded-tr-[28px] rounded-t-none border-x border-b border-slate-200/80 p-8 md:p-10 shadow-xs relative overflow-hidden -mt-px z-10">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-[#6366F1] to-[#A855F7] hidden" />

            <div className="space-y-8">
              {/* Dynamic Content Transitions */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-8"
                >
                  {/* Custom Category Layout Content */}
                  {renderCategoryLayoutContent()}

                  {/* Visual Section: Only show SVG in the "All" view */}
                  {selectedCategory === "All" && (
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="show"
                      className="w-full flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-slate-100 pb-8"
                    >
                      <motion.div
                        variants={itemVariants}
                        className="space-y-3 max-w-md"
                      >
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                          Personalized Impact Network
                        </h2>
                        <p className="text-slate-500 text-sm leading-relaxed">
                          Our live coordination engine routes resources to
                          primary care clinics, regional pharmacies, and mobile
                          centers globally.
                        </p>
                      </motion.div>
                      <motion.div
                        variants={itemVariants}
                        className="w-full max-w-md shrink-0"
                      >
                        <NetworkAnimation />
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Sub-header inside main card */}
                  <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-[#4F46E5]" /> Directory
                      Index
                    </h3>

                    {/* Search Bar Input */}
                    <div className="relative w-full md:w-72">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        type="text"
                        placeholder="Search name, location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-[#F8F9FD] border-slate-100 text-slate-800 placeholder-slate-400 focus-visible:ring-indigo-500/20 rounded-xl py-5"
                      />
                    </div>
                  </div>

                  {/* NGO Directory Listings inside Workspace */}
                  <motion.div
                    layout
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="space-y-4"
                  >
                    <AnimatePresence mode="popLayout">
                      {filteredNGOs.length > 0 ? (
                        filteredNGOs.map((ngo) => {
                          const meta = categoryMetadata[ngo.category] || {
                            icon: Heart,
                            color: "text-[#6366F1]",
                            bgGlow: "from-indigo-500/5 to-transparent",
                          };

                          return (
                            <motion.div
                              key={ngo.id}
                              layout
                              variants={itemVariants}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="p-6 rounded-[24px] bg-white border border-slate-150 shadow-2xs hover:shadow-sm transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden group"
                            >
                              <div className="flex items-start gap-4">
                                {/* Avatar design matching visual reference profile initials */}
                                <div className="w-14 h-14 bg-linear-to-tr from-[#6366F1] to-[#A855F7] rounded-[18px] flex items-center justify-center text-white text-base font-bold shadow-md shrink-0 select-none">
                                  {ngo.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .slice(0, 2)
                                    .toUpperCase()}
                                </div>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <h4 className="text-base font-extrabold text-slate-900 group-hover:text-[#4F46E5] transition-colors">
                                      {ngo.name}
                                    </h4>
                                    {ngo.featured && (
                                      <Badge className="bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/10 border-none font-bold px-2 py-0.5 rounded-md text-[9px] uppercase tracking-wider">
                                        Featured
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-slate-550 text-xs leading-relaxed max-w-xl">
                                    {ngo.description}
                                  </p>
                                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-400 pt-1.5 font-semibold">
                                    <span className="flex items-center gap-1">
                                      <MapPin className="h-3.5 w-3.5 text-slate-350" />{" "}
                                      {ngo.location}
                                    </span>
                                    <span className="flex items-center gap-1 text-emerald-600 font-bold">
                                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />{" "}
                                      {ngo.impact}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Star className="h-3.5 w-3.5 text-amber-555" />{" "}
                                      {ngo.rating} Rating
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="shrink-0 w-full md:w-auto">
                                <Button
                                  onClick={() => setSelectedNGO(ngo)}
                                  className="w-full md:w-auto bg-[#4F46E5] hover:bg-[#4338CA] text-white font-extrabold rounded-xl py-5 px-5 flex items-center justify-center gap-2 shadow-xs cursor-pointer text-xs"
                                >
                                  Access Services
                                  <ArrowUpRight className="h-4 w-4" />
                                </Button>
                              </div>
                            </motion.div>
                          );
                        })
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="py-16 text-center"
                        >
                          <Globe className="h-10 w-10 text-slate-300 mx-auto mb-3 animate-pulse" />
                          <h3 className="text-base font-bold text-slate-650">
                            No organizations match your query
                          </h3>
                          <p className="text-slate-400 text-xs mt-1">
                            Try resetting your category filters or search
                            parameter.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Card>
        </motion.div>

        {/* Simulated settings card block 2: How Network Helps */}
        <motion.div variants={itemVariants} className="mt-8 w-full">
          <Card className="bg-white border-slate-200/80 rounded-[32px] p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-6 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#4F46E5]" /> How the NGO
              Network Helps
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Access Subsidized Clinics",
                  desc: "Generate referral verification tags on-demand and present them at clinical checkout counters for subsidy credits.",
                },
                {
                  title: "Specialized Medical Aid",
                  desc: "Apply directly for custom aids, wheelchairs, nebulizers, or cancer therapy funding packages hosted locally.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#F8F9FD] border border-slate-100 space-y-2"
                >
                  <h4 className="text-sm font-extrabold text-slate-900">
                    {item.title}
                  </h4>
                  <p className="text-slate-505 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Registration Banner - matches style in settings visual */}
        <motion.div
          variants={itemVariants}
          className="mt-8 w-full p-8 rounded-[32px] bg-linear-to-br from-white via-white to-indigo-500/5 border border-indigo-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-xl text-left">
            <Badge className="bg-[#ECEEFD] text-[#4F46E5] border-none font-bold rounded-md text-[9px] uppercase tracking-wider">
              Registration Open
            </Badge>
            <h3 className="text-xl font-bold text-slate-950">
              Are you a registered Healthcare NGO?
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Integrate your organization with Doc Dex's smart logistics
              framework. Reach verified beneficiaries, automate aid requests,
              and scale your social healthcare impact seamlessly.
            </p>
          </div>
          <div className="shrink-0 w-full md:w-auto">
            <Button
              size="lg"
              className="w-full md:w-auto bg-[#4F46E5] hover:bg-[#4338CA] text-white font-extrabold px-8 rounded-xl shadow-xs transition-all gap-2 flex items-center justify-center cursor-pointer"
            >
              Register Your NGO
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </motion.div>

      {/* Interactive Referral Modal matching user uploaded image */}
      <AnimatePresence>
        {selectedNGO && (
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
                {!submittedReferral ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="text-left space-y-1">
                      <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                        Access Services
                      </h3>
                      <p className="text-slate-500 text-sm">
                        Generate an instant digital referral pass to get free or
                        subsidized health services.
                      </p>
                    </div>

                    {/* Profile Picture style matching user uploaded image */}
                    <div className="flex items-center gap-4 p-1">
                      <div className="w-16 h-16 bg-linear-to-tr from-[#6366F1] to-[#A855F7] rounded-[20px] flex items-center justify-center text-white text-xl font-bold shadow-md shrink-0 select-none">
                        {selectedNGO?.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-base font-extrabold text-slate-800 tracking-tight">
                          {selectedNGO?.name}
                        </h4>
                        <span className="text-xs font-semibold text-[#6366F1] bg-[#ECEEFD] px-2.5 py-1 rounded-full mt-1 inline-block">
                          {selectedNGO?.category}
                        </span>
                      </div>
                    </div>

                    <form onSubmit={handleReferralSubmit} className="space-y-5">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                          Full Name
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
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                          Medical Case / Request Details
                        </label>
                        <textarea
                          placeholder="Tell us a little about the medical assistance required..."
                          rows={3}
                          value={medicalCase}
                          onChange={(e) => setMedicalCase(e.target.value)}
                          className="w-full rounded-xl border border-slate-100 bg-slate-50/80 p-4 text-sm focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500/50 text-slate-800 placeholder-slate-400 outline-none min-h-[90px] transition-all focus:bg-white"
                        />
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
                          Get Referral Pass
                        </Button>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="ticket"
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
                        Referral Pass Generated
                      </h3>
                      <p className="text-slate-500 text-sm">
                        Your digital verification pass is ready. Please save or
                        present this code to the clinic desk.
                      </p>
                    </div>

                    {/* Digital Ticket Layout - styled to match light workspace */}
                    <div className="p-6 rounded-[24px] bg-[#F8F9FE] border border-slate-100 text-slate-800 shadow-sm relative overflow-hidden text-left">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full pointer-events-none" />

                      <div className="flex justify-between items-center border-b border-slate-200/60 pb-4 mb-4">
                        <div>
                          <h4 className="text-[10px] uppercase tracking-widest text-[#4F46E5] font-extrabold">
                            Doc Dex Referral Pass
                          </h4>
                          <p className="text-lg font-bold tracking-tight text-slate-900 mt-1">
                            {selectedNGO?.name}
                          </p>
                        </div>
                        {selectedNGO &&
                          React.createElement(
                            categoryMetadata[selectedNGO.category]?.icon ||
                              Heart,
                            {
                              className: "h-6 w-6 text-[#4F46E5] shrink-0",
                            },
                          )}
                      </div>

                      <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-xs">
                        <div>
                          <span className="text-slate-400 font-extrabold uppercase tracking-wider block mb-0.5 text-[9px]">
                            Verification Code
                          </span>
                          <span className="text-sm font-bold text-[#4F46E5] font-mono tracking-wider">
                            {generatedReferralToken}
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
                            Status
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Verified Active
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

export default NGOsPage;
