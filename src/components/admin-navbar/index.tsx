"use client";

import { FC, ReactElement, useEffect, useState } from "react";

import { usePathname } from "next/navigation";
import { IoIosNotifications } from "react-icons/io";

import { IconButton } from "@/components";

type TTitleData = {
  [key: string]: string;
};

const titleData: TTitleData = {
  "/dashboard": "Dashboard",
  "/manageadmin": "Manage Admin",
  "/managecashier": "Manage Cashier",
  "/managemembership": "Manage Membership",
  "/manageproduct": "Manage Product",
  "/report": "Report",
  "/transaction": "Transaction",
};

interface I {
  id: string;
  name: string;
  role: string;
}

type T = {
  user: I | undefined;
};

export const AdminNavbar: FC<T> = ({ user }): ReactElement => {
  const pathname = usePathname();
  const [title, setTitle] = useState<string>("Loading...");

  useEffect(() => {
    setTitle(titleData[pathname] || "Example Page");
  }, [pathname]);

  return (
    <header>
      <nav className="flex h-20 w-full items-center justify-between border-b bg-N1 px-5 shadow-sm">
        <h1 className="whitespace-nowrap text-2xl font-bold">{title}</h1>

        <section className="flex w-full max-w-[335px] items-center gap-2">
          <div className="hidden h-10 w-10 rounded-full bg-P4 sm:block" />
          <div className="hidden w-full max-w-[185px] flex-col sm:flex">
            <span className="truncate font-semibold">{user?.name ?? "Loading..."}</span>
            <span className="whitespace-nowrap text-xs font-semibold">
              {user?.role === "admin" ? "Admin" : user?.role === "superadmin" ? "Super Admin" : "Loading..."}
            </span>
          </div>
          <IconButton className="ml-auto" size={"sm"} solid={"default"}>
            <IoIosNotifications size={20} />
          </IconButton>
        </section>
      </nav>
    </header>
  );
};
