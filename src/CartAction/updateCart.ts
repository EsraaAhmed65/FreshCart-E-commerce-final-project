"use server";
import { getMyToken } from "@/utilities/token";
import { http } from "@/lib/http";

export async function updateCartAction(id: string, count: number) {
  const token = await getMyToken();
  if (!token) throw Error("Login first!");
  const { data } = await http.put(`/cart/${id}`, { count }, { headers: { token: token as string } });
  return data;
}
