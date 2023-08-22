const BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchPokemonList() {
  const response = await fetch(`${BASE_URL}/pokemon`);
  const data = await response.json();
  return data.results;
}

export async function fetchPokemonDetails(pokemonName) {
  const response = await fetch(`${BASE_URL}/pokemon/${pokemonName}`);
  const data = await response.json();
  return data;
}