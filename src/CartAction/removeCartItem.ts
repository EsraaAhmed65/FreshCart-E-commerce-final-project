"use server";
import { getMyToken } from "@/utilities/token";
import { http } from "@/lib/http";

export async function removeCartItemAction(id: string) {
  const token = await getMyToken();
  if (!token) throw Error("Login first!");
  const { data } = await http.delete(`/cart/${id}`, { headers: { token: token as string } });
  return data;
}
