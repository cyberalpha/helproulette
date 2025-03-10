
import { cn } from "@/lib/utils";

interface PredictionBadgesProps {
  title: string;
  items: number[];
  variant: "number" | "green";
  className?: string;
}

const PredictionBadges = ({ title, items, variant, className }: PredictionBadgesProps) => {
  if (!items.length) return null;

  // Función para determinar el color de fondo de los plenos
  const getNumberBackground = (number: number) => {
    if (number === 0) return "bg-gradient-to-br from-roulette-green to-green-700";
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    return redNumbers.includes(number)
      ? "bg-gradient-to-br from-roulette-red to-red-700"
      : "bg-gradient-to-br from-roulette-black to-gray-800";
  };
  
  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-gray-400 mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={`${title}-${item}`}
            className={cn(
              "prediction-badge text-white",
              variant === "number" 
                ? cn(getNumberBackground(item), "border border-white/20")
                : "bg-gradient-to-br from-green-600/60 to-green-700/60 backdrop-blur-sm border border-white/20",
              className
            )}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PredictionBadges;
