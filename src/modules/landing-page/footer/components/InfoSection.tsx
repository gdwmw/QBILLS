import { ButtonCVA } from "@/components";
import { cn } from "@/libs";
import Link from "next/link";
import { FC, ReactElement } from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const INFO_LINK_DATA = {
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
        <Link key={index} href={href} className={cn(ButtonCVA({ ghost: "white", size: "ghost", className: "whitespace-nowrap" }))}>
          {icon}
          {label}
        </Link>
      ))}
    </div>
  </section>
);

export const InfoSection: FC = (): ReactElement => {
  return (
    <div className="flex flex-col gap-20 md:flex-row">
      {Object.entries(INFO_LINK_DATA).map(([title, links], index) => (
        <Section key={index} title={title} links={links} />
      ))}
    </div>
  );
};
