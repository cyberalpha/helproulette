
// Este archivo ahora solo re-exporta el algoritmo refactorizado
// para mantener la compatibilidad con el código existente
export { processNumber, resetAlgorithm } from './roulette';
export type { PredictionResult } from './roulette/types';
export { colorVector, PESOS } from './roulette/constants';
