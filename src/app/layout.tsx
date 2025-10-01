import type { Metadata } from "next";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Open_Sans } from "next/font/google";
import { FC, ReactElement, ReactNode } from "react";

import { NextAuthProvider, ReactQueryProvider } from "@/libs";
import "@/styles/globals.css";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  authors: [{ name: "Gede Dewo Wahyu M.W", url: "https://github.com/gdwmw" }],
  category: "Point Of Sales",
  creator: "Gede Dewo Wahyu M.W",
  publisher: "Gede Dewo Wahyu M.W",
  referrer: "strict-origin-when-cross-origin",
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
