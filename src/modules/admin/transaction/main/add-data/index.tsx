import { FC, ReactElement, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { IoTime } from "react-icons/io5";
import { z } from "zod";

import { Button, Input, Select } from "@/components";
import loadingAnimation from "@/public/assets/animations/loadings/gray-n4.svg";
import { ITransaction, POSTTransaction } from "@/utils";

import { useTransaction } from "..";

const Schema = z.object({
  amount: z.number().min(1, { message: "Please enter amount minimum 1 number." }),
  cashier: z.string().min(5, { message: "Please enter cashier minimum 5 character." }),
  code: z.string().min(10, { message: "Please enter code minimum 10 character." }),
  customer: z.string().min(5, { message: "Please enter customer minimum 5 character." }),
  date: z.string().min(1, { message: "Please enter the date." }),
  id: z.string(),
  payment: z.string().min(1, { message: "Please choose one of the options." }),
  status: z.string().min(1, { message: "Please choose one of the options." }),
  time: z.string().min(1, { message: "Please set the time." }),
});

type TUseForm = z.infer<typeof Schema>;

const AddData: FC = (): ReactElement => {
  const queryClient = useQueryClient();
  const { setOpenAddData } = useTransaction();
  const [loading, setLoading] = useState<boolean>(false);
  const [realTime, setRealTime] = useState<string>("");

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<TUseForm>({
    defaultValues: {
      amount: 0,
      cashier: "",
      code: "",
      customer: "",
      date: "",
      id: "",
      payment: "",
      status: "",
      time: "",
    },
    resolver: zodResolver(Schema),
  });

  const handleAdd = useMutation({
    mutationFn: (data: ITransaction) => POSTTransaction(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["GETTransaction"] });
      setOpenAddData(false);
      reset();
    },
  });

  const onSubmit: SubmitHandler<TUseForm> = async (data) => {
    setLoading(true);
    handleAdd.mutate(data, {
      onSuccess: () => setLoading(false),
    });
  };

  useEffect(() => {
    const realTimeInterval = setInterval(() => {
      let date = new Date();
      setRealTime(date.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(realTimeInterval);
  }, []);

  return (
    <section className="fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-N7/30 px-5 backdrop-blur-sm">
      <form className="h-fit w-full max-w-[500px] rounded-xl bg-N1 p-5 shadow-md" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex size-full flex-col items-center gap-3 rounded-lg border p-5">
          <h1 className="text-center text-2xl font-bold">Add Transaction</h1>
          <div className="w-full space-y-3">
            <Input
              label="Code"
              type="text"
              {...register("code")}
              errorMessage={errors.code?.message}
              id="code"
              variant={errors.code ? "error" : "default"}
            />

            <Input
              label="Cashier"
              type="text"
              {...register("cashier")}
              errorMessage={errors.cashier?.message}
              id="cashier"
              variant={errors.cashier ? "error" : "default"}
            />

            <Input
              label="Customer"
              type="text"
              {...register("customer")}
              errorMessage={errors.customer?.message}
              id="customer"
              variant={errors.customer ? "error" : "default"}
            />

            <Select
              label="Payment"
              {...register("payment")}
              errorMessage={errors.payment?.message}
              id="payment"
              variant={errors.payment ? "error" : "default"}
            >
              <option value="Cash">Cash</option>
              <option value="QRIS">QRIS</option>
              <option value="GoPay">GoPay</option>
              <option value="ShopeePay">ShopeePay</option>
              <option value="OVO">OVO</option>
              <option value="DANA">DANA</option>
              <option value="Bank BCA">Bank BCA</option>
              <option value="Bank BRI">Bank BRI</option>
              <option value="Bank BNI">Bank BNI</option>
            </Select>

            <Input
              label="Date"
              type="date"
              {...register("date")}
              errorMessage={errors.date?.message}
              id="date"
              variant={errors.date ? "error" : "default"}
            />

            <div className="flex w-full gap-3">
              <div className="w-full">
                <Input
                  label="Time"
                  type="text"
                  {...register("time")}
                  disabled
                  errorMessage={errors.time?.message}
                  id="time"
                  variant={errors.time ? "error" : "disabled"}
                />
              </div>

              <div className="mt-[7px] min-w-max">
                <Button className="font-semibold" onClick={() => setValue("time", realTime)} size={"sm"} solid={"default"} type="button">
                  <IoTime size={25} />
                </Button>
              </div>
            </div>

            <Input
              label="Amount"
              type="number"
              {...register("amount", { valueAsNumber: true })}
              errorMessage={errors.amount?.message}
              id="amount"
              variant={errors.amount ? "error" : "default"}
            />

            <Select
              label="Status"
              {...register("status")}
              errorMessage={errors.status?.message}
              id="status"
              variant={errors.status ? "error" : "default"}
            >
              <option value="pending">Pending</option>
              <option value="success">Success</option>
              <option value="canceled">Canceled</option>
            </Select>
          </div>
          <div className="mt-3 flex w-full gap-3 font-semibold">
            <Button
              onClick={() => {
                setOpenAddData(false);
                reset();
              }}
              outline={"default"}
              size={"sm"}
              type="button"
            >
              Cancel
            </Button>
            <Button className={loading ? "cursor-wait" : ""} disabled={loading} size={"sm"} solid={loading ? "disabled" : "default"} type="submit">
              {loading && <Image alt="Loading..." quality={30} src={loadingAnimation} width={20} />}
              Add
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddData;
