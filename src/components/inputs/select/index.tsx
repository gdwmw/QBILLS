import { cn } from "@/libs";
import { cva, type VariantProps } from "class-variance-authority";
import { FC, SelectHTMLAttributes, ReactElement, ReactNode, forwardRef } from "react";

const SelectFieldsetCVA = cva("group w-full overflow-hidden rounded-md border-2 px-1 pb-2", {
  variants: {
    variant: {
      default: "border-N2 focus-within:border-P4",
      error: "border-E4",
      disabled: "border-N3 bg-N2",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const SelectLegendCVA = cva("ml-3 select-none px-1 text-xs whitespace-nowrap font-semibold", {
  variants: {
    variant: {
      default: "text-N3 group-focus-within:text-P5",
      error: "text-E4",
      disabled: "text-N4",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface I extends SelectHTMLAttributes<HTMLSelectElement>, VariantProps<typeof SelectFieldsetCVA> {
  label?: string;
  children: ReactNode;
  errorMessage?: string;
}

export const Select: FC<I> = forwardRef<HTMLSelectElement, I>(({ label, children, errorMessage, variant, ...props }, ref): ReactElement => {
  return (
    <section className="space-y-1">
      <fieldset className={cn(SelectFieldsetCVA({ variant }))}>
        <legend className={cn(SelectLegendCVA({ variant }))}>{label}</legend>
        <select ref={ref} className="w-full cursor-pointer rounded-sm bg-transparent px-1 outline-none disabled:cursor-not-allowed" {...props}>
          {children}
        </select>
      </fieldset>
      {errorMessage && <span className="ml-1 text-xs text-E4">{errorMessage}</span>}
    </section>
  );
});

Select.displayName = "Select";
