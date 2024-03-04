import { Separator } from "@/components/ui/separator";
import { transformString } from "@/lib/utils";
import { useTypeIconsLoader } from "@/hooks/customPokemonHooks";

const PokemonBasicInfo = ({ pokemon }) => {
    const icons = useTypeIconsLoader(pokemon.types);

    return (
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
    )
}

export default PokemonBasicInfo;