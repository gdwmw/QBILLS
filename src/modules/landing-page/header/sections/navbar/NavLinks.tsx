import { FC, FormEvent, ReactElement } from "react";

import Link from "next/link";

import { ButtonCVA } from "@/components";
import { cn } from "@/libs";

const LINKS_DATA = [
  { href: "#Home", label: "Home" },
  { href: "#About", label: "About" },
  { href: "#Features", label: "Features" },
  { href: "#FAQ", label: "FAQ" },
];

type TLinkSection = {
  href: string;
  label: string;
  onLinkClick: (e: FormEvent, href: string) => void;
};

const LinkSection: FC<TLinkSection> = ({ href, label, onLinkClick }): ReactElement => {
  return (
    <Link className={cn(ButtonCVA({ className: "font-semibold", ghost: "white", size: "ghost" }))} href={href} onClick={(e) => onLinkClick(e, href)}>
      {label}
    </Link>
  );
};

type TNavLinks = {
  handleScroll: (e: FormEvent, href: string) => void;
};

export const NavLinks: FC<TNavLinks> = ({ handleScroll }): ReactElement => {
  return (
    <>
      {LINKS_DATA.map((link, index) => (
        <LinkSection key={index} {...link} onLinkClick={handleScroll} />
      ))}
    </>
  );
};
