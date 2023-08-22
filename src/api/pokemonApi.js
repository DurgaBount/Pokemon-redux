const BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchPokemonList() {
  const response = await fetch(`${BASE_URL}/pokemon`);
  const data = await response.json();
  const pokemonWithDetails = await Promise.all(
    data.results.map(async (pokemon) => {
      const details = await fetchPokemonDetails(pokemon.name);
      return { ...pokemon, details };
    })
  );
  return pokemonWithDetails;
}

export async function fetchPokemonDetails(pokemonName) {
  const response = await fetch(`${BASE_URL}/pokemon/${pokemonName}`);
  const data = await response.json();
  return data;
}