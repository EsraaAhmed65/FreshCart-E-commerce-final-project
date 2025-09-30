"use server";

const API = process.env.NEXT_PUBLIC_API || "https://ecommerce.routemisr.com/api/v1";

export async function ForgetPasswordAction(email: string) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 12000);
  try {
    const res = await fetch(`${API}/auth/forgotPasswords`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
      signal: controller.signal,
      cache: "no-store",
    });
    if (!res.ok) {
      const err = await res.text().catch(() => "");
      return { ok: false, status: "failed", error: err || `HTTP ${res.status}` };
    }
    const data = await res.json().catch(() => ({}));
    return { ok: true, status: "success", data };
  } catch (e: any) {
    return { ok: false, status: "failed", error: e?.message || "network" };
  } finally {
    clearTimeout(t);
  }
}
