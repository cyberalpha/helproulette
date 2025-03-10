
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
    if (number === 0) return "bg-gradient-to-br from-roulette-green to-green-700 border border-white/60";
    
    // Números rojos según la imagen: 1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    
    return redNumbers.includes(number) 
      ? "bg-gradient-to-br from-roulette-red to-red-700 border border-white/60" 
      : "bg-gradient-to-br from-roulette-black to-gray-800 border border-white/60";
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
        "flex items-center justify-center cursor-pointer transition-all duration-300 shadow-md",
        "hover:scale-[1.03] active:scale-[0.97]", 
        getNumberColor(),
        number === 0 ? "w-[48px] h-[148px] rounded-xl" : "w-[48px] h-[48px] rounded-xl",
        highlighted && "ring-2 ring-yellow-400 ring-opacity-100 animate-pulse-light",
        animate && "scale-110 transition-transform",
        isLastResult && "ring-2 ring-white",
        className
      )}
      aria-label={`Número ${number}`}
    >
      <span className={cn("text-xl font-bold text-white")}>
        {number}
      </span>
    </div>
  );
};

export default RouletteNumber;
