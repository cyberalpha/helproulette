
import { cn } from "@/lib/utils";

interface BettingOptionsProps {
  onSelectOption: (type: string, value: string) => void;
  highlightedOptions: {
    color: string | null;
    parity: string | null;
    half: string | null;
  };
}

const BettingOptions = ({
  onSelectOption,
  highlightedOptions
}: BettingOptionsProps) => {
  // Opciones de apuesta
  const options = [
    { 
      type: 'color', 
      value: 'rojo', 
      label: 'Rojo', 
      className: 'bg-gradient-to-br from-roulette-red to-red-700 text-white' 
    },
    { 
      type: 'color', 
      value: 'negro', 
      label: 'Negro', 
      className: 'bg-gradient-to-br from-roulette-black to-gray-800 text-white' 
    },
    { 
      type: 'parity', 
      value: 'par', 
      label: 'EVEN', 
      className: 'bg-gradient-to-br from-roulette-green to-green-700 border border-white/20 text-white' 
    },
    { 
      type: 'parity', 
      value: 'impar', 
      label: 'ODD', 
      className: 'bg-gradient-to-br from-roulette-green to-green-700 border border-white/20 text-white' 
    },
    { 
      type: 'half', 
      value: '1-18', 
      label: '1-18', 
      className: 'bg-gradient-to-br from-roulette-green to-green-700 border border-white/20 text-white' 
    },
    { 
      type: 'half', 
      value: '19-36', 
      label: '19-36', 
      className: 'bg-gradient-to-br from-roulette-green to-green-700 border border-white/20 text-white' 
    },
  ];

  const isHighlighted = (type: string, value: string) => {
    if (type === 'color' && highlightedOptions.color === value) return true;
    if (type === 'parity' && highlightedOptions.parity === value) return true;
    if (type === 'half' && highlightedOptions.half === value) return true;
    return false;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-3 w-full mt-6">
      {options.map((option) => (
        <button
          key={`${option.type}-${option.value}`}
          onClick={() => onSelectOption(option.type, option.value)}
          className={cn(
            "rounded-xl py-3 px-4 transition-all duration-300 shadow-md",
            "hover:scale-[1.03] active:scale-[0.97]",
            option.className,
            isHighlighted(option.type, option.value) && "ring-2 ring-roulette-gold animate-glow"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default BettingOptions;
