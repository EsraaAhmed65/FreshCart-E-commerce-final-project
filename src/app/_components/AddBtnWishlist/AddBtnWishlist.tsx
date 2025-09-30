"use client";

import { Button } from "@/components/ui/button";
import { useWishlist } from "@/Context/WishlistContext";
import { Heart } from "lucide-react";

type Props = { productId?: string; id?: string; className?: string; size?: "icon" | "sm" | "default" | "lg" };

export default function AddBtnWishlist({ productId, id, className, size = "icon" }: Props) {
  const pid = productId ?? id ?? "";
  const { inWishlist, addToWishlist, removeFromWishlist, pendingIds } = useWishlist();
  const active = pid ? inWishlist(pid) : false;
  const pending = pid ? pendingIds.includes(pid) : true;

  const toggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!pid || pending) return;
    if (active) await removeFromWishlist(pid);
    else await addToWishlist(pid);
  };

  return (
    <Button type="button" variant="outline" size={size} className={className} onClick={toggle} disabled={!pid || pending}>
      <Heart className={active ? "fill-current text-red-600" : ""} />
    </Button>
  );
}
