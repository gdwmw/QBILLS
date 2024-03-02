import { GETMembership } from "@/libs";
import { Main } from "@/modules/admin/manage-membership";
import { FC, ReactElement } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const ManageMembership: FC = async (): Promise<ReactElement> => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["GETMembership"],
    queryFn: GETMembership,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Main />
    </HydrationBoundary>
  );
};

export default ManageMembership;
