import { FC, ReactElement } from "react";

import Image from "next/image";

import Mockup1 from "@/public/assets/images/landing-page/hero-section/mockup.webp";
import logoQBILLS1 from "@/public/assets/images/logos/brown/logo-2.webp";
import logoQBILLS2 from "@/public/assets/images/logos/white/logo-2.webp";

export const HeroSection: FC = (): ReactElement => {
  return (
    <section className="relative -z-10 h-screen w-full overflow-hidden bg-gradient-to-r from-P3 to-P4" id="Home">
      <Image alt="QBILLS" className="absolute -top-24 left-10 -z-10 -rotate-12 opacity-25" priority quality={30} src={logoQBILLS1} width={700} />

      <Image
        alt="QBILLS"
        className="absolute -bottom-40 right-0 -z-10 rotate-[168deg] opacity-15"
        priority
        quality={30}
        src={logoQBILLS2}
        width={500}
      />

      <div className="container mx-auto h-full w-full px-10">
        <div className="flex h-full w-full grid-cols-2 flex-col items-center justify-center gap-20 lg:grid">
          <div className="flex flex-col justify-center gap-5 text-N1">
            <h1 className="text-lg font-bold md:text-xl lg:text-2xl">Point Of Sales</h1>

            <h2 className="text-4xl font-semibold md:text-5xl lg:text-6xl">Boost Your Sales with Our Point of Sales App</h2>

            <p>
              Manage your transaction, track product, and analyze report sales.
              <strong> Build It On Desktop</strong>, <strong>Launch It On Mobile</strong>. You can gets it on <strong>Play Store</strong> and
              <strong> App Store</strong>.
            </p>
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <Image alt="Mockup" className="w-full max-w-[500px] lg:max-w-[700px]" priority quality={50} src={Mockup1} />
          </div>
        </div>
      </div>
    </section>
  );
};
