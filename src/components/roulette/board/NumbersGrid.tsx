
import React from "react";
import RouletteNumber from "../../RouletteNumber";

interface NumbersGridProps {
  highlightedNumbers: number[];
  lastNumber: number | null;
  onNumberClick: (number: number) => void;
}

const NumbersGrid = ({ highlightedNumbers, lastNumber, onNumberClick }: NumbersGridProps) => {
  return (
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
    </div>
  );
};

export default NumbersGrid;
