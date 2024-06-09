import { FC, FormEvent, ReactElement, useEffect, useRef, useState } from "react";

import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";

import { ButtonCVA } from "@/components";
import { cn } from "@/libs";

import { LoginStatusButton } from "./LoginStatusButton";
import { NavLinks } from "./NavLinks";

type T = {
  authStatus: boolean | null;
};

export const MobileNavbar: FC<T> = ({ authStatus }): ReactElement => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleScroll = (e: FormEvent, href: string) => {
    e.preventDefault();
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLinkClick = (e: FormEvent, href: string) => {
    toggleMenu();
    handleScroll(e, href);
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
      <button className="flex cursor-pointer items-center text-3xl text-N1 active:scale-95 min-[1225px]:hidden" onClick={toggleMenu} type="button">
        <GiHamburgerMenu />
      </button>

      <section
        className={`fixed left-0 top-0 w-full bg-P4/70 py-20 backdrop-blur-md ${openMenu ? "min-[1225px]:hidden" : "hidden min-[1225px]:hidden"}`}
        ref={menuRef}
      >
        <div className="flex flex-col items-center gap-10">
          <NavLinks handleScroll={handleLinkClick} />

          <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-36">
              <Link
                className={cn(ButtonCVA({ className: "w-full font-semibold text-P4", solid: "white" }))}
                href={"#Get-App"}
                onClick={(event) => handleLinkClick(event, "#Get-App")}
              >
                Get App
              </Link>
            </div>

            <LoginStatusButton authStatus={authStatus} />
          </div>
        </div>
      </section>
    </>
  );
};
