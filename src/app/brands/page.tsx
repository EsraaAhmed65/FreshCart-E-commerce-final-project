import React from "react";
import getAllBrands from "../../APIs/allBrands";
import BrandCard from "../../app/_components/BrandCard/BrandCard";
import type { Brand } from "../../types/brand.t";

export const dynamic = "force-dynamic";

export default async function BrandsPage() {
  const brands: Brand[] = await getAllBrands();

  return (
    <section className="px-5 md:px-0 my-10 w-full md:w-[80%] mx-auto">
      <h1 className="text-4xl font-bold text-green-600 text-center mb-10">All Brands</h1>
      <div className="flex flex-wrap">
        {brands.map((b) => (
          <BrandCard key={b._id} brand={b} />
        ))}
      </div>
    </section>
  );
}
