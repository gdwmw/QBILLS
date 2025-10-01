import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, FC, ReactElement } from "react";

import { cn } from "@/libs";

export const IconButtonCVA = cva("flex select-none items-center justify-center rounded-xl border", {
  defaultVariants: {
    size: "sm",
  },

  variants: {
    outline: {
      black: "border-N7 text-N7 hover:bg-N7 hover:text-N1 active:scale-95 active:text-N1",
      blue: "border-I4 text-I4 hover:border-I5 hover:bg-I5 hover:text-N1 active:scale-95 active:border-I6 active:bg-I6 active:text-N1",
      default: "border-P4 text-P4 hover:border-P5 hover:bg-P5 hover:text-N1 active:scale-95 active:border-P6 active:bg-P6 active:text-N1",
      disabled: "cursor-not-allowed border-N3 text-N4",
      green: "border-S4 text-S4 hover:border-S5 hover:bg-S5 hover:text-N1  active:scale-95 active:border-S6 active:bg-S6 active:text-N1",
      red: "border-E4 text-E4 hover:border-E5 hover:bg-E5 hover:text-N1 active:scale-95 active:border-E6 active:bg-E6 active:text-N1",
      white: "border-N1 text-N1 hover:bg-N1 hover:text-N7 active:scale-95 active:text-N7",
      yellow: "border-W4 text-W4 hover:border-W5 hover:bg-W5 hover:text-N1 active:scale-95 active:border-W6 active:bg-W6 active:text-N1",
    },

    size: {
      "2xl": "size-fit p-3.5",
      "3xl": "size-fit p-4",
      lg: "size-fit p-2.5",
      md: "size-fit p-2",
      sm: "size-fit p-1.5",
      xl: "size-fit p-3",
    },

    solid: {
      black: "border-N7 bg-N7 text-N1 active:scale-95",
      blue: "border-I4 bg-I4 text-N1 hover:border-I5 hover:bg-I5 active:scale-95 active:border-I6 active:bg-I6",
      default: "border-P4 bg-P4 text-N1 hover:border-P5 hover:bg-P5 active:scale-95 active:border-P6 active:bg-P6",
      disabled: "cursor-not-allowed border-N3 bg-N2 text-N4",
      green: "border-S4 bg-S4 text-N1 hover:border-S5 hover:bg-S5 active:scale-95 active:border-S6 active:bg-S6",
      red: "border-E4 bg-E4 text-N1 hover:border-E5 hover:bg-E5 active:scale-95 active:border-E6 active:bg-E6",
      white: "border-N1 bg-N1 text-N7 active:scale-95",
      yellow: "border-W4 bg-W4 text-N1 hover:border-W5 hover:bg-W5 active:scale-95 active:border-W6 active:bg-W6",
    },
  },
});

interface I extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof IconButtonCVA> {}

export const IconButton: FC<I> = ({ children, className, outline, size, solid, ...props }): ReactElement => {
  return (
    <button className={cn(IconButtonCVA({ className, outline, size, solid }))} type="button" {...props}>
      {children}
    </button>
  );
};
