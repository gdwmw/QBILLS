import { cn } from "@/libs/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { FC, InputHTMLAttributes, ReactElement, ReactNode } from "react";

const InputFieldsetCVA = cva("group w-full overflow-hidden rounded-md border-2 px-1 pb-2", {
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

const InputLegendCVA = cva("ml-3 select-none px-1 text-xs font-semibold", {
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

const InputIconCVA = cva("mx-1", {
  variants: {
    variant: {
      default: "text-N3 hover:text-P4 active:scale-95 group-focus-within:text-P5",
      error: "text-E4 active:scale-95",
      disabled: "text-N4 cursor-not-allowed",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface I extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof InputFieldsetCVA> {
  label?: string;
  icon?: ReactNode;
  iconOnClick?: () => void;
}

export const Input: FC<I> = ({ label, icon, iconOnClick, variant, ...props }): ReactElement => {
  return (
    <fieldset className={cn(InputFieldsetCVA({ variant }))}>
      <legend className={cn(InputLegendCVA({ variant }))}>{label}</legend>
      <div className="flex items-center justify-center">
        <input className="w-full rounded-sm bg-transparent px-1 outline-none disabled:cursor-not-allowed" {...props} />
        {icon && (
          <button type="button" onClick={iconOnClick} className={cn(InputIconCVA({ variant }))} disabled={variant === "disabled"}>
            {icon}
          </button>
        )}
      </div>
    </fieldset>
  );
};
