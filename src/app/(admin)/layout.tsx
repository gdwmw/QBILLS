import { options } from "@/app/api/auth/[...nextauth]/options";
import { AdminNavbar, Sidebar } from "@/components";
import { getServerSession } from "next-auth/next";
import { FC, ReactElement, ReactNode } from "react";

type T = {
  children: ReactNode;
};

const AdminLayout: FC<T> = async ({ children }): Promise<ReactElement> => {
  const session = await getServerSession(options);

  return (
    <>
      <Sidebar role={session?.user?.role} />
      <div className="lg:pl-[300px]">
        <AdminNavbar user={session?.user} />
        {children}
      </div>
    </>
  );
};

export default AdminLayout;
