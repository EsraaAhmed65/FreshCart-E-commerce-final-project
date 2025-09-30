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
import { verifyCodeSchema, type VerifyCodeSchemaType } from "@/schema/VerifyCode.schema";
import { VerifyResetPasswordAction } from "@/AuthActions/verifyResetPassword";

export default function VerifyCodePage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<VerifyCodeSchemaType>({
    defaultValues: { resetCode: "" },
    resolver: zodResolver(verifyCodeSchema),
  });

  async function onSubmit(values: VerifyCodeSchemaType) {
    setIsLoading(true);
    const res = await VerifyResetPasswordAction(values.resetCode.trim());
    if (res?.ok) {
      toast.success(res?.data?.message || "Code verified successfully");
      router.push("/resetPassword");
    } else {
      toast.error(res?.error || "Invalid reset code");
    }
    setIsLoading(false);
  }

  return (
    <div className="w-full max-w-md mx-auto py-12 px-5">
      <h1 className="text-2xl font-semibold mb-6 text-center">Verify Reset Code</h1>
      <p className="text-center text-gray-600 mb-8">Please enter the reset code that was sent to your email address.</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="resetCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reset Code</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter the reset code" {...field} className="text-center text-lg tracking-widest" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-black/90 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? <Loader2Icon className="animate-spin" /> : "Verify Code"}
          </Button>
        </form>
      </Form>
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Didn&apos;t receive the code?{" "}
          <Link href="/forgetPassword" className="text-green-600 hover:text-green-700 font-medium">Resend code</Link>
        </p>
      </div>
    </div>
  );
}
