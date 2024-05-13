import AppStore from "@/public/assets/images/landing-page/get-app/appstore.webp";
import GooglePlay from "@/public/assets/images/landing-page/get-app/googleplay.webp";
import Mockup7 from "@/public/assets/images/landing-page/get-app/mockup.webp";
import Image from "next/image";
import Link from "next/link";
import { FC, ReactElement } from "react";

export const GetApp: FC = (): ReactElement => {
  return (
    <section id="Get-App" className="bg-P1 py-36">
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
                <Image src={AppStore} alt="App Store" width={180} quality={30} loading="lazy" className="active:scale-95" />
              </Link>
              <Link href={"/"}>
                <Image src={GooglePlay} alt="Google Play" width={180} quality={30} loading="lazy" className="active:scale-95" />
              </Link>
            </div>
          </section>

          <section className="flex items-center justify-center">
            <Image src={Mockup7} alt="Mockup" quality={50} loading="lazy" className="w-full max-w-[500px] lg:max-w-[700px]" />
          </section>
        </div>
      </div>
    </section>
  );
};
