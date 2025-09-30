import type { Category } from "../types/category.t";

export default async function getAllCategories(): Promise<Category[]> {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  const { data } = await res.json();
  return data as Category[];
}
