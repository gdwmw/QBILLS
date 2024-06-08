import type { Metadata } from "next";

import { FC, ReactElement, ReactNode } from "react";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Open_Sans } from "next/font/google";

import { NextAuthProvider, ReactQueryProvider } from "@/libs";

import "@/styles/globals.css";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "QBILLS | Landing Page",
    template: "QBILLS | %s",
  },
};

type T = {
  children: ReactNode;
};

const RootLayout: FC<T> = ({ children }): ReactElement => {
  return (
    <html className="scroll-smooth" lang="en">
      <body className={openSans.className}>
        <ReactQueryProvider>
          <NextAuthProvider>
            <SpeedInsights />
            {children}
          </NextAuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
