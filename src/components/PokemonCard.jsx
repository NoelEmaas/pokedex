import { useEffect, useState } from 'react';
import { transformString } from '@/lib/utils';

const PokemonCard = (props) => {
    const [icons, setIcons] = useState({});

    useEffect(() => {
        const importIcon = async (type) => {
            try {
                const iconModule = await import(`../assets/type_icons/${type.toLowerCase()}_full.png`);
                setIcons(prevIcons => ({
                    ...prevIcons,
                    [type]: iconModule.default
                }));
            } catch (error) {
                console.error(`Error importing image for type '${type}':`, error);
            }
        };

        props.types.forEach(type => {
            importIcon(type);
        });
    }, [props.types]);
    
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