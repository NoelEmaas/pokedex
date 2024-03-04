import { useParams } from "react-router-dom";

import { useFetchPokemonDetails } from "@/hooks/customPokemonHooks";
import PokemonStats from "@/pages/PokemonDetails/components/PokemonStats";
import NextPrevButtons from "@/pages/PokemonDetails/components/NextPrevButtons";
import PokemonImageCard from "@/pages/PokemonDetails/components/PokemonImageCard";
import PokemonBasicInfo from "@/pages/PokemonDetails/components/PokemonBasicInfo";
import PokemonAbilities from "@/pages/PokemonDetails/components/PokemonAbilities";
import PokemonDescription from "@/pages/PokemonDetails/components/PokemonDescription";

const PokemonDetails = () => {
    const { id } = useParams();
    const pokemon = useFetchPokemonDetails(id);

    if (!pokemon) {
        return <div>Loading...</div>;
    }

    return (
        <div className='h-screen overflow-y-auto bg-[#010101]'>
            <div className="container flex flex-col items-center justify-center pt-10">
                <NextPrevButtons id={id} />
                <div className="flex flex-col mb-10 rounded-lg md:flex-row">
                    <div className="bg-[#050911] border-[#373A41] border p-10">
                        <PokemonImageCard pokemon={pokemon}/>
                        <PokemonBasicInfo pokemon={pokemon}/>
                    </div>
                    <div className="bg-[#050911] md:w-[500px] w-full border-[#373A41] border md:border-l-0 p-10">
                        <PokemonDescription description={pokemon.specie.description}/>
                        <PokemonAbilities abilities={pokemon.abilities}/>
                        <PokemonStats stats={pokemon.stats} types={pokemon.types}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PokemonDetails;