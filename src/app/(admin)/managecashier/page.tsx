import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";
import { FC, ReactElement } from "react";

import { Main } from "@/modules/admin/manage-cashier";
import { GETCashierAccount } from "@/utils";

export const metadata: Metadata = {
  title: "Manage Cashier",
};

const ManageCashier: FC = async (): Promise<ReactElement> => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryFn: GETCashierAccount,
    queryKey: ["GETCashierAccount"],
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Main />
    </HydrationBoundary>
  );
};

export default ManageCashier;
