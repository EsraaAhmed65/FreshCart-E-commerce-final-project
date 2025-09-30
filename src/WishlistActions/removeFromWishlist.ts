"use server";

import { getMyToken } from "@/utilities/token";

export async function removeProductFromWishlistAction(productId: string) {
  const token = await getMyToken();
  if (!token) throw new Error("Login first");

  const res = await fetch(`${process.env.API}/wishlist/${productId}`, {
    method: "DELETE",
    headers: { token },
  });

  const data = await res.json().catch(() => null);

  if (!res.ok && res.status !== 404) {
    throw new Error(data?.message || "Failed to remove from wishlist");
  }
  return data ?? { status: res.ok ? "success" : "failed" };
}
