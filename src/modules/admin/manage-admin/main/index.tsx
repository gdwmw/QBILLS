"use client";

import { FC, ReactElement, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";

import { Pagination, PaginationLogic } from "@/components";
import { useGlobalStates } from "@/hooks";
import { GETAdminAccount, IAdminAccount } from "@/utils";

import { Table, Toolbar } from "./components";
const AddDataForm = dynamic(() => import("./components/forms/AddDataForm"));
const UpdateDataForm = dynamic(() => import("./components/forms/UpdateDataForm"));

export const Main: FC = (): ReactElement => {
  const { data } = useQuery({
    queryFn: GETAdminAccount,
    queryKey: ["GETAdminAccount"],
  });

  const { openAddDataForm, openUpdateDataForm, setOpenAddDataForm, setOpenUpdateDataForm } = useGlobalStates();
  const [checkbox, setCheckbox] = useState<string[]>([]);
  const [selectedData, setSelectedData] = useState<IAdminAccount | undefined>();
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
      setOpenAddDataForm(false);
      setOpenUpdateDataForm(false);
    };
  }, []);

  return (
    <>
      <main className="px-5">
        <Toolbar checkbox={checkbox} loading={loading} register={register} setCheckbox={setCheckbox} setLoading={setLoading} />

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
      {openAddDataForm && <AddDataForm />}
      {openUpdateDataForm && <UpdateDataForm data={selectedData} />}
    </>
  );
};
