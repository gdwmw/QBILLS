"use client";

import { ButtonCVA } from "@/components";
import { cn } from "@/libs";
import logoQbills1 from "@/public/assets/images/logos/white/logo-2.webp";
import logoQbills2 from "@/public/assets/images/logos/white/logo-4.webp";
import logoQbills3 from "@/public/assets/images/logos/white/logo-5.webp";
import Image from "next/image";
import Link from "next/link";
import { FC, ReactElement } from "react";
import { MobileNavbar } from "./mobile-navbar";

type T = {
  authenticated?: string;
};

export const Header: FC<T> = ({ authenticated }): ReactElement => {
  function handleScroll(e: any, id: string) {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header>
      <nav className="absolute left-0 top-0 w-full px-10 py-5">
        <div className="mx-auto flex max-w-[1920px] items-center justify-between">
          <section className="flex h-fit w-fit items-center justify-center gap-2">
            <Image src={logoQbills1} alt="QBills" width={40} quality={30} priority />
            <div>
              <Image src={logoQbills2} alt="QBills" width={110} quality={30} priority className="mx-auto mb-1" />
              <Image src={logoQbills3} alt="QBills" width={130} quality={30} priority />
            </div>
          </section>

          <section className="hidden items-center gap-24 lg:flex">
            <Link
              href={"#Home"}
              className={ButtonCVA({ ghost: "white", className: "font-semibold" })}
              onClick={(event) => {
                handleScroll(event, "Home");
              }}
            >
              Home
            </Link>
            <Link
              href={"#About-Us"}
              className={ButtonCVA({ ghost: "white", className: "whitespace-nowrap font-semibold" })}
              onClick={(event) => {
                handleScroll(event, "About-Us");
              }}
            >
              About Us
            </Link>
            <Link
              href={"#Our-Feature"}
              className={ButtonCVA({ ghost: "white", className: "font-semibold" })}
              onClick={(event) => {
                handleScroll(event, "Our-Feature");
              }}
            >
              Features
            </Link>
            <Link
              href={"#FAQ"}
              className={ButtonCVA({ ghost: "white", className: "font-semibold" })}
              onClick={(event) => {
                handleScroll(event, "FAQ");
              }}
            >
              FAQ
            </Link>
            <div className="flex gap-3">
              <div className="w-36">
                <Link
                  href={"#Get-App"}
                  className={ButtonCVA({ solid: "white", size: "sm", widthFull: true, className: "font-semibold text-P4" })}
                  onClick={(event) => {
                    handleScroll(event, "Get-App");
                  }}
                >
                  Get App
                </Link>
              </div>
              {authenticated ? (
                <div className="w-36">
                  <Link
                    href={"/dashboard"}
                    className={cn(
                      ButtonCVA({
                        outline: "white",
                        size: "sm",
                        widthFull: true,
                        className: "border-2 py-[7px] font-bold hover:text-P4 active:text-P4",
                      }),
                    )}
                  >
                    Dashboard
                  </Link>
                </div>
              ) : (
                <div className="w-20">
                  <Link
                    href={"/login"}
                    className={cn(
                      ButtonCVA({
                        outline: "white",
                        size: "sm",
                        widthFull: true,
                        className: "border-2 py-[7px] font-bold hover:text-P4 active:text-P4",
                      }),
                    )}
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </section>

          <MobileNavbar authenticated={authenticated} />
        </div>
      </nav>
    </header>
  );
};
