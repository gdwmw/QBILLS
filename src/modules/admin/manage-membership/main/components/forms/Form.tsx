import { FC, FormEventHandler, ReactElement } from "react";

import Image from "next/image";

import { Button, Input, Modal } from "@/components";
import loadingAnimation from "@/public/assets/animations/loadings/gray-n4.svg";

type T = {
  buttonLabel: string;
  errors: any;
  handleSubmit: (e: any) => FormEventHandler<HTMLFormElement>;
  label: string;
  loading: boolean;
  onSubmit: (e: any) => void;
  register: any;
  reset: () => void;
  setGlobalStates: (e: boolean) => void;
};

export const Form: FC<T> = ({ buttonLabel, errors, handleSubmit, label, loading, onSubmit, register, reset, setGlobalStates }): ReactElement => {
  return (
    <Modal label={label} maxWidth={500} onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full space-y-3">
        <Input label="Name" type="text" {...register("name")} errorMessage={errors.name?.message} variant={errors.name ? "error" : "default"} />

        <Input
          label="Phone Number"
          type="text"
          {...register("phone-number")}
          errorMessage={errors["phone-number"]?.message}
          variant={errors["phone-number"] ? "error" : "default"}
        />

        <Input
          label="Point"
          type="number"
          {...register("point", { valueAsNumber: true })}
          errorMessage={errors.point?.message}
          variant={errors.point ? "error" : "default"}
        />
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
