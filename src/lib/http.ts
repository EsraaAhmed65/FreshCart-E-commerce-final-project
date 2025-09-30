import axios from "axios";

export const API_BASE =
  process.env.NEXT_PUBLIC_API ||
  process.env.API ||
  "https://ecommerce.routemisr.com/api/v1";

export const http = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
});
