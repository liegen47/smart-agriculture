"use client";
import React from "react";
import { AdminNav } from "./admin-nav";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import SearchInput from "../dashboard/search-input";
import { Breadcrumbs } from "../dashboard/breadcrumbs";
import ThemeToggle from "../dashboard/layout/theme-toggler/theme-toggle";

export default function AdminHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumbs />
      </div>

      <div className="flex items-center gap-2 px-4">
        <div className="hidden md:flex">
          <SearchInput />
        </div>
        <AdminNav />
        <ThemeToggle />
      </div>
    </header>
  );
}
