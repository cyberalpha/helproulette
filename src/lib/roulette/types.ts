
// Interfaz para los resultados de la predicción
export interface PredictionResult {
  highlightedNumbers: number[];
  predictions: {
    dozens: number[];
    lines: number[];
    columns: number[];
    streets: number[];
    squares: number[];
    doubleBlacks: number[];
    doubleReds: number[];
    color: string | null;
    parity: string | null;
    half: string | null;
    pleno: number[];
    trios: {
      trio012: number;
      trio023: number;
    };
    zeroDoubles: number[];
    suggestions: string[];
  };
  statistics: {
    zeroCount: number;
    plays: number;
    numberOccurrences: number[];
  };
}

// Interfaz para el estado del algoritmo
export interface RouletteState {
  plenos: number[];
  docenas: number[];
  lineas: number[];
  columnas: number[];
  calles: number[];
  cuadros: number[];
  doblenegros: number[];
  doblerojos: number[];
  dobleconceros: number[];
  par: number;
  impar: number;
  rojo: number;
  negro: number;
  mitadmenor: number;
  mitadmayor: number;
  trio012: number;
  trio023: number;
  zero: number;
  jugadas: number;
  cuentacero: number;
  salidos: number[];
}
