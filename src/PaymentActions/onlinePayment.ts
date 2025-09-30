"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function onlinePaymentAction(cartId: string, values: any) {
  const session = await getServerSession(authOptions);
  const token = (session as any)?.accessToken || "";
  if (!cartId || !token) throw new Error("missing cartId or token");

  const base = process.env.NEXT_PUBLIC_API || process.env.API || "";
  const origin =
    process.env.NEXTAUTH_URL ||
    process.env.NEXT_URL ||
    "http://localhost:3000";

  const res = await fetch(
    `${base}/orders/checkout-session/${cartId}?url=${encodeURIComponent(origin)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", token },
      body: JSON.stringify(values),
      cache: "no-store",
    }
  );

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data?.session?.url) throw new Error("checkout failed");
  return data;
}
