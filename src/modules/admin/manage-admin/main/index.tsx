"use client";

import { Button, IconButton, Input, Pagination } from "@/components";
import { DELETEAdminAccount, DELETEMultipleAdminAccount, GETAdminAccount, IAdminAccount } from "@/libs";
import loadingAnimation from "@/public/assets/animations/loadings/gray-n4.svg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Image from "next/image";
import { FC, ReactElement, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { create } from "zustand";
const AddData = dynamic(() => import("./add-data"));
const UpdateData = dynamic(() => import("./update-data"));

// ZUSTAND
type States = {
  openAddData?: boolean;
  openUpdateData?: boolean;
};

type Actions = {
  setOpenAddData: (param: boolean) => void;
  setOpenUpdateData: (param: boolean) => void;
};

export const useManageAdmin = create<States & Actions>((set) => ({
  openAddData: false,
  openUpdateData: false,
  setOpenAddData: (openAddData: boolean) => set({ openAddData }),
  setOpenUpdateData: (openUpdateData: boolean) => set({ openUpdateData }),
}));
// END ZUSTAND

export const Main: FC = (): ReactElement => {
  const queryClient = useQueryClient(); // REACT QUERY
  const [checkbox, setCheckbox] = useState<string[]>([]);
  const [checkboxCount, setCheckboxCount] = useState<number>(0);
  const { openAddData, openUpdateData, setOpenAddData, setOpenUpdateData } = useManageAdmin(); // ZUSTAND
  const [selectedData, setSelectedData] = useState<IAdminAccount>({ id: "", name: "", username: "", role: "", password: "" });
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState<boolean[]>([false]);

  // REACT QUERY
  const { data } = useQuery({
    queryKey: ["GETAdminAccount"],
    queryFn: GETAdminAccount,
  });

  const mutationDelete = useMutation({
    mutationFn: (id: string) => DELETEAdminAccount(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["GETAdminAccount"] });
    },
  });

  const mutationMultipleDelete = useMutation({
    mutationFn: (ids: string[]) => DELETEMultipleAdminAccount(ids),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["GETAdminAccount"] });
      setCheckbox([]);
      setCheckboxCount(0);
    },
  });
  // END REACT QUERY

  useEffect(() => {
    setLoading(new Array(data?.length).fill(false));
  }, [data]);

  const handleSetLoding = (index: number, value: boolean) => {
    const newArray = [...loading];
    newArray[index] = value;
    setLoading(newArray);
  };

  const handleDelete = (id: string, index: number) => {
    handleSetLoding(index, true);
    mutationDelete.mutate(id, {
      onSuccess: () => {
        handleSetLoding(index, false);
      },
    });
  };

  const handleMultipleDelete = () => {
    handleSetLoding(0, true);
    mutationMultipleDelete.mutate(checkbox, {
      onSuccess: () => {
        handleSetLoding(0, false);
      },
    });
  };

  // REACT HOOK FORM
  const { register, watch } = useForm<{ search: string }>({
    defaultValues: {
      search: "",
    },
  });
  // END REACT HOOK FORM

  const searchResult = data?.filter((data) => {
    const result =
      data.name.toLowerCase().includes(watch("search").toLowerCase()) || data.username.toLowerCase().includes(watch("search").toLowerCase());
    return result;
  });

  const handleCheckbox = (id: string) => {
    setCheckbox((prev) => {
      const selected = prev.includes(id);
      const updated = selected ? prev.filter((row) => row !== id) : [...prev, id];
      setCheckboxCount(updated.length);
      return updated;
    });
  };

  const perPage = 30;
  const indexOfLastData = currentPage * perPage;
  const indexOfFirstData = indexOfLastData - perPage;
  const currentData = searchResult?.slice(indexOfFirstData, indexOfLastData);
  const totalPage = searchResult && Math.ceil(searchResult.length / perPage);

  useEffect(() => {
    if (data?.length !== 0) {
      setCurrentPage(1);
    }
  }, [data]);

  return (
    <main className="px-5">
      <section>
        <div className="flex items-center gap-3 py-5">
          <h2 className="hidden whitespace-nowrap text-xl font-semibold md:block">Admin Account List</h2>
          <div className="-mt-1.5 ml-auto w-full md:max-w-[350px]">
            <Input type="text" label="Search Account" {...register("search")} id="search-account" icon={<FaSearch />}></Input>
          </div>
          <Button
            type="button"
            solid={checkboxCount === 0 || loading[0] ? "disabled" : "red"}
            size={"sm"}
            widthFull
            disabled={checkboxCount === 0 || loading[0]}
            onClick={handleMultipleDelete}
            className={`max-w-[120px] whitespace-nowrap font-semibold ${loading[0] ? "cursor-wait" : ""}`}
          >
            <Image src={loadingAnimation} alt="Loading..." width={20} quality={30} className={loading[0] ? "" : "hidden"} />
            Delete ({checkboxCount})
          </Button>
          <Button
            type="button"
            solid={"default"}
            size={"sm"}
            widthFull
            onClick={() => setOpenAddData(true)}
            className="max-w-[150px] whitespace-nowrap font-semibold"
          >
            Add Account
          </Button>
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-N2">
        <div className="max-h-[74vh] overflow-auto">
          <table className="w-full">
            <thead className="sticky top-0 z-10 bg-N2">
              <tr className="text-center">
                <th className="px-4 py-4">Checkbox</th>
                <th className="px-4 py-4">Name</th>
                <th className="px-4 py-4">Username</th>
                <th className="px-4 py-4">Password</th>
                <th className="px-4 py-4">Role</th>
                <th className="px-4 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData?.map((account, index) => (
                <tr key={account.id} className={`text-center ${index % 2 === 0 ? "bg-N1" : "bg-N2.2"}`}>
                  <td className="px-2 py-2">
                    <input
                      type="checkbox"
                      checked={checkbox.includes(account.id)}
                      onChange={() => handleCheckbox(account.id)}
                      disabled={account.role === "superadmin"}
                    />
                  </td>
                  <td className="whitespace-nowrap px-2 py-2">{account.name}</td>
                  <td className="whitespace-nowrap px-2 py-2">{account.username}</td>
                  <td className="whitespace-nowrap px-2 py-2">**********</td>
                  <td className="whitespace-nowrap px-2 py-2">{account.role}</td>
                  <td className="px-2 py-2">
                    <div className="flex justify-center gap-2">
                      <IconButton
                        type="button"
                        solid={"green"}
                        size={"sm"}
                        onClick={() => {
                          setSelectedData({
                            id: account.id,
                            name: account.name,
                            username: account.username,
                            role: account.role,
                            password: account.password,
                          });
                          setOpenUpdateData(true);
                        }}
                      >
                        <MdEdit />
                      </IconButton>

                      <IconButton
                        type="button"
                        solid={account.role === "superadmin" || loading[index + 1] ? "disabled" : "red"}
                        size={"sm"}
                        onClick={() => handleDelete(account.id, index + 1)}
                        disabled={account.role === "superadmin" || loading[index + 1]}
                        className={loading[index + 1] ? "cursor-wait" : ""}
                      >
                        {loading[index + 1] ? <Image src={loadingAnimation} alt="Loading..." width={16} quality={30} /> : <MdDelete />}
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Pagination
        startData={indexOfLastData > 0 ? indexOfFirstData + 1 : 0}
        endData={(searchResult && Math.min(indexOfLastData, searchResult.length)) ?? 0}
        total={searchResult?.length ?? 0}
        currentPage={currentPage ?? 0}
        totalPage={totalPage ?? 0}
        onClickPrevPage={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        onClickNextPage={() => {
          if (totalPage !== undefined) {
            setCurrentPage((prev) => Math.min(prev + 1, totalPage));
          }
        }}
      />

      {openAddData && <AddData />}
      {openUpdateData && <UpdateData selectedData={selectedData} />}
    </main>
  );
};
