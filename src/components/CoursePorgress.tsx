import { cva, type VariantProps } from "class-variance-authority";
import { Progress } from "./ui/progress";
import { cn } from "@/lib/utils";

interface CoursePorgress {
  variant: "success" | "default";
  value: number | null;
  size?: "default" | "sm";
}

const colorByVairant = {
  default: "text-sky-700",
  success: "text-emerald-700",
};
const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
};

export default function CoursePorgress({
  variant,
  value,
  size,
}: CoursePorgress) {
  return (
    <div>
      <Progress className="h-2" value={value} variant={variant} />
      <p
        className={cn(
          "font-medium mt-2 text-sky-700",
          colorByVairant[variant || "default"],
          sizeByVariant[size || "default"]
        )}
      >
        {Math.round(value!)} % Complete
      </p>
    </div>
  );
}
