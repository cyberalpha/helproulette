import { toast } from "@/components/ui/use-toast";

// Tipo de opciones seleccionadas
export interface SelectedOptions {
  color: string | null;
  parity: string | null;
  half: string | null;
  dozen: string | null;
  column: string | null;
}

// Verificar ganancias basado en las apuestas
export const checkWinnings = (
  number: number, 
  selectedOptions: SelectedOptions,
  setSelectedOptions: (options: SelectedOptions) => void
): number => {
  let wins = 0;
  const messages: string[] = [];
  
  if (selectedOptions.color) {
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    const isRed = redNumbers.includes(number);
    const userSelectedRed = selectedOptions.color === "rojo";
    
    if ((isRed && userSelectedRed) || (!isRed && !userSelectedRed && number !== 0)) {
      wins++;
      messages.push(`¡Ganaste! Color ${selectedOptions.color} correcto`);
    }
  }
  
  if (selectedOptions.parity && number !== 0) {
    const isEven = number % 2 === 0;
    const userSelectedEven = selectedOptions.parity === "par";
    
    if ((isEven && userSelectedEven) || (!isEven && !userSelectedEven)) {
      wins++;
      messages.push(`¡Ganaste! Paridad ${selectedOptions.parity} correcta`);
    }
  }
  
  if (selectedOptions.half && number !== 0) {
    const isFirstHalf = number >= 1 && number <= 18;
    const userSelectedFirstHalf = selectedOptions.half === "1-18";
    
    if ((isFirstHalf && userSelectedFirstHalf) || (!isFirstHalf && !userSelectedFirstHalf)) {
      wins++;
      messages.push(`¡Ganaste! Mitad ${selectedOptions.half} correcta`);
    }
  }
  
  if (selectedOptions.dozen && number !== 0) {
    const dozenMap: Record<string, [number, number]> = {
      "1st12": [1, 12],
      "2nd12": [13, 24],
      "3rd12": [25, 36]
    };
    
    const [min, max] = dozenMap[selectedOptions.dozen] || [0, 0];
    if (number >= min && number <= max) {
      wins++;
      messages.push(`¡Ganaste! Docena ${selectedOptions.dozen} correcta`);
    }
  }
  
  if (selectedOptions.column && number !== 0) {
    const firstColumn = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
    const secondColumn = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
    const thirdColumn = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
    
    let columnWin = false;
    if (selectedOptions.column === "1st_column" && firstColumn.includes(number)) columnWin = true;
    if (selectedOptions.column === "2nd_column" && secondColumn.includes(number)) columnWin = true;
    if (selectedOptions.column === "3rd_column" && thirdColumn.includes(number)) columnWin = true;
    
    if (columnWin) {
      wins++;
      messages.push(`¡Ganaste! Columna seleccionada correcta`);
    }
  }
  
  if (wins > 0) {
    toast({
      title: `¡Enhorabuena! ${wins} apuesta(s) ganadora(s)`,
      description: messages.join(". "),
      duration: 4000,
    });
  } else if (Object.values(selectedOptions).some(val => val !== null)) {
    toast({
      title: "No has ganado en esta ronda",
      description: "¡Sigue intentándolo!",
      duration: 2000,
    });
  }
  
  setSelectedOptions({
    color: null,
    parity: null,
    half: null,
    dozen: null,
    column: null,
  });
  
  return wins;
};

// Manejar selección de opciones
export const handleOptionSelect = (
  type: string, 
  value: string, 
  setSelectedOptions: (options: SelectedOptions) => void,
  selectedOptions: SelectedOptions
) => {
  setSelectedOptions({
    ...selectedOptions,
    [type]: value
  });
  
  toast({
    title: `Opción seleccionada: ${value}`,
    description: "Tu apuesta ha sido registrada",
    duration: 2000,
  });
};
