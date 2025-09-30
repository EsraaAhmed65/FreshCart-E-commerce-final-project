"use server";
import axios from "axios";
import { getMyToken } from "@/utilities/token";

export async function AddToCartAction(id: string) {
  const token = await getMyToken();
  if (!token) throw new Error("Login first");

  const { data } = await axios.post(
    `${process.env.API}/cart`,
    { productId: id },
    { headers: { token } }
  );
  return data;
}
