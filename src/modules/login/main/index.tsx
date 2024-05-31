"use client";

import { FC, ReactElement, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { minLength, object, Output, string } from "valibot";

import { Button, Input } from "@/components";
import loadingAnimation from "@/public/assets/animations/loadings/gray-n4.svg";
import logoQBILLS from "@/public/assets/images/logos/brown/logo-1.webp";

const Schema = object({
  password: string([minLength(1, "Please enter your Password.")]),
  username: string([minLength(1, "Please enter your Username.")]),
});

type TSchema = Output<typeof Schema>;

export const Main: FC = (): ReactElement => {
  const session = useSession();
  const router = useRouter();
  const [visibility, setVisibility] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<TSchema>({ resolver: valibotResolver(Schema) });

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

  useEffect(() => {
    if (session.status === "authenticated") {
      setLoading(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    }
  }, [session.status]);

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-P1 px-10">
      <form
        className="flex h-full max-h-[600px] w-full max-w-[500px] flex-col items-center justify-center gap-5 rounded-xl bg-N1 px-5 shadow-md"
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
    </main>
  );
};
