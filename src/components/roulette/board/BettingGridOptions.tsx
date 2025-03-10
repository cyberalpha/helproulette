
import React from "react";
import BettingOption from "./BettingOption";

interface HighlightedPredictions {
  color: string | null;
  parity: string | null;
  half: string | null;
}

interface BettingGridOptionsProps {
  highlightedPredictions: HighlightedPredictions | null;
  onOptionSelect: (type: string, value: string) => void;
}

const BettingGridOptions = ({ 
  highlightedPredictions, 
  onOptionSelect 
}: BettingGridOptionsProps) => {
  const isPrediction = (type: string, value: string) => {
    if (!highlightedPredictions) return false;
    
    switch (type) {
      case 'color':
        return highlightedPredictions.color === value;
      case 'parity':
        return highlightedPredictions.parity === value;
      case 'half':
        return highlightedPredictions.half === value;
      default:
        return false;
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {/* Grid principal con todos los botones */}
      <div className="grid grid-cols-6 gap-1">
        <BettingOption
          label="1to18"
          type="half"
          value="1-18"
          highlighted={isPrediction('half', '1-18')}
          onClick={onOptionSelect}
          className="h-[48px]"
        />
        <BettingOption
          label="EVEN"
          type="parity"
          value="par"
          highlighted={isPrediction('parity', 'par')}
          onClick={onOptionSelect}
          className="h-[48px]"
        />
        <div 
          className={`bg-gradient-to-br from-roulette-red to-red-700 border border-white/60 text-white text-center font-bold cursor-pointer hover:bg-roulette-red/80 flex items-center justify-center h-[48px] rounded-xl shadow-md hover:scale-[1.03] active:scale-[0.97] transition-all ${isPrediction('color', 'rojo') ? "ring-2 ring-white animate-pulse-light" : ""}`}
          onClick={() => onOptionSelect('color', 'rojo')}
        >
          RED
        </div>
        <div 
          className={`bg-gradient-to-br from-roulette-black to-gray-800 border border-white/60 text-white text-center font-bold cursor-pointer hover:bg-roulette-black/80 flex items-center justify-center h-[48px] rounded-xl shadow-md hover:scale-[1.03] active:scale-[0.97] transition-all ${isPrediction('color', 'negro') ? "ring-2 ring-white animate-pulse-light" : ""}`}
          onClick={() => onOptionSelect('color', 'negro')}
        >
          BLACK
        </div>
        <BettingOption
          label="ODD"
          type="parity"
          value="impar"
          highlighted={isPrediction('parity', 'impar')}
          onClick={onOptionSelect}
          className="h-[48px]"
        />
        <BettingOption
          label="19to36"
          type="half"
          value="19-36"
          highlighted={isPrediction('half', '19-36')}
          onClick={onOptionSelect}
          className="h-[48px]"
        />
      </div>
    </div>
  );
};

export default BettingGridOptions;
