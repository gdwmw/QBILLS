import { FC, ReactElement, ReactNode } from "react";

import { FaUserCircle } from "react-icons/fa";
import { FaBoxesStacked, FaMoneyBillTransfer } from "react-icons/fa6";
import { MdAddToPhotos } from "react-icons/md";

const FEATURES_DATA = [
  { description: "You have the option to request food through the QBILLS POS application.", icon: <MdAddToPhotos />, title: "Create Order" },
  {
    description: "The use of membership provides its users with coupons, discounts, rewards, loyalty points.",
    icon: <FaUserCircle />,
    title: "Manage Account Cashier",
  },
  { description: "In the admin features there are product management features for coffee shops.", icon: <FaBoxesStacked />, title: "Manage Product" },
  {
    description: "The use of membership provides its users with coupons, discounts, rewards, loyalty points.",
    icon: <FaMoneyBillTransfer />,
    title: "Track Transaction History",
  },
];

type TFeatureSection = {
  description: string;
  icon: ReactNode;
  title: string;
};

const FeatureSection: FC<TFeatureSection> = ({ description, icon, title }): ReactElement => (
  <section className="w-full max-w-[335px] space-y-1">
    <i className="text-3xl text-P4">{icon}</i>
    <h2 className="text-xl font-semibold">{title}</h2>
    <p className="text-sm">{description}</p>
  </section>
);

export const About: FC = (): ReactElement => {
  return (
    <>
      <section className="bg-P1 py-36" id="About">
        <div className="container mx-auto px-10">
          <div className="grid grid-rows-1 gap-20 lg:grid-cols-2 lg:grid-rows-none">
            <section className="flex flex-col justify-center gap-5">
              <h1 className="text-6xl font-semibold">About Us</h1>

              <p>
                Elevate your sales strategy and delight customers with our state of the art POS application, offering a seamless and user friendly
                interface for enhanced transactions. QBILLS is here to be a solution for your business, features are available to make your work
                easier, use it now.
              </p>
            </section>

            <div className="flex flex-col items-center gap-14">
              <div className="flex gap-5">
                {FEATURES_DATA.slice(0, 2).map((data, index) => (
                  <FeatureSection key={index} {...data} />
                ))}
              </div>

              <div className="flex gap-5">
                {FEATURES_DATA.slice(2, 4).map((data, index) => (
                  <FeatureSection key={index} {...data} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-P1">
        <div className="mx-auto h-0.5 w-36 rounded-full bg-N7" />
      </div>
    </>
  );
};
