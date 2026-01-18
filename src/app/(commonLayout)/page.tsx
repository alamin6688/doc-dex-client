import { HealthcareInfo } from "@/components/modules/Home/HealthcareInfo";
// import Hero from "@/components/modules/Home/Hero";
import Specialities from "@/components/modules/Home/Specialties";
import { Steps } from "@/components/modules/Home/Steps";
import { Reviews } from "@/components/modules/Home/Reviews";
import { FeaturedDoctors } from "@/components/modules/Home/TopRatedDoctors";
import Head from "next/head";
import { Hero } from "@/components/modules/Home/Hero";

import { getDoctors } from "@/services/admin/doctorManagement";

export default async function Home() {
  const { data: doctors } = await getDoctors();

  return (
    <>
      <Head>
        <title>AI-Powered Healthcare - Find Your Perfect Doctor</title>
        <meta
          name="description"
          content="Discover top-rated doctors tailored to your needs with our AI-powered healthcare platform. Get personalized recommendations and book appointments effortlessly."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Hero />
        <FeaturedDoctors doctors={doctors} />
        <Specialities />
        <HealthcareInfo />
        <Steps />
        <Reviews />
      </main>
    </>
  );
}
