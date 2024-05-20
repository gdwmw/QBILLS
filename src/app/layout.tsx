import type { Metadata, Viewport } from "next";

import { FC, ReactElement, ReactNode } from "react";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Open_Sans } from "next/font/google";

import { NextAuthProvider, ReactQueryProvider } from "@/libs";

import "@/styles/globals.css";

const openSans = Open_Sans({ subsets: ["latin"] });

export const viewport: Viewport = {
  initialScale: 0.8,
  width: "device-width",
};

export const metadata: Metadata = {
  description:
    "Elevate your sales strategy and delight customers with our state-of-the-art POS application, offering a seamless and user-friendly interface for enhanced transactions. QBILLS is here to be a solution for your business, features are available to make your work easier, use it now.",
  title: {
    default: "QBILLS | Landing Page",
    template: "QBILLS | %s",
  },
};

type T = {
  children: ReactNode;
};

const RootLayout: FC<T> = ({ children }): ReactElement => {
  console.log("© 2023 QBILLS. All rights reserved.");
  console.log("Created by Gede Dewo Wahyu M.W with 🖤");
  return (
    <ReactQueryProvider>
      <html className="scroll-smooth" lang="en">
        <body className={openSans.className}>
          <NextAuthProvider>{children}</NextAuthProvider>
          <SpeedInsights />
        </body>
      </html>
    </ReactQueryProvider>
  );
};

export default RootLayout;
