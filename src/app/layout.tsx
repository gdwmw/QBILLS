import { NextAuthProvider, ReactQueryProvider } from "@/libs";
import "@/styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Open_Sans } from "next/font/google";
import { FC, ReactElement, ReactNode } from "react";

const openSans = Open_Sans({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 0.8,
};

export const metadata: Metadata = {
  title: "QBills | Landing Page",
  description:
    "Elevate your sales strategy and delight customers with our state-of-the-art POS application, offering a seamless and user-friendly interface for enhanced transactions. Qbills is here to be a solution for your business, features are available to make your work easier, use it now.",
};

type T = {
  children: ReactNode;
};

const RootLayout: FC<T> = ({ children }): ReactElement => {
  console.log("© 2023 QBILLS. All rights reserved.");
  console.log("Created by Gede Dewo Wahyu M.W with 🖤");
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body className={openSans.className}>
          <NextAuthProvider>{children}</NextAuthProvider>
          <SpeedInsights />
        </body>
      </html>
    </ReactQueryProvider>
  );
};

export default RootLayout;
