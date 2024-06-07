import { FC, ReactElement } from "react";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";

import { Main } from "@/modules/admin/manage-membership";
import { GETMembership } from "@/utils";

export const metadata: Metadata = {
  title: "Manage Membership",
};

const ManageMembership: FC = async (): Promise<ReactElement> => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryFn: GETMembership,
    queryKey: ["GETMembership"],
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Main />
    </HydrationBoundary>
  );
};

export default ManageMembership;
