import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

interface ProgressProps {
  value: number;
  max?: number;
}

const ProgressBar: React.FC<ProgressProps> = ({ value, max = 100 }) => {
  return (
    <ProgressPrimitive.Root className="relative h-2 w-40 overflow-hidden rounded-full bg-gray-200">
      <ProgressPrimitive.Indicator
        className="h-full bg-primary transition-all"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </ProgressPrimitive.Root>
  );
};

export default ProgressBar;
