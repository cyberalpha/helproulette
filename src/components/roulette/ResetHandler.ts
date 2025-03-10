
import { resetAlgorithm, processNumber } from "@/lib/rouletteAlgorithm";
import { toast } from "@/components/ui/use-toast";
import { SelectedOptions } from "./BettingHandler";

interface ResetActions {
  setLastNumber: (num: number | null) => void;
  setHistory: React.Dispatch<React.SetStateAction<number[]>>;
  setPrediction: (pred: any) => void;
  setSelectedOptions: (options: SelectedOptions) => void;
  setWinnerPhotos?: React.Dispatch<React.SetStateAction<string[]>>;
}

// Reiniciar el juego
export const handleReset = (actions: ResetActions) => {
  const { setLastNumber, setHistory, setPrediction, setSelectedOptions, setWinnerPhotos } = actions;
  
  // Reiniciar el algoritmo
  resetAlgorithm();
  
  // Reiniciar el estado
  setLastNumber(null);
  setHistory([]);
  setPrediction(processNumber(-1));
  setSelectedOptions({
    color: null,
    parity: null,
    half: null,
    dozen: null,
    column: null,
  });
  
  // Reiniciar fotos de ganadores si existe
  if (setWinnerPhotos) {
    setWinnerPhotos([]);
  }
  
  // Notificar
  toast({
    title: "Algoritmo reiniciado",
    description: "Todas las predicciones han sido restablecidas",
    duration: 2000,
  });
};
