/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { IDoctor } from "@/types/doctor.interface";
import { Clock, Eye, MapPin, Star, Stethoscope } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import BookAppointmentDialog from "./BookAppointmentDialog";

interface DoctorCardProps {
  doctor: IDoctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  return (
    <div className="h-full font-sans">
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white border border-slate-150 rounded-[28px] flex flex-col justify-between h-full group hover:border-indigo-150 p-0 gap-0">
        <CardHeader className="p-0 rounded-t-[27px] overflow-hidden">
          {/* Doctor Avatar/Profile Photo Banner */}
          <div className="relative w-full h-64 bg-slate-50 overflow-hidden rounded-t-[27px]">
            {/* Pulsing Availability Status Tag */}
            <div className="absolute top-4 left-4 z-20">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/90 backdrop-blur-md rounded-full shadow-2xs text-[9px] font-bold uppercase text-white tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Available Today
              </span>
            </div>

            {/* Decorative Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 via-transparent to-transparent opacity-60 z-10 rounded-t-[27px]" />
            <img
              src={(doctor.profilePhoto as string) || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=640"}
              alt={doctor.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-[27px]"
            />
            <div className="absolute top-4 right-4 z-20">
              <div className="flex items-center gap-1 px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-full shadow-2xs border border-slate-100">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="text-[11px] font-bold text-slate-800">
                  {doctor.averageRating?.toFixed(1) || "4.8"}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-5 px-5 text-left">
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-0.5">
                <h4 className="text-base font-bold text-slate-900  leading-tight">
                  Dr. {doctor.name}
                </h4>
                <span className="inline-flex items-center text-slate-400 font-extrabold text-[9px] uppercase tracking-wider">
                  {doctor.designation}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
                  Fee
                </span>
                <span className="text-emerald-600 font-bold text-base">
                  ${doctor.appointmentFee}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-4 px-5 pb-4 space-y-4 text-left flex-1 flex flex-col justify-between">
          {/* Structured 2x2 Grid of Doctor Specs */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-3.5 pt-3.5 border-t border-slate-100">
            {/* Experience Item */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-50/70 text-[#4F46E5] flex items-center justify-center shrink-0">
                <Clock className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
                  Experience
                </span>
                <span className="text-xs font-bold text-slate-700 truncate block">
                  {doctor.experience || 3} Years
                </span>
              </div>
            </div>

            {/* Location Item */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-sky-50/70 text-[#0284C7] flex items-center justify-center shrink-0">
                <MapPin className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
                  Location
                </span>
                <span className="text-xs font-bold text-slate-700 truncate block">
                  {doctor.currentWorkingPlace?.split(",")?.[0] || "Dhaka"}
                </span>
              </div>
            </div>

            {/* Patients Score (Calculated realistically) */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-rose-50/70 text-[#E11D48] flex items-center justify-center shrink-0">
                <Star className="h-4 w-4 fill-rose-500 text-rose-500" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
                  Feedback
                </span>
                <span className="text-xs font-bold text-slate-700 truncate block">
                  {doctor.averageRating ? Math.floor(doctor.averageRating * 20 + 10) : 96}% Positive
                </span>
              </div>
            </div>

            {/* Specialty Badge representation */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50/70 text-emerald-600 flex items-center justify-center shrink-0">
                <Stethoscope className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
                  Specialty
                </span>
                <span className="text-xs font-bold text-slate-700 truncate block">
                  {doctor.doctorSpecialties?.[0]?.specialities?.title || "General"}
                </span>
              </div>
            </div>
          </div>

          {/* Qualifications description block */}
          <div className="space-y-1 pt-3.5 border-t border-slate-100 flex-1">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
              Qualifications
            </span>
            <p className="text-slate-500 text-[11px] leading-relaxed font-semibold">
              {doctor.qualification}
            </p>
          </div>

          {/* Specialties List Badges */}
          {doctor.doctorSpecialties && doctor.doctorSpecialties.length > 1 && (
            <div className="flex flex-wrap gap-1 pt-1.5 border-t border-slate-100/50">
              {doctor.doctorSpecialties.slice(1, 4).map((specialty, idx) => (
                <Badge
                  key={specialty.specialitiesId || idx}
                  className="bg-slate-50 hover:bg-slate-100 text-slate-550 font-bold text-[9px] uppercase tracking-wider border-none rounded-md px-2 py-0.5"
                >
                  {specialty.specialities?.title}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>

        <CardFooter className="p-5 border-t border-slate-100 flex gap-3">
          <Link className="flex-1" href={`/consultation/doctor/${doctor.id}`}>
            <Button
              variant="outline"
              className="w-full border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-slate-655 font-extrabold rounded-xl py-4 flex items-center justify-center gap-1.5 cursor-pointer text-xs h-9"
            >
              <Eye className="h-4 w-4" />
              Details
            </Button>
          </Link>
          <Button
            onClick={() => setShowScheduleModal(true)}
            className="flex-1 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-extrabold rounded-xl py-4 flex items-center justify-center gap-1.5 shadow-xs cursor-pointer text-xs h-9"
          >
            Book Slot
          </Button>
        </CardFooter>
      </Card>

      <BookAppointmentDialog
        doctor={doctor}
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
      />
    </div>
  );
}
