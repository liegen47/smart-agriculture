import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import {
  Goal,
  BookCheck,
  ChartPie,
  Users,
  FolderSync,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Goal,
    title: "Environmental Insights",
    description:
      "Gain actionable insights into environmental trends and make data-driven decisions for sustainability.",
  },
  {
    icon: BookCheck,
    title: "Eco-Friendly Solutions",
    description:
      "Discover and implement eco-friendly practices to reduce your environmental footprint.",
  },
  {
    icon: ChartPie,
    title: "Real-Time Data Analytics",
    description:
      "Access real-time data and analytics to monitor environmental changes and take timely action.",
  },
  {
    icon: Users,
    title: "Community Engagement",
    description:
      "Engage with a community of like-minded individuals and organizations to drive collective impact.",
  },
  {
    icon: FolderSync,
    title: "Automated Reporting",
    description:
      "Automate the generation of environmental reports, saving time and ensuring accuracy.",
  },
  {
    icon: Zap,
    title: "Sustainable Growth",
    description:
      "Accelerate your journey towards sustainability with proven strategies and tools.",
  },
];

const FeatureSection = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-screen-xl w-full py-12 px-6">
        <h2 className="text-4xl md:text-5xl md:leading-[3.5rem] font-black tracking-tight max-w-lg">
          Boost Your Strategy with Smart Features
        </h2>
        <div className="mt-6 md:mt-8 w-full mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <Accordion defaultValue="item-0" type="single" className="w-full">
              {features.map(({ title, description, icon: Icon }, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="data-[state=open]:border-b-2 data-[state=open]:border-primary"
                >
                  <AccordionTrigger className="text-lg [&>svg]:hidden">
                    <div className="flex items-center gap-4">
                      <Icon />
                      {title}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-[17px] leading-relaxed text-muted-foreground">
                    {description}
                    <div className="mt-6 mb-2 md:hidden aspect-video w-full bg-muted rounded-xl" />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          {/* Media */}
          <div className="hidden md:block w-full h-full rounded-xl relative">
            <Image
              src="/Images/farm tractor.svg"
              alt="Farm Tractor"
              fill
              className="rounded-xl object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
