import { Separator } from "@/components/ui/separator";
import { transformString } from "@/lib/utils";
import { useTypeIconsLoader } from "@/hooks/customPokemonHooks";

const PokemonBasicInfo = ({ pokemon }) => {
    const typeIcons = useTypeIconsLoader(pokemon.types);
    const weaknessIcons = useTypeIconsLoader(pokemon.typesInfo[pokemon.types[0]].weaknesses);
    const strengthIcons = useTypeIconsLoader(pokemon.typesInfo[pokemon.types[0]].strengths);

    return (
        <div className="flex flex-col items-center w-full mt-7">
            <div className="flex flex-col items-center justify-center md:hidden">
                <p className="mb-2 font-bold text-white">#{String(pokemon.id).padStart(3, "0")}</p>
                <h1 className="text-2xl font-bold text-white md:text-4xl mb-7 pokemon-name">
                    {transformString(pokemon.name)}
                </h1>
            </div>
            <div className="w-full bg-[#050911] border-[#373A41] flex flex-col rounded-lg border">
                <div className="flex flex-row justify-between p-4">
                    <p className="font-bold text-white">Type</p>
                    <div className="flex flex-wrap font-bold text-white gap-x-4">
                        {pokemon.types.map((type, index) => (
                            <img key={index} src={typeIcons[type]} alt={type} width={30} className="w-[25px] h-[25px]" />
                        ))}
                    </div>
                </div>
                <Separator orientation="horizontal" className="bg-[#373A41]"/>
                <div className="flex flex-row justify-between p-4">
                    <p className="font-bold text-white">Height</p>
                    <p className="font-bold text-white">{pokemon.height}'</p>
                </div>
                <Separator orientation="horizontal" className="bg-[#373A41]"/>
                <div className="flex flex-row justify-between p-4">
                    <p className="font-bold text-white">Weight</p>
                    <p className="font-bold text-white">{pokemon.weight} kg</p>
                </div>
                <Separator orientation="horizontal" className="bg-[#373A41]"/>
                <div className="flex flex-col justify-between p-4 gap-y-4 ween sm:flex-row">
                    <p className="font-bold text-white">Weakness</p>
                    <div className="flex flex-wrap font-bold text-white gap-x-4 gap-y-4">
                        {pokemon.typesInfo[pokemon.types[0]].weaknesses.map((type, index) => (
                            <img key={index} src={weaknessIcons[type]} alt={type} className="w-[25px] h-[25px]" />
                        ))}
                    </div>
                </div>
                <Separator orientation="horizontal" className="bg-[#373A41]"/>
                <div className="flex flex-col justify-between p-4 gap-y-4 ween sm:flex-row">
                    <p className="font-bold text-white">Strong Against</p>
                    <div className="flex flex-wrap font-bold text-white gap-x-4 gap-y-4">
                        {pokemon.typesInfo[pokemon.types[0]].strengths.map((type, index) => (
                            <img key={index} src={strengthIcons[type]} alt={type} className="w-[25px] h-[25px]" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokemonBasicInfo;