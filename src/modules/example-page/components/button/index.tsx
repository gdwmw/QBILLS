import { Button, ButtonCVA } from "@/components";
import { type VariantProps } from "class-variance-authority";
import { FC, ReactElement } from "react";
import { FaPlus } from "react-icons/fa";

const colors = ["default", "black", "white", "green", "blue", "yellow", "red", "disabled"];
const sizes = ["sm", "md", "lg", "xl", "2xl", "3xl"];
const ghostSizes = ["text-sm", "text-base", "text-lg", "text-xl", "text-2xl", "text-3xl"];

export const ExampleButton: FC = (): ReactElement => {
  return (
    <section className="space-y-5">
      {/* GHOST */}
      {ghostSizes.map((size) => (
        <div key={size} className="flex items-center justify-center gap-5">
          {colors.map((color) => (
            <div key={color} className={color === "white" ? "bg-N7 p-2" : ""}>
              <Button ghost={color as VariantProps<typeof ButtonCVA>["ghost"]} className={size} disabled={color === "disabled"}>
                <FaPlus />
                Button
                <FaPlus />
              </Button>
            </div>
          ))}
        </div>
      ))}

      {/* OUTLINE */}
      {sizes.map((size) => (
        <div key={size} className="flex items-center justify-center gap-5">
          {colors.map((color) => (
            <div key={color} className={color === "white" ? "bg-N7 p-2" : ""}>
              <Button
                outline={color as VariantProps<typeof ButtonCVA>["outline"]}
                size={size as VariantProps<typeof ButtonCVA>["size"]}
                disabled={color === "disabled"}
              >
                <FaPlus />
                Button
                <FaPlus />
              </Button>
            </div>
          ))}
        </div>
      ))}

      {/* SOLID */}
      {sizes.map((size) => (
        <div key={size} className="flex items-center justify-center gap-5">
          {colors.map((color) => (
            <div key={color} className={color === "white" ? "bg-N7 p-2" : ""}>
              <Button
                solid={color as VariantProps<typeof ButtonCVA>["solid"]}
                size={size as VariantProps<typeof ButtonCVA>["size"]}
                disabled={color === "disabled"}
              >
                <FaPlus />
                Button
                <FaPlus />
              </Button>
            </div>
          ))}
        </div>
      ))}

      {/* WIDTH FULL */}
      <div className="flex gap-5">
        <Button solid={"default"} size={"md"} widthFull>
          <FaPlus />
          Button
          <FaPlus />
        </Button>
        <Button solid={"green"} size={"md"} widthFull>
          <FaPlus />
          Button
          <FaPlus />
        </Button>
        <Button solid={"disabled"} size={"md"} widthFull disabled>
          <FaPlus />
          Button
          <FaPlus />
        </Button>
      </div>
    </section>
  );
};
