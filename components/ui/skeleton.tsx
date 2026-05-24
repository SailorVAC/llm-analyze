import * as React from "react";
import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-shimmer rounded-md bg-[linear-gradient(110deg,rgba(255,255,255,0.04)_8%,rgba(255,255,255,0.1)_18%,rgba(255,255,255,0.04)_33%)] bg-[length:1000px_100%]",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
