"use client";

import { useState } from "react";

type T = {
  data: any[] | undefined;
  dataPerPage: number;
};

export const PaginationLogic = ({ data, dataPerPage }: T) => {
  const [currentPage, setCurrentPage] = useState<number>(data ? 1 : 0);
  const perPage = dataPerPage;
  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;
  const currentData = data?.slice(firstIndex, lastIndex);
  const totalPage = data && Math.ceil(data.length / perPage);
  const startData = firstIndex < 0 ? 0 : firstIndex + 1;
  const endData = (data?.length ?? 0) < lastIndex ? data?.length : lastIndex;
  const totalData = data?.length ?? 0;
  const prevPage = () => {
    currentPage > 1 && setCurrentPage(currentPage - 1);
  };
  const nextPage = () => {
    currentPage < (totalPage ?? 0) && setCurrentPage(currentPage + 1);
  };
  return {
    currentData,
    currentPage,
    endData,
    nextPage,
    prevPage,
    startData,
    totalData,
    totalPage,
  };
};
