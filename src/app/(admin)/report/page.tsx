import { FC, ReactElement } from "react";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";

import { Main } from "@/modules/admin/report";
import { GETTransaction } from "@/utils";

export const metadata: Metadata = {
  title: "Report",
};

const Report: FC = async (): Promise<ReactElement> => {
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

export default Report;
