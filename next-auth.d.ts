import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      role: string;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    id: string;
    name: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    name: string;
    role: string;
  }
}
