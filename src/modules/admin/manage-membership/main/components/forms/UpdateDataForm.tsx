import { FC, ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Output } from "valibot";

import { useGlobalStates } from "@/states";
import { IMembership, PUTMembership } from "@/utils";

import { Form } from "./Form";
import { Schema } from "./Schema";

type TUseForm = Output<typeof Schema>;

type T = {
  data: IMembership | undefined;
};

const UpdateDataForm: FC<T> = ({ data }): ReactElement => {
  const queryClient = useQueryClient();
  const { setOpenUpdateDataForm } = useGlobalStates();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<TUseForm>({
    defaultValues: { ...data },
    resolver: valibotResolver(Schema),
  });

  const handleUpdate = useMutation({
    mutationFn: PUTMembership,
    onError: () => setLoading(false),
    onMutate: () => setLoading(true),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["GETMembership"] });
      setOpenUpdateDataForm(false);
      setLoading(false);
      reset();
    },
  });

  const onSubmit: SubmitHandler<TUseForm> = async (data) => {
    handleUpdate.mutate(data);
  };

  return (
    <Form
      buttonLabel="Update"
      errors={errors}
      handleSubmit={handleSubmit}
      label="Update Membership"
      loading={loading}
      onSubmit={onSubmit}
      register={register}
      reset={reset}
      setGlobalStates={setOpenUpdateDataForm}
    />
  );
};

export default UpdateDataForm;
