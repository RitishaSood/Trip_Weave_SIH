"use client";

import * as React from "react";
import { Button, type ButtonProps } from "./button";
import { cn } from "@/lib/utils";

// adds a badge/tag to the button without touching the original Button
export interface TaggedButtonProps extends ButtonProps {
  tag?: string; // optional badge text (e.g. "ON", "OFF", "NEW")
}

const TaggedButton = React.forwardRef<HTMLButtonElement, TaggedButtonProps>(
  ({ className, tag = "NEW", ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "relative",
          className,
          // 🔴 badge in top-right corner
          `after:absolute after:-top-2 after:-right-2 after:bg-red-500 
           after:text-white after:text-xs after:px-2 after:py-0.5 
           after:rounded-full after:content-['${tag}']`
        )}
        {...props}
      />
    );
  }
);
TaggedButton.displayName = "TaggedButton";

export { TaggedButton };
