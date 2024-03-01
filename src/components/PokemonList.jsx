import useFetchPokemonList from "@/hooks/customPokemonHooks";
import PokemonCard from "@/components/PokemonCard";

const PokemonList = (props) => {
    const pokemonList = useFetchPokemonList();

    return (
        <div className="grid grid-cols-5 gap-4">
            {pokemonList.map((pokemon, index) => (
                <PokemonCard key={index} {...pokemon} />
            ))}
        </div>
    )
}

export default PokemonList;