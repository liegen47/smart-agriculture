"use client";

import { Logo } from "@/components/logo/logo";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAdmin } from "@/context/admin-context";
import adminAxiosInstance from "@/lib/admin-axios";

const formSchema = z.object({
  email: z
    .string()
    .email()
    .endsWith("@naturesense.com", "Must be a company email"),
  password: z
    .string()
    .min(10, "Admin password requires at least 10 characters"),
});

const AdminLoginPage = () => {
  const { setAdmin } = useAdmin();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const response = await adminAxiosInstance.post("/auth/admin/login", data);

      const { id, name, email, role, image, token } = response.data;

      const admin = {
        id,
        name,
        email,
        role,
        image,
      };

      document.cookie = `adminToken=${token}; path=/; max-age=${
        60 * 60 * 24 * 7
      }; Secure; SameSite=Strict`;
      sessionStorage.setItem("adminUser", JSON.stringify(admin));
      setAdmin(admin);
      window.location.reload();
      toast.success("Admin login successful!");
      router.push("/admin/dashboard");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Admin login failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center ">
      <div className="w-full h-full grid lg:grid-cols-2">
        <div className="max-w-md m-auto w-full flex flex-col items-center p-8">
          <div className="text-center space-y-2">
            <Logo className="h-12 w-12 mx-auto" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-6">
              NatureSense Admin Portal
            </h1>
            <p className="text-sm text-muted-foreground">
              Restricted access to authorized personnel only
            </p>
          </div>

          <Form {...form}>
            <form
              className="w-full space-y-6 mt-8"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="w-full peer pe-9"
                          placeholder="admin@naturesense.com"
                          type="email"
                          {...field}
                        />
                        <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3 text-muted-foreground/80">
                          <Mail size={18} strokeWidth={2} />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="w-full peer pe-9"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••••"
                          {...field}
                        />
                        <div
                          className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer text-muted-foreground/80"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeIcon size={18} strokeWidth={2} />
                          ) : (
                            <EyeOffIcon size={18} strokeWidth={2} />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Authenticating..." : "Admin Login"}
              </Button>
            </form>
          </Form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              For account recovery, contact{" "}
              <span className="text-primary font-medium">IT Security Team</span>
            </p>
          </div>
        </div>

        <div className="hidden lg:flex bg-gray-900 items-center justify-center p-12">
          <div className="text-white max-w-2xl space-y-6">
            <h2 className="text-3xl font-bold">System Administration</h2>
            <p className="text-lg text-gray-300">
              Access sensitive business operations, user management, and system
              configuration. Please ensure you follow all security protocols
              when accessing privileged accounts.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 bg-gray-300 rounded-full" />
                Two-factor authentication required for first-time access
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 bg-gray-300 rounded-full" />
                Activity monitoring and logging enabled
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 bg-gray-300 rounded-full" />
                Restricted IP access controls
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
