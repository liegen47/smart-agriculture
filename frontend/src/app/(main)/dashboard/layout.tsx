import KBar from "@/components/dashboard/kbar";
import AppSidebar from "@/components/dashboard/layout/app-sidebar";
import Header from "@/components/dashboard/layout/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NatureSense Dashboard",
  description:
    "NatureSense is a comprehensive platform designed to enhance agricultural management through data-driven insights and innovative components. Explore its features, ready to preview and implement, to streamline your development workflow with practical examples.",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <KBar>
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <SidebarInset>
          <Header />
          {/* page main content */}
          {children}
          {/* page main content ends */}
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}
