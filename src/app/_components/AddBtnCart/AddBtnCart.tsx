"use client";

import { useState, MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { cartContext } from "@/Context/CartContext";
import { useContext } from "react";
import { toast } from "sonner";

type Props = { productId?: string; id?: string; className?: string; label?: string };

export default function AddBtnCart({ productId, id, className, label = "Add to cart" }: Props) {
  const { addProductToCart } = useContext(cartContext);
  const [pending, setPending] = useState(false);
  const pid = productId ?? id ?? "";

  const handleAddToCart = async (e?: MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (pending || !pid) return;
    setPending(true);
    const resp = await addProductToCart(pid);
    const ok = resp?.ok === true || resp?.status === "success";
    if (ok) toast.success("Product added to cart successfully!", { duration: 1000, position: "top-center" });
    else toast.error("Failed to add product to cart", { duration: 1200, position: "top-center" });
    setPending(false);
  };

  return (
    <Button className={className} onClick={handleAddToCart} disabled={pending || !pid}>
      {pending ? "Adding..." : label}
    </Button>
  );
}
