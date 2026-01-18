/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { IDoctor } from "@/types/doctor.interface";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Star,
  DollarSign,
  MessageCircle,
  Award,
  ArrowRight,
} from "lucide-react";
import { Suspense } from "react";
import DoctorGrid from "../Consultation/DoctorGrid";
import Link from "next/link";

export const revalidate = 600;


// interface Doctor {
//   id: string;
//   name: string;
//   specialty: string;
//   image: string;
//   rating: number;
//   earned: string;
//   verified: boolean;
// }

// const featuredDoctors: Doctor[] = [
//   {
//     id: "1",
//     name: "Dr. Leslie Alexander",
//     specialty: "Dental Surgery",
//     image:
//       "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
//     rating: 4.9,
//     earned: "45k+",
//     verified: true,
//   },
//   {
//     id: "2",
//     name: "Dr. Kathryn Murphy",
//     specialty: "Pediatric Medicine",
//     image:
//       "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
//     rating: 4.8,
//     earned: "52k+",
//     verified: true,
//   },
//   {
//     id: "3",
//     name: "Dr. Robert Fox",
//     specialty: "Gastroenterologist",
//     image:
//       "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
//     rating: 4.7,
//     earned: "38k+",
//     verified: true,
//   },
//   {
//     id: "4",
//     name: "Dr. Esther Howard",
//     specialty: "Thoracic Surgeons",
//     image:
//       "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
//     rating: 4.9,
//     earned: "61k+",
//     verified: true,
//   },
//   {
//     id: "5",
//     name: "Dr. Albert Flores",
//     specialty: "Intern Neurologist",
//     image:
//       "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop",
//     rating: 4.6,
//     earned: "42k+",
//     verified: true,
//   },
//   {
//     id: "6",
//     name: "Dr. Jerome Bell",
//     specialty: "Obstetrics & Gynecologists",
//     image:
//       "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?w=400&h=400&fit=crop",
//     rating: 4.8,
//     earned: "48k+",
//     verified: true,
//   },
//   {
//     id: "7",
//     name: "Dr. Arlene McCoy",
//     specialty: "Cardiologists",
//     image:
//       "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=400&h=400&fit=crop",
//     rating: 4.9,
//     earned: "55k+",
//     verified: true,
//   },
//   {
//     id: "8",
//     name: "Dr. Jenny Wilson",
//     specialty: "Intern Dermatologist",
//     image:
//       "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400&h=400&fit=crop",
//     rating: 4.7,
//     earned: "40k+",
//     verified: true,
//   },
// ];

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
// const cardVariants: Variants = {
//   hidden: {
//     opacity: 0,
//     y: 30,
//   },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       type: "spring",
//       stiffness: 100,
//       damping: 15,
//     },
//   },
// };

export function FeaturedDoctors({ doctors }: { doctors: IDoctor[] }) {
  return (
    <section className="w-full bg-[#F9FAFB] py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
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
        // className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Suspense fallback={<TableSkeleton columns={3} />}>
            <DoctorGrid doctors={doctors} />
          </Suspense>
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
              View More
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>{" "}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
