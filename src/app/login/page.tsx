import { Metadata, Viewport } from "next";
import { FC, ReactElement } from "react";

import { Main } from "@/modules/login";

export const viewport: Viewport = {
  initialScale: 0.8,
  width: "device-width",
};

export const metadata: Metadata = {
  title: "Login",
};

const Login: FC = (): ReactElement => {
  return <Main />;
};

export default Login;
