import { StatCardProps } from "@/types/heroProps";
import {
  Video,
  ArrowRight,
  Users,
  Monitor,
  Brain,
  BookText,
} from "lucide-react";

function StatCard({ icon, value, label, bgColor, iconColor }: StatCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex items-center gap-6">
      <div className={`${bgColor} rounded-xl p-3 shrink-0`}>
        <div className={iconColor}>{icon}</div>
      </div>
      <div>
        <p className="text-gray-900 mb-1">{value}</p>
        <p className="text-gray-500 text-xs">{label}</p>
      </div>
    </div>
  );
}

export default function Hero() {
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
      <section className="relative  w-full overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
        {/* Decorative blur elements */}
        <div
          className="absolute top-20 right-[10%] w-80 h-80 bg-blue-200/40 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Content container */}
        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 mb-8 sm:mb-12">
              <Video className="w-4 h-4 text-blue-700" strokeWidth={2} />
              <span className="text-blue-700 text-xs sm:text-sm">
                Online Video Consultations Available 24/7
              </span>
            </div>

            {/* Heading */}
            <h1 className="mb-6 sm:mb-8">
              <span className="block text-3xl md:text-4xl font-bold text-gray-900">
                Connect with Doctors
              </span>
              <span className="block text-3xl md:text-4xl pt-1 font-bold text-blue-600">
                Instantly via Video Call
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
              Get expert medical advice from the comfort of your home. Our
              AI-powered system matches you with the right specialist based on
              your symptoms, then connects you via secure video consultation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 sm:mb-16">
              <button className="group w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 py-4 shadow-lg shadow-blue-600/25 transition-all hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5 flex items-center justify-center gap-2">
                <Video className="w-5 h-5" strokeWidth={2} />
                <span>Start Video Consultation</span>
                <ArrowRight
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  strokeWidth={2}
                />
              </button>
              <button
                className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl px-8 py-4 transition-all hover:border-gray-300
            flex items-center justify-center gap-2"
              >
                <BookText className="w-5 h-5 text-blue-600" strokeWidth={2} />
                <span>Book Appoinment</span>
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
              <StatCard
                icon={<Users className="w-6 h-6" strokeWidth={2} />}
                value="10,000+"
                label="Video Calls Daily"
                bgColor="bg-blue-100"
                iconColor="text-blue-600"
              />
              <StatCard
                icon={<Monitor className="w-6 h-6" strokeWidth={2} />}
                value="500+"
                label="Online Doctors"
                bgColor="bg-teal-100"
                iconColor="text-teal-600"
              />
              <StatCard
                icon={<Brain className="w-6 h-6" strokeWidth={2} />}
                value="AI-Powered"
                label="Smart Matching"
                bgColor="bg-purple-100"
                iconColor="text-purple-600"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
