import * as React from "react";
import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: number;
    max?: number;
  }
>(({ className, value = 0, max = 100, ...props }, ref) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  return (
    <div
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-gray-200",
        className
      )}
      {...props}
    >
      <div
        className="absolute left-0 top-0 h-full bg-indigo-600 transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
});
Progress.displayName = "Progress";

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  label?: string;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, value, max = 100, label, ...props }, ref) => {
    return (
      <div className={cn("w-full", className)} ref={ref} {...props}>
        <div className="flex justify-between mb-1">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          <span className="text-sm font-medium text-indigo-700">
            {Math.round((value / max) * 100)}%
          </span>
        </div>
        <Progress value={value} max={max} />
      </div>
    );
  }
);
ProgressBar.displayName = "ProgressBar";

export { Progress, ProgressBar };
