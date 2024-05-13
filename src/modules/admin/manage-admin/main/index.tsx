"use client";

import { Input, Pagination, PaginationLogic } from "@/components";
import { useGlobalStates } from "@/states";
import { GETAdminAccount, IAdminAccount } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { FC, ReactElement, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { Table, Toolbar } from "./components";
const AddData = dynamic(() => import("./components/forms/add-data"));
const UpdateData = dynamic(() => import("./components/forms/update-data"));

export const Main: FC = (): ReactElement => {
  const { data } = useQuery({
    queryKey: ["GETAdminAccount"],
    queryFn: GETAdminAccount,
  });

  const { openAddData, openUpdateData, setOpenAddData, setOpenUpdateData } = useGlobalStates();
  const [checkbox, setCheckbox] = useState<string[]>([]);
  const [selectedData, setSelectedData] = useState<IAdminAccount | null>(null);

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

  const { currentData, totalPage, startData, endData, totalData, currentPage, prevPage, nextPage } = PaginationLogic({
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
          onClickPrevPage={prevPage}
          onClickNextPage={nextPage}
        />
      </main>
      {openAddData && <AddData />}
      {openUpdateData && <UpdateData selectedData={selectedData} />}
    </>
  );
};
