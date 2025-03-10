
// Vector de colores para los números (0 = rojo, 1 = negro, 3 = verde(cero))
export const colorVector = [
  3, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0
];

// Pesos para las predicciones
export const PESOS = {
  FIFTY: 0.5,
  PLENO: 0.027027027027,
  DOCENA_LINEA: 0.333333333333,
  COLUMNA: 0.083333333333,
  CALLE: 0.090909090909,
  CUADRO: 0.045454545454,
  DOBLE_NEGRO: 0.142857142857,
  DOBLE_ROJO: 0.25,
  DOBLE_CON_CERO: 0.333333333333,
  TRIO: 0.5
};

// Estado inicial del algoritmo
export function getInitialState() {
  return {
    plenos: Array(37).fill(0),
    docenas: Array(3).fill(0),
    lineas: Array(3).fill(0),
    columnas: Array(3).fill(0),
    calles: Array(11).fill(0),
    cuadros: Array(22).fill(0),
    doblenegros: Array(7).fill(0),
    doblerojos: Array(4).fill(0),
    dobleconceros: Array(4).fill(0),
    par: 0,
    impar: 0,
    rojo: 0,
    negro: 0,
    mitadmenor: 0,
    mitadmayor: 0,
    trio012: 0,
    trio023: 0,
    zero: 0,
    jugadas: 0,
    cuentacero: 0,
    salidos: []
  };
}

// Estado por defecto para resultado vacío
export function getEmptyResult() {
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
