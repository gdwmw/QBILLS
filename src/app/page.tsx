import { FC, ReactElement } from "react";

import { getServerSession } from "next-auth/next";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { Footer, Header, Main } from "@/modules/landing-page";

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
