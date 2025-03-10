
import { useState } from "react";
import RouletteNumber from "./RouletteNumber";
import { cn } from "@/lib/utils";

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
  const dozenMap: Record<string, string> = {
    '1st12': '1st12',
    '2nd12': '2nd12',
    '3rd12': '3rd12'
  };

  const isDozenRecommended = (dozen: string) => {
    return recommendedDozens.includes(dozen);
  };

  // Determine if a column is recommended based on the algorithm's column predictions
  const isColumnRecommended = (column: string) => {
    if (recommendedColumns.length === 0) return false;
    
    // Map column names to their numerical values from the algorithm
    if (column === '1st_column' && recommendedColumns.includes(1)) return true;
    if (column === '2nd_column' && recommendedColumns.includes(2)) return true;
    if (column === '3rd_column' && recommendedColumns.includes(3)) return true;
    
    return false;
  };

  // Check if the option is recommended by the prediction algorithm
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
    <div className={cn("grid grid-cols-14 gap-1 border-4 border-white rounded-xl p-4 mb-6", 
      animateBoard ? 'scale-in' : '')}>
      <div className="col-span-1 flex items-start justify-center pt-1">
        <RouletteNumber 
          number={0} 
          onClick={onNumberClick} 
          highlighted={highlightedNumbers.includes(0)}
          isLastResult={lastNumber === 0}
          className="mr-1"
        />
      </div>
      
      <div className="col-span-12">
        <div className="grid grid-cols-12 gap-1 mb-1">
          {[3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36].map(num => (
            <RouletteNumber 
              key={`top-${num}`} 
              number={num} 
              onClick={onNumberClick} 
              highlighted={highlightedNumbers.includes(num)}
              isLastResult={lastNumber === num}
            />
          ))}
        </div>
        
        <div className="grid grid-cols-12 gap-1 mb-1">
          {[2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35].map(num => (
            <RouletteNumber 
              key={`mid-${num}`} 
              number={num} 
              onClick={onNumberClick} 
              highlighted={highlightedNumbers.includes(num)}
              isLastResult={lastNumber === num}
            />
          ))}
        </div>
        <div className="grid grid-cols-12 gap-1">
          {[1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34].map(num => (
            <RouletteNumber 
              key={`bottom-${num}`} 
              number={num} 
              onClick={onNumberClick} 
              highlighted={highlightedNumbers.includes(num)}
              isLastResult={lastNumber === num}
            />
          ))}
        </div>
        
        <div className="grid grid-cols-3 gap-1 mt-4">
          <div 
            className={cn(
              "col-span-1 bg-gradient-to-br from-roulette-green to-green-700 border border-white/60 text-white text-center font-bold cursor-pointer hover:bg-roulette-green/80 flex items-center justify-center h-[48px] rounded-xl shadow-md hover:scale-[1.03] active:scale-[0.97] transition-all",
              isDozenRecommended('1st12') ? "ring-2 ring-white animate-pulse-light" : ""
            )}
            onClick={() => onOptionSelect('dozen', '1st12')}
          >
            1st12
          </div>
          <div 
            className={cn(
              "col-span-1 bg-gradient-to-br from-roulette-green to-green-700 border border-white/60 text-white text-center font-bold cursor-pointer hover:bg-roulette-green/80 flex items-center justify-center h-[48px] rounded-xl shadow-md hover:scale-[1.03] active:scale-[0.97] transition-all",
              isDozenRecommended('2nd12') ? "ring-2 ring-white animate-pulse-light" : ""
            )}
            onClick={() => onOptionSelect('dozen', '2nd12')}
          >
            2nd12
          </div>
          <div 
            className={cn(
              "col-span-1 bg-gradient-to-br from-roulette-green to-green-700 border border-white/60 text-white text-center font-bold cursor-pointer hover:bg-roulette-green/80 flex items-center justify-center h-[48px] rounded-xl shadow-md hover:scale-[1.03] active:scale-[0.97] transition-all",
              isDozenRecommended('3rd12') ? "ring-2 ring-white animate-pulse-light" : ""
            )}
            onClick={() => onOptionSelect('dozen', '3rd12')}
          >
            3rd12
          </div>
        </div>
        
        <div className="grid grid-cols-6 gap-1 mt-1">
          <div 
            className={cn(
              "col-span-1 bg-gradient-to-br from-roulette-green to-green-700 border border-white/60 text-white text-center font-bold cursor-pointer hover:bg-roulette-green/80 flex items-center justify-center h-[48px] rounded-xl shadow-md hover:scale-[1.03] active:scale-[0.97] transition-all",
              isPrediction('half', '1-18') ? "ring-2 ring-white animate-pulse-light" : ""
            )}
            onClick={() => onOptionSelect('half', '1-18')}
          >
            1to18
          </div>
          <div 
            className={cn(
              "col-span-1 bg-gradient-to-br from-roulette-green to-green-700 border border-white/60 text-white text-center font-bold cursor-pointer hover:bg-roulette-green/80 flex items-center justify-center h-[48px] rounded-xl shadow-md hover:scale-[1.03] active:scale-[0.97] transition-all",
              isPrediction('parity', 'par') ? "ring-2 ring-white animate-pulse-light" : ""
            )}
            onClick={() => onOptionSelect('parity', 'par')}
          >
            EVEN
          </div>
          <div 
            className={cn(
              "col-span-1 bg-gradient-to-br from-roulette-red to-red-700 border border-white/60 cursor-pointer hover:bg-roulette-red/80 flex items-center justify-center h-[48px] rounded-xl shadow-md hover:scale-[1.03] active:scale-[0.97] transition-all",
              isPrediction('color', 'rojo') ? "ring-2 ring-white animate-pulse-light" : ""
            )}
            onClick={() => onOptionSelect('color', 'rojo')}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-roulette-red to-red-700"></div>
          </div>
          <div 
            className={cn(
              "col-span-1 bg-gradient-to-br from-roulette-black to-gray-800 border border-white/60 cursor-pointer hover:bg-roulette-black/80 flex items-center justify-center h-[48px] rounded-xl shadow-md hover:scale-[1.03] active:scale-[0.97] transition-all",
              isPrediction('color', 'negro') ? "ring-2 ring-white animate-pulse-light" : ""
            )}
            onClick={() => onOptionSelect('color', 'negro')}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-roulette-black to-gray-800"></div>
          </div>
          <div 
            className={cn(
              "col-span-1 bg-gradient-to-br from-roulette-green to-green-700 border border-white/60 text-white text-center font-bold cursor-pointer hover:bg-roulette-green/80 flex items-center justify-center h-[48px] rounded-xl shadow-md hover:scale-[1.03] active:scale-[0.97] transition-all",
              isPrediction('parity', 'impar') ? "ring-2 ring-white animate-pulse-light" : ""
            )}
            onClick={() => onOptionSelect('parity', 'impar')}
          >
            ODD
          </div>
          <div 
            className={cn(
              "col-span-1 bg-gradient-to-br from-roulette-green to-green-700 border border-white/60 text-white text-center font-bold cursor-pointer hover:bg-roulette-green/80 flex items-center justify-center h-[48px] rounded-xl shadow-md hover:scale-[1.03] active:scale-[0.97] transition-all",
              isPrediction('half', '19-36') ? "ring-2 ring-white animate-pulse-light" : ""
            )}
            onClick={() => onOptionSelect('half', '19-36')}
          >
            19to36
          </div>
        </div>
      </div>
      
      <div className="col-span-1 flex flex-col">
        <div 
          className={cn(
            "bg-gradient-to-br from-roulette-green to-green-700 border border-white/60 text-white flex items-center justify-center font-bold text-xs md:text-sm cursor-pointer hover:bg-roulette-green/80 h-[48px] ml-1 mb-1 rounded-xl shadow-md hover:scale-[1.03] active:scale-[0.97] transition-all",
            isColumnRecommended('3rd_column') ? "ring-2 ring-white animate-pulse-light" : ""
          )}
          onClick={() => onOptionSelect('column', '3rd_column')}
        >
          2to1
        </div>
        <div 
          className={cn(
            "bg-gradient-to-br from-roulette-green to-green-700 border border-white/60 text-white flex items-center justify-center font-bold text-xs md:text-sm cursor-pointer hover:bg-roulette-green/80 h-[48px] ml-1 mb-1 rounded-xl shadow-md hover:scale-[1.03] active:scale-[0.97] transition-all",
            isColumnRecommended('2nd_column') ? "ring-2 ring-white animate-pulse-light" : ""
          )}
          onClick={() => onOptionSelect('column', '2nd_column')}
        >
          2to1
        </div>
        <div 
          className={cn(
            "bg-gradient-to-br from-roulette-green to-green-700 border border-white/60 text-white flex items-center justify-center font-bold text-xs md:text-sm cursor-pointer hover:bg-roulette-green/80 h-[48px] ml-1 rounded-xl shadow-md hover:scale-[1.03] active:scale-[0.97] transition-all",
            isColumnRecommended('1st_column') ? "ring-2 ring-white animate-pulse-light" : ""
          )}
          onClick={() => onOptionSelect('column', '1st_column')}
        >
          2to1
        </div>
      </div>
    </div>
  );
};

export default RouletteBoard;
