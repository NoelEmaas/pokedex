import PokemonCard from "@/components/PokemonCard";

const PokemonList = (props) => {
    return (
        <div className="grid grid-cols-2 gap-4 pt-6 xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3">
            {props.pokemonList.map((pokemon, index) => (
                <PokemonCard key={index} {...pokemon} />
            ))}
        </div>
    )
}

export default PokemonList;