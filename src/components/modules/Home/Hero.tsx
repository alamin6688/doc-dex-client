"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Video,
  Users,
  Monitor,
  Sparkles,
  ArrowRight,
  Heart,
  Activity,
  Pill,
  Stethoscope,
  Dna,
  Search,
} from "lucide-react";
import Link from "next/link";


export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  // Floating animation variants for 3D elements
  const floatingVariants: Variants = {
    animate: (custom: number) => ({
      y: [0, -20, 0],
      x: [0, custom * 10, 0],
      rotateX: [0, custom * 15, 0],
      rotateY: [0, -custom * 15, 0],
      rotateZ: [0, custom * 5, 0],
      transition: {
        duration: 4 + custom,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }),
  };
  const floatingElements = [
    {
      icon: Heart,
      color: "text-red-400",
      bg: "bg-red-100",
      position: {
        top: "15%",
        left: "10%",
      },
      delay: 0,
    },
    {
      icon: Activity,
      color: "text-blue-400",
      bg: "bg-blue-100",
      position: {
        top: "25%",
        right: "15%",
      },
      delay: 0.5,
    },
    {
      icon: Pill,
      color: "text-purple-400",
      bg: "bg-purple-100",
      position: {
        bottom: "30%",
        left: "8%",
      },
      delay: 1,
    },
    {
      icon: Stethoscope,
      color: "text-teal-400",
      bg: "bg-teal-100",
      position: {
        top: "60%",
        right: "12%",
      },
      delay: 1.5,
    },
    {
      icon: Dna,
      color: "text-pink-400",
      bg: "bg-pink-100",
      position: {
        bottom: "20%",
        right: "20%",
      },
      delay: 2,
    },
  ];
  return (
    <div className="w-full relative">
      {/* Radial Gradient Background from Bottom */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 90%, #fff 40%, #155DFC 100%)",
        }}
      />
      {/* Your Content/Components */}
      <section ref={containerRef} className="relative w-full  overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* 3D Floating Healthcare Elements */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            perspective: "1000px",
          }}
        >
          {floatingElements.map((element, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={floatingVariants}
              animate="animate"
              initial={{
                opacity: 0,
                scale: 0,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: element.delay,
                duration: 0.6,
              }}
              className="absolute"
              style={{
                ...element.position,
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className={`w-16 h-16 md:w-20 md:h-20 ${element.bg} rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-sm border border-white/20`}
              >
                <element.icon
                  className={`w-8 h-8 md:w-10 md:h-10 ${element.color}`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <motion.div
          style={{
            y,
            opacity,
          }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-white/40 shadow-lg">
              <Video className="w-4 h-4 text-blue-600" />
              <motion.span
                // variants={itemVariants}
                className="text-blue-700 text-xs sm:text-sm"
              >
                Online Video Consultations Available 24/7
              </motion.span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Connect with Doctors
              <br />
              <span className="text-blue-600">Instantly via Video Call</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get expert medical advice from the comfort of your home. Our
              AI-powered system matches you with the right specialist based on
              your symptoms, then connects you via secure video consultation.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.4,
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <Link href={`/consultation`}>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="group w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 py-4 shadow-lg shadow-blue-600/25 transition-all hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Explore Smart Doctor Matching
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.6,
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              {
                icon: Users,
                value: "10,000+",
                label: "Video Calls Daily",
                color: "bg-blue-100 text-blue-600",
              },
              {
                icon: Monitor,
                value: "500+",
                label: "Online Doctors",
                color: "bg-teal-100 text-teal-600",
              },
              {
                icon: Sparkles,
                value: "AI-Powered",
                label: "Smart Matching",
                color: "bg-purple-100 text-purple-600",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.8 + index * 0.1,
                }}
                whileHover={{
                  y: -5,
                  scale: 1.02,
                }}
                className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/40 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 ${stat.color} rounded-xl flex items-center justify-center`}
                  >
                    <stat.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="rgb(249, 250, 251)"
            />
          </svg>
        </div>
      </section>
    </div>
  );
}
