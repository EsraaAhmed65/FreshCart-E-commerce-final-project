import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function getMyToken(): Promise<string> {
  const session = await getServerSession(authOptions);
  return ((session as any)?.accessToken as string) || "";
}
