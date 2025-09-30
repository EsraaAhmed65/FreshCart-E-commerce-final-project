"use server";
import { getMyToken } from "@/utilities/token";
import { API_BASE } from "@/lib/http";

export async function getUserCartAction() {
  const token = await getMyToken();
  if (!token) return null;
  const res = await fetch(`${API_BASE}/cart`, { headers: { token: token as string }, cache: "no-store" });
  if (!res.ok) return null;
  return await res.json();
}
