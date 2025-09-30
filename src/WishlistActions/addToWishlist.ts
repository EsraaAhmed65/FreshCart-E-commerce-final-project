"use server";
import { getMyToken } from "@/utilities/token";
import { http } from "@/lib/http";

export async function addProductToWishlistAction(id: string) {
  const token = await getMyToken();
  if (!token) throw Error("Please, Login First!");
  const { data } = await http.post("/wishlist", { productId: id }, { headers: { token: token as string } });
  return data;
}
