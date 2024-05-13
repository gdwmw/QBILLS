import { Button, Input } from "@/components";
import loadingAnimation from "@/public/assets/animations/loadings/gray-n4.svg";
import Image from "next/image";
import { FC, FormEventHandler, ReactElement, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type T = {
  label: string;
  buttonLabel: string;
  handleSubmit: (e: any) => FormEventHandler<HTMLFormElement>;
  onSubmit: (e: any) => void;
  register: any;
  errors: any;
  loading: boolean;
  setGlobalStates: (e: boolean) => void;
  reset: () => void;
};

export const Form: FC<T> = ({ label, buttonLabel, handleSubmit, onSubmit, register, errors, loading, setGlobalStates, reset }): ReactElement => {
  const [visibility, setVisibility] = useState<boolean>(false);

  return (
    <section className="fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-N7/30 px-5 backdrop-blur-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="h-fit w-full max-w-[500px] rounded-xl bg-N1 p-5 shadow-md">
        <div className="flex h-full w-full flex-col items-center gap-3 rounded-lg border p-5">
          <h1 className="text-center text-2xl font-bold">{label}</h1>
          <div className="w-full space-y-3">
            <Input
              type="text"
              label="Name"
              {...register("name")}
              id="name"
              errorMessage={errors.name?.message}
              variant={errors.name ? "error" : "default"}
            />

            <Input
              type="text"
              label="Username"
              {...register("username")}
              id="username"
              errorMessage={errors.username?.message}
              variant={errors.username ? "error" : "default"}
            />

            <Input
              type={visibility ? "text" : "password"}
              label="Password"
              {...register("password")}
              id="password"
              icon={visibility ? <FaEye /> : <FaEyeSlash />}
              iconOnClick={() => setVisibility(!visibility)}
              errorMessage={errors.password?.message}
              variant={errors.password ? "error" : "default"}
            />

            <Input type="text" label="Role" {...register("role")} id="role" variant={"disabled"} disabled />
          </div>

          <div className="mt-3 flex w-full gap-3 font-semibold">
            <Button
              type="button"
              outline={"default"}
              size={"sm"}
              widthFull
              onClick={() => {
                setGlobalStates(false);
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
              {buttonLabel}
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
};
