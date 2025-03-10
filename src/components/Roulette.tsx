
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import BettingOptions from "./BettingOptions";
import PredictionDisplay from "./PredictionDisplay";
import RouletteBoard from "./RouletteBoard";
import RouletteHistory from "./RouletteHistory";
import { PredictionResult, processNumber, resetAlgorithm } from "@/lib/rouletteAlgorithm";

const Roulette = () => {
  const [lastNumber, setLastNumber] = useState<number | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const [animateBoard, setAnimateBoard] = useState(false);

  useEffect(() => {
    const initialPrediction = processNumber(-1);
    setPrediction(initialPrediction);
  }, []);

  const handleNumberClick = (number: number) => {
    setAnimateBoard(true);
    setTimeout(() => setAnimateBoard(false), 700);
    
    setLastNumber(number);
    setHistory(prev => [...prev, number]);
    
    const newPrediction = processNumber(number);
    setPrediction(newPrediction);
    
    toast({
      title: `Número ${number} ingresado`,
      description: "Predicciones actualizadas",
      duration: 2000,
    });
  };

  const handleOptionSelect = (type: string, value: string) => {
    toast({
      title: `Opción seleccionada: ${value}`,
      description: "Esta opción serviría para realizar apuestas en una implementación completa",
      duration: 2000,
    });
  };

  const handleReset = () => {
    resetAlgorithm();
    setLastNumber(null);
    setHistory([]);
    setPrediction(processNumber(-1));
    toast({
      title: "Algoritmo reiniciado",
      description: "Todas las predicciones han sido restablecidas",
      duration: 2000,
    });
  };

  return (
    <div className="w-full flex flex-col items-center space-y-8 px-4 md:px-8">
      <div className="bg-roulette-green p-6 w-full max-w-4xl rounded-md border-4 border-white transition-all duration-500">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Ruleta</h2>
          <button 
            onClick={handleReset}
            className="bg-black/30 hover:bg-black/50 text-white px-4 py-2 rounded-lg transition-colors duration-300"
          >
            Reiniciar
          </button>
        </div>
        
        {prediction && (
          <RouletteBoard
            lastNumber={lastNumber}
            highlightedNumbers={prediction.highlightedNumbers}
            onNumberClick={handleNumberClick}
            onOptionSelect={handleOptionSelect}
            animateBoard={animateBoard}
          />
        )}
        
        <BettingOptions 
          onSelectOption={handleOptionSelect} 
          highlightedOptions={{
            color: prediction?.predictions.color || null,
            parity: prediction?.predictions.parity || null,
            half: prediction?.predictions.half || null
          }}
        />
      </div>
      
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <RouletteHistory history={history} />
        
        <div>
          {prediction && (
            <PredictionDisplay 
              prediction={prediction} 
              lastNumber={lastNumber}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Roulette;
