import { FC, FormEventHandler, ReactElement, useState } from "react";

import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Button, Input } from "@/components";
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
  const [visibility, setVisibility] = useState<boolean>(false);

  return (
    <section className="fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-N7/30 px-5 backdrop-blur-sm">
      <form className="h-fit w-full max-w-[500px] rounded-xl bg-N1 p-5 shadow-md" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex h-full w-full flex-col items-center gap-3 rounded-lg border p-5">
          <h1 className="text-center text-2xl font-bold">{label}</h1>
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
        </div>
      </form>
    </section>
  );
};
