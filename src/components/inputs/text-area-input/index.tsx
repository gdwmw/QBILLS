import { FC, forwardRef, ReactElement, TextareaHTMLAttributes } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/libs";

const TextAreaFieldsetCVA = cva("group w-full overflow-hidden rounded-md border-2 px-1 pb-2", {
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

const TextAreaLegendCVA = cva("ml-3 select-none whitespace-nowrap px-1 text-xs font-semibold", {
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

interface I extends TextareaHTMLAttributes<HTMLTextAreaElement>, VariantProps<typeof TextAreaFieldsetCVA> {
  errorMessage?: string;
  label?: string;
}

export const TextAreaInput: FC<I> = forwardRef<HTMLTextAreaElement, I>(({ className, errorMessage, label, variant, ...props }, ref): ReactElement => {
  return (
    <section className="space-y-1">
      <fieldset className={cn(TextAreaFieldsetCVA({ variant }))}>
        <legend className={cn(TextAreaLegendCVA({ variant }))}>{label}</legend>

        <textarea className={`w-full rounded-sm bg-transparent px-1 outline-none disabled:cursor-not-allowed ${className}`} ref={ref} {...props} />
      </fieldset>

      {errorMessage && <span className="ml-1 text-xs text-E4">{errorMessage}</span>}
    </section>
  );
});

TextAreaInput.displayName = "TextAreaInput";
