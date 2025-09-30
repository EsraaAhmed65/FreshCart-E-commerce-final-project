"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";

type Decoded = { id?: string; sub?: string };
type Item = { count: number; price: number; product: { _id: string; title: string; imageCover?: string } };
type Order = { _id: string; paymentMethodType: string; totalOrderPrice: number; cartItems: Item[] };

export default function Page() {
  const { data: session, status } = useSession();
  const token = (session as any)?.accessToken || "";
  const base = process.env.NEXT_PUBLIC_API || process.env.API || "";

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function run() {
      if (status !== "authenticated" || !token) return;
      let userId = "";
      try {
        const d = jwtDecode<Decoded>(token);
        userId = d?.id || d?.sub || "";
      } catch {}
      if (!userId) return;

      setLoading(true);
      try {
        const res = await fetch(`${base}/orders/user/${userId}`, { headers: { token }, cache: "no-store" });
        const json = await res.json();
        setOrders(Array.isArray(json) ? json : json?.data ?? []);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }
    run();
  }, [status, token, base]);

  if (loading) return <div className="w-full md:w-[80%] mx-auto my-10 px-5">Loading...</div>;

  return (
    <div className="md:w-[80%] mx-auto w-full my-10 px-5 md:px-0">
      <h1 className="text-3xl font-bold text-green-600 mb-8 text-center">Orders History</h1>
      {orders.length === 0 ? (
        <div className="text-center text-slate-500">No orders.</div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => {
            const isOnline =
              order.paymentMethodType?.toLowerCase() === "card" ||
              order.paymentMethodType?.toLowerCase() === "online";
            return (
              <div key={order._id} className="p-6 rounded-lg border border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-800">
                    {isOnline ? "ONLINE PAYMENT" : "CASH PAYMENT"}
                  </h2>
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full ${
                      isOnline ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"
                    }`}
                  >
                    {isOnline ? "ONLINE" : "CASH"}
                  </span>
                </div>

                <div className="flex flex-wrap gap-5">
                  {order.cartItems.map((item, i) => (
                    <div key={i} className="w-32 flex flex-col items-center text-center">
                      <img
                        src={item.product.imageCover || ""}
                        alt={item.product.title}
                        className="rounded-md object-cover border border-gray-200 w-28 h-28"
                      />
                      <h3 className="line-clamp-1 mt-2 text-sm font-medium text-slate-700">
                        {item.product.title}
                      </h3>
                      <p className="text-green-600 font-semibold text-sm mt-1">{item.price} EGP</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t pt-4 text-slate-700">
                  <p>
                    <span className="font-semibold">Total Price: </span>
                    <span className="text-green-700 font-bold">{order.totalOrderPrice} EGP</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
