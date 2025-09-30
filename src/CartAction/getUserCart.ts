"use server"

import { getMyToken } from "@/utilities/token"

export async function getUserCartAction() {
  const Token = await getMyToken()
  if (!Token) return null
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    headers: { token: Token as string },
    cache: "no-store"
  })
  if (!response.ok) return null
  const data = await response.json()
  return data
}
