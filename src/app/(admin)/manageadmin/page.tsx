import { FC, ReactElement } from "react";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";

import { Main } from "@/modules/admin/manage-admin";
import { GETAdminAccount } from "@/utils";

export const metadata: Metadata = {
  title: "Manage Admin",
};

const ManageAdmin: FC = async (): Promise<ReactElement> => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryFn: GETAdminAccount,
    queryKey: ["GETAdminAccount"],
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Main />
    </HydrationBoundary>
  );
};

export default ManageAdmin;
