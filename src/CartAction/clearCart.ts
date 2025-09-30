"use server";

import { getMyToken } from "@/utilities/token";

export async function clearCartAction() {
  const token = await getMyToken();
  if (!token) throw new Error("Login first");

  const res = await fetch(`${process.env.API}/cart`, {
    method: "DELETE",
    headers: { token },
  });

  const data = await res.json().catch(() => null);
  return { ok: res.ok, status: data?.status ?? (res.ok ? "success" : "failed"), data };
}
