"use server";
import { getMyToken } from "@/utilities/token";
import { http } from "@/lib/http";

export async function AddToCartAction(id: string) {
  const token = await getMyToken();
  if (!token) throw Error("Login First");
  const { data } = await http.post("/cart", { productId: id }, { headers: { token: token as string } });
  return data;
}
