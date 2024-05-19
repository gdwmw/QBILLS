import { ButtonCVA } from "@/components";
import { cn } from "@/libs";
import Link from "next/link";
import { FC, FormEvent, ReactElement } from "react";

const LINKS = [
  { href: "#Home", label: "Home" },
  { href: "#About", label: "About" },
  { href: "#Features", label: "Features" },
  { href: "#FAQ", label: "FAQ" },
];

type TLinks = {
  href: string;
  label: string;
  onLinkClick: (e: FormEvent, href: string) => void;
};

const Links: FC<TLinks> = ({ href, label, onLinkClick }) => {
  return (
    <Link href={href} onClick={(e) => onLinkClick(e, href)} className={cn(ButtonCVA({ ghost: "white", size: "ghost", className: "font-semibold" }))}>
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
      {LINKS.map((link, index) => (
        <Links key={index} {...link} onLinkClick={handleScroll} />
      ))}
    </>
  );
};
