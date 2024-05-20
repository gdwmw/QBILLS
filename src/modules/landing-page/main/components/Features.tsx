import { FC, ReactElement } from "react";

import Image from "next/image";

import Mockup2 from "@/public/assets/images/landing-page/our-feature/mockup-1.webp";
import Mockup3 from "@/public/assets/images/landing-page/our-feature/mockup-2.webp";
import Mockup4 from "@/public/assets/images/landing-page/our-feature/mockup-3.webp";
import Mockup5 from "@/public/assets/images/landing-page/our-feature/mockup-4.webp";
import Mockup6 from "@/public/assets/images/landing-page/our-feature/mockup-5.webp";

export const Features: FC = (): ReactElement => {
  return (
    <>
      <section className="bg-P1 py-36" id="Features">
        <div className="container mx-auto px-10">
          <h1 className="mb-36 text-center text-6xl font-semibold">Our Feature</h1>

          <div className="space-y-20">
            <section className="grid grid-cols-1 gap-20 sm:grid-cols-2">
              <div className="flex flex-col justify-center gap-1">
                <h2 className="text-4xl font-semibold text-P4">Organize Your Product</h2>
                <p className="text-sm">
                  Take full control of your products with intuitive organization tools. Categorize, label, price, description and sort your inventory
                  with ease, ensuring every item is precisely where it needs to be.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <Image alt="Mockup" className="w-full max-w-[300px] md:max-w-[500px]" loading="lazy" quality={50} src={Mockup2} />
              </div>
            </section>

            <section className="grid grid-cols-1 gap-20 sm:grid-cols-2">
              <div className="hidden items-center justify-center sm:flex">
                <Image alt="Mockup" loading="lazy" quality={50} src={Mockup3} width={500} />
              </div>
              <div className="flex flex-col justify-center gap-1">
                <h2 className="text-4xl font-semibold text-P4">Manage Your Own Account Cashier</h2>
                <p className="text-sm">
                  Create personalized accounts for each cashier. Monitor performance, track sales, and manage permissions seamlessly for a tailored
                  experience. Meet the game-changer in your point-of-sale experience: our advanced Account Cashier Management feature! Take control of
                  transactions, accountability, and cashier performance effortlessly.
                </p>
              </div>
              <div className="flex items-center justify-center sm:hidden">
                <Image alt="Mockup" className="w-full max-w-[300px]" loading="lazy" quality={50} src={Mockup3} />
              </div>
            </section>

            <section className="grid grid-cols-1 gap-20 sm:grid-cols-2">
              <div className="flex flex-col justify-center gap-1">
                <h2 className="text-4xl font-semibold text-P4">Track Transaction History</h2>
                <p className="text-sm">
                  Stay updated with real-time reporting on cash flow and sales by cashier. Ensure accuracy and accountability in every transaction.
                  Tie transactions to specific cashiers for a transparent and traceable record of sales.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <Image alt="Mockup" className="w-full max-w-[300px] md:max-w-[500px]" loading="lazy" quality={50} src={Mockup4} />
              </div>
            </section>

            <section className="grid grid-cols-1 gap-20 sm:grid-cols-2">
              <div className="hidden items-center justify-center sm:flex">
                <Image alt="Mockup" loading="lazy" quality={50} src={Mockup5} width={500} />
              </div>
              <div className="flex flex-col justify-center gap-1">
                <h2 className="text-4xl font-semibold text-P4">Manage Membership from Dashboard</h2>
                <p className="text-sm">
                  Quickly locate and access member profiles with robust search functionalities. Seamlessly retrieve customer information whenever you
                  need it.
                </p>
              </div>
              <div className="flex items-center justify-center sm:hidden">
                <Image alt="Mockup" className="w-full max-w-[300px] md:max-w-[500px]" loading="lazy" quality={50} src={Mockup5} />
              </div>
            </section>

            <section className="grid grid-cols-1 gap-20 sm:grid-cols-2">
              <div className="flex flex-col justify-center gap-1">
                <h2 className="text-4xl font-semibold text-P4">Analyze Sales Report</h2>
                <p className="text-sm">
                  Elevate your business strategy with our powerful Sales Report feature! Dive deep into your sales performance, understand trends, and
                  make data-driven decisions effortlessly, all within your point-of-sale application. Monitor revenue streams and track profitability
                  effortlessly. Understand where your sales are coming from and identify areas for growth.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <Image alt="Mockup" className="w-full max-w-[300px] md:max-w-[500px]" loading="lazy" quality={50} src={Mockup6} />
              </div>
            </section>
          </div>
        </div>
      </section>

      <div className="bg-P1">
        <div className="mx-auto h-0.5 w-36 rounded-full bg-N7" />
      </div>
    </>
  );
};
