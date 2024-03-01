import { useTypeIconsLoader } from '@/hooks/customPokemonHooks';
import { transformString } from '@/lib/utils';

const PokemonCard = (props) => {
    const icons = useTypeIconsLoader(props.types);
    
    return (
        <div className="w-full bg-white border rounded-md">
            <div className="p-2 border-b">
                <div className='flex flex-row w-full gap-x-2'>
                    {props.types.map((type, index) => (
                        <div key={index}>
                            {icons[type] && <img src={icons[type]} alt={type} width={85}/>}
                        </div>
                    ))}
                </div>
                <img src={props.image} alt={props.name} className='w-[500px] drop-shadow-lg'/>
            </div>
            <div className='flex flex-row justify-between px-4 py-3'>
                <h1>{transformString(props.name)}</h1>
                <div className=''>
                    <h1>#{String(props.id).padStart(3, "0")}</h1>
                </div>
            </div>
        </div>
    );
}

export default PokemonCard;