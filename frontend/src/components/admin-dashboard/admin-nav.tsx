"use client";
import { LogoutAdmin } from "@/app/(auth)/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAdmin } from "@/context/admin-context";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { Settings, LogOut, User } from "lucide-react";
import adminAxiosInstance from "@/lib/admin-axios";

export function AdminNav() {
  const { admin, setAdmin } = useAdmin();
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

  if (admin) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={admin?.image ?? ""} alt={admin?.name ?? ""} />
              <AvatarFallback>{admin?.name?.[0]}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{admin?.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {admin?.email}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                Role: {admin?.role || "Super Admin"}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Admin Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              System Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logout()}>
            <LogOut className="mr-2 h-4 w-4" />
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
