"use client";

import { GoogleLogo } from "@/components/logo/Google";
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
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";
import { useUser } from "@/context/user-context";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const LoginPage = () => {
  const { setUser } = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const router = useRouter(); // Initialize the router

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true); // Start loading
    try {
      const response = await axiosInstance.post("/auth/login", data);

      const { id, name, email, role } = response.data;
      const user = { id, name, email, role };
      sessionStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Login failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full h-full grid lg:grid-cols-2">
        <div className="max-w-xs m-auto w-full flex flex-col items-center">
          <Logo className="h-9 w-9" />
          <p className="mt-4 text-xl font-bold tracking-tight">
            Log in to NatureSense
          </p>

          <Button className="mt-8 w-full gap-3">
            <GoogleLogo />
            Continue with Google
          </Button>

          <div className="my-7 w-full flex items-center justify-center overflow-hidden">
            <Separator />
            <span className="text-sm px-2">OR</span>
            <Separator />
          </div>

          <Form {...form}>
            <form
              className="w-full space-y-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="w-full peer pe-9"
                          placeholder="Email"
                          type="email"
                          {...field}
                        />
                        <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                          <Mail size={16} strokeWidth={2} aria-hidden="true" />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="w-full peer pe-9"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          {...field}
                        />
                        <div
                          className="pointer-events-auto absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80"
                          onClick={() => setShowPassword(!showPassword)}
                          role="button"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeIcon
                              size={16}
                              strokeWidth={2}
                              aria-hidden="true"
                            />
                          ) : (
                            <EyeOffIcon
                              size={16}
                              strokeWidth={2}
                              aria-hidden="true"
                            />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="mt-4 w-full"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Continue with Email"}
              </Button>
            </form>
          </Form>

          <div className="mt-5 space-y-5">
            <Link
              href="#"
              className="text-sm block underline text-muted-foreground text-center"
            >
              Forgot your password?
            </Link>
            <p className="text-sm text-center">
              Don&apos;t have an account?
              <Link
                href="/register"
                className="ml-1 underline text-muted-foreground"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
        <div className="bg-white hidden lg:flex justify-center items-center h-full">
          <video
            src="/Videos/login-video.mp4"
            className="w-3/5 h-auto"
            autoPlay
            muted
            loop
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
