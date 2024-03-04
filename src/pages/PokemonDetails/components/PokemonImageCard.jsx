import ReactParallaxTilt from "react-parallax-tilt";

const PokemonImageCard = ({ pokemon }) => {
    return (
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
        <div className={`w-full rounded-lg pokemon-card ${pokemon.types[0].toLowerCase()}-card p-[40px]`}>
            <img src={pokemon.image} alt={pokemon.name} className="pokemon-img w-[350px]"/>
        </div>
        </ReactParallaxTilt>
    );
}

export default PokemonImageCard;