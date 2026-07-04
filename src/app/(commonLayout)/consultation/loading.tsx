import ConsultationPageSkeleton from "@/components/modules/Consultation/ConsultationPageSkeleton";

/**
 * Next.js route-level loading UI for /consultation.
 * Displayed instantly while the page server-fetches doctors + specialties.
 * Matches the exact background, padding and container of the real page.
 */
export default function ConsultationLoading() {
  return (
    <div className="w-full min-h-screen bg-[#F8F9FC] font-sans py-12 relative overflow-hidden">
      {/* Mirror the page's decorative blur blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/40 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-50/30 rounded-full blur-[80px] pointer-events-none z-0" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <ConsultationPageSkeleton />
      </div>
    </div>
  );
}
