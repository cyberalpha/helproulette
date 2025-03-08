
// Traducción del algoritmo de ruleta de C# a TypeScript

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

// Vector de colores para los números (0 = rojo, 1 = negro, 3 = verde(cero))
const colorVector = [
  3, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0
];

// Matriz para almacenar los pesos de las predicciones
let plenos: number[] = Array(37).fill(0);
let docenas: number[] = Array(3).fill(0);
let lineas: number[] = Array(3).fill(0);
let columnas: number[] = Array(12).fill(0);
let calles: number[] = Array(11).fill(0);
let cuadros: number[] = Array(22).fill(0);
let doblenegros: number[] = Array(7).fill(0);
let doblerojos: number[] = Array(4).fill(0);
let dobleconceros: number[] = Array(4).fill(0);

// Variables para las predicciones
let par = 0;
let impar = 0;
let rojo = 0;
let negro = 0;
let mitadmenor = 0;
let mitadmayor = 0;
let trio012 = 0;
let trio023 = 0;
let zero = 0;
let jugadas = 0;
let cuentacero = 0;

// Pesos para las predicciones
const pesofifty = 0.5;
const pesopleno = 0.027027027027;
const pesodocenaylinea = 0.333333333333;
const pesocolumna = 0.083333333333;
const pesocalle = 0.090909090909;
const pesocuadro = 0.045454545454;
const pesodoblenegro = 0.142857142857;
const pesodoblerojo = 0.25;
const pesodobleconcero = 0.333333333333;
const pesotrio = 0.5;

// Historial de números salidos
let salidos: number[] = [];

// Función para resetear el algoritmo
export function resetAlgorithm(): void {
  plenos = Array(37).fill(0);
  docenas = Array(3).fill(0);
  lineas = Array(3).fill(0);
  columnas = Array(12).fill(0);
  calles = Array(11).fill(0);
  cuadros = Array(22).fill(0);
  doblenegros = Array(7).fill(0);
  doblerojos = Array(4).fill(0);
  dobleconceros = Array(4).fill(0);
  
  par = 0;
  impar = 0;
  rojo = 0;
  negro = 0;
  mitadmenor = 0;
  mitadmayor = 0;
  trio012 = 0;
  trio023 = 0;
  zero = 0;
  jugadas = 0;
  cuentacero = 0;
  salidos = [];
}

// Función principal del algoritmo que procesa un número y devuelve predicciones
export function processNumber(num: number): PredictionResult {
  if (num < 0 || num > 36) {
    resetAlgorithm();
    return createEmptyResult();
  }

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
      trio012 += pesotrio;
      trio023 += pesotrio;
      dobleconcero = 0;
      zero += pesopleno;
      cuentacero += 1;
      break;
    case 1:
      color = 0;
      dobleconcero = 1;
      trio012 += pesotrio;
      break;
    case 2:
      color = 1;
      dobleconcero = 2;
      trio012 += pesotrio;
      trio023 += pesotrio;
      break;
    case 3:
      color = 0;
      columna = 0;
      trio023 += pesotrio;
      break;
    default:
      color = colorVector[num];
      columna = Math.floor((num - 1) / 3);
      break;
  }

  // Procesar el número si no es cero
  if (num !== 0) {
    // Carga de columnas
    columna = 0;
    for (let i = 1; i <= 36; i += 3) {
      if (num >= i && num <= (i + 2)) {
        columnas[columna] += pesocolumna;
        break;
      }
      columna++;
    }

    // Cálculo de línea
    linea = num % 3;
    switch (linea) {
      case 0:
        linea = 2;
        break;
      case 1:
        linea = 0;
        break;
      case 2:
        linea = 1;
        break;
    }
    lineas[linea] += pesodocenaylinea;

    // Cálculo de docena
    if (num >= 1 && num <= 12) docena = 0;
    if (num >= 13 && num <= 24) docena = 1;
    if (num >= 25 && num <= 36) docena = 2;
    docenas[docena] += pesodocenaylinea;

    // Asignación de par/impar
    if (num % 2 === 0) {
      par += pesofifty;
    } else {
      impar += pesofifty;
    }

    // Asignación de color
    if (colorVector[num] === 0) {
      rojo += pesofifty;
    } else if (colorVector[num] === 1) {
      negro += pesofifty;
    }

    // Asignación de mitades
    if (num <= 18) {
      mitadmenor += pesofifty;
    } else {
      mitadmayor += pesofifty;
    }

    // Asignación de pesos de calles
    if (num >= 1 && num <= 6) calles[0] += pesocalle;
    if (num >= 4 && num <= 9) calles[1] += pesocalle;
    if (num >= 7 && num <= 12) calles[2] += pesocalle;
    if (num >= 10 && num <= 15) calles[3] += pesocalle;
    if (num >= 13 && num <= 18) calles[4] += pesocalle;
    if (num >= 16 && num <= 21) calles[5] += pesocalle;
    if (num >= 19 && num <= 24) calles[6] += pesocalle;
    if (num >= 22 && num <= 27) calles[7] += pesocalle;
    if (num >= 25 && num <= 30) calles[8] += pesocalle;
    if (num >= 28 && num <= 33) calles[9] += pesocalle;
    if (num >= 31 && num <= 36) calles[10] += pesocalle;

    // Dobles rojos
    if (num === 9 || num === 12) {
      doblerojos[0] += pesodoblerojo;
    }
    if (num === 16 || num === 19) {
      doblerojos[1] += pesodoblerojo;
    }
    if (num === 18 || num === 19) {
      doblerojos[2] += pesodoblerojo;
    }
    if (num === 27 || num === 30) {
      doblerojos[3] += pesodoblerojo;
    }

    // Dobles negros
    if (num === 8 || num === 11) {
      doblenegros[0] += pesodoblenegro;
    }
    if (num === 10 || num === 11) {
      doblenegros[1] += pesodoblenegro;
    }
    if (num === 10 || num === 13) {
      doblenegros[2] += pesodoblenegro;
    }
    if (num === 17 || num === 20) {
      doblenegros[3] += pesodoblenegro;
    }
    if (num === 26 || num === 29) {
      doblenegros[4] += pesodoblenegro;
    }
    if (num === 28 || num === 29) {
      doblenegros[5] += pesodoblenegro;
    }
    if (num === 28 || num === 31) {
      doblenegros[6] += pesodoblenegro;
    }
  }

  // Plenos con el cero
  if (num !== 0) {
    plenos[num] += pesopleno;
  }

  // Cálculos doble con cero
  if (num === 0 || num === 1 || num === 2 || num === 3) {
    dobleconceros[dobleconcero] += pesodobleconcero;
  }

  // Predecir color, par/impar y mitades
  if (rojo < negro) {
    l = l + 1;
    color = 0; // rojo
  } else if (rojo > negro) {
    l = l + 1;
    color = 1; // negro
  }

  if (par < impar) {
    l = l + 2;
    par = 0; // par
  } else if (par > impar) {
    l = l + 2;
    par = 1; // impar
  }

  if (mitadmenor < mitadmayor) {
    l = l + 4;
    desde = 1;
    hasta = 18;
  } else if (mitadmenor > mitadmayor) {
    l = l + 4;
    desde = 19;
    hasta = 36;
  }

  // Aumentar contador de jugadas y agregar el número a la lista de salidos
  jugadas += 1;
  salidos.push(num);

  // Encontrar los números con menor peso para las predicciones
  const dozensMin = findMinIndices(docenas);
  const linesMin = findMinIndices(lineas);
  const columnsMin = findMinIndices(columnas);
  const streetsMin = findMinIndices(calles);
  const squaresMin = findMinIndices(cuadros);
  const doubleBlacksMin = findMinIndices(doblenegros);
  const doubleRedsMin = findMinIndices(doblerojos);
  
  // Predicciones de plenos basadas en el algoritmo
  let plenosPrediction: number[] = findBestPlenosByCondition(l, color as number, par as number, desde, hasta);
  
  // Determinar predicciones específicas
  const colorPrediction = l === 1 || l === 3 || l === 5 || l === 7 
    ? (color === 0 ? "rojo" : "negro") 
    : null;
    
  const parityPrediction = l === 2 || l === 3 || l === 6 || l === 7 
    ? (par === 0 ? "par" : "impar") 
    : null;
    
  const halfPrediction = l === 4 || l === 5 || l === 6 || l === 7 
    ? (desde === 1 ? "1-18" : "19-36") 
    : null;

  // Recopilación de sugerencias de texto
  const suggestions: string[] = [];
  if (colorPrediction) suggestions.push(`Color: ${colorPrediction}`);
  if (parityPrediction) suggestions.push(`Paridad: ${parityPrediction}`);
  if (halfPrediction) suggestions.push(`Mitad: ${halfPrediction}`);
  
  if (jugadas === 9 || (jugadas >= 30 && jugadas <= 34) || (jugadas >= 60 && jugadas <= 70)) {
    suggestions.push("¡Atención! Posible salida del cero");
  }

  // Creación de result con los números destacados y predicciones
  const highlightedNumbers = [...plenosPrediction];

  return {
    highlightedNumbers,
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
        trio012: trio012,
        trio023: trio023
      },
      zeroDoubles: findMinIndices(dobleconceros).map(i => i),
      suggestions
    },
    statistics: {
      zeroCount: cuentacero,
      plays: jugadas,
      numberOccurrences: plenos.map(p => p / pesopleno)
    }
  };
}

// Función auxiliar para encontrar los índices con valor mínimo en un array
function findMinIndices(arr: number[]): number[] {
  if (arr.length === 0) return [];
  
  let min = arr[0];
  let indices: number[] = [0];
  
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
      indices = [i];
    } else if (arr[i] === min) {
      indices.push(i);
    }
  }
  
  return indices;
}

// Función para encontrar los mejores plenos según las condiciones
function findBestPlenosByCondition(l: number, color: number, paridad: number, desde: number, hasta: number): number[] {
  // Ordenar los números por sus pesos
  let numerosOrdenados = plenos
    .map((peso, numero) => ({ peso, numero }))
    .sort((a, b) => a.peso - b.peso);
  
  // Filtrar según las condiciones
  const plenosFiltrados = numerosOrdenados.filter(({ numero }) => {
    if (numero === 0) return false;
    
    let cumpleCondiciones = true;
    
    // Verificar condiciones de color, paridad y rango
    if ((l === 1 || l === 3 || l === 5 || l === 7) && colorVector[numero] !== color) {
      cumpleCondiciones = false;
    }
    
    if ((l === 2 || l === 3 || l === 6 || l === 7) && (numero % 2 !== paridad)) {
      cumpleCondiciones = false;
    }
    
    if ((l === 4 || l === 5 || l === 6 || l === 7) && (numero < desde || numero > hasta)) {
      cumpleCondiciones = false;
    }
    
    return cumpleCondiciones;
  });
  
  // Tomar los primeros 5 o menos
  const mejoresPlenos = plenosFiltrados.slice(0, 5);
  
  return mejoresPlenos.map(item => item.numero);
}

function createEmptyResult(): PredictionResult {
  return {
    highlightedNumbers: [],
    predictions: {
      dozens: [],
      lines: [],
      columns: [],
      streets: [],
      squares: [],
      doubleBlacks: [],
      doubleReds: [],
      color: null,
      parity: null,
      half: null,
      pleno: [],
      trios: {
        trio012: 0,
        trio023: 0
      },
      zeroDoubles: [],
      suggestions: ["Ingrese un número para comenzar las predicciones"]
    },
    statistics: {
      zeroCount: 0,
      plays: 0,
      numberOccurrences: Array(37).fill(0)
    }
  };
}
