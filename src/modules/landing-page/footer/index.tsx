import { ButtonCVA } from "@/components";
import logoQbills1 from "@/public/assets/images/logos/white/logo-2.png";
import logoQbills2 from "@/public/assets/images/logos/white/logo-4.png";
import logoQbills3 from "@/public/assets/images/logos/white/logo-5.png";
import Image from "next/image";
import Link from "next/link";
import { FC, ReactElement } from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

type T = {};

export const Footer: FC<T> = (): ReactElement => {
  return (
    <footer>
      <section className="bg-P4 py-20">
        <div className="container mx-auto px-5">
          <div className="flex justify-between gap-5">
            <section className="w-full max-w-[500px] space-y-2">
              <div className="flex h-fit w-fit items-center justify-center gap-2">
                <Image src={logoQbills1} alt="Qbills" width={40} quality={30} priority />
                <div>
                  <Image src={logoQbills2} alt="Qbills" width={110} quality={30} priority className="mx-auto mb-1" />
                  <Image src={logoQbills3} alt="Qbills" width={130} quality={30} priority />
                </div>
              </div>
              <p className="text-N1">
                Qbills is a point of sale application that is a solution for your business, features are available to make your work easier, use it
                now
              </p>
            </section>

            <div className="flex gap-20">
              <section className="space-y-2">
                <div className="bg-P1">
                  <div className="h-px w-44 rounded-full bg-N1" />
                </div>
                <h1 className="text-2xl font-semibold text-N1">Archiact</h1>
                <div className="space-y-3 text-xs">
                  <Link href={"#Home"} className={ButtonCVA({ ghost: "white" })}>
                    Home
                  </Link>
                  <Link href={"#About-Us"} className={ButtonCVA({ ghost: "white", className: "whitespace-nowrap" })}>
                    About Us
                  </Link>
                  <Link href={"#Our-Feature"} className={ButtonCVA({ ghost: "white" })}>
                    Features
                  </Link>
                  <Link href={"#FAQ"} className={ButtonCVA({ ghost: "white" })}>
                    FAQ
                  </Link>
                  <Link href={"#Get-App"} className={ButtonCVA({ ghost: "white" })}>
                    Get App
                  </Link>
                </div>
              </section>

              <section className="space-y-2">
                <div className="bg-P1">
                  <div className="h-px w-44 rounded-full bg-N1" />
                </div>
                <h1 className="text-2xl font-semibold text-N1">Features</h1>
                <div className="space-y-3 text-xs">
                  <Link href={"/"} className={ButtonCVA({ ghost: "white" })}>
                    Manage Product
                  </Link>
                  <Link href={"/"} className={ButtonCVA({ ghost: "white", className: "whitespace-nowrap" })}>
                    Manage Account Cashier
                  </Link>
                  <Link href={"/"} className={ButtonCVA({ ghost: "white" })}>
                    Track Transaction History
                  </Link>
                  <Link href={"/"} className={ButtonCVA({ ghost: "white" })}>
                    Manage Membership
                  </Link>
                  <Link href={"/"} className={ButtonCVA({ ghost: "white" })}>
                    Analyze Sales Report
                  </Link>
                </div>
              </section>

              <section className="space-y-2">
                <div className="bg-P1">
                  <div className="h-px w-44 rounded-full bg-N1" />
                </div>
                <h1 className="text-2xl font-semibold text-N1">Social Media</h1>
                <div className="space-y-3 text-xs">
                  <Link href={"#/"} className={ButtonCVA({ ghost: "white" })}>
                    <FaFacebookF />
                    Facebook
                  </Link>
                  <Link href={"#/"} className={ButtonCVA({ ghost: "white", className: "whitespace-nowrap" })}>
                    <FaInstagram />
                    Instagram
                  </Link>
                  <Link href={"#/"} className={ButtonCVA({ ghost: "white" })}>
                    <FaYoutube />
                    YouTube
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-P5 py-8">
        <div className="container mx-auto px-5">
          <div className="flex justify-between text-xs">
            <div className="flex gap-10">
              <Link href={"/"} className={ButtonCVA({ ghost: "white", className: "whitespace-nowrap text-P2" })}>
                Terms of Service
              </Link>
              <Link href={"/"} className={ButtonCVA({ ghost: "white", className: "whitespace-nowrap text-P2" })}>
                Privacy Policy
              </Link>
              <Link href={"/"} className={ButtonCVA({ ghost: "white", className: "whitespace-nowrap text-P2" })}>
                Manage Cookies
              </Link>
            </div>
            <p className="text-P2">&copy; 2023 QBills. All rights reserved.</p>
          </div>
        </div>
      </section>
    </footer>
  );
};
