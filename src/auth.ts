import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const email = (credentials?.email ?? "").trim().toLowerCase();
        const password = (credentials?.password ?? "").trim();

        const res = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const payload = await res.json();

        if (!res.ok || !payload?.token || payload?.message !== "success") {
          return null;
        }

        return {
          id: payload.user?._id ?? payload.user?.id ?? payload.user?.email ?? email,
          name: payload.user?.name ?? "",
          email: payload.user?.email ?? email,
          token: payload.token,
          user: { role: payload.user?.role ?? "" },
        } as any;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as any;
        (token as any).token = u.token;
        (token as any).role = u.user?.role ?? "";
        token.name = u.name ?? token.name;
        token.email = u.email ?? token.email;
      }
      return token;
    },

    async session({ session, token }) {
      (session as any).accessToken = (token as any).token || "";
      (session.user as any).role = (token as any).role || "";
      return session;
    },
  },
};
