import { FC, ReactElement, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useGlobalStates } from "@/hooks";
import { IProduct, PUTProduct } from "@/utils";

import { Form } from "./Form";
import { Schema, TSchema } from "./Schema";

type T = {
  data: IProduct | undefined;
};

const UpdateDataForm: FC<T> = ({ data }): ReactElement => {
  const queryClient = useQueryClient();
  const { setOpenUpdateDataForm } = useGlobalStates();
  const [loading, setLoading] = useState<boolean>(false);
  const [convertedImage, setConvertedImage] = useState<string>("");

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<TSchema>({
    defaultValues: { ...data },
    resolver: valibotResolver(Schema),
  });

  const handleUpdate = useMutation({
    mutationFn: PUTProduct,
    onError: () => setLoading(false),
    onMutate: () => setLoading(true),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["GETProduct"] });
      setOpenUpdateDataForm(false);
      setLoading(false);
      reset();
    },
  });

  const handleConvertImage = () => {
    const file = watch("image")[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setConvertedImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (typeof watch("image") !== "string") {
      handleConvertImage();
    }
  }, [watch("image")]);

  const onSubmit: SubmitHandler<TSchema> = async (data) => {
    const newData = {
      category: data.category,
      code: data.code,
      description: data.description,
      id: data.id,
      image: convertedImage,
      name: data.name,
      price: data.price,
      size: data.size,
      stock: data.stock,
    };

    handleUpdate.mutate(newData);
  };

  const imageFile = watch("image")[0];
  let imageURL = "";

  if (imageFile instanceof File) {
    imageURL = URL.createObjectURL(imageFile);
  }

  return (
    <Form
      buttonLabel="Update"
      errors={errors}
      handleSubmit={handleSubmit}
      imageURL={imageURL}
      loading={loading}
      onSubmit={onSubmit}
      register={register}
      reset={reset}
      setGlobalStates={setOpenUpdateDataForm}
      title="Update Product"
      watch={watch}
    />
  );
};

export default UpdateDataForm;
