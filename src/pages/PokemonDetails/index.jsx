import { useParams } from "react-router-dom";

import { useState } from "react";

import { useFetchPokemonDetails } from "@/hooks/customPokemonHooks";
import PokeBallLoader from "@/components/pokeballLoader/PokeBallLoader";
import PokemonStats from "@/pages/PokemonDetails/components/PokemonStats";
import NextPrevButtons from "@/pages/PokemonDetails/components/NextPrevButtons";
import PokemonImageCard from "@/pages/PokemonDetails/components/PokemonImageCard";
import PokemonBasicInfo from "@/pages/PokemonDetails/components/PokemonBasicInfo";
import PokemonAbilities from "@/pages/PokemonDetails/components/PokemonAbilities";
import PokemonDescription from "@/pages/PokemonDetails/components/PokemonDescription";
import ErrorPage from "@/pages/Error/index";

const PokemonDetails = () => {
    const { id } = useParams();

    if (id < 1 || id > 1010) {
        return (
            <ErrorPage />
        );
    }

    const [loading, setLoading] = useState(true);
    const pokemon = useFetchPokemonDetails(id, setLoading);
    
    if (loading) {
        return <PokeBallLoader />
    }

    return (
        <div className='h-screen overflow-y-auto bg-[#010101]'>
            <div className="container flex flex-col items-center justify-center pt-10 pb-10">
                <NextPrevButtons id={id} />
                <div className="flex flex-col mb-10 rounded-lg md:flex-row gap-x-[50px] gap-y-10">
                    <div className="">
                        <PokemonImageCard pokemon={pokemon}/>
                        <PokemonBasicInfo pokemon={pokemon}/>
                    </div>
                    <div className="md:w-[500px] w-full">
                        <PokemonDescription pokemon={pokemon}/>
                        <PokemonAbilities abilities={pokemon.abilities}/>
                        <PokemonStats stats={pokemon.stats} types={pokemon.types}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PokemonDetails;