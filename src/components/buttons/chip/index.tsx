import { cn } from "@/libs";
import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, FC, ReactElement, ReactNode } from "react";

const ChipCVA = cva("flex items-center justify-center rounded-full border", {
  variants: {
    status: {
      default: "border-N2 hover:border-P5 hover:bg-P5 hover:text-N1 active:scale-95 active:border-P6 active:bg-P6 active:text-N1",
      success: "cursor-default border-S1 bg-S1 text-S5",
      pending: "cursor-default border-W1 bg-W1 text-W5",
      canceled: "cursor-default border-E1 bg-E1 text-E5",
      selected: "cursor-default border-P6 bg-P6 text-N1",
      disabled: "cursor-not-allowed border-N3 bg-N2 text-N3",
    },

    size: {
      sm: "h-fit w-fit gap-1 px-3 py-2 text-sm",
      "sm-status": "h-7 w-24 gap-1 text-xs",
      md: "h-fit w-fit gap-1 px-4 py-2.5 text-base",
      "md-status": "h-10 w-28 gap-1 text-sm",
      lg: "h-fit w-fit gap-2 px-5 py-3 text-lg",
      xl: "h-fit w-fit gap-2 px-6 py-3.5 text-xl",
      "2xl": "h-fit w-fit gap-2 px-7 py-4 text-2xl",
      "3xl": "h-fit w-fit gap-2 px-8 py-5 text-3xl",
    },
  },

  defaultVariants: {
    size: "md",
  },
});

interface I extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof ChipCVA> {
  startIcon?: ReactNode;
  label: string;
  endIcon?: ReactNode;
}

export const Chip: FC<I> = ({ status, size, startIcon, label, endIcon, className, ...props }): ReactElement => {
  return (
    <button type="button" className={cn(ChipCVA({ status, size, className }))} {...props}>
      {startIcon}
      <span className="font-semibold">{label}</span>
      {endIcon}
    </button>
  );
};
