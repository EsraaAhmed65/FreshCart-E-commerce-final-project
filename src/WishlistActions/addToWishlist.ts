"use server";

import { getMyToken } from "@/utilities/token";

export async function addProductToWishlistAction(productId: string) {
  const token = await getMyToken();
  if (!token) throw new Error("Login first");

  const res = await fetch(`${process.env.API}/wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({ productId }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message || "Failed to add to wishlist");
  return data;
}
