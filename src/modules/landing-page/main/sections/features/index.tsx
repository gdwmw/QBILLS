import Image, { StaticImageData } from "next/image";
import { FC, ReactElement } from "react";

import Mockup1 from "@/public/assets/images/landing-page/our-feature/mockup-1.webp";
import Mockup2 from "@/public/assets/images/landing-page/our-feature/mockup-2.webp";
import Mockup3 from "@/public/assets/images/landing-page/our-feature/mockup-3.webp";
import Mockup4 from "@/public/assets/images/landing-page/our-feature/mockup-4.webp";
import Mockup5 from "@/public/assets/images/landing-page/our-feature/mockup-5.webp";

const FEATURES_DATA = [
  {
    description:
      "Take full control of your products with intuitive organization tools. Categorize, label, price, description and sort your inventory with ease, ensuring every item is precisely where it needs to be.",
    imageAlt: "Mockup",
    imageSrc: Mockup1,
    reverse: false,
    title: "Organize Your Product",
  },
  {
    description:
      "Create personalized accounts for each cashier. Monitor performance, track sales, and manage permissions seamlessly for a tailored experience. Meet the game-changer in your point-of-sale experience: our advanced Account Cashier Management feature! Take control of transactions, accountability, and cashier performance effortlessly.",
    imageAlt: "Mockup",
    imageSrc: Mockup2,
    reverse: true,
    title: "Manage Your Own Account Cashier",
  },
  {
    description:
      "Stay updated with real-time reporting on cash flow and sales by cashier. Ensure accuracy and accountability in every transaction. Tie transactions to specific cashiers for a transparent and traceable record of sales.",
    imageAlt: "Mockup",
    imageSrc: Mockup3,
    reverse: false,
    title: "Track Transaction History",
  },
  {
    description:
      "Quickly locate and access member profiles with robust search functionalities. Seamlessly retrieve customer information whenever you need it.",
    imageAlt: "Mockup",
    imageSrc: Mockup4,
    reverse: true,
    title: "Manage Membership from Dashboard",
  },
  {
    description:
      "Elevate your business strategy with our powerful Sales Report feature! Dive deep into your sales performance, understand trends, and make data-driven decisions effortlessly, all within your point-of-sale application. Monitor revenue streams and track profitability effortlessly. Understand where your sales are coming from and identify areas for growth.",
    imageAlt: "Mockup",
    imageSrc: Mockup5,
    reverse: false,
    title: "Analyze Sales Report",
  },
];

type TFeatureSection = {
  description: string;
  imageAlt: string;
  imageSrc: StaticImageData;
  reverse: boolean;
  title: string;
};

const FeatureSection: FC<TFeatureSection> = ({ description, imageAlt, imageSrc, reverse, title }): ReactElement => (
  <section className="grid grid-cols-1 gap-20 sm:grid-cols-2">
    <div className="flex flex-col justify-center gap-1">
      <h2 className="text-4xl font-semibold text-P4">{title}</h2>
      <p className="text-sm">{description}</p>
    </div>
    <div className={`flex items-center justify-center ${reverse ? "order-last sm:order-first" : ""}`}>
      <Image alt={imageAlt} className="w-full max-w-[300px] md:max-w-[500px]" loading="lazy" quality={50} src={imageSrc} />
    </div>
  </section>
);

export const Features: FC = (): ReactElement => {
  return (
    <>
      <section className="bg-P1 py-36" id="Features">
        <div className="container mx-auto px-10">
          <h1 className="mb-36 text-center text-6xl font-semibold">Our Feature</h1>

          <div className="space-y-20">
            {FEATURES_DATA.map((feature, index) => (
              <FeatureSection key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>
      <div className="bg-P1">
        <div className="mx-auto h-0.5 w-36 rounded-full bg-N7" />
      </div>
    </>
  );
};
