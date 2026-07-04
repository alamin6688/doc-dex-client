import DoctorProfileContent from "@/components/modules/DoctorDetails/DoctorProfileContent";
import { getDoctorById } from "@/services/admin/doctorManagement";

export const revalidate = 600;

const DoctorDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const result = await getDoctorById(id);
  
  return (
    <div className="w-full min-h-screen bg-[#F8F9FC] text-slate-800 font-sans py-12 relative overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/40 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-50/30 rounded-full blur-[80px] pointer-events-none z-0" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <DoctorProfileContent doctor={result.data} />
      </div>
    </div>
  );
};

export default DoctorDetailPage;
