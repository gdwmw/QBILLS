import { FC, ReactElement, ReactNode } from "react";

import { getServerSession } from "next-auth/next";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { AdminNavbar, Sidebar } from "@/components";

type T = {
  children: ReactNode;
};

const AdminLayout: FC<T> = async ({ children }): Promise<ReactElement> => {
  const session = await getServerSession(options);

  return (
    <>
      <Sidebar session={session?.user} />
      <div className="lg:pl-[300px]">
        <AdminNavbar session={session?.user} />
        {children}
      </div>
    </>
  );
};

export default AdminLayout;
