import { ExampleButton } from "@/modules/example-page/components";
import { FC, ReactElement } from "react";

const ExamplePage: FC = (): ReactElement => {
  return (
    <main className="p-5">
      <ExampleButton />
    </main>
  );
};

export default ExamplePage;
