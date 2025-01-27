"use client";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import PageContainer from "@/components/dashboard/layout/page-container";
import { StatCard } from "@/features/analytics/stats-card";
import { Activity, LandPlot, Loader2, Tractor, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import adminAxiosInstance from "@/lib/admin-axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState<{
    totalUsers: number;
    totalSubscribedUsers: number;
    totalFarmers: number;
    approvedFarmers: number;
    totalFields: number;
    averageYield: number;
    soilHealthDistribution: { _id: string; count: number }[];
    cropHealthDistribution: { _id: string; count: number }[];
    subscriptionStatusDistribution: { _id: string; count: number }[];
  } | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await adminAxiosInstance.get(
          "/admin/application-stats"
        );
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const soilHealthData = stats.soilHealthDistribution.map((item) => ({
    name: item._id,
    value: item.count,
  }));

  const cropHealthData = stats.cropHealthDistribution.map((item) => ({
    name: item._id,
    value: item.count,
  }));

  const subscriptionStatusData = stats.subscriptionStatusDistribution.map(
    (item) => ({
      name: item._id,
      value: item.count,
    })
  );

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Admin Dashboard 👋
          </h2>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Users */}
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<Users />}
            description="Total number of users"
          />

          {/* Subscribed Users */}
          <StatCard
            title="Subscribed Users"
            value={stats.totalSubscribedUsers}
            icon={<Users />}
            description="Users with active subscriptions"
          />

          {/* Total Farmers */}
          <StatCard
            title="Total Farmers"
            value={stats.totalFarmers}
            icon={<Tractor />}
            description="Total number of farmers"
          />

          {/* Approved Farmers */}
          <StatCard
            title="Approved Farmers"
            value={stats.approvedFarmers}
            icon={<Tractor />}
            description="Farmers approved by admin"
          />

          {/* Total Fields */}
          <StatCard
            title="Total Fields"
            value={stats.totalFields}
            icon={<LandPlot />}
            description="Total number of fields"
          />

          {/* Average Yield */}
          <StatCard
            title="Average Yield"
            value={`${stats.averageYield.toFixed(2)}`}
            icon={<Activity />}
            description="Average yield across fields"
          />
        </div>

        {/* Charts */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Soil Health Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Soil Health Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={soilHealthData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {soilHealthData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Crop Health Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Crop Health Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={cropHealthData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#82ca9d"
                    label
                  >
                    {cropHealthData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Subscription Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Subscription Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={subscriptionStatusData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default AdminDashboard;
