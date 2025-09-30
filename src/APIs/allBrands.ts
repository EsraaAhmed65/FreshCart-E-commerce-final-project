import type { Brand } from "../types/brand.t"; 

export default async function getAllBrands() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch brands");
  const { data } = await res.json();
  return data as Brand[];
}


