import { ExampleButton, ExampleIconButton } from "@/modules/example-page/components";
import { FC, ReactElement } from "react";

const ExamplePage: FC = (): ReactElement => {
  return (
    <main className="space-y-5 p-5">
      <ExampleIconButton />
      <ExampleButton />
    </main>
  );
};

export default ExamplePage;
