import { FC, forwardRef, ReactElement, ReactNode, SelectHTMLAttributes } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/libs";

const SelectFieldsetCVA = cva("group w-full overflow-hidden rounded-md border-2 px-1 pb-[10px]", {
  defaultVariants: {
    variant: "default",
  },
  variants: {
    variant: {
      default: "border-N2 focus-within:border-P4",
      disabled: "border-N3 bg-N2",
      error: "border-E4",
    },
  },
});

const SelectLegendCVA = cva("ml-3 select-none px-1 text-xs whitespace-nowrap font-semibold", {
  defaultVariants: {
    variant: "default",
  },
  variants: {
    variant: {
      default: "text-N3 group-focus-within:text-P5",
      disabled: "text-N4",
      error: "text-E4",
    },
  },
});

interface I extends SelectHTMLAttributes<HTMLSelectElement>, VariantProps<typeof SelectFieldsetCVA> {
  children: ReactNode;
  errorMessage?: string;
  label?: string;
}

export const Select: FC<I> = forwardRef<HTMLSelectElement, I>(({ children, errorMessage, label, variant, ...props }, ref): ReactElement => {
  return (
    <section className="space-y-1">
      <fieldset className={cn(SelectFieldsetCVA({ variant }))}>
        <legend className={cn(SelectLegendCVA({ variant }))}>{label}</legend>
        <select className="w-full cursor-pointer rounded-sm bg-transparent px-1 outline-none disabled:cursor-not-allowed" ref={ref} {...props}>
          {children}
        </select>
      </fieldset>
      {errorMessage && <span className="ml-1 text-xs text-E4">{errorMessage}</span>}
    </section>
  );
});

Select.displayName = "Select";
