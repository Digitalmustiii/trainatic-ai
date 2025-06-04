// src/components/ui/badge.tsx
"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from "react";
import { Slot } from "@radix-ui/react-slot";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold transition-all",
  {
    variants: {
      variant: {
        default: "bg-gray-200 text-gray-800",
        primary: "bg-cyan-400/20 text-cyan-400",
        destructive: "bg-red-400/20 text-red-400",
      },
      size: {
        sm: "px-1 py-0.5 text-xs",
        md: "px-2 py-0.5 text-sm",
        lg: "px-3 py-1 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends ComponentPropsWithoutRef<"span">,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

const Badge = forwardRef<ElementRef<"span">, BadgeProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span";
    return (
      <Comp
        className={badgeVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
