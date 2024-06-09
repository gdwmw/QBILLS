import { ButtonHTMLAttributes, FC, ReactElement, ReactNode } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/libs";

export const ChipCVA = cva("flex items-center justify-center rounded-full border", {
  defaultVariants: {
    size: "md",
  },

  variants: {
    size: {
      "2xl": "size-fit gap-2 px-7 py-4 text-2xl",
      "3xl": "size-fit gap-2 px-8 py-5 text-3xl",
      lg: "size-fit gap-2 px-5 py-3 text-lg",
      md: "size-fit gap-1 px-4 py-2.5 text-base",
      "md-status": "h-10 w-28 gap-1 text-sm",
      sm: "size-fit gap-1 px-3 py-2 text-sm",
      "sm-status": "h-7 w-24 gap-1 text-xs",
      xl: "size-fit gap-2 px-6 py-3.5 text-xl",
    },

    status: {
      canceled: "cursor-default border-E1 bg-E1 text-E5",
      default: "border-N2 hover:border-P5 hover:bg-P5 hover:text-N1 active:scale-95 active:border-P6 active:bg-P6 active:text-N1",
      disabled: "cursor-not-allowed border-N3 bg-N2 text-N3",
      pending: "cursor-default border-W1 bg-W1 text-W5",
      selected: "cursor-default border-P6 bg-P6 text-N1",
      success: "cursor-default border-S1 bg-S1 text-S5",
    },
  },
});

interface I extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof ChipCVA> {
  endIcon?: ReactNode;
  label: string;
  startIcon?: ReactNode;
}

export const ChipButton: FC<I> = ({ className, endIcon, label, size, startIcon, status, ...props }): ReactElement => {
  return (
    <button className={cn(ChipCVA({ className, size, status }))} type="button" {...props}>
      {startIcon}
      <span className="font-semibold">{label}</span>
      {endIcon}
    </button>
  );
};
