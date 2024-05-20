import type { Metadata, Viewport } from "next";

import { FC, ReactNode } from "react";

export const viewport: Viewport = {
  initialScale: 0.8,
  width: "device-width",
};

export const metadata: Metadata = {
  description: "",
  title: "Login",
};

type T = {
  children: ReactNode;
};

const LoginLayout: FC<T> = ({ children }): ReactNode => {
  return children;
};

export default LoginLayout;
