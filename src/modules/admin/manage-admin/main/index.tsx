"use client";

import { FC, ReactElement, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";

import { Pagination } from "@/components";
import { useGlobalStates } from "@/states";
import { GETAdminAccount, IAdminAccount } from "@/utils";

import { Table, Toolbar } from "./components";
const AddDataForm = dynamic(() => import("./components/forms/AddDataForm"));
const UpdateDataForm = dynamic(() => import("./components/forms/UpdateDataForm"));

export const Main: FC = (): ReactElement => {
  const { openAddDataForm, openUpdateDataForm, setOpenAddDataForm, setOpenUpdateDataForm } = useGlobalStates();
  const [checkbox, setCheckbox] = useState<string[]>([]);
  const [selectedData, setSelectedData] = useState<IAdminAccount | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const { handleSubmit, register, reset, watch } = useForm<{ search: string }>({
    defaultValues: {
      search: "",
    },
  });

  useEffect(() => {
    if (!watch("search")) {
      setSearch("");
      setPage(1);
    }
  }, [watch("search")]);

  const searchLogic = watch("search") ? search : "";
  const { data } = useQuery({
    queryFn: () => GETAdminAccount({ limit: 30, page: page, search: searchLogic }),
    queryKey: ["GETAdminAccount", page, searchLogic],
  });

  const onSubmit: SubmitHandler<{ search: string }> = async (value) => {
    setSearch(value.search);
    setPage(1);
  };

  const handleCheckbox = (id: string) => {
    setCheckbox((prev) => [...prev, id]);
    if (checkbox?.includes(id)) {
      setCheckbox((prev) => prev.filter((dt) => dt !== id));
    }
  };

  useEffect(() => {
    return () => {
      reset();
      setOpenAddDataForm(false);
      setOpenUpdateDataForm(false);
    };
  }, []);

  return (
    <>
      <main className="px-5">
        <Toolbar
          checkbox={checkbox}
          handleSubmit={handleSubmit}
          iconOnClick={() => {
            setSearch(watch("search"));
            setPage(1);
          }}
          loading={loading}
          onSubmit={onSubmit}
          register={register}
          setCheckbox={setCheckbox}
          setLoading={setLoading}
        />

        <Table
          checkbox={checkbox}
          data={data ?? []}
          handleCheckbox={handleCheckbox}
          loading={loading}
          setCheckbox={setCheckbox}
          setLoading={setLoading}
          setSelectedData={setSelectedData}
        />

        <Pagination
          currentPage={page}
          endData={data?.length ?? 0}
          onClickNextPage={() => {
            if (data && data.length >= 30) {
              setPage(page + 1);
            }
          }}
          onClickPrevPage={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
          startData={data && data.length > 0 ? 1 : 0}
        />
      </main>
      {openAddDataForm && <AddDataForm />}
      {openUpdateDataForm && <UpdateDataForm data={selectedData} />}
    </>
  );
};
