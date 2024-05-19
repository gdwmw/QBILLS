import { useGlobalStates } from "@/states";
import { IAdminAccount, PUTAdminAccount } from "@/utils";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC, ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Output } from "valibot";
import { Form } from "../Form";
import { Schema } from "../Schema";

type TUseForm = Output<typeof Schema>;

type T = {
  selectedData: IAdminAccount | undefined;
};

const UpdateData: FC<T> = ({ selectedData }): ReactElement => {
  const queryClient = useQueryClient();
  const { setOpenUpdateData } = useGlobalStates();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TUseForm>({
    defaultValues: {
      id: selectedData?.id,
      name: selectedData?.name,
      username: selectedData?.username,
      password: selectedData?.password,
      role: selectedData?.role,
    },
    resolver: valibotResolver(Schema),
  });

  const handleUpdate = useMutation({
    mutationFn: PUTAdminAccount,
    onMutate: () => setLoading(true),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["GETAdminAccount"] });
      setOpenUpdateData(false);
      setLoading(false);
      reset();
    },
    onError: () => setLoading(false),
  });

  const onSubmit: SubmitHandler<TUseForm> = async (data) => {
    handleUpdate.mutate(data);
  };

  return (
    <Form
      label="Update Admin Account"
      buttonLabel="Update"
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      loading={loading}
      setGlobalStates={setOpenUpdateData}
      reset={reset}
    />
  );
};

export default UpdateData;
