"use server"
import { getMyToken } from "@/utilities/token"
import axios from "axios"

export async function AddToCartAction(id: string) {
    const token = await getMyToken()
    if(!token) 
        throw Error("Login First")

    const values = {    
        productId: id,
    }

    const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", values, {
        headers: {
            token: token as string
        }
    })
    return data
}