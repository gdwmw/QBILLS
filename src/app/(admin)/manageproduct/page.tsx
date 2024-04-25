import { Main } from "@/modules/admin/manage-product";
import { GETProduct } from "@/utils";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { FC, ReactElement } from "react";

const ManageProduct: FC = async (): Promise<ReactElement> => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["GETProduct"],
    queryFn: GETProduct,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Main />
    </HydrationBoundary>
  );
};

export default ManageProduct;
