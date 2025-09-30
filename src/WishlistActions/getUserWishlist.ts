"use server";
import { getMyToken } from "@/utilities/token";
import { API_BASE } from "@/lib/http";

export async function getUserWishlistAction() {
  const token = await getMyToken();
  if (!token) throw Error("Please, Login First!");
  const res = await fetch(`${API_BASE}/wishlist`, { headers: { token: token as string }, cache: "no-store" });
  return await res.json();
}
