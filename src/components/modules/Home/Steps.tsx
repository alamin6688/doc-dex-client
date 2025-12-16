"use client";
import {
  MessageSquare,
  Brain,
  Video,
  FileText,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "Describe Symptoms",
    description:
      "Share your health concerns through our intelligent AI assessment system.",
    icon: MessageSquare,
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-50 to-blue-100/50",
  },
  {
    id: 2,
    title: "Smart Matching",
    description:
      "AI analyzes and matches you with the perfect specialist instantly.",
    icon: Brain,
    gradient: "from-purple-500 to-purple-600",
    bgGradient: "from-purple-50 to-purple-100/50",
  },
  {
    id: 3,
    title: "Video Call",
    description:
      "Connect face-to-face with your doctor via HD video consultation.",
    icon: Video,
    gradient: "from-teal-500 to-teal-600",
    bgGradient: "from-teal-50 to-teal-100/50",
  },
  {
    id: 4,
    title: "Get Treatment",
    description:
      "Receive your personalized care plan and prescriptions digitally.",
    icon: FileText,
    gradient: "from-indigo-500 to-indigo-600",
    bgGradient: "from-indigo-50 to-indigo-100/50",
  },
];

export function Steps() {
  return (
    <section className="py-32 bg-linear-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
      {/* Modern background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(20,184,166,0.05),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-flex items-center gap-2 bg-linear-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-200/50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Simple Process
          </motion.div>

          <motion.h2
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="bg-linear-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent">
              How It Works
            </span>
          </motion.h2>

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-xl text-gray-600 font-light"
          >
            Four simple steps to connect with expert healthcare professionals
          </motion.p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Flowing connection line */}
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-1 bg-linear-to-r from-blue-200 via-purple-200 via-teal-200 to-indigo-200 rounded-full" />

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1 + 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative group"
            >
              <div className="relative bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${step.bgGradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  {/* Icon with modern gradient */}
                  <div className="relative mb-6 flex items-center justify-center">
                    <div
                      className={`w-20 h-20 bg-linear-to-br ${step.gradient} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                    >
                      <step.icon className="w-10 h-10 text-white" />
                    </div>

                    {/* Step number badge */}
                    {/* <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-sm font-bold text-gray-900">
                        {step.id}
                      </span>
                    </div> */}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-900 transition-colors items-center flex gap-2 justify-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-center">
                    {step.description}
                  </p>
                </div>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-6">
                    <ArrowRight className="w-6 h-6 text-gray-300 rotate-90" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
            delay: 0.7,
          }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 text-sm mb-4">Ready to get started?</p>
          <button className="group inline-flex items-center gap-3 bg-linear-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300">
            <Video className="w-5 h-5" />
            Start Your Consultation
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
