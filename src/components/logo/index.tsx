import { FC, ReactElement } from "react";

import Image from "next/image";

import logoQBILLS1 from "@/public/assets/images/logos/white/logo-2.webp";
import logoQBILLS2 from "@/public/assets/images/logos/white/logo-4.webp";
import logoQBILLS3 from "@/public/assets/images/logos/white/logo-5.webp";

type T = {
  size?: number;
};

export const Logo: FC<T> = ({ size = 1 }): ReactElement => {
  return (
    <section className="flex h-fit w-fit items-center justify-center gap-2">
      <Image alt="QBILLS" priority quality={30} src={logoQBILLS1} width={40 * size} />
      <div>
        <Image alt="QBILLS" className="mx-auto mb-1" priority quality={30} src={logoQBILLS2} width={110 * size} />
        <Image alt="QBILLS" priority quality={30} src={logoQBILLS3} width={130 * size} />
      </div>
    </section>
  );
};
