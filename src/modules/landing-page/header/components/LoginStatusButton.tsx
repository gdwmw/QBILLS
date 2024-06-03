import { FC, ReactElement, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { ButtonCVA } from "@/components";
import { cn } from "@/libs";
import loadingAnimation from "@/public/assets/animations/loadings/gray-n4.svg";

type T = {
  authStatus: boolean | null;
};

export const LoginStatusButton: FC<T> = ({ authStatus }): ReactElement => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      {authStatus ? (
        <div className="w-36">
          <Link
            className={cn(
              ButtonCVA({
                className: `w-full border-2 py-[7px] font-bold hover:text-P4 active:text-P4 ${loading ? "cursor-wait border-N2 bg-N2 text-N4 hover:text-N4 active:text-N4" : ""}`,
                outline: loading ? "disabled" : "white",
              }),
            )}
            href={"/dashboard"}
            onClick={(e) => {
              setLoading(true);
              loading && e.preventDefault();
            }}
          >
            {loading && <Image alt="Loading..." quality={30} src={loadingAnimation} width={20} />}
            Dashboard
          </Link>
        </div>
      ) : (
        <div className="w-20">
          <Link
            className={cn(
              ButtonCVA({
                className: "w-full border-2 py-[7px] font-bold hover:text-P4 active:text-P4",
                outline: "white",
              }),
            )}
            href={"/login"}
          >
            Login
          </Link>
        </div>
      )}
    </>
  );
};
