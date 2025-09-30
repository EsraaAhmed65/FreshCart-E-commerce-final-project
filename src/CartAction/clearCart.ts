"use server";
import { getMyToken } from "@/utilities/token";
import { http } from "@/lib/http";

export async function clearCartAction() {
  const token = await getMyToken();
  if (!token) throw Error("Login First!");
  const { data } = await http.delete("/cart", { headers: { token: token as string } });
  return data;
}
