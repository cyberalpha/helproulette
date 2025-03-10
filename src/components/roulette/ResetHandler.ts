
import { resetAlgorithm, processNumber } from "@/lib/rouletteAlgorithm";
import { toast } from "@/components/ui/use-toast";
import { SelectedOptions } from "./BettingHandler";

interface ResetActions {
  setLastNumber: (num: number | null) => void;
  setHistory: (history: number[]) => void;
  setPrediction: (pred: any) => void;
  setSelectedOptions: (options: SelectedOptions) => void;
}

// Reiniciar el juego
export const handleReset = (actions: ResetActions) => {
  const { setLastNumber, setHistory, setPrediction, setSelectedOptions } = actions;
  
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
  
  // Notificar
  toast({
    title: "Algoritmo reiniciado",
    description: "Todas las predicciones han sido restablecidas",
    duration: 2000,
  });
};
