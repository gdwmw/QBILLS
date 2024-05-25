"use client";

import { FC, ReactElement, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { FaSearch } from "react-icons/fa";

import { Input, Pagination, PaginationLogic } from "@/components";
import { useGlobalStates } from "@/states";
import { GETMembership, IMembership } from "@/utils";

import { Table, Toolbar } from "./components";
const AddDataForm = dynamic(() => import("./components/forms/AddDataForm"));
const UpdateDataForm = dynamic(() => import("./components/forms/UpdateDataForm"));
const MembershipCard = dynamic(() => import("./components/MembershipCard"));

export const Main: FC = (): ReactElement => {
  const { data } = useQuery({
    queryFn: GETMembership,
    queryKey: ["GETMembership"],
  });

  const { openAddDataForm, openCard, openUpdateDataForm, setOpenAddDataForm, setOpenCard, setOpenUpdateDataForm } = useGlobalStates();
  const [checkbox, setCheckbox] = useState<string[]>([]);
  const [selectedData, setSelectedData] = useState<IMembership | undefined>();
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
    return (
      dt.name.toLowerCase().includes(watch("search").toLowerCase()) ||
      dt["phone-number"].toString().toLowerCase().includes(watch("search").toLowerCase())
    );
  });

  const { currentData, currentPage, endData, nextPage, prevPage, startData, totalData, totalPage } = PaginationLogic({
    data: searchResult,
    dataPerPage: 30,
  });

  useEffect(() => {
    return () => {
      setOpenAddDataForm(false);
      setOpenCard(false);
      setOpenUpdateDataForm(false);
    };
  }, []);

  return (
    <>
      <main className="px-5">
        <Toolbar
          checkbox={checkbox}
          loading={loading}
          searchElement={<Input label="Search Member" type="text" {...register("search")} icon={<FaSearch />} />}
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
      {openAddDataForm && <AddDataForm />}
      {openUpdateDataForm && <UpdateDataForm data={selectedData} />}
      {openCard && <MembershipCard data={selectedData} />}
    </>
  );
};
