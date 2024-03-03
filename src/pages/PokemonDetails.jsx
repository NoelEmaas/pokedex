import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import ReactParallaxTilt from "react-parallax-tilt";

import { transformString, getTypeColor } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTypeIconsLoader } from "@/hooks/customPokemonHooks";
import { useFetchPokemonDetails } from "@/hooks/customPokemonHooks";
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress"

const PokemonDetails = () => {
    const { id } = useParams();
    const pokemon = useFetchPokemonDetails(id);
    const [icons, setIcons] = useState({});

    useEffect(() => {
        if (pokemon) {
            const types = pokemon.types;
            useTypeIconsLoader(types, setIcons);
        }
    }, [pokemon]);

    if (!pokemon) {
        return <div>Loading...</div>;
    }

    return (
        <div className='h-screen overflow-y-auto bg-[#010101]'>
            <div className="container flex flex-col items-center justify-center pt-10">
                <div className="flex flex-row items-center justify-between w-full mb-5">
                    <Button variant="outline"  className="text-gray-400 w-fit hover:text-gray-200 bg-[#050911] border-[#373A41] hover:bg-[#0a111d] gap-x-2"><ChevronLeftIcon/>Prev</Button>
                    <Button variant="outline"  className="text-gray-400 w-fit hover:text-gray-200 bg-[#050911] border-[#373A41] hover:bg-[#0a111d] gap-x-2">Next<ChevronRightIcon/></Button>
                </div>
                <div className="flex flex-col mb-10 rounded-lg md:flex-row">
                    <div className="bg-[#050911] border-[#373A41] border p-10">
                        <ReactParallaxTilt
                            scale={1.08}
                            glareEnable={true}
                            glareMaxOpacity={0.3}
                            glareColor="lightblue"
                            glarePosition={"all"}
                            glareBorderRadius="26px"
                            transitionSpeed={10000}
                            transitionEasing="cubic-bezier(.03,.98,.52,.99)"
                        >
                            <div className={`w-full rounded-lg pokemon-card ${pokemon.types[0].toLowerCase()}-card p-[40px]`}>
                                <img src={pokemon.image} alt={pokemon.name} className="pokemon-img w-[350px]"/>
                            </div>
                        </ReactParallaxTilt>
                        <div className="flex flex-col items-center w-full mt-7">
                            <p className="mb-2 text-lg font-bold text-white">#{String(pokemon.id).padStart(3, "0")}</p>
                            <h1 className="text-2xl font-bold text-white md:text-4xl mb-7 pokemon-name">
                                {transformString(pokemon.name)}
                            </h1>
                            <div className="w-full bg-[#050911] border-[#373A41] flex flex-col rounded-lg border">
                                <div className="flex flex-row justify-between p-4">
                                    <p className="text-lg font-bold text-white">Type</p>
                                    <div className="flex flex-row text-lg font-bold text-white gap-x-4">{pokemon.types.map((type, index) => (
                                        <img key={index} src={icons[type]} alt={type} width={30} />
                                    ))}</div>
                                </div>
                                <Separator orientation="horizontal" className="bg-[#373A41]"/>
                                <div className="flex flex-row justify-between p-4">
                                    <p className="text-lg font-bold text-white">Height</p>
                                    <p className="text-lg font-bold text-white">{pokemon.height}'</p>
                                </div>
                                <Separator orientation="horizontal" className="bg-[#373A41]"/>
                                <div className="flex flex-row justify-between p-4">
                                    <p className="text-lg font-bold text-white">Weight</p>
                                    <p className="text-lg font-bold text-white">{pokemon.weight} kg</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#050911] md:w-[500px] w-full border-[#373A41] border md:border-l-0 p-10">
                        <div className="mb-8">
                            <h1 className="mb-5 text-xl text-white pokemon-name">About</h1>
                            <p className="text-sm text-gray-400">
                                {pokemon.specie.description}
                            </p>
                        </div>
                        <div className="mb-8">
                            <h1 className="mb-5 text-xl text-white pokemon-name">Abilities</h1>
                            {pokemon.abilities && pokemon.abilities.map((ability, index) => (
                                <div key={index} className="flex flex-col mb-4 gap-x-4">
                                    <p className="mb-2 font-bold text-white">{transformString(ability.name)}</p>
                                    <p className="text-sm text-gray-400">{ability.effect}</p>
                                </div>
                            ))}
                        </div>
                        <div>
                            <h1 className="mb-5 text-xl text-white pokemon-name">Stats</h1>
                            <div className="flex flex-col gap-y-5">
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-base font-medium text-white dark:text-white">Attack</span>
                                        <span className="text-sm font-medium dark:text-white" style={{ color: `${getTypeColor(pokemon.types[0].toLowerCase())}` }}>{pokemon.stats.attack} / 255</span>
                                    </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(pokemon.stats.attack/255) * 100}%`, backgroundColor: `${getTypeColor(pokemon.types[0].toLowerCase())}` }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-base font-medium text-white dark:text-white">Defense</span>
                                        <span className="text-sm font-medium dark:text-white" style={{ color: `${getTypeColor(pokemon.types[0].toLowerCase())}` }}>{pokemon.stats.defense} / 255</span>
                                    </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(pokemon.stats.defense/255) * 100}%`, backgroundColor: `${getTypeColor(pokemon.types[0].toLowerCase())}` }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-base font-medium text-white dark:text-white">Hp</span>
                                        <span className="text-sm font-medium dark:text-white" style={{ color: `${getTypeColor(pokemon.types[0].toLowerCase())}` }}>{pokemon.stats.hp} / 255</span>
                                    </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(pokemon.stats.hp/255) * 100}%`, backgroundColor: `${getTypeColor(pokemon.types[0].toLowerCase())}` }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-base font-medium text-white dark:text-white">Speed</span>
                                        <span className="text-sm font-medium dark:text-white" style={{ color: `${getTypeColor(pokemon.types[0].toLowerCase())}` }}>{pokemon.stats.speed} / 255</span>
                                    </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(pokemon.stats.speed/255) * 100}%`, backgroundColor: `${getTypeColor(pokemon.types[0].toLowerCase())}` }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default PokemonDetails;