import { FC, FormEventHandler, ReactElement } from "react";

import Image from "next/image";

import { Button, Input, Modal, Select, TextArea } from "@/components";
import loadingAnimation from "@/public/assets/animations/loadings/gray-n4.svg";

type T = {
  buttonLabel: string;
  errors: any;
  handleSubmit: (e: any) => FormEventHandler<HTMLFormElement>;
  imageURL: string;
  loading: boolean;
  onSubmit: (e: any) => void;
  register: any;
  reset: () => void;
  setGlobalStates: (e: boolean) => void;
  title: string;
  watch: any;
};

export const Form: FC<T> = ({
  buttonLabel,
  errors,
  handleSubmit,
  imageURL,
  loading,
  onSubmit,
  register,
  reset,
  setGlobalStates,
  title,
  watch,
}): ReactElement => {
  return (
    <Modal maxWidth={800} onSubmit={handleSubmit(onSubmit)} title={title}>
      <div className="grid w-full grid-cols-2 gap-5">
        <div className="space-y-3">
          <Input label="Code" type="text" {...register("code")} errorMessage={errors.code?.message} variant={errors.code ? "error" : "default"} />

          <Input label="Name" type="text" {...register("name")} errorMessage={errors.name?.message} variant={errors.name ? "error" : "default"} />

          <TextArea
            label="Description"
            {...register("description")}
            className="max-h-[150px] min-h-[48px] w-full"
            errorMessage={errors.description?.message}
            variant={errors.description ? "error" : "default"}
          />

          <Select label="Category" {...register("category")} errorMessage={errors.category?.message} variant={errors.category ? "error" : "default"}>
            <option value="coffee">Coffee</option>
            <option value="non-coffee">Non-Coffee</option>
            <option value="snack">Snack</option>
            <option value="meal">Meal</option>
          </Select>

          <Select label="Size" {...register("size")} errorMessage={errors.size?.message} variant={errors.size ? "error" : "default"}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </Select>

          <Input
            label="Price"
            type="number"
            {...register("price", { valueAsNumber: true })}
            errorMessage={errors.price?.message}
            variant={errors.price ? "error" : "default"}
          />

          <Select label="Stock" {...register("stock")} errorMessage={errors.stock?.message} variant={errors.stock ? "error" : "default"}>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </Select>
        </div>

        <div className="space-y-3">
          <Input
            accept="image/*"
            label="Image"
            type="file"
            {...register("image")}
            // errorMessage={errors.image?.message} // TODO Tinggal ini
            variant={errors.image ? "error" : "default"}
          />

          <fieldset className="group size-full max-h-[390px] overflow-hidden rounded-md border-2 border-N2 px-1 pb-2 focus-within:border-P4">
            <legend className="ml-3 select-none whitespace-nowrap px-1 text-xs font-semibold text-N3 group-focus-within:text-P5">Preview</legend>
            <div className="flex size-full max-w-[337px] items-center justify-center">
              {imageURL || watch("image") ? (
                <Image alt="Product Image" className="size-fit max-h-[352px]" height={0} quality={30} src={imageURL || watch("image")} width={0} />
              ) : null}
            </div>
          </fieldset>
        </div>
      </div>

      <div className="mt-3 flex w-full gap-3 font-semibold">
        <Button
          className="w-full"
          disabled={loading}
          onClick={() => {
            setGlobalStates(false);
            reset();
          }}
          outline={loading ? "disabled" : "default"}
          type="button"
        >
          Cancel
        </Button>

        <Button className={`w-full ${loading ? "cursor-wait" : ""}`} disabled={loading} solid={loading ? "disabled" : "default"} type="submit">
          {loading && <Image alt="Loading..." quality={30} src={loadingAnimation} width={20} />}
          {buttonLabel}
        </Button>
      </div>
    </Modal>
  );
};
