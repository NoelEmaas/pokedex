import { getTypeColor } from "@/lib/utils";

const PokemonDescription = ({ pokemon }) => {
    return (
        <div className="mb-8">
            <div className="flex-row items-center justify-between w-full pb-10  border-b border-[#373A41] just gap-x-4 md:flex hidden">
                <h1 className="text-5xl pokemon-name" style={{ color: `${getTypeColor(pokemon.types[0].toLowerCase())}` }}>{pokemon.name}</h1>
                <p className="text-2xl font-bold text-white"> #{String(pokemon.id).padStart(3, "0")}</p>
            </div>
            <h1 className="mb-5 text-xl text-white md:mt-10 pokemon-name">About</h1>
            <p className="text-sm text-gray-400">
                {pokemon.specie.description}
            </p>
        </div>
    );
}

export default PokemonDescription;