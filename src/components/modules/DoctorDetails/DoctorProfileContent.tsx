"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IDoctor } from "@/types/doctor.interface";
import BookAppointmentDialog from "@/components/modules/Consultation/BookAppointmentDialog";
import DoctorReviews from "./DoctorReviews";
import { useState } from "react";
import {
  Briefcase,
  Calendar,
  GraduationCap,
  Hospital,
  Mail,
  MapPin,
  Phone,
  Star,
  Sparkles,
  ShieldCheck,
  CreditCard,
} from "lucide-react";

interface DoctorProfileContentProps {
  doctor: IDoctor;
}

const DoctorProfileContent = ({ doctor }: DoctorProfileContentProps) => {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const initials = doctor.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="font-sans relative">
      <div className="grid grid-cols-1 lg:grid-cols-[1.618fr_1fr] gap-8 items-start">
        {/* Left Column (61.8%) - Doctor Details & Credentials */}
        <div className="space-y-6 text-left">
          {/* Main Profile Header Card */}
          <Card className="border border-slate-150 rounded-[28px] overflow-hidden shadow-2xs bg-white p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Profile Avatar with custom drop shadow glow */}
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-tr from-[#6366F1] to-[#A855F7] rounded-full blur-xs opacity-40 animate-pulse" />
                <Avatar className="h-32 w-32 border-4 border-white shadow-md relative z-10 rounded-full">
                  {doctor.profilePhoto ? (
                    <AvatarImage
                      src={
                        typeof doctor.profilePhoto === "string"
                          ? doctor.profilePhoto
                          : undefined
                      }
                      alt={doctor.name}
                      className="object-cover"
                    />
                  ) : (
                    <AvatarFallback className="text-3xl bg-slate-550 font-bold text-white">
                      {initials}
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>

              {/* Doctor Details */}
              <div className="flex-1 space-y-4">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                      Dr. {doctor.name}
                    </h1>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[9px] font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Verified
                    </span>
                  </div>
                  <p className="text-slate-450 font-bold text-xs uppercase tracking-widest">
                    {doctor.designation}
                  </p>
                </div>

                {/* Specialties Badges */}
                {doctor.doctorSpecialties &&
                  doctor.doctorSpecialties.length > 0 && (
                    <div className="flex flex-wrap justify-center sm:justify-start gap-1.5">
                      {doctor.doctorSpecialties.map((specialty, idx) => (
                        <Badge
                          key={specialty.specialitiesId || idx}
                          className="bg-slate-100 hover:bg-slate-150 text-slate-655 font-bold text-[9px] uppercase tracking-wider border-none rounded-md px-2.5 py-0.5"
                        >
                          {specialty.specialities?.title || "Specialty"}
                        </Badge>
                      ))}
                    </div>
                  )}

                {/* Star rating and Active experience details */}
                <div className="flex items-center justify-center sm:justify-start gap-3.5 text-xs font-semibold text-slate-600 pt-1.5 border-t border-slate-100/60">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 rounded-full text-amber-700">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold">
                      {doctor.averageRating?.toFixed(1) || "4.8"}
                    </span>
                  </div>
                  <span className="text-slate-350">|</span>
                  <span className="text-slate-500">
                    {doctor.experience || 3} Years Active Practice
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Credentials Card */}
          <Card className="border border-slate-150 rounded-[28px] p-6 sm:p-8 shadow-2xs bg-white space-y-6">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest pb-3 border-b border-slate-100">
              Credentials & Professional Details
            </h3>
            <div className="space-y-4">
              {/* Workplace */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-50/70 text-[#4F46E5] flex items-center justify-center shrink-0">
                  <Hospital className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
                    Current Hospital Workplace
                  </span>
                  <span className="text-xs font-bold text-slate-700 block mt-0.5">
                    {doctor.currentWorkingPlace}
                  </span>
                </div>
              </div>

              {/* Registration Number */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-sky-50/70 text-[#0284C7] flex items-center justify-center shrink-0">
                  <Briefcase className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
                    Medical Board Registration
                  </span>
                  <span className="text-xs font-bold text-slate-700 block mt-0.5">
                    {doctor.registrationNumber}
                  </span>
                </div>
              </div>

              {/* Qualifications */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-rose-50/70 text-[#E11D48] flex items-center justify-center shrink-0">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
                    Education & Degrees
                  </span>
                  <span className="text-xs font-bold text-slate-700 block mt-0.5 leading-relaxed">
                    {doctor.qualification}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Patient Reviews Section */}
          <div className="pt-2">
            <DoctorReviews doctorId={doctor.id || ""} />
          </div>
        </div>

        {/* Right Column (38.2%) - Booking checkout card & Contacts */}
        <div className="lg:sticky lg:top-24 space-y-6 text-left shrink-0">
          {/* Booking pass purchase card */}
          <Card className="border border-slate-150 rounded-[28px] overflow-hidden shadow-xs bg-white p-6 sm:p-7 space-y-5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest pb-3.5 border-b border-slate-100 flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-[#4F46E5]" /> Booking Overview
            </h3>

            {/* Consultation Billing structure */}
            <div className="space-y-2.5 font-semibold text-xs text-slate-600 bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-slate-450">Consultation Fee</span>
                <span className="font-bold text-slate-800">
                  ${doctor.appointmentFee}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-450">Platform Charge</span>
                <span className="text-emerald-600 font-extrabold">Free</span>
              </div>
              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between font-bold text-sm">
                <span className="text-slate-900">Total Fee</span>
                <span className="text-[#4F46E5] text-base">
                  ${doctor.appointmentFee}
                </span>
              </div>
            </div>

            {/* Book slot CTA button */}
            <div className="space-y-3">
              <Button
                onClick={() => setShowScheduleModal(true)}
                className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white font-extrabold rounded-xl py-5 flex items-center justify-center gap-1.5 shadow-xs cursor-pointer text-xs h-10"
              >
                Book Appointment Slot
              </Button>
              <div className="flex items-center justify-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Secure
                Slot Reservation
              </div>
            </div>
          </Card>

          {/* Contact directory card */}
          <Card className="border border-slate-150 rounded-[28px] overflow-hidden shadow-2xs bg-white p-6 sm:p-7 space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest pb-3.5 border-b border-slate-100">
              Contact Channels
            </h3>
            <div className="space-y-3.5 text-xs font-semibold text-slate-600">
              {/* Email */}
              <div className="flex items-center gap-3">
                <Mail className="h-4.5 w-4.5 text-slate-400 shrink-0" />
                <span className="truncate">{doctor.email}</span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <Phone className="h-4.5 w-4.5 text-slate-400 shrink-0" />
                <span>{doctor.contactNumber}</span>
              </div>

              {/* Address details */}
              {doctor.address && (
                <div className="flex items-start gap-3 pt-2.5 border-t border-slate-100">
                  <MapPin className="h-4.5 w-4.5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed text-[11px] text-slate-500">
                    {doctor.address}
                  </span>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      <BookAppointmentDialog
        doctor={doctor}
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
      />
    </div>
  );
};

export default DoctorProfileContent;
