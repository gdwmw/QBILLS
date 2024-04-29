import { Main } from "@/modules/admin/dashboard";
import { GETCashierAccount, GETMembership, GETProduct, GETTransaction } from "@/utils";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { FC, ReactElement } from "react";

const Dashboard: FC = async (): Promise<ReactElement> => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["GETCashierAccount"],
    queryFn: GETCashierAccount,
  });

  await queryClient.prefetchQuery({
    queryKey: ["GETMembership"],
    queryFn: GETMembership,
  });

  await queryClient.prefetchQuery({
    queryKey: ["GETProduct"],
    queryFn: GETProduct,
  });

  await queryClient.prefetchQuery({
    queryKey: ["GETTransaction"],
    queryFn: GETTransaction,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Main />
    </HydrationBoundary>
  );
};

export default Dashboard;
