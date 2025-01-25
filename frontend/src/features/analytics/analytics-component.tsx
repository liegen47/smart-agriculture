"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AreaChartComponent } from "./area-chart-component";
import { ChartConfig } from "@/components/ui/chart";
import { Field } from "../fields/field-form";
import { StatCard } from "./stats-card";
import { LandPlot, Wheat } from "lucide-react";

export interface AnalyticsData {
  soilHealth: string;
  cropHealth: string;
  yieldTrends: number[];
  recommendations: string[];
}

interface AnalyticsComponentProps {
  data: AnalyticsData;
}
const chartConfig = {
  yield: {
    label: "Yield",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;
export function AnalyticsComponent({
  data,
  field,
}: AnalyticsComponentProps & { field: Field | null }) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentYear = new Date().getFullYear();
  const yieldTrendsData = data.yieldTrends.map((yieldValue, index) => ({
    month: monthNames[index % 12],
    yield: yieldValue,
  }));

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          Field Analytics - {field?.name} ({currentYear})
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {/* Each child here should be a block-level element */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Soil Health</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge
                variant={data.soilHealth === "Poor" ? "default" : "outline"}
              >
                {data.soilHealth}
              </Badge>
              <Progress
                value={
                  data.soilHealth === "Poor"
                    ? 30
                    : data.soilHealth === "Fair"
                    ? 60
                    : 90
                }
                className="mt-4"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Crop Health</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge
                variant={
                  data.cropHealth === "Excellent" ? "outline" : "default"
                }
              >
                {data.cropHealth}
              </Badge>
              <Progress
                value={
                  data.cropHealth === "Poor"
                    ? 30
                    : data.cropHealth === "Fair"
                    ? 60
                    : 90
                }
                className="mt-4"
              />
            </CardContent>
          </Card>
          <StatCard
            title="Field Area"
            value={`${field?.areaSize} ha`}
            icon={<LandPlot />}
            description="Total area of field"
          />
          <StatCard
            title="Total Crops"
            value={field?.cropTypes.length}
            icon={<Wheat />}
            description="Total types of Crops"
          />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Yield Trends</CardTitle>
            <CardDescription>
              Showing yield trends over the last few months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AreaChartComponent data={yieldTrendsData} config={chartConfig} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Recommendation</TableHead>
                  <TableHead>Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.recommendations.map((recommendation, index) => (
                  <TableRow key={index}>
                    <TableCell>{recommendation}</TableCell>
                    <TableCell>
                      <Badge variant={index === 0 ? "default" : "outline"}>
                        {index === 0 ? "High" : "Medium"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
