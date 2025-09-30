"use server";

import { getMyToken } from "@/utilities/token";

export async function getUserWishlistAction() {
  const token = await getMyToken();
  if (!token) throw new Error("Login first");

  const res = await fetch(`${process.env.API}/wishlist`, {
    headers: { token },
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);
  return data;
}
