import { FC, ReactElement } from "react";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";

import { Main } from "@/modules/admin/dashboard";
import { GETDashboard } from "@/utils";

export const metadata: Metadata = {
  title: "Dashboard",
};

const Dashboard: FC = async (): Promise<ReactElement> => {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryFn: GETDashboard,
    queryKey: ["GETAllData"],
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Main />
    </HydrationBoundary>
  );
};

export default Dashboard;
