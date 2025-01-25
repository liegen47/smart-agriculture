import PageContainer from "@/components/dashboard/layout/page-container";
import { StatCard } from "@/features/analytics/stats-card";
import { getDataById } from "@/lib/server-side-axios";
import { Activity, LandPlot, Maximize, Minimize, Tractor } from "lucide-react";

export default async function Home() {
  const fieldStats = await getDataById<{
    totalFields: number;
    totalArea: number;
    averageArea: number;
    minArea: number;
    maxArea: number;
  }>("fields", "stats");

  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Fields */}
          <StatCard
            title="Total Fields"
            value={fieldStats?.totalFields}
            icon={<Tractor />}
            description="Total number of fields"
          />

          {/* Total Area */}
          <StatCard
            title="Total Area"
            value={`${fieldStats?.totalArea} ha`}
            icon={<LandPlot />}
            description="Total area of all fields"
          />

          {/* Average Area */}
          <StatCard
            title="Average Area"
            value={`${fieldStats?.averageArea.toFixed(2)} ha`}
            icon={<Activity />}
            description="Average area per field"
          />

          {/* Min Area */}
          <StatCard
            title="Min Area"
            value={`${fieldStats?.minArea} ha`}
            icon={<Minimize />}
            description="Smallest field area"
          />

          {/* Max Area */}
          <StatCard
            title="Max Area"
            value={`${fieldStats?.maxArea} ha`}
            icon={<Maximize />}
            description="Largest field area"
          />
        </div>
      </div>
    </PageContainer>
  );
}
