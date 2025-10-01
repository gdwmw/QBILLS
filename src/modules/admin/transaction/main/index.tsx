"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Image from "next/image";
import { FC, ReactElement, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheckCircle, FaClock, FaSearch } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { MdAccountBalanceWallet, MdDelete, MdEdit } from "react-icons/md";
import { create } from "zustand";

import { Button, ChipButton, IconButton, Input, Pagination, SelectInput } from "@/components";
import loadingAnimation from "@/public/assets/animations/loadings/gray-n4.svg";
import { DELETEMultipleTransaction, DELETETransaction, GETTransaction, ITransaction } from "@/utils";
const AddData = dynamic(() => import("./add-data"));
const UpdateData = dynamic(() => import("./update-data"));

type States = {
  openAddData?: boolean;
  openUpdateData?: boolean;
};

type Actions = {
  setOpenAddData: (param: boolean) => void;
  setOpenUpdateData: (param: boolean) => void;
};

export const useTransaction = create<Actions & States>((set) => ({
  openAddData: false,
  openUpdateData: false,
  setOpenAddData: (openAddData: boolean) => set({ openAddData }),
  setOpenUpdateData: (openUpdateData: boolean) => set({ openUpdateData }),
}));

export const Main: FC = (): ReactElement => {
  const queryClient = useQueryClient();
  const { openAddData, openUpdateData, setOpenAddData, setOpenUpdateData } = useTransaction();
  const { register, watch } = useForm<{ endDate: Date; search: string; startDate: Date; status: string }>({
    defaultValues: {
      endDate: new Date(),
      search: "",
      startDate: new Date("0001-01-01"),
      status: "",
    },
  });

  const [checkbox, setCheckbox] = useState<string[]>([]);
  const [checkboxCount, setCheckboxCount] = useState<number>(0);
  const [selectedData, setSelectedData] = useState<ITransaction>({
    amount: 0,
    cashier: "",
    code: "",
    customer: "",
    date: "",
    id: "",
    payment: "",
    status: "",
    time: "",
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState<boolean[]>([false]);
  const [editMode, setEditMode] = useState<boolean>(false);

  const { data } = useQuery({
    queryFn: GETTransaction,
    queryKey: ["GETTransaction"],
  });

  const mutationDelete = useMutation({
    mutationFn: (id: string) => DELETETransaction(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["GETTransaction"] });
    },
  });

  const mutationMultipleDelete = useMutation({
    mutationFn: (ids: string[]) => DELETEMultipleTransaction(ids),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["GETTransaction"] });
      setCheckbox([]);
      setCheckboxCount(0);
    },
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "`") {
        setEditMode((prevEditMode) => !prevEditMode);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setLoading(new Array(data?.length).fill(false));
  }, [data]);

  useEffect(() => {
    if (data?.length !== 0) {
      setCurrentPage(1);
    }
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

  const handleCheckbox = (id: string) => {
    setCheckbox((prev) => {
      const selected = prev.includes(id);
      const updated = selected ? prev.filter((row) => row !== id) : [...prev, id];
      setCheckboxCount(updated.length);
      return updated;
    });
  };

  const searchResult = data?.filter((data) => {
    const startDate = new Date(watch("startDate"));
    const endDate = new Date(watch("endDate"));
    const dataDate = new Date(data.date);
    const dateMatch = dataDate >= startDate && dataDate <= endDate;
    const codeMatch = data.code.toLowerCase().includes(watch("search").toLowerCase());
    const customerMatch = data.customer.toLowerCase().includes(watch("search").toLowerCase());
    const statusMatch = data.status.toLowerCase().includes(watch("status").toLowerCase());
    const result = codeMatch && customerMatch && dateMatch && statusMatch;
    return result;
  });

  const perPage = 30;
  const indexOfLastData = currentPage * perPage;
  const indexOfFirstData = indexOfLastData - perPage;
  const currentData = searchResult?.slice(indexOfFirstData, indexOfLastData);
  const totalPage = searchResult && Math.ceil(searchResult.length / perPage);

  const calculateCurrentMonthlyTotal = (transactions: { amount: number; date: string; status: string }[]) => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    let currentMonthTotal = 0;
    for (const transaction of transactions) {
      if (transaction.status === "success") {
        const month = transaction.date.slice(0, 7);
        if (month === currentMonth) {
          currentMonthTotal += transaction.amount;
        }
      }
    }
    return { month: currentMonth, total: currentMonthTotal };
  };

  const calculateStatus = (transactions: { status: string }[], status: string) => {
    let count = 0;
    for (const transaction of transactions) {
      if (transaction.status === status) {
        count++;
      }
    }
    return count;
  };

  const statusMap: { [key: string]: "canceled" | "default" | "disabled" | "pending" | "selected" | "success" | null | undefined } = {
    canceled: "canceled",
    pending: "pending",
    success: "success",
  };

  return (
    <main className="px-5">
      <div className="space-y-5">
        <section>
          {editMode && (
            <div className="flex items-center gap-3 py-5">
              <h2 className="hidden whitespace-nowrap text-xl font-semibold md:block">Transaction List</h2>
              <div className="ml-auto flex gap-3">
                <Button
                  className={`max-w-[120px] whitespace-nowrap font-semibold ${loading[0] ? "cursor-wait" : ""}`}
                  disabled={checkboxCount === 0 || loading[0]}
                  onClick={handleMultipleDelete}
                  size={"sm"}
                  solid={checkboxCount === 0 || loading[0] ? "disabled" : "red"}
                  type="button"
                >
                  <Image alt="Loading..." className={loading[0] ? "" : "hidden"} quality={30} src={loadingAnimation} width={20} />
                  Delete ({checkboxCount})
                </Button>
                <Button
                  className="max-w-[150px] whitespace-nowrap font-semibold"
                  onClick={() => setOpenAddData(true)}
                  size={"sm"}
                  solid={"default"}
                  type="button"
                >
                  Add Transaction
                </Button>
              </div>
            </div>
          )}
        </section>

        <section className="w-full gap-5 max-[1480px]:grid max-[1480px]:grid-cols-2 min-[1480px]:flex">
          <div className="w-full gap-5 max-[1480px]:space-y-5 min-[1480px]:flex">
            <section className="flex h-[180px] w-full items-center rounded-lg border-2 px-10">
              <div>
                <div className="h-[40px] border border-N1">
                  <MdAccountBalanceWallet className="ml-[-6px] mt-[-6px] text-I4" size={50} />
                </div>
                <span className="font-semibold text-N3">Total Monthly Per.{` (${calculateCurrentMonthlyTotal(data || []).month})`}</span>
                <br />
                <span className="text-2xl font-semibold">
                  {new Intl.NumberFormat("id-ID", {
                    currency: "IDR",
                    maximumFractionDigits: 0,
                    minimumFractionDigits: 0,
                    style: "currency",
                  }).format(calculateCurrentMonthlyTotal(data || []).total)}
                </span>
              </div>
            </section>

            <section className="flex h-[180px] w-full items-center rounded-lg border-2 px-10">
              <div>
                <div className="h-[40px] border border-N1">
                  <FaCheckCircle className="-ml-px mb-px text-S4" size={38} />
                </div>
                <span className="font-semibold text-N3">Success</span>
                <br />
                <span className="text-2xl font-semibold">{calculateStatus(data || [], "success")}</span>
              </div>
            </section>
          </div>

          <div className="w-full gap-5 max-[1480px]:space-y-5 min-[1480px]:flex">
            <section className="flex h-[180px] w-full items-center rounded-lg border-2 px-10">
              <div>
                <div className="h-[40px] border border-N1">
                  <FaClock className="-ml-px mb-px text-W4" size={38} />
                </div>
                <span className="font-semibold text-N3">Pending</span>
                <br />
                <span className="text-2xl font-semibold">{calculateStatus(data || [], "pending")}</span>
              </div>
            </section>

            <section className="flex h-[180px] w-full items-center rounded-lg border-2 px-10">
              <div>
                <div className="h-[40px] border border-N1">
                  <IoMdCloseCircle className="ml-[-4px] mt-[-4px] text-E4" size={46} />
                </div>
                <span className="font-semibold text-N3">Canceled</span>
                <br />
                <span className="text-2xl font-semibold">{calculateStatus(data || [], "canceled")}</span>
              </div>
            </section>
          </div>
        </section>

        <section className="grid w-full grid-rows-2 items-center gap-5 overflow-y-auto md:flex">
          <div className="w-full">
            <Input label="Search Transaction" type="text" {...register("search")} icon={<FaSearch />} id="search-transaction"></Input>
          </div>
          <div className="flex w-full gap-3">
            <div className="w-full min-w-[162px]">
              <Input label="Start Date" type="date" {...register("startDate")} id="startDate" variant={"default"} />
            </div>
            <div className="w-full min-w-[162px]">
              <Input label="End Date" type="date" {...register("endDate")} id="endDate" variant={"default"} />
            </div>
            <div className="w-full min-w-[162px]">
              <SelectInput label="Status" {...register("status")} id="status">
                <option value=""></option>
                <option value="success">Success</option>
                <option value="pending">Pending</option>
                <option value="canceled">Canceled</option>
              </SelectInput>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-lg border border-N2">
          <div className="max-h-[51vh] overflow-auto">
            <table className="w-full">
              <thead className="sticky top-0 z-10 bg-N2">
                <tr className="text-center">
                  {editMode && <th className="p-4">Checkbox</th>}
                  <th className="p-4">Code</th>
                  <th className="p-4">Cashier</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4">Date - Time</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  {editMode && <th className="p-4">Action</th>}
                </tr>
              </thead>
              <tbody>
                {currentData
                  ?.sort((a, b) => {
                    const dateDifference = new Date(b.date).getTime() - new Date(a.date).getTime();
                    if (dateDifference !== 0) return dateDifference;
                    const [aHours, aMinutes] = a.time.split(":").map(Number);
                    const [bHours, bMinutes] = b.time.split(":").map(Number);
                    return bHours * 60 + bMinutes - (aHours * 60 + aMinutes);
                  })
                  .map((transaction, index) => (
                    <tr className={`text-center ${index % 2 === 0 ? "bg-N1" : "bg-N2.2"}`} key={transaction.id}>
                      {editMode && (
                        <td className="p-2">
                          <input
                            checked={checkbox.includes(transaction.id)}
                            id={`checkbox-id-${index}`}
                            name={`checkbox-name-${index}`}
                            onChange={() => handleCheckbox(transaction.id)}
                            type="checkbox"
                          />
                        </td>
                      )}
                      <td className="whitespace-nowrap p-2">{transaction.code}</td>
                      <td className="whitespace-nowrap p-2">{transaction.cashier}</td>
                      <td className="whitespace-nowrap p-2">{transaction.customer}</td>
                      <td className="whitespace-nowrap p-2">{transaction.payment}</td>
                      <td className="whitespace-nowrap p-2">
                        {transaction.date} - {transaction.time}
                      </td>
                      <td className="whitespace-nowrap p-2">
                        {new Intl.NumberFormat("id-ID", {
                          currency: "IDR",
                          maximumFractionDigits: 0,
                          minimumFractionDigits: 0,
                          style: "currency",
                        }).format(transaction.amount)}
                      </td>
                      <td className="p-2">
                        <ChipButton className="mx-auto" label={transaction.status} size={"sm-status"} status={statusMap[transaction.status]} />
                      </td>
                      {editMode && (
                        <td className="p-2">
                          <div className="flex justify-center gap-2">
                            <IconButton
                              onClick={() => {
                                setSelectedData({
                                  amount: transaction.amount,
                                  cashier: transaction.cashier,
                                  code: transaction.code,
                                  customer: transaction.customer,
                                  date: transaction.date,
                                  id: transaction.id,
                                  payment: transaction.payment,
                                  status: transaction.status,
                                  time: transaction.time,
                                });
                                setOpenUpdateData(true);
                              }}
                              size={"sm"}
                              solid={"green"}
                              type="button"
                            >
                              <MdEdit />
                            </IconButton>

                            <IconButton
                              className={loading[index + 1] ? "cursor-wait" : ""}
                              disabled={loading[index + 1]}
                              onClick={() => handleDelete(transaction.id, index + 1)}
                              size={"sm"}
                              solid={loading[index + 1] ? "disabled" : "red"}
                              type="button"
                            >
                              {loading[index + 1] ? <Image alt="Loading..." quality={30} src={loadingAnimation} width={16} /> : <MdDelete />}
                            </IconButton>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <Pagination
        currentPage={currentPage ?? 0}
        endData={(searchResult && Math.min(indexOfLastData, searchResult.length)) ?? 0}
        onClickNextPage={() => {
          if (totalPage !== undefined) {
            setCurrentPage((prev) => Math.min(prev + 1, totalPage));
          }
        }}
        onClickPrevPage={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        startData={indexOfLastData > 0 ? indexOfFirstData + 1 : 0}
        totalData={searchResult?.length ?? 0}
        totalPage={totalPage ?? 0}
      />

      {openAddData && <AddData />}
      {openUpdateData && <UpdateData selectedData={selectedData} />}
    </main>
  );
};
