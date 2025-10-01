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
  description:
    "Elevate your sales strategy and delight customers with our state-of-the-art POS application, offering a seamless and user-friendly interface for enhanced transactions. QBILLS is here to be a solution for your business, features are available to make your work easier, use it now.",
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
