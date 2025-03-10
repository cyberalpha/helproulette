
import { cn } from "@/lib/utils";
import React from "react";

interface ColumnOptionsProps {
  recommendedColumns: number[];
  onOptionSelect: (type: string, value: string) => void;
}

const ColumnOptions = ({ recommendedColumns, onOptionSelect }: ColumnOptionsProps) => {
  const isColumnRecommended = (column: string) => {
    if (!recommendedColumns || recommendedColumns.length === 0) return false;
    
    if (column === '3rd_column' && recommendedColumns.includes(3)) return true;
    if (column === '2nd_column' && recommendedColumns.includes(2)) return true;
    if (column === '1st_column' && recommendedColumns.includes(1)) return true;
    
    return false;
  };

  return (
    <div className="col-span-1 flex flex-col">
      <div 
        className={cn(
          "bg-gradient-to-br from-roulette-green to-green-700 border border-white/60 text-white flex items-center justify-center font-bold text-xs md:text-sm cursor-pointer hover:bg-roulette-green/80 h-[48px] ml-1 mb-1 rounded-xl shadow-md hover:scale-[1.03] active:scale-[0.97] transition-all",
          isColumnRecommended('3rd_column') ? "ring-2 ring-white animate-pulse-light bg-green-600" : ""
        )}
        onClick={() => onOptionSelect('column', '3rd_column')}
      >
        2to1
      </div>
      <div 
        className={cn(
          "bg-gradient-to-br from-roulette-green to-green-700 border border-white/60 text-white flex items-center justify-center font-bold text-xs md:text-sm cursor-pointer hover:bg-roulette-green/80 h-[48px] ml-1 mb-1 rounded-xl shadow-md hover:scale-[1.03] active:scale-[0.97] transition-all",
          isColumnRecommended('2nd_column') ? "ring-2 ring-white animate-pulse-light bg-green-600" : ""
        )}
        onClick={() => onOptionSelect('column', '2nd_column')}
      >
        2to1
      </div>
      <div 
        className={cn(
          "bg-gradient-to-br from-roulette-green to-green-700 border border-white/60 text-white flex items-center justify-center font-bold text-xs md:text-sm cursor-pointer hover:bg-roulette-green/80 h-[48px] ml-1 rounded-xl shadow-md hover:scale-[1.03] active:scale-[0.97] transition-all",
          isColumnRecommended('1st_column') ? "ring-2 ring-white animate-pulse-light bg-green-600" : ""
        )}
        onClick={() => onOptionSelect('column', '1st_column')}
      >
        2to1
      </div>
    </div>
  );
};

export default ColumnOptions;
