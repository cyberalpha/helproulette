
// Función auxiliar para encontrar los índices con valor mínimo en un array
export function findMinIndices(arr: number[]): number[] {
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
export function findBestPlenosByCondition(
  plenos: number[], 
  l: number, 
  color: number, 
  paridad: number, 
  desde: number, 
  hasta: number,
  colorVector: number[]
): number[] {
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
