import type { Metadata, Viewport } from "next";
import { FC, ReactNode } from "react";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 0.8,
};

export const metadata: Metadata = {
  title: "QBills | Login",
  description: "",
};

type T = {
  children: ReactNode;
};

const RootLayout: FC<T> = ({ children }): ReactNode => {
  return children;
};

export default RootLayout;
