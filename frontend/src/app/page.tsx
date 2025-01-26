import FeatureSection from "@/components/landing-screen/feature-section";
import Footer from "@/components/landing-screen/footer";
import PricingSection from "@/components/landing-screen/pricing-plan";
import LandingNavbar from "@/components/navigation/landing-page/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <div className="min-h-screen">
        <LandingNavbar />
        <div className=" flex items-center justify-center overflow-hidden">
          <div className="max-w-screen-xl w-full mx-auto grid lg:grid-cols-2 gap-12 px-6 py-12 lg:py-0">
            <div className="my-auto">
              <Badge className="bg-gradient-to-br via-70% from-primary via-muted/30 to-primary rounded-full py-1 border-none">
                Just released v1.0.0
              </Badge>
              <h1 className="mt-6 max-w-[15ch] text-5xl lg:text-[2.75rem] xl:text-5xl font-black leading-[1.1] tracking-tight">
                NatureSense: A Smart Agriculture Management System
              </h1>
              <p className="mt-6 max-w-[60ch] text-lg">
                NatureSense is a comprehensive platform designed to enhance
                agricultural management through data-driven insights and
                innovative components. Explore its features, ready to preview
                and implement, to streamline your development workflow with
                practical examples.
              </p>
              <div className="mt-12 flex flex-col md:flex-row md:items-center gap-4">
                <Button size="lg" className="rounded-full text-base">
                  <Link href="/dashboard" className="flex items-center gap-2">
                    Get Started <ArrowUpRight className="!h-5 !w-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full text-base shadow-none"
                >
                  <CirclePlay className="!h-5 !w-5" /> Watch Demo
                </Button>
              </div>
            </div>
            <video
              className="w-full aspect-video lg:aspect-auto lg:w-[1000px] lg:h-[calc(100vh-4rem)] rounded-xl"
              autoPlay
              loop
              muted
            >
              <source src="/Videos/login-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>{" "}
      <FeatureSection />
      <PricingSection />
      <Footer />
    </>
  );
};

export default page;
