import { FC, ReactElement } from "react";

import { Navbar } from "./section";

type T = {
  authStatus: boolean | null;
};

export const Header: FC<T> = ({ authStatus }): ReactElement => {
  return (
    <header>
      <Navbar authStatus={authStatus} />
    </header>
  );
};
