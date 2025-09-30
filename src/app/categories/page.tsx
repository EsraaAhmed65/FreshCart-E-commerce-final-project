import React from "react";
import getAllCategories from "@/APIs/allCategories";
import CategoryCard from "@/app/_components/CategoryCard/CategoryCard"; 
import type { Category } from "@/types/category.t";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories: Category[] = await getAllCategories();

  return (
    <section className="px-5 md:px-0 my-10 w-full md:w-[80%] mx-auto">
      <h1 className="mb-8 text-center text-3xl md:text-4xl font-bold text-green-600">
        All Categories
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((c) => (
          <CategoryCard key={c._id} category={c} />
        ))}
      </div>
    </section>
  );
}
