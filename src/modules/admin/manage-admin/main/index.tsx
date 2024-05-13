"use client";

import { Input, Pagination } from "@/components";
import { useGlobalStates } from "@/states";
import { GETAdminAccount, IAdminAccount } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { FC, ReactElement, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { Table, Toolbar } from "./components";
const AddData = dynamic(() => import("./components/add-data"));
const UpdateData = dynamic(() => import("./components/update-data"));

export const Main: FC = (): ReactElement => {
  const { data } = useQuery({
    queryKey: ["GETAdminAccount"],
    queryFn: GETAdminAccount,
  });

  const { openAddData, openUpdateData, setOpenAddData, setOpenUpdateData } = useGlobalStates();
  const [checkbox, setCheckbox] = useState<string[]>([]);
  const [selectedData, setSelectedData] = useState<IAdminAccount | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(data ? 1 : 0);

  const handleCheckbox = (id: string) => {
    setCheckbox((prev) => [...prev, id]);
    if (checkbox?.includes(id)) {
      setCheckbox((prev) => prev.filter((dt) => dt !== id));
    }
  };

  const { register, watch } = useForm<{ search: string }>({
    defaultValues: {
      search: "",
    },
  });

  const searchResult = data?.filter((dt) => {
    return dt.name.toLowerCase().includes(watch("search").toLowerCase()) || dt.username.toLowerCase().includes(watch("search").toLowerCase());
  });

  const dataPerPage = 30;
  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const currentData = searchResult?.slice(firstIndex, lastIndex);
  const totalPage = searchResult && Math.ceil(searchResult.length / dataPerPage);
  const startData = firstIndex < 0 ? 0 : firstIndex + 1;
  const endData = (searchResult?.length ?? 0) < lastIndex ? searchResult?.length : lastIndex;
  const totalData = searchResult?.length ?? 0;

  useEffect(() => {
    return () => {
      setOpenAddData(false);
      setOpenUpdateData(false);
    };
  }, []);

  return (
    <main className="px-5">
      <Toolbar
        checkbox={checkbox}
        setCheckbox={() => setCheckbox([])}
        searchElement={<Input type="text" label="Search Account" {...register("search")} id="search-account" icon={<FaSearch />} />}
      />

      <Table data={currentData ?? []} checkbox={checkbox} handleCheckbox={handleCheckbox} setSelectedData={setSelectedData} />

      <Pagination
        startData={startData}
        endData={endData}
        totalData={totalData}
        currentPage={currentPage}
        totalPage={totalPage}
        onClickPrevPage={() => {
          currentPage > 1 && setCurrentPage(currentPage - 1);
        }}
        onClickNextPage={() => currentPage < (totalPage ?? 0) && setCurrentPage(currentPage + 1)}
      />

      {openAddData && <AddData />}
      {openUpdateData && <UpdateData selectedData={selectedData} />}
    </main>
  );
};
