
import { RouletteState, PredictionResult } from './types';
import { colorVector, PESOS } from './constants';
import { findBestPlenosByCondition, findMinIndices } from './utils';

// Función para procesar la entrada de un número en la ruleta
export function processRouletteNumber(
  num: number,
  state: RouletteState
): { updatedState: RouletteState; result: PredictionResult } {
  // Copia el estado para no modificar el original
  const updatedState = { ...state };
  
  let color = 0;
  let linea = 0;
  let docena = 0;
  let columna = 0;
  let dobleconcero = 0;
  let l = 0;
  let desde = 0;
  let hasta = 0;

  // Clasificación del número
  switch (num) {
    case 0:
      updatedState.trio012 += PESOS.TRIO;
      updatedState.trio023 += PESOS.TRIO;
      dobleconcero = 0;
      updatedState.zero += PESOS.PLENO;
      updatedState.cuentacero += 1;
      break;
    case 1:
      color = 0;
      dobleconcero = 1;
      updatedState.trio012 += PESOS.TRIO;
      break;
    case 2:
      color = 1;
      dobleconcero = 2;
      updatedState.trio012 += PESOS.TRIO;
      updatedState.trio023 += PESOS.TRIO;
      break;
    case 3:
      color = 0;
      columna = 0;
      updatedState.trio023 += PESOS.TRIO;
      break;
    default:
      color = colorVector[num];
      break;
  }

  // Procesar el número si no es cero
  if (num !== 0) {
    // Carga de columnas (ajuste correcto de columnas)
    if (num > 0) {
      // Calculamos qué columna es según el residuo de la división por 3
      columna = (num - 1) % 3;
      updatedState.columnas[columna] += PESOS.COLUMNA;
    }

    // Cálculo de línea
    linea = num % 3;
    switch (linea) {
      case 0:
        linea = 2; // Para los números múltiplos de 3 (3, 6, 9, etc.)
        break;
      case 1:
        linea = 0; // Para los números que al dividir por 3 dan resto 1 (1, 4, 7, etc.)
        break;
      case 2:
        linea = 1; // Para los números que al dividir por 3 dan resto 2 (2, 5, 8, etc.)
        break;
    }
    updatedState.lineas[linea] += PESOS.DOCENA_LINEA;

    // Cálculo de docena
    if (num >= 1 && num <= 12) docena = 0;
    if (num >= 13 && num <= 24) docena = 1;
    if (num >= 25 && num <= 36) docena = 2;
    updatedState.docenas[docena] += PESOS.DOCENA_LINEA;

    // Asignación de par/impar
    if (num % 2 === 0) {
      updatedState.par += PESOS.FIFTY;
    } else {
      updatedState.impar += PESOS.FIFTY;
    }

    // Asignación de color
    if (colorVector[num] === 0) {
      updatedState.rojo += PESOS.FIFTY;
    } else if (colorVector[num] === 1) {
      updatedState.negro += PESOS.FIFTY;
    }

    // Asignación de mitades
    if (num <= 18) {
      updatedState.mitadmenor += PESOS.FIFTY;
    } else {
      updatedState.mitadmayor += PESOS.FIFTY;
    }

    // Asignación de pesos de calles
    if (num >= 1 && num <= 6) updatedState.calles[0] += PESOS.CALLE;
    if (num >= 4 && num <= 9) updatedState.calles[1] += PESOS.CALLE;
    if (num >= 7 && num <= 12) updatedState.calles[2] += PESOS.CALLE;
    if (num >= 10 && num <= 15) updatedState.calles[3] += PESOS.CALLE;
    if (num >= 13 && num <= 18) updatedState.calles[4] += PESOS.CALLE;
    if (num >= 16 && num <= 21) updatedState.calles[5] += PESOS.CALLE;
    if (num >= 19 && num <= 24) updatedState.calles[6] += PESOS.CALLE;
    if (num >= 22 && num <= 27) updatedState.calles[7] += PESOS.CALLE;
    if (num >= 25 && num <= 30) updatedState.calles[8] += PESOS.CALLE;
    if (num >= 28 && num <= 33) updatedState.calles[9] += PESOS.CALLE;
    if (num >= 31 && num <= 36) updatedState.calles[10] += PESOS.CALLE;

    // Dobles rojos
    if (num === 9 || num === 12) {
      updatedState.doblerojos[0] += PESOS.DOBLE_ROJO;
    }
    if (num === 16 || num === 19) {
      updatedState.doblerojos[1] += PESOS.DOBLE_ROJO;
    }
    if (num === 18 || num === 19) {
      updatedState.doblerojos[2] += PESOS.DOBLE_ROJO;
    }
    if (num === 27 || num === 30) {
      updatedState.doblerojos[3] += PESOS.DOBLE_ROJO;
    }

    // Dobles negros
    if (num === 8 || num === 11) {
      updatedState.doblenegros[0] += PESOS.DOBLE_NEGRO;
    }
    if (num === 10 || num === 11) {
      updatedState.doblenegros[1] += PESOS.DOBLE_NEGRO;
    }
    if (num === 10 || num === 13) {
      updatedState.doblenegros[2] += PESOS.DOBLE_NEGRO;
    }
    if (num === 17 || num === 20) {
      updatedState.doblenegros[3] += PESOS.DOBLE_NEGRO;
    }
    if (num === 26 || num === 29) {
      updatedState.doblenegros[4] += PESOS.DOBLE_NEGRO;
    }
    if (num === 28 || num === 29) {
      updatedState.doblenegros[5] += PESOS.DOBLE_NEGRO;
    }
    if (num === 28 || num === 31) {
      updatedState.doblenegros[6] += PESOS.DOBLE_NEGRO;
    }
  }

  // Plenos con el cero
  if (num !== 0) {
    updatedState.plenos[num] += PESOS.PLENO;
  }

  // Cálculos doble con cero
  if (num === 0 || num === 1 || num === 2 || num === 3) {
    updatedState.dobleconceros[dobleconcero] += PESOS.DOBLE_CON_CERO;
  }

  // Predecir color, par/impar y mitades
  if (updatedState.rojo < updatedState.negro) {
    l = l + 1;
    color = 0; // rojo
  } else if (updatedState.rojo > updatedState.negro) {
    l = l + 1;
    color = 1; // negro
  }

  if (updatedState.par < updatedState.impar) {
    l = l + 2;
    color = 0; // par
  } else if (updatedState.par > updatedState.impar) {
    l = l + 2;
    color = 1; // impar
  }

  if (updatedState.mitadmenor < updatedState.mitadmayor) {
    l = l + 4;
    desde = 1;
    hasta = 18;
  } else if (updatedState.mitadmenor > updatedState.mitadmayor) {
    l = l + 4;
    desde = 19;
    hasta = 36;
  }

  // Aumentar contador de jugadas y agregar el número a la lista de salidos
  updatedState.jugadas += 1;
  updatedState.salidos.push(num);

  // Preparar el resultado de la predicción
  return {
    updatedState,
    result: generatePredictionResult(updatedState, l, color, color, desde, hasta)
  };
}

// Función para generar el resultado de predicción basado en el estado actual
function generatePredictionResult(
  state: RouletteState,
  l: number,
  color: number,
  paridad: number,
  desde: number,
  hasta: number
): PredictionResult {
  // Encontrar los números con menor peso para las predicciones
  const dozensMin = findMinIndices(state.docenas);
  const linesMin = findMinIndices(state.lineas);
  const columnsMin = findMinIndices(state.columnas);
  const streetsMin = findMinIndices(state.calles);
  const squaresMin = findMinIndices(state.cuadros);
  const doubleBlacksMin = findMinIndices(state.doblenegros);
  const doubleRedsMin = findMinIndices(state.doblerojos);
  
  // Predicciones de plenos basadas en el algoritmo
  const plenosPrediction = findBestPlenosByCondition(
    state.plenos, l, color, paridad, desde, hasta, colorVector
  );
  
  // Determinar predicciones específicas
  const colorPrediction = l === 1 || l === 3 || l === 5 || l === 7 
    ? (color === 0 ? "rojo" : "negro") 
    : null;
    
  const parityPrediction = l === 2 || l === 3 || l === 6 || l === 7 
    ? (paridad === 0 ? "par" : "impar") 
    : null;
    
  const halfPrediction = l === 4 || l === 5 || l === 6 || l === 7 
    ? (desde === 1 ? "1-18" : "19-36") 
    : null;

  // Recopilación de sugerencias de texto
  const suggestions: string[] = [];
  if (colorPrediction) suggestions.push(`Color: ${colorPrediction}`);
  if (parityPrediction) suggestions.push(`Paridad: ${parityPrediction}`);
  if (halfPrediction) suggestions.push(`Mitad: ${halfPrediction}`);
  
  if (state.jugadas === 9 || 
      (state.jugadas >= 30 && state.jugadas <= 34) || 
      (state.jugadas >= 60 && state.jugadas <= 70)) {
    suggestions.push("¡Atención! Posible salida del cero");
  }

  // Creación de result con los números destacados y predicciones
  return {
    highlightedNumbers: [...plenosPrediction],
    predictions: {
      dozens: dozensMin.map(i => i + 1),
      lines: linesMin.map(i => i + 1),
      columns: columnsMin.map(i => i + 1),
      streets: streetsMin.map(i => i + 1),
      squares: squaresMin.map(i => i + 1),
      doubleBlacks: doubleBlacksMin.map(i => i + 1),
      doubleReds: doubleRedsMin.map(i => i + 1),
      color: colorPrediction,
      parity: parityPrediction,
      half: halfPrediction,
      pleno: plenosPrediction,
      trios: {
        trio012: state.trio012,
        trio023: state.trio023
      },
      zeroDoubles: findMinIndices(state.dobleconceros).map(i => i),
      suggestions
    },
    statistics: {
      zeroCount: state.cuentacero,
      plays: state.jugadas,
      numberOccurrences: state.plenos.map(p => p / PESOS.PLENO)
    }
  };
}
