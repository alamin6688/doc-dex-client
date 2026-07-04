import AIDoctorSuggestion from "@/components/modules/Consultation/AIDoctorSuggestion";
import DoctorGrid from "@/components/modules/Consultation/DoctorGrid";
import DoctorSearchFilters from "@/components/modules/Consultation/DoctorSearchFilter";
import ConsultationClientWrapper from "@/components/modules/Consultation/ConsultationClientWrapper";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { Badge } from "@/components/ui/badge";
import { queryStringFormatter } from "@/lib/formatters";
import { getDoctors } from "@/services/admin/doctorManagement";
import { getSpecialities } from "@/services/admin/specialitiesManagement";
import { Sparkles } from "lucide-react";
import { Suspense } from "react";

// ISR: Revalidate every 10 minutes for doctor listings
export const revalidate = 600;

const ConsultationPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  // Fetch doctors and specialties in parallel
  const [doctorsResponse, specialtiesResponse] = await Promise.all([
    getDoctors(queryString),
    getSpecialities(),
  ]);

  const doctors = doctorsResponse?.data || [];
  const specialties = specialtiesResponse?.data || [];

  return (
    <div className="w-full min-h-screen bg-[#F8F9FC] text-slate-800 font-sans py-12 relative overflow-hidden text-center">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/40 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-50/30 rounded-full blur-[80px] pointer-events-none z-0" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <ConsultationClientWrapper>
          {/* Header Section */}
          <div className="max-w-2xl mx-auto space-y-3.5 mb-8">
            <div className="inline-flex justify-center">
              <Badge className="bg-[#ECEEFD] text-[#4F46E5] border-none font-bold py-1.5 px-3.5 rounded-full text-[10px] uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5 mr-1.5 animate-pulse text-[#4F46E5]" /> Clinical Specialists Hub
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Find the Best Doctors You Need
            </h1>
            <p className="text-slate-500 text-sm max-w-lg mx-auto">
              Search and book slot appointments with our qualified healthcare professionals and verified specialists.
            </p>
          </div>

          {/* AI Doctor Suggestion */}
          <AIDoctorSuggestion />

          {/* Filters */}
          <div className="p-5 bg-white border border-slate-150 rounded-3xl shadow-2xs">
            <DoctorSearchFilters specialties={specialties} />
          </div>

          {/* Doctor Grid */}
          <Suspense fallback={<TableSkeleton columns={3} />}>
            <DoctorGrid doctors={doctors} />
          </Suspense>

          {/* Pagination */}
          <div className="pt-4">
            <TablePagination
              currentPage={doctorsResponse?.meta?.page || 1}
              totalPages={doctorsResponse?.meta?.totalPage || 1}
            />
          </div>
        </ConsultationClientWrapper>
      </div>
    </div>
  );
};

export default ConsultationPage;
