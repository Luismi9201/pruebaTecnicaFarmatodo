/**
 * Función recursiva para extraer todos los nombres de Pokemon de una cadena de evolución
 */
export function extraer_nombres_de_cadena_evolucion(chain: any, nombres: string[] = []): string[] {
  if (!chain) {
    return nombres;
  }
  
  // Agregar el nombre de la especie actual
  if (chain.species && chain.species.name) {
    nombres.push(chain.species.name);
  }
  
  // Recursivamente procesar las evoluciones
  if (chain.evolves_to && chain.evolves_to.length > 0) {
    for (const evolucion of chain.evolves_to) {
      extraer_nombres_de_cadena_evolucion(evolucion, nombres);
    }
  }
  
  return nombres;
}

