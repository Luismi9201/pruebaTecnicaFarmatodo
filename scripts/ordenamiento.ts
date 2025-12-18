/**
 * Interfaz para representar un Pokemon con su nombre y peso
 */
export interface PokemonData {
  name: string;
  weight: number;
}

/**
 * Función de ordenamiento alfabético sin usar métodos nativos como .sort()
 * Implementa el algoritmo ordenamiento burbuja
 */
export function ordenar_alfabeticamente(pokemons: PokemonData[]): PokemonData[] {
  const resultado = [...pokemons]; // Crear una copia para no modificar el original
  const n = resultado.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Comparar nombres alfabéticamente (case-insensitive)
      if (resultado[j].name.toLowerCase() > resultado[j + 1].name.toLowerCase()) {
        // Intercambiar elementos
        const temp = resultado[j];
        resultado[j] = resultado[j + 1];
        resultado[j + 1] = temp;
      }
    }
  }
  
  return resultado;
}

