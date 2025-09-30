"use server";
import { getMyToken } from "@/utilities/token";

export async function getUserWishlistAction() {
  const token = await getMyToken();
  if (!token) throw Error("Please, Login First!");
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 12000);

  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: { token: token as string },
      signal: controller.signal,
      cache: "no-store",
    });
    return await res.json();
  } finally {
    clearTimeout(t);
  }
}
