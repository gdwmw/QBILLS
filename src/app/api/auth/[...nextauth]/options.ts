import type { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

interface IData {
  id: string;
  username: string;
  password: string;
  role: string;
}

export const options: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any) {
        const { username, password } = credentials;
        try {
          const res: Response = await fetch(process.env.ACCOUNT_LOGIN_URL as string);
          const data: IData[] = await res.json();
          const user: IData | undefined = data.find((data) => data.username === username && data.password === password);
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
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
};
