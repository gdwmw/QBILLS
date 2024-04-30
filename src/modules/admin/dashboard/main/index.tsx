"use client";

import { Chip } from "@/components";
import { GETCashierAccount, GETMembership, GETProduct, GETTransaction } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import Image from "next/image";
import { FC, ReactElement, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { FaUserCircle } from "react-icons/fa";
import { FaBoxesStacked } from "react-icons/fa6";
import { MdAccountBalanceWallet } from "react-icons/md";
import { RiSwapBoxFill } from "react-icons/ri";

export const Main: FC = (): ReactElement => {
  const { data: cashier } = useQuery({
    queryKey: ["GETCashierAccount"],
    queryFn: GETCashierAccount,
  });

  const { data: product } = useQuery({
    queryKey: ["GETProduct"],
    queryFn: GETProduct,
  });

  const { data: membership } = useQuery({
    queryKey: ["GETMembership"],
    queryFn: GETMembership,
  });

  const { data: transaction } = useQuery({
    queryKey: ["GETTransaction"],
    queryFn: GETTransaction,
  });

  const quantity = [50, 35, 20];

  const [height, setHeight] = useState(0);

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

  function sumQuantity() {
    return quantity.reduce((a, b) => a + b, 0);
  }

  function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let transactionsAfterDeduction = transaction?.map((t) => {
    let transactionAmount = t.amount;
    let transactionAmountAfterDeduction = transactionAmount - transactionAmount * 0.5;
    return { ...t, amount: transactionAmountAfterDeduction };
  });

  let monthlyTotal = calculateCurrentMonthlyTotal(transactionsAfterDeduction || []);

  const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const data = {
    labels,
    datasets: [
      {
        label: "Income This Year",
        data: labels.map(() => getRandomNumber(1000000, 20000000)),
        borderColor: "rgb(190, 132, 101)",
        backgroundColor: "rgba(190, 132, 101, 0.5)",
      },
      {
        label: "Income Last Year",
        data: labels.map(() => getRandomNumber(1000000, 20000000)),
        borderColor: "rgb(230, 230, 230)",
        backgroundColor: "rgba(230, 230, 230, 0.5)",
      },
    ],
  };

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
  const options = {
    responsive: true,
    plugins: {},
  };

  useEffect(() => {
    const updateHeight = () => {
      const element = document.getElementById("take-height");
      if (element) {
        setHeight(element.offsetHeight - 42);
      }
    };
    window.addEventListener("resize", updateHeight);
    updateHeight();
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const statusMap: { [key: string]: "default" | "success" | "pending" | "canceled" | "selected" | "disabled" | null | undefined } = {
    success: "success",
    pending: "pending",
    canceled: "canceled",
  };

  return (
    <main className="space-y-5 px-5 pb-5">
      <div id="take-height" className="mt-5 grid grid-cols-4 gap-5">
        <div className="col-span-4 space-y-5 min-[1480px]:col-span-3">
          <section className="w-full gap-5 max-[1479px]:grid max-[1479px]:grid-cols-2 min-[1480px]:flex">
            <div className="w-full gap-5 max-[1479px]:space-y-5 min-[1480px]:flex">
              <section className="flex h-[180px] w-full items-center rounded-lg border-2 px-10">
                <div>
                  <div className="h-[40px] border border-N1">
                    <MdAccountBalanceWallet size={50} className="-ml-[6px] -mt-[6px] text-I4" />
                  </div>
                  <span className="font-semibold text-N3">Revenue Per. {`(${monthlyTotal.month})`}</span>
                  <br />
                  <span className="text-2xl font-semibold">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(monthlyTotal.total)}
                  </span>
                </div>
              </section>

              <section className="flex h-[180px] w-full items-center rounded-lg border-2 px-10">
                <div>
                  <div className="h-[40px] border border-N1">
                    <RiSwapBoxFill size={50} className="-ml-[4px] -mt-[6px] text-S4" />
                  </div>
                  <span className="whitespace-nowrap font-semibold text-N3">Total Order</span>
                  <br />
                  <span className="text-2xl font-semibold">{sumQuantity()}</span>
                </div>
              </section>
            </div>

            <div className="w-full gap-5 max-[1479px]:space-y-5 min-[1480px]:flex">
              <section className="flex h-[180px] w-full items-center rounded-lg border-2 px-10">
                <div>
                  <div className="h-[40px] border border-N1">
                    <FaBoxesStacked size={43} className="-mt-[3px] text-W4" />
                  </div>
                  <span className="whitespace-nowrap font-semibold text-N3">Total Product</span>
                  <br />
                  <span className="text-2xl font-semibold">{product?.length}</span>
                </div>
              </section>

              <section className="flex h-[180px] w-full items-center rounded-lg border-2 px-10">
                <div>
                  <div className="h-[40px] border border-N1">
                    <FaUserCircle size={38} className="text-E4" />
                  </div>
                  <span className="whitespace-nowrap font-semibold text-N3">Total Cashier</span>
                  <br />
                  <span className="text-2xl font-semibold">{cashier?.length}</span>
                </div>
              </section>
            </div>
          </section>

          <section>
            <h2 className="mb-3 whitespace-nowrap text-xl font-semibold">Income Flow</h2>
            <div className="rounded-lg border p-10">
              <Line options={options} data={data} />
            </div>
          </section>
        </div>

        <section className="max-[1479px]:hidden">
          <h2 className="mb-3 whitespace-nowrap text-xl font-semibold ">Recent Transaction</h2>
          <div className="overflow-hidden rounded-lg border border-N2">
            <div className="overflow-auto" style={{ maxHeight: height }}>
              <table className="w-full">
                <thead className="sticky top-0 z-10 bg-N2">
                  <tr className="text-center">
                    <th className="px-4 py-4">Status</th>
                    <th className="px-4 py-4">Amount</th>
                    <th className="px-4 py-4">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {transaction
                    ?.sort((a, b) => {
                      const dateDifference = new Date(b.date).getTime() - new Date(a.date).getTime();
                      if (dateDifference !== 0) return dateDifference;
                      const [aHours, aMinutes] = a.time.split(":").map(Number);
                      const [bHours, bMinutes] = b.time.split(":").map(Number);
                      return bHours * 60 + bMinutes - (aHours * 60 + aMinutes);
                    })
                    .map((transaction, index) => (
                      <tr key={transaction.id} className={`text-center ${index % 2 === 0 ? "bg-N1" : "bg-N2.2"}`}>
                        <td className="px-2 py-2">
                          <div
                            className={`mx-auto flex h-5 w-5 items-center justify-center rounded-full ${transaction.status === "success" && "bg-S1 text-S5"} ${transaction.status === "pending" && "bg-W1 text-W5"} ${transaction.status === "canceled" && "bg-E1 text-E5"}`}
                          >
                            {transaction.status === "success" && "S"}
                            {transaction.status === "pending" && "P"}
                            {transaction.status === "canceled" && "C"}
                          </div>
                        </td>
                        <td className="px-2 py-2 font-semibold">
                          <div className="flex justify-between">
                            <div className="mr-auto">Rp</div>
                            <div>
                              {new Intl.NumberFormat("id-ID", {
                                style: "decimal",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              }).format(transaction.amount)}
                            </div>
                          </div>
                        </td>
                        <td className="flex flex-col px-2 py-2">
                          <span className="text-xs font-semibold">{transaction.code}</span>
                          <span className="text-xs text-N3">{`${transaction.date}, ${transaction.time}`}</span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      <section className="w-full min-[1480px]:hidden">
        <h2 className="mb-3 whitespace-nowrap text-xl font-semibold ">Recent Transaction</h2>
        <div className="overflow-hidden rounded-lg border border-N2">
          <div className="max-h-[300px] overflow-auto">
            <table className="w-full">
              <thead className="sticky top-0 z-10 bg-N2">
                <tr className="text-center">
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Amount</th>
                  <th className="px-4 py-4">Details</th>
                </tr>
              </thead>
              <tbody>
                {transaction
                  ?.sort((a, b) => {
                    const dateDifference = new Date(b.date).getTime() - new Date(a.date).getTime();
                    if (dateDifference !== 0) return dateDifference;
                    const [aHours, aMinutes] = a.time.split(":").map(Number);
                    const [bHours, bMinutes] = b.time.split(":").map(Number);
                    return bHours * 60 + bMinutes - (aHours * 60 + aMinutes);
                  })
                  .map((transaction, index) => (
                    <tr key={transaction.id} className={`text-center ${index % 2 === 0 ? "bg-N1" : "bg-N2.2"}`}>
                      <td className="px-2 py-2">
                        <Chip label={transaction.status} status={statusMap[transaction.status]} size={"sm-status"} className="mx-auto" />
                      </td>
                      <td className="px-2 py-2 font-semibold">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(transaction.amount)}
                      </td>
                      <td className="flex flex-col px-2 py-2">
                        <span className="text-xs font-semibold">{transaction.code}</span>
                        <span className="text-xs text-N3">{`${transaction.date}, ${transaction.time}`}</span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-4 gap-5">
        <section className="col-span-4 min-[1480px]:col-span-3">
          <h2 className="mb-3 whitespace-nowrap text-xl font-semibold">Best Selling Products</h2>
          <div className="overflow-hidden rounded-lg border border-N2">
            <div className="overflow-auto">
              <table className="w-full">
                <thead className="sticky top-0 z-10 bg-N2">
                  <tr className="text-center">
                    <th className="px-4 py-4">Rank</th>
                    <th className="px-4 py-4">Product</th>
                    <th className="px-4 py-4">Category</th>
                    <th className="px-4 py-4">Size</th>
                    <th className="px-4 py-4">Price</th>
                    <th className="px-4 py-4">Quantity</th>
                    <th className="px-4 py-4">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {product?.slice(0, 3).map((product, index) => (
                    <tr key={product.id} className={`text-center ${index % 2 === 0 ? "bg-N1" : "bg-N2.2"}`}>
                      <td className="px-2 py-2">
                        <span
                          className={`mx-auto flex h-[30px] w-[30px] items-center justify-center rounded-full ${index === 0 ? "bg-W1 text-W5" : "bg-N2 text-N3"}`}
                        >
                          {index + 1}
                        </span>
                      </td>
                      <td className="flex items-center justify-center gap-2 whitespace-nowrap px-2 py-2">
                        <Image
                          src={product.image}
                          alt="Image"
                          width={0}
                          height={0}
                          quality={30}
                          className="h-fit max-h-[30px] w-fit max-w-[30px] rounded-md"
                        />
                        {product.name}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2">
                        {(() => {
                          switch (product.category) {
                            case "coffee":
                              return "Coffee";
                            case "non-coffee":
                              return "Non-Coffee";
                            case "snack":
                              return "Snack";
                            default:
                              return "Meal";
                          }
                        })()}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2">
                        {(() => {
                          switch (product.size) {
                            case "small":
                              return "Small";
                            case "medium":
                              return "Medium";
                            default:
                              return "Large";
                          }
                        })()}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(product.price)}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2">{quantity[index]}</td>
                      <td className="whitespace-nowrap px-2 py-2">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(product.price * quantity[index])}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="max-[1479px]:hidden">
          <h2 className="mb-3 whitespace-nowrap text-xl font-semibold">Top Membership</h2>
          <div className="overflow-hidden rounded-lg border border-N2">
            <div className="overflow-auto">
              <table className="w-full">
                <thead className="sticky top-0 z-10 bg-N2">
                  <tr className="text-center">
                    <th className="px-4 py-4">Rank</th>
                    <th className="px-4 py-4">Member</th>
                    <th className="px-4 py-4">Point</th>
                  </tr>
                </thead>
                <tbody>
                  {membership
                    ?.sort((a, b) => b.point - a.point)
                    .slice(0, 3)
                    .map((member, index) => (
                      <tr key={member.id} className="text-center">
                        <td className="px-2 py-2">
                          <span
                            className={`mx-auto flex h-[30px] w-[30px] items-center justify-center rounded-full ${index === 0 ? "bg-W1 text-W5" : "bg-N2 text-N3"}`}
                          >
                            {index + 1}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-2 py-2">{member.name}</td>
                        <td className="whitespace-nowrap px-2 py-2">{member.point}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      <section className="w-full min-[1480px]:hidden">
        <h2 className="mb-3 whitespace-nowrap text-xl font-semibold">Top Membership</h2>
        <div className="overflow-hidden rounded-lg border border-N2">
          <div className="overflow-auto">
            <table className="w-full">
              <thead className="sticky top-0 z-10 bg-N2">
                <tr className="text-center">
                  <th className="px-4 py-4">Rank</th>
                  <th className="px-4 py-4">Member</th>
                  <th className="px-4 py-4">Point</th>
                </tr>
              </thead>
              <tbody>
                {membership
                  ?.sort((a, b) => b.point - a.point)
                  .slice(0, 3)
                  .map((member, index) => (
                    <tr key={member.id} className="text-center">
                      <td className="px-2 py-2">
                        <span
                          className={`mx-auto flex h-[30px] w-[30px] items-center justify-center rounded-full ${index === 0 ? "bg-W1 text-W5" : "bg-N2 text-N3"}`}
                        >
                          {index + 1}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-2 py-2">{member.name}</td>
                      <td className="whitespace-nowrap px-2 py-2">{member.point}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
};
