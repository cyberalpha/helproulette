
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

  // Inicializar el algoritmo y las predicciones
  useEffect(() => {
    const initialPrediction = processNumber(-1); // -1 inicializa sin procesar ningún número
    setPrediction(initialPrediction);
  }, []);

  // Manejar la selección de un número
  const handleNumberClick = (number: number) => {
    // Animar el tablero brevemente
    setAnimateBoard(true);
    setTimeout(() => setAnimateBoard(false), 700);
    
    // Actualizar el estado
    setLastNumber(number);
    setHistory(prev => [...prev, number]);
    
    // Procesar el número para obtener predicciones
    const newPrediction = processNumber(number);
    setPrediction(newPrediction);
    
    // Mostrar toast de confirmación
    toast({
      title: `Número ${number} ingresado`,
      description: "Predicciones actualizadas",
      duration: 2000,
    });
  };

  // Manejar la selección de opciones de apuesta (rojo/negro, par/impar, etc.)
  const handleOptionSelect = (type: string, value: string) => {
    toast({
      title: `Opción seleccionada: ${value}`,
      description: "Esta opción serviría para realizar apuestas en una implementación completa",
      duration: 2000,
    });
  };

  // Manejar el reinicio del algoritmo
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

  // Generar la cuadrícula de números para la ruleta
  const renderRouletteGrid = () => {
    const numbers = [];
    
    // Añadir el cero
    numbers.push(
      <div key="zero" className="col-span-3 flex justify-center items-center mb-4">
        <RouletteNumber 
          number={0} 
          onClick={handleNumberClick} 
          highlighted={prediction?.highlightedNumbers.includes(0)}
          isLastResult={lastNumber === 0}
        />
      </div>
    );
    
    // Añadir el resto de números (1-36)
    for (let i = 1; i <= 36; i++) {
      numbers.push(
        <RouletteNumber 
          key={i} 
          number={i} 
          onClick={handleNumberClick} 
          highlighted={prediction?.highlightedNumbers.includes(i)}
          isLastResult={lastNumber === i}
          className="transform transition-all duration-500"
        />
      );
    }
    
    return numbers;
  };

  return (
    <div className="w-full flex flex-col items-center space-y-8 px-4 md:px-8">
      <div className={`roulette-board glass-panel p-6 w-full max-w-4xl rounded-2xl transition-all duration-500 ${animateBoard ? 'scale-in' : ''}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Ruleta</h2>
          <button 
            onClick={handleReset}
            className="bg-black/30 hover:bg-black/50 text-white px-4 py-2 rounded-lg transition-colors duration-300"
          >
            Reiniciar
          </button>
        </div>
        
        {/* Cuadrícula de números de la ruleta */}
        <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-12 gap-3 mb-8">
          {renderRouletteGrid()}
        </div>
        
        {/* Opciones de apuesta (rojo/negro, par/impar, etc.) */}
        <BettingOptions 
          onSelectOption={handleOptionSelect} 
          highlightedOptions={{
            color: prediction?.predictions.color || null,
            parity: prediction?.predictions.parity || null,
            half: prediction?.predictions.half || null
          }}
        />
      </div>
      
      {/* Historial y predicciones */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Historial de números */}
        <div className="glass-panel p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-white/90">Historial</h2>
          <div className="flex flex-wrap gap-2">
            {history.length > 0 ? (
              history.map((num, index) => (
                <div 
                  key={index}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                    num === 0 
                      ? 'bg-roulette-green' 
                      : num % 2 === 0 
                        ? 'bg-roulette-black' 
                        : 'bg-roulette-red'
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
        
        {/* Panel de predicciones */}
        <div className="md:col-span-3">
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
