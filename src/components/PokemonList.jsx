import { useFetchPokemonList } from "@/hooks/customPokemonHooks";
import PokemonCard from "@/components/PokemonCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"

const PokemonList = (props) => {
    const { pokemonList, loadMorePokemon, searchInput, setSearchInput } = useFetchPokemonList();

    return (
        <div>
            <div className="grid grid-cols-2 gap-4 pt-6 xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3">
                {pokemonList.map((pokemon, index) => (
                    <PokemonCard key={index} {...pokemon} />
                ))}
            </div>
            <div className="flex flex-col items-center justify-center w-full mt-6 border-red-50">
                <Separator orientation="horizontal"/>
                <Button variant="outline" onClick={loadMorePokemon} className="mt-6 mb-5 w-fit">Show more pokemon</Button>
            </div>
        </div>
    )
}

export default PokemonList;