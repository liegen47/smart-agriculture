import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Leaf, Globe, ShieldCheck, Users } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="my-24 relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Animated Background */}
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 h-full skew-y-12"
        )}
      />

      {/* Hero Section */}
      <div className="relative z-10 text-center max-w-2xl">
        <Badge className="bg-gradient-to-br via-70% from-green-600 via-muted/30 to-green-600 rounded-full py-1 border-none">
          Empowering Agriculture
        </Badge>
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] tracking-tight">
          Welcome to <span className="text-green-600">NatureSense</span>
        </h1>
        <p className="mt-6 text-[17px] md:text-lg text-gray-600">
          Revolutionizing agriculture with AI-powered insights, sustainable
          practices, and cutting-edge technology. Join us in building a greener
          future.
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button
            size="lg"
            className="rounded-full text-base bg-green-600 hover:bg-green-700"
          >
            Explore Features <ArrowUpRight className="!h-5 !w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full text-base shadow-none border-green-600 text-green-600 hover:bg-green-50"
          >
            <Leaf className="!h-5 !w-5" /> Our Mission
          </Button>
        </div>
      </div>

      {/* Mission Section */}
      <div className="relative z-10 mt-24 max-w-4xl text-center">
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
          Our Mission
        </h2>
        <p className="mt-6 text-[17px] md:text-lg text-gray-600">
          At NatureSense, we are committed to empowering farmers and
          agricultural businesses with innovative tools and insights. Our
          mission is to promote sustainable farming practices, enhance crop
          yields, and ensure food security for future generations.
        </p>
      </div>

      {/* Key Features Section */}
      <div className="relative z-10 mt-24 max-w-6xl w-full px-6">
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 text-center">
          Why Choose NatureSense?
        </h2>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1: AI-Powered Insights */}
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 flex items-center justify-center bg-green-50 text-green-600 rounded-full">
              <Leaf className="h-6 w-6" />
            </div>
            <h3 className="mt-6 font-bold text-xl text-gray-900">
              AI-Powered Insights
            </h3>
            <p className="mt-2 text-gray-600">
              Leverage advanced AI to analyze crop health, predict yields, and
              optimize farming practices.
            </p>
          </div>

          {/* Feature 2: Sustainable Practices */}
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 flex items-center justify-center bg-green-50 text-green-600 rounded-full">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="mt-6 font-bold text-xl text-gray-900">
              Sustainable Practices
            </h3>
            <p className="mt-2 text-gray-600">
              Promote eco-friendly farming with tools designed to reduce waste
              and conserve resources.
            </p>
          </div>

          {/* Feature 3: Secure & Reliable */}
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 flex items-center justify-center bg-green-50 text-green-600 rounded-full">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="mt-6 font-bold text-xl text-gray-900">
              Secure & Reliable
            </h3>
            <p className="mt-2 text-gray-600">
              Built with robust security measures to protect your data and
              ensure uninterrupted access.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="relative z-10 mt-24 max-w-6xl w-full px-6">
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 text-center">
          Meet Our Team
        </h2>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Team Member 1 */}
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 flex items-center justify-center bg-green-50 text-green-600 rounded-full">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="mt-6 font-bold text-xl text-gray-900">John Doe</h3>
            <p className="mt-2 text-gray-600">CEO & Founder</p>
          </div>

          {/* Team Member 2 */}
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 flex items-center justify-center bg-green-50 text-green-600 rounded-full">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="mt-6 font-bold text-xl text-gray-900">Jane Smith</h3>
            <p className="mt-2 text-gray-600">Lead Data Scientist</p>
          </div>

          {/* Team Member 3 */}
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 flex items-center justify-center bg-green-50 text-green-600 rounded-full">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="mt-6 font-bold text-xl text-gray-900">
              Alice Brown
            </h3>
            <p className="mt-2 text-gray-600">Product Manager</p>
          </div>

          {/* Team Member 4 */}
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 flex items-center justify-center bg-green-50 text-green-600 rounded-full">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="mt-6 font-bold text-xl text-gray-900">
              Vansh Kapoor
            </h3>
            <p className="mt-2 text-gray-600">Full-Stack Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
