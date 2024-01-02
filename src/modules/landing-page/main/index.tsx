import Ellipse from "@/public/assets/images/landing-page/hero-section/ellipse.svg";
import Mockup from "@/public/assets/images/landing-page/hero-section/mockup.png";
import logoQbills from "@/public/assets/images/logos/brown/logo-2.png";
import Image from "next/image";
import { FC, ReactElement } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaBoxOpen, FaMoneyBills, FaShop } from "react-icons/fa6";

type T = {};

export const Main: FC<T> = (): ReactElement => {
  return (
    <main>
      {/* HERO SECTION */}
      <section className="relative -z-10 h-screen w-full overflow-hidden bg-gradient-to-r from-P3 to-P4">
        <Image src={logoQbills} alt="Qbills" width={500} priority className="absolute left-0 top-0 -z-10 -rotate-12 opacity-20" />
        <Image src={Ellipse} alt="Ellipse" priority className="absolute right-0 top-0 -z-10" />

        <div className="h-full w-full px-24">
          <div className="grid h-full w-full grid-cols-2 gap-10">
            <div className="flex flex-col justify-center gap-5 text-N1">
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

      {/* ABOUT US */}
      <section id="About-Us" className="bg-P1 py-36">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-2 gap-20">
            <div className="flex flex-col justify-center gap-5">
              <h1 className="text-6xl font-semibold">About Us</h1>
              <p>
                Elevate your sales strategy and delight customers with our state-of-the-art POS application, offering a seamless and user-friendly
                interface for enhanced transactions. Qbills is here to be a solution for your business, features are available to make your work
                easier, use it now.
              </p>
            </div>

            <div className="flex flex-col items-end gap-14">
              <div className="flex gap-5">
                <div className="w-[335px] space-y-1">
                  <i className="text-3xl text-P4">
                    <FaBoxOpen />
                  </i>
                  <h2 className="text-xl font-semibold">Create Order</h2>
                  <p className="text-sm">You have the option to request food through the Qbilss POS application.</p>
                </div>

                <div className="w-[335px] space-y-1">
                  <i className="text-3xl text-P4">
                    <FaUserCircle />
                  </i>
                  <h2 className="text-xl font-semibold">Manage Account Cashier</h2>
                  <p className="text-sm">The use of membership provides its users with coupons, discounts, rewards, loyalty points.</p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-[335px] space-y-1">
                  <i className="text-3xl text-P4">
                    <FaShop />
                  </i>
                  <h2 className="text-xl font-semibold">Manage Product</h2>
                  <p className="text-sm">In the admin features there are product management features for coffee shops.</p>
                </div>

                <div className="w-[335px] space-y-1">
                  <i className="text-3xl text-P4">
                    <FaMoneyBills />
                  </i>
                  <h2 className="text-xl font-semibold">Track Transaction History</h2>
                  <p className="text-sm">The use of membership provides its users with coupons, discounts, rewards, loyalty points.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
