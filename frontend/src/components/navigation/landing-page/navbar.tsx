"use client";

import { Button } from "@/components/ui/button";
import { SunIcon, MoonIcon } from "lucide-react";
import { Logo } from "@/components/logo/logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useUser } from "@/context/user-context";
import { useEffect, useState } from "react";

const LandingNavbar = () => {
  const { theme, setTheme } = useTheme();
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!mounted) {
    return null;
  }

  return (
    <nav className="h-16 bg-background shadow-md">
      <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Logo />
            <div className="font-bold">NatureSense</div>
          </div>
          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />
        </div>

        <div className="flex items-center gap-3">
          {/* Show Dashboard Button if user is logged in */}
          {user && (
            <Link href="/dashboard" passHref>
              <Button variant="outline">Dashboard</Button>
            </Link>
          )}

          {/* Show Sign In and Sign Up buttons if user is not logged in */}
          {!user && (
            <>
              <Link href="/login" passHref>
                <Button variant="outline">Sign In</Button>
              </Link>

              <Link href="/register" passHref className="hidden sm:inline-flex">
                <Button className="hidden sm:inline-flex">Sign Up</Button>
              </Link>
            </>
          )}

          {/* Theme Toggle Button */}
          <Button size="icon" variant="outline" onClick={toggleTheme}>
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
