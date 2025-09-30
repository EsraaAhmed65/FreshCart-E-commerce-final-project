"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cartContext } from "@/Context/CartContext";
import { cashPaymentAction } from "@/PaymentActions/cashPayment";
import { onlinePaymentAction } from "@/PaymentActions/onlinePayment";
import React, { useContext, useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Payment() {
  const router = useRouter();
  const { cartId, afterPayment } = useContext(cartContext);
  const [pending, setPending] = useState(false);

  const details = useRef<HTMLInputElement>(null);
  const phone = useRef<HTMLInputElement>(null);
  const city = useRef<HTMLInputElement>(null);

  const payload = {
    shippingAddress: {
      details: details.current?.value || "",
      phone: phone.current?.value || "",
      city: city.current?.value || "",
    },
  };

  const cashPayment = async () => {
    if (!cartId || pending) return;
    setPending(true);
    try {
      const data = await cashPaymentAction(cartId, payload);
      toast.success(String(data?.status || "success"), { position: "top-center", duration: 1000 });
      afterPayment();
      router.push("/allorders");
    } catch {
      toast.error("Cash payment failed", { position: "top-center" });
    } finally {
      setPending(false);
    }
  };

  const onlinePayment = async () => {
    if (!cartId || pending) return;
    setPending(true);
    try {
      const data = await onlinePaymentAction(cartId, payload);
      if (data?.status === "success" && data?.session?.url) {
        window.location.href = data.session.url;
      } else {
        throw new Error("no session");
      }
    } catch {
      toast.error("Online payment failed", { position: "top-center" });
      setPending(false);
    }
  };

  return (
    <div className="w-full md:w-1/2 my-10 mx-auto px-5 md:px-0">
      <h1 className="mb-10 text-center text-3xl font-bold">Payment</h1>

      <div>
        <label htmlFor="details">Details</label>
        <Input ref={details} type="text" id="details" className="mb-4" />

        <label htmlFor="phone">Phone</label>
        <Input ref={phone} type="tel" id="phone" className="mb-4" />

        <label htmlFor="city">City</label>
        <Input ref={city} type="text" id="city" className="mb-4" />

        <Button onClick={cashPayment} className="mt-4" disabled={pending || !cartId}>
          Cash Payment
        </Button>
        <Button onClick={onlinePayment} className="ms-5 mt-4" disabled={pending || !cartId}>
          Online Payment
        </Button>
      </div>
    </div>
  );
}
