import { useEffect } from "react";
import { fetchPokemonList, fetchPokemonDetails } from "../../api/pokemonApi";
import { pokemanActions } from "../../redux/reducers/PokemanReducer";
import { useDispatch, useSelector } from "react-redux";
import PokemonCard from "../../components/pokemonCard";
import "./styles.css";

const PokemonsList = () => {
  const dispatch = useDispatch();
  const pokemansDetails = useSelector((state) => state.pokeman.pokemansDetails);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchPokemonList();
      const pokemonWithDetails = await Promise.all(
        data.map(async (pokemon) => {
          const details = await fetchPokemonDetails(pokemon.name);
          return { ...pokemon, details };
        })
      );
      dispatch(pokemanActions.setPokemansDetails(pokemonWithDetails));
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>{"Pokemon List"}</h1>
      <div className="pokemon-cards-row">
        {pokemansDetails?.map((pokeman) => (
          <PokemonCard pokeman={pokeman} key={pokeman.name}></PokemonCard>
        ))}
      </div>
    </div>
  );
};

export default PokemonsList;
