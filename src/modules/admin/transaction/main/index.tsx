"use client";

import { Button, Chip, IconButton, Input, Pagination, Select } from "@/components";
import loadingAnimation from "@/public/assets/animations/loadings/gray-n4.svg";
import { DELETEMultipleTransaction, DELETETransaction, GETTransaction, ITransaction } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Image from "next/image";
import { FC, ReactElement, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheckCircle, FaClock, FaSearch } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { MdAccountBalanceWallet, MdDelete, MdEdit } from "react-icons/md";
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

export const useTransaction = create<States & Actions>((set) => ({
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
  const { openAddData, openUpdateData, setOpenAddData, setOpenUpdateData } = useTransaction(); // ZUSTAND
  const [selectedData, setSelectedData] = useState<ITransaction>({
    id: "",
    code: "",
    cashier: "",
    customer: "",
    payment: "",
    date: "",
    time: "",
    amount: 0,
    status: "",
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState<boolean[]>([false]);
  const [editMode, setEditMode] = useState<boolean>(false);

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

  // REACT QUERY
  const { data } = useQuery({
    queryKey: ["GETTransaction"],
    queryFn: GETTransaction,
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
  const { register, watch } = useForm<{ search: string; startDate: Date; endDate: Date; status: string }>({
    defaultValues: {
      search: "",
      startDate: new Date("0001-01-01"),
      endDate: new Date(),
      status: "",
    },
  });
  // END REACT HOOK FORM

  const searchResult = data?.filter((data) => {
    const startDate = new Date(watch("startDate"));
    const endDate = new Date(watch("endDate"));
    const dataDate = new Date(data.date);

    const isWithinDate = dataDate >= startDate && dataDate <= endDate;
    const isCodeMatch = data.code.toLowerCase().includes(watch("search").toLowerCase());
    const isCustomerMatch = data.customer.toLowerCase().includes(watch("search").toLowerCase());
    const isStatusMatch = data.status.toLowerCase().includes(watch("status").toLowerCase());

    const result = isCodeMatch && isCustomerMatch && isWithinDate && isStatusMatch;
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

  function calculateCurrentMonthlyTotal(transactions: { date: string; amount: number; status: string }[]) {
    let currentMonth = new Date().toISOString().slice(0, 7);
    let currentMonthTotal = 0;

    for (let transaction of transactions) {
      if (transaction.status === "success") {
        let month = transaction.date.slice(0, 7);
        if (month === currentMonth) {
          currentMonthTotal += transaction.amount;
        }
      }
    }

    return { month: currentMonth, total: currentMonthTotal };
  }

  function calculateStatus(transactions: { status: string }[], status: string) {
    let count = 0;
    for (let transaction of transactions) {
      if (transaction.status === status) {
        count++;
      }
    }
    return count;
  }

  const statusMap: { [key: string]: "default" | "success" | "pending" | "canceled" | "selected" | "disabled" | null | undefined } = {
    success: "success",
    pending: "pending",
    canceled: "canceled",
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
                  Add Transaction
                </Button>
              </div>
            </div>
          )}
        </section>

        <section className="w-full gap-5 max-[1480px]:grid max-[1480px]:grid-cols-2 min-[1480px]:flex">
          <div className="w-full gap-5 max-[1480px]:space-y-5 min-[1480px]:flex">
            <div className="flex h-[180px] w-full items-center rounded-lg border-2 px-10">
              <div>
                <div className="h-[40px] border border-N1">
                  <MdAccountBalanceWallet size={50} className="-ml-[6px] -mt-[6px] text-I4" />
                </div>
                <span className="font-semibold text-N3">Total Monthly Per.{` (${calculateCurrentMonthlyTotal(data || []).month})`}</span>
                <br />
                <span className="text-2xl font-semibold">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(calculateCurrentMonthlyTotal(data || []).total)}
                </span>
              </div>
            </div>

            <div className="flex h-[180px] w-full items-center rounded-lg border-2 px-10">
              <div>
                <div className="h-[40px] border border-N1">
                  <FaCheckCircle size={38} className="-ml-[1px] mb-px text-S4" />
                </div>
                <span className="font-semibold text-N3">Success</span>
                <br />
                <span className="text-2xl font-semibold">{calculateStatus(data || [], "success")}</span>
              </div>
            </div>
          </div>

          <div className="w-full gap-5 max-[1480px]:space-y-5 min-[1480px]:flex">
            <div className="flex h-[180px] w-full items-center rounded-lg border-2 px-10">
              <div>
                <div className="h-[40px] border border-N1">
                  <FaClock size={38} className="-ml-[1px] mb-px text-W4" />
                </div>
                <span className="font-semibold text-N3">Pending</span>
                <br />
                <span className="text-2xl font-semibold">{calculateStatus(data || [], "pending")}</span>
              </div>
            </div>

            <div className="flex h-[180px] w-full items-center rounded-lg border-2 px-10">
              <div>
                <div className="h-[40px] border border-N1">
                  <IoMdCloseCircle size={46} className="-ml-[4px] -mt-[4px] text-E4" />
                </div>
                <span className="font-semibold text-N3">Canceled</span>
                <br />
                <span className="text-2xl font-semibold">{calculateStatus(data || [], "canceled")}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="flex w-full items-center gap-3 overflow-y-auto">
          <div className="w-full min-w-[162px]">
            <Input type="text" label="Search Transaction" {...register("search")} id="search-transaction" icon={<FaSearch />}></Input>
          </div>
          <div className="min-w-[162px]">
            <Input type="date" label="Start Date" {...register("startDate")} id="startDate" variant={"default"} />
          </div>
          <div className="min-w-[162px]">
            <Input type="date" label="End Date" {...register("endDate")} id="endDate" variant={"default"} />
          </div>
          <div className="min-w-[162px]">
            <Select label="Status" {...register("status")} id="status">
              <option value=""></option>
              <option value="success">Success</option>
              <option value="pending">Pending</option>
              <option value="canceled">Canceled</option>
            </Select>
          </div>
        </section>

        <section className="overflow-hidden rounded-lg border border-N2">
          <div className="max-h-[51vh] overflow-auto">
            <table className="w-full">
              <thead className="sticky top-0 z-10 bg-N2">
                <tr className="text-center">
                  {editMode && <th className="px-4 py-4">Checkbox</th>}
                  <th className="px-4 py-4">Code</th>
                  <th className="px-4 py-4">Cashier</th>
                  <th className="px-4 py-4">Customer</th>
                  <th className="px-4 py-4">Payment</th>
                  <th className="px-4 py-4">Date - Time</th>
                  <th className="px-4 py-4">Amount</th>
                  <th className="px-4 py-4">Status</th>
                  {editMode && <th className="px-4 py-4">Action</th>}
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
                    <tr key={transaction.id} className={`text-center ${index % 2 === 0 ? "bg-N1" : "bg-N2.2"}`}>
                      {editMode && (
                        <td className="px-2 py-2">
                          <input
                            type="checkbox"
                            id={`checkbox-id-${index}`}
                            name={`checkbox-name-${index}`}
                            checked={checkbox.includes(transaction.id)}
                            onChange={() => handleCheckbox(transaction.id)}
                          />
                        </td>
                      )}
                      <td className="whitespace-nowrap px-2 py-2">{transaction.code}</td>
                      <td className="whitespace-nowrap px-2 py-2">{transaction.cashier}</td>
                      <td className="whitespace-nowrap px-2 py-2">{transaction.customer}</td>
                      <td className="whitespace-nowrap px-2 py-2">{transaction.payment}</td>
                      <td className="whitespace-nowrap px-2 py-2">
                        {transaction.date} - {transaction.time}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(transaction.amount)}
                      </td>
                      <td className="px-2 py-2">
                        <Chip label={transaction.status} status={statusMap[transaction.status]} size={"sm-status"} className="mx-auto" />
                      </td>
                      {editMode && (
                        <td className="px-2 py-2">
                          <div className="flex justify-center gap-2">
                            <IconButton
                              type="button"
                              solid={"green"}
                              size={"sm"}
                              onClick={() => {
                                setSelectedData({
                                  id: transaction.id,
                                  code: transaction.code,
                                  cashier: transaction.cashier,
                                  customer: transaction.customer,
                                  payment: transaction.payment,
                                  date: transaction.date,
                                  time: transaction.time,
                                  amount: transaction.amount,
                                  status: transaction.status,
                                });
                                setOpenUpdateData(true);
                              }}
                            >
                              <MdEdit />
                            </IconButton>

                            <IconButton
                              type="button"
                              solid={loading[index + 1] ? "disabled" : "red"}
                              size={"sm"}
                              onClick={() => handleDelete(transaction.id, index + 1)}
                              disabled={loading[index + 1]}
                              className={loading[index + 1] ? "cursor-wait" : ""}
                            >
                              {loading[index + 1] ? <Image src={loadingAnimation} alt="Loading..." width={16} quality={30} /> : <MdDelete />}
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
