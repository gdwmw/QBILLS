import { FC, ReactElement } from "react";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";

import { Main } from "@/modules/admin/dashboard";
import { GETCashierAccount, GETMembership, GETProduct, GETTransaction } from "@/utils";

export const metadata: Metadata = {
  title: "Dashboard",
};

const Dashboard: FC = async (): Promise<ReactElement> => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryFn: GETCashierAccount,
    queryKey: ["GETCashierAccount"],
  });

  await queryClient.prefetchQuery({
    queryFn: GETMembership,
    queryKey: ["GETMembership"],
  });

  await queryClient.prefetchQuery({
    queryFn: GETProduct,
    queryKey: ["GETProduct"],
  });

  await queryClient.prefetchQuery({
    queryFn: GETTransaction,
    queryKey: ["GETTransaction"],
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Main />
    </HydrationBoundary>
  );
};

export default Dashboard;
