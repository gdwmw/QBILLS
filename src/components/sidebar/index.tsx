"use client";

import { FC, ReactElement, useState } from "react";

import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaAddressCard, FaChevronLeft, FaChevronRight, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { FaBoxesStacked, FaMoneyBillTransfer } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
import { MdAdminPanelSettings, MdDashboard } from "react-icons/md";

import { IconButton } from "@/components";
import logoQBILLS1 from "@/public/assets/images/logos/brown/logo-2.webp";
import logoQBILLS2 from "@/public/assets/images/logos/brown/logo-4.webp";
import logoQBILLS3 from "@/public/assets/images/logos/brown/logo-5.webp";

type T = {
  role: string | undefined;
};

export const Sidebar: FC<T> = ({ role }): ReactElement => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <aside
        className={`fixed left-0 top-0 z-20 h-dvh w-[300px] flex-col items-center gap-10 border-r bg-N1.1 px-5 py-10 ${open ? "flex" : "hidden lg:flex"}`}
      >
        <section className="flex h-fit w-fit items-center justify-center gap-2">
          <Image alt="QBILLS" priority quality={30} src={logoQBILLS1} width={40} />
          <div>
            <Image alt="QBILLS" className="mx-auto mb-1" priority quality={30} src={logoQBILLS2} width={110} />
            <Image alt="QBILLS" priority quality={30} src={logoQBILLS3} width={130} />
          </div>
        </section>

        <section className="w-full space-y-3">
          <Link className={pathname === "/dashboard" ? "sidebar-active" : "sidebar-button"} href={"/dashboard"}>
            <MdDashboard size={25} />
            Dashboard
          </Link>

          {role === "superadmin" && (
            <Link className={pathname === "/manageadmin" ? "sidebar-active" : "sidebar-button"} href={"/manageadmin"}>
              <MdAdminPanelSettings size={25} />
              Manage Admin
            </Link>
          )}

          <Link className={pathname === "/managecashier" ? "sidebar-active" : "sidebar-button"} href={"/managecashier"}>
            <FaUserCircle size={25} />
            Manage Cashier
          </Link>

          <Link className={pathname === "/managemembership" ? "sidebar-active" : "sidebar-button"} href={"/managemembership"}>
            <FaAddressCard size={25} />
            Manage Membership
          </Link>

          <Link className={pathname === "/manageproduct" ? "sidebar-active" : "sidebar-button"} href={"/manageproduct"}>
            <FaBoxesStacked size={25} />
            Manage Product
          </Link>

          <Link className={pathname === "/transaction" ? "sidebar-active" : "sidebar-button"} href={"/transaction"}>
            <FaMoneyBillTransfer size={25} />
            Transaction
          </Link>

          <Link className={pathname === "/report" ? "sidebar-active" : "sidebar-button"} href={"/report"}>
            <IoDocumentText size={25} />
            Report
          </Link>
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
