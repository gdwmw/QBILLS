import { ButtonCVA } from "@/components";
import logoQBILLS1 from "@/public/assets/images/logos/white/logo-2.webp";
import logoQBILLS2 from "@/public/assets/images/logos/white/logo-4.webp";
import logoQBILLS3 from "@/public/assets/images/logos/white/logo-5.webp";
import Image from "next/image";
import Link from "next/link";
import { FC, ReactElement } from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const LINK_DATA = {
  Archiact: [
    { href: "#Home", label: "Home" },
    { href: "#About", label: "About" },
    { href: "#Features", label: "Features" },
    { href: "#FAQ", label: "FAQ" },
    { href: "#Get-App", label: "Get App" },
  ],
  Features: [
    { href: "/", label: "Manage Product" },
    { href: "/", label: "Manage Account Cashier" },
    { href: "/", label: "Track Transaction History" },
    { href: "/", label: "Manage Membership" },
    { href: "/", label: "Analyze Sales Report" },
  ],
  "Social Media": [
    { href: "/", label: "Facebook", icon: <FaFacebookF /> },
    { href: "/", label: "Instagram", icon: <FaInstagram /> },
    { href: "/", label: "YouTube", icon: <FaYoutube /> },
  ],
};

type TSection = {
  title: string;
  links: {
    href: string;
    label: string;
    icon?: ReactElement;
  }[];
};

const Section: FC<TSection> = ({ title, links }) => (
  <section className="space-y-2">
    <div className="bg-P1">
      <div className="h-px w-full rounded-full bg-N1 md:min-w-44" />
    </div>
    <h1 className="text-2xl font-semibold text-N1">{title}</h1>
    <div className="space-y-3 text-xs">
      {links.map(({ href, label, icon }, index) => (
        <Link key={index} href={href} className={ButtonCVA({ ghost: "white", className: "whitespace-nowrap" })}>
          {icon}
          {label}
        </Link>
      ))}
    </div>
  </section>
);

export const Footer: FC = (): ReactElement => {
  return (
    <footer>
      <section className="bg-P4 py-20">
        <div className="container mx-auto px-10">
          <div className="grid grid-rows-1 justify-between gap-16 md:grid-rows-2 md:gap-10 lg:flex">
            <section className="w-full space-y-2 lg:max-w-[500px]">
              <div className="flex h-fit w-fit items-center justify-center gap-2">
                <Image src={logoQBILLS1} alt="QBILLS" width={40} quality={30} priority />
                <div>
                  <Image src={logoQBILLS2} alt="QBILLS" width={110} quality={30} priority className="mx-auto mb-1" />
                  <Image src={logoQBILLS3} alt="QBILLS" width={130} quality={30} priority />
                </div>
              </div>
              <p className="text-N1">
                QBILLS is a point of sale application that is a solution for your business, features are available to make your work easier, use it
                now
              </p>
            </section>

            <div className="flex flex-col gap-20 md:flex-row">
              <Section title="Archiact" links={LINK_DATA.Archiact} />
              <Section title="Features" links={LINK_DATA.Features} />
              <Section title="Social Media" links={LINK_DATA["Social Media"]} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-P5 py-8">
        <div className="container mx-auto px-5">
          <div className="flex flex-col items-center justify-between gap-5 text-xs md:flex-row md:items-start">
            <div className="flex gap-10">
              <Link href={"/"} className={ButtonCVA({ ghost: "white", className: "whitespace-nowrap text-P2" })}>
                Terms of Service
              </Link>
              <Link href={"/"} className={ButtonCVA({ ghost: "white", className: "whitespace-nowrap text-P2" })}>
                Privacy Policy
              </Link>
              <Link href={"/"} className={ButtonCVA({ ghost: "white", className: "whitespace-nowrap text-P2" })}>
                Manage Cookies
              </Link>
            </div>
            <span className="text-P2">&copy; 2023 QBILLS. All rights reserved.</span>
          </div>
        </div>
      </section>
    </footer>
  );
};
