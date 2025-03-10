
import { PredictionResult, processNumber } from "@/lib/rouletteAlgorithm";
import { toast } from "@/components/ui/use-toast";
import { checkWinnings, SelectedOptions } from "./BettingHandler";

export interface GameState {
  lastNumber: number | null;
  prediction: PredictionResult | null;
  history: number[];
  animateBoard: boolean;
  selectedOptions: SelectedOptions;
}

interface GameActions {
  setLastNumber: (num: number | null) => void;
  setPrediction: (pred: PredictionResult | null) => void;
  setHistory: React.Dispatch<React.SetStateAction<number[]>>;
  setAnimateBoard: (animate: boolean) => void;
  setSelectedOptions: (options: SelectedOptions) => void;
}

// Procesar número ingresado
export const handleNumberClick = (
  number: number,
  state: GameState,
  actions: GameActions
) => {
  const { setAnimateBoard, setLastNumber, setHistory, setPrediction, setSelectedOptions } = actions;
  
  // Animar el tablero
  setAnimateBoard(true);
  setTimeout(() => setAnimateBoard(false), 700);
  
  // Actualizar el estado
  setLastNumber(number);
  setHistory(prev => [...prev, number]);
  
  // Procesar el número con el algoritmo
  const newPrediction = processNumber(number);
  setPrediction(newPrediction);
  
  // Verificar ganancias
  checkWinnings(number, state.selectedOptions, setSelectedOptions);
  
  // Notificar
  toast({
    title: `Número ${number} ingresado`,
    description: "Predicciones actualizadas",
    duration: 2000,
  });
};
