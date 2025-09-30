"use server";

import { getMyToken } from "@/utilities/token";

export async function updateCartAction(itemId: string, count: number) {
  const token = await getMyToken();
  if (!token) throw new Error("Login first");

  const res = await fetch(`${process.env.API}/cart/${itemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({ count }),
  });

  const data = await res.json().catch(() => null);
  return { ok: res.ok, status: data?.status ?? (res.ok ? "success" : "failed"), data };
}
