"use client";

import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/types/category.t";

export default function CategoryCard({ category }: { category: Category }) {
  return (
      <Link href={`/products?category=${category._id}`} className="block w-full">
  
      <div
        className="
          overflow-hidden rounded-xl border border-green-200 bg-white shadow-sm
          transition duration-200 hover:border-green-400 hover:shadow-md
        "
      >
        <div className="relative h-56 w-full bg-white">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover md:object-contain select-none"
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            draggable={false}
            priority={false}
          />
        </div>

        <div className="bg-white">
          <p className="py-4 text-center text-2xl font-semibold text-green-600">
            {category.name}
          </p>
        </div>
      </div>
    </Link>
  );
}
