import { FC, ReactNode } from "react";
import { Sidebar, AdminNavbar } from "@/components";

type T = {
  children: ReactNode;
};

const AdminLayout: FC<T> = ({ children }): ReactNode => {
  return (
    <>
      <Sidebar />
      <div className="lg:pl-[300px]">
        <AdminNavbar />
        {children}
      </div>
    </>
  );
};

export default AdminLayout;
