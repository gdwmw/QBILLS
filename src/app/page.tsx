import { Metadata, Viewport } from "next";
import { getServerSession } from "next-auth/next";
import { FC, ReactElement } from "react";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { Footer, Header, Main } from "@/modules/landing-page";

export const viewport: Viewport = {
  initialScale: 0.8,
  width: "device-width",
};

export const metadata: Metadata = {
  description: "Boost Your Sales with Our Point of Sales App",
  keywords: ["qbills"],
  openGraph: {
    description: "Boost Your Sales with Our Point of Sales App",
    images: [
      {
        alt: "QBILLS",
        height: 800,
        url: "https://qbills.zettara.com/assets/images/logos/qbills.png", // Must be an absolute URL and PNG format
        width: 800,
      },
    ],
    locale: "en_US",
    siteName: "QBILLS",
    title: "QBILLS | Landing Page",
    type: "website",
    url: "https://qbills.zettara.com/",
  },
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
      noimageindex: false,
    },
    index: true,
    nocache: false,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@gdwmw",
    description: "Boost Your Sales with Our Point of Sales App",
    images: ["https://qbills.zettara.com/assets/images/logos/qbills.png"], // Must be an absolute URL and PNG format
    title: "QBILLS | Landing Page",
  },
};

const LandingPage: FC = async (): Promise<ReactElement> => {
  const session = await getServerSession(options);

  return (
    <>
      <Header authStatus={session !== null} />
      <Main />
      <Footer />
    </>
  );
};

export default LandingPage;
