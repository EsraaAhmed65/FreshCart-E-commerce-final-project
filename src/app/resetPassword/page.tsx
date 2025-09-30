"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { resetPasswordSchema, type ResetPasswordSchemaType } from "@/schema/ResetPassword.schema";
import { ResetPasswordAction } from "@/AuthActions/resetPassword";

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ResetPasswordSchemaType>({
    defaultValues: { email: "", newPassword: "" },
    resolver: zodResolver(resetPasswordSchema),
  });

  async function onSubmit(values: ResetPasswordSchemaType) {
    setIsLoading(true);
    const res = await ResetPasswordAction(values.email.trim(), values.newPassword);
    if (res?.ok) {
      toast.success(res?.data?.message || "Password reset successfully");
      router.push("/login");
    } else {
      toast.error(res?.error || "Failed to reset password");
    }
    setIsLoading(false);
  }

  return (
    <div className="mx-auto px-5 md:px-0 w-full md:w-1/2 my-12">
      <h1 className="text-3xl text-center font-bold mb-10">Reset Password</h1>
      <p className="text-center text-gray-600 mb-8">Enter your email and new password to reset your account password.</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl><Input type="email" placeholder="Enter your email" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl><Input type="password" placeholder="Enter new password" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-black/90 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? <Loader2Icon className="animate-spin" /> : "Reset Password"}
          </Button>
        </form>
      </Form>
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Remember your password?{" "}
          <Link href="/login" className="text-green-600 hover:text-green-700 font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
