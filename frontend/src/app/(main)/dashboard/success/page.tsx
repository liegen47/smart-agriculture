"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { useUser } from "@/context/user-context"; // Import the user context

interface SubscriptionData {
  subscriptionStatus: string;
  subscriptionPlanId: string;
  subscriptionStart: string;
  subscriptionEnd: string;
  trialEnd: string | null;
  cancelAtPeriodEnd: boolean;
  stripeCustomerId: string;
  clientReferenceId: string;
}

export default function SuccessPage() {
  const router = useRouter();
  const { setUser } = useUser();
  const [subscriptionData, setSubscriptionData] =
    useState<SubscriptionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    toast.success("Payment successful! Your subscription is now active.");

    const fetchSubscriptionData = async () => {
      try {
        const subscriptionResponse = await axiosInstance.get("/subscription");
        setSubscriptionData(subscriptionResponse.data);

        const userResponse = await axiosInstance.get("/auth/profile");
        const updatedUser = userResponse.data;

        sessionStorage.setItem("user", JSON.stringify(updatedUser));

        setUser(updatedUser);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      }
    };

    fetchSubscriptionData();

    const redirectTimer = setTimeout(() => {
      router.push("/dashboard");
    }, 5000);

    return () => clearTimeout(redirectTimer);
  }, [router, setUser]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="flex items-center text-red-600">
              <AlertCircle className="mr-2" />
              Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!subscriptionData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle className="flex items-center text-green-600">
            <CheckCircle className="mr-2" />
            Subscription Successful!
          </CardTitle>
          <CardDescription>
            Thank you for your subscription. Here are your details:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="font-semibold">Status:</div>
            <div>{subscriptionData.subscriptionStatus}</div>
            <div className="font-semibold">Start Date:</div>
            <div>
              {new Date(
                subscriptionData.subscriptionStart
              ).toLocaleDateString()}
            </div>
            <div className="font-semibold">End Date:</div>
            <div>
              {new Date(subscriptionData.subscriptionEnd).toLocaleDateString()}
            </div>
            {subscriptionData.trialEnd && (
              <>
                <div className="font-semibold">Trial Ends:</div>
                <div>
                  {new Date(subscriptionData.trialEnd).toLocaleDateString()}
                </div>
              </>
            )}
            <div className="font-semibold">Auto-renew:</div>
            <div>{subscriptionData.cancelAtPeriodEnd ? "No" : "Yes"}</div>
          </div>
          <Button className="w-full" onClick={() => router.push("/dashboard")}>
            Go to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
