import type { Metadata, Viewport } from "next";
import { FC, ReactNode } from "react";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 0.5,
};

export const metadata: Metadata = {
  title: "QBills | Manage Product",
  description: "",
};

type T = {
  children: ReactNode;
};

const ManageProductLayout: FC<T> = ({ children }): ReactNode => {
  return children;
};

export default ManageProductLayout;
