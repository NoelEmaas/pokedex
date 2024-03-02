import { useParams } from "react-router-dom";

const PokemonDetails = (props) => {
    const { id } = useParams();

    return (
        <div>
            <h1>{id}</h1>
        </div>
    );
}

export default PokemonDetails;