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
import { forgetPasswordSchema, type ForgetPasswordSchemaType } from "@/schema/ForgetPassword.schema";
import { ForgetPasswordAction } from "@/AuthActions/forgetPassword";

export default function ForgetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ForgetPasswordSchemaType>({
    defaultValues: { email: "" },
    resolver: zodResolver(forgetPasswordSchema),
  });

  async function onSubmit(values: ForgetPasswordSchemaType) {
    setIsLoading(true);
    const res = await ForgetPasswordAction(values.email.trim());
    if (res?.ok) {
      toast.success(res?.data?.message || "Reset code sent to your email");
      router.push("/verifyCode");
    } else {
      toast.error(res?.error || "Something went wrong");
    }
    setIsLoading(false);
  }

  return (
    <div className="w-full max-w-md mx-auto py-12 px-5">
      <h1 className="text-2xl font-semibold mb-6 text-center">Forget Password</h1>
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
          <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-black/90 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? <Loader2Icon className="animate-spin" /> : "Send Reset Code"}
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
