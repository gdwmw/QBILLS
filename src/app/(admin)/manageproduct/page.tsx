import { FC, ReactElement } from "react";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";

import { Main } from "@/modules/admin/manage-product";
import { GETProduct } from "@/utils";

export const metadata: Metadata = {
  title: "Manange Product",
};

const ManageProduct: FC = async (): Promise<ReactElement> => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryFn: GETProduct,
    queryKey: ["GETProduct"],
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Main />
    </HydrationBoundary>
  );
};

export default ManageProduct;
