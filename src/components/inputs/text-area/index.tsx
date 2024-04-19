import { cn } from "@/libs";
import { cva, type VariantProps } from "class-variance-authority";
import { FC, ReactElement, TextareaHTMLAttributes, forwardRef } from "react";

const TextAreaFieldsetCVA = cva("group w-full overflow-hidden rounded-md border-2 px-1 pb-2", {
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

const TextAreaLegendCVA = cva("ml-3 select-none px-1 text-xs whitespace-nowrap font-semibold", {
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

interface I extends TextareaHTMLAttributes<HTMLTextAreaElement>, VariantProps<typeof TextAreaFieldsetCVA> {
  label?: string;
  errorMessage?: string;
}

export const TextArea: FC<I> = forwardRef<HTMLTextAreaElement, I>(({ label, errorMessage, variant, className, ...props }, ref): ReactElement => {
  return (
    <section className="space-y-1">
      <fieldset className={cn(TextAreaFieldsetCVA({ variant }))}>
        <legend className={cn(TextAreaLegendCVA({ variant }))}>{label}</legend>
        <textarea ref={ref} className={`w-full rounded-sm bg-transparent px-1 outline-none disabled:cursor-not-allowed ${className}`} {...props} />
      </fieldset>
      {errorMessage && <span className="ml-1 text-xs text-E4">{errorMessage}</span>}
    </section>
  );
});

TextArea.displayName = "TextArea";
