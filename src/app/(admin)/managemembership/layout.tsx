import type { Metadata, Viewport } from "next";
import { FC, ReactNode } from "react";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 0.5,
};

export const metadata: Metadata = {
  title: "QBills | Manage Membership",
  description: "",
};

type T = {
  children: ReactNode;
};

const ManageMembershipLayout: FC<T> = ({ children }): ReactNode => {
  return children;
};

export default ManageMembershipLayout;
