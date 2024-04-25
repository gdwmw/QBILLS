import { Main } from "@/modules/admin/manage-admin";
import { GETAdminAccount } from "@/utils";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { FC, ReactElement } from "react";

const ManageAdmin: FC = async (): Promise<ReactElement> => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["GETAdminAccount"],
    queryFn: GETAdminAccount,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Main />
    </HydrationBoundary>
  );
};

export default ManageAdmin;
