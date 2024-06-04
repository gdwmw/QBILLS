import { FC, ReactElement } from "react";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { Main } from "@/modules/admin/manage-admin";
import { GETAdminAccount } from "@/utils";

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
