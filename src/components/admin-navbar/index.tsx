"use client";

import { usePathname } from "next/navigation";
import { FC, ReactElement, useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";

import { IconButton } from "@/components";

interface TTitleData {
  [key: string]: string;
}

const TITLE_DATA: TTitleData = {
  "/dashboard": "Dashboard",
  "/manageadmin": "Manage Admin",
  "/managecashier": "Manage Cashier",
  "/managemembership": "Manage Membership",
  "/manageproduct": "Manage Product",
  "/report": "Report",
  "/transaction": "Transaction",
};

interface ISession {
  id: string;
  name: string;
  role: string;
}

type TAdminNavbar = {
  session: ISession | undefined;
};

export const AdminNavbar: FC<TAdminNavbar> = ({ session }): ReactElement => {
  const pathname = usePathname();
  const [title, setTitle] = useState<string>("Loading...");

  useEffect(() => {
    setTitle(TITLE_DATA[pathname]);
  }, [pathname]);

  return (
    <header>
      <nav className="flex h-20 w-full items-center justify-between border-b bg-N1 px-5 shadow-sm">
        <h1 className="whitespace-nowrap text-2xl font-bold">{title}</h1>

        <section className="flex w-full max-w-[335px] items-center gap-2">
          <div className="hidden size-10 rounded-full bg-P4 sm:block" />
          <div className="hidden w-full max-w-[185px] flex-col sm:flex">
            <span className="truncate font-semibold">{session?.name ?? "Loading..."}</span>

            <span className="whitespace-nowrap text-xs font-semibold">
              {(() => {
                switch (session?.role) {
                  case "admin":
                    return "Admin";
                  case "superadmin":
                    return "Super Admin";
                  default:
                    return "Loading...";
                }
              })()}
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
