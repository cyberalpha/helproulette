
import { cn } from "@/lib/utils";
import React from "react";

interface BettingOptionProps {
  label: string;
  type: string;
  value: string;
  highlighted?: boolean;
  onClick: (type: string, value: string) => void;
  className?: string;
}

const BettingOption = ({
  label,
  type,
  value,
  highlighted = false,
  onClick,
  className
}: BettingOptionProps) => {
  return (
    <div 
      className={cn(
        "bg-gradient-to-br from-roulette-green to-green-700 border border-white/60 text-white text-center font-bold cursor-pointer hover:bg-roulette-green/80 flex items-center justify-center rounded-xl shadow-md hover:scale-[1.03] active:scale-[0.97] transition-all",
        highlighted ? "ring-2 ring-white animate-pulse-light" : "",
        className
      )}
      onClick={() => onClick(type, value)}
    >
      {label}
    </div>
  );
};

export default BettingOption;
