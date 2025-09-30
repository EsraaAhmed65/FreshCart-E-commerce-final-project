"use server";

import { getMyToken } from "@/utilities/token";
import { jwtDecode } from "jwt-decode";

const API = process.env.API || process.env.NEXT_PUBLIC_API;

export async function getUserOrders() {
  if (!API) throw new Error("API base url is missing");
  const token = await getMyToken();
  if (!token) throw new Error("Login first");

  let userId = "";
  try {
    const dec: any = jwtDecode(token);
    userId = dec?.id || dec?.sub || dec?.user?._id || "";
  } catch {}

  if (!userId) throw new Error("Unable to resolve user id");

  const res = await fetch(`${API}/orders/user/${userId}`, {
    headers: { token: token as string },
    cache: "no-store",
    next: { revalidate: 0 },
  });

  if (res.status === 404) return [];
  if (!res.ok) throw new Error(`Orders request failed ${res.status}`);

  const data = await res.json();
  return data;
}
