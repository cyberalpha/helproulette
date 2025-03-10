
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import PredictionDisplay from "./PredictionDisplay";
import RouletteBoard from "./RouletteBoard";
import RouletteHistory from "./RouletteHistory";
import { PredictionResult, processNumber, resetAlgorithm } from "@/lib/rouletteAlgorithm";

const Roulette = () => {
  const [lastNumber, setLastNumber] = useState<number | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const [animateBoard, setAnimateBoard] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<{
    color: string | null;
    parity: string | null;
    half: string | null;
    dozen: string | null;
    column: string | null;
  }>({
    color: null,
    parity: null,
    half: null,
    dozen: null,
    column: null,
  });

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
    
    checkWinnings(number);
    
    toast({
      title: `Número ${number} ingresado`,
      description: "Predicciones actualizadas",
      duration: 2000,
    });
  };

  // Función para mapear docenas a sus representaciones
  const getRecommendedDozens = (): string[] => {
    if (!prediction || !prediction.predictions.dozens.length) return [];
    
    const dozenMapping: Record<number, string> = {
      1: '1st12',
      2: '2nd12',
      3: '3rd12'
    };
    
    return prediction.predictions.dozens.map(dozen => dozenMapping[dozen] || '');
  };

  const checkWinnings = (number: number) => {
    let wins = 0;
    const messages: string[] = [];
    
    if (selectedOptions.color) {
      const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
      const isRed = redNumbers.includes(number);
      const userSelectedRed = selectedOptions.color === "rojo";
      
      if ((isRed && userSelectedRed) || (!isRed && !userSelectedRed && number !== 0)) {
        wins++;
        messages.push(`¡Ganaste! Color ${selectedOptions.color} correcto`);
      }
    }
    
    if (selectedOptions.parity && number !== 0) {
      const isEven = number % 2 === 0;
      const userSelectedEven = selectedOptions.parity === "par";
      
      if ((isEven && userSelectedEven) || (!isEven && !userSelectedEven)) {
        wins++;
        messages.push(`¡Ganaste! Paridad ${selectedOptions.parity} correcta`);
      }
    }
    
    if (selectedOptions.half && number !== 0) {
      const isFirstHalf = number >= 1 && number <= 18;
      const userSelectedFirstHalf = selectedOptions.half === "1-18";
      
      if ((isFirstHalf && userSelectedFirstHalf) || (!isFirstHalf && !userSelectedFirstHalf)) {
        wins++;
        messages.push(`¡Ganaste! Mitad ${selectedOptions.half} correcta`);
      }
    }
    
    if (selectedOptions.dozen && number !== 0) {
      const dozenMap: Record<string, [number, number]> = {
        "1st12": [1, 12],
        "2nd12": [13, 24],
        "3rd12": [25, 36]
      };
      
      const [min, max] = dozenMap[selectedOptions.dozen] || [0, 0];
      if (number >= min && number <= max) {
        wins++;
        messages.push(`¡Ganaste! Docena ${selectedOptions.dozen} correcta`);
      }
    }
    
    if (selectedOptions.column && number !== 0) {
      const firstColumn = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
      const secondColumn = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
      const thirdColumn = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
      
      let columnWin = false;
      if (selectedOptions.column === "1st_column" && firstColumn.includes(number)) columnWin = true;
      if (selectedOptions.column === "2nd_column" && secondColumn.includes(number)) columnWin = true;
      if (selectedOptions.column === "3rd_column" && thirdColumn.includes(number)) columnWin = true;
      
      if (columnWin) {
        wins++;
        messages.push(`¡Ganaste! Columna seleccionada correcta`);
      }
    }
    
    if (wins > 0) {
      toast({
        title: `¡Enhorabuena! ${wins} apuesta(s) ganadora(s)`,
        description: messages.join(". "),
        duration: 4000,
      });
    } else if (Object.values(selectedOptions).some(val => val !== null)) {
      toast({
        title: "No has ganado en esta ronda",
        description: "¡Sigue intentándolo!",
        duration: 2000,
      });
    }
    
    setSelectedOptions({
      color: null,
      parity: null,
      half: null,
      dozen: null,
      column: null,
    });
  };

  const handleOptionSelect = (type: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [type]: value
    }));
    
    toast({
      title: `Opción seleccionada: ${value}`,
      description: "Tu apuesta ha sido registrada",
      duration: 2000,
    });
  };

  const handleReset = () => {
    resetAlgorithm();
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
    toast({
      title: "Algoritmo reiniciado",
      description: "Todas las predicciones han sido restablecidas",
      duration: 2000,
    });
  };

  const getHighlightedPredictions = () => {
    if (!prediction) return null;
    
    return {
      color: prediction.predictions.color,
      parity: prediction.predictions.parity,
      half: prediction.predictions.half
    };
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
            recommendedDozens={getRecommendedDozens()}
            highlightedPredictions={getHighlightedPredictions()}
          />
        )}
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
