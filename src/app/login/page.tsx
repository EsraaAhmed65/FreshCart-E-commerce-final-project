"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema, type loginSchemaType } from "@/schema/login.schema";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const form = useForm<loginSchemaType>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    const err = searchParams.get("error");
    if (!err) return;
    if (err === "CredentialsSignin") toast.error("Invalid email or password.");
    else toast.error("Something went wrong. Please try again.");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("error");
    const hasOtherParams = Array.from(params.keys()).length > 0;
    router.replace(hasOtherParams ? `${pathname}?${params.toString()}` : pathname, { scroll: false });
  }, [searchParams, pathname, router]);

  async function handleLogin(values: loginSchemaType) {
    if (loading) return;
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (res?.ok) {
        toast.success("Signed in successfully.");
        form.reset();
        router.push("/");
        return;
      }
      if (res?.error === "CredentialsSignin") toast.error("Invalid email or password.");
      else toast.error("Sign in failed. Please try again.");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto px-5 md:px-0 w-full my-12 md:w-1/2">
      <h1 className="text-3xl text-center mb-10 font-bold">Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} />
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
                <FormLabel>Password:</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end -mt-2">
            <Link href="/forgetPassword" className="text-green-600 hover:text-green-700 text-sm">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full mt-2" disabled={loading}>
            {loading ? "Signing in..." : "Login Now"}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-green-600 hover:text-green-700 font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
