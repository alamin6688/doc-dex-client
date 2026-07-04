import { Skeleton } from "@/components/ui/skeleton";
import DoctorCardSkeleton from "./DoctorCardSkeleton";

/** Full-page skeleton that mirrors every section of the consultation page */
export default function ConsultationPageSkeleton() {
  return (
    <div className="space-y-8">

      {/* ── 1. Hero Header ── */}
      <div className="max-w-2xl mx-auto space-y-3.5 mb-8 text-center">
        {/* Badge pill */}
        <div className="inline-flex justify-center">
          <Skeleton className="h-6 w-44 rounded-full" />
        </div>
        {/* h1 */}
        <Skeleton className="h-10 w-3/4 mx-auto rounded-xl" />
        <Skeleton className="h-4 w-96 mx-auto rounded-md" />
      </div>

      {/* ── 2. AI Doctor Suggestion card ── */}
      <div className="md:w-3/4 mx-auto">
        <div className="bg-white border border-slate-150 rounded-2xl p-6 space-y-4 shadow-sm">
          {/* Textarea area */}
          <Skeleton className="w-full h-24 rounded-xl" />
          {/* Char counter row */}
          <div className="flex justify-between">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-36" />
          </div>
          {/* Button */}
          <Skeleton className="w-full h-11 rounded-xl bg-indigo-100" />
        </div>
      </div>

      {/* ── 3. Filters bar ── */}
      <div className="p-5 bg-white border border-slate-150 rounded-3xl shadow-2xs">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center flex-wrap">
          {/* Search input */}
          <Skeleton className="h-10 flex-1 min-w-[200px] rounded-xl" />
          {/* Specialty select */}
          <Skeleton className="h-10 w-48 rounded-xl" />
          {/* Sort select */}
          <Skeleton className="h-10 w-44 rounded-xl" />
          {/* Experience select */}
          <Skeleton className="h-10 w-36 rounded-xl" />
          {/* Reset button */}
          <Skeleton className="h-10 w-24 rounded-xl" />
        </div>
      </div>

      {/* ── 4. Doctor card grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <DoctorCardSkeleton key={i} />
        ))}
      </div>

      {/* ── 5. Pagination ── */}
      <div className="flex justify-center items-center gap-2 pt-4">
        <Skeleton className="h-9 w-9 rounded-lg" />
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-9 w-9 rounded-lg" />
        ))}
        <Skeleton className="h-9 w-9 rounded-lg" />
      </div>

    </div>
  );
}
