import { Button, Input } from "@/components";
import { POSTCashierAccount, TCashierAccount } from "@/libs";
import loadingAnimation from "@/public/assets/animations/loadings/gray-n4.svg";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { FC, ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Output, minLength, object, string } from "valibot";
import { useManageCashier } from "..";

// VALIBOT
const Schema = object({
  name: string([minLength(3, "Please enter name minimum 3 character.")]),
  username: string([minLength(5, "Please enter username minimum 5 character.")]),
  password: string([minLength(5, "Please enter password minimum 5 character.")]),
  role: string(),
});

type TUseForm = Output<typeof Schema>;
// END VALIBOT

const AddData: FC = (): ReactElement => {
  const queryClient = useQueryClient(); // REACT QUERY
  const { setOpenAddData } = useManageCashier(); // ZUSTAND
  const [visibility, setVisibility] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // REACT HOOK FORM WITH VALIBOT
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TUseForm>({
    defaultValues: {
      name: "",
      username: "",
      password: "",
      role: "cashier",
    },
    resolver: valibotResolver(Schema),
  });
  // END REACT HOOK FORM WITH VALIBOT

  const handleAdd = useMutation({
    mutationFn: (data: TCashierAccount) => POSTCashierAccount(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["GETCashierAccount"] });
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
      <form onSubmit={handleSubmit(onSubmit)} className=" h-fit max-h-[500px] w-full max-w-[500px] rounded-xl bg-N1 p-5 shadow-md">
        <div className="flex h-full w-full flex-col items-center gap-3 rounded-lg border p-5">
          <h1 className="text-center text-2xl font-bold">Add Cashier Account</h1>
          <div className="w-full space-y-3">
            <Input
              type="text"
              label="Name"
              {...register("name")}
              id="name"
              errorMassage={errors.name?.message}
              variant={errors.name ? "error" : "default"}
            />

            <Input
              type="text"
              label="Username"
              {...register("username")}
              id="username"
              errorMassage={errors.username?.message}
              variant={errors.username ? "error" : "default"}
            />

            <Input
              type={visibility ? "text" : "password"}
              label="Password"
              {...register("password")}
              id="password"
              icon={visibility ? <FaEye /> : <FaEyeSlash />}
              iconOnClick={() => setVisibility(!visibility)}
              errorMassage={errors.password?.message}
              variant={errors.password ? "error" : "default"}
            />

            <Input type="text" label="Role" {...register("role")} id="role" variant={"disabled"} disabled />
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
