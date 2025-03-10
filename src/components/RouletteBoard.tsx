
import { useState } from "react";
import RouletteNumber from "./RouletteNumber";
import { cn } from "@/lib/utils";

interface RouletteBoardProps {
  lastNumber: number | null;
  highlightedNumbers: number[];
  onNumberClick: (number: number) => void;
  onOptionSelect: (type: string, value: string) => void;
  animateBoard: boolean;
}

const RouletteBoard = ({
  lastNumber,
  highlightedNumbers,
  onNumberClick,
  onOptionSelect,
  animateBoard
}: RouletteBoardProps) => {
  return (
    <div className={cn("grid grid-cols-14 gap-1 border-4 border-white p-4 mb-6", 
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
            className="col-span-1 bg-roulette-green border-2 border-white text-white text-center font-bold cursor-pointer hover:bg-roulette-green/80 flex items-center justify-center h-[48px]"
            onClick={() => onOptionSelect('dozen', '1st12')}
          >
            1st12
          </div>
          <div 
            className="col-span-1 bg-roulette-green border-2 border-white text-white text-center font-bold cursor-pointer hover:bg-roulette-green/80 flex items-center justify-center h-[48px]"
            onClick={() => onOptionSelect('dozen', '2nd12')}
          >
            2nd12
          </div>
          <div 
            className="col-span-1 bg-roulette-green border-2 border-white text-white text-center font-bold cursor-pointer hover:bg-roulette-green/80 flex items-center justify-center h-[48px]"
            onClick={() => onOptionSelect('dozen', '3rd12')}
          >
            3rd12
          </div>
        </div>
        
        <div className="grid grid-cols-6 gap-1 mt-1">
          <div 
            className="col-span-1 bg-roulette-green border-2 border-white text-white text-center font-bold cursor-pointer hover:bg-roulette-green/80 flex items-center justify-center h-[48px]"
            onClick={() => onOptionSelect('half', '1to18')}
          >
            1to18
          </div>
          <div 
            className="col-span-1 bg-roulette-green border-2 border-white text-white text-center font-bold cursor-pointer hover:bg-roulette-green/80 flex items-center justify-center h-[48px]"
            onClick={() => onOptionSelect('parity', 'even')}
          >
            EVEN
          </div>
          <div 
            className="col-span-1 bg-roulette-red border-2 border-white cursor-pointer hover:bg-roulette-red/80 flex items-center justify-center h-[48px]"
            onClick={() => onOptionSelect('color', 'rojo')}
          >
            <div className="w-8 h-8 rounded-full bg-roulette-red"></div>
          </div>
          <div 
            className="col-span-1 bg-roulette-black border-2 border-white cursor-pointer hover:bg-roulette-black/80 flex items-center justify-center h-[48px]"
            onClick={() => onOptionSelect('color', 'negro')}
          >
            <div className="w-8 h-8 rounded-full bg-roulette-black"></div>
          </div>
          <div 
            className="col-span-1 bg-roulette-green border-2 border-white text-white text-center font-bold cursor-pointer hover:bg-roulette-green/80 flex items-center justify-center h-[48px]"
            onClick={() => onOptionSelect('parity', 'odd')}
          >
            ODD
          </div>
          <div 
            className="col-span-1 bg-roulette-green border-2 border-white text-white text-center font-bold cursor-pointer hover:bg-roulette-green/80 flex items-center justify-center h-[48px]"
            onClick={() => onOptionSelect('half', '19to36')}
          >
            19to36
          </div>
        </div>
      </div>
      
      <div className="col-span-1 flex flex-col justify-between">
        {/* Three 2to1 buttons that align with rows */}
        <div 
          className="bg-roulette-green border-2 border-white text-white flex items-center justify-center font-bold text-xs md:text-sm cursor-pointer hover:bg-roulette-green/80 h-[48px] ml-1"
          onClick={() => onOptionSelect('column', '3rd_column')}
        >
          2to1
        </div>
        <div 
          className="bg-roulette-green border-2 border-white text-white flex items-center justify-center font-bold text-xs md:text-sm cursor-pointer hover:bg-roulette-green/80 h-[48px] ml-1"
          onClick={() => onOptionSelect('column', '2nd_column')}
        >
          2to1
        </div>
        <div 
          className="bg-roulette-green border-2 border-white text-white flex items-center justify-center font-bold text-xs md:text-sm cursor-pointer hover:bg-roulette-green/80 h-[48px] ml-1"
          onClick={() => onOptionSelect('column', '1st_column')}
        >
          2to1
        </div>
      </div>
    </div>
  );
};

export default RouletteBoard;
