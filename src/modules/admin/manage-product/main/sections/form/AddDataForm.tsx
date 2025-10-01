import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC, ReactElement, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useGlobalStates } from "@/hooks";
import { POSTProduct } from "@/utils";

import { Form } from "./Form";
import { Schema, TSchema } from "./Schema";

const AddDataForm: FC = (): ReactElement => {
  const queryClient = useQueryClient();
  const { setOpenAddDataForm } = useGlobalStates();
  const [loading, setLoading] = useState<boolean>(false);
  const [convertedImage, setConvertedImage] = useState<string>("");

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<TSchema>({
    defaultValues: {
      category: "",
      code: "",
      description: "",
      id: "",
      image: "",
      name: "",
      price: 0,
      size: "",
      stock: "",
    },
    resolver: zodResolver(Schema),
  });

  const handleAdd = useMutation({
    mutationFn: POSTProduct,
    onError: () => setLoading(false),
    onMutate: () => setLoading(true),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["GETProduct"] });
      setOpenAddDataForm(false);
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
    handleConvertImage();
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

    handleAdd.mutate(newData);
  };

  const imageFile = watch("image")[0];
  let imageURL = "";

  if (imageFile instanceof File) {
    imageURL = URL.createObjectURL(imageFile);
  }

  return (
    <Form
      buttonLabel="Add"
      errors={errors}
      handleSubmit={handleSubmit}
      imageURL={imageURL}
      loading={loading}
      onSubmit={onSubmit}
      register={register}
      reset={reset}
      setGlobalStates={setOpenAddDataForm}
      title="Add Product"
      watch={watch}
    />
  );
};

export default AddDataForm;
