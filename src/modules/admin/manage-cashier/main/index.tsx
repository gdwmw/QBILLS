"use client";

import { FC, ReactElement, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { FaSearch } from "react-icons/fa";

import { Input, Pagination, PaginationLogic } from "@/components";
import { useGlobalStates } from "@/states";
import { GETCashierAccount, ICashierAccount } from "@/utils";

import { Table, Toolbar } from "./components";
const AddData = dynamic(() => import("./components/forms/add-data"));
const UpdateData = dynamic(() => import("./components/forms/update-data"));

export const Main: FC = (): ReactElement => {
  const { data } = useQuery({
    queryFn: GETCashierAccount,
    queryKey: ["GETCashierAccount"],
  });

  const { openAddData, openUpdateData, setOpenAddData, setOpenUpdateData } = useGlobalStates();
  const [checkbox, setCheckbox] = useState<string[]>([]);
  const [selectedData, setSelectedData] = useState<ICashierAccount | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

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

  const { currentData, currentPage, endData, nextPage, prevPage, startData, totalData, totalPage } = PaginationLogic({
    data: searchResult,
    dataPerPage: 30,
  });

  useEffect(() => {
    return () => {
      setOpenAddData(false);
      setOpenUpdateData(false);
    };
  }, []);

  return (
    <>
      <main className="px-5">
        <Toolbar
          checkbox={checkbox}
          loading={loading}
          searchElement={<Input label="Search Account" type="text" {...register("search")} icon={<FaSearch />} />}
          setCheckbox={setCheckbox}
          setLoading={setLoading}
        />

        <Table
          checkbox={checkbox}
          data={currentData ?? []}
          handleCheckbox={handleCheckbox}
          loading={loading}
          setCheckbox={setCheckbox}
          setLoading={setLoading}
          setSelectedData={setSelectedData}
        />

        <Pagination
          currentPage={currentPage}
          endData={endData}
          onClickNextPage={nextPage}
          onClickPrevPage={prevPage}
          startData={startData}
          totalData={totalData}
          totalPage={totalPage}
        />
      </main>
      {openAddData && <AddData />}
      {openUpdateData && <UpdateData selectedData={selectedData} />}
    </>
  );
};
