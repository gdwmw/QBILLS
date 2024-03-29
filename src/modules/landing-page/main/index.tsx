import AppStore from "@/public/assets/images/landing-page/get-app/appstore.png";
import GooglePlay from "@/public/assets/images/landing-page/get-app/googleplay.png";
import Mockup7 from "@/public/assets/images/landing-page/get-app/mockup.png";
import Mockup1 from "@/public/assets/images/landing-page/hero-section/mockup.png";
import Mockup2 from "@/public/assets/images/landing-page/our-feature/mockup-1.png";
import Mockup3 from "@/public/assets/images/landing-page/our-feature/mockup-2.png";
import Mockup4 from "@/public/assets/images/landing-page/our-feature/mockup-3.png";
import Mockup5 from "@/public/assets/images/landing-page/our-feature/mockup-4.png";
import Mockup6 from "@/public/assets/images/landing-page/our-feature/mockup-5.png";
import logoQbills1 from "@/public/assets/images/logos/brown/logo-2.png";
import logoQbills2 from "@/public/assets/images/logos/white/logo-2.png";
import Image from "next/image";
import Link from "next/link";
import { FC, ReactElement } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaBoxesStacked, FaMoneyBillTransfer } from "react-icons/fa6";
import { MdAddToPhotos } from "react-icons/md";
import { FAQ } from "./faq";

export const Main: FC = (): ReactElement => {
  return (
    <main>
      {/* HERO SECTION */}
      <section className="relative -z-10 h-screen w-full overflow-hidden bg-gradient-to-r from-P3 to-P4">
        <Image src={logoQbills1} alt="QBills" width={700} quality={30} priority className="absolute -top-24 left-10 -z-10 -rotate-12 opacity-25" />
        <Image
          src={logoQbills2}
          alt="QBills"
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

      {/* ABOUT US */}
      <section id="About-Us" className="bg-P1 py-36">
        <div className="container mx-auto px-10">
          <div className="grid grid-rows-1 gap-20 lg:grid-cols-2 lg:grid-rows-none">
            <section className="flex flex-col justify-center gap-5">
              <h1 className="text-6xl font-semibold">About Us</h1>

              <p>
                Elevate your sales strategy and delight customers with our state-of-the-art POS application, offering a seamless and user-friendly
                interface for enhanced transactions. Qbills is here to be a solution for your business, features are available to make your work
                easier, use it now.
              </p>
            </section>

            <div className="flex flex-col items-center gap-14">
              <div className="flex gap-5">
                <section className="w-full max-w-[335px] space-y-1">
                  <i className="text-3xl text-P4">
                    <MdAddToPhotos />
                  </i>
                  <h2 className="text-xl font-semibold">Create Order</h2>
                  <p className="text-sm">You have the option to request food through the Qbilss POS application.</p>
                </section>

                <section className="w-full max-w-[335px] space-y-1">
                  <i className="text-3xl text-P4">
                    <FaUserCircle />
                  </i>
                  <h2 className="text-xl font-semibold">Manage Account Cashier</h2>
                  <p className="text-sm">The use of membership provides its users with coupons, discounts, rewards, loyalty points.</p>
                </section>
              </div>

              <div className="flex gap-5">
                <section className="w-full max-w-[335px] space-y-1">
                  <i className="text-3xl text-P4">
                    <FaBoxesStacked />
                  </i>
                  <h2 className="text-xl font-semibold">Manage Product</h2>
                  <p className="text-sm">In the admin features there are product management features for coffee shops.</p>
                </section>

                <section className="w-full max-w-[335px] space-y-1">
                  <i className="text-3xl text-P4">
                    <FaMoneyBillTransfer />
                  </i>
                  <h2 className="text-xl font-semibold">Track Transaction History</h2>
                  <p className="text-sm">The use of membership provides its users with coupons, discounts, rewards, loyalty points.</p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-P1">
        <div className="mx-auto h-0.5 w-36 rounded-full bg-N7" />
      </div>

      {/* OUR FEATURE */}
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

      {/* FAQ */}
      <FAQ />

      <div className="bg-P1">
        <div className="mx-auto h-0.5 w-36 rounded-full bg-N7" />
      </div>

      {/* GET APP */}
      <section id="Get-App" className="bg-P1 py-36">
        <div className="container mx-auto px-10">
          <div className="grid grid-rows-1 gap-20 lg:grid-cols-2 lg:grid-rows-none lg:gap-5">
            <section className="flex w-full max-w-[800px] flex-col justify-center gap-2">
              <h1 className="text-6xl font-semibold text-P4">QBills is available for iOS and Android</h1>
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
    </main>
  );
};
