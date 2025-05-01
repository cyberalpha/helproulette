
import { PredictionResult } from "@/lib/roulette/types";
import { cn } from "@/lib/utils";
import PredictionBadges from "./prediction/PredictionBadges";
import PredictionStatistics from "./prediction/PredictionStatistics";
import PredictionSuggestions from "./prediction/PredictionSuggestions";
import PredictionMainInfo from "./prediction/PredictionMainInfo";

interface PredictionDisplayProps {
  prediction: PredictionResult;
  lastNumber: number | null;
}

const PredictionDisplay = ({ prediction, lastNumber }: PredictionDisplayProps) => {
  const { predictions, statistics } = prediction;

  return (
    <div className="glass-panel p-6 w-full max-h-[500px] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 text-white/90">Predicciones</h2>
      
      {/* Estadísticas */}
      <PredictionStatistics statistics={statistics} lastNumber={lastNumber} />
      
      {/* Sugerencias */}
      {predictions.suggestions.length > 0 && (
        <PredictionSuggestions suggestions={predictions.suggestions} />
      )}
      
      {/* Predicciones principales */}
      <div className="space-y-6">
        <PredictionMainInfo predictions={predictions} />
        
        {/* Predicciones específicas */}
        <div className="space-y-4">
          <PredictionBadges 
            title="Plenos recomendados" 
            items={predictions.pleno} 
            variant="number" 
          />
          <PredictionBadges 
            title="Docenas sugeridas" 
            items={predictions.dozens} 
            variant="green" 
          />
          <PredictionBadges 
            title="Líneas sugeridas" 
            items={predictions.lines} 
            variant="green" 
          />
          <PredictionBadges 
            title="Columnas sugeridas" 
            items={predictions.columns} 
            variant="green" 
          />
        </div>
      </div>
    </div>
  );
};

export default PredictionDisplay;
