import { useTypeIconsLoader } from '@/hooks/customPokemonHooks';
import { transformString, getTypeColor } from '@/lib/utils';
import { useState, useEffect } from 'react';

const PokemonCard = (props) => {
    const icons = useTypeIconsLoader(props.types);
    const color = getTypeColor(props.types[0].toLowerCase());
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []); 

    return (
        <div className={`w-full bg-white border rounded-lg pokemon-card ${props.types[0].toLowerCase()}-card`}>
            <div className="flex flex-row w-full px-2 pt-2 gap-x-2">
                {props.types.map((type, index) => (
                    <div key={index}>
                    {windowWidth < 500 ? (
                        icons[type] && <img src={icons[type]} alt={type} width={30} />
                    ) : (
                        icons[`${type}_full`] && <img src={icons[`${type}_full`]} alt={type} width={85} />
                    )}
                    </div>
                ))}
            </div>
            <div className='px-2 md:min-h-[250px] min-h-[180px] flex items-center pokemon-img-container'>
                <img src={props.image} alt={props.name} className="drop-shadow-lg pokemon-img" />
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

