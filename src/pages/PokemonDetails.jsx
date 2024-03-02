import { useParams } from "react-router-dom";
import { useFetchPokemonDetails } from "@/hooks/customPokemonHooks";

const PokemonDetails = (props) => {
    const { id } = useParams();
    const pokemon = useFetchPokemonDetails(id);

    if (!pokemon) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="flex flex-row">
                <div className="border">
                    <div className='px-2 md:min-h-[250px] min-h-[180px] flex items-center pokemon-img-container'>
                        <img src={pokemon.image} alt={pokemon.name} className="pokemon-img" />
                    </div>
                </div>
                <div className="border">
                    {pokemon.name}
                </div>
            </div>
        </div>
    );
}

export default PokemonDetails;