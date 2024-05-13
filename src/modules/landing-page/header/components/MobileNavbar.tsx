"use client";

import { ButtonCVA } from "@/components";
import Link from "next/link";
import { FC, FormEvent, ReactElement, useEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { LoginStatusButton, NavLinks } from "./";

type T = {
  authenticated: string | undefined;
};

export const MobileNavbar: FC<T> = ({ authenticated }): ReactElement => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  function handleScroll(e: FormEvent, href: string) {
    e.preventDefault();
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
  }

  function handleLinkClick(e: FormEvent, href: string) {
    toggleMenu();
    handleScroll(e, href);
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpenMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button type="button" onClick={toggleMenu} className="flex cursor-pointer items-center text-3xl text-N1 active:scale-95 lg:hidden">
        <GiHamburgerMenu />
      </button>

      <section ref={menuRef} className={`fixed left-0 top-0 w-full bg-P4/70 py-20 backdrop-blur-md ${openMenu ? "lg:hidden" : "hidden lg:hidden"}`}>
        <div className="flex flex-col items-center gap-10">
          <NavLinks handleScroll={handleLinkClick} />

          <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-36">
              <Link
                href={"#Get-App"}
                onClick={(event) => handleLinkClick(event, "#Get-App")}
                className={ButtonCVA({ solid: "white", size: "sm", widthFull: true, className: "font-semibold text-P4" })}
              >
                Get App
              </Link>
            </div>

            <LoginStatusButton authenticated={authenticated} />
          </div>
        </div>
      </section>
    </>
  );
};
