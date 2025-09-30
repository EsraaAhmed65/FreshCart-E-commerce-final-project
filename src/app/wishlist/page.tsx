"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useContext } from "react";
import Loading from "../loading";
import { WishlistContext } from "@/Context/WishlistContext";

export default function WishlistPage() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("WishlistContext is not provided");
  const { isLoading, wishlistProducts, removeFromWishlist, pendingIds } = ctx;

  if (isLoading) return <Loading />;

  if (!wishlistProducts.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-red-600 text-3xl font-bold">Wishlist is Empty!</h1>
      </div>
    );
  }

  return (
    <div className="w-full md:w-[80%] mx-auto my-10 px-5 md:px-0 bg-slate-100">
      <div className="p-5">
        <h1 className="text-2xl font-bold">Wishlist :</h1>
        <p className="my-3 text-green-700 font-mono">Items: {wishlistProducts.length}</p>

        <div className="allProducts space-y-6">
          {wishlistProducts.map((p: any) => {
            const pid = p._id ?? p.id;
            const pending = pendingIds.includes(pid);
            return (
              <div key={pid} className="flex items-center justify-between p-5 border border-gray-200 rounded-lg bg-white shadow-md">
                <div className="flex items-center gap-5">
                  <div className="flex-shrink-0">
                    {p?.imageCover ? (
                      <Image alt={p?.title || "product"} src={p.imageCover} height={180} width={180} className="rounded-xl object-cover shadow-sm border border-gray-100" />
                    ) : (
                      <div className="h-[180px] w-[180px] grid place-items-center rounded-xl bg-gray-50 border border-gray-100 text-gray-400">No Image</div>
                    )}
                  </div>
                  <div>
                    <h1 className="font-semibold text-slate-800 text-lg line-clamp-1">{p?.title}</h1>
                    <p className="my-2 text-green-600 font-medium">Price : {p?.price} EGP</p>
                    <Button className="bg-black text-white px-5 py-2 rounded-md" onClick={() => removeFromWishlist(pid)} disabled={pending}>
                      {pending ? "Removing..." : "Remove"}
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{p?.category?.name ? `Category: ${p.category.name}` : null}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
