import { useEffect } from "react";
import { fetchPokemonList } from "../../api/pokemonApi";
import { pokemanActions } from "../../redux/reducers/PokemanReducer";
import { useDispatch, useSelector } from "react-redux";
import PokemonCard from "../../components/pokemonCard";
import "./styles.css";

const PokemonsList = () => {
  const dispatch = useDispatch();
  const pokemansDetails = useSelector((state) => state.pokeman.pokemansDetails);

  useEffect(() => {
    if (!pokemansDetails?.length) {
      async function fetchData() {
        const data = await fetchPokemonList();
        dispatch(pokemanActions.setPokemansDetails(data));
      }
      fetchData();
    }
  }, [pokemansDetails]);

  return (
    <div className="container">
      <h1>Pokemon List</h1>
      <div className="pokemon-cards-row">
        {pokemansDetails?.map((pokeman) => (
          <PokemonCard pokeman={pokeman} key={pokeman.name}></PokemonCard>
        ))}
      </div>
    </div>
  );
};

export default PokemonsList;
