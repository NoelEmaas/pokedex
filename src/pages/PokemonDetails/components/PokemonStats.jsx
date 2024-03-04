import { getTypeColor } from "@/lib/utils";

const PokemonStats = ({ stats, types }) => {
    return (
        <div>
            <h1 className="mb-5 text-xl text-white pokemon-name">Stats</h1>
            <div className="flex flex-col gap-y-5">
                <div>
                    <div className="flex justify-between mb-1">
                        <span className="text-base font-medium text-white dark:text-white">Attack</span>
                        <span className="text-sm font-medium dark:text-white" style={{ color: `${getTypeColor(types[0].toLowerCase())}` }}>{stats.attack} / 255</span>
                    </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(stats.attack/255) * 100}%`, backgroundColor: `${getTypeColor(types[0].toLowerCase())}` }}></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between mb-1">
                        <span className="text-base font-medium text-white dark:text-white">Defense</span>
                        <span className="text-sm font-medium dark:text-white" style={{ color: `${getTypeColor(types[0].toLowerCase())}` }}>{stats.defense} / 255</span>
                    </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(stats.defense/255) * 100}%`, backgroundColor: `${getTypeColor(types[0].toLowerCase())}` }}></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between mb-1">
                        <span className="text-base font-medium text-white dark:text-white">Hp</span>
                        <span className="text-sm font-medium dark:text-white" style={{ color: `${getTypeColor(types[0].toLowerCase())}` }}>{stats.hp} / 255</span>
                    </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(stats.hp/255) * 100}%`, backgroundColor: `${getTypeColor(types[0].toLowerCase())}` }}></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between mb-1">
                        <span className="text-base font-medium text-white dark:text-white">Speed</span>
                        <span className="text-sm font-medium dark:text-white" style={{ color: `${getTypeColor(types[0].toLowerCase())}` }}>{stats.speed} / 255</span>
                    </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(stats.speed/255) * 100}%`, backgroundColor: `${getTypeColor(types[0].toLowerCase())}` }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonStats;