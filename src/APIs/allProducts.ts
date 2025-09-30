import type { Product } from "@/types/product.t";

type Params = {
  categoryId?: string;
  page?: number;
  limit?: number;
  sort?: string;
  q?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API || "https://ecommerce.routemisr.com/api/v1";

async function fetchWithRetry(input: string, init?: RequestInit, tries = 2, timeoutMs = 10000) {
  for (let attempt = 1; attempt <= tries; attempt++) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(input, { ...init, signal: controller.signal, cache: "no-store" });
      clearTimeout(id);
      if (res.ok) return res;
      if (attempt === tries) return res;
    } catch {
      clearTimeout(id);
      if (attempt === tries) throw new Error("network-timeout");
    }
    await new Promise((r) => setTimeout(r, 350));
  }
  throw new Error("unreachable");
}

export default async function getAllProducts(params: Params = {}): Promise<Product[]> {
  const { categoryId, page = 1, limit = 40, sort = "", q = "" } = params;

  const url = new URL(`${API_BASE}/products`);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));
  if (sort) url.searchParams.set("sort", sort);
  if (q) url.searchParams.set("keyword", q);            
  if (categoryId) url.searchParams.set("category[in]", categoryId);

  try {
    const response = await fetchWithRetry(url.toString(), undefined, 2, 10000);
    if (!response.ok) return [];
    const json = await response.json();
    return (json?.data as Product[]) || [];
  } catch {
    return [];
  }
}
