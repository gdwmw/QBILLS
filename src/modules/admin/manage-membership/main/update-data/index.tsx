import { Button, Input } from "@/components";
import { IMembership, PUTMembership } from "@/libs";
import loadingAnimation from "@/public/assets/animations/loadings/gray-n4.svg";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { FC, ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Output, minLength, minValue, number, object, string } from "valibot";
import { useManageMembership } from "..";

// VALIBOT
const Schema = object({
  id: string(),
  name: string([minLength(3, "Please enter name minimum 3 character.")]),
  "phone-number": number([minValue(8, "Please enter phone number minimum 8 number.")]),
  point: number(),
});

type TUseForm = Output<typeof Schema>;
// END VALIBOT

type T = {
  selectedData: IMembership;
};

const UpdateData: FC<T> = ({ selectedData }): ReactElement => {
  const queryClient = useQueryClient(); // REACT QUERY
  const { setOpenUpdateData } = useManageMembership(); // ZUSTAND
  const [loading, setLoading] = useState<boolean>(false);

  // REACT HOOK FORM WITH VALIBOT
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TUseForm>({
    defaultValues: {
      id: selectedData.id,
      name: selectedData.name,
      "phone-number": selectedData["phone-number"],
      point: selectedData.point,
    },
    resolver: valibotResolver(Schema),
  });
  // END REACT HOOK FORM WITH VALIBOT

  const handleUpdate = useMutation({
    mutationFn: (data: IMembership) => PUTMembership(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["GETMembership"] });
      setOpenUpdateData(false);
      reset();
    },
  });

  // REACT HOOK FORM WITH REACT QUERY
  const onSubmit: SubmitHandler<TUseForm> = async (data) => {
    setLoading(true);
    handleUpdate.mutate(data, {
      onSuccess: () => setLoading(false),
    });
  };
  // END REACT HOOK FORM WITH REACT QUERY

  return (
    <section className="fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-N7/30 px-5 backdrop-blur-sm">
      <form onSubmit={handleSubmit(onSubmit)} className=" h-fit max-h-[500px] w-full max-w-[500px] rounded-xl bg-N1 p-5 shadow-md">
        <div className="flex h-full w-full flex-col items-center gap-3 rounded-lg border p-5">
          <h1 className="text-center text-2xl font-bold">Update Membership</h1>
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
              type="number"
              label="Phone Number"
              {...register("phone-number", { valueAsNumber: true })}
              id="phone-number"
              errorMassage={errors["phone-number"]?.message}
              variant={errors["phone-number"] ? "error" : "default"}
            />

            <Input
              type="number"
              label="Point"
              {...register("point", { valueAsNumber: true })}
              id="point"
              errorMassage={errors.point?.message}
              variant={errors.point ? "error" : "default"}
            />
          </div>
          <div className="mt-3 flex w-full gap-3 font-semibold">
            <Button
              type="button"
              outline={"default"}
              size={"sm"}
              widthFull
              onClick={() => {
                setOpenUpdateData(false);
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
              Update
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default UpdateData;
