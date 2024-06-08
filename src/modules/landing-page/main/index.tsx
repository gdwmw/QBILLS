import { FC, ReactElement } from "react";

import { Copyright } from "@/components";

import { About, FAQ, Features, GetApp, Hero } from "./section";

export const Main: FC = (): ReactElement => {
  return (
    <main>
      <Hero />
      <About />
      <Features />
      <FAQ />
      <GetApp />
      <Copyright />
    </main>
  );
};
