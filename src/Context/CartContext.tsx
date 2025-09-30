"use client";

import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";

type CartProduct = {
  _id: string;
  product: {
    _id: string;
    title: string;
    imageCover?: string;
    category?: { name?: string };
  };
  count: number;
  price: number;
};

type CartApiShape = {
  status?: string;
  numOfCartItems?: number;
  data?: {
    _id?: string;
    totalCartPrice?: number;
    products?: CartProduct[];
  };
};

export const cartContext = createContext({} as any);

export default function CartContextProvider({ children }: { children: React.ReactNode }) {
  const { status, data: session } = useSession();
  const token = (session as any)?.accessToken || "";

  const [isLoading, setIsLoading] = useState(false);
  const [numOfCartItems, setNum] = useState(0);
  const [totalCartPrice, setTotal] = useState(0);
  const [cartId, setCartId] = useState("");
  const [products, setProducts] = useState<CartProduct[]>([]);

  const applyCart = useCallback((payload: CartApiShape | null) => {
    const p = payload || {};
    const d = p.data || {};
    const list = d.products || [];
    setNum(typeof p.numOfCartItems === "number" ? p.numOfCartItems : list.length);
    setTotal(d.totalCartPrice || 0);
    setProducts(list);
    setCartId(d._id || "");
  }, []);

  const authHeader = useMemo(() => (token ? { token } : {}), [token]);
  const base = process.env.NEXT_PUBLIC_API || process.env.API || "";

  const getUserCart = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${base}/cart`, { headers: authHeader, cache: "no-store" });
      const data = (await res.json()) as CartApiShape;
      applyCart(data);
    } catch {
      // silent
    } finally {
      setIsLoading(false);
    }
  }, [token, base, authHeader, applyCart]);

  async function addProductToCart(id: string) {
    if (!token || !id) return { ok: false, status: "failed" };
    try {
      const res = await fetch(`${base}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeader },
        body: JSON.stringify({ productId: id }),
      });
      const json = await res.json();
      await getUserCart();
      const ok = res.ok && (json?.status === "success" || json?.status === "Success");
      return { ok, status: ok ? "success" : "failed", data: json };
    } catch {
      return { ok: false, status: "failed" };
    }
  }

  async function removeCartItem(id: string) {
    if (!token || !id) return { ok: false, status: "failed" };
    try {
      const res = await fetch(`${base}/cart/${id}`, { method: "DELETE", headers: authHeader });
      const json = await res.json();
      if (json?.data) applyCart(json as CartApiShape);
      else await getUserCart();
      const ok = res.ok && (json?.status === "success" || json?.status === "Success");
      return { ok, status: ok ? "success" : "failed", data: json };
    } catch {
      return { ok: false, status: "failed" };
    }
  }

  async function updateCart(id: string, count: number) {
    if (!token || !id) return { ok: false, status: "failed" };
    try {
      const res = await fetch(`${base}/cart/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeader },
        body: JSON.stringify({ count }),
      });
      const json = await res.json();
      if (json?.data) applyCart(json as CartApiShape);
      else await getUserCart();
      const ok = res.ok && (json?.status === "success" || json?.status === "Success");
      return { ok, status: ok ? "success" : "failed", data: json };
    } catch {
      return { ok: false, status: "failed" };
    }
  }

  async function clearCart() {
    if (!token) return { ok: false, status: "failed" };
    try {
      const res = await fetch(`${base}/cart`, { method: "DELETE", headers: authHeader });
      await getUserCart();
      const ok = res.ok;
      if (ok) {
        setNum(0);
        setTotal(0);
        setProducts([]);
        setCartId("");
      }
      return { ok, status: ok ? "success" : "failed" };
    } catch {
      return { ok: false, status: "failed" };
    }
  }

  function afterPayment() {
    setNum(0);
    setTotal(0);
    setProducts([]);
    setCartId("");
  }

  useEffect(() => {
    if (status === "authenticated") getUserCart();
    if (status === "unauthenticated") {
      setNum(0);
      setTotal(0);
      setProducts([]);
      setCartId("");
      setIsLoading(false);
    }
  }, [status, getUserCart]);

  const value = useMemo(
    () => ({
      isLoading,
      numOfCartItems,
      totalCartPrice,
      products,
      cartId,
      addProductToCart,
      removeCartItem,
      updateCart,
      clearCart,
      afterPayment,
      getUserCart,
    }),
    [isLoading, numOfCartItems, totalCartPrice, products, cartId]
  );

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
}
