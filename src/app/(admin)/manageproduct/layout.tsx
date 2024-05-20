import type { Metadata, Viewport } from "next";

import { FC, ReactNode } from "react";

export const viewport: Viewport = {
  initialScale: 0.5,
  width: "device-width",
};

export const metadata: Metadata = {
  description: "",
  title: "Manage Product",
};

type T = {
  children: ReactNode;
};

const ManageProductLayout: FC<T> = ({ children }): ReactNode => {
  return children;
};

export default ManageProductLayout;
