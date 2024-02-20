"use client";

import { SessionProvider } from "next-auth/react";
import { FC, ReactElement, ReactNode } from "react";

type T = {
  children: ReactNode;
};

export const NextAuthProvider: FC<T> = ({ children }): ReactElement => {
  return <SessionProvider>{children}</SessionProvider>;
};
