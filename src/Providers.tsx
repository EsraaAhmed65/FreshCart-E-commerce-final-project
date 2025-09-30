"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import CartContextProvider from "@/Context/CartContext";
import WishlistProvider from "@/Context/WishlistContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartContextProvider>
        <WishlistProvider>{children}</WishlistProvider>
      </CartContextProvider>
    </SessionProvider>
  );
}
