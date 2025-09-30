"use server";
import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function addProductToWishlistAction(id: string) {
  const token = await getMyToken();
  if (!token) throw Error("Please, Login First!");

  try {
    const res = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId: id },
      { headers: { token: token as string }, timeout: 12000 }
    );
    return res.data;
  } catch (e: any) {
    const msg =
      e?.response?.data?.message ||
      e?.code === "ETIMEDOUT"
        ? "Request timed out. Try again."
        : "Failed to add to wishlist";
    throw Error(msg);
  }
}
