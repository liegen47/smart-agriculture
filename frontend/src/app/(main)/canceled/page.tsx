"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

const Canceled = () => {
  const router = useRouter();
  useEffect(() => {
    toast.error(
      "Payment was canceled! Please try again or check your subscription options."
    );

    const redirectTimer = setTimeout(() => {
      router.push("/dashboard");
    }, 5000);

    return () => clearTimeout(redirectTimer);
  }, [router]);
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      Order canceled -- continue to check plans and checkout when you’re ready.
    </div>
  );
};

export default Canceled;
