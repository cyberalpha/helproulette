
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface RouletteNumberProps {
  number: number;
  onClick: (number: number) => void;
  highlighted?: boolean;
  isLastResult?: boolean;
  className?: string;
}

const RouletteNumber = ({
  number,
  onClick,
  highlighted = false,
  isLastResult = false,
  className,
}: RouletteNumberProps) => {
  const [animate, setAnimate] = useState(false);

  // Determinar el color del número
  const getNumberColor = () => {
    if (number === 0) return "number-button-green";
    return number % 2 === 0 ? "number-button-black" : "number-button-red";
  };

  useEffect(() => {
    if (isLastResult) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isLastResult]);

  return (
    <div
      onClick={() => onClick(number)}
      className={cn(
        "number-button",
        getNumberColor(),
        number === 0 ? "rounded-full w-14 h-14" : "rounded-full w-12 h-12",
        highlighted && "highlighted",
        animate && "animate-pulse-light",
        isLastResult && "ring-2 ring-white",
        className
      )}
      aria-label={`Número ${number}`}
    >
      <span className={cn("text-lg font-medium", animate && "scale-110 transition-transform")}>
        {number}
      </span>
    </div>
  );
};

export default RouletteNumber;
