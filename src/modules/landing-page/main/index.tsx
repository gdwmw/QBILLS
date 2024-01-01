import Ellipse from "@/public/assets/images/landing-page/hero-section/ellipse.svg";
import Mockup from "@/public/assets/images/landing-page/hero-section/mockup.png";
import logoQbills from "@/public/assets/images/logos/brown/logo-2.png";
import Image from "next/image";
import { FC, ReactElement } from "react";

type T = {};

export const Main: FC<T> = (): ReactElement => {
  return (
    <main>
      <section className="relative -z-10 h-screen w-full overflow-hidden bg-gradient-to-r from-P3 to-P4">
        <Image src={logoQbills} alt="Qbills" width={500} priority className="absolute left-0 top-0 -z-10 -rotate-12 opacity-20" />
        <Image src={Ellipse} alt="Ellipse" priority className="absolute right-0 top-0 -z-10" />

        <div className="h-full w-full px-24">
          <div className="grid h-full w-full grid-cols-2 gap-10">
            <div className="flex flex-col justify-center gap-5 text-white">
              <h1 className="text-2xl font-bold">Point Of Sales</h1>

              <h2 className="text-6xl font-semibold">
                Boost Your Sales with
                <br />
                Our Point of Sales App
              </h2>

              <p>
                Manage your transaction, track product, and analyze report sales.
                <br />
                <strong>Build It On Desktop</strong>, <strong>Launch It On Mobile</strong>. You can gets it on <strong>Play Store</strong> and{" "}
                <strong>App Store</strong>.
              </p>
            </div>

            <div className="flex items-center justify-end">
              <Image src={Mockup} alt="Mockup" width={700} quality={50} priority />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
