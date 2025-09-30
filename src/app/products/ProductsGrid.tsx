"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import HomeCard from "@/app/_components/HomeCard/HomeCard";
import type { Product } from "@/types/product.t";

export default function ProductsGrid({ products }: { products: Product[] }) {
  const sp = useSearchParams();
  const q = (sp.get("q") || "").trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!q) return products;
    return products.filter((p) => {
      const title = (p.title || "").toLowerCase();
      const cat = (p.category?.name || "").toLowerCase();
      return title.includes(q) || cat.includes(q);
    });
  }, [products, q]);

  if (!filtered.length) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No results match “{q}”.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap mt-10">
      {filtered.map((p) => (
        <HomeCard key={p._id || p.id} product={p} />
      ))}
    </div>
  );
}
