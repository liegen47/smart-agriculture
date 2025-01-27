import Footer from "@/components/landing-screen/footer";
import LandingNavbar from "@/components/navigation/landing-page/navbar";
import React from "react";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen">
        <LandingNavbar />
        {children}
      </div>
      <Footer />
    </>
  );
}
