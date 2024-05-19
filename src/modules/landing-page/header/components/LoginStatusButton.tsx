import { ButtonCVA } from "@/components";
import { cn } from "@/libs";
import Link from "next/link";
import { FC, ReactElement } from "react";

type T = {
  authenticated: string | undefined;
};

export const LoginStatusButton: FC<T> = ({ authenticated }): ReactElement => {
  return (
    <>
      {authenticated ? (
        <div className="w-36">
          <Link
            href={"/dashboard"}
            className={cn(
              ButtonCVA({
                outline: "white",
                className: "w-full border-2 py-[7px] font-bold hover:text-P4 active:text-P4",
              }),
            )}
          >
            Dashboard
          </Link>
        </div>
      ) : (
        <div className="w-20">
          <Link
            href={"/login"}
            className={cn(
              ButtonCVA({
                outline: "white",
                className: "w-full border-2 py-[7px] font-bold hover:text-P4 active:text-P4",
              }),
            )}
          >
            Login
          </Link>
        </div>
      )}
    </>
  );
};
