import Mockup2 from "@/public/assets/images/landing-page/our-feature/mockup-1.webp";
import Mockup3 from "@/public/assets/images/landing-page/our-feature/mockup-2.webp";
import Mockup4 from "@/public/assets/images/landing-page/our-feature/mockup-3.webp";
import Mockup5 from "@/public/assets/images/landing-page/our-feature/mockup-4.webp";
import Mockup6 from "@/public/assets/images/landing-page/our-feature/mockup-5.webp";
import Image from "next/image";
import { FC, ReactElement } from "react";

export const Features: FC = (): ReactElement => {
  return (
    <>
      <section id="Our-Feature" className="bg-P1 py-36">
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
                <Image src={Mockup2} alt="Mockup" quality={50} loading="lazy" className="w-full max-w-[300px] md:max-w-[500px]" />
              </div>
            </section>

            <section className="grid grid-cols-1 gap-20 sm:grid-cols-2">
              <div className="hidden items-center justify-center sm:flex">
                <Image src={Mockup3} alt="Mockup" width={500} quality={50} loading="lazy" />
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
                <Image src={Mockup3} alt="Mockup" quality={50} loading="lazy" className="w-full max-w-[300px]" />
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
                <Image src={Mockup4} alt="Mockup" quality={50} loading="lazy" className="w-full max-w-[300px] md:max-w-[500px]" />
              </div>
            </section>

            <section className="grid grid-cols-1 gap-20 sm:grid-cols-2">
              <div className="hidden items-center justify-center sm:flex">
                <Image src={Mockup5} alt="Mockup" width={500} quality={50} loading="lazy" />
              </div>
              <div className="flex flex-col justify-center gap-1">
                <h2 className="text-4xl font-semibold text-P4">Manage Membership from Dashboard</h2>
                <p className="text-sm">
                  Quickly locate and access member profiles with robust search functionalities. Seamlessly retrieve customer information whenever you
                  need it.
                </p>
              </div>
              <div className="flex items-center justify-center sm:hidden">
                <Image src={Mockup5} alt="Mockup" quality={50} loading="lazy" className="w-full max-w-[300px] md:max-w-[500px]" />
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
                <Image src={Mockup6} alt="Mockup" quality={50} loading="lazy" className="w-full max-w-[300px] md:max-w-[500px]" />
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
