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
import React from "react";

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  tooltip: string;
  buttonText: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  description,
  price,
  tooltip,
  buttonText,
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
      <CardFooter className="mt-2 flex justify-between">
        <Button size="lg" className="w-full">
          {buttonText}
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
}

const PricingSection: React.FC = () => {
  const plans: PricingPlan[] = [
    {
      title: "Free Plan",
      description:
        "Perfect for individuals and small teams getting started with basic scheduling tools.",
      price: "$0",
      tooltip:
        "The Free Plan includes basic scheduling features with limited customization options.",
      buttonText: "Get Started",
    },
    {
      title: "Pro Plan",
      description:
        "For teams that need advanced scheduling tools to streamline workflows and enhance collaboration.",
      price: "$20",
      tooltip:
        "Seats are required for users to connect calendars and create links to help book meetings.",
      buttonText: "Try for Free",
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {plans.map((plan, index) => (
              <PricingCard
                key={index}
                title={plan.title}
                description={plan.description}
                price={plan.price}
                tooltip={plan.tooltip}
                buttonText={plan.buttonText}
              />
            ))}
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
};

export default PricingSection;
