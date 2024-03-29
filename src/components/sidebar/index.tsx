"use client";

import { IconButton } from "@/components";
import logoQbills1 from "@/public/assets/images/logos/brown/logo-2.png";
import logoQbills2 from "@/public/assets/images/logos/brown/logo-4.png";
import logoQbills3 from "@/public/assets/images/logos/brown/logo-5.png";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, ReactElement, useState } from "react";
import { FaAddressCard, FaChevronLeft, FaChevronRight, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { FaBoxesStacked, FaMoneyBillTransfer } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
import { MdAdminPanelSettings, MdDashboard } from "react-icons/md";

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
          <Image src={logoQbills1} alt="QBills" width={40} quality={30} priority />
          <div>
            <Image src={logoQbills2} alt="QBills" width={110} quality={30} priority className="mx-auto mb-1" />
            <Image src={logoQbills3} alt="QBills" width={130} quality={30} priority />
          </div>
        </section>

        <section className="w-full space-y-3">
          <Link href={"/dashboard"} className={pathname === "/dashboard" ? "sidebar-active" : "sidebar-button"}>
            <MdDashboard size={25} />
            Dashboard
          </Link>

          {role === "superadmin" && (
            <Link href={"/manageadmin"} className={pathname === "/manageadmin" ? "sidebar-active" : "sidebar-button"}>
              <MdAdminPanelSettings size={25} />
              Manage Admin
            </Link>
          )}

          <Link href={"/managecashier"} className={pathname === "/managecashier" ? "sidebar-active" : "sidebar-button"}>
            <FaUserCircle size={25} />
            Manage Cashier
          </Link>

          <Link href={"/managemembership"} className={pathname === "/managemembership" ? "sidebar-active" : "sidebar-button"}>
            <FaAddressCard size={25} />
            Manage Membership
          </Link>

          <Link href={"/manageproduct"} className={pathname === "/manageproduct" ? "sidebar-active" : "sidebar-button"}>
            <FaBoxesStacked size={25} />
            Manage Product
          </Link>

          <Link href={"/transaction"} className={pathname === "/transaction" ? "sidebar-active" : "sidebar-button"}>
            <FaMoneyBillTransfer size={25} />
            Transaction
          </Link>

          <Link href={"/report"} className={pathname === "/report" ? "sidebar-active" : "sidebar-button"}>
            <IoDocumentText size={25} />
            Report
          </Link>
        </section>

        <section className="mt-auto w-full">
          <button type="button" onClick={() => signOut()} className="sidebar-button">
            <FaSignOutAlt size={25} className="rotate-180" />
            Logout
          </button>
        </section>
      </aside>

      <IconButton
        type="button"
        solid={"default"}
        size={"sm"}
        onClick={() => setOpen(!open)}
        className={`fixed top-1/2 block lg:hidden ${open ? "left-[312px]" : "left-3"}`}
      >
        {open ? <FaChevronLeft /> : <FaChevronRight />}
      </IconButton>
    </>
  );
};
