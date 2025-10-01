"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, ReactElement, useEffect, useState } from "react";

import { Form } from "./sections";

export const Main: FC = (): ReactElement => {
  const session = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

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
      <Form loading={loading} setLoading={setLoading} />
    </main>
  );
};
