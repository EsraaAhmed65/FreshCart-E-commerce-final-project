"use client";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Product } from "@/types/product.t";
import Image from "next/image";
import Link from "next/link";
import AddBtnCart from "../AddBtnCart/AddBtnCart";
import AddBtnWishlist from "../AddBtnWishlist/AddBtnWishlist";

export default function HomeCard({ product }: { product: Product }) {
  const pid = (product as any)._id ?? (product as any).id ?? "";
  return (
    <div className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-3">
      <Card className="p-2 gap-2">
        <div className="absolute top-3 right-3 z-10">
          <AddBtnWishlist productId={pid} />
        </div>

        <Link href={`/productDetails/${pid}`} className="block">
          <CardHeader className="p-0">
            <Image
              width={500}
              height={500}
              src={product.imageCover}
              alt={product.title}
              className="w-full h-64 object-cover rounded-t-lg"
              priority={false}
            />
          </CardHeader>

          <CardContent className="p-0 mt-2">
            <p className="font-bold text-green-500 mb-1">{product.category?.name ?? "—"}</p>
            <p className="line-clamp-1">{product.title}</p>
          </CardContent>

          <CardFooter className="p-0 mt-2">
            <div className="w-full flex justify-between items-center">
              <p>{product.price} EGP</p>
              <p>
                {product.ratingsAverage ?? 0} <i className="fa-solid fa-star text-yellow-300" />
              </p>
            </div>
          </CardFooter>
        </Link>

        <AddBtnCart productId={pid} />
      </Card>
    </div>
  );
}
