import { useGlobalStates } from "@/states";
import { POSTAdminAccount } from "@/utils";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC, ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "../Form";
import { Schema, TSchema } from "../Schema";

const AddData: FC = (): ReactElement => {
  const queryClient = useQueryClient();
  const { setOpenAddData } = useGlobalStates();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TSchema>({
    defaultValues: {
      id: "",
      name: "",
      username: "",
      password: "",
      role: "admin",
    },
    resolver: valibotResolver(Schema),
  });

  const handleAdd = useMutation({
    mutationFn: POSTAdminAccount,
    onMutate: () => setLoading(true),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["GETAdminAccount"] });
      setOpenAddData(false);
      setLoading(false);
      reset();
    },
    onError: () => setLoading(false),
  });

  const onSubmit: SubmitHandler<TSchema> = async (data) => {
    handleAdd.mutate(data);
  };

  return (
    <Form
      label="Add Admin Account"
      buttonLabel="Add"
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      loading={loading}
      setGlobalStates={setOpenAddData}
      reset={reset}
    />
  );
};

export default AddData;
