import { IconButton, IconButtonCVA } from "@/components";
import { type VariantProps } from "class-variance-authority";
import { FC, ReactElement } from "react";
import { FaPlus } from "react-icons/fa";

const colors = ["default", "black", "white", "green", "blue", "yellow", "red", "disabled"];
const sizes = ["sm", "md", "lg", "xl", "2xl", "3xl"];

export const ExampleIconButton: FC = (): ReactElement => {
  return (
    <section className="space-y-5">
      {/* OUTLINE */}
      {sizes.map((size) => (
        <div key={size} className="flex items-center justify-center gap-5">
          {colors.map((color) => (
            <div key={color} className={color === "white" ? "bg-N7 p-2" : ""}>
              <IconButton
                outline={color as VariantProps<typeof IconButtonCVA>["outline"]}
                size={size as VariantProps<typeof IconButtonCVA>["size"]}
                disabled={color === "disabled"}
              >
                <FaPlus />
              </IconButton>
            </div>
          ))}
        </div>
      ))}

      {/* SOLID */}
      {sizes.map((size) => (
        <div key={size} className="flex items-center justify-center gap-5">
          {colors.map((color) => (
            <div key={color} className={color === "white" ? "bg-N7 p-2" : ""}>
              <IconButton
                solid={color as VariantProps<typeof IconButtonCVA>["solid"]}
                size={size as VariantProps<typeof IconButtonCVA>["size"]}
                disabled={color === "disabled"}
              >
                <FaPlus />
              </IconButton>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};
