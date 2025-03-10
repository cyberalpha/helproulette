
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
    if (number === 0) return "bg-roulette-green border-2 border-white";
    
    // Números rojos según la imagen: 1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    
    return redNumbers.includes(number) 
      ? "bg-roulette-red border-2 border-white" 
      : "bg-roulette-black border-2 border-white";
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
        "flex items-center justify-center cursor-pointer transition-all duration-300",
        getNumberColor(),
        number === 0 ? "h-[100px] w-[48px]" : "w-[48px] h-[48px]",
        highlighted && "ring-2 ring-yellow-400 ring-opacity-100",
        animate && "animate-pulse-light",
        isLastResult && "ring-2 ring-white",
        className
      )}
      aria-label={`Número ${number}`}
    >
      <span className={cn("text-xl font-bold text-white", animate && "scale-110 transition-transform")}>
        {number}
      </span>
    </div>
  );
};

export default RouletteNumber;
