import { Button, Input, Select, TextArea } from "@/components";
import loadingAnimation from "@/public/assets/animations/loadings/gray-n4.svg";
import { IProduct, POSTProduct } from "@/utils";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { FC, ReactElement, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Output, any, minLength, minValue, number, object, string } from "valibot";
import { useManageProduct } from "..";

// VALIBOT
const Schema = object({
  id: string(),
  code: string([minLength(5, "Please enter code minimum 5 character.")]),
  name: string([minLength(3, "Please enter name minimum 3 character.")]),
  description: string([minLength(8, "Please enter description minimum 8 character.")]),
  category: string([minLength(1, "Please choose one of the options.")]),
  size: string([minLength(1, "Please choose one of the options.")]),
  price: number([minValue(3, "Please enter price minimum 3 number.")]),
  stock: string([minLength(1, "Please choose one of the options.")]),
  image: any(), // TODO Tinggal ini
});

type TUseForm = Output<typeof Schema>;
// END VALIBOT

const AddData: FC = (): ReactElement => {
  const queryClient = useQueryClient(); // REACT QUERY
  const { setOpenAddData } = useManageProduct(); // ZUSTAND
  const [loading, setLoading] = useState<boolean>(false);
  const [convertedImage, setConvertedImage] = useState<string>("");

  // REACT HOOK FORM WITH VALIBOT
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<TUseForm>({
    defaultValues: {
      id: "",
      code: "",
      name: "",
      description: "",
      category: "",
      size: "",
      price: 0,
      stock: "",
      image: "",
    },
    resolver: valibotResolver(Schema),
  });
  // END REACT HOOK FORM WITH VALIBOT

  // IMAGE PREVIEW
  const imageFile = watch("image")[0];
  let imageURL = "";

  if (imageFile instanceof File) {
    imageURL = URL.createObjectURL(imageFile);
  }
  // END IMAGE PREVIEW

  // CONVERT IMAGE TO BASE64
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
  // END CONVERT IMAGE TO BASE64

  const handleAdd = useMutation({
    mutationFn: (data: IProduct) => POSTProduct(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["GETProduct"] });
      setOpenAddData(false);
      reset();
    },
  });

  // REACT HOOK FORM WITH REACT QUERY
  const onSubmit: SubmitHandler<TUseForm> = async (data) => {
    const newData = {
      id: data.id,
      code: data.code,
      name: data.name,
      description: data.description,
      category: data.category,
      size: data.size,
      price: data.price,
      stock: data.stock,
      image: convertedImage,
    };
    setLoading(true);
    handleAdd.mutate(newData, {
      onSuccess: () => setLoading(false),
    });
  };
  // END REACT HOOK FORM WITH REACT QUERY

  return (
    <section className="fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-N7/30 px-5 backdrop-blur-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="h-fit w-full max-w-[800px] rounded-xl bg-N1 p-5 shadow-md">
        <div className="flex h-full w-full flex-col items-center gap-3 rounded-lg border p-5">
          <h1 className="text-center text-2xl font-bold">Add Product</h1>
          <div className="grid w-full grid-cols-2 gap-5">
            <div className="space-y-3">
              <Input
                type="text"
                label="Code"
                {...register("code")}
                id="code"
                errorMessage={errors.code?.message}
                variant={errors.code ? "error" : "default"}
              />

              <Input
                type="text"
                label="Name"
                {...register("name")}
                id="name"
                errorMessage={errors.name?.message}
                variant={errors.name ? "error" : "default"}
              />

              <TextArea
                label="Description"
                {...register("description")}
                id="description"
                errorMessage={errors.description?.message}
                variant={errors.description ? "error" : "default"}
                className="max-h-[150px] min-h-[48px] w-full"
              />

              <Select
                label="Category"
                {...register("category")}
                id="category"
                errorMessage={errors.category?.message}
                variant={errors.category ? "error" : "default"}
              >
                <option value="coffee">Coffee</option>
                <option value="non-coffee">Non-Coffee</option>
                <option value="snack">Snack</option>
                <option value="meal">Meal</option>
              </Select>

              <Select label="Size" {...register("size")} id="size" errorMessage={errors.size?.message} variant={errors.size ? "error" : "default"}>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </Select>

              <Input
                type="number"
                label="Price"
                {...register("price", { valueAsNumber: true })}
                id="price"
                errorMessage={errors.price?.message}
                variant={errors.price ? "error" : "default"}
              />

              <Select
                label="Stock"
                {...register("stock")}
                id="stock"
                errorMessage={errors.stock?.message}
                variant={errors.stock ? "error" : "default"}
              >
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </Select>
            </div>

            <div className="space-y-3">
              <Input
                type="file"
                accept="image/*"
                label="Image"
                {...register("image")}
                id="image"
                // errorMessage={errors.image?.message} // TODO Tinggal ini
                variant={errors.image ? "error" : "default"}
              />

              <fieldset className="group h-full max-h-[384px] w-full overflow-hidden rounded-md border-2 border-N2 px-1 pb-2 focus-within:border-P4">
                <legend className="ml-3 select-none whitespace-nowrap px-1 text-xs font-semibold text-N3 group-focus-within:text-P5">Preview</legend>
                <div className="flex h-full w-full max-w-[337px] items-center justify-center">
                  {imageURL && <Image src={imageURL} alt="Loading..." width={0} height={0} quality={30} className="h-fit max-h-[352px] w-fit" />}
                </div>
              </fieldset>
            </div>
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
