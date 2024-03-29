"use client";

import { ButtonCVA } from "@/components";
import Link from "next/link";
import { FC, ReactElement, useEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

export const MobileNavbar: FC = (): ReactElement => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

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
      <section onClick={toggleMenu} className="flex cursor-pointer items-center text-3xl text-N1 active:scale-95 lg:hidden">
        <GiHamburgerMenu />
      </section>

      <section ref={menuRef} className={`fixed left-0 top-0 w-full bg-P4/70 py-20 backdrop-blur-md ${openMenu ? "lg:hidden" : "hidden lg:hidden"}`}>
        <div className="flex flex-col items-center gap-10">
          <Link href={"#Home"} onClick={toggleMenu} className={ButtonCVA({ ghost: "white", className: "font-semibold" })}>
            Home
          </Link>
          <Link href={"#About-Us"} onClick={toggleMenu} className={ButtonCVA({ ghost: "white", className: "whitespace-nowrap font-semibold" })}>
            About Us
          </Link>
          <Link href={"#Our-Feature"} onClick={toggleMenu} className={ButtonCVA({ ghost: "white", className: "font-semibold" })}>
            Features
          </Link>
          <Link href={"#FAQ"} onClick={toggleMenu} className={ButtonCVA({ ghost: "white", className: "font-semibold" })}>
            FAQ
          </Link>
          <div className="w-36">
            <Link
              href={"#Get-App"}
              onClick={toggleMenu}
              className={ButtonCVA({ solid: "white", size: "sm", widthFull: true, className: "font-semibold text-P4" })}
            >
              Get App
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
