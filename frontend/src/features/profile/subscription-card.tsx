import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/constant/data";
import { CreditCardIcon } from "lucide-react";
import { Logo } from "@/components/logo/logo";

const UserSubscriptionCard: React.FC<{ user: User }> = ({ user }) => {
  const PRO_PLAN_ID = process.env.NEXT_PUBLIC_STRIPE_PRO_PLAN_PRICE_ID;
  const CUSTOM_PLAN_ID = process.env.NEXT_PUBLIC_STRIPE_CUSTOM_PLAN_PRICE_ID;

  const subscriptionPlan =
    user?.subscriptionPlanId === PRO_PLAN_ID
      ? "Pro Plan"
      : user?.subscriptionPlanId === CUSTOM_PLAN_ID
      ? "Custom Plan"
      : "Free Plan";

  return (
    <Card className="w-[350px] rounded-lg overflow-hidden shadow-md bg-white">
      <CardHeader className="flex flex-col items-center p-6 border-b">
        {/* Company Logo */}
        <Logo />
        <CardTitle className="text-lg font-semibold text-black">
          <div className="flex items-center space-x-2">
            <CreditCardIcon className="text-black h-6 w-6" />
            <span className="text-black font-semibold">
              Subscription Details
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          {/* User Data */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-black">
                <strong>Role:</strong>
              </p>
              <p className="text-black">
                <strong>Status:</strong>
              </p>
              <p className="text-black">
                <strong>Plan:</strong>
              </p>
              {subscriptionPlan === "Pro Plan" && (
                <>
                  <p className="text-black">
                    <strong>End Date:</strong>
                  </p>
                  <p className="text-black">
                    <strong>Cancel at Period End:</strong>
                  </p>
                </>
              )}
            </div>
            <div className="space-y-2 text-right">
              <p className="text-black">{user?.role || "N/A"}</p>
              <p className="text-black">{user?.subscriptionStatus || "N/A"}</p>
              <p className="text-black">{subscriptionPlan}</p>
              {subscriptionPlan === "Pro Plan" && (
                <>
                  {" "}
                  <p className="text-black">
                    {user?.subscriptionEnd
                      ? new Date(user.subscriptionEnd).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <p className="text-black">
                    {user?.cancelAtPeriodEnd ? "Yes" : "No"}
                  </p>{" "}
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserSubscriptionCard;
