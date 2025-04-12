
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earned: boolean;
  earnedDate?: string;
}

interface BadgeDisplayProps {
  badge: Badge;
  size?: "sm" | "md" | "lg";
  showTooltip?: boolean;
  className?: string;
}

export function BadgeDisplay({
  badge,
  size = "md",
  showTooltip = true,
  className,
}: BadgeDisplayProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  return (
    <div
      className={cn("relative inline-block", className)}
      onMouseEnter={() => showTooltip && setIsTooltipVisible(true)}
      onMouseLeave={() => showTooltip && setIsTooltipVisible(false)}
    >
      <div
        className={cn(
          sizeClasses[size],
          "rounded-full flex items-center justify-center transition-all duration-300",
          badge.earned
            ? `bg-${badge.color} ${
                size === "lg" ? "badge-glow" : ""
              } text-white`
            : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 grayscale"
        )}
      >
        <span className={cn(
          size === "sm" ? "text-xs" : size === "md" ? "text-base" : "text-xl",
          "font-bold"
        )}>
          {badge.icon}
        </span>
      </div>
      
      {isTooltipVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 z-10 text-xs">
          <div className="font-bold mb-1">{badge.name}</div>
          <div className="text-gray-600 dark:text-gray-300">{badge.description}</div>
          {badge.earned && badge.earnedDate && (
            <div className="text-green-600 dark:text-green-400 mt-1 font-medium">
              Earned on {badge.earnedDate}
            </div>
          )}
          <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white dark:bg-gray-800"></div>
        </div>
      )}
    </div>
  );
}
