import { Main } from "@/modules/admin/manage-cashier";
import { GETCashierAccount } from "@/utils";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { FC, ReactElement } from "react";

const ManageCashier: FC = async (): Promise<ReactElement> => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["GETCashierAccount"],
    queryFn: GETCashierAccount,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Main />
    </HydrationBoundary>
  );
};

export default ManageCashier;
