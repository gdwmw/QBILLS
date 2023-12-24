import { FC, ReactElement } from "react";
import { Button, ButtonCVA } from "@/components";
import { type VariantProps } from "class-variance-authority";

type T = {};

const sizes = ["sm", "md", "lg", "xl", "2xl", "3xl"];
const colors = ["default", "black", "white", "green", "blue", "yellow", "red", "disabled"];

export const ExampleButton: FC<T> = (): ReactElement => {
  return (
    <section className="space-y-5">
      {sizes.map((size) => (
        <div key={size} className="flex items-center justify-center gap-5">
          {colors.map((color) => (
            <div key={color} className={color === "white" ? "bg-N7 p-2" : ""}>
              <Button
                solid={color as VariantProps<typeof ButtonCVA>["solid"]}
                size={size as VariantProps<typeof ButtonCVA>["size"]}
                disabled={color === "disabled"}
              >
                Button
              </Button>
            </div>
          ))}
        </div>
      ))}

      {sizes.map((size) => (
        <div key={size} className="flex items-center justify-center gap-5">
          {colors.map((color) => (
            <div key={color} className={color === "white" ? "bg-N7 p-2" : ""}>
              <Button
                outline={color as VariantProps<typeof ButtonCVA>["outline"]}
                size={size as VariantProps<typeof ButtonCVA>["size"]}
                disabled={color === "disabled"}
              >
                Button
              </Button>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};
