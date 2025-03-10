
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import RouletteNumber from "./RouletteNumber";
import BettingOptions from "./BettingOptions";
import PredictionDisplay from "./PredictionDisplay";
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
      <div className={`bg-roulette-green p-6 w-full max-w-4xl rounded-md border-4 border-white transition-all duration-500 ${animateBoard ? 'scale-in' : ''}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Ruleta</h2>
          <button 
            onClick={handleReset}
            className="bg-black/30 hover:bg-black/50 text-white px-4 py-2 rounded-lg transition-colors duration-300"
          >
            Reiniciar
          </button>
        </div>
        
        <div className="grid grid-cols-13 gap-1 border-4 border-white p-4 mb-6">
          <div className="col-span-1 flex justify-center items-start">
            <RouletteNumber 
              number={0} 
              onClick={handleNumberClick} 
              highlighted={prediction?.highlightedNumbers.includes(0)}
              isLastResult={lastNumber === 0}
              className="h-[129px]"
            />
          </div>
          
          <div className="col-span-12">
            <div className="grid grid-cols-12 gap-1 mb-1">
              {[3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36].map(num => (
                <RouletteNumber 
                  key={`top-${num}`} 
                  number={num} 
                  onClick={handleNumberClick} 
                  highlighted={prediction?.highlightedNumbers.includes(num)}
                  isLastResult={lastNumber === num}
                />
              ))}
            </div>
            <div className="grid grid-cols-12 gap-1 mb-1">
              {[2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35].map(num => (
                <RouletteNumber 
                  key={`mid-${num}`} 
                  number={num} 
                  onClick={handleNumberClick} 
                  highlighted={prediction?.highlightedNumbers.includes(num)}
                  isLastResult={lastNumber === num}
                />
              ))}
            </div>
            <div className="grid grid-cols-12 gap-1">
              {[1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34].map(num => (
                <RouletteNumber 
                  key={`bottom-${num}`} 
                  number={num} 
                  onClick={handleNumberClick} 
                  highlighted={prediction?.highlightedNumbers.includes(num)}
                  isLastResult={lastNumber === num}
                />
              ))}
            </div>
            
            <div className="grid grid-cols-12 gap-1 mt-4">
              <div 
                className="col-span-4 bg-roulette-green border-2 border-white text-white text-center font-bold cursor-pointer hover:bg-roulette-green/80 flex items-center justify-center h-[40px]"
                onClick={() => handleOptionSelect('dozen', '1st12')}
              >
                1st12
              </div>
              <div 
                className="col-span-4 bg-roulette-green border-2 border-white text-white text-center font-bold cursor-pointer hover:bg-roulette-green/80 flex items-center justify-center h-[40px]"
                onClick={() => handleOptionSelect('dozen', '2nd12')}
              >
                2nd12
              </div>
              <div 
                className="col-span-4 bg-roulette-green border-2 border-white text-white text-center font-bold cursor-pointer hover:bg-roulette-green/80 flex items-center justify-center h-[40px]"
                onClick={() => handleOptionSelect('dozen', '3rd12')}
              >
                3rd12
              </div>
            </div>
            
            <div className="grid grid-cols-12 gap-1 mt-1">
              <div 
                className="col-span-2 bg-roulette-green border-2 border-white text-white text-center font-bold cursor-pointer hover:bg-roulette-green/80 flex items-center justify-center h-[40px]"
                onClick={() => handleOptionSelect('half', '1to18')}
              >
                1to18
              </div>
              <div 
                className="col-span-2 bg-roulette-green border-2 border-white text-white text-center font-bold cursor-pointer hover:bg-roulette-green/80 flex items-center justify-center h-[40px]"
                onClick={() => handleOptionSelect('parity', 'even')}
              >
                EVEN
              </div>
              <div 
                className="col-span-2 bg-roulette-red border-2 border-white cursor-pointer hover:bg-roulette-red/80 flex items-center justify-center h-[40px]"
                onClick={() => handleOptionSelect('color', 'rojo')}
              >
                <div className="w-6 h-6 rounded-full bg-roulette-red"></div>
              </div>
              <div 
                className="col-span-2 bg-roulette-black border-2 border-white cursor-pointer hover:bg-roulette-black/80 flex items-center justify-center h-[40px]"
                onClick={() => handleOptionSelect('color', 'negro')}
              >
                <div className="w-6 h-6 rounded-full bg-roulette-black"></div>
              </div>
              <div 
                className="col-span-2 bg-roulette-green border-2 border-white text-white text-center font-bold cursor-pointer hover:bg-roulette-green/80 flex items-center justify-center h-[40px]"
                onClick={() => handleOptionSelect('parity', 'odd')}
              >
                ODD
              </div>
              <div 
                className="col-span-2 bg-roulette-green border-2 border-white text-white text-center font-bold cursor-pointer hover:bg-roulette-green/80 flex items-center justify-center h-[40px]"
                onClick={() => handleOptionSelect('half', '19to36')}
              >
                19to36
              </div>
            </div>
          </div>
          
          <div className="col-span-1 flex flex-col">
            <div 
              className="bg-roulette-green border-2 border-white text-white flex items-center justify-center font-bold text-xs md:text-sm cursor-pointer hover:bg-roulette-green/80 w-[42px] h-[42px] mb-1"
              onClick={() => handleOptionSelect('column', '1st_column')}
            >
              2to1
            </div>
            <div 
              className="bg-roulette-green border-2 border-white text-white flex items-center justify-center font-bold text-xs md:text-sm cursor-pointer hover:bg-roulette-green/80 w-[42px] h-[42px] mb-1"
              onClick={() => handleOptionSelect('column', '2nd_column')}
            >
              2to1
            </div>
            <div 
              className="bg-roulette-green border-2 border-white text-white flex items-center justify-center font-bold text-xs md:text-sm cursor-pointer hover:bg-roulette-green/80 w-[42px] h-[42px]"
              onClick={() => handleOptionSelect('column', '3rd_column')}
            >
              2to1
            </div>
          </div>
        </div>
        
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
        <div className="glass-panel p-6">
          <h2 className="text-xl font-semibold mb-4 text-white/90">Historial</h2>
          <div className="flex flex-wrap gap-2">
            {history.length > 0 ? (
              history.map((num, index) => (
                <div 
                  key={index}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                    num === 0 
                      ? 'bg-roulette-green' 
                      : [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num)
                        ? 'bg-roulette-red' 
                        : 'bg-roulette-black'
                  }`}
                >
                  {num}
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">Aún no hay números registrados</p>
            )}
          </div>
        </div>
        
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
