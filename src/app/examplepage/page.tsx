import { ExampleButton } from "@/modules/example-page/components";
import { FC, ReactElement } from "react";

type T = {};

const ExamplePage: FC<T> = (): ReactElement => {
  return (
    <main className="p-5">
      <ExampleButton />
    </main>
  );
};

export default ExamplePage;
