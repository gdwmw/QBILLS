import { FC, ReactElement } from "react";

import { Copyright } from "@/components";

import { About, FAQ, Features, GetApp, HeroSection } from "./components";

export const Main: FC = (): ReactElement => {
  return (
    <main>
      <HeroSection />
      <About />
      <Features />
      <FAQ />
      <GetApp />
      <Copyright />
    </main>
  );
};
