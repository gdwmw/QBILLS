import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";
import { FC, ReactElement } from "react";

import { Main } from "@/modules/admin/transaction";
import { GETTransaction } from "@/utils";

export const metadata: Metadata = {
  title: "Transaction",
};

const Transaction: FC = async (): Promise<ReactElement> => {
  const queryClient = new QueryClient();
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

export default Transaction;
