/* eslint-disable @next/next/no-img-element */
"use client";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Star, DollarSign, MessageCircle, Award } from "lucide-react";
interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  earned: string;
  verified: boolean;
}

const featuredDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Leslie Alexander",
    specialty: "Dental Surgery",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    rating: 4.9,
    earned: "45k+",
    verified: true,
  },
  {
    id: "2",
    name: "Dr. Kathryn Murphy",
    specialty: "Pediatric Medicine",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    rating: 4.8,
    earned: "52k+",
    verified: true,
  },
  {
    id: "3",
    name: "Dr. Robert Fox",
    specialty: "Gastroenterologist",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
    rating: 4.7,
    earned: "38k+",
    verified: true,
  },
  {
    id: "4",
    name: "Dr. Esther Howard",
    specialty: "Thoracic Surgeons",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    rating: 4.9,
    earned: "61k+",
    verified: true,
  },
  {
    id: "5",
    name: "Dr. Albert Flores",
    specialty: "Intern Neurologist",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop",
    rating: 4.6,
    earned: "42k+",
    verified: true,
  },
  {
    id: "6",
    name: "Dr. Jerome Bell",
    specialty: "Obstetrics & Gynecologists",
    image:
      "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?w=400&h=400&fit=crop",
    rating: 4.8,
    earned: "48k+",
    verified: true,
  },
  {
    id: "7",
    name: "Dr. Arlene McCoy",
    specialty: "Cardiologists",
    image:
      "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=400&h=400&fit=crop",
    rating: 4.9,
    earned: "55k+",
    verified: true,
  },
  {
    id: "8",
    name: "Dr. Jenny Wilson",
    specialty: "Intern Dermatologist",
    image:
      "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400&h=400&fit=crop",
    rating: 4.7,
    earned: "40k+",
    verified: true,
  },
];
const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};
const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export function FeaturedDoctors() {
  return (
    <section className="w-full bg-[#F9FAFB] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
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
          }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-blue-200/50 text-blue-600 text-sm font-semibold mb-4">
            <Award className="w-4 h-4" />
            TOP RATED PROFESSIONALS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Doctors
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Meet our top-rated healthcare professionals trusted by thousands of
            patients
          </p>
        </motion.div>

        {/* Doctors Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-100px",
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featuredDoctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="group relative"
            >
              {/* Glassmorphic Card */}
              <div className="relative overflow-hidden rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-300">
                {/* Doctor Image */}
                <div className="relative aspect-2/3 overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Verified Badge */}
                  {/* {doctor.verified && (
                    <motion.div
                      initial={{
                        scale: 0,
                      }}
                      animate={{
                        scale: 1,
                      }}
                      transition={{
                        delay: 0.2,
                        type: "spring",
                      }}
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shadow-lg"
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </motion.div>
                  )} */}
                </div>

                {/* Card Content - Glassmorphic Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-white/80 backdrop-blur-xl border-t border-white/60">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {doctor.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {doctor.specialty}
                  </p>

                  {/* Stats Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold text-gray-900">
                        {doctor.rating}
                      </span>
                      <span className="text-xs text-gray-500 ml-1">Rating</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-semibold text-gray-900">
                        {doctor.earned}
                      </span>
                      <span className="text-xs text-gray-500 ml-1">Earned</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    className="w-full bg-white hover:bg-blue-600 text-gray-900 hover:text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg border border-gray-200 hover:border-blue-600"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Get in touch
                  </motion.button>
                </div>
              </div>

              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10" />
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination Dots */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.5,
          }}
          className="flex justify-center gap-2 mt-12"
        >
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === 0
                  ? "bg-blue-600 w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
