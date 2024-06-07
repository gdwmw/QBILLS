import { FC, ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useGlobalStates } from "@/hooks";
import { POSTAdminAccount } from "@/utils";

import { Form } from "./Form";
import { Schema, TSchema } from "./Schema";

const AddDataForm: FC = (): ReactElement => {
  const queryClient = useQueryClient();
  const { setOpenAddDataForm } = useGlobalStates();
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
    resolver: zodResolver(Schema),
  });

  const handleAdd = useMutation({
    mutationFn: POSTAdminAccount,
    onError: () => setLoading(false),
    onMutate: () => setLoading(true),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["GETAdminAccount"] });
      setOpenAddDataForm(false);
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
      loading={loading}
      onSubmit={onSubmit}
      register={register}
      reset={reset}
      setGlobalStates={setOpenAddDataForm}
      title="Add Admin Account"
    />
  );
};

export default AddDataForm;
