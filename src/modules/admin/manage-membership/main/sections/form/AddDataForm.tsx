import { FC, ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useGlobalStates } from "@/hooks";
import { POSTMembership } from "@/utils";

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
      "phone-number": "+",
      point: 0,
    },
    resolver: zodResolver(Schema),
  });

  const handleAdd = useMutation({
    mutationFn: POSTMembership,
    onError: () => setLoading(false),
    onMutate: () => setLoading(true),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["GETMembership"] });
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
      title="Add Membership"
    />
  );
};

export default AddDataForm;
