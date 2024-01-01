import { Footer, Header, Main } from "@/modules/landing-page";
import { FC, ReactElement } from "react";

const LandingPage: FC = (): ReactElement => {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
};

export default LandingPage;
