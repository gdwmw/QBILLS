"use client";

import { IconButton } from "@/components";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { FC, ReactElement, useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";

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
  const session = useSession();
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
          <div className="h-10 w-10 rounded-full bg-P4" />
          <div className="flex w-full max-w-[185px] flex-col">
            <span className="truncate font-semibold">{session.data?.user?.name ?? "Loading..."}</span>
            <span className="whitespace-nowrap text-xs font-semibold">
              {session.data?.user?.role === "admin" ? "Admin" : session.data?.user?.role === "superadmin" ? "Super Admin" : "Loading..."}
            </span>
          </div>
          <IconButton solid={"default"} size={"sm"} className="ml-auto">
            <IoIosNotifications size={20} />
          </IconButton>
        </section>
      </nav>
    </header>
  );
};
