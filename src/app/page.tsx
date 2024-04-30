import { options } from "@/app/api/auth/[...nextauth]/options";
import { Footer, Header, Main } from "@/modules/landing-page";
import { getServerSession } from "next-auth/next";
import { FC, ReactElement } from "react";

const LandingPage: FC = async (): Promise<ReactElement> => {
  const session = await getServerSession(options);

  return (
    <>
      <Header authenticated={session?.user?.name} />
      <Main />
      <Footer />
    </>
  );
};

export default LandingPage;
