import { FC, ReactElement } from "react";

import Image from "next/image";
import Link from "next/link";

import AppStore from "@/public/assets/images/landing-page/get-app/appstore.webp";
import GooglePlay from "@/public/assets/images/landing-page/get-app/googleplay.webp";
import Mockup7 from "@/public/assets/images/landing-page/get-app/mockup.webp";

export const GetApp: FC = (): ReactElement => {
  return (
    <section className="bg-P1 py-36" id="Get-App">
      <div className="container mx-auto px-10">
        <div className="grid grid-rows-1 gap-20 lg:grid-cols-2 lg:grid-rows-none lg:gap-5">
          <section className="flex w-full max-w-[800px] flex-col justify-center gap-2">
            <h1 className="text-6xl font-semibold text-P4">QBILLS is available for iOS and Android</h1>

            <p className="w-full max-w-[700px] text-justify">
              Elevate your business strategy with our powerful Sales Report feature! Dive deep into your sales performance, understand trends, and
              make data-driven decisions effortlessly, all within your point-of-sale application. Monitor revenue streams and track profitability
              effortlessly. Understand where your sales are coming from and identify areas for growth.
            </p>

            <div className="-ml-0.5 mt-5 flex gap-3">
              <Link href={"/"}>
                <Image alt="App Store" className="active:scale-95" loading="lazy" quality={30} src={AppStore} width={180} />
              </Link>
              <Link href={"/"}>
                <Image alt="Google Play" className="active:scale-95" loading="lazy" quality={30} src={GooglePlay} width={180} />
              </Link>
            </div>
          </section>

          <section className="flex items-center justify-center">
            <Image alt="Mockup" className="w-full max-w-[500px] lg:max-w-[700px]" loading="lazy" quality={50} src={Mockup7} />
          </section>
        </div>
      </div>
    </section>
  );
};
