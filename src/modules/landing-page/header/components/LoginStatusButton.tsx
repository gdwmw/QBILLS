import { FC, ReactElement } from "react";

import Link from "next/link";

import { ButtonCVA } from "@/components";
import { cn } from "@/libs";

type T = {
  authenticated: string | undefined;
};

export const LoginStatusButton: FC<T> = ({ authenticated }): ReactElement => {
  return (
    <>
      {authenticated ? (
        <div className="w-36">
          <Link
            className={cn(
              ButtonCVA({
                className: "w-full border-2 py-[7px] font-bold hover:text-P4 active:text-P4",
                outline: "white",
              }),
            )}
            href={"/dashboard"}
          >
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
