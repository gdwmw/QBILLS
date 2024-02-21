import { cn } from "@/libs";
import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, FC, ReactElement } from "react";

const ButtonCVA = cva("flex items-center justify-center gap-2 select-none", {
  variants: {
    solid: {
      default: "rounded-lg border border-P4 bg-P4 text-N1 hover:border-P5 hover:bg-P5 active:scale-95 active:border-P6 active:bg-P6",
      black: "rounded-lg border border-N7 bg-N7 text-N1 active:scale-95",
      white: "rounded-lg border border-N1 bg-N1 text-N7 active:scale-95",
      green: "rounded-lg border border-S4 bg-S4 text-N1 hover:border-S5 hover:bg-S5 active:scale-95 active:border-S6 active:bg-S6",
      blue: "rounded-lg border border-I4 bg-I4 text-N1 hover:border-I5 hover:bg-I5 active:scale-95 active:border-I6 active:bg-I6",
      yellow: "rounded-lg border border-W4 bg-W4 text-N1 hover:border-W5 hover:bg-W5 active:scale-95 active:border-W6 active:bg-W6",
      red: "rounded-lg border border-E4 bg-E4 text-N1 hover:border-E5 hover:bg-E5 active:scale-95 active:border-E6 active:bg-E6",
      disabled: "cursor-not-allowed rounded-lg border border-N3 bg-N2 text-N4",
    },

    outline: {
      default:
        "rounded-lg border border-P4 text-P4 hover:border-P5 hover:bg-P5 hover:text-N1 active:scale-95 active:border-P6 active:bg-P6 active:text-N1",
      black: "rounded-lg border border-N7 text-N7 hover:bg-N7 hover:text-N1 active:scale-95 active:text-N1",
      white: "rounded-lg border border-N1 text-N1 hover:bg-N1 hover:text-N7 active:scale-95 active:text-N7",
      green:
        "rounded-lg border border-S4 text-S4 hover:border-S5 hover:bg-S5 hover:text-N1 active:scale-95 active:border-S6 active:bg-S6 active:text-N1",
      blue: "rounded-lg border border-I4 text-I4 hover:border-I5 hover:bg-I5 hover:text-N1 active:scale-95 active:border-I6 active:bg-I6 active:text-N1",
      yellow:
        "rounded-lg border border-W4 text-W4 hover:border-W5 hover:bg-W5 hover:text-N1 active:scale-95 active:border-W6 active:bg-W6 active:text-N1",
      red: "rounded-lg border border-E4 text-E4 hover:border-E5 hover:bg-E5 hover:text-N1 active:scale-95 active:border-E6 active:bg-E6 active:text-N1",
      disabled: "cursor-not-allowed rounded-lg border border-N4 text-N3",
    },

    ghost: {
      default: "text-P4 hover:text-P5 active:scale-95 active:text-P6",
      black: "text-N7 active:scale-95",
      white: "text-N1 active:scale-95",
      green: "text-S4 hover:text-S5 active:scale-95 active:text-S6",
      blue: "text-I4 hover:text-I5 active:scale-95 active:text-I6",
      yellow: "text-W4 hover:text-W5 active:scale-95 active:text-W6",
      red: "text-E4 hover:text-E5 active:scale-95 active:text-E6",
      disabled: "cursor-not-allowed text-N4",
    },

    size: {
      sm: "h-fit px-3 py-2 text-sm",
      md: "h-fit px-4 py-2.5 text-base",
      lg: "h-fit px-5 py-3 text-lg",
      xl: "h-fit px-6 py-3.5 text-xl",
      "2xl": "h-fit px-7 py-4 text-2xl",
      "3xl": "h-fit px-8 py-5 text-3xl",
    },

    widthFull: {
      true: "w-full",
      false: "w-fit",
    },
  },

  defaultVariants: {
    widthFull: false,
  },
});

interface I extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof ButtonCVA> {}

const Button: FC<I> = ({ solid, outline, ghost, size, widthFull, className, children, ...props }): ReactElement => {
  return (
    <button className={cn(ButtonCVA({ solid, outline, ghost, size, widthFull, className }))} {...props}>
      {children}
    </button>
  );
};

export { Button, ButtonCVA };
