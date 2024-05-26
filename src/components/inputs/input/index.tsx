import { FC, forwardRef, InputHTMLAttributes, ReactElement, ReactNode } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/libs";

const InputFieldsetCVA = cva("group w-full overflow-hidden rounded-md border-2 px-1 pb-2", {
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

const InputLegendCVA = cva("ml-3 select-none px-1 text-xs whitespace-nowrap font-semibold", {
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

const InputIconCVA = cva("mx-1", {
  defaultVariants: {
    variant: "default",
  },
  variants: {
    variant: {
      default: "text-N3 hover:text-P4 active:scale-95 group-focus-within:text-P5",
      disabled: "text-N4 cursor-not-allowed",
      error: "text-E4 active:scale-95",
    },
  },
});

interface I extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof InputFieldsetCVA> {
  errorMessage?: string;
  icon?: ReactNode;
  iconOnClick?: () => void;
  label?: string;
}

export const Input: FC<I> = forwardRef<HTMLInputElement, I>(({ errorMessage, icon, iconOnClick, label, variant, ...props }, ref): ReactElement => {
  return (
    <section className="space-y-1">
      <fieldset className={cn(InputFieldsetCVA({ variant }))}>
        <legend className={cn(InputLegendCVA({ variant }))}>{label}</legend>

        <div className="flex items-center justify-center">
          <input className="w-full rounded-sm bg-transparent px-1 outline-none disabled:cursor-not-allowed" ref={ref} {...props} />

          {icon && (
            <button className={cn(InputIconCVA({ variant }))} disabled={variant === "disabled"} onClick={iconOnClick} type="button">
              {icon}
            </button>
          )}
        </div>
      </fieldset>

      {errorMessage && <span className="ml-1 text-xs text-E4">{errorMessage}</span>}
    </section>
  );
});

Input.displayName = "Input";
