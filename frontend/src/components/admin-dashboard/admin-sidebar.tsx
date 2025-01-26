"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  BadgeCheck,
  Bell,
  ChevronRight,
  ChevronsUpDown,
  LogOut,
  ShieldCheck,
  Settings,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { useAdmin } from "@/context/admin-context";
import { toast } from "sonner";
import { LogoutAdmin } from "@/app/(auth)/auth";
import { useRouter } from "next/navigation";
import { Icons } from "../icons";
import adminAxiosInstance from "@/lib/admin-axios";

export const adminCompany = {
  name: "NatureSense Admin",
  logo: ShieldCheck,
  plan: "Admin Panel",
};

const adminNavItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: "dashboard",
  },
  {
    title: "Users",
    url: "/admin/dashboard/users",
    icon: "users",
    items: [
      { title: "All Users", url: "/admin/dashboard/users" },
      { title: "Farmers", url: "/admin/dashboard/users/farmers" },
    ],
  },
  {
    title: "Fields",
    url: "/admin/dashboard/fields",
    icon: "fields",
  },
  {
    title: "Settings",
    url: "/admin/dashboard/settings",
    icon: "settings",
    items: [
      { title: "General", url: "/admin/settings/dashboard/general" },
      { title: "Security", url: "/admin/settings/dashboard/security" },
      { title: "Logs", url: "/admin/settings/dashboard/logs" },
    ],
  },
  {
    title: "Reports",
    url: "/admin/dashboard/reports",
    icon: "post",
  },
];

export default function AdminSidebar() {
  const { admin, setAdmin } = useAdmin();
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    try {
      await adminAxiosInstance.post("/auth/logout");
      setAdmin(null);
      await LogoutAdmin();
      sessionStorage.removeItem("adminUser");
      toast.success("Logged out successfully");
      router.push("/admin/login");
    } catch (error) {
      console.error("Admin logout failed:", error);
      toast.error("Failed to logout");
    }
  };

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex gap-2 py-2 text-sidebar-accent-foreground">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <adminCompany.logo className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {adminCompany.name}
              </span>
              <span className="truncate text-xs">{adminCompany.plan}</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="overflow-x-hidden">
          <SidebarGroup>
            <SidebarGroupLabel>Management</SidebarGroupLabel>
            <SidebarMenu>
              {adminNavItems.map((item) => {
                const Icon = item.icon
                  ? Icons[item.icon as keyof typeof Icons]
                  : Shield;

                return item?.items && item?.items?.length > 0 ? (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={false}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          isActive={pathname === item.url}
                        >
                          {item.icon && <Icon />}
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === subItem.url}
                              >
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={pathname === item.url}
                    >
                      <Link href={item.url}>
                        <Icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={admin?.image || ""}
                        alt={admin?.name || ""}
                      />
                      <AvatarFallback className="rounded-lg">
                        {admin?.name?.slice(0, 2)?.toUpperCase() || "AD"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {admin?.name || "Admin"}
                      </span>
                      <span className="truncate text-xs">
                        {admin?.email || ""}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        Role: {admin?.role || "Super Admin"}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={admin?.image || ""}
                          alt={admin?.name || ""}
                        />
                        <AvatarFallback className="rounded-lg">
                          {admin?.name?.slice(0, 2)?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {admin?.name || "Admin"}
                        </span>
                        <span className="truncate text-xs">
                          {admin?.email || ""}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">
                          Role: {admin?.role || "Super Admin"}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <BadgeCheck />
                      Admin Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings />
                      System Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bell />
                      Notifications
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()}>
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </>
  );
}
