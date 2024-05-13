"use client";

import { ButtonCVA } from "@/components";
import logoQBILLS1 from "@/public/assets/images/logos/white/logo-2.webp";
import logoQBILLS2 from "@/public/assets/images/logos/white/logo-4.webp";
import logoQBILLS3 from "@/public/assets/images/logos/white/logo-5.webp";
import Image from "next/image";
import Link from "next/link";
import { FC, FormEvent, ReactElement } from "react";
import { LoginStatusButton, MobileNavbar } from "./components";

const NAV_LINKS = [
  { href: "#Home", label: "Home" },
  { href: "#About", label: "About" },
  { href: "#Features", label: "Features" },
  { href: "#FAQ", label: "FAQ" },
];

type TNavLink = {
  href: string;
  label: string;
  onLinkClick: (e: FormEvent, href: string) => void;
};

const NavLink: FC<TNavLink> = ({ href, label, onLinkClick }) => {
  return (
    <Link href={href} onClick={(e) => onLinkClick(e, href)} className={ButtonCVA({ ghost: "white", className: "font-semibold" })}>
      {label}
    </Link>
  );
};

type THeader = {
  authenticated: string | undefined;
};

export const Header: FC<THeader> = ({ authenticated }): ReactElement => {
  function handleScroll(e: FormEvent, href: string) {
    e.preventDefault();
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header>
      <nav className="absolute left-0 top-0 w-full px-10 py-5">
        <div className="mx-auto flex max-w-[1920px] items-center justify-between">
          <section className="flex h-fit w-fit items-center justify-center gap-2">
            <Image src={logoQBILLS1} alt="QBILLS" width={40} quality={30} priority />
            <div>
              <Image src={logoQBILLS2} alt="QBILLS" width={110} quality={30} priority className="mx-auto mb-1" />
              <Image src={logoQBILLS3} alt="QBILLS" width={130} quality={30} priority />
            </div>
          </section>

          <section className="hidden items-center gap-24 lg:flex">
            {NAV_LINKS.map((link, index) => (
              <NavLink key={index} {...link} onLinkClick={handleScroll} />
            ))}
            <div className="flex gap-3">
              <div className="w-36">
                <Link
                  href={"#Get-App"}
                  className={ButtonCVA({ solid: "white", size: "sm", widthFull: true, className: "font-semibold text-P4" })}
                  onClick={(event) => {
                    handleScroll(event, "#Get-App");
                  }}
                >
                  Get App
                </Link>
              </div>
              <LoginStatusButton authenticated={authenticated} />
            </div>
          </section>

          <MobileNavbar authenticated={authenticated} />
        </div>
      </nav>
    </header>
  );
};
