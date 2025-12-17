"use client";
import { Star, Quote, Video, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

type Review = {
  id: number;
  name: string;
  text: string;
  rating: number;
  color: string;
  initials: string;
  date: string;
  verified: boolean;
};
const reviews: Review[] = [
  {
    id: 1,
    name: "Amanda Peterson",
    text: "The AI matching system is incredible! Found me a cardiologist who perfectly understood my condition. The video quality was crystal clear and the doctor was very professional.",
    rating: 5,
    color: "from-rose-500 to-rose-600",
    initials: "AP",
    date: "2 weeks ago",
    verified: true,
  },
  {
    id: 2,
    name: "Robert Kim",
    text: "Doc Dex saved me hours of research. Within minutes, I was matched with a specialist who had experience with my specific symptoms. The entire process was seamless.",
    rating: 5,
    color: "from-blue-500 to-blue-600",
    initials: "RK",
    date: "1 month ago",
    verified: true,
  },
  {
    id: 3,
    name: "Maria Santos",
    text: "As a busy mom, video consultations are a lifesaver. Got my daughter checked by a pediatrician without leaving home. The AI symptom checker was surprisingly accurate!",
    rating: 5,
    color: "from-emerald-500 to-emerald-600",
    initials: "MS",
    date: "3 weeks ago",
    verified: true,
  },
];
const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};
export function Reviews() {
  return (
    <section
      id="reviews"
      className="py-32 bg-linear-to-b from-slate-50/50 to-white relative overflow-hidden container mx-auto"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.05),transparent_50%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
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
            }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="bg-linear-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Loved by Patients
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
              delay: 0.1,
            }}
            className="text-xl text-gray-600 max-w-2xl mx-auto font-light"
          >
            Real experiences from patients who received quality care
          </motion.p>
        </div>

        {/* Reviews Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-100px",
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6"
        >
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              variants={cardVariants}
              className="group relative bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-linear-to-br from-blue-50/30 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                {/* Quote icon with modern styling */}
                <div className="absolute -top-4 -right-4">
                  <div className="w-12 h-12 bg-linear-to-br from-blue-100 to-teal-100 rounded-2xl flex items-center justify-center rotate-6 group-hover:rotate-12 transition-transform duration-500">
                    <Quote className="w-6 h-6 text-blue-600" />
                  </div>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-semibold">
                    <Video className="w-3 h-3" />
                    Video Call
                  </div>
                  {review.verified && (
                    <div className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold">
                      <ThumbsUp className="w-3 h-3" />
                      Verified
                    </div>
                  )}
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  {review.text}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
                  <div
                    className={`w-12 h-12 bg-linear-to-br ${review.color} rounded-xl flex items-center justify-center shadow-lg`}
                  >
                    <span className="text-white font-bold text-sm">
                      {review.initials}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{review.name}</div>
                    <div className="text-sm text-gray-500">{review.date}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust badge */}
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
            delay: 0.4,
          }}
          className="text-center mt-12"
        >
          {/* <div className="inline-flex items-center gap-2 bg-linear-to-r from-green-50 to-emerald-50 border border-green-200/50 text-green-700 px-6 py-3 rounded-full text-sm font-semibold">
            <Star className="w-4 h-4 fill-green-600 text-green-600" />
            4.9/5 average rating from 1,200+ reviews
          </div> */}
        </motion.div>
      </div>
    </section>
  );
}
