import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function DoctorCardSkeleton() {
  return (
    <div className="h-full font-sans">
      <Card className="overflow-hidden bg-white border border-slate-150 rounded-[28px] flex flex-col justify-between h-full p-0 gap-0">

        {/* ── Banner image area (h-64 like the real card) ── */}
        <CardHeader className="p-0 rounded-t-[27px] overflow-hidden">
          <div className="relative w-full h-64 bg-slate-100 rounded-t-[27px]">
            <Skeleton className="w-full h-full rounded-t-[27px]" />

            {/* Availability badge pill — top-left */}
            <div className="absolute top-4 left-4">
              <Skeleton className="h-5 w-28 rounded-full" />
            </div>

            {/* Rating pill — top-right */}
            <div className="absolute top-4 right-4">
              <Skeleton className="h-5 w-14 rounded-full" />
            </div>
          </div>

          {/* Name / Designation + Fee row */}
          <div className="pt-5 px-5 pb-1 flex justify-between items-start gap-4">
            <div className="space-y-1.5 flex-1">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-2.5 w-24" />
            </div>
            <div className="space-y-1.5 text-right">
              <Skeleton className="h-2.5 w-6 ml-auto" />
              <Skeleton className="h-4 w-14" />
            </div>
          </div>
        </CardHeader>

        {/* ── 2×2 Spec grid ── */}
        <CardContent className="pt-4 px-5 pb-4 space-y-4 flex-1 flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-x-3 gap-y-3.5 pt-3.5 border-t border-slate-100">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-2.5">
                {/* Colored icon box */}
                <Skeleton className="w-8 h-8 rounded-xl shrink-0" />
                <div className="space-y-1 flex-1 min-w-0">
                  <Skeleton className="h-2 w-14" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            ))}
          </div>

          {/* Qualifications block */}
          <div className="space-y-1.5 pt-3.5 border-t border-slate-100">
            <Skeleton className="h-2 w-20" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
          </div>
        </CardContent>

        {/* ── Footer: Details + Book Slot buttons ── */}
        <CardFooter className="p-5 border-t border-slate-100 flex gap-3">
          <Skeleton className="flex-1 h-9 rounded-xl" />
          <Skeleton className="flex-1 h-9 rounded-xl bg-indigo-100" />
        </CardFooter>

      </Card>
    </div>
  );
}
