import { FC, ReactElement, ReactNode } from "react";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

import { ButtonCVA } from "@/components";
import { cn } from "@/libs";

const INFO_LINKS_DATA = {
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
    { href: "/", icon: <FaFacebookF />, label: "Facebook" },
    { href: "/", icon: <FaInstagram />, label: "Instagram" },
    { href: "/", icon: <FaYoutube />, label: "YouTube" },
  ],
};

type TInfoLinkSection = {
  links: {
    href: string;
    icon?: ReactNode;
    label: string;
  }[];
  title: string;
};

const InfoLinkSection: FC<TInfoLinkSection> = ({ links, title }): ReactElement => (
  <section className="space-y-2">
    <div className="bg-P1">
      <div className="h-px w-full rounded-full bg-N1 md:min-w-44" />
    </div>
    <h1 className="text-2xl font-semibold text-N1">{title}</h1>
    <div className="space-y-3 text-xs">
      {links.map(({ href, icon, label }, index) => (
        <Link className={cn(ButtonCVA({ className: "whitespace-nowrap", ghost: "white", size: "ghost" }))} href={href} key={index}>
          {icon}
          {label}
        </Link>
      ))}
    </div>
  </section>
);

export const Information: FC = (): ReactElement => {
  return (
    <div className="flex flex-col gap-20 md:flex-row">
      {Object.entries(INFO_LINKS_DATA).map(([title, links], index) => (
        <InfoLinkSection key={index} links={links} title={title} />
      ))}
    </div>
  );
};
