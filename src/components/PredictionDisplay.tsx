
import { PredictionResult } from "@/lib/rouletteAlgorithm";
import { cn } from "@/lib/utils";

interface PredictionDisplayProps {
  prediction: PredictionResult;
  lastNumber: number | null;
}

const PredictionDisplay = ({ prediction, lastNumber }: PredictionDisplayProps) => {
  const { predictions, statistics } = prediction;

  // Función para determinar el color de fondo de los plenos
  const getNumberBackground = (number: number) => {
    if (number === 0) return "bg-gradient-to-br from-roulette-green to-green-700";
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    return redNumbers.includes(number)
      ? "bg-gradient-to-br from-roulette-red to-red-700"
      : "bg-gradient-to-br from-roulette-black to-gray-800";
  };

  // Función para crear badges de predicción
  const renderPredictionBadges = (title: string, items: number[], className?: string) => {
    if (!items.length) return null;
    
    return (
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-400 mb-2">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <span
              key={`${title}-${item}`}
              className={cn(
                "prediction-badge text-white",
                title === "Plenos recomendados" 
                  ? cn(getNumberBackground(item), "border border-white/20")
                  : "bg-gradient-to-br from-orange-400/40 to-purple-500/40 backdrop-blur-sm border border-white/20",
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

  return (
    <div className="glass-panel p-6 w-full max-h-[500px] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 text-white/90">Predicciones</h2>
      
      {/* Últimas jugadas */}
      <div className="mb-6">
        <p className="text-sm text-gray-300">Total de jugadas: {statistics.plays}</p>
        {lastNumber !== null && (
          <p className="text-sm text-gray-300">
            Último número: <span className="font-bold">{lastNumber}</span>
          </p>
        )}
      </div>
      
      {/* Sugerencias destacadas */}
      {predictions.suggestions.length > 0 && (
        <div className="mb-6 p-3 bg-black/20 backdrop-blur-sm rounded-lg">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Sugerencias</h3>
          <ul className="space-y-1">
            {predictions.suggestions.map((suggestion, index) => (
              <li key={index} className="text-sm text-white/80">{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Predicciones principales */}
      <div className="space-y-6">
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
        
        {/* Predicciones específicas */}
        <div className="space-y-4">
          {renderPredictionBadges("Plenos recomendados", predictions.pleno)}
          {renderPredictionBadges("Docenas sugeridas", predictions.dozens)}
          {renderPredictionBadges("Líneas sugeridas", predictions.lines)}
          {renderPredictionBadges("Columnas sugeridas", predictions.columns)}
        </div>
      </div>
    </div>
  );
};

export default PredictionDisplay;
