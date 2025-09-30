"use server";

import { getMyToken } from "@/utilities/token";
import axios from "axios";

function isTimeoutOrNetwork(e: any) {
  const code = e?.code || e?.cause?.code;
  const msg = String(e?.message || "").toLowerCase();
  return (
    code === "ETIMEDOUT" ||
    code === "UND_ERR_CONNECT_TIMEOUT" ||
    msg.includes("timeout") ||
    msg.includes("network") ||
    msg.includes("aborted")
  );
}

export async function removeProductFromWishlistAction(id: string) {
  const token = await getMyToken();
  if (!token) throw Error("Please, Login First!");

  const instance = axios.create({
    baseURL: "https://ecommerce.routemisr.com/api/v1",
    headers: { token: token as string },
    timeout: 12000,
  });

  let lastErr: any = null;

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const { data, status } = await instance.delete(`/wishlist/${id}`);
      if (status >= 200 && status < 300) return { ok: true, data };
      lastErr = new Error(`Unexpected status ${status}`);
    } catch (e: any) {
      const status = e?.response?.status;
      if (status === 404) return { ok: true, data: null };
      lastErr = e;
      if (!isTimeoutOrNetwork(e)) break;
    }
  }

  throw lastErr || new Error("Failed to remove from wishlist");
}
