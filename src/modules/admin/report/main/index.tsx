"use client";

import { useQuery } from "@tanstack/react-query";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { FC, ReactElement, useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { useForm } from "react-hook-form";
import { FaCheckCircle, FaClock, FaSearch } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { MdAccountBalanceWallet } from "react-icons/md";

import { ChipButton, Input, Pagination, PaginationLogic, SelectInput } from "@/components";
import { GETTransaction, ITransaction } from "@/utils";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

interface FilterForm {
  endDate: string;
  search: string;
  startDate: string;
  status: string;
}

export const Main: FC = (): ReactElement => {
  const { data } = useQuery({
    queryFn: GETTransaction,
    queryKey: ["GETTransaction"],
  });

  const { register, watch } = useForm<FilterForm>({
    defaultValues: {
      endDate: "",
      search: "",
      startDate: "",
      status: "",
    },
  });

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

  const [filteredData, setFilteredData] = useState<ITransaction[]>([]);

  useEffect(() => {
    if (!data) return;

    let filtered = data;

    if (watch("search")) {
      filtered = filtered.filter(
        (transaction) =>
          transaction.code.toLowerCase().includes(watch("search").toLowerCase()) ||
          transaction.customer.toLowerCase().includes(watch("search").toLowerCase()) ||
          transaction.cashier.toLowerCase().includes(watch("search").toLowerCase()),
      );
    }

    if (watch("startDate")) {
      filtered = filtered.filter((transaction) => new Date(transaction.date) >= new Date(watch("startDate")));
    }

    if (watch("endDate")) {
      filtered = filtered.filter((transaction) => new Date(transaction.date) <= new Date(watch("endDate")));
    }

    if (watch("status")) {
      filtered = filtered.filter((transaction) => transaction.status === watch("status"));
    }

    setFilteredData(filtered);
  }, [data, watch("search"), watch("startDate"), watch("endDate"), watch("status")]);

  const { currentData, currentPage, endData, nextPage, prevPage, startData, totalData, totalPage } = PaginationLogic({
    data: filteredData,
    dataPerPage: 20,
  });

  const successTransactions = filteredData.filter((t) => t.status === "success").length;
  const pendingTransactions = filteredData.filter((t) => t.status === "pending").length;
  const canceledTransactions = filteredData.filter((t) => t.status === "canceled").length;

  const dailyRevenue = filteredData
    .filter((t) => t.status === "success")
    .reduce(
      (acc, transaction) => {
        const date = transaction.date;
        acc[date] = (acc[date] || 0) + transaction.amount;
        return acc;
      },
      {} as Record<string, number>,
    );

  const chartData = {
    datasets: [
      {
        backgroundColor: "rgba(190, 132, 101, 0.5)",
        borderColor: "rgb(190, 132, 101)",
        borderWidth: 2,
        data: Object.keys(dailyRevenue)
          .sort((a, b) => a.localeCompare(b))
          .map((date) => dailyRevenue[date]),
        label: "Line Chart",
      },
    ],
    labels: Object.keys(dailyRevenue).sort((a, b) => a.localeCompare(b)),
  };

  const statusChartData = {
    datasets: [
      {
        backgroundColor: ["rgba(34, 197, 94, 0.5)", "rgba(251, 191, 36, 0.5)", "rgba(239, 68, 68, 0.5)"],
        borderColor: ["rgb(34, 197, 94)", "rgb(251, 191, 36)", "rgb(239, 68, 68)"],
        borderWidth: 2,
        data: [successTransactions, pendingTransactions, canceledTransactions],
        label: "Bar Chart",
      },
    ],
    labels: ["Success", "Pending", "Canceled"],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    responsive: true,
  };

  const statusMap: { [key: string]: "canceled" | "default" | "disabled" | "pending" | "selected" | "success" | null | undefined } = {
    canceled: "canceled",
    pending: "pending",
    success: "success",
  };

  return (
    <main className="space-y-5 p-5">
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

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-lg border p-6">
          <h3 className="mb-4 text-lg font-semibold">Daily Income</h3>
          <Line data={chartData} options={chartOptions} />
        </div>

        <div className="rounded-lg border p-6">
          <h3 className="mb-4 text-lg font-semibold">Transaction Status</h3>
          <Bar data={statusChartData} options={chartOptions} />
        </div>
      </div>

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
                <th className="p-4">Code</th>
                <th className="p-4">Cashier</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Date - Time</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
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
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

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
  );
};
