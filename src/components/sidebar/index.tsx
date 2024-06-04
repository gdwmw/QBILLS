"use client";

import { FC, ReactElement, ReactNode, useState } from "react";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaAddressCard, FaChevronLeft, FaChevronRight, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { FaBoxesStacked, FaMoneyBillTransfer } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
import { MdAdminPanelSettings, MdDashboard } from "react-icons/md";

import { IconButton } from "@/components";

import { Logo } from "../logo";

type TNavItems = {
  icon: ReactNode;
  label: string;
  path: string;
  role?: string;
};

const NAV_ITEMS: TNavItems[] = [
  { icon: <MdDashboard size={25} />, label: "Dashboard", path: "/dashboard" },
  { icon: <MdAdminPanelSettings size={25} />, label: "Manage Admin", path: "/manageadmin", role: "superadmin" },
  { icon: <FaUserCircle size={25} />, label: "Manage Cashier", path: "/managecashier" },
  { icon: <FaAddressCard size={25} />, label: "Manage Membership", path: "/managemembership" },
  { icon: <FaBoxesStacked size={25} />, label: "Manage Product", path: "/manageproduct" },
  { icon: <FaMoneyBillTransfer size={25} />, label: "Transaction", path: "/transaction" },
  { icon: <IoDocumentText size={25} />, label: "Report", path: "/report" },
];

interface ISession {
  id: string;
  name: string;
  role: string;
}

type TSidebar = {
  session: ISession | undefined;
};

export const Sidebar: FC<TSidebar> = ({ session }): ReactElement => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <aside
        className={`fixed left-0 top-0 z-20 h-dvh w-[300px] flex-col items-center gap-10 border-r bg-N1.1 px-5 py-10 ${open ? "flex" : "hidden lg:flex"}`}
      >
        <Logo varian="brown" />

        <section className="w-full space-y-3">
          {NAV_ITEMS.map((item, index) =>
            item.role && session?.role !== item.role ? null : (
              <Link className={pathname === item.path ? "sidebar-active" : "sidebar-button"} href={item.path} key={index}>
                {item.icon}
                {item.label}
              </Link>
            ),
          )}
        </section>

        <section className="mt-auto w-full">
          <button className="sidebar-button" onClick={() => signOut()} type="button">
            <FaSignOutAlt className="rotate-180" size={25} />
            Logout
          </button>
        </section>
      </aside>

      <IconButton
        className={`fixed top-1/2 z-20 block lg:hidden ${open ? "left-[312px]" : "left-3"}`}
        onClick={() => setOpen(!open)}
        size={"sm"}
        solid={"default"}
        type="button"
      >
        {open ? <FaChevronLeft /> : <FaChevronRight />}
      </IconButton>
    </>
  );
};
