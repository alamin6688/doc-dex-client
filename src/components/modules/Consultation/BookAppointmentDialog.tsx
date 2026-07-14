"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IDoctor } from "@/types/doctor.interface";
import { IDoctorSchedule } from "@/types/schedule.interface";
import { format } from "date-fns";
import { Calendar, Clock, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface BookAppointmentDialogProps {
  doctor: IDoctor;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookAppointmentDialog({
  doctor,
  isOpen,
  onClose,
}: BookAppointmentDialogProps) {
  const router = useRouter();
  const doctorSchedules = doctor.doctorSchedules || [];
  const [selectedSchedule, setSelectedSchedule] =
    useState<IDoctorSchedule | null>(null);

  const handleCloseModal = () => {
    setSelectedSchedule(null);
    onClose();
  };

  const initials = doctor.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const groupSchedulesByDate = () => {
    const grouped: Record<string, IDoctorSchedule[]> = {};

    doctorSchedules.forEach((schedule) => {
      if (!schedule.schedule?.startDateTime) return;

      // Filter out booked slots
      if (schedule.isBooked) return;

      // Filter out slots that have already passed the current date/time
      const startTime = new Date(schedule.schedule.startDateTime);
      if (startTime < new Date()) return;

      const startDate = new Date(schedule.schedule.startDateTime)
        .toISOString()
        .split("T")[0];

      if (startDate) {
        if (!grouped[startDate]) {
          grouped[startDate] = [];
        }
        grouped[startDate].push(schedule);
      }
    });

    return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
  };

  const groupedSchedules = groupSchedulesByDate();

  // Check if we have schedules but no schedule data (API issue)
  const hasSchedulesWithoutData =
    doctorSchedules.length > 0 && groupedSchedules.length === 0;

  const handleContinue = () => {
    if (selectedSchedule) {
      router.push(
        `/dashboard/book-appointment/${doctor.id}/${selectedSchedule.scheduleId}`,
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="max-w-2xl max-h-[85vh] rounded-[28px] border border-slate-150 p-6 sm:p-7 bg-white shadow-xl flex flex-col gap-5 overflow-hidden">
        {/* Header Panel */}
        <DialogHeader className="text-left pb-4 border-b border-slate-100 flex flex-col gap-1 shrink-0">
          <DialogTitle className="text-lg font-bold text-slate-900 tracking-tight">
            Book Appointment Slot
          </DialogTitle>
          <DialogDescription className="text-slate-400 text-xs">
            Select an available time slot for your consultation with Dr.{" "}
            {doctor.name}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 flex-1 overflow-y-auto min-h-0 pr-1">
          {/* Doctor Info Mini Details Card */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-150 rounded-2xl text-left">
            <Avatar className="h-12 w-12 border border-slate-200 shadow-2xs rounded-full">
              <AvatarImage
                src={
                  typeof doctor.profilePhoto === "string"
                    ? doctor.profilePhoto
                    : undefined
                }
                alt={doctor.name}
              />
              <AvatarFallback className="text-sm bg-slate-200 text-slate-700 font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-extrabold text-slate-900 truncate">
                Dr. {doctor.name}
              </h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                {doctor.designation}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
                Consultation Fee
              </span>
              <span className="text-[#4F46E5] font-bold text-base">
                ${doctor.appointmentFee}
              </span>
            </div>
          </div>

          {/* Schedules list & grids */}
          {hasSchedulesWithoutData ? (
            <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
              <Calendar className="h-10 w-10 mx-auto text-slate-300 mb-3 animate-pulse" />
              <p className="text-slate-550 font-extrabold text-xs">
                Schedule data not available
              </p>
              <p className="text-[10px] text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                The doctor has active schedules defined, but detailed start/end
                slot parameters are not loaded.
              </p>
            </div>
          ) : groupedSchedules.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
              <Calendar className="h-10 w-10 mx-auto text-slate-300 mb-3 animate-pulse" />
              <p className="text-slate-550 font-extrabold text-xs">
                No available slots at the moment
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                Please check back later or view alternate clinics list.
              </p>
            </div>
          ) : (
            <ScrollArea className="h-[280px] pr-3">
              <div className="space-y-5 text-left">
                {groupedSchedules.map(([date, dateSchedules]) => (
                  <div key={date} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-[#4F46E5] shrink-0" />
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        {format(new Date(date), "EEEE, MMMM d, yyyy")}
                      </h4>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {dateSchedules.map((schedule) => {
                        const startTime = schedule.schedule?.startDateTime
                          ? new Date(schedule.schedule.startDateTime)
                          : null;
                        const isSelected =
                          selectedSchedule?.scheduleId === schedule.scheduleId;

                        return (
                          <Button
                            key={schedule.scheduleId}
                            onClick={() => setSelectedSchedule(schedule)}
                            variant="outline"
                            className={`h-auto py-2.5 px-4 justify-start flex items-center gap-2 cursor-pointer transition-all rounded-xl text-xs font-bold border ${
                              isSelected
                                ? "bg-[#ECEEFD] border-[#4F46E5] text-[#4F46E5] shadow-2xs font-extrabold scale-[0.98]"
                                : "bg-white border-slate-200 text-slate-655 hover:bg-slate-50 hover:border-slate-350"
                            }`}
                          >
                            <Clock
                              className={`h-4 w-4 shrink-0 ${isSelected ? "text-[#4F46E5]" : "text-slate-400"}`}
                            />
                            <span>
                              {startTime ? format(startTime, "h:mm a") : "N/A"}
                            </span>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        {/* Footer Actions */}
        <DialogFooter className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Vetted
            Reservation
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              onClick={handleCloseModal}
              variant="outline"
              className="flex-1 sm:flex-initial border-slate-200 hover:bg-slate-50 text-slate-500 font-extrabold rounded-xl px-5 h-9 text-xs cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={handleContinue}
              disabled={!selectedSchedule}
              className="flex-1 sm:flex-initial bg-[#4F46E5] hover:bg-[#4338CA] text-white font-extrabold rounded-xl px-6 h-9 text-xs cursor-pointer shadow-xs disabled:opacity-50"
            >
              Confirm & Continue
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
