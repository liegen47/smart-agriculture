"use client";
import { useState, useEffect, useId } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, RefreshCcw, HelpCircle } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"; // Import Breadcrumb components

import { loadStripe } from "@stripe/stripe-js";
import { checkoutCredits } from "@/lib/actions/checkout-actions";
import { useUser } from "@/context/user-context";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type PricingPlan = {
  title: string;
  description: string;
  price: string;
  tooltip: string;
  buttonText: string;
  priceId: string;
};

const plans: PricingPlan[] = [
  {
    title: "Free Plan",
    description:
      "Perfect for individuals and small teams getting started with basic scheduling tools.",
    price: "₹0",
    tooltip:
      "The Free Plan includes basic scheduling features with limited customization options.",
    buttonText: "Get Started",
    priceId: "none",
  },
  {
    title: "Pro Plan",
    description:
      "For teams that need advanced scheduling tools to streamline workflows and enhance collaboration.",
    price: "₹300",
    tooltip:
      "Seats are required for users to connect calendars and create links to help book meetings.",
    buttonText: "Try for Free",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PLAN_PRICE_ID!,
  },
  {
    title: "Enterprise Plan",
    description:
      "For large organizations requiring custom solutions, dedicated support, and advanced security.",
    price: "Custom",
    tooltip:
      "Contact us for a tailored solution that meets your organization's specific needs.",
    buttonText: "Contact Sales",
    priceId: "none",
  },
];

export default function Component() {
  const id = useId();
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan>(plans[0]);
  const [step, setStep] = useState<"plan" | "details">("plan");
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }, []);

  const onCheckout = async () => {
    if (!user?.email) {
      toast.error("Please log in to continue");
      return;
    }

    if (selectedPlan.priceId === "none") {
      alert("Contact us for custom plan selected");
      return;
    }

    try {
      const result = await checkoutCredits({
        priceId: selectedPlan.priceId,
        customerEmail: user.email,
        userId: user.id,
      });

      if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  // Check if the user already has the selected plan
  const hasSamePlan = user?.subscriptionPlanId === selectedPlan.priceId;

  // Get the current plan name based on the user's subscriptionPlanId
  const currentPlan = plans.find(
    (plan) => plan.priceId === user?.subscriptionPlanId
  )?.title;

  return (
    <DialogContent className="sm:max-w-[425px]">
      <div className="mb-4 flex flex-col gap-2">
        <div
          className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
          aria-hidden="true"
        >
          <RefreshCcw className="opacity-80" size={16} strokeWidth={2} />
        </div>
        <DialogHeader>
          <DialogTitle>Change your plan</DialogTitle>
          <DialogDescription>
            {step === "plan"
              ? "Choose the plan that best fits your needs."
              : "Provide your details to proceed."}
          </DialogDescription>
        </DialogHeader>
      </div>

      {/* Breadcrumbs */}
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => setStep("plan")}
              className={`cursor-pointer ${
                step === "details" ? "" : "pointer-events-none opacity-50"
              }`}
            >
              Plan
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {step === "details" ? (
              <BreadcrumbPage>Details</BreadcrumbPage>
            ) : (
              <BreadcrumbLink className="pointer-events-none opacity-50">
                Details
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <RadioGroup
          className="gap-2"
          defaultValue={selectedPlan.title}
          onValueChange={(value) =>
            setSelectedPlan(plans.find((p) => p.title === value) || plans[0])
          }
        >
          {plans.map((plan, index) => (
            <TooltipProvider key={plan.title}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative flex w-full items-center gap-2 rounded-lg border border-input px-4 py-3 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent">
                    <RadioGroupItem
                      value={plan.title}
                      id={`${id}-${index}`}
                      className="order-1 after:absolute after:inset-0"
                    />
                    <div className="grid grow gap-1">
                      <Label htmlFor={`${id}-${index}`}>{plan.title}</Label>
                      <p className="text-xs text-muted-foreground">
                        {plan.price} {plan.price !== "Custom" && "per month"}
                      </p>
                    </div>
                    <HelpCircle size={16} className="text-muted-foreground" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{plan.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </RadioGroup>

        {/* Display Current Plan */}
        {currentPlan && (
          <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
            <p>
              Your current plan:{" "}
              <span className="font-medium text-foreground">{currentPlan}</span>
            </p>
          </div>
        )}

        <div className="space-y-3">
          <p className="text-sm font-medium">Features include:</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <Check
                size={16}
                strokeWidth={2}
                className="mt-0.5 shrink-0 text-primary"
              />
              Create unlimited Fields
            </li>
            <li className="flex gap-2">
              <Check
                size={16}
                strokeWidth={2}
                className="mt-0.5 shrink-0 text-primary"
              />
              Eco-friendly solutions
            </li>
            <li className="flex gap-2">
              <Check
                size={16}
                strokeWidth={2}
                className="mt-0.5 shrink-0 text-primary"
              />
              Real-time data analytics
            </li>
          </ul>
        </div>

        <div className="grid gap-2">
          {selectedPlan.title !== "Free Plan" &&
            selectedPlan.title !== "Enterprise Plan" &&
            !hasSamePlan && (
              <Button
                type="button"
                className="w-full"
                onClick={() => onCheckout()}
              >
                Continue
              </Button>
            )}
          {selectedPlan.title === "Enterprise Plan" && (
            <Button
              type="button"
              className="w-full"
              onClick={() => router.push("/contact-us")}
            >
              Contact Sales
            </Button>
          )}
          <DialogClose asChild>
            <Button type="button" variant="ghost" className="w-full">
              Cancel
            </Button>
          </DialogClose>
        </div>
      </form>
    </DialogContent>
  );
}
