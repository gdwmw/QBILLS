import Mockup1 from "@/public/assets/images/landing-page/hero-section/mockup.webp";
import logoQBILLS1 from "@/public/assets/images/logos/brown/logo-2.webp";
import logoQBILLS2 from "@/public/assets/images/logos/white/logo-2.webp";
import Image from "next/image";
import { FC, ReactElement } from "react";

export const HeroSection: FC = (): ReactElement => {
  return (
    <section id="Home" className="relative -z-10 h-screen w-full overflow-hidden bg-gradient-to-r from-P3 to-P4">
      <Image src={logoQBILLS1} alt="QBILLS" width={700} quality={30} priority className="absolute -top-24 left-10 -z-10 -rotate-12 opacity-25" />
      <Image
        src={logoQBILLS2}
        alt="QBILLS"
        width={500}
        quality={30}
        priority
        className="absolute -bottom-40 right-0 -z-10 rotate-[168deg] opacity-15"
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
            <Image src={Mockup1} alt="Mockup" quality={50} priority className="w-full max-w-[500px] lg:max-w-[700px]" />
          </div>
        </div>
      </div>
    </section>
  );
};
