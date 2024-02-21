"use client";

import { Button, Input } from "@/components";
import loadingAnimation from "@/public/assets/animations/loadings/gray-n4.svg";
import logoQbills from "@/public/assets/images/logos/brown/logo-1.png";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, ReactElement, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Output, minLength, object, string } from "valibot";

const schema = object({
  username: string([minLength(1, "Please enter your username.")]),
  password: string([minLength(1, "Please enter your password.")]),
});

type TUseForm = Output<typeof schema>;

export const Main: FC = (): ReactElement => {
  const session = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUseForm>({ resolver: valibotResolver(schema) });
  const [visibility, setVisibility] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<TUseForm> = async (data) => {
    setLoading(true);
    try {
      const res = await signIn(`credentials`, {
        username: data.username,
        password: data.password,
        redirect: false,
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
      }, 1000);
    }
  }, [session, router]);

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-P1 px-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full max-h-[600px] w-full max-w-[500px] flex-col items-center justify-center gap-5 rounded-xl bg-N1 px-5 drop-shadow-md"
      >
        <Image src={logoQbills} alt="Qbills" width={150} quality={30} priority />

        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-bold">Welcome Admin</h1>
          <p className="w-full max-w-[400px] text-sm">Log in to access your personalized dashboard and take control of your online experience.</p>
        </div>

        <div className="w-full max-w-[400px] space-y-3">
          <Input
            type="text"
            label="Username"
            {...register("username")}
            id="username"
            errorMassage={errors.username?.message}
            variant={error || errors.username ? "error" : "default"}
          />

          <Input
            type={visibility ? "text" : "password"}
            label="Password"
            {...register("password")}
            id="password"
            icon={visibility ? <FaEye /> : <FaEyeSlash />}
            iconOnClick={() => setVisibility(!visibility)}
            errorMassage={errors.password?.message}
            variant={error || errors.password ? "error" : "default"}
          />
        </div>

        <span className={`select-none text-sm font-semibold text-E4 ${error ? "" : "hidden"}`}>Invalid Username And Password</span>

        <div className="w-full max-w-[400px]">
          <Button type="submit" solid={loading ? "disabled" : "default"} size={"sm"} widthFull className="font-semibold" disabled={loading}>
            <Image src={loadingAnimation} alt="Loading" width={20} className={loading ? "" : "hidden"} />
            LOGIN
          </Button>
        </div>

        <span className="mt-1 text-xs text-N3">&copy; 2023 QBills. All rights reserved.</span>
      </form>
    </main>
  );
};
