
import { useEffect, useState } from "react";
import PredictionDisplay from "./PredictionDisplay";
import RouletteBoard from "./RouletteBoard";
import RouletteHistory from "./RouletteHistory";
import WinnerGallery from "./WinnerGallery";
import GameStats from "./GameStats";
import { processNumber } from "@/lib/roulette";
import type { PredictionResult } from "@/lib/roulette/types";
import { getRecommendedDozens, getRecommendedColumns, getHighlightedPredictions } from "@/lib/rouletteHelpers";
import { SelectedOptions, handleOptionSelect } from "./roulette/BettingHandler";
import { GameState, handleNumberClick } from "./roulette/GameLogic";
import { handleReset } from "./roulette/ResetHandler";
import { Button } from "./ui/button";

const Roulette = () => {
  const [lastNumber, setLastNumber] = useState<number | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const [animateBoard, setAnimateBoard] = useState(false);
  const [winnerPhotos, setWinnerPhotos] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    color: null,
    parity: null,
    half: null,
    dozen: null,
    column: null,
  });

  // Estado inicial
  useEffect(() => {
    const initialPrediction = processNumber(-1);
    setPrediction(initialPrediction);
  }, []);

  // Acciones del juego
  const gameState: GameState = {
    lastNumber,
    prediction,
    history,
    animateBoard,
    selectedOptions,
    winnerPhotos
  };

  const gameActions = {
    setLastNumber,
    setPrediction,
    setHistory,
    setAnimateBoard,
    setSelectedOptions,
    setWinnerPhotos
  };

  // Manejadores de eventos
  const onNumberClick = (number: number) => {
    handleNumberClick(number, gameState, gameActions);
  };

  const onOptionSelect = (type: string, value: string) => {
    handleOptionSelect(type, value, setSelectedOptions, selectedOptions);
  };

  const onReset = () => {
    handleReset({
      setLastNumber,
      setHistory,
      setPrediction,
      setSelectedOptions,
      setWinnerPhotos
    });
  };

  return (
    <div className="w-full flex flex-col items-center space-y-8 px-4 md:px-8">
      <div className="bg-roulette-green p-6 w-full max-w-4xl rounded-md border-4 border-white transition-all duration-500">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Ruleta</h2>
          <Button 
            onClick={onReset}
            variant="outline"
            className="bg-black/30 hover:bg-black/50 text-white border-white/30 hover:border-white/60"
          >
            Reiniciar
          </Button>
        </div>
        
        {prediction && (
          <RouletteBoard
            lastNumber={lastNumber}
            highlightedNumbers={prediction.highlightedNumbers}
            onNumberClick={onNumberClick}
            onOptionSelect={onOptionSelect}
            animateBoard={animateBoard}
            recommendedDozens={getRecommendedDozens(prediction)}
            highlightedPredictions={getHighlightedPredictions(prediction)}
            recommendedColumns={getRecommendedColumns(prediction)}
          />
        )}
      </div>
      
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <RouletteHistory history={history} />
          {winnerPhotos.length > 0 && <WinnerGallery photos={winnerPhotos} />}
        </div>
        
        <div className="space-y-6">
          {prediction && (
            <PredictionDisplay 
              prediction={prediction} 
              lastNumber={lastNumber}
            />
          )}
          <GameStats history={history} prediction={prediction} />
        </div>
      </div>
    </div>
  );
};

export default Roulette;
