import logoQBILLS1 from "@/public/assets/images/logos/white/logo-2.webp";
import logoQBILLS2 from "@/public/assets/images/logos/white/logo-4.webp";
import logoQBILLS3 from "@/public/assets/images/logos/white/logo-5.webp";
import Image from "next/image";
import { FC, ReactElement } from "react";

export const Logo: FC = (): ReactElement => {
  return (
    <section className="flex h-fit w-fit items-center justify-center gap-2">
      <Image src={logoQBILLS1} alt="QBILLS" width={40} quality={30} priority />
      <div>
        <Image src={logoQBILLS2} alt="QBILLS" width={110} quality={30} priority className="mx-auto mb-1" />
        <Image src={logoQBILLS3} alt="QBILLS" width={130} quality={30} priority />
      </div>
    </section>
  );
};
