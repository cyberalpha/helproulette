
import { PredictionResult } from "@/lib/rouletteAlgorithm";

// Mapeo de docenas para recomendaciones
export const dozenMapping: Record<number, string> = {
  1: '1st12',
  2: '2nd12',
  3: '3rd12'
};

// Obtener docenas recomendadas
export const getRecommendedDozens = (prediction: PredictionResult | null): string[] => {
  if (!prediction || !prediction.predictions.dozens.length) return [];
  return prediction.predictions.dozens.map(dozen => dozenMapping[dozen] || '');
};

// Obtener columnas recomendadas
export const getRecommendedColumns = (prediction: PredictionResult | null): number[] => {
  if (!prediction || !prediction.predictions.lines.length) return [];
  console.log("Recommended lines in algorithm:", prediction.predictions.lines);
  return prediction.predictions.lines;
};

// Obtener predicciones destacadas
export const getHighlightedPredictions = (prediction: PredictionResult | null) => {
  if (!prediction) return null;
  
  return {
    color: prediction.predictions.color,
    parity: prediction.predictions.parity,
    half: prediction.predictions.half
  };
};
