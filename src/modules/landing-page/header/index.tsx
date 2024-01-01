import { ButtonCVA } from "@/components";
import logoQbills1 from "@/public/assets/images/logos/white/logo-2.png";
import logoQbills2 from "@/public/assets/images/logos/white/logo-4.png";
import logoQbills3 from "@/public/assets/images/logos/white/logo-5.png";
import Image from "next/image";
import Link from "next/link";
import { FC, ReactElement } from "react";

type T = {};

export const Header: FC<T> = (): ReactElement => {
  return (
    <header>
      <nav className="px-10 py-5">
        <div className="flex items-center justify-between">
          <div className="flex h-fit w-fit items-center justify-center gap-2 bg-black">
            <Image src={logoQbills1} alt="Qbills" width={40} quality={30} priority className="h-auto" />
            <div>
              <Image src={logoQbills2} alt="Qbills" width={110} quality={30} priority className="mx-auto mb-1 h-auto" />
              <Image src={logoQbills3} alt="Qbills" width={130} quality={30} priority className="h-auto" />
            </div>
          </div>

          <div className="flex gap-20">
            <Link href="#Home" className={ButtonCVA({ ghost: "default", className: "font-semibold" })}>
              Home
            </Link>
            <Link href="#About-Us" className={ButtonCVA({ ghost: "default", className: "font-semibold" })}>
              About Us
            </Link>
            <Link href="#Features" className={ButtonCVA({ ghost: "default", className: "font-semibold" })}>
              Features
            </Link>
            <Link href="#FAQ" className={ButtonCVA({ ghost: "default", className: "font-semibold" })}>
              FAQ
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};
