import { HeartPulse, Brain, Bone, Baby } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import {
  ThreeDScrollTriggerContainer,
  ThreeDScrollTriggerRow,
} from "@/components/lightswind/3d-scroll-trigger";
import Link from "next/link";

const specialists = [
  {
    name: "Cardiology",
    icon: HeartPulse,
    bgColor: "bg-red-100",
    iconColor: "text-red-500",
  },
  {
    name: "Neurology",
    icon: Brain,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-500",
  },
  {
    name: "Orthopedic",
    icon: Bone,
    bgColor: "bg-pink-100",
    iconColor: "text-pink-500",
  },
  {
    name: "Pediatric",
    icon: Baby,
    bgColor: "bg-green-100",
    iconColor: "text-green-500",
  },
  {
    name: "Dermatology",
    icon: HeartPulse,
    bgColor: "bg-yellow-100",
    iconColor: "text-yellow-500",
  },
  {
    name: "Gastroenterology",
    icon: Brain,
    bgColor: "bg-orange-100",
    iconColor: "text-orange-500",
  },
  {
    name: "Ophthalmology",
    icon: Bone,
    bgColor: "bg-indigo-100",
    iconColor: "text-indigo-500",
  },
  {
    name: "Psychiatry",
    icon: Brain,
    bgColor: "bg-purple-100",
    iconColor: "text-purple-500",
  },
  {
    name: "ENT (Ear, Nose, Throat)",
    icon: Baby,
    bgColor: "bg-teal-100",
    iconColor: "text-teal-500",
  },
  {
    name: "Urology",
    icon: HeartPulse,
    bgColor: "bg-cyan-100",
    iconColor: "text-cyan-500",
  },
  {
    name: "Endocrinology",
    icon: Brain,
    bgColor: "bg-lime-100",
    iconColor: "text-lime-500",
  },
  {
    name: "Pulmonology",
    icon: HeartPulse,
    bgColor: "bg-sky-100",
    iconColor: "text-sky-500",
  },
  {
    name: "Rheumatology",
    icon: Bone,
    bgColor: "bg-rose-100",
    iconColor: "text-rose-500",
  },
];

const Specialities = () => {
  return (
    <section className="py-24 mt-24 md:mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              Our Specialist
            </h2>
            <p className="text-muted-foreground max-w-md mt-2">
              Access to medical experts across all major specialities.
            </p>
          </div>
          <Link href="#" className="text-primary font-semibold  mt-4 sm:mt-0">
            View All
          </Link>
        </div>

        {/* Scroll Row */}
        {/* 01 */}

        <ThreeDScrollTriggerContainer>
          <ThreeDScrollTriggerRow baseVelocity={3} direction={1}>
            {specialists.map((s) => (
              <Card
                key={s.name}
                className={cn(
                  "mx-3 w-64 text-center transition-all duration-300 cursor-pointer",
                  "hover:shadow-lg hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground rounded-xl"
                )}
              >
                <CardContent className="p-6">
                  <div
                    className={cn(
                      "w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 transition-all",
                      s.bgColor,
                      "group-hover:bg-primary-foreground"
                    )}
                  >
                    <s.icon
                      className={cn(s.iconColor, "group-hover:text-primary")}
                      size={32}
                    />
                  </div>

                  <h3 className="text-lg font-semibold">{s.name}</h3>
                </CardContent>
              </Card>
            ))}
          </ThreeDScrollTriggerRow>
        </ThreeDScrollTriggerContainer>

        {/* Gap */}
        <div className="py-4"></div>

        {/* 02 */}

        <ThreeDScrollTriggerContainer>
          <ThreeDScrollTriggerRow baseVelocity={4} direction={-1}>
            {specialists.map((s) => (
              <Card
                key={s.name}
                className={cn(
                  "mx-3 w-64 text-center transition-all duration-300 cursor-pointer",
                  "hover:shadow-lg hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground rounded-xl"
                )}
              >
                <CardContent className="p-6">
                  <div
                    className={cn(
                      "w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 transition-all",
                      s.bgColor,
                      "group-hover:bg-primary-foreground"
                    )}
                  >
                    <s.icon
                      className={cn(s.iconColor, "group-hover:text-primary")}
                      size={32}
                    />
                  </div>

                  <h3 className="text-lg font-semibold">{s.name}</h3>
                </CardContent>
              </Card>
            ))}
          </ThreeDScrollTriggerRow>
        </ThreeDScrollTriggerContainer>
      </div>
    </section>
  );
};

export default Specialities;
