"use server";
import { getMyToken } from "@/utilities/token";
import { http } from "@/lib/http";

export async function removeProductFromWishlistAction(id: string) {
  const token = await getMyToken();
  if (!token) throw Error("Please, Login First!");
  const { data } = await http.delete(`/wishlist/${id}`, { headers: { token: token as string } });
  return data;
}
