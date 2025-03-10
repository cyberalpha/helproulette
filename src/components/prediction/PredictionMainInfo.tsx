
import { cn } from "@/lib/utils";

interface PredictionMainInfoProps {
  predictions: {
    color: string | null;
    parity: string | null;
    half: string | null;
  };
}

const PredictionMainInfo = ({ predictions }: PredictionMainInfoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {predictions.color && (
        <div className="bg-black/20 p-3 rounded-lg backdrop-blur-sm">
          <h3 className="text-sm font-medium text-gray-300 mb-1">Color</h3>
          <p className={cn(
            "font-medium",
            predictions.color === "rojo" ? "text-red-500" : "text-gray-200"
          )}>
            {predictions.color.toUpperCase()}
          </p>
        </div>
      )}
      
      {predictions.parity && (
        <div className="bg-black/20 p-3 rounded-lg backdrop-blur-sm">
          <h3 className="text-sm font-medium text-gray-300 mb-1">Paridad</h3>
          <p className="font-medium text-white/90">
            {predictions.parity.toUpperCase()}
          </p>
        </div>
      )}
      
      {predictions.half && (
        <div className="bg-black/20 p-3 rounded-lg backdrop-blur-sm">
          <h3 className="text-sm font-medium text-gray-300 mb-1">Mitad</h3>
          <p className="font-medium text-white/90">
            {predictions.half}
          </p>
        </div>
      )}
    </div>
  );
};

export default PredictionMainInfo;
