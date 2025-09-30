"use client";
import { Button } from "@/components/ui/button";
import { cartContext } from "@/Context/CartContext";
import { ProductCart } from "@/types/cart.t";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { toast } from "sonner";
import Loading from "../loading";

export default function Cart() {
  const { isLoading, products, totalCartPrice, removeCartItem, updateCart, clearCart } =
    useContext(cartContext);

  const [busyId, setBusyId] = useState<string | null>(null);

  async function removeItem(productId: string) {
    if (busyId) return;
    setBusyId(productId);
    const resp = await removeCartItem(productId);
    const ok = resp?.ok === true || resp?.status === "success";
    if (ok) toast.success("Removed From Cart successfully", { duration: 1000, position: "top-center" });
    else toast.error("Failed to Remove From Cart", { duration: 1000, position: "top-center" });
    setBusyId(null);
  }

  async function updateItem(productId: string, count: number) {
    if (busyId) return;
    if (count < 1) return removeItem(productId);
    setBusyId(productId);
    const resp = await updateCart(productId, count);
    const ok = resp?.ok === true || resp?.status === "success";
    if (ok) toast.success("Cart Updated successfully!", { duration: 1000, position: "top-center" });
    else toast.error("Failed to update the Cart", { duration: 1000, position: "top-center" });
    setBusyId(null);
  }

  if (isLoading) return <Loading />;

  if (!products?.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-red-600 text-3xl font-bold">Cart is Empty!</h1>
      </div>
    );
  }

  return (
    <div className="w-full md:w-[80%] mx-auto my-10 px-5 md:px-0 bg-slate-100">
      <div className="p-5">
        <h1 className="text-2xl font-bold">Shop Cart :</h1>
        <p className="my-3 text-green-700 font-mono">Total Price : {totalCartPrice} EGP</p>

        <div className="mb-10 flex items-center gap-3">
          <Button className="bg-black text-white" onClick={clearCart}>Clear Cart</Button>
          <Link href="/payment">
            <Button className="bg-black text-white">Go To Payment</Button>
          </Link>
        </div>

        <div className="allProducts space-y-6">
          {products.map((item: ProductCart) => {
            const productId = (item.product as any)?._id ?? (item.product as any)?.id ?? "";
            const pending = busyId === productId;

            return (
              <div
                key={item._id || productId}
                className="flex items-center justify-between p-5 border border-gray-200 rounded-lg bg-white shadow-md"
              >
                <div className="flex items-center gap-5">
                  <div className="flex-shrink-0">
                    {item.product?.imageCover ? (
                      <Image
                        alt={item.product.title}
                        src={item.product.imageCover}
                        height={180}
                        width={180}
                        className="rounded-xl object-cover shadow-sm border border-gray-100"
                      />
                    ) : (
                      <div className="h-[180px] w-[180px] grid place-items-center rounded-xl bg-gray-50 border border-gray-100 text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>

                  <div>
                    <h1 className="font-semibold text-slate-800 text-lg">{item.product.title}</h1>
                    <p className="my-2 text-green-600 font-medium">Price : {item.price} EGP</p>
                    <Button
                      className="bg-black text-white px-5 py-2 rounded-md"
                      onClick={() => removeItem(productId)}
                      disabled={pending || !productId}
                    >
                      {pending ? "Removing..." : "Remove"}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    className="px-4 py-2 bg-black text-white rounded-md"
                    onClick={() => updateItem(productId, item.count + 1)}
                    disabled={pending || !productId}
                  >
                    +
                  </Button>
                  <p className="w-6 text-center">{item.count}</p>
                  <Button
                    className="px-4 py-2 bg-black text-white rounded-md"
                    onClick={() => updateItem(productId, item.count - 1)}
                    disabled={pending || !productId}
                  >
                    -
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
