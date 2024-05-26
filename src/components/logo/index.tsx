import { FC, ReactElement } from "react";

import Image from "next/image";

import logoQBILLS4 from "@/public/assets/images/logos/brown/logo-2.webp";
import logoQBILLS5 from "@/public/assets/images/logos/brown/logo-4.webp";
import logoQBILLS6 from "@/public/assets/images/logos/brown/logo-5.webp";
import logoQBILLS1 from "@/public/assets/images/logos/white/logo-2.webp";
import logoQBILLS2 from "@/public/assets/images/logos/white/logo-4.webp";
import logoQBILLS3 from "@/public/assets/images/logos/white/logo-5.webp";

type T = {
  size?: number;
  varian?: "brown" | "white";
};

export const Logo: FC<T> = ({ size = 1, varian = "white" }): ReactElement => {
  return (
    <section className="flex h-fit w-fit items-center justify-center gap-2">
      {varian === "white" ? (
        <Image alt="QBILLS" priority quality={30} src={logoQBILLS1} width={40 * size} />
      ) : (
        <Image alt="QBILLS" priority quality={30} src={logoQBILLS4} width={40 * size} />
      )}
      <div>
        {varian === "white" ? (
          <Image alt="QBILLS" className="mx-auto mb-1" priority quality={30} src={logoQBILLS2} width={110 * size} />
        ) : (
          <Image alt="QBILLS" className="mx-auto mb-1" priority quality={30} src={logoQBILLS5} width={110 * size} />
        )}

        {varian === "white" ? (
          <Image alt="QBILLS" priority quality={30} src={logoQBILLS3} width={130 * size} />
        ) : (
          <Image alt="QBILLS" priority quality={30} src={logoQBILLS6} width={130 * size} />
        )}
      </div>
    </section>
  );
};
