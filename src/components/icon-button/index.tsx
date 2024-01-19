import { cn } from "@/libs/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, FC, ReactElement } from "react";

const IconButtonCVA = cva("flex items-center justify-center rounded-xl border", {
  variants: {
    solid: {
      default: "border-P4 bg-P4 text-N1 hover:border-P5 hover:bg-P5 active:scale-95 active:border-P6 active:bg-P6",
      black: "border-N7 bg-N7 text-N1 active:scale-95",
      white: "border-N1 bg-N1 text-N7 active:scale-95",
      green: "border-S4 bg-S4 text-N1 hover:border-S5 hover:bg-S5 active:scale-95 active:border-S6 active:bg-S6",
      blue: "border-I4 bg-I4 text-N1 hover:border-I5 hover:bg-I5 active:scale-95 active:border-I6 active:bg-I6",
      yellow: "border-W4 bg-W4 text-N1 hover:border-W5 hover:bg-W5 active:scale-95 active:border-W6 active:bg-W6",
      red: "border-E4 bg-E4 text-N1 hover:border-E5 hover:bg-E5 active:scale-95 active:border-E6 active:bg-E6",
      disabled: "border-N3 bg-N2 text-N3 cursor-not-allowed",
    },

    outline: {
      default: "border-P4 text-P4 hover:border-P5 hover:bg-P5 hover:text-N1 active:scale-95 active:border-P6 active:bg-P6 active:text-N1",
      black: "border-N7 text-N7 hover:bg-N7 hover:text-N1 active:scale-95 active:text-N1",
      white: "border-N1 text-N1 hover:bg-N1 hover:text-N7 active:scale-95 active:text-N7",
      green: "border-S4 text-S4 hover:border-S5 hover:bg-S5 hover:text-N1  active:scale-95 active:border-S6 active:bg-S6 active:text-N1",
      blue: "border-I4 text-I4 hover:border-I5 hover:bg-I5 hover:text-N1 active:scale-95 active:border-I6 active:bg-I6 active:text-N1",
      yellow: "border-W4 text-W4 hover:border-W5 hover:bg-W5 hover:text-N1 active:scale-95 active:border-W6 active:bg-W6 active:text-N1",
      red: "border-E4 text-E4 hover:border-E5 hover:bg-E5 hover:text-N1 active:scale-95 active:border-E6 active:bg-E6 active:text-N1",
      disabled: "border-N3 text-N3 cursor-not-allowed",
    },

    size: {
      sm: "h-fit w-fit p-1.5",
      md: "h-fit w-fit p-2",
      lg: "h-fit w-fit p-2.5",
      xl: "h-fit w-fit p-3",
      "2xl": "h-fit w-fit p-3.5",
      "3xl": "h-fit w-fit p-4",
    },
  },

  defaultVariants: {
    size: "md",
  },
});

interface I extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof IconButtonCVA> {}

const IconButton: FC<I> = ({ solid, outline, size, className, children, ...props }): ReactElement => {
  return (
    <button type="button" className={cn(IconButtonCVA({ solid, outline, size, className }))} {...props}>
      {children}
    </button>
  );
};

export { IconButton, IconButtonCVA };
