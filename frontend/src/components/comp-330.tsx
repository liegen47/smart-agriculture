"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { CircleHelpIcon } from "lucide-react";
import React, { useState } from "react";
import { useUser } from "@/context/user-context";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, RefreshCcw } from "lucide-react";
import { useId } from "react";

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  tooltip: string;
  buttonText: string;
  priceId?: string;
  onSubscribe: () => void;
  loading: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  description,
  price,
  tooltip,
  buttonText,
  onSubscribe,
  loading,
}) => {
  return (
    <Card className="max-w-xs mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-extrabold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground flex items-end leading-6">
        <span className="text-4xl leading-none font-extrabold text-foreground">
          {price}
        </span>
        <span className="ml-1.5 mr-1">/mo</span>
        <Tooltip>
          <TooltipTrigger className="mb-1">
            <CircleHelpIcon className="h-4 w-4" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </CardContent>
      <CardFooter className="mt-2 flex flex-col gap-4">
        <Button
          size="lg"
          className="w-full"
          onClick={onSubscribe}
          disabled={loading}
        >
          {loading ? "Processing..." : buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

interface PricingPlan {
  title: string;
  description: string;
  price: string;
  tooltip: string;
  buttonText: string;
  priceId?: string; // Stripe price ID for the plan
}

const BillingDialog: React.FC = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [selectedPriceId, setSelectedPriceId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  //   const [paymentMethod, setPaymentMethod] = useState<
  //     "card" | "upi" | "netbanking"
  //   >("card");
  const stripe = useStripe();
  const elements = useElements();
  const id = useId();

  const handleSubscribe = async (priceId: string) => {
    if (!user?.stripeCustomerId) {
      toast.error("Customer ID not found. Please contact support.");
      return;
    }

    if (!priceId) {
      toast.error("Price ID not found. Please contact support.");
      return;
    }

    if (!stripe || !elements) {
      toast.error("Stripe failed to initialize. Please try again.");
      return;
    }

    setLoading(true);
    setSelectedPriceId(priceId);

    try {
      const response = await axiosInstance.post("/stripe/create-subscription", {
        customerId: user.stripeCustomerId,
        priceId,
        userId: user.id,
        paymentMethodType: "card",
      });

      const { clientSecret } = response.data;

      if (clientSecret) {
        const paymentMethodOptions = {
          card: elements.getElement(CardElement)!,
        };

        const { error, setupIntent } = await stripe.confirmCardSetup(
          clientSecret,
          {
            payment_method: paymentMethodOptions,
          }
        );

        if (error) {
          toast.error("Payment method collection failed. Please try again.");
          console.error("Stripe error:", error);
          return;
        }

        if (!setupIntent || !setupIntent.payment_method) {
          toast.error("Payment method not collected. Please try again.");
          return;
        }

        const subscriptionResponse = await axiosInstance.post(
          "/stripe/create-subscription-after-payment",
          {
            customerId: user.stripeCustomerId,
            priceId,
            userId: user.id,
            paymentMethodId: setupIntent.payment_method,
          }
        );

        if (subscriptionResponse.data.subscription) {
          toast.success("Subscription created successfully!");
          setIsDialogOpen(false); // Close the dialog after successful subscription
        }
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
      toast.error("Failed to create subscription. Please try again.");
    } finally {
      setLoading(false);
      setSelectedPriceId(null);
    }
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
    },
    {
      title: "Pro Plan",
      description:
        "For teams that need advanced scheduling tools to streamline workflows and enhance collaboration.",
      price: "₹300",
      tooltip:
        "Seats are required for users to connect calendars and create links to help book meetings.",
      buttonText: "Try for Free",
      priceId: "price_1Ql8qiSBTWA3x7fKl7W9eSXi",
    },
    {
      title: "Enterprise Plan",
      description:
        "For large organizations requiring custom solutions, dedicated support, and advanced security.",
      price: "Custom",
      tooltip:
        "Contact us for a tailored solution that meets your organization's specific needs.",
      buttonText: "Contact Sales",
    },
  ];

  return (
    <TooltipProvider>
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            Pricing & Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <PricingCard
                key={index}
                title={plan.title}
                description={plan.description}
                price={plan.price}
                tooltip={plan.tooltip}
                buttonText={plan.buttonText}
                priceId={plan.priceId}
                onSubscribe={() => {
                  setSelectedPriceId(plan.priceId || null);
                  setIsDialogOpen(true);
                }}
                loading={loading && selectedPriceId === plan.priceId}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Billing Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <div className="mb-2 flex flex-col gap-2">
            <div
              className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
              aria-hidden="true"
            >
              <RefreshCcw className="opacity-80" size={16} strokeWidth={2} />
            </div>
            <DialogHeader>
              <DialogTitle className="text-left">Change your plan</DialogTitle>
              <DialogDescription className="text-left">
                Pick one of the following plans.
              </DialogDescription>
            </DialogHeader>
          </div>

          <form className="space-y-5">
            <RadioGroup className="gap-2" defaultValue="2">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className="relative flex w-full items-center gap-2 rounded-lg border border-input px-4 py-3 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent"
                >
                  <RadioGroupItem
                    value={plan.priceId || index.toString()}
                    id={`${id}-${index}`}
                    aria-describedby={`${id}-${index}-description`}
                    className="order-1 after:absolute after:inset-0"
                  />
                  <div className="grid grow gap-1">
                    <Label htmlFor={`${id}-${index}`}>{plan.title}</Label>
                    <p
                      id={`${id}-${index}-description`}
                      className="text-xs text-muted-foreground"
                    >
                      {plan.price} per month
                    </p>
                  </div>
                </div>
              ))}
            </RadioGroup>

            <div className="space-y-3">
              <p>
                <strong className="text-sm font-medium">
                  Features include:
                </strong>
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <Check
                    size={16}
                    strokeWidth={2}
                    className="mt-0.5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  Create unlimited projects.
                </li>
                <li className="flex gap-2">
                  <Check
                    size={16}
                    strokeWidth={2}
                    className="mt-0.5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  Remove watermarks.
                </li>
                <li className="flex gap-2">
                  <Check
                    size={16}
                    strokeWidth={2}
                    className="mt-0.5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  Add unlimited users and free viewers.
                </li>
                <li className="flex gap-2">
                  <Check
                    size={16}
                    strokeWidth={2}
                    className="mt-0.5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  Upload unlimited files.
                </li>
                <li className="flex gap-2">
                  <Check
                    size={16}
                    strokeWidth={2}
                    className="mt-0.5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  7-day money back guarantee.
                </li>
                <li className="flex gap-2">
                  <Check
                    size={16}
                    strokeWidth={2}
                    className="mt-0.5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  Advanced permissions.
                </li>
              </ul>
            </div>

            <div className="grid gap-2">
              <Button
                type="button"
                className="w-full"
                onClick={() =>
                  selectedPriceId && handleSubscribe(selectedPriceId)
                }
                disabled={loading}
              >
                {loading ? "Processing..." : "Change plan"}
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="ghost" className="w-full">
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};

export default BillingDialog;
