"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, ReactElement, ReactNode } from "react";

type T = {
  children: ReactNode;
};

export const ReactQueryProvider: FC<T> = ({ children }): ReactElement => {
  const queryClient = new QueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
