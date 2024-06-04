import { FC, ReactElement } from "react";

import Link from "next/link";

import { ButtonCVA, Logo } from "@/components";
import { cn } from "@/libs";

import { InfoSection } from "./components";

const RULES_LINK_DATA = [
  { href: "/", label: "Terms of Service" },
  { href: "/", label: "Privacy Policy" },
  { href: "/", label: "Manage Cookies" },
];

export const Footer: FC = (): ReactElement => {
  return (
    <footer>
      <section className="bg-P4 py-20">
        <div className="container mx-auto px-10">
          <div className="grid grid-rows-1 justify-between gap-16 md:grid-rows-2 md:gap-10 lg:flex">
            <section className="w-full space-y-2 lg:max-w-[500px]">
              <Logo />

              <p className="text-N1">
                QBILLS is a point of sale application that is a solution for your business, features are available to make your work easier, use it
                now
              </p>
            </section>

            <InfoSection />
          </div>
        </div>
      </section>

      <section className="bg-P5 py-8">
        <div className="container mx-auto px-5">
          <div className="flex flex-col items-center justify-between gap-5 text-xs md:flex-row md:items-start">
            <div className="flex gap-10">
              {RULES_LINK_DATA.map(({ href, label }, index) => (
                <Link className={cn(ButtonCVA({ className: "whitespace-nowrap text-P2", ghost: "white", size: "ghost" }))} href={href} key={index}>
                  {label}
                </Link>
              ))}
            </div>

            <span className="text-P2">&copy; 2023 QBILLS. All rights reserved.</span>
          </div>
        </div>
      </section>
    </footer>
  );
};
