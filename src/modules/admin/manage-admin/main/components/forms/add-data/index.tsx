import { FC, ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useGlobalStates } from "@/states";
import { POSTAdminAccount } from "@/utils";

import { Form } from "../Form";
import { Schema, TSchema } from "../Schema";

const AddData: FC = (): ReactElement => {
  const queryClient = useQueryClient();
  const { setOpenAddData } = useGlobalStates();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<TSchema>({
    defaultValues: {
      id: "",
      name: "",
      password: "",
      role: "admin",
      username: "",
    },
    resolver: valibotResolver(Schema),
  });

  const handleAdd = useMutation({
    mutationFn: POSTAdminAccount,
    onError: () => setLoading(false),
    onMutate: () => setLoading(true),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["GETAdminAccount"] });
      setOpenAddData(false);
      setLoading(false);
      reset();
    },
  });

  const onSubmit: SubmitHandler<TSchema> = async (data) => {
    handleAdd.mutate(data);
  };

  return (
    <Form
      buttonLabel="Add"
      errors={errors}
      handleSubmit={handleSubmit}
      label="Add Admin Account"
      loading={loading}
      onSubmit={onSubmit}
      register={register}
      reset={reset}
      setGlobalStates={setOpenAddData}
    />
  );
};

export default AddData;
