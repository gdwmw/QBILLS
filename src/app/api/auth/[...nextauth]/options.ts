import type { NextAuthOptions } from "next-auth";

import CredentialProvider from "next-auth/providers/credentials";

import { GETAdminAccount, IAdminAccount } from "@/utils";

export const options: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialProvider({
      async authorize(credentials: any) {
        const { password, username } = credentials;
        try {
          const res = await GETAdminAccount({});
          const user: IAdminAccount | undefined = res.find((data) => data.username === username && data.password === password);
          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          return null;
        }
      },
      credentials: {},
      name: "Credentials",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
};
