"use client";

import { ButtonCVA, Logo } from "@/components";
import { cn } from "@/libs";
import Link from "next/link";
import { FC, FormEvent, ReactElement } from "react";
import { LoginStatusButton, MobileNavbar, NavLinks } from "./components";

type T = {
  authenticated: string | undefined;
};

export const Header: FC<T> = ({ authenticated }): ReactElement => {
  function handleScroll(e: FormEvent, href: string) {
    e.preventDefault();
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header>
      <nav className="absolute left-0 top-0 w-full px-10 py-5">
        <div className="mx-auto flex max-w-[1920px] items-center justify-between">
          <Logo />

          <section className="hidden items-center gap-24 min-[1225px]:flex">
            <NavLinks handleScroll={handleScroll} />

            <div className="flex gap-3">
              <div className="w-36">
                <Link
                  href={"#Get-App"}
                  className={cn(ButtonCVA({ solid: "white", className: "w-full font-semibold text-P4" }))}
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
