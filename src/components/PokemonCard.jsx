import { useTypeIconsLoader } from '@/hooks/customPokemonHooks';
import { transformString, getTypeColor } from '@/lib/utils';

const PokemonCard = (props) => {
    const icons = useTypeIconsLoader(props.types);
    const color = getTypeColor(props.types[0].toLowerCase());

    return (
        <div className="w-full bg-white border rounded-lg">
            <div className="p-2">
                <div className="flex flex-row w-full gap-x-2">
                    {props.types.map((type, index) => (
                        <div key={index}>
                            {icons[type] && <img src={icons[type]} alt={type} width={85} />}
                        </div>
                    ))}
                </div>
                <img src={props.image} alt={props.name} className="w-[500px] drop-shadow-lg" />
            </div>
            <div className="flex flex-row items-center justify-between px-4 py-3 rounded-b-lg" style={{ backgroundColor: color }}>
                <h1 className="font-bold text-black text-opacity-65">{transformString(props.name)}</h1>
                <div className="flex items-center px-2 py-1 bg-black rounded-md bg-opacity-30">
                    <h1 className="text-sm font-medium text-white">#{String(props.id).padStart(3, "0")}</h1>
                </div>
            </div>
        </div>
      );
      
}

export default PokemonCard;