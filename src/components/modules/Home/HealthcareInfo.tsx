/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Stethoscope,
  Heart,
  Brain,
  User,
  Ear,
  Activity,
  Droplet,
  Wind,
  Bone,
  Eye,
  Pill,
  Syringe,
  Scan,
  TestTube,
  Zap,
  BoxIcon,
} from "lucide-react";
import Image from "next/image";

const specialties = [
  {
    id: "ent",
    name: "ENT",
    icon: Ear,
    color: "bg-teal-100 text-teal-600",
  },
  {
    id: "cardiology",
    name: "Cardiology",
    icon: Heart,
    color: "bg-red-100 text-red-600",
  },
  {
    id: "neurology",
    name: "Neurology",
    icon: Brain,
    color: "bg-gray-800 text-white",
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    icon: Bone,
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: "pulmonology",
    name: "Pulmonology",
    icon: Wind,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "gastroenterology",
    name: "Gastroenterology",
    icon: Pill,
    color: "bg-green-100 text-green-600",
  },
];
const conditions = [
  {
    id: "nose-bleeding",
    name: "Nose Bleeding",
    icon: Droplet,
    color: "bg-red-100 text-red-600",
    specialtyId: "ent",
  },
  {
    id: "chest-pain",
    name: "Chest Pain",
    icon: Activity,
    color: "bg-orange-100 text-orange-600",
    specialtyId: "cardiology",
  },
  {
    id: "migraine",
    name: "Migraine",
    icon: Brain,
    color: "bg-pink-100 text-pink-600",
    specialtyId: "neurology",
  },
  {
    id: "knee-pain",
    name: "Knee Pain",
    icon: Activity,
    color: "bg-yellow-100 text-yellow-600",
    specialtyId: "orthopedics",
  },
  {
    id: "shortness-of-breath",
    name: "Shortness of Breath",
    icon: Wind,
    color: "bg-blue-100 text-blue-600",
    specialtyId: "pulmonology",
  },
  {
    id: "acid-reflux",
    name: "Acid Reflux",
    icon: Pill,
    color: "bg-green-100 text-green-600",
    specialtyId: "gastroenterology",
  },
];

const procedures = [
  {
    id: "nasal-endoscopy",
    name: "Nasal Endoscopy",
    icon: Scan,
    color: "bg-blue-100 text-blue-600",
    conditionId: "nose-bleeding",
  },
  {
    id: "ecg",
    name: "ECG Test",
    icon: Activity,
    color: "bg-purple-100 text-purple-600",
    conditionId: "chest-pain",
  },
  {
    id: "brain-mri",
    name: "Brain MRI",
    icon: Scan,
    color: "bg-indigo-100 text-indigo-600",
    conditionId: "migraine",
  },
  {
    id: "knee-xray",
    name: "Knee X-Ray",
    icon: Zap,
    color: "bg-yellow-100 text-yellow-600",
    conditionId: "knee-pain",
  },
  {
    id: "spirometry",
    name: "Spirometry Test",
    icon: Activity,
    color: "bg-green-100 text-green-600",
    conditionId: "shortness-of-breath",
  },
  {
    id: "upper-endoscopy",
    name: "Upper GI Endoscopy",
    icon: Scan,
    color: "bg-teal-100 text-teal-600",
    conditionId: "acid-reflux",
  },
];

const tabContent = {
  specialties,
  conditions,
  procedures,
};
export function HealthcareInfo() {
  const [activeTab, setActiveTab] = useState<
    "specialties" | "conditions" | "procedures"
  >("specialties");
  const [selectedItem, setSelectedItem] = useState("general");
  const currentContent = tabContent[activeTab];
  return (
    <section className="w-full bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Popular Searches Section */}
        <div className="mb-16">
          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-8"
          >
            Popular Searches on Docdex
          </motion.h1>

          <div className="flex gap-4 md:gap-8">
            {/* Sidebar Tabs */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="relative flex flex-col gap-2 min-w-[140px]"
            >
              {/* Animated indicator */}
              <motion.div
                layoutId="activeTab"
                className="absolute left-0 w-1 bg-blue-600 rounded-r-full"
                initial={false}
                animate={{
                  top:
                    activeTab === "specialties"
                      ? "0px"
                      : activeTab === "conditions"
                      ? "48px"
                      : "96px",
                  height: "40px",
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />

              <button
                onClick={() => setActiveTab("specialties")}
                className={`relative text-left px-4 py-2 rounded-lg transition-all ${
                  activeTab === "specialties"
                    ? "text-gray-900 font-semibold bg-blue-50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                Specialties
              </button>
              <button
                onClick={() => setActiveTab("conditions")}
                className={`relative text-left px-4 py-2 rounded-lg transition-all ${
                  activeTab === "conditions"
                    ? "text-gray-900 font-semibold bg-blue-50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                Conditions
              </button>
              <button
                onClick={() => setActiveTab("procedures")}
                className={`relative text-left px-4 py-2 rounded-lg transition-all ${
                  activeTab === "procedures"
                    ? "text-gray-900 font-semibold bg-blue-50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                Procedures
              </button>
            </motion.div>

            {/* Dynamic Content Grid */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -20,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4"
                >
                  {currentContent.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{
                        opacity: 0,
                        scale: 0.8,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        delay: index * 0.05,
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      }}
                      onClick={() => setSelectedItem(item.id)}
                      className={`flex flex-col items-center gap-3 p-4 rounded-xl transition-all hover:shadow-md hover:-translate-y-1 ${
                        selectedItem === item.id
                          ? "bg-white border-2 border-blue-500 shadow-sm"
                          : "bg-white border border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <motion.div
                        className={`w-16 h-16 rounded-full ${item.color} flex items-center justify-center`}
                        whileHover={{
                          scale: 1.1,
                          rotate: 5,
                        }}
                        whileTap={{
                          scale: 0.95,
                        }}
                      >
                        <item.icon className="w-8 h-8" />
                      </motion.div>
                      <span className="text-sm font-medium text-gray-900 text-center">
                        {item.name}
                      </span>
                    </motion.button>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Find Doctor Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-16">
          {/* Left Content */}
          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.2,
            }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Find the right doctor
              <br />
              right at your fingertips
            </h2>
            <p className="text-gray-600 mb-8">
              We gives you the tools and information you need to-
            </p>

            {/* Feature List */}
            <div className="space-y-6 mb-8">
              {[
                {
                  icon: Search,
                  color: "purple",
                  title: "Search Symptoms & Conditions",
                  description:
                    "Easily find doctors by searching for symptoms, conditions, or specialties.",
                },
                {
                  icon: User,
                  color: "blue",
                  title: "Appointment with the best doctor",
                  description:
                    "Conveniently schedule your appointment by phone or online when available.",
                },
                {
                  icon: Stethoscope,
                  color: "teal",
                  title: "Get consultant",
                  description:
                    "Learn what you need to know and which questions to ask your doctor.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.3 + index * 0.1,
                  }}
                  className="flex items-start gap-4"
                >
                  <div
                    className={`w-12 h-12 rounded-full bg-${feature.color}-100 flex items-center justify-center flex-shrink-0`}
                  >
                    <feature.icon
                      className={`w-6 h-6 text-${feature.color}-600`}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Doctor Image & Search */}
          <motion.div
            className="relative"
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.4,
            }}
          >
            {/* Doctor Image Circle */}
            {/* <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-blue-200 rounded-full opacity-30 blur-3xl"></div>
              <div className="relative aspect-square rounded-full overflow-hidden bg-linear-to-br from-blue-100 to-blue-100 p-8">
                 <Image
        src="https://i.postimg.cc/DzZw0yZ6/tablet-stethoscope-near-pills-organizers.jpg"
        alt="Professional Doctor"
        fill
        className="object-cover object-center rounded-full"
        // priority
      />
              </div> */}
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-blue-400 rounded-full opacity-30 blur-3xl"></div>
              <div className="relative aspect-square rounded-full overflow-hidden bg-linear-to-br from-blue-50 to-blue-100 p-8">
                <img
                  src="https://i.postimg.cc/DzZw0yZ6/tablet-stethoscope-near-pills-organizers.jpg"
                  alt="Professional Doctor"
                  className="w-full h-full object-cover object-center rounded-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
