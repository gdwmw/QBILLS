"use client";

import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { FC, ReactElement, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Pagination, PaginationLogic } from "@/components";
import { useGlobalStates } from "@/hooks";
import { GETProduct, IProduct } from "@/utils";

import { Table, Toolbar } from "./sections";
const AddDataForm = dynamic(() => import("./sections/form/AddDataForm"));
const UpdateDataForm = dynamic(() => import("./sections/form/UpdateDataForm"));
const DetailProductCard = dynamic(() => import("./sections/card/DetailProductCard"));

export const Main: FC = (): ReactElement => {
  const { data } = useQuery({
    queryFn: GETProduct,
    queryKey: ["GETProduct"],
  });

  const { openAddDataForm, openCard, openUpdateDataForm, setOpenAddDataForm, setOpenCard, setOpenUpdateDataForm } = useGlobalStates();
  const [checkbox, setCheckbox] = useState<string[]>([]);
  const [selectedData, setSelectedData] = useState<IProduct | undefined>();
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
    return dt.code.toLowerCase().includes(watch("search").toLowerCase());
  });

  const { currentData, currentPage, endData, nextPage, prevPage, startData, totalData, totalPage } = PaginationLogic({
    data: searchResult,
    dataPerPage: 30,
  });

  useEffect(() => {
    return () => {
      setOpenAddDataForm(false);
      setOpenUpdateDataForm(false);
      setOpenCard(false);
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
      {openCard && <DetailProductCard data={selectedData} />}
    </>
  );
};
