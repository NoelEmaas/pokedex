import { useTypeIconsLoader } from '@/hooks/customPokemonHooks';
import { transformString, getTypeColor } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactParallaxTilt from "react-parallax-tilt";
import { AnimationOnScroll } from 'react-animation-on-scroll';

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

    const CardInfo = ({ id, name, color }) => {
        const gradientStyle = {
          background: `linear-gradient(to top, ${color} 40%, transparent 100%)`
        };
      
        return (
            <div className="flex flex-col items-center justify-between px-4 pb-3 rounded-b-lg pt-7 sm:flex-row" style={gradientStyle}>
                <h1 className="mb-3 text-sm font-bold text-white text-opacity-90 pokemon-name sm:text-base sm:mb-0">{transformString(name)}</h1>
                <div className="flex items-center px-2 py-1 bg-black rounded-md bg-opacity-30">
                    <h1 className="text-sm font-medium text-white">#{String(id).padStart(3, "0")}</h1>
                </div>
            </div>
        );
    };

    return (
            <Link to={`pokemon/${props.id}`}>
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
                    <div className={`w-full rounded-lg pokemon-card ${props.types[0].toLowerCase()}-card relative`}>
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
                            <img src={props.image} alt={props.name} className="pokemon-img" />
                        </div>
                        <CardInfo id={props.id} name={props.name} color={color} />
                    </div>
                </ReactParallaxTilt>
            </Link>
    );
}

export default PokemonCard;

