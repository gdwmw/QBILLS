import { GETProduct } from "@/libs";
import { Main } from "@/modules/admin/manage-product";
import { FC, ReactElement } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

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
