"use client";

import { FC, ReactElement, useState, useEffect } from "react";
import { IconButton } from "@/components";
import { IoIosNotifications } from "react-icons/io";
import { usePathname } from "next/navigation";

type TTitleData = {
  [key: string]: string;
};

const titleData: TTitleData = {
  "/dashboard": "Dashboard",
  "/manageadmin": "Manage Admin",
  "/managecashiert": "Manage Cashier",
  "/manageproduct": "Manage Product",
  "/managemembership": "Manage Membership",
  "/transaction": "Transaction",
  "/report": "Report",
};

type T = {};

export const AdminNavbar: FC<T> = (): ReactElement => {
  const pathname = usePathname();
  const [title, setTitle] = useState<string>();

  useEffect(() => {
    setTitle(titleData[pathname] || "Example Page");
  }, [pathname]);

  return (
    <header>
      <nav className="flex h-20 w-full items-center justify-between border-b bg-N1 px-5 shadow-sm">
        <h1 className="text-2xl font-bold">{title}</h1>

        <section className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-P4" />
          <div className="flex flex-col">
            <span className="font-semibold">Gede Dewo Wahyu M.W</span>
            <span className="text-xs font-semibold">Super Admin</span>
          </div>
          <IconButton solid={"default"} size={"sm"} className="ml-14">
            <IoIosNotifications size={25} />
          </IconButton>
        </section>
      </nav>
    </header>
  );
};
