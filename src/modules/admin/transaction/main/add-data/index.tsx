import { Button, Input, Select } from "@/components";
import loadingAnimation from "@/public/assets/animations/loadings/gray-n4.svg";
import { ITransaction, POSTTransaction } from "@/utils";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { FC, ReactElement, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoTime } from "react-icons/io5";
import { Output, minLength, minValue, number, object, string } from "valibot";
import { useTransaction } from "..";

// VALIBOT
const Schema = object({
  id: string(),
  code: string([minLength(10, "Please enter code minimum 10 character.")]),
  cashier: string([minLength(5, "Please enter cashier minimum 5 character.")]),
  customer: string([minLength(5, "Please enter customer minimum 5 character.")]),
  payment: string([minLength(1, "Please choose one of the options.")]),
  date: string([minLength(1, "Please enter the date.")]),
  time: string([minLength(1, "Please set the time.")]),
  amount: number([minValue(1, "Please enter amount minimum 1 number.")]),
  status: string([minLength(1, "Please choose one of the options.")]),
});

type TUseForm = Output<typeof Schema>;
// END VALIBOT

const AddData: FC = (): ReactElement => {
  const queryClient = useQueryClient(); // REACT QUERY
  const { setOpenAddData } = useTransaction(); // ZUSTAND
  const [loading, setLoading] = useState<boolean>(false);
  const [realTime, setRealTime] = useState<string>("");

  useEffect(() => {
    const realTimeInterval = setInterval(() => {
      let date = new Date();
      setRealTime(date.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(realTimeInterval);
  }, []);

  // REACT HOOK FORM WITH VALIBOT
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TUseForm>({
    defaultValues: {
      id: "",
      code: "",
      cashier: "",
      customer: "",
      payment: "",
      date: "",
      time: "",
      amount: 0,
      status: "",
    },
    resolver: valibotResolver(Schema),
  });
  // END REACT HOOK FORM WITH VALIBOT

  const handleAdd = useMutation({
    mutationFn: (data: ITransaction) => POSTTransaction(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["GETTransaction"] });
      setOpenAddData(false);
      reset();
    },
  });

  // REACT HOOK FORM WITH REACT QUERY
  const onSubmit: SubmitHandler<TUseForm> = async (data) => {
    setLoading(true);
    handleAdd.mutate(data, {
      onSuccess: () => setLoading(false),
    });
  };
  // END REACT HOOK FORM WITH REACT QUERY

  return (
    <section className="fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-N7/30 px-5 backdrop-blur-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="h-fit w-full max-w-[500px] rounded-xl bg-N1 p-5 shadow-md">
        <div className="flex h-full w-full flex-col items-center gap-3 rounded-lg border p-5">
          <h1 className="text-center text-2xl font-bold">Add Transaction</h1>
          <div className="w-full space-y-3">
            <Input
              type="text"
              label="Code"
              {...register("code")}
              id="code"
              errorMessage={errors.code?.message}
              variant={errors.code ? "error" : "default"}
            />

            <Input
              type="text"
              label="Cashier"
              {...register("cashier")}
              id="cashier"
              errorMessage={errors.cashier?.message}
              variant={errors.cashier ? "error" : "default"}
            />

            <Input
              type="text"
              label="Customer"
              {...register("customer")}
              id="customer"
              errorMessage={errors.customer?.message}
              variant={errors.customer ? "error" : "default"}
            />

            <Select
              label="Payment"
              {...register("payment")}
              id="payment"
              errorMessage={errors.payment?.message}
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
              type="date"
              label="Date"
              {...register("date")}
              id="date"
              errorMessage={errors.date?.message}
              variant={errors.date ? "error" : "default"}
            />

            <div className="flex w-full gap-3">
              <div className="w-full">
                <Input
                  type="text"
                  label="Time"
                  {...register("time")}
                  id="time"
                  errorMessage={errors.time?.message}
                  variant={errors.time ? "error" : "disabled"}
                  disabled
                />
              </div>

              <div className="mt-[7px] min-w-max">
                <Button type="button" solid={"default"} size={"sm"} onClick={() => setValue("time", realTime)} className="font-semibold">
                  <IoTime size={25} />
                </Button>
              </div>
            </div>

            <Input
              type="number"
              label="Amount"
              {...register("amount", { valueAsNumber: true })}
              id="amount"
              errorMessage={errors.amount?.message}
              variant={errors.amount ? "error" : "default"}
            />

            <Select
              label="Status"
              {...register("status")}
              id="status"
              errorMessage={errors.status?.message}
              variant={errors.status ? "error" : "default"}
            >
              <option value="pending">Pending</option>
              <option value="success">Success</option>
              <option value="canceled">Canceled</option>
            </Select>
          </div>
          <div className="mt-3 flex w-full gap-3 font-semibold">
            <Button
              type="button"
              outline={"default"}
              size={"sm"}
              widthFull
              onClick={() => {
                setOpenAddData(false);
                reset();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              solid={loading ? "disabled" : "default"}
              size={"sm"}
              widthFull
              disabled={loading}
              className={loading ? "cursor-wait" : ""}
            >
              {loading && <Image src={loadingAnimation} alt="Loading..." width={20} quality={30} />}
              Add
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddData;
