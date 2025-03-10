
import { PredictionResult } from './types';
import { getInitialState, getEmptyResult } from './constants';
import { processRouletteNumber } from './processor';

// Estado global del algoritmo
let state = getInitialState();

// Función para resetear el algoritmo
export function resetAlgorithm(): void {
  state = getInitialState();
}

// Función principal del algoritmo que procesa un número y devuelve predicciones
export function processNumber(num: number): PredictionResult {
  if (num < 0 || num > 36) {
    resetAlgorithm();
    return getEmptyResult();
  }

  const { updatedState, result } = processRouletteNumber(num, state);
  state = updatedState;
  
  return result;
}

// Re-exportamos los tipos para que sean accesibles desde el módulo principal
export type { PredictionResult } from './types';
