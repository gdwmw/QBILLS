import { ButtonCVA } from "@/components";
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
    <Link href={href} onClick={(e) => onLinkClick(e, href)} className={ButtonCVA({ ghost: "white", className: "font-semibold" })}>
      {label}
    </Link>
  );
};

type T = {
  handleScroll: (e: FormEvent, href: string) => void;
};

export const NavLinks: FC<T> = ({ handleScroll }): ReactElement => {
  return (
    <>
      {LINKS.map((link, index) => (
        <Links key={index} {...link} onLinkClick={handleScroll} />
      ))}
    </>
  );
};
