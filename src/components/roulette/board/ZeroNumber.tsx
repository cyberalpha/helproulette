
import React from "react";
import RouletteNumber from "../../RouletteNumber";

interface ZeroNumberProps {
  onNumberClick: (number: number) => void;
  highlighted: boolean;
  isLastResult: boolean;
}

const ZeroNumber = ({ onNumberClick, highlighted, isLastResult }: ZeroNumberProps) => {
  return (
    <div className="col-span-1 flex items-start justify-center pt-1">
      <RouletteNumber 
        number={0} 
        onClick={onNumberClick} 
        highlighted={highlighted}
        isLastResult={isLastResult}
        className="mr-1"
      />
    </div>
  );
};

export default ZeroNumber;
