import { cn } from "@/libs/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, FC, ReactElement } from "react";

const ButtonCVA = cva("flex items-center justify-center rounded-lg border", {
  variants: {
    solid: {
      default: "border-P4 bg-P4 text-N1 hover:border-P5 hover:bg-P5 active:border-P6 active:bg-P6 active:scale-95",
      black: "border-N7 bg-N7 text-N1 active:scale-95",
      white: "border-N1 bg-N1 text-N7 active:scale-95",
      green: "border-S4 bg-S4 text-N1 hover:border-S5 hover:bg-S5 active:border-S6 active:bg-S6 active:scale-95",
      blue: "border-I4 bg-I4 text-N1 hover:border-I5 hover:bg-I5 active:border-I6 active:bg-I6 active:scale-95",
      yellow: "border-W4 bg-W4 text-N1 hover:border-W5 hover:bg-W5 active:border-W6 active:bg-W6 active:scale-95",
      red: "border-E4 bg-E4 text-N1 hover:border-E5 hover:bg-E5 active:border-E6 active:bg-E6 active:scale-95",
      disabled: "border-N3 bg-N2 text-N3 cursor-not-allowed",
    },

    outline: {
      default: "border-P4 text-P4 hover:border-P5 hover:bg-P5 hover:text-N1 active:scale-95 active:border-P6 active:bg-P6 active:text-N1",
      black: "border-N7 text-N7 hover:bg-N7 hover:text-N1 active:scale-95",
      white: "border-N1 text-N1 hover:bg-N1 hover:text-N7 active:scale-95",
      green: "border-S4 text-S4 hover:border-S5 hover:bg-S5 hover:text-N1 active:scale-95 active:border-S6 active:bg-S6 active:text-N1",
      blue: "border-I4 text-I4 hover:border-I5 hover:bg-I5 hover:text-N1 active:scale-95 active:border-I6 active:bg-I6 active:text-N1",
      yellow: "border-W4 text-W4 hover:border-W5 hover:bg-W5 hover:text-N1 active:scale-95 active:border-W6 active:bg-W6 active:text-N1",
      red: "border-E4 text-E4 hover:border-E5 hover:bg-E5 hover:text-N1 active:scale-95 active:border-E6 active:bg-E6 active:text-N1",
      disabled: "border-N3 text-N3 cursor-not-allowed",
    },

    size: {
      sm: "h-fit gap-1 px-3 py-2 text-sm",
      md: "h-fit gap-1 px-4 py-2.5 text-base",
      lg: "h-fit gap-2 px-5 py-3 text-lg",
      xl: "h-fit gap-2 px-6 py-3.5 text-xl",
      "2xl": "h-fit gap-2 px-7 py-4 text-2xl",
      "3xl": "h-fit gap-2 px-8 py-5 text-3xl",
    },

    widthFull: {
      true: "w-full",
      false: "w-fit",
    },
  },

  defaultVariants: {
    size: "sm",
    widthFull: false,
  },
});

type T = {
  className?: string;
  children?: ReactElement | string;
  solid?: VariantProps<typeof ButtonCVA>["solid"];
  outline?: VariantProps<typeof ButtonCVA>["outline"];
  size?: VariantProps<typeof ButtonCVA>["size"];
  widthFull?: VariantProps<typeof ButtonCVA>["widthFull"];
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<T> = ({ solid, outline, size, widthFull, className, children, ...props }): ReactElement => {
  return (
    <button className={cn(ButtonCVA({ solid, outline, size, widthFull, className }))} {...props}>
      {children}
    </button>
  );
};

export { Button, ButtonCVA };
