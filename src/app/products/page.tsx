import React from "react";
import { notFound } from "next/navigation";
import getAllProducts from "@/APIs/allProducts";
import type { Product } from "@/types/product.t";
import SearchBar from "@/app/_components/SearchBar/SearchBar";
import ProductsGrid from "@/app/products/ProductsGrid";

export const dynamic = "force-dynamic";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category: categoryId = "" } = await searchParams;

  const products: Product[] = await getAllProducts({ categoryId });

  if (categoryId && (!products || products.length === 0)) {
    notFound();
  }

  return (
    <section className="px-5 md:px-0 my-10 w-full md:w-[80%] mx-auto">
      <h1 className="text-2xl font-bold text-green-600 text-center mb-6">
        {categoryId ? "Filtered by category" : "All Products"}
      </h1>

      <SearchBar />

      <ProductsGrid products={products} />
    </section>
  );
}
