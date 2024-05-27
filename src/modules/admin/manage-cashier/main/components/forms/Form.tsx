import { FC, FormEventHandler, ReactElement, useState } from "react";

import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Button, Input, Modal } from "@/components";
import loadingAnimation from "@/public/assets/animations/loadings/gray-n4.svg";

type T = {
  buttonLabel: string;
  errors: any;
  handleSubmit: (e: any) => FormEventHandler<HTMLFormElement>;
  loading: boolean;
  onSubmit: (e: any) => void;
  register: any;
  reset: () => void;
  setGlobalStates: (e: boolean) => void;
  title: string;
};

export const Form: FC<T> = ({ buttonLabel, errors, handleSubmit, loading, onSubmit, register, reset, setGlobalStates, title }): ReactElement => {
  const [visibility, setVisibility] = useState<boolean>(false);

  return (
    <Modal maxWidth={500} onSubmit={handleSubmit(onSubmit)} title={title}>
      <div className="w-full space-y-3">
        <Input label="Name" type="text" {...register("name")} errorMessage={errors.name?.message} variant={errors.name ? "error" : "default"} />

        <Input
          label="Username"
          type="text"
          {...register("username")}
          errorMessage={errors.username?.message}
          variant={errors.username ? "error" : "default"}
        />

        <Input
          label="Password"
          type={visibility ? "text" : "password"}
          {...register("password")}
          errorMessage={errors.password?.message}
          icon={visibility ? <FaEye /> : <FaEyeSlash />}
          iconOnClick={() => setVisibility(!visibility)}
          variant={errors.password ? "error" : "default"}
        />

        <Input label="Role" type="text" {...register("role")} disabled variant={"disabled"} />
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
