
import React from "react";
import BettingOption from "./BettingOption";

interface DozenOptionsProps {
  recommendedDozens: string[];
  onOptionSelect: (type: string, value: string) => void;
}

const DozenOptions = ({ recommendedDozens, onOptionSelect }: DozenOptionsProps) => {
  const isDozenRecommended = (dozen: string) => {
    return recommendedDozens.includes(dozen);
  };

  return (
    <div className="grid grid-cols-3 gap-1">
      <BettingOption
        label="1st12"
        type="dozen"
        value="1st12"
        highlighted={isDozenRecommended('1st12')}
        onClick={onOptionSelect}
        className="h-[48px]"
      />
      <BettingOption
        label="2nd12"
        type="dozen"
        value="2nd12"
        highlighted={isDozenRecommended('2nd12')}
        onClick={onOptionSelect}
        className="h-[48px]"
      />
      <BettingOption
        label="3rd12"
        type="dozen"
        value="3rd12"
        highlighted={isDozenRecommended('3rd12')}
        onClick={onOptionSelect}
        className="h-[48px]"
      />
    </div>
  );
};

export default DozenOptions;
