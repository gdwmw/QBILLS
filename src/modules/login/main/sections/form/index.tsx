import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { FC, ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Button, Input } from "@/components";
import loadingAnimation from "@/public/assets/animations/loadings/gray-n4.svg";
import logoQBILLS from "@/public/assets/images/logos/brown/logo-1.webp";

import { Schema, TSchema } from "./Schema";

type T = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const Form: FC<T> = ({ loading, setLoading }): ReactElement => {
  const [visibility, setVisibility] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<TSchema>({ resolver: zodResolver(Schema) });

  const onSubmit: SubmitHandler<TSchema> = async (data) => {
    setLoading(true);
    try {
      const res = await signIn(`credentials`, {
        password: data.password,
        redirect: false,
        username: data.username,
      });
      if (res?.error) {
        setError(true);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="flex size-full max-h-[600px] max-w-[500px] flex-col items-center justify-center gap-5 rounded-xl bg-N1 px-5 shadow-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Image alt="QBILLS" priority quality={30} src={logoQBILLS} width={150} />

      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-bold">Welcome Admin</h1>
        <p className="w-full max-w-[400px] text-sm">Log in to access your personalized dashboard and take control of your online experience.</p>
      </div>

      <div className="w-full max-w-[400px] space-y-3">
        <Input
          label="Username"
          type="text"
          {...register("username")}
          errorMessage={errors.username?.message}
          variant={error || errors.username ? "error" : "default"}
        />

        <Input
          label="Password"
          type={visibility ? "text" : "password"}
          {...register("password")}
          errorMessage={errors.password?.message}
          icon={visibility ? <FaEye /> : <FaEyeSlash />}
          iconOnClick={() => setVisibility(!visibility)}
          variant={error || errors.password ? "error" : "default"}
        />
      </div>

      {error && <span className="select-none text-sm font-semibold text-E4">Invalid Username and Password</span>}

      <div className="w-full max-w-[400px]">
        <Button
          className={`w-full font-semibold ${loading ? "cursor-wait" : ""}`}
          disabled={loading}
          solid={loading ? "disabled" : "default"}
          type="submit"
        >
          {loading && <Image alt="Loading..." quality={30} src={loadingAnimation} width={20} />}
          LOGIN
        </Button>
      </div>

      <span className="mt-1 text-xs text-N3">&copy; 2023 QBILLS. All rights reserved.</span>
    </form>
  );
};
