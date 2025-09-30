"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function cashPaymentAction(cartId: string, values: any) {
  const session = await getServerSession(authOptions);
  const token = (session as any)?.accessToken || "";
  if (!cartId || !token) throw new Error("missing cartId or token");

  const base = process.env.NEXT_PUBLIC_API || process.env.API || "";
  const res = await fetch(`${base}/orders/${cartId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", token },
    body: JSON.stringify(values),
    cache: "no-store",
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error("cash order failed");
  return data;
}
