import { test, expect } from '@playwright/test';
import { ordenar_alfabeticamente, PokemonData } from '../scripts/ordenamiento';
import { extraer_nombres_de_cadena_evolucion } from '../scripts/pokemon';
import dotenv from 'dotenv';
import path from 'path';

// Cargar variables de entorno desde el archivo .env en la raíz del proyecto
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const base_url = process.env.BASE_URL_POKEMON || '';

if (!base_url) {
  throw new Error('La URL base de la API de Pokémon no está configurada. Verifique el archivo .env');
}

test('Prueba de integración: Cadena de evoluciones de Squirtle', async ({ request }) => {

  // Paso 1: Obtener datos de Squirtle
  console.log('Obteniendo datos de Squirtle...');
  const squirtle_response = await request.get(`${base_url}/pokemon/squirtle`);
  
  // Verificar código de respuesta 200
  expect(squirtle_response.status()).toBe(200);
  const squirtle_data = await squirtle_response.json();
  
  // Paso 2: Obtener la URL de la especie
  console.log('Obteniendo información de la especie...');
  const species_url = squirtle_data.species.url;
  const species_response = await request.get(species_url);
  
  // Verificar código de respuesta 200
  expect(species_response.status()).toBe(200);
  const species_data = await species_response.json();
  
  // Paso 3: Obtener la cadena de evolución
  console.log('Obteniendo cadena de evolución...');
  const evolution_chain_url = species_data.evolution_chain.url;
  const evolution_chain_response = await request.get(evolution_chain_url);
  
  // Verificar código de respuesta 200
  expect(evolution_chain_response.status()).toBe(200);
  const evolution_chain_data = await evolution_chain_response.json();
  
  // Extraer todos los nombres de la cadena de evolución
  console.log('Extrayendo nombres de la cadena de evolución...');
  const nombres_pokemon = extraer_nombres_de_cadena_evolucion(evolution_chain_data.chain);
  console.log(`   Nombres encontrados: ${nombres_pokemon.join(', ')}`);
  
  //  Obtener el peso de cada Pokemon
  console.log('Obteniendo pesos de cada Pokemon...');
  const pokemons_con_peso: PokemonData[] = [];
  
  for (const nombre of nombres_pokemon) {
    const pokemon_response = await request.get(`${base_url}/pokemon/${nombre}`);
    
    // Verificar código de respuesta 200
    expect(pokemon_response.status()).toBe(200);
    const pokemon_data = await pokemon_response.json();
    
    pokemons_con_peso.push({
      name: pokemon_data.name,
      weight: pokemon_data.weight
    });
  }
  
  // Ordenar alfabéticamente sin usar .sort()
  console.log('Ordenando alfabéticamente...');
  const pokemons_ordenados = ordenar_alfabeticamente(pokemons_con_peso);
  
  // Imprimir resultados
 
  console.log('Pokemon ordenados alfabéticamente con sus pesos:');
  console.log('------------------------------------------------');
  for (const pokemon of pokemons_ordenados) {
    console.log(`${pokemon.name}: ${pokemon.weight} kg`);
  }
  console.log('------------------------------------------------\n');
  
  // Validaciones adicionales
  expect(nombres_pokemon.length).toBeGreaterThan(0); //validar que la lista de nombres no esté vacía
  expect(pokemons_ordenados.length).toBe(nombres_pokemon.length); //validar que el número de pokemons ordenados sea igual al número de nombres
  
  // Verificar que el ordenamiento es correcto
  for (let i = 0; i < pokemons_ordenados.length - 1; i++) {
    const nombre_actual = pokemons_ordenados[i].name.toLowerCase();
    const nombre_siguiente = pokemons_ordenados[i + 1].name.toLowerCase();
    expect(nombre_actual <= nombre_siguiente).toBe(true);
  }
  
  // Verificar que Squirtle está en la lista
  const nombres_lowercase = pokemons_ordenados.map(p => p.name.toLowerCase());
  expect(nombres_lowercase).toContain('squirtle');
});

