import { transformString } from "@/lib/utils";

const PokemonAbilities = ({ abilities }) => {
    return (
        <div className="mb-8">
            <h1 className="mb-5 text-xl text-white pokemon-name">Abilities</h1>
            {abilities && abilities.map((ability, index) => (
                <div key={index} className="flex flex-col mb-4 gap-x-4">
                    <p className="mb-2 font-bold text-white">{transformString(ability.name)}</p>
                    <p className="text-sm text-gray-400">{ability.effect}</p>
                </div>
            ))}
        </div>
    )
}

export default PokemonAbilities;