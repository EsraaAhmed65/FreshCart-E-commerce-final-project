"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export type WishlistProduct = { _id: string; title: string; price: number; imageCover?: string; category?: { name?: string } };

type Ctx = {
  isLoading: boolean;
  wishlistProducts: WishlistProduct[];
  numOfWishlistItems: number;
  pendingIds: string[];
  refreshWishlist: () => Promise<void>;
  addToWishlist: (id: string) => Promise<void>;
  removeFromWishlist: (id: string) => Promise<void>;
  inWishlist: (id: string) => boolean;
};

export const WishlistContext = createContext<Ctx | null>(null);

export default function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { status, data: session } = useSession();
  const token = (session as any)?.accessToken || "";
  const base = process.env.NEXT_PUBLIC_API || process.env.API || "";

  const [isLoading, setIsLoading] = useState(true);
  const [wishlistProducts, setWishlistProducts] = useState<WishlistProduct[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [numOfWishlistItems, setNum] = useState(0);
  const [pendingIds, setPending] = useState<string[]>([]);
  const reqSeq = useRef(0);

  const applySnapshot = useCallback((items: WishlistProduct[]) => {
    setWishlistProducts(items);
    setWishlistIds(items.map((p) => p._id));
    setNum(items.length);
  }, []);

  const refreshWishlist = useCallback(async () => {
    if (!token) return;
    const seq = ++reqSeq.current;
    try {
      const res = await fetch(`${base}/wishlist`, { headers: { token }, cache: "no-store" });
      const json = await res.json();
      if (seq !== reqSeq.current) return;
      const items: WishlistProduct[] = json?.data ?? [];
      applySnapshot(items);
    } catch {
      // silent
    } finally {
      if (seq === reqSeq.current) setIsLoading(false);
    }
  }, [token, base, applySnapshot]);

  useEffect(() => {
    if (status === "authenticated") {
      setIsLoading(true);
      refreshWishlist();
    } else if (status === "unauthenticated") {
      applySnapshot([]);
      setIsLoading(false);
    }
  }, [status, refreshWishlist, applySnapshot]);

  const inWishlist = useCallback((id: string) => wishlistIds.includes(id), [wishlistIds]);

  const addToWishlist = useCallback(async (id: string) => {
    if (!token || pendingIds.includes(id) || inWishlist(id)) return;
    setPending((p) => [...p, id]);
    setWishlistIds((ids) => (ids.includes(id) ? ids : [...ids, id]));
    setNum((n) => n + 1);
    try {
      const res = await fetch(`${base}/wishlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json", token },
        body: JSON.stringify({ productId: id }),
      });
      if (!res.ok) throw new Error();
      toast.success("Added to wishlist", { duration: 900 });
      refreshWishlist();
    } catch {
      setWishlistIds((ids) => ids.filter((x) => x !== id));
      setNum((n) => Math.max(0, n - 1));
      toast.error("Failed to add", { duration: 1200 });
    } finally {
      setPending((p) => p.filter((x) => x !== id));
    }
  }, [token, pendingIds, inWishlist, base, refreshWishlist]);

  const removeFromWishlist = useCallback(async (id: string) => {
    if (!token || pendingIds.includes(id) || !inWishlist(id)) return;
    setPending((p) => [...p, id]);
    setWishlistIds((ids) => ids.filter((x) => x !== id));
    setNum((n) => Math.max(0, n - 1));
    try {
      const res = await fetch(`${base}/wishlist/${id}`, { method: "DELETE", headers: { token } });
      if (!res.ok && res.status !== 404) throw new Error();
      toast.success("Removed from wishlist", { duration: 900 });
      refreshWishlist();
    } catch {
      setWishlistIds((ids) => (ids.includes(id) ? ids : [...ids, id]));
      setNum((n) => n + 1);
      toast.error("Failed to remove", { duration: 1200 });
    } finally {
      setPending((p) => p.filter((x) => x !== id));
    }
  }, [token, pendingIds, inWishlist, base, refreshWishlist]);

  const value = useMemo(
    () => ({
      isLoading,
      wishlistProducts,
      numOfWishlistItems: numOfWishlistItems,
      pendingIds,
      refreshWishlist,
      addToWishlist,
      removeFromWishlist,
      inWishlist,
    }),
    [isLoading, wishlistProducts, numOfWishlistItems, pendingIds, refreshWishlist, addToWishlist, removeFromWishlist, inWishlist]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("WishlistContext is not provided");
  return ctx;
};
