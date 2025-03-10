
import { useState } from "react";
import { cn } from "@/lib/utils";
import ZeroNumber from "./roulette/board/ZeroNumber";
import NumbersGrid from "./roulette/board/NumbersGrid";
import DozenOptions from "./roulette/board/DozenOptions";
import BettingGridOptions from "./roulette/board/BettingGridOptions";
import ColumnOptions from "./roulette/board/ColumnOptions";

interface HighlightedPredictions {
  color: string | null;
  parity: string | null;
  half: string | null;
}

interface RouletteBoardProps {
  lastNumber: number | null;
  highlightedNumbers: number[];
  onNumberClick: (number: number) => void;
  onOptionSelect: (type: string, value: string) => void;
  animateBoard: boolean;
  recommendedDozens?: string[];
  highlightedPredictions: HighlightedPredictions | null;
  recommendedColumns?: number[];
}

const RouletteBoard = ({
  lastNumber,
  highlightedNumbers,
  onNumberClick,
  onOptionSelect,
  animateBoard,
  recommendedDozens = [],
  highlightedPredictions,
  recommendedColumns = []
}: RouletteBoardProps) => {
  return (
    <div className={cn("grid grid-cols-14 gap-1 border-4 border-white rounded-xl p-4 mb-6", 
      animateBoard ? 'scale-in' : '')}>
      
      {/* Número cero */}
      <ZeroNumber 
        onNumberClick={onNumberClick} 
        highlighted={highlightedNumbers.includes(0)}
        isLastResult={lastNumber === 0} 
      />
      
      {/* Cuadrícula de números */}
      <NumbersGrid 
        highlightedNumbers={highlightedNumbers}
        lastNumber={lastNumber}
        onNumberClick={onNumberClick}
      />
      
      {/* Opciones de columnas */}
      <ColumnOptions 
        recommendedColumns={recommendedColumns}
        onOptionSelect={onOptionSelect}
      />
      
      {/* Opciones de docenas */}
      <DozenOptions 
        recommendedDozens={recommendedDozens}
        onOptionSelect={onOptionSelect}
      />
      
      {/* Opciones de apuestas */}
      <BettingGridOptions 
        highlightedPredictions={highlightedPredictions}
        onOptionSelect={onOptionSelect}
      />
    </div>
  );
};

export default RouletteBoard;
