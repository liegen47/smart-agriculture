import AdminHeader from "@/components/admin-dashboard/admin-header";
import AdminSidebar from "@/components/admin-dashboard/admin-sidebar";
import KBar from "@/components/dashboard/kbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NatureSense Dashboard",
  description:
    "NatureSense is a comprehensive platform designed to enhance agricultural management through data-driven insights and innovative components. Explore its features, ready to preview and implement, to streamline your development workflow with practical examples.",
};

export default async function AdminDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <KBar>
      <SidebarProvider defaultOpen={true}>
        <AdminSidebar />
        <SidebarInset>
          <AdminHeader />
          {/* page main content */}
          {children}
          {/* page main content ends */}
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}
